import { ICommand } from "../types"

export class BaseCommand implements ICommand {
	public settings = {}
    constructor(public id: string) {}
	public callback = async () : Promise<void> => {
}
}

export const Cmd = (id: string, options: { command: string}): ClassDecorator => {
	return (<T extends BaseCommand>(target: new (...args: CommandParams) => T): new (client: any) => T => {
		return new Proxy(target, {
			construct: (ctx, [client]): T => new ctx(client)
		}) as new (client: any) => T
	}) as ClassDecorator
}

export type CommandParams = ConstructorParameters<typeof BaseCommand>