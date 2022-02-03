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
	let getUrl: RegExpMatchArray| null = text?.match(regexUrl);
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
export function ParseJid (jid: string): string {
	if (/@g.us/gi.test(jid)) {
		return jid
	} else if (/@s.whatsapp.net/gi.test(jid) && /\:/g.test(jid)) {
		return jid.split(":")[0] + "@s.whatsapp.net";
	} else {
		return jid
	}
}

export function  convertTime (time: string): number {
	const regex: RegExp = /(\d+)([dhms])/g;
	let result: number = 0;
	let match: RegExpExecArray | null;
	while ((match = regex.exec(time)) !== null) {
		switch (match[2]) {
			case "d":
				result += parseInt(match[1]) * 86400 * 1000;
				break;
			case "h":
				result += parseInt(match[1]) * 3600 * 1000;
				break;
			case "m":
				result += parseInt(match[1]) * 60 * 1000;
				break;
			case "s":
				result += parseInt(match[1]) * 1000;
				break;
		}
	}
	return result;
}

export function ParseStringCmd (str: string): any {
	let data: { [k: string]: any } = {};
	let args: string[] = str.split("--");
	args.forEach((arg: string) => {
		let argData: string[] = arg.split(" ").filter((v) => v);
		if (argData.length > 1) {
			data[argData[0]] = argData.slice(1).join(" ");;
		}
	})
	let filter: any = Object.keys(data).reduce((acc: any, key: string) => {
		if (!data[key] !== undefined) {
			acc[key] = data[key];
		}
		return acc;
	}, {})
	return filter
}