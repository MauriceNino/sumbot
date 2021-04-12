import { Minecraft } from "./minecraft";
import { ServerHandling } from "./server-handling";

export const init = () => {
    new ServerHandling();
    new Minecraft();
}