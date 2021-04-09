import { TextChannel } from "discord.js";
import { IActionContext } from "./context.model";
import { command } from '../annotations/command';
import { logged } from "../annotations/logged";
import { checkPermissions } from "../annotations/check-permissions";

export class ServerHandling {

    @command({name: 'Clear Messages', aliases: ['cls']})
    @checkPermissions('MANAGE_MESSAGES')
    public static async clearMessages (ctx: IActionContext) {
        const numberOfMsgs = parseInt(ctx.command.split(' ')[1]);
    
        const messages = await ctx.message.channel.messages.fetch({limit: numberOfMsgs});
        
        if(ctx.message.channel instanceof TextChannel) {
            await (ctx.message.channel as TextChannel).bulkDelete(messages, false);
        }
    }
    
    @command({name: 'Version', aliases: ['version']})
    @logged
    public static async version (ctx: IActionContext) {
        ctx.logger.info('Reading version from package.json ...');

        await ctx.message.channel.send(`Current bot version: ${process.env.npm_package_version}`);
    }
}
