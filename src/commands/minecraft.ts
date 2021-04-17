import { command } from "../annotations/command";
import * as publicIp from 'public-ip';
import { IActionContext } from "./context.model";
import { MC_SERVER_DOMAIN } from "../settings";

export class Minecraft {
    
    @command({name: 'Minecraft Server Endpoint', aliases: ['mc_server', 'mc']})
    public static async getMinecraftIp(ctx: IActionContext) {
        const ip = await publicIp.v4();
        const SERVER_PORT = 25565;
        const LIVEMAP_PORT = 8123;

        if(MC_SERVER_DOMAIN) {
            await ctx.message.channel.send(`Minecraft Server Domain: ${MC_SERVER_DOMAIN}\n\nMinecraft Live Map: <http://${MC_SERVER_DOMAIN}:${LIVEMAP_PORT}>`);
        } else {
            await ctx.message.channel.send(`Minecraft Server IP: ${ip}:${SERVER_PORT}\n\nMinecraft Live Map: <http://${ip}:${LIVEMAP_PORT}>`);
        }
    }
}