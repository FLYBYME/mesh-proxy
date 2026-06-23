import { ServiceModule, IServiceBroker } from '@flybyme/mesh';
import httpProxy from 'http-proxy';
import * as http from 'http';
import { z } from 'zod';
import { configureRouteContract, routeCrud, hostCrud } from './proxy.contract.js';
import { configure_route } from './proxy.tools.js';
import { RouteSchema, HostSchema } from './proxy.schema.js';

export class ProxyService extends ServiceModule {
    public readonly name = 'ProxyService';
    public readonly domain = 'proxy';
    private proxyServer: httpProxy;
    private httpServer?: http.Server;

    constructor() {
        super();
        this.mountCrud(routeCrud);
        this.mountCrud(hostCrud);
        this.mountTool(configureRouteContract, configure_route);

        this.proxyServer = httpProxy.createProxyServer({
            xfwd: true // Add X-Forwarded headers
        });

        this.proxyServer.on('error', (err, req, res) => {
            console.error('[ProxyEngine] Proxy error:', err);
            if (res && 'writeHead' in res) {
                const response = res as http.ServerResponse;
                response.writeHead(502, { 'Content-Type': 'text/plain' });
                response.end('Bad Gateway');
            }
        });
    }

    async onStart(broker: IServiceBroker) {
        console.log('[ProxyService] Started');

        // Start the raw HTTP server to intercept external traffic
        this.httpServer = http.createServer(async (req, res) => {
            try {
                const hostHeader = req.headers.host || '';
                const hostname = hostHeader.split(':')[0];
                const urlPath = req.url || '/';

                // 1. Check the Mesh for specific routes matching the vHost or wildcard
                const routesResult = await broker.call('routes.find', {
                    query: {
                        $or: [
                            { vHost: hostname },
                            { vHost: '*' }
                        ]
                    }
                });

                if (routesResult.length > 0) {
                    // Sort by path length descending to prioritize the most specific paths
                    const sortedRoutes = routesResult.sort((a, b) => b.path.length - a.path.length);
                    const matchedRoute = sortedRoutes.find(r => urlPath.startsWith(r.path));

                    if (matchedRoute) {
                        console.log(`[ProxyEngine] Routing ${hostname}${urlPath} -> ${matchedRoute.target}`);
                        return this.proxyServer.web(req, res, { target: matchedRoute.target });
                    }
                }

                // 2. Fallback: check if we have a direct host mapping
                const hostsResult = await broker.call('hosts.find_one', {
                    query: { hostname: hostname }
                });


                if (hostsResult) {
                    const target = `http://${hostsResult.ip}:${hostsResult.port}`;
                    console.log(`[ProxyEngine] Routing ${hostname}${urlPath} -> ${target}`);
                    return this.proxyServer.web(req, res, { target });
                }

                // No match found in the Mesh
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found: No proxy routing rules matched this request.');

            } catch (error) {
                console.error('[ProxyEngine] Error handling request:', error);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            }
        });

        const port = process.env.PROXY_PORT ? parseInt(process.env.PROXY_PORT, 10) : 8080;
        this.httpServer.listen(port, () => {
            console.log(`[ProxyEngine] Reverse proxy listening on port ${port}`);
        });

        this.mountEventHandler('data.created', this.handleDataCreated.bind(this));
        this.mountEventHandler('data.updated', this.handleDataUpdated.bind(this));
        this.mountEventHandler('data.deleted', this.handleDataDeleted.bind(this));
    }

    private async handleDataCreated(payload: any) {
        const { domain, doc } = payload;
        if (domain === 'routes' || domain === 'hosts') {
            // Reload the specific entry or the whole map
            // For simplicity, we'll just log a refresh event.
            // A full implementation would update an in-memory Map.
            console.log(`[ProxyEngine] Cache refresh needed for ${domain}:`, doc);
        }
    }

    private async handleDataUpdated(payload: any) {
        const { domain, doc } = payload;
        if (domain === 'routes' || domain === 'hosts') {
            console.log(`[ProxyEngine] Cache refresh needed for ${domain}:`, doc);
        }
    }

    private async handleDataDeleted(payload: any) {
        const { domain, id } = payload;
        if (domain === 'routes' || domain === 'hosts') {
            console.log(`[ProxyEngine] Cache refresh needed for ${domain}: ID ${id}`);
        }
    }

    async onStop() {
        if (this.httpServer) {
            this.httpServer.close();
        }
        this.proxyServer.close();
        console.log('[ProxyService] Stopped');
    }
}