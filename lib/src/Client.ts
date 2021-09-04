import { WAConnection, MessageType, proto, compressImage } from '@adiwajshing/baileys'
import * as fs from 'fs'
import { isUrl, Buffer, getMentions, RandomName } from '../functions/function'
import filetype, { FileTypeResult } from "file-type"

export class Client {
    constructor(public Client: WAConnection) {}
    public async sendText(from: string, text: string): Promise<void> {
        return void (await this.Client.sendMessage(from, text, MessageType.text))
    }
    public async sendTextWithMentions(from: string, text: string,  id?: proto.WebMessageInfo | undefined): Promise<void> {
        try {
			return id ? void (await this.Client.sendMessage(from, text, MessageType.text, { contextInfo: { mentionedJid: getMentions(text)?.map((value) => value.split("@")[1] + "@s.whatsapp.net")}, quoted: id })) : void (await this.Client.sendMessage(from, text, MessageType.text, { contextInfo: { mentionedJid:  getMentions(text)?.map((value) => value.split("@")[1] + "@s.whatsapp.net") }}))
        } catch (err) {
            throw console.log(err)
        }
    }
	public async decryptMediaSave (media: proto.WebMessageInfo, path?: string): Promise <string> {
		if (!path) path = "./lib/storage/temp/" +  RandomName(15)
		try {
			return await this.Client.downloadAndSaveMediaMessage(media, path)
		} catch (err) {
			throw console.log(err)
		}
	}
	public async decryptMediaMessage (media: proto.WebMessageInfo): Promise <Buffer> {
		try {
			return await this.Client.downloadMediaMessage(media)
		} catch (err) {
			throw console.log(err)
		}
	}
    public async sendContactOwner(from: string, id?: proto.WebMessageInfo): Promise<void> {
        try {
            const Vcard: string =
                'BEGIN:VCARD\n' +
                'VERSION:3.0\n' +
                'FN: I`am Ra\n' +
                'ORG: RA BOT\n' +
                'TEL;type=CELL;type=VOICE;waid=33753045534:+33 7 53 04 55 34\n' +
                'END:VCARD'
            const Contact: { displayname: string; vcard: string } | any = {
                displayname: 'I`am Ra',
                vcard: Vcard
            }
            return void (await this.Client.sendMessage(from, Contact, MessageType.contact, { quoted: id }))
        } catch (err) {
            throw console.log(err)
        }
    }
	public async sendDocument (from: string, file: Buffer | string, id?: proto.WebMessageInfo) {
		try {
			if (typeof file !== "string") {
				const types: FileTypeResult | undefined = await filetype.fromBuffer(file)
				return void (await this.Client.sendMessage(from, file, MessageType.document, { quoted: id, mimetype: types?.mime}))
			} else if (fs.existsSync(file)) {
				const types: FileTypeResult | undefined  = await filetype.fromFile(file)
				return void (await this.Client.sendMessage(from, fs.readFileSync(file), MessageType.document, { quoted: id, mimetype: types?.mime}))
			} else if (isUrl(file)) {
				let Media: Buffer = await Buffer(file)
				const types: FileTypeResult | undefined  = await filetype.fromBuffer(Media)
				return void (await this.Client.sendMessage(from, Media, MessageType.document, { quoted: id, mimetype: types?.mime}))
			} else {
                throw new Error('Input Invalid')
            }
		} catch (err) {
			throw console.log(err)
		}
	}
    public async reply(from: string, text: string, id?: proto.WebMessageInfo | undefined): Promise<void> {
        try {
            if (id !== undefined) {
                return void (await this.Client.sendMessage(from, text, MessageType.extendedText, { quoted: id }))
            } else {
                return void (await this.Client.sendMessage(from, text, MessageType.extendedText))
            }
        } catch (err) {
            throw console.log(new Error(`${err}`))
        }
    }
    public async sendVideo(from: string, media: Buffer | string, caption?: string, id?: proto.WebMessageInfo): Promise<void | Error> {
        try {
            if (typeof media !== 'string') {
                const data: proto.WebMessageInfo = id ? await this.Client.prepareMessage(from, media, MessageType.video, { quoted: id, caption: caption }) : await this.Client.prepareMessage(from, media, MessageType.video, { caption})
                return void (await this.Client.relayWAMessage(data))
            } else if (fs.existsSync(media)) {
                let Media: Buffer = fs.readFileSync(media)
                const data: proto.WebMessageInfo = id ? await this.Client.prepareMessage(from, Media, MessageType.video, { quoted: id, caption: caption }) : await this.Client.prepareMessage(from, Media, MessageType.video, { caption })
                return void (await this.Client.relayWAMessage(data))
            } else if (isUrl(media)) {
                let Media: Buffer = await Buffer(media)
                const data: proto.WebMessageInfo = id ? await this.Client.prepareMessage(from, Media, MessageType.video, { quoted: id, caption: caption }) : await this.Client.prepareMessage(from, Media, MessageType.video, { caption})
                return void (await this.Client.relayWAMessage(data))
            } else {
                throw new Error('Input Invalid')
            }
        } catch (err) {
            throw console.log(new Error(`${err}`))
        }
    }
    public async sendImage(from: string, media: Buffer | string, caption?: string, id?: proto.WebMessageInfo): Promise<void | Error> {
        try {
            if (typeof media !== 'string') {
				const Media: any = await compressImage(media)
				const data: proto.WebMessageInfo = id ? await this.Client.prepareMessage(from, media, MessageType.image, { quoted: id, thumbnail: Media, caption}): await this.Client.prepareMessage(from, media, MessageType.image, {
					thumbnail: Media,
					caption
				})
                    return void (await this.Client.relayWAMessage(data))
            } else if (fs.existsSync(media)) {
                const Media: any = await compressImage(media)
                const data: proto.WebMessageInfo = id ? await this.Client.prepareMessage(from, Media, MessageType.image, { quoted: id, thumbnail: Media, caption }) : await this.Client.prepareMessage(from, Media, MessageType.image, { thumbnail: Media, caption })
                return void (await this.Client.relayWAMessage(data))
            } else if (isUrl(media)) {
                let Media: Buffer = await Buffer(media)
                const Thumb: any = await  compressImage(Media)
                const data: proto.WebMessageInfo = id ? await this.Client.prepareMessage(from, Media, MessageType.image, { quoted: id, thumbnail: Thumb, caption }) : await this.Client.prepareMessage(from, Media, MessageType.image, { thumbnail: Thumb, caption })
                return void (await this.Client.relayWAMessage(data))
            } else {
                throw new Error('Input Invalid')
            }
        } catch (err) {
            throw console.log(new Error(`${err}`))
        }
    }
    public async sendAudio(from: string, media: Buffer | string, ptt?: boolean, id?: proto.WebMessageInfo) {
        try {
            const Ptt: boolean = ptt ? ptt : false
            if (typeof media !== 'string') {
                return id ? void (await this.Client.sendMessage(from, media, MessageType.audio, { quoted: id, ptt: Ptt })) : void (await this.Client.sendMessage(from, media, MessageType.audio, { ptt: Ptt }))
            } else if (fs.existsSync(media)) {
                return id ? void (await this.Client.sendMessage(from, fs.readFileSync(media), MessageType.audio, { quoted: id, ptt: Ptt })) : void (await this.Client.sendMessage(from, fs.readFileSync(media), MessageType.audio, { ptt: Ptt }))
            } else if (isUrl(media)) {
                return id ? void (await this.Client.sendMessage(from, await Buffer(media), MessageType.audio, { quoted: id, ptt: Ptt })) : void (await this.Client.sendMessage(from, await Buffer(media), MessageType.audio, { ptt: Ptt }))
            } else {
                throw new Error('Input Invalid')
            }
        } catch (err) {
            throw console.log(new Error(`${err}`))
        }
    }
    public async sendSticker(from: string, media: Buffer | string, id?: proto.WebMessageInfo) {
        try {
            if (typeof media !== 'string') {
                return id ? void (await this.Client.sendMessage(from, media, MessageType.sticker, { quoted: id })) : void (await await this.Client.sendMessage(from, media, MessageType.sticker))
            } else if (fs.existsSync(media)) {
                return id ? void (await this.Client.sendMessage(from, fs.readFileSync(media), MessageType.sticker, { quoted: id })) : void (await await this.Client.sendMessage(from, fs.readFileSync(media), MessageType.sticker))
            } else if (isUrl(media)) {
                return id ? void (await this.Client.sendMessage(from, await Buffer(media), MessageType.sticker, { quoted: id })) : void (await await this.Client.sendMessage(from, await Buffer(media), MessageType.sticker))
            } else {
                throw new Error('Input Invalid')
            }
        } catch (err) {
            throw console.log(new Error(`${err}`))
        }
    }
}
