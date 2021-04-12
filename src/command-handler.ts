import { Client, Message } from "discord.js";
import { Commands } from "./annotations/command";
import { IActionContext } from "./commands/context.model";
import { Logger } from "./utils/logger";

export class CommandHandler {
    constructor(
        private logger: Logger
        ) {}

    public async handle(client: Client, message: Message): Promise<void> {
        try {
            const commandString = message.content.trimStart().substring(2).trimStart();
            const cmd = commandString.split(' ')[0].trim().toLowerCase();

            const action = Commands.getActionFromCommandStr(cmd);

            if(action){
                await action({
                    client,
                    message,
                    logger: this.logger,
                    command: commandString
                } as IActionContext);
            }
        } catch(e) {
            console.error(e);
        }
    }

}