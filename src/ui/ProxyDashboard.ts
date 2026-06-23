import {
    Table,
    Stack,
    Heading,
    Text,
    Theme,
    Divider,
    ViewProvider,
    Shell
} from '@flybyme/mesh-ui';
import z from 'zod';
import { hostCrud, routeCrud } from '../proxy/proxy.contract';

export class ProxyDashboard implements ViewProvider {
    public readonly id = 'proxy-dashboard';
    public readonly name = 'Proxy Dashboard';

    private shell: Shell;
    private routesTable!: Table<any>;
    private hostsTable!: Table<any>;
    private pollingInterval?: any;

    constructor(shell: Shell) {
        this.shell = shell;
    }

    /**
     * Implements ViewProvider.resolveView
     */
    public async resolveView(container: HTMLElement, disposables: { dispose: () => void }[]): Promise<void> {
        // Create the layout
        const layout = this.createLayout();
        container.appendChild(layout);

        // Start fresh fetch
        this.fetchData();

        // Setup polling
        this.pollingInterval = setInterval(() => {
            this.fetchData();
        }, 5000);

        disposables.push({
            dispose: () => {
                if (this.pollingInterval) {
                    clearInterval(this.pollingInterval);
                    this.pollingInterval = undefined;
                }
            }
        });
    }

    private async fetchData() {
        try {
            // @ts-ignore - The tools will be available in the registry
            const routes = await this.shell.app.call('routes.find', {});
            // @ts-ignore
            const hosts = await this.shell.app.call('hosts.find', {});

            this.routesTable.updateProps({ data: routes });
            this.hostsTable.updateProps({ data: hosts });
        } catch (error) {
            console.error('[ProxyDashboard] Failed to fetch data:', error);
        }
    }

    private createLayout(): HTMLElement {
        const root = document.createElement('div');
        Object.assign(root.style, {
            padding: Theme.spacing.lg,
            display: 'flex',
            flexDirection: 'column',
            gap: Theme.spacing.xl,
            height: '100%',
            overflowY: 'auto',
            backgroundColor: Theme.colors.bgPrimary,
            boxSizing: 'border-box'
        });

        const header = new Stack({
            direction: 'column',
            gap: 'xs',
            children: [
                new Heading({ level: 1, text: 'Proxy Management' }),
                new Text({
                    text: 'Monitor and configure reverse proxy routes and host mappings.',
                    variant: 'muted',
                    size: 'sm'
                })
            ]
        });

        this.routesTable = new Table<z.infer<typeof routeCrud.outputSchema>>({
            data: [],
            columns: [
                { key: 'vHost', header: 'vHost', width: '20%' },
                { key: 'path', header: 'Path', width: '20%' },
                { key: 'target', header: 'Target', width: '60%' }
            ],
            height: '300px',
            stickyHeader: true
        });

        this.hostsTable = new Table<z.infer<typeof hostCrud.outputSchema>>({
            data: [],
            columns: [
                { key: 'hostname', header: 'Hostname', width: '30%' },
                { key: 'ip', header: 'IP Address', width: '40%' },
                { key: 'port', header: 'Port', width: '30%' }
            ],
            height: '300px',
            stickyHeader: true
        });

        const routesSection = new Stack({
            direction: 'column',
            gap: 'md',
            children: [
                new Heading({ level: 2, text: 'Active Routes' }),
                this.routesTable
            ]
        });

        const hostsSection = new Stack({
            direction: 'column',
            gap: 'md',
            children: [
                new Heading({ level: 2, text: 'Host Mappings' }),
                this.hostsTable
            ]
        });

        root.appendChild(header.getElement());
        root.appendChild(new Divider({}).getElement());
        root.appendChild(routesSection.getElement());
        root.appendChild(new Divider({}).getElement());
        root.appendChild(hostsSection.getElement());

        return root;
    }
}
