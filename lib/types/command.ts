import { Messages } from "./Messages";
import Clients from "../connections/clients/Cli";

export interface IEventsCmd {
	eventName?: string;
	event?: string[] | string;
	tag?: string;
	command?: string | Array<string | RegExp> | RegExp;
	isOwner?: boolean;
	isGroupMsg?: boolean;
	enable?: boolean;
	isQuerry?: boolean;
	open?: boolean;
	openCmd?: boolean;
	isPrefix?: boolean;
	isMedia?: boolean;
	isMentioned?: boolean;
	isUrl?: boolean;
	isAdmins?: boolean;
	isBotAdmins?: boolean;
	antiSpam?: boolean;
	skipMenu?: boolean;
}
export  type ICommands = IEventsCmd & IEventsHandler & ICommandss

export  interface IEventsHandler {
	callback?: (client: Clients, message: Messages.Messages) =>  Promise <void | never> | void | never;
}

export  type ICommandss  = {
	(client: Clients, message: Messages.Messages):  Promise <void | never> | void | never;
}

export declare interface ICommand {
	callback: (client: Clients, message: Messages.Messages) => Promise <void | never> | void | never;
	settings: IEventsCmd;
}