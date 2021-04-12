import { command } from "../annotations/command";
import * as publicIp from 'public-ip';
import { IActionContext } from "./context.model";

export class Minecraft {
    
    @command({name: 'Minecraft Server Ip', aliases: ['mc_server', 'mc']})
    public static async getMinecraftIp(ctx: IActionContext) {
        const ip = await publicIp.v4();

        await ctx.message.channel.send(`Minecraft Server IP: ${ip}:25565`);
    }
}