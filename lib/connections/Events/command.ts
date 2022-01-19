import * as fs from "fs";
import { ICommands,  IMessages, IEventsHandler, ICommand,  ICmd  } from "../../types";
import { isObject } from "../../functions/functions";
import Clients from "../clients/Cli";
import path from "path"

var Events: any = {};
var EventsClass: any = {};
var EventsCallback: any = {};

export class HandlerExports {
	public createCommand = async () => {
		for (const getFile of fs.readdirSync("./lib/exports").filter((extension: string) => extension.endsWith(".ts"))) {
			let response: ICommands = (await import(__dirname + "/../../exports/" + getFile)).default;
			if (!response) continue
			if (response?.enable === undefined) response["enable"] = true;
			if (response.open === false && !response.command) continue;
			if (!response.eventName) continue;
			if (!Object.keys(Events || "")[0]) {
				Events[response.eventName as string] = { ...response, callback: response }
			} else {
				for (const getResponse in Events) {
					if (getResponse !== response.eventName) {
						Events[response.eventName as string] = { ...response, callback: response }
					}
				}
			}
		}
		globalThis.Events = {
			...await this.combineObjectValues(globalThis.Events, Events)
		}
    }
	private combineObjectValues = (event_1: any, event_2: any): any => {
		if (!event_1) event_1 = {};
		if (isObject(event_1) && isObject(event_2)) {
			for (const key in event_2) {
				if (!event_1[key]) Object.assign(event_1, { [key]: event_2[key]})
			}
		  }
		  return event_1;
	}
    public createCommandClass =  async () => {
		for (const file of fs.readdirSync("./lib/command").filter((extension: string) => extension.endsWith(".ts"))) {
			let respon: ICommand  = new (await import(__dirname + "/../../command/" + file)).default();
			if (!respon) continue;
			if (!respon.settings) continue;
			if (respon.settings.enable === undefined) respon.settings.enable = true;
			if (respon.settings.open === false && !respon.settings.command) continue;
			if (!respon.settings.eventName) continue;
			if (!Object.keys(EventsClass || "")[0]) {
				EventsClass[respon.settings.eventName as string] = { ...respon.settings, callback: respon.callback }
			} else {
				for (const getResponse in EventsClass) {
					if (getResponse !== respon.settings.eventName) { 
						EventsClass[respon.settings.eventName as string] = { ...respon.settings, callback: respon.callback }
					}
				}
			}
		}
		globalThis.Events = {
			...await this.combineObjectValues(globalThis.Events, EventsClass)
		}
	}
}

export class EventsCommand {
	public Event: any = EventsCallback;
	public async on (className: string, callback: (client: Clients, message: IMessages) => void, _event:  ICmd) {
		_event.enable = _event.enable ? _event.enable : true;
		if (!this.Event[className])  {
			this.Event[className] = {
				callback,
				..._event
			}
		}
		this.Event[className] = {
			...this.Event[className],
			callback,
			..._event
		}
	}
	public  async sendCheck () {
		for (const result of fs.readdirSync("./lib/src/").filter((value) => value.endsWith(".ts"))) {
			const getImport: any = (await import(path.join(__dirname, "../../src/", result)))
				for (let result in getImport) {
					getImport[result]
				}
		}
		globalThis.Events = {
			...await this.combineObjectValues(globalThis.Events, this.Event)
		}
	}
	private combineObjectValues = (event_1: any, event_2: any): any => {
		if (!event_1) event_1 = {};
		if (isObject(event_1) && isObject(event_2)) {
			for (const key in event_2) {
				if (!event_1[key]) Object.assign(event_1, { [key]: event_2[key]})
			}
		  }
		  return event_1;
	}
}


async function createEvents (message: IMessages, Cli: Clients) {
	if (globalThis.Events !== {}) {
		try {
			for (const Index in globalThis.Events) {
				const event: IEventsHandler = globalThis.Events[Index];
				if (!event.enable && !event.isOwner) continue;
				let cmd: string = "";
				if (message.isPrefix && message.Prefix) cmd = message.command?.replace(event.isPrefix ? message.Prefix : "","") || "";
				if (event.open && event.callback && typeof event.callback === "function") event.callback(Cli, message) 
				if (event.command instanceof RegExp ? !!(event.command.exec(String(cmd)))?.[0] : Array.isArray(event.command) ? (event.command as Array<string|RegExp>).some((value) => {
					return  value instanceof RegExp ? (value.exec(String(cmd)))?.[0] : (typeof value === "string") ? value === cmd : false
				}) : typeof event.command == "string" ? (event.command === cmd) : false) {
					if (event.isOwner && !message.isOwner) return;
					try {
						if (event.callback && typeof event.callback === "function") await event.callback(Cli, message)
					} catch (err) {
						console.error(err)
					} finally {
						console.info("Running : " + event.eventName)
					}
				}
			}
		} catch (err) {
			console.error(new Error(String(err)))
		}
	}
}


export default createEvents;