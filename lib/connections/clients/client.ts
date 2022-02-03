import Socket, { useSingleFileAuthState, WASocket, ConnectionState, WAMessage, MessageUpdateType, proto, DEFAULT_CONNECTION_CONFIG } from "@adiwajshing/baileys-md";
import { EventEmitter } from "events";
import { createHandler } from "../Events/createEvents";
import axios, { AxiosResponse } from "axios";
import Log from "../../functions/logger";
import EsPino from "pino";
import { config } from "dotenv";
config({ path:  "./.env" });

const { state, saveState } = useSingleFileAuthState("./lib/database/accounts/sessions-default.json")
export class createConnections extends EventEmitter {
	constructor(public configurations: { multi?: boolean, enableHistory?: boolean; }) {
		super()
		try {
			globalThis.HistoryMsg = (this.configurations.enableHistory === undefined) ? false : this.configurations.enableHistory;
			const create =  () => {
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
			Log.error(error)
		} 
	}
	private DEFAULT_URL_VERSION: string = "https://web.whatsapp.com/check-update?version=1&platform=web";
	private readonly checkVersion = async (): Promise <[number, number, number]>  => {
		return new Promise<[number, number, number]>(async (resolve, reject) => {
			let data: AxiosResponse = await axios.get(this.DEFAULT_URL_VERSION);
			const newArr: Array<number> = new Array<number>();
			for (const value of JSON.parse(JSON.stringify(data.data)).currentVersion.split(".")) {
				if (value.length > 1) {
					newArr.push(parseInt(value));
				} else {
					newArr.push(parseInt(value));
				}
			}
			return resolve(newArr as [number, number, number]);
		})
	}
}