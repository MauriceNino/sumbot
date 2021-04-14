import { command } from "../annotations/command";
import * as publicIp from 'public-ip';
import { IActionContext } from "./context.model";
import { MC_SERVER_DOMAIN } from "../settings";

export class Minecraft {
    
    @command({name: 'Minecraft Server Endpoint', aliases: ['mc_server', 'mc']})
    public static async getMinecraftIp(ctx: IActionContext) {
        if(MC_SERVER_DOMAIN) {
            await ctx.message.channel.send(`Minecraft Server Domain: \n - ${MC_SERVER_DOMAIN}\n - or alternatively: ${MC_SERVER_DOMAIN}:25565`);
        } else {
            const ip = await publicIp.v4();
    
            await ctx.message.channel.send(`Minecraft Server IP: ${ip}:25565`);
        }
    }
}