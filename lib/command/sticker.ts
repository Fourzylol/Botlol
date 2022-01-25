import {  ICommand, Messages, MediaType } from "../types";
import Clients from "../connections/clients/Cli";
import StickerAPI from "../connections/routers/api/sticker";
import type { proto } from "@adiwajshing/baileys-md"


export default class implements ICommand {
	async callback (client: Clients, message: Messages.IMessages): Promise <void | never> {
		const { from, media, args, id, isGambar, isQuotedImage, command } = message;
		let circle: boolean = false;
		if (/(circle)/gi.exec(String(command))) circle = true;
		await client.wait();
		let create: Buffer | null = null;
		try {
			create =  await new StickerAPI({ media: await client.decryptMedia(media as Messages.IMedia), type: ((isGambar || isQuotedImage) ? MediaType.IMAGE : MediaType.VIDEO) }, 
			{ author: args?.join(" ").split("|")[0] || "", pack: args?.join(" ").split("|")[1] || "", keepScale: true, circle }).build() as Buffer;
		} catch (e) {
			create = null;
		} finally {
			if (Buffer.isBuffer(create)) return void await client.sendFile(String(from), create, { quoted: id as proto.IWebMessageInfo })
			else  return void await client.reply(from as string, "*「❗」*  Bot Gagal Membuat sticker Harap coba lagi", id as proto.WebMessageInfo)
		}
	}
	readonly settings: ICommand["settings"];
	constructor () {
		this.settings = {
			command: ["sticker", "s", "stiker", "stickercircle", "stikercircle", "scircle"],
			eventName: "Sticker V1",
			tag: "converter",
			isMedia: true,
			event: ["sticker", "stickercircle"]
		};
	}
}