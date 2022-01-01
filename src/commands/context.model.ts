import { Client, Message } from "discord.js";
import { Logger } from "../utils/logger";

export interface IActionContext {
  client: Client;
  message: Message;
  logger: Logger;
  command: string;
}
