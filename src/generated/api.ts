// GENERATED FILE - DO NOT EDIT
import { z } from 'zod';

// External Type Includes
import '@flybyme/mesh-ui';
import * as Contract_0 from '../proxy/proxy.contract.js';

declare global {
    interface IServiceToolRegistry {
        'proxy.configure_route': { params: z.input<typeof Contract_0.configureRouteContract['inputSchema']>, returns: z.infer<typeof Contract_0.configureRouteContract['outputSchema']> };
        'routes.create': { params: z.input<typeof Contract_0.routeCrud['create']['inputSchema']>, returns: z.infer<typeof Contract_0.routeCrud['create']['outputSchema']> };
        'routes.find': { params: z.input<typeof Contract_0.routeCrud['find']['inputSchema']>, returns: z.infer<typeof Contract_0.routeCrud['find']['outputSchema']> };
        'routes.find_one': { params: z.input<typeof Contract_0.routeCrud['findOne']['inputSchema']>, returns: z.infer<typeof Contract_0.routeCrud['findOne']['outputSchema']> };
        'routes.count': { params: z.input<typeof Contract_0.routeCrud['count']['inputSchema']>, returns: z.infer<typeof Contract_0.routeCrud['count']['outputSchema']> };
        'routes.get': { params: z.input<typeof Contract_0.routeCrud['get']['inputSchema']>, returns: z.infer<typeof Contract_0.routeCrud['get']['outputSchema']> };
        'routes.update': { params: z.input<typeof Contract_0.routeCrud['update']['inputSchema']>, returns: z.infer<typeof Contract_0.routeCrud['update']['outputSchema']> };
        'routes.delete': { params: z.input<typeof Contract_0.routeCrud['delete']['inputSchema']>, returns: z.infer<typeof Contract_0.routeCrud['delete']['outputSchema']> };
        'hosts.create': { params: z.input<typeof Contract_0.hostCrud['create']['inputSchema']>, returns: z.infer<typeof Contract_0.hostCrud['create']['outputSchema']> };
        'hosts.find': { params: z.input<typeof Contract_0.hostCrud['find']['inputSchema']>, returns: z.infer<typeof Contract_0.hostCrud['find']['outputSchema']> };
        'hosts.find_one': { params: z.input<typeof Contract_0.hostCrud['findOne']['inputSchema']>, returns: z.infer<typeof Contract_0.hostCrud['findOne']['outputSchema']> };
        'hosts.count': { params: z.input<typeof Contract_0.hostCrud['count']['inputSchema']>, returns: z.infer<typeof Contract_0.hostCrud['count']['outputSchema']> };
        'hosts.get': { params: z.input<typeof Contract_0.hostCrud['get']['inputSchema']>, returns: z.infer<typeof Contract_0.hostCrud['get']['outputSchema']> };
        'hosts.update': { params: z.input<typeof Contract_0.hostCrud['update']['inputSchema']>, returns: z.infer<typeof Contract_0.hostCrud['update']['outputSchema']> };
        'hosts.delete': { params: z.input<typeof Contract_0.hostCrud['delete']['inputSchema']>, returns: z.infer<typeof Contract_0.hostCrud['delete']['outputSchema']> };
    }
}

export type { IServiceToolRegistry };
