// GENERATED FILE - DO NOT EDIT
import { Command } from 'commander';
import { MeshApp, C, RegistryModule, NetworkModule, BrokerModule, JSONSerializer, Logger } from '@flybyme/mesh';
import { WSTransport, ZodToCliMapper } from '@flybyme/mesh/node';
import * as Contract_0 from '../../proxy/proxy.contract.js';

async function executeCommand(toolName: string, args: Record<string, unknown>, contract: any, options: any) {
    const logger = new Logger(3);
    const nodeId = options.nodeId || `cli-${Math.random().toString(36).substring(2, 9)}`;
    const app = new MeshApp({ nodeID: nodeId, logger });
    const serializer = new JSONSerializer();
    const port = parseInt(options.port || '0', 10);
    const wsTransport = new WSTransport(serializer, port);
    
    const bootstrapStr = options.bootstrap || 'ws://127.0.0.1:5005';
    app.use(new RegistryModule());
    app.use(new NetworkModule({
        port,
        transports: [wsTransport],
        bootstrapNodes: bootstrapStr ? bootstrapStr.split(',').map((s: string) => s.trim()) : []
    }));
    app.use(new BrokerModule());

    await app.start();
    
    if (bootstrapStr) {
        await new Promise(r => setTimeout(r, 2000));
    }

    try {
        console.log(C.dim + `Executing ${toolName}...` + C.reset);
        const res = await app.call(toolName as any, ZodToCliMapper.parseOptions(args, contract.inputSchema) as any, { timeout: 300000 });
        console.log(contract.print(res));
    } finally {
        await app.stop();
    }
}

export function registerGeneratedCommands(program: Command) {
    const proxy = program.command('proxy').description('proxy tools');
    const cmd_proxy_configureRouteContract_configure_route = proxy.command('configure_route').description(`Configure a new reverse proxy route.`);
    cmd_proxy_configureRouteContract_configure_route.action(async (o: Record<string, unknown>, cmd: Command) => {
        try {
            await executeCommand('proxy.configure_route', o, Contract_0.configureRouteContract, cmd.optsWithGlobals());
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            console.error(C.red + 'Error:' + C.reset, message);
        }
    });
    ZodToCliMapper.applyOptions(cmd_proxy_configureRouteContract_configure_route, Contract_0.configureRouteContract.inputSchema);
    const routes = program.command('routes').description('routes tools');
    const cmd_routes_routeCrud_create_create = routes.command('create').description(`CRUD create for routes (routeCrud)`);
    cmd_routes_routeCrud_create_create.action(async (o: Record<string, unknown>, cmd: Command) => {
        try {
            await executeCommand('routes.create', o, Contract_0.routeCrud['create'], cmd.optsWithGlobals());
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            console.error(C.red + 'Error:' + C.reset, message);
        }
    });
    ZodToCliMapper.applyOptions(cmd_routes_routeCrud_create_create, Contract_0.routeCrud['create'].inputSchema);
    const cmd_routes_routeCrud_find_find = routes.command('find').description(`CRUD find for routes (routeCrud)`);
    cmd_routes_routeCrud_find_find.action(async (o: Record<string, unknown>, cmd: Command) => {
        try {
            await executeCommand('routes.find', o, Contract_0.routeCrud['find'], cmd.optsWithGlobals());
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            console.error(C.red + 'Error:' + C.reset, message);
        }
    });
    ZodToCliMapper.applyOptions(cmd_routes_routeCrud_find_find, Contract_0.routeCrud['find'].inputSchema);
    const cmd_routes_routeCrud_findOne_find_one = routes.command('find_one').description(`CRUD findOne for routes (routeCrud)`);
    cmd_routes_routeCrud_findOne_find_one.action(async (o: Record<string, unknown>, cmd: Command) => {
        try {
            await executeCommand('routes.find_one', o, Contract_0.routeCrud['findOne'], cmd.optsWithGlobals());
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            console.error(C.red + 'Error:' + C.reset, message);
        }
    });
    ZodToCliMapper.applyOptions(cmd_routes_routeCrud_findOne_find_one, Contract_0.routeCrud['findOne'].inputSchema);
    const cmd_routes_routeCrud_count_count = routes.command('count').description(`CRUD count for routes (routeCrud)`);
    cmd_routes_routeCrud_count_count.action(async (o: Record<string, unknown>, cmd: Command) => {
        try {
            await executeCommand('routes.count', o, Contract_0.routeCrud['count'], cmd.optsWithGlobals());
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            console.error(C.red + 'Error:' + C.reset, message);
        }
    });
    ZodToCliMapper.applyOptions(cmd_routes_routeCrud_count_count, Contract_0.routeCrud['count'].inputSchema);
    const cmd_routes_routeCrud_get_get = routes.command('get').description(`CRUD get for routes (routeCrud)`);
    cmd_routes_routeCrud_get_get.action(async (o: Record<string, unknown>, cmd: Command) => {
        try {
            await executeCommand('routes.get', o, Contract_0.routeCrud['get'], cmd.optsWithGlobals());
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            console.error(C.red + 'Error:' + C.reset, message);
        }
    });
    ZodToCliMapper.applyOptions(cmd_routes_routeCrud_get_get, Contract_0.routeCrud['get'].inputSchema);
    const cmd_routes_routeCrud_update_update = routes.command('update').description(`CRUD update for routes (routeCrud)`);
    cmd_routes_routeCrud_update_update.action(async (o: Record<string, unknown>, cmd: Command) => {
        try {
            await executeCommand('routes.update', o, Contract_0.routeCrud['update'], cmd.optsWithGlobals());
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            console.error(C.red + 'Error:' + C.reset, message);
        }
    });
    ZodToCliMapper.applyOptions(cmd_routes_routeCrud_update_update, Contract_0.routeCrud['update'].inputSchema);
    const cmd_routes_routeCrud_delete_delete = routes.command('delete').description(`CRUD delete for routes (routeCrud)`);
    cmd_routes_routeCrud_delete_delete.action(async (o: Record<string, unknown>, cmd: Command) => {
        try {
            await executeCommand('routes.delete', o, Contract_0.routeCrud['delete'], cmd.optsWithGlobals());
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            console.error(C.red + 'Error:' + C.reset, message);
        }
    });
    ZodToCliMapper.applyOptions(cmd_routes_routeCrud_delete_delete, Contract_0.routeCrud['delete'].inputSchema);
    const hosts = program.command('hosts').description('hosts tools');
    const cmd_hosts_hostCrud_create_create = hosts.command('create').description(`CRUD create for hosts (hostCrud)`);
    cmd_hosts_hostCrud_create_create.action(async (o: Record<string, unknown>, cmd: Command) => {
        try {
            await executeCommand('hosts.create', o, Contract_0.hostCrud['create'], cmd.optsWithGlobals());
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            console.error(C.red + 'Error:' + C.reset, message);
        }
    });
    ZodToCliMapper.applyOptions(cmd_hosts_hostCrud_create_create, Contract_0.hostCrud['create'].inputSchema);
    const cmd_hosts_hostCrud_find_find = hosts.command('find').description(`CRUD find for hosts (hostCrud)`);
    cmd_hosts_hostCrud_find_find.action(async (o: Record<string, unknown>, cmd: Command) => {
        try {
            await executeCommand('hosts.find', o, Contract_0.hostCrud['find'], cmd.optsWithGlobals());
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            console.error(C.red + 'Error:' + C.reset, message);
        }
    });
    ZodToCliMapper.applyOptions(cmd_hosts_hostCrud_find_find, Contract_0.hostCrud['find'].inputSchema);
    const cmd_hosts_hostCrud_findOne_find_one = hosts.command('find_one').description(`CRUD findOne for hosts (hostCrud)`);
    cmd_hosts_hostCrud_findOne_find_one.action(async (o: Record<string, unknown>, cmd: Command) => {
        try {
            await executeCommand('hosts.find_one', o, Contract_0.hostCrud['findOne'], cmd.optsWithGlobals());
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            console.error(C.red + 'Error:' + C.reset, message);
        }
    });
    ZodToCliMapper.applyOptions(cmd_hosts_hostCrud_findOne_find_one, Contract_0.hostCrud['findOne'].inputSchema);
    const cmd_hosts_hostCrud_count_count = hosts.command('count').description(`CRUD count for hosts (hostCrud)`);
    cmd_hosts_hostCrud_count_count.action(async (o: Record<string, unknown>, cmd: Command) => {
        try {
            await executeCommand('hosts.count', o, Contract_0.hostCrud['count'], cmd.optsWithGlobals());
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            console.error(C.red + 'Error:' + C.reset, message);
        }
    });
    ZodToCliMapper.applyOptions(cmd_hosts_hostCrud_count_count, Contract_0.hostCrud['count'].inputSchema);
    const cmd_hosts_hostCrud_get_get = hosts.command('get').description(`CRUD get for hosts (hostCrud)`);
    cmd_hosts_hostCrud_get_get.action(async (o: Record<string, unknown>, cmd: Command) => {
        try {
            await executeCommand('hosts.get', o, Contract_0.hostCrud['get'], cmd.optsWithGlobals());
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            console.error(C.red + 'Error:' + C.reset, message);
        }
    });
    ZodToCliMapper.applyOptions(cmd_hosts_hostCrud_get_get, Contract_0.hostCrud['get'].inputSchema);
    const cmd_hosts_hostCrud_update_update = hosts.command('update').description(`CRUD update for hosts (hostCrud)`);
    cmd_hosts_hostCrud_update_update.action(async (o: Record<string, unknown>, cmd: Command) => {
        try {
            await executeCommand('hosts.update', o, Contract_0.hostCrud['update'], cmd.optsWithGlobals());
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            console.error(C.red + 'Error:' + C.reset, message);
        }
    });
    ZodToCliMapper.applyOptions(cmd_hosts_hostCrud_update_update, Contract_0.hostCrud['update'].inputSchema);
    const cmd_hosts_hostCrud_delete_delete = hosts.command('delete').description(`CRUD delete for hosts (hostCrud)`);
    cmd_hosts_hostCrud_delete_delete.action(async (o: Record<string, unknown>, cmd: Command) => {
        try {
            await executeCommand('hosts.delete', o, Contract_0.hostCrud['delete'], cmd.optsWithGlobals());
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            console.error(C.red + 'Error:' + C.reset, message);
        }
    });
    ZodToCliMapper.applyOptions(cmd_hosts_hostCrud_delete_delete, Contract_0.hostCrud['delete'].inputSchema);
}
