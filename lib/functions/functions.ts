import { MimeType } from "file-type";
import parsems from "parse-ms";
import type { Messages } from "../types";
import { get } from "fast-levenshtein";
import { remove } from "diacritics";

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

export function AutoPath (ext: string): string {
	return "./lib/database/media/temp/" + RandomName(23) + "." + ext;
}

export function ParseExtensionFromMime (mimeType: MimeType): { type: Messages.TypesFile, ext: string} | undefined {
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

export function getUrl (Link: string | undefined): RegExpMatchArray | null {
	return Link?.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi')) || null
}

export function Runtime(seconds: number): string {
	let getData = parsems(seconds * 1000)
	let Text: string = `${getData.days} Hari, ${getData.hours} Jam, ${getData.minutes} Menit, ${getData.seconds} Detik`
	return Text
}

export function Checkker (kata: string, validasi: string): number  {
	kata = remove(kata.toLocaleLowerCase().replace(/[^\w]+/g, ''));
	validasi =  remove(validasi.toLocaleLowerCase().replace(/[^\w]+/g, ''));
	let hitung: number = 1 - (get(kata, validasi) / Math.max(Math.max(kata.length, validasi.length), 1))
	let hasil: string = (hitung * 100).toFixed(2)
	return Number(hasil)
}
export function FindMatch (str: string, arr: string[]): Array<Array<string|unknown>> {
	let obj: { [k: string]: number } = {}
	for (const index of arr) {
		if (!obj[index]) {
			obj[index] = Checkker(str, index)
		}
	}
	return Object.entries(obj).sort((a: [string, number], b: [string, number]) => b[1] - a[1]).filter((a: [string,number]) => a[1] > 65.00);
}

export function checkPrefix  (prefix: string | RegExp | Array<string | RegExp>, body: string): { match: boolean, prefix: string | undefined, body: string} | false  {
	if (!body) return false;
	if (typeof prefix === "string") {
		return {
			match: body.startsWith(prefix),
			prefix: prefix,
			body: body.replace(prefix, "")
		};
	} else
	if (typeof prefix === "object") {
		if (Array.isArray(prefix)) {
			for (const value of prefix) {
				if (typeof value === "string") {
					if (body.startsWith(value)) return {
						match: true,
						prefix: value,
						body: body.replace(value, "")
					};
				} else
				if (typeof value === "object") {
					if (value instanceof RegExp) {
						if (body.match(value)) return {
							match: true,
							prefix: (value.exec(body))?.[0],
							body: body.replace(value, "")
						};
					}
				}
			}
		} else
		if (prefix instanceof RegExp) {
			if (body.match(prefix)) return {
				match: true,
				prefix: (prefix.exec(body))?.[0],
				body: body.replace(prefix, "")
			};
		}
	}
	return false;
}