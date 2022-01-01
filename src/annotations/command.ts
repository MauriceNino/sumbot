export interface ICommandDescription {
  aliases: string[];
  name?: string;
  description?: string;
}

export interface ICommand {
  description: ICommandDescription;
  action: Function;
}

const COMMAND_COLLECTION: ICommand[] = [];

export const command = (description: ICommandDescription) => {
  console.log(`Registering command [${description.name}]`);
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const action = descriptor.value;

    COMMAND_COLLECTION.push({
      description,
      action,
    });

    return descriptor;
  };
};

export class Commands {
  public static getActionFromCommandStr(cmd: string): Function {
    return COMMAND_COLLECTION.find((command) =>
      command.description.aliases.includes(cmd)
    )?.action;
  }

  public static getCommands(): ICommand[] {
    return COMMAND_COLLECTION;
  }
}
