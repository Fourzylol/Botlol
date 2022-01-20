import {  ICommand, IMessages } from "../types";
import Clients from "../connections/clients/Cli";


export default class implements ICommand {
	async callback (client: Clients, message: IMessages) {
		const { from, media, args, id } = message;
		await client.wait()
		await client.sendFile(String(from), (await new (await import("../tools/sticker")).default({
			pack: String(args?.join(" "))
		}).convertSticker((await client.decryptMedia(media as import("../types").IMedia)))), { quoted: id }).catch(async(err) => 
		(await client.Panic("*「❗」* Mohon Maaf kak, Bot Gagal membuat sticker anda bot akan segera menghubungi owner")) && console.error(err))
	}
	readonly settings: ICommand["settings"];
	constructor () {
		this.settings = {
			command: ["sticker", "s", "stiker"],
			eventName: "Sticker V1",
			tag: "converter",
			isMedia: true
		};
	}
}