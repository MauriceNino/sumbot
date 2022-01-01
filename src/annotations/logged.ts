import { IActionContext } from "../commands/context.model";

const LOG_ARGS = ["--log", "-l"];

export const logged = (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const original = descriptor.value;

  descriptor.value = async function (ctx: IActionContext) {
    try {
      await original(ctx);
    } catch (e) {
      if (typeof e === "string") {
        ctx.logger.error(e);
      } else {
        ctx.logger.error("Unknown Error occurred");
      }
    } finally {
      if (LOG_ARGS.some((arg) => ctx.command.includes(arg))) {
        const log = ctx.logger.toString();

        if (log != null && log != "") {
          await ctx.message.channel.send(log);
        }
      }
    }
  };

  return descriptor;
};
