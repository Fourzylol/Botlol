import { WASocket, ConnectionState, DisconnectReason, proto } from "@adiwajshing/baileys-md";
import { EventEmitter } from "events";
import type { Boom } from "@hapi/boom";
import { ChatUpdate } from "../Events/Parse-Messages";
import createEvents, { HandlerExports, EventsCommand } from "./command";
import Clients from "../clients/Cli";
import type { Messages, HistoryDB } from "../../types";
import { Saklar } from "./Ban-Mute";
import Database from "../clients/database";
import Log from "../../functions/logger";

globalThis.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36";
globalThis.prefix = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi;

export class createHandler {
	constructor(public clients: WASocket, public events: EventEmitter) {
		this.HandlerConditions()
		this.events.on("chat-update", (message: proto.IWebMessageInfo) => {
			if (message.key.remoteJid == "status@broadcast") return;
			if (message.message?.protocolMessage) return;
			if (message.message?.senderKeyDistributionMessage) return;
			if (message.message) this.events.emit("message-new",  ChatUpdate(message, clients))
		})
		this.events.on("message-new", async (message: Messages.IMessages) => {
			let handle: HandlerExports = new HandlerExports()
			let Cli: Clients =  new Clients(this.clients, message, this.events)
			globalThis.ev = new EventsCommand()
			await ev.sendCheck()
			await handle.createCommand()
			await handle.createCommandClass()
			await handle.getDecoratorCommand()
			if (((await import("./Ban-Mute")).DEFAULT_PUBLIC === Saklar.OFF) && !message.isOwner) return;
			if ((Cli.req.checkMute(String(message.from)) || Cli.req.checkMute(String(message.sender))) && !message.isOwner) return;
			await createEvents(message, Cli)
		})
		this.events.on("history-message", async (message: proto.IWebMessageInfo) => {
			if (message.key.remoteJid == "status@broadcast") return;
			const { botNumber, from, sender } = ChatUpdate(message, clients);
			let db: Database = new Database("history-message");
			if (db.isConnected) await db.connect;
			if (from) {
				if (await db.Test({ id: from })) {
					let getConfig: HistoryDB  = await db.search({ id: from}) as any;
					if (getConfig?.data) await db.setConfig(from, { data: [ ...getConfig.data, { id: from, sender, msg: ChatUpdate(message, clients), botNumber, time: Date.now()}] })
				} else await db.setConfig(from, { data: [ { id: from, sender, msg: ChatUpdate(message, clients), botNumber, time: Date.now()} ]})
			}
		});
	}
	private HandlerConditions = () => {
		this.events.on("check-condition", (conditions: Partial<ConnectionState>, create) => {
			switch(conditions.connection) {
				case "close":
					if ((conditions.lastDisconnect?.error as Boom).output.statusCode !== DisconnectReason.loggedOut) {
						create()
					} else {
						throw Log.error(new Error("Connection Close"))
					}
					break
			}
		})
	}
}