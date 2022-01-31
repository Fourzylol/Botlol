import { WASocket, ConnectionState, DisconnectReason, proto } from "@adiwajshing/baileys-md";
import * as fs from "fs";
import { EventEmitter } from "events";
import { Boom } from "@hapi/boom";
import { ChatUpdate } from "../Events/Parse-Messages";
import createEvents, { HandlerExports, EventsCommand } from "./command";
import Clients from "../clients/Cli";
import { Messages } from "../../types";

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
			if (!message.isOwner && !globalThis.Publik) return;
			let handle: HandlerExports = new HandlerExports()
			let Cli: Clients =  new Clients(this.clients, message, this.events)
			if (Cli.req.checkMute(message.from as string, message.from as string)) return;
			globalThis.ev = new EventsCommand()
			await ev.sendCheck()
			await handle.createCommand()
			await handle.createCommandClass()
			await handle.getDecoratorCommand()
			await createEvents(message, Cli)
		})
		this.events.on("history-message", async (message: proto.IWebMessageInfo) => {
			if (message.key.remoteJid == "status@broadcast") return;
			const { botNumber, from, sender } = ChatUpdate(message, clients);
			let Path: string = "./lib/database/history/" + botNumber + "-" + from + ".json";
			if (!fs.existsSync(Path)) fs.writeFileSync(Path, JSON.stringify([]));
			else {
				let file: Array<Messages.HistorysMessages> = JSON.parse(fs.readFileSync(Path).toString());
				let Format: Messages.HistorysMessages  =  {
					id: from as string,
					sender: sender as string,
					time: Date.now(),
					message
				}
				file.push(Format);
				fs.writeFileSync(Path, JSON.stringify(file))
			}
		})
	}
	private HandlerConditions = () => {
		this.events.on("check-condition", (conditions: Partial<ConnectionState>, create) => {
			switch(conditions.connection) {
				case "close":
					if ((conditions.lastDisconnect?.error as Boom).output.statusCode !== DisconnectReason.loggedOut) {
						create()
					} else {
						throw console.error(new Error("Connection Close"))
					}
					break
			}
		})
	}
}