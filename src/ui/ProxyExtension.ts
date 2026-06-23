import { 
    Shell, 
    Extension, 
    MenuItemProps
} from '@flybyme/mesh-ui';
import { ProxyDashboard } from './ProxyDashboard.js';

export class ProxyExtension implements Extension {
    public readonly id = 'mesh-proxy-ui';
    public readonly name = 'Proxy Manager';
    public readonly version = '1.0.0';

    public readonly menus: MenuItemProps[] = [];

    public async activate(shell: Shell): Promise<void> {
        shell.activityBar.registerItem({
            id: 'activity-bar:proxy',
            location: 'left-panel',
            icon: 'fas fa-network-wired',
            title: 'Proxy Manager',
            order: 100,
            onClick: () => shell.commands.execute('proxy.open-dashboard')
        });

        // Instantiate the dashboard ViewProvider
        const dashboard = new ProxyDashboard(shell);

        // Register the dashboard view provider
        shell.views.registerProvider('center-panel', dashboard);

        // Register the command to open the dashboard
        shell.commands.register({
            id: 'proxy.open-dashboard',
            label: 'Open Proxy Dashboard',
            handler: () => {
                shell.tabs.openTab({
                    id: 'proxy-dashboard-tab',
                    title: 'Proxy Manager',
                    icon: 'fas fa-network-wired',
                    providerId: dashboard.id,
                    active: true
                });
            }
        });
    }
}
