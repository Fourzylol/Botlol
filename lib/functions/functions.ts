import { MimeType } from "file-type";
import { TypesFile } from "../types"

export function isObject (obj: any): boolean {
	return (obj && typeof obj === "object" && !Array.isArray(obj) && obj !== null)
}

export function ExtractAndCheckUrl (text: string): import("../types").ExtractUrlType {
	let regexUrl: RegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi
	let getUrl: RegExpMatchArray| null = text.match(regexUrl);
	let respon: import("../types").ExtractUrlType;
	if (getUrl) respon = {
		url: [...getUrl as RegExpMatchArray],
		isDetect: true,
		get first_url () {
			return (this.url)?.[0] as string
		}
	}
	else respon = {
		url: [],
		isDetect: false,
		get first_url () {
			return ""
		}
	}
	return respon
}

export function RandomName (jumlah?: number): string {
	if (!jumlah) jumlah = 12;
	const result: string[] = []
    const karakter: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let Total: number = karakter.length
    for (let i: number = 0; i < jumlah; i++) {
        result.push(karakter.charAt(Math.floor(Math.random() * Total)))
    }
    return result.join('') as string
}

export function ParseExtensionFromMime (mimeType: MimeType): { type: TypesFile, ext: string} | undefined {
	if (mimeType.startsWith("application") || mimeType.startsWith("font")) {
		return { type: "document", ext: mimeType.split("/")[1] }
	} else if (mimeType.startsWith("image")) {
		if (mimeType === "image/webp") return { type: "sticker", ext: "webp"}
		else return { type: "image", ext: mimeType.split("/")[1] }
	} else if (mimeType.startsWith("video")) {
		return { type: "video", ext: mimeType.split("/")[1] }
	} else if (mimeType.startsWith("audio")) {
		return { type: "audio", ext: mimeType.split("/")[1] }
	}
}