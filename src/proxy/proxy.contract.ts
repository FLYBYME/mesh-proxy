import { defineContract, defineCrud, z } from '@flybyme/mesh';
import { RouteSchema, HostSchema } from './proxy.schema.js';

export const routeCrud = defineCrud('routes', RouteSchema);
export const hostCrud = defineCrud('hosts', HostSchema);

export const configureRouteContract = defineContract({
    domain: 'proxy',
    action: 'configure_route',
    description: 'Configure a new reverse proxy route.',
    inputSchema: z.object({
        vHost: z.string().describe('The virtual host to proxy.'),
    }),
    outputSchema: z.object({ success: z.boolean() }),
    rest: { method: 'POST', path: '/proxy/route' },
    print: (output) => output.success ? 'Route configured.' : 'Failed to configure route.'
});
