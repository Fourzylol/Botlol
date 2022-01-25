import * as fs from "fs";
import { ICommands,  Messages, IEventsHandler, ICommand,  ICmd  } from "../../types";
import { isObject, getUrl } from "../../functions/functions";
import Clients from "../clients/Cli";
import path from "path";
import chalk from "chalk";
import moment from "moment-timezone"

var Events: any = {};
var EventsClass: any = {};
var EventsCallback: any = {};
const spam_detected: Set<string> = new Set<string>();
const spam_notspam: Set<string> = new Set<string>();
moment.tz.setDefault('Asia/Jakarta').locale('id');

export class HandlerExports {
	public createCommand = async () => {
		for (const getFile of fs.readdirSync("./lib/exports").filter((extension: string) => extension.endsWith(".ts"))) {
			let response: ICommands = (await import(__dirname + "/../../exports/" + getFile)).default;
			if (!response) continue
			if (response?.enable === undefined) response["enable"] = true;
			if (response.isPrefix === undefined) response.isPrefix = true
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
			if (respon.settings.isPrefix === undefined) respon.settings.isPrefix = true;
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
	public async on (className: string, callback: (client: Clients, message: Messages.IMessages) => void, _event:  ICmd) {
		_event.enable = _event.enable ? _event.enable : true;
		_event.isPrefix = (_event.isPrefix !== undefined) ? _event.isPrefix : true;
		_event.eventName = className
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


async function createEvents (message: Messages.IMessages, Cli: Clients) {
	if (globalThis.Events !== {}) {
		try {
			for (const Index in globalThis.Events) {
				const event: IEventsHandler = globalThis.Events[Index];
				if (!event.enable && !event.isOwner) continue;
				let cmd: string =  message.command?.replace(event.isPrefix ? message.Prefix as string : "", "") || "";
				if (event.open && event.callback && typeof event.callback === "function") event.callback(Cli, message);
				if ((typeof event.command === "string" ? event.command === cmd : Array.isArray(event.command) ? (event.command as Array<string|RegExp>).some((values) => {
					return (typeof values === "string") ? values === cmd : (values instanceof RegExp) ? !!(values.exec(String(cmd)))?.[0] : false
				}) : (event.command instanceof RegExp) ? !!(event.command.exec(String(cmd))?.[0]) : false)) {
					if (event.open) return;
					if (!!spam_notspam.has(String(message.sender))) return;
					if ((event.antiSpam === undefined || event.antiSpam) && !message.isOwner && !!spam_detected.has(String(message.sender))) return spam_notspam.add(String(message.sender)) && Cli.reply(message.from as string, "*「❗」* Mohon Maaf kak gunakanlah waktu jeda untuk menggunakan command kembali", message.id)
					if (event.isOwner && !message.isOwner) return;
					if (event.isGroupMsg && !message.isGroupMsg && !message.isOwner) return Cli.reply(message.from as string, "*「❗」* Maaf kak perintah ini hanya bisa di gunakan di dalam grup saja kak", message.id);
					if (event.isAdmins && !message.isOwner && !(await (message.groupMetadata)?.())?.isGroupAdmins) return Cli.reply(message.from as string, "*「❗」*  Mohon Maaf kak, Perintah ini dapat digunakan khusus untuk admin group saja", message.id);
					if (event.isBotAdmins && !message.isOwner && !(await (message.groupMetadata)?.())?.isGroupAdmins) return Cli.reply(message.from as string, "*「❗」* Mohon Maaf Kak, Perintah ini dapat di gunakan jika bot menjadi admin group", message.id);
					if (event.isQuerry && !(message.args as Array<string>)?.[0]) return Cli.reply(message?.from as string, "*「❗」* Mohon Maaf kak, Harap Masukkan Querry untuk menggunakan perintah tersebut", message.id);
					if (event.isMedia && !message.isMedia) return Cli.reply(message.from as string, "*「❗」* Mohon Maaf kak, harap kirim atau reply Gambar/Video dengan caption untuk melaksanakan perintah tersebut", message.id);
					if (event.isUrl && !getUrl(message.args?.join(" "))) return Cli.reply(message.from as string, "*「❗」* Mohon Maaf kak Harap Masukkan Url Untuk Menggunakan Perintah Tersebut", message.id);
					if (event.isMentioned && !(message.mentioned)?.[0]) return Cli.reply(message.from as string, "*「❗」* Mohon Maaf kak harap tag seseorang untuk melakukan perintah tersebut", message.id);
					try {
						spam_detected.add(String(message.sender));
						if (event.callback && typeof event.callback === "function") await event.callback(Cli, message)
					} catch (err) {
						console.error(err)
					} finally {
						console.info(chalk.keyword('red')('\x1b[1;31m~\x1b[1;37m>'), chalk.keyword('blue')(`[\x1b[1;32m${chalk.hex('#009940').bold('RECORD')}]`), chalk.red.bold('\x1b[1;31m=\x1b[1;37m>'),chalk.cyan('\x1bmSTATUS :\x1b'), chalk.hex('#fffb00')(message.fromMe ? 'SELF' : 'PUBLIK'), chalk.greenBright('[COMMAND]'), chalk.keyword('red')('\x1b[1;31m~\x1b[1;37m>'), chalk.blueBright(message.command), chalk.hex('#f7ef07')(`[${message.args?.length}]`),chalk.red.bold('\x1b[1;31m=\x1b[1;37m>'), chalk.hex('#26d126')('[PENGIRIM]'),chalk.hex('#f505c1')(message.pushName), chalk.hex('#ffffff')(`(${message.sender?.replace(/@s.whatsapp.net/i, '')})`), chalk.greenBright('IN'), chalk.hex('#0428c9')(`${(await (message.groupMetadata)?.())?.groupMetadata?.subject}`), chalk.keyword('red')('\x1b[1;31m~\x1b[1;37m>'), chalk.hex('#f2ff03')('[DATE] =>'),chalk.greenBright(moment(new Date()).format('LLLL').split(' GMT')[0]))
						setTimeout(() => {
							if (!!spam_detected.has(String(message.sender))) spam_detected.delete(String(message.sender));
							if (!!spam_notspam.has(String(message.sender))) spam_notspam.delete(String(message.sender))
						}, 5000)
					}
				}
			}
		} catch (err) {
			console.error(new Error(String(err)))
		}
	}
}


export default createEvents;