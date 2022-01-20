import { WASocket } from "@adiwajshing/baileys-md";
import { IMessages } from "./Messages";
import Clients from "../connections/clients/Cli";


export declare interface IEventsHandler {
	eventName?: string;
	event?: string[];
	tag?: string;
	command?: string | Array<string | RegExp> | RegExp;
	isOwner?: boolean;
	isGroupMsg?: boolean;
	enable?: boolean;
	isQuerry?: boolean;
	callback?: (client: Clients, message: IMessages) =>  Promise <void | never> | void | never;
	open?: boolean;
	isPrefix?: boolean;
	isMedia?: boolean;
}

export declare type ICommands  = {
	(client: Clients, message: IMessages):  Promise <void | never> | void | never;
	eventName?: string;
	event?: string[]
	tag?: string;
	command?: string | Array<string | RegExp> | RegExp;
	isOwner?: boolean;
	isGroupMsg?: boolean;
	enable?: boolean;
	isQuerry?: boolean;
	open?: boolean;
	isPrefix?: boolean;
	isMedia?: boolean;
}

export declare interface ICommand {
	callback: (client: Clients, message: IMessages) => Promise <void | never> | void | never;
	settings: {
		eventName?: string;
		event?: string[]
		tag?: string;
		command?: string | Array<string | RegExp> | RegExp;
		enable?: boolean;
		isOwner?: boolean;
		isGroupMsg?: boolean;
		isQuerry?: boolean;
		open?: boolean;
		isPrefix?: boolean;
		isMedia?: boolean;
	}
}
export declare interface ICmd {
	event: string[];
	tag: string;
	command: string | Array<string | RegExp> | RegExp;
	enable?: boolean;
	isOwner?: boolean;
	isGroupMsg?: boolean;
	isQuerry?: boolean;
	open?: boolean;
	isPrefix?: boolean
	eventName?: string;
	isMedia?: boolean
}