import { IServiceContext } from '@flybyme/mesh';
import { z } from 'zod';
import { configureRouteContract } from './proxy.contract.js';

export async function configure_route(
    input: z.infer<typeof configureRouteContract.inputSchema>,
    ctx: IServiceContext
) {
    console.log(`[ProxyEngine] Configuring route: ${input.vHost}`);
    const found = await ctx.call('routes.find_one', { query: { vHost: input.vHost } });
    if (found) {
        throw new Error(`Route for ${input.vHost} already exists`);
    }
    const created = await ctx.call('routes.create', {
        path: '/',
        vHost: input.vHost,
        target: `http://${input.vHost}`
    });
    console.log(`[ProxyEngine] Route created: ${input.vHost} ${created.id} at ${created.createdAt}`);
    return { success: true };
}
