import Socket, { useSingleFileAuthState, WASocket, ConnectionState, WAMessage, MessageUpdateType, proto } from "@adiwajshing/baileys-md";
import { EventEmitter } from "events";
import { createHandler } from "../Events/createEvents"
import EsPino from "pino";
import { config } from "dotenv";
config({ path:  "./.env" });

const { state, saveState } = useSingleFileAuthState("./lib/database/accounts/sessions-default.json")
export class createConnections extends EventEmitter {
	constructor(public configurations: { multi?: boolean, enableHistory?: boolean; }) {
		super()
		try {
			globalThis.HistoryMsg = (this.configurations.enableHistory === undefined) ? false : this.configurations.enableHistory;
			globalThis.Publik = false;
			const create = () => {
				const client: WASocket = Socket({
					auth: state,
					printQRInTerminal: true,
					logger: EsPino({ level: "fatal"})
				})
				new createHandler(client,this)
				client.ev.on("connection.update", (condition: Partial<ConnectionState>) => this.emit("check-condition", condition, create as any))
				client.ev.on("creds.update", saveState)
				client.ev.on("messages.upsert", (messages:  { messages: WAMessage[], type: MessageUpdateType }) => {
					if ((messages.messages[0])?.message) this.emit("chat-update", messages.messages[0] as proto.IWebMessageInfo);
					if (globalThis.HistoryMsg && (messages.messages[0])?.message) this.emit("history-message", messages.messages[0] as proto.IWebMessageInfo)
				})
				return client
			}
			create()
		} catch (error) {
			console.error(error)
		} 
	}
}