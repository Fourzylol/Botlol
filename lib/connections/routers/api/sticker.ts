import axios from "axios";
import FileType, { MimeType } from "file-type";
import * as fs from "fs";
import type { MediaType, MetadataSticker } from "../../../types"


export default class StickerAPI {
	constructor(private File: {
		media: string | Buffer,
		type: MediaType,
		mime?: Promise<MimeType|undefined>
	}, private StickerMetadata: MetadataSticker = {
		author: "rayyreall",
		pack: "I`am Ra",
		keepScale: true,
		removebg: "HQ",
		circle: false
	}) {
		if (typeof File.media === "string" && fs.existsSync(File.media)) File.mime = FileType.fromFile(File.media).then((value) => value?.mime);
		else if (Buffer.isBuffer(File.media)) File.mime = FileType.fromBuffer(File.media).then((value) => value?.mime);
		else File.mime = undefined;
		if (!StickerMetadata.author) StickerMetadata.author = "";
		if (!StickerMetadata.pack)  StickerMetadata.pack = "";
		if (StickerMetadata.keepScale === undefined) StickerMetadata.keepScale = true;
		if (StickerMetadata.circle === undefined)  StickerMetadata.circle = false;
	};
	private readonly DEFAULT_URL: string = "https://sticker-api.openwa.dev/";
	public readonly build = async (): Promise <Buffer> => {
		return new Promise<Buffer>(async (resolve, reject) => {
			let Type: "file" | "image" | null
			if (this.File.type === "image") Type = "image";
			else if (this.File.type === "video") {
				Type = "file"
				this.config = {
					...this.config,
					processOptions: {
						crop: (this.StickerMetadata.keepScale !== undefined) ? this.StickerMetadata.keepScale : false,
						fps: 10,
						startTime: "00:00:00.0",
						endTime: "00:00:7.0",
						loop: 0
					},
				}
			} else Type = null;
			if (typeof this.File.media === "string" && fs.existsSync(this.File.media)) this.File.media = fs.readFileSync(this.File.media);
			if (!Type) return reject(new Error("Cannot Extract Type"));
			if (!Buffer.isBuffer(this.File.media)) return reject(new Error("Cannot Convert Media to Buffer"));
			await axios({
				url: String(`${this.DEFAULT_URL}${(this.File.type === "image") ? "prepareWebp" : "convertMp4BufferToWebpDataUrl"}`),
				method: "POST",
				headers: {
					Accept: "application/json, text/plain, /",
					"Content-Type": "application/json;charset=utf-8",
					"User-Agent": "WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36"
				},
				data: JSON.stringify(Object.assign(this.config, { stickerMetadata: this.StickerMetadata }, {[Type]: `data:${(await this.File.mime)};base64,${this.File.media.toString("base64")}`})),
				maxBodyLength: 20000000, 
				maxContentLength: 1500000
			}).then(({ data}) => {
				if (this.File.type === "image") return resolve(new Buffer(data.webpBase64, "base64"));
				else return resolve(new Buffer(data.split(";base64,")[1], "base64"))
			}).catch((err) => reject(err))
		})
	}
	private config: any = {
		sessionInfo: {
			WA_VERSION: "2.2106.5",
			PAGE_UA: "WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36",
			WA_AUTOMATE_VERSION: "3.6.10 UPDATE AVAILABLE: 3.6.11",
			BROWSER_VERSION: "HeadlessChrome/88.0.4324.190",
			OS: "Windows Server 2016",
			START_TS: 1614310326309,
			NUM: "6247",
			LAUNCH_TIME_MS: 7934,
			PHONE_VERSION: "2.20.205.16"
		},
		config: {
			sessionId: "session",
			headless: true,
			qrTimeout: 20,
			authTimeout: 0,
			cacheEnabled: false,
			useChrome: true,
			killProcessOnBrowserClose: true,
			throwErrorOnTosBlock: false,
			chromiumArgs: [
			  "--no-sandbox",
			  "--disable-setuid-sandbox",
			  "--aggressive-cache-discard",
			  "--disable-cache",
			  "--disable-application-cache",
			  "--disable-offline-load-stale-cache",
			  "--disk-cache-size=0"
			],
			executablePath: "C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe",
			skipBrokenMethodsCheck: true,
			stickerServerEndpoint: true
		  }
	}
}