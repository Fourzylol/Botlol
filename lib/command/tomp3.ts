import type { ICommand, Messages } from "../types";
import Clients from "../connections/clients/Cli";
import Converter from "../tools/converter";

export default class implements ICommand {
	async callback (client: Clients, message: Messages.Messages) {
		const { from, isVideo, isQuotedVideo, media, id } = message;
		if (isVideo || isQuotedVideo) {
			await client.wait();
			let save: string = await client.decryptMedia(media, true) as string;
			let create: Buffer = await  new Converter({ file: save}).convertMp3("buffer") as Buffer;
			if (Buffer.isBuffer(create))  await client.sendFile(String(from), create, { quoted: id });
			client.deleteFile(save);
		} else {
			await client.reply(from as string, "*「❗」*  Mohon Maaf kak, media yang kakak kirim tidak support untuk fitur ini", id)
		}
	}
	readonly settings: ICommand["settings"];
	constructor () {
		this.settings = {
			command: ["tomp3"],
			eventName: "convert to mp3",
			tag: "converter",
			isMedia: true,
			event: ["tomp3"]
		}
	}
}