import { WASocket, proto, downloadContentFromMessage, DownloadableMessage, MediaType, generateWAMessage, AnyMessageContent,  MessageGenerationOptions, generateMessageID } from "@adiwajshing/baileys-md";
import axios, { AxiosResponse } from "axios";
import { ExtractAndCheckUrl, RandomName, ParseExtensionFromMime } from "../../functions/functions";
import Jimp from "jimp"
import { Messages  } from '../../types';
import FileType, { FileTypeResult } from "file-type"
import { Transform } from "stream";
import * as fs from "fs";
import util from "util";
import Api from "./api";

type AutoPath = { file: string, mimetype: FileType.MimeType | undefined, ext: FileType.FileExtension | undefined }
export default class Client {
	constructor (public client: WASocket, public message: Messages.IMessages, public events: import("events").EventEmitter) {}
	public sendText = async (from: string, text: string) => {
		return (await this.client.sendMessage(from, { text }))
	}
	public readonly API: Api = new Api();
	public sock: WASocket = this.client;
	public ev: import("events").EventEmitter = this.events;
	public reply = async (from: string, text: string, id?: proto.IWebMessageInfo) => {

		return (await this.client.sendMessage(from, { text }, { quoted: id }))
	}
	public readonly prepareMessageFromContent = async (from: string, content: AnyMessageContent, options:  MessageGenerationOptions) => {
		return new Promise <proto.WebMessageInfo> (async (resolve) => resolve(await generateWAMessage(from, content, options)))
	}
	
	public readonly decryptMedia = async (media: Messages.IMedia, save?: boolean, path?: string): Promise <string | Buffer> => {
		try {
			const Stream: Transform = await downloadContentFromMessage(media.file as DownloadableMessage , media.type as MediaType)
			let buffer: Buffer = Buffer.from([])
			for await (const chunk of Stream) {
				buffer = Buffer.concat([buffer, chunk])
			}
			if (save) {
				let Path: string = `./lib/database/media/temp/${Date.now()}.${media.mimetype}`;
				if (path) Path = path + "." + media.mimetype;
				fs.writeFileSync(Path, (buffer))
				return Path
			} else {
				return buffer;
			}
		} catch (err) {
			console.log(err)
			return String(new Error(String(err)))
		}
	}
	public sendTextWithMentions = async (from: string, text: string, id?: proto.IWebMessageInfo): Promise <proto.WebMessageInfo> => {
		return (await this.client.sendMessage(from, { text, mentions: [...await (this.message.parseMentions)?.(text) as string[]] as string[] }, { quoted: id }))
	}
	public Print = async (msg: Object | any) => {
		return await this.reply(this.message.from as string, JSON.stringify(msg, null, 4), this.message.id)
	}
	public Panic = async (error: any) =>{
		return await this.reply(this.message.from as string, util.format(error), this.message.id)
	}
	public wait = async () => {
		return await this.reply(this.message.from as string, `*⌛* Mohon tunggu sebentar bot sedang melaksanakan perintah`, this.message.id)
	}
	public getChatAll =  () => {
		let File: string[] = fs.readdirSync("./lib/database/history/");
		let respon: Array<string> = []
		for (let index of File) {
			respon.push(index.split(".json")[0].split("@s.whatsapp.net-")[1])
		}
		return respon;
	}
	public sendFile = async (from: string, media: string | Buffer, settings: Messages.MetadataFile = {}) => {
		try {
			let File: AutoPath | undefined;
			let config;
			if (Buffer.isBuffer(media)) {
				File = await this.AutoSave(media)
				config = {
					[settings.docs ? "document" : ParseExtensionFromMime(File.mimetype as FileType.MimeType)?.type as Messages.TypesFile]: {
						stream: fs.createReadStream(File.file)
					},
					mimetype: File.mimetype
				}
			} else if ((typeof media === "string" && ExtractAndCheckUrl(media).isDetect) || (typeof media === "string" && fs.existsSync(media))) {
				File = await this.AutoSave((await this.getBuffer(media))?.file as Buffer)
				if ((typeof media === "string" && fs.existsSync(media))) config = {
					[settings.docs ? "document" :ParseExtensionFromMime(File.mimetype as FileType.MimeType)?.type as Messages.TypesFile]: {
						stream: fs.createReadStream(File.file)
					},
					mimetype: File.mimetype
				}
				else if ((typeof media === "string" && ExtractAndCheckUrl(media).isDetect)) config = {
					[settings.docs ? "document" : ParseExtensionFromMime(File.mimetype as FileType.MimeType)?.type as Messages.TypesFile]: {
						url:  ExtractAndCheckUrl(media).first_url
					},
					mimetype: File.mimetype
				}
			} 
			if (config) { 
				config.mimetype = settings.mimetype as FileType.MimeType || config.mimetype;
				settings.mimetype = settings.mimetype as FileType.MimeType || config.mimetype;
				if (Object.keys(config)[0] == "image") config.jpegThumbnail = await this.compressImage(media) as any;
				await this.client.sendMessage(from, {...config as any, ...settings, mentions: settings.isMentions ? [...await (this.message.parseMentions)?.(settings.caption || "") as string[]] : [], }, { ...settings })
				if (Buffer.isBuffer(media) && fs.existsSync(String(File?.file))) fs.unlinkSync(String(File?.file))
			} else {
				return console.error(new Error("can't convert the media you want to send"))
			}
		} catch (err) {
			console.log(err)
		}
	}
	private AutoSave = async (media: Buffer): Promise <AutoPath> => {
		let checkFile: FileTypeResult | undefined = await FileType.fromBuffer(media);
		let File: string = `./lib/database/media/temp/${RandomName()}.${checkFile?.ext}`
		fs.writeFileSync(File, (media))
		return {
			file: File,
			mimetype: checkFile?.mime,
			ext: checkFile?.ext
		}
	}
	public compressImage = async (file: Buffer | string) => {
		const jimp = await Jimp.read(file as any)
		const result = await jimp.resize(48, 48).getBufferAsync(Jimp.MIME_JPEG)
		return result;
	}
	public getBuffer = async (media: string): Promise <{ file: Buffer, ext: string, mimetype: string }| undefined> => {
		if (typeof media === "string") {
			if (fs.existsSync(media)) {
				let Type: FileType.FileTypeResult | undefined = (await FileType.fromFile(media))
				return {
					file: fs.readFileSync(media),
					ext: Type?.ext as string,
					mimetype: Type?.mime as string
				}
			} else if (ExtractAndCheckUrl(media).isDetect) {
				let File: AxiosResponse = (await axios.get<Buffer>(ExtractAndCheckUrl(media).first_url, { responseType: "arraybuffer" }))
				return {
					file: File.data,
					ext: File.headers["Content-Type"]?.split("/")[1] || (await FileType.fromBuffer(File.data))?.ext as string,
					mimetype: File.headers["Content-Type"]  || (await FileType.fromBuffer(File.data))?.mime as string
				};
			}
		} 
	}
}