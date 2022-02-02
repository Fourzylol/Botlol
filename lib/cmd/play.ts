import Command, {  Cmd, getCallback  } from "../connections/Events/cmdDecorator";
import type { ConfigYTSearch, YoutubeDlCore, Y2Mate, Messages  } from "../types";
import type { VideoMetadataResult } from "yt-search";
import { proto, generateWAMessage, WASocket, generateMessageID, WAMediaUpload } from "@adiwajshing/baileys-md";
import * as fs from "fs";
import { AutoPath } from '../functions/functions';

@Cmd("Youtube-Play", {
	command: ["play", /(musi(?:c|k))/i, /(ytmp(?:3|4))/i],
	event: ["play", "ytmp3", "ytmp4"],
	tag: "musik",
	isQuerry: true,
	description: "querry/url"
})

export default class extends Command {
	public callback: getCallback  = async (client, data) => {
		const { from, id, args, Prefix, command } = data;
		var { regexYoutube, ytdlCore, y2Mate, ytSearch } = client.API;
		await client.wait();
		let getCmd: string;
		if ((Prefix && Prefix.body === "ytmp3") || command === "ytmp3") getCmd = "mp3";
		else if ((Prefix && Prefix.body === "ytmp4") || command === "ytmp4") getCmd = "mp4";
		else getCmd = args[0].toLowerCase();
		let Type: "audio" | "video";
		switch(getCmd) {
			case "mp4":
			case "video":
			Type = "video";
			if (!(Prefix && /(ytmp(?:3|4))/i.test(Prefix.body || command))) args.shift();
			break
			case "mp3":
			case "audio":
			Type = "audio";
			if (!(Prefix && /(ytmp(?:3|4))/i.test(Prefix.body || command))) args.shift();
			break
			default: {
				Type = this.DEFAULT_TYPE;
			}
		}
		let config: ConfigYTSearch;
		if (regexYoutube.test(args.join(" "))) config = {
			url: String(args.join(" ").match(regexYoutube)?.[0])
		}
		else config = {
			querry: String(args.join(" ")),
			getFirst: true,
			infoAll: true
		}
		let result: VideoMetadataResult | null = null;
		try {
			result = await ytSearch(config) as VideoMetadataResult;
		} catch (err) {
			result = null;
			return new Error(err as string);
		} finally {
			if (!result) return client.Panic("Video tidak ditemukan");
			await Promise.all([ytdlCore(result.url, Type).catch(err => void err), y2Mate(result.url, { ext: Type === "video" ? "mp4" : "mp3" }).catch(err => void err)]).then(async ([videoData, videoMate]) => {
				if (videoData) {
					let combine: YoutubeDlCore & VideoMetadataResult = Object.assign(videoData, result);
					await client.sendFile(String(from), combine.thumbnail, { caption: this.createText(combine, Type), quoted: id});
					if (Type === "audio") {
						let getProto: { data: proto.Message, Path: string | undefined} = await this.createProtoAudio(client.client, data as Messages.Messages, { url: (await client.getBuffer(combine.down))?.file as Buffer, videoUrl: combine.video_url, thumbnail: (await client.compressImage(combine.thumbnail))})
						await client.client.relayMessage(from as string, getProto.data, { messageId: generateMessageID() })
						if (fs.existsSync(getProto.Path as string)) fs.unlinkSync(getProto.Path as string); 
					} else if (Type === "video") await client.sendFile(String(from), combine.down, { quoted: id });
				} else if (videoMate) {
					let combine: Y2Mate & VideoMetadataResult = Object.assign(videoMate, result);
					await client.sendFile(String(from), combine.thumbnail, { caption: this.createText(combine as any, Type), quoted: id});
					if (Type === "audio") {
						let getProto: { data: proto.Message, Path: string | undefined} = await this.createProtoAudio(client.client, data as Messages.Messages, { url: combine.data, videoUrl: combine.url, thumbnail: (await client.compressImage(combine.thumbnail))})
						await client.client.relayMessage(from as string, getProto.data, { messageId: generateMessageID() })
						if (fs.existsSync(getProto.Path as string)) fs.unlinkSync(getProto.Path as string); 
					}
					else if (Type === "video") await client.sendFile(String(from), combine.data, { quoted: id });
				} else {
					return await client.Panic("*「❗」*  Mohon Maaf Bot download File")
				}
			}).catch(err => void console.error(err) && client.Panic("*「❗」*  Mohon maaf kak Bot gagal mengconversi melakukan download"));
		}
	}
	private DEFAULT_TYPE: "audio" = "audio";
	private createProtoAudio = async (Cli: WASocket, data: Messages.Messages, options: { url: string | Buffer, videoUrl: string, thumbnail: Buffer }): Promise<{ data: proto.Message, Path: string | undefined}> => {
		let config: WAMediaUpload;
		let Path: string | undefined;
		if (typeof options.url === "string") {
			config = {
				url: options.url as string
			} 
		} else {
			Path = AutoPath("mp3");
			fs.writeFileSync(Path, options.url);
			config = {
				stream: fs.createReadStream(Path as string)
			}
		}
		return { data: proto.Message.fromObject({
			audioMessage: proto.AudioMessage.fromObject({
				contextInfo: proto.ContextInfo.fromObject({
					quotedMessage: data.id.message,
					participant: data.sender,
					remoteJid: data.from,
					externalAdReply: proto.ExternalAdReplyInfo.fromObject({
						title: `👾 PLAY MP3 👾`,
						body: "RA BOT",
						mediaUrl: options.videoUrl,
						mediaType: 2,
						thumbnail: options.thumbnail
					})
				}),
				...((await generateWAMessage(data.from as string, { audio: {
					...config
				}}, { upload: Cli.waUploadToServer, messageId: generateMessageID() as string, userJid: Cli.authState.creds.me!.id }))).message?.audioMessage
			})
		}), Path: Path }
	}
	private createText = (respon: (YoutubeDlCore & VideoMetadataResult) & (Y2Mate | VideoMetadataResult), options: "video" | "audio"): string => {
		let Text: string = 
`
*╭────────────────*
*│「 𝐏𝐋𝐀𝐘 𝐘𝐎𝐔𝐓𝐔𝐁𝐄  」*
*╰────────────────*\n\n`;
if (respon.videoId) Text += `*📬 ID :* ${respon.videoId}\n`;
if (respon.title) Text += `*📝 Title :* ${respon.title}\n`;
if (respon.channel) Text += `*📢 Channel :* ${respon.channel}\n`;
if (respon.durasi) Text += `*🕰 Duration :* ${respon.durasi}\n`;
if (respon.rilis) Text += `*📅 Release :* ${respon.rilis}\n`;
if (respon.thumbnail) Text += `*📷 Thumbnail :* ${respon.thumbnail}\n`;
if (respon.viewers) Text += `*👁️ Viewers :* ${respon.viewers}\n`;
if (respon.like) Text += `*👍 Likes :* ${respon.like}\n`;
if (respon.dislike) Text += `*👎 Dislikes :* ${respon.dislike}\n`;
if (respon.quality) Text += `*📺 Quality :* ${respon.quality}\n`;
if (respon.size) Text += `*📦 Size :* ${respon.size}\n`;
if (respon.format) Text += `*📁 Format :* ${respon.format}\n`;
if (respon.video_url) Text += `*🎥 Video URL :* ${respon.video_url}\n`;
if (respon.category) Text += `*📁 Category :* ${respon.category}\n`;
if (respon.desk) Text += `*📝 Description :* ${respon.desk}\n`;
Text +=`\n\n*╭─── ⟬ Play ${options.toLowerCase()} ⟭ ───*
*│ 🤖 Author : I` + ` am Ra*  
*╰───「 RA BOT 」───*`;
return Text;
	}
}