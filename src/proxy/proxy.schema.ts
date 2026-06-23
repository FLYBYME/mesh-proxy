import { z } from '@flybyme/mesh';

export const RouteSchema = z.object({
    vHost: z.string().describe('The virtual host this route applies to.'),
    path: z.string().describe('The incoming path to proxy (e.g., /api).'),
    target: z.string().describe('The destination URL to proxy to.'),
});

export const HostSchema = z.object({
    hostname: z.string().describe('The incoming hostname.'),
    ip: z.string().describe('The destination IP address.'),
    port: z.number().describe('The destination port.'),
});
