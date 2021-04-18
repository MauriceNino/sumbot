import { TextChannel } from "discord.js";
import { IActionContext } from "./context.model";
import { command, Commands } from '../annotations/command';
import { logged } from "../annotations/logged";
import { checkPermissions } from "../annotations/check-permissions";
import { COMMAND_PREFIX, DASHBOARD_DOMAIN } from "../settings";
import * as publicIp from 'public-ip';

export class ServerHandling {

    @command({name: 'Clear Messages', aliases: ['clear-screen', 'cls'], description: 'delete the last N messages in this channel'})
    @checkPermissions('MANAGE_MESSAGES')
    public static async clearMessages(ctx: IActionContext) {
        const numberOfMsgs = parseInt(ctx.command.split(' ')[1]);
    
        const messages = await ctx.message.channel.messages.fetch({limit: numberOfMsgs + 1});
        
        if(ctx.message.channel instanceof TextChannel) {
            await (ctx.message.channel as TextChannel).bulkDelete(messages, false);
        }
    }
    
    @command({name: 'Version', aliases: ['version', 'v'], description: 'print the current version of this bot'})
    @logged
    public static async version(ctx: IActionContext) {
        ctx.logger.info('Reading version from package.json ...');

        await ctx.message.channel.send(`Current bot version: ${process.env.npm_package_version}`);
    }
    
    @command({name: 'Help', aliases: ['help', 'h', 'commands'], description: 'list all the commands of this bot'})
    public static async help(ctx: IActionContext) {
        const commands = Commands.getCommands();

        const commandLength = commands.reduce((commandLength, command) => {
            const mainCommandLength = command.description.aliases[0].length;
            return commandLength > mainCommandLength ? commandLength : mainCommandLength;
        }, 0);

        const lines = commands.map(command => {
            const desc = command.description.description ? command.description.description : command.description.name;
            const mainCommand = command.description.aliases[0];

            return `  ${COMMAND_PREFIX} ${mainCommand}${' '.repeat(commandLength - mainCommand.length)}\t${desc}`;
        });

        lines.unshift(`All commands (some might be restricted):\n`);

        await ctx.message.channel.send(`\`\`\`\n${lines.join('\n')}\n\`\`\``);
    }
    
    @command({name: 'Dashboard', aliases: ['dash']})
    public static async getMinecraftIp(ctx: IActionContext) {
        const ip = await publicIp.v4();

        if(DASHBOARD_DOMAIN) {
            await ctx.message.channel.send(`Server Dashboard: <https://${DASHBOARD_DOMAIN}>`);
        } else {
            await ctx.message.channel.send(`Server Dashboard: <http://${ip}:4001>`);
        }
    }
}
