import { WASocket, ConnectionState, DisconnectReason, proto } from "@adiwajshing/baileys-md";
import { EventEmitter } from "events";
import { Boom } from "@hapi/boom";
import { ChatUpdate } from "../Events/Parse-Messages";
import { IMessages } from "../../types";
import createEvents, { HandlerExports, EventsCommand } from "./command";
import Clients from "../clients/Cli";

export class createHandler {
	constructor(public clients: WASocket, public events: EventEmitter) {
		this.HandlerConditions()
		this.events.on("chat-update", (message: proto.IWebMessageInfo) => {
			if (message.key.remoteJid == "status@broadcast") return;
			if (message.message?.protocolMessage) return;
			if (message.message?.senderKeyDistributionMessage) return;
			if (message.message) this.events.emit("message-new",  ChatUpdate(message, clients))
		})
		this.events.on("message-new", async (message: IMessages) => {
			if (!message.isOwner) return
			let handle: HandlerExports = new HandlerExports()
			let Cli: Clients =  new Clients(this.clients, message, this.events)
			globalThis.ev = new EventsCommand()
			await ev.sendCheck()
			await handle.createCommand()
			await handle.createCommandClass()
			await createEvents(message, Cli)
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