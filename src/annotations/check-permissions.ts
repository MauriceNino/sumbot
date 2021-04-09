import { PermissionResolvable } from "discord.js";
import { IActionContext } from "../commands/context.model";

export class InsufficientPermissionsError extends Error {
    public toString(): string {
        return 'User does not have the needed permissions to request this method!';
    }
}

export const checkPermissions = (permissions: PermissionResolvable) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const original = descriptor.value;

        descriptor.value = async function(ctx: IActionContext) {
            if(ctx.message.member.hasPermission(permissions)) {
                await original(ctx);
            } else {
                throw new InsufficientPermissionsError();
            }
        }

        return descriptor;
    };
}