import { WAConnection, MessageType, proto, WAMessage,  } from '@adiwajshing/baileys'
import { Commands, ToUrlUguuse } from '../typings'
import { Tomp3, Tocute, CreateSticker, toVideoV2, Toimg, createStickerV2, createStickerV3, CreateStickerCircle  } from '../tools'
import { Tunggu, Buffer, RandomName } from '../functions/function';
import { ToVideo, EmojiAPI, Translate, ToUrluguuse } from '../routers/api'
import * as fs from 'fs'
import { Client } from '../src/Client';
import parsems, { Parsed} from "parse-ms";
import filesize from "filesize";
import {  StickerEmoji } from "../tools/emotConvert";
import { ITranslateResponse, languages } from "@vitalets/google-translate-api"
import { IndTunggu, IndBukanVid, IndToVid, IndBukanAud, IndBukanSticker, IndGagalSticker, IndErrorMP3, IndStickerReply, BukanStickerGif, InputSticker,  IndSuccesToVid, IndToimgDone,  IndStickerVideoPanjang, IndEmojiNotFound,  IndHarapInputEMot,  ErrorCircle, IndTranslate,  IndTransErr, IndTranslateMasuk, IndToUrl, ErrorToUrl, InputMedia, IndStickerCircleReply, GaSupportStickerGif, ErrorToimg  } from '../lang/ind';
import { HelpToUrl,  HelpTranslate, HelpSemoji, HelpStickerCircle,  HelpSticker, HelpToVideo, HelpToMP3, HelpToImg   } from "../lang/help";

export class Converter {
    constructor(public Ra: Client) {}
    public async SendingConverter(): Promise<void> {
        this.toMP3()
        this.Sticker()
        this.ToVideo()
        this.toImg()
		this.StickerCircle()
		this.TransLate()
		this.StickerEmoji()
		this.ToURL()
    }
	protected async ToURL () {
		globalThis.CMD.on("convet|tourl", { event: ["tourl <media>"], tag: "converter"}, ["tourl", "tolink"], async (res: WAConnection, data: Commands) => {
			const { from, media, mess, args, Command, Prefix } = data
			if (/^(?:-|--)(help)$/i.test(args[0])) return this.Ra.reply(from, HelpToUrl(Prefix), mess)
			if (!media) return this.Ra.reply(from, InputMedia(Command), mess)
			await this.Ra.reply(from, IndTunggu(), mess)
			let Path: string = await this.Ra.decryptMediaSave(media)
			await ToUrluguuse(Path).then((value: ToUrlUguuse) => {
				this.Ra.reply(from, IndToUrl(value), mess)
			}).catch (() => {
				this.Ra.reply(from, ErrorToUrl(), mess)
			})
		})
	}
	protected async TransLate () {
		globalThis.CMD.on("Translet", { event: ["translate <to> <text>"], tag: "converter"}, ["translate"], async (res: WAConnection, data: Commands) => {
			const { from, args, mess, bodyQuoted, Prefix, Command } = data
			if (/^(?:-|--)(help)$/i.test(args[0])) return this.Ra.reply(from,  HelpTranslate(Prefix), mess)
			if (!args[0] && !bodyQuoted) return this.Ra.reply(from, IndTranslateMasuk(Command), mess)
			let getLang: string | undefined
			if  (languages.isSupported(args[0])) {
				getLang = args[0] 
				args.shift()
			}
			if (!args[0] && !bodyQuoted) return this.Ra.reply(from, IndTranslateMasuk(Command), mess)
			await  Translate(args[0] ? args.join(" ") : String(bodyQuoted), getLang).then((value: ITranslateResponse) => {
				this.Ra.reply(from, IndTranslate(value), mess)
			}).catch((err) => {
				return this.Ra.reply(from,  IndTransErr(), mess)
			})
		})
	}
	protected async StickerEmoji () {
		globalThis.CMD.on("con|stickeremot", { event: ["emoji <emoji>", "semoji <emoji>"], tag: "converter"}, ["stickeremoji", "semoji","stimoji", "emoji", "emot", "emotikon", "smoji"], async (res: WAConnection, data: Commands) => {
			const { from, args, mess, Prefix, Command } = data
			if (/^(?:-|--)(help)$/i.test(args[0])) return this.Ra.reply(from, HelpSemoji(Prefix), mess)
			if (!args[0]) return this.Ra.reply(from,  IndHarapInputEMot(Command), mess)
			await this.Ra.reply(from, IndTunggu(), mess)
			await  EmojiAPI(args[1] ?? args[0]).then(async (value: { url: string, name: string}[]) => {
				let getUri: string = value.find((values) => new RegExp(args[0], "gi").test(values.name))?.url ?? value[0].url
				await StickerEmoji(getUri).then(async (values: string) => {
					await this.Ra.sendSticker(from, values, mess)
					await Tunggu(2000)
					if (fs.existsSync(values)) fs.unlinkSync(values)
				}).catch(() => {
					this.Ra.reply(from, IndEmojiNotFound(Command), mess)
				})
			}).catch (() => {
				this.Ra.reply(from, IndEmojiNotFound(Command), mess)
			})
		})
	}
	protected async StickerCircle () {
		globalThis.CMD.on("converter|stickercircle", { event: ["scircle <img,vid, stick>"], tag: "converter"},["stikerc", "stickerc", "scircle", "stickercircle", "stikercirle"], async (res: WAConnection, data: Commands) => {
			const { media, from, mess, isQuotedImage, isGambar, isQuotedSticker, quotedMsg, args, Prefix, Command } = data;
			if (/^(?:-|--)(help)$/i.test(args[0])) return this.Ra.reply(from, HelpStickerCircle(Prefix), mess)
			if (isGambar || isQuotedImage || isQuotedSticker) {
				await this.Ra.reply(from, IndTunggu(), mess)
				if (!media) return
				const input: string = await res.downloadAndSaveMediaMessage(media,  './lib/storage/temp/' + RandomName(22))
				await CreateStickerCircle(input).then(async (respon: string) => {
					await this.Ra.sendSticker(from, respon, mess)
					await Tunggu(2000)
					if (fs.existsSync(respon)) fs.unlinkSync(respon)
				}).catch(() => {
					this.Ra.reply(from,  ErrorCircle(), mess)
				})
			} else if (quotedMsg?.quotedMessage?.extendedTextMessage?.jpegThumbnail) {
				await this.Ra.reply(from, IndTunggu(), mess)
				const Path: string = `./lib/storage/temp/${RandomName(32)}.png`
				fs.writeFileSync(Path, (quotedMsg.quotedMessage.extendedTextMessage.jpegThumbnail))
				await CreateStickerCircle(Path).then(async (respon: string) => {
					await this.Ra.sendSticker(from, respon, mess)
					await Tunggu(2000)
					if (fs.existsSync(respon)) fs.unlinkSync(respon)
				}).catch(() => {
					this.Ra.reply(from,  ErrorCircle(), mess)
				})
			} else if (quotedMsg?.quotedMessage?.buttonsMessage?.locationMessage?.jpegThumbnail) {
				await this.Ra.reply(from, IndTunggu(), mess)
				const Path: string = `./lib/storage/temp/${RandomName(31)}.png`
				fs.writeFileSync(Path, (quotedMsg?.quotedMessage?.buttonsMessage?.locationMessage?.jpegThumbnail))
				await CreateStickerCircle(Path).then(async (respon: string) => {
					await this.Ra.sendSticker(from, respon, mess)
					await Tunggu(2000)
					if (fs.existsSync(respon)) fs.unlinkSync(respon)
				}).catch(() => {
					this.Ra.reply(from,  ErrorCircle(), mess)
				})
			} else if (quotedMsg?.stanzaId) {
				const message: proto.WebMessageInfo = await res.loadMessage(from, quotedMsg.stanzaId)
				const media: WAMessage | null = message?.message?.imageMessage || message?.message?.videoMessage || message?.message?.documentMessage || message?.message?.stickerMessage ? message
				: message?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage || message?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage || message?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage || message?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.documentMessage ? JSON.parse(JSON.stringify(message).replace('quotedM', 'm')).message?.extendedTextMessage?.contextInfo
				: message?.message?.viewOnceMessage ? message.message.viewOnceMessage  : quotedMsg ? quotedMsg.quotedMessage?.viewOnceMessage ? {  stanzaId: quotedMsg.stanzaId, ...quotedMsg.quotedMessage?.viewOnceMessage } : quotedMsg.quotedMessage?.buttonsMessage ?  quotedMsg.quotedMessage.buttonsMessage.imageMessage ? { stanzaId: quotedMsg.stanzaId, message: { imageMessage: quotedMsg.quotedMessage.buttonsMessage.imageMessage }} : quotedMsg.quotedMessage.buttonsMessage.videoMessage ? { stanzaId: quotedMsg.stanzaId, message: { videoMessage:  quotedMsg.quotedMessage.buttonsMessage.videoMessage }} :  quotedMsg.quotedMessage.buttonsMessage.documentMessage ? { stanzaId: quotedMsg.stanzaId, message: { documentMessage:  quotedMsg.quotedMessage.buttonsMessage.documentMessage }} : null : null : message?.message?.buttonsMessage ? message.message.buttonsMessage.imageMessage ? { participant: mess?.participant, message: { imageMessage: message.message.buttonsMessage.imageMessage}} :  message.message.buttonsMessage.videoMessage ? { participant: mess?.participant, message: { videoMessage: message.message.buttonsMessage.videoMessage}} 
				: message.message.buttonsMessage.documentMessage ? { participant: mess?.participant, message: { documentMessage: message.message.buttonsMessage.videoMessage}} : null : null
				if (!media) return
				if (media.message?.imageMessage || media.message?.stickerMessage) {
					await this.Ra.reply(from, IndTunggu(), mess)
					const Data: string = await res.downloadAndSaveMediaMessage(media,  './lib/storage/temp/' + RandomName(24))
					await CreateStickerCircle(Data).then(async (respon: string) => {
						await this.Ra.sendSticker(from, respon, mess)
						await Tunggu(2000)
						if (fs.existsSync(respon)) fs.unlinkSync(respon)
					}).catch(() => {
						this.Ra.reply(from,  ErrorCircle(), mess)
					})
				}
			} else {
				this.Ra.reply(from, IndStickerCircleReply(Command), mess)
			}
		})
	}
    protected async Sticker(): Promise<void> {
        globalThis.CMD.on('converter|sticker <img,vid,sticker>',  { event: ["sticker <img/vid/stick>"], tag: "converter"},['sticker', 's', 'stiker', 'stickergif', 'stikergif', 'sgif'], async (res: WAConnection, data: Commands) => {
			const { args, media, from, mess, sendOwner, isQuotedDokumen, Command, quotedMsg, isVideo, isQuotedVideo, Prefix } = data
			const Wm: string | null | undefined = args[0] === undefined ? undefined : args.join(' ')
			if (/^(?:-|--)(help)$/i.test(args[0])) return this.Ra.sendImage(from, "https://bit.ly/39026d3", HelpSticker(Prefix), mess)
            if (media) {
				if (isVideo && Number(media.message?.videoMessage?.seconds) > 10) return await this.Ra.reply(from,  IndStickerVideoPanjang(), mess)
				if (isQuotedVideo && Number(media.message?.videoMessage?.seconds) > 10) return await this.Ra.reply(from,  IndStickerVideoPanjang(), mess)
				if (isQuotedDokumen && !/(image|video)/gi.test(String(quotedMsg?.quotedMessage?.documentMessage?.mimetype))) return await this.Ra.reply(from, IndStickerReply(Command), mess)
				if (isQuotedDokumen && /(video)/gi.test(String(quotedMsg?.quotedMessage?.documentMessage?.mimetype)) && /(mb)/i.test(filesize(Number(quotedMsg?.quotedMessage?.documentMessage?.fileLength))) && Number(filesize(Number(quotedMsg?.quotedMessage?.documentMessage?.fileLength)).replace(/mb/i, "")) > 12) return  await this.Ra.reply(from,  IndStickerVideoPanjang(), mess)
				await this.Ra.reply(from, IndTunggu(), mess)
				const input: string = await res.downloadAndSaveMediaMessage(media, './lib/storage/temp/' + RandomName(22))
				await CreateSticker(input, Wm).then(async (result: string | Error) => {
					try {
						if (typeof result !== 'string') return
						await this.Ra.sendSticker(from, result, mess)
						await Tunggu(2000)
						if (fs.existsSync(result)) fs.unlinkSync(result)
						if (fs.existsSync(input)) fs.unlinkSync(input)
					} catch (err) {
						if (typeof result === 'string' && fs.existsSync(result)) fs.unlinkSync(result)
						if (fs.existsSync(input)) fs.unlinkSync(input)
                            // Jan dihapus ntar bocor
					}
				}).catch(async () => {
					await CreateSticker(input, Wm).then(async (Res) => {
						try {
							if (typeof Res !== 'string') return
							await this.Ra.sendSticker(from, Res, mess)
							await Tunggu(2000)
							if (fs.existsSync(Res)) fs.unlinkSync(Res)
							if (fs.existsSync(input)) fs.unlinkSync(input)
						} catch (err) {
							if (typeof Res === 'string' && fs.existsSync(Res)) fs.unlinkSync(Res)
							if (fs.existsSync(input)) fs.unlinkSync(input)
						}
					}).catch(async () => {
						await createStickerV2(input, Wm).then(async (Result) => {
							try {
								if (typeof Result !== 'string') return
								await this.Ra.sendSticker(from, Result, mess)
								await Tunggu(2000)
								if (fs.existsSync(Result)) fs.unlinkSync(Result)
								if (fs.existsSync(input)) fs.unlinkSync(input)
							} catch (err) {
								if (typeof Result === 'string' && fs.existsSync(Result)) fs.unlinkSync(Result)
								if (fs.existsSync(input)) fs.unlinkSync(input)
							}
						}).catch(async () => {
							await createStickerV3(input, Wm).then(async (Res) => {
								 try {
									 if (typeof Res !== 'string') return
									 await this.Ra.sendSticker(from, Res, mess)
									 await Tunggu(2000)
									 if (fs.existsSync(Res)) fs.unlinkSync(Res)
									 if (fs.existsSync(input)) fs.unlinkSync(input)
									} catch (err) {
										if (typeof Res === 'string' && fs.existsSync(Res)) fs.unlinkSync(Res)
										if (fs.existsSync(input)) fs.unlinkSync(input)
									}
								}).catch((err) => {
									if (fs.existsSync(input)) fs.unlinkSync(input)
									this.Ra.reply(from, IndGagalSticker(), mess)
									this.Ra.sendText(sendOwner, 'ERROR Sticker : ' + err)
								})
							})
						})
					})
				} else if (quotedMsg?.quotedMessage?.extendedTextMessage?.jpegThumbnail || quotedMsg?.quotedMessage?.buttonsMessage?.locationMessage?.jpegThumbnail) {
					await this.Ra.reply(from, IndTunggu(), mess)
					const input: string = `./lib/storage/temp/${RandomName(32)}.png`
					if (quotedMsg?.quotedMessage?.extendedTextMessage?.jpegThumbnail) fs.writeFileSync(input, (quotedMsg.quotedMessage.extendedTextMessage.jpegThumbnail))
					if (quotedMsg?.quotedMessage?.buttonsMessage?.locationMessage?.jpegThumbnail) fs.writeFileSync(input, (quotedMsg?.quotedMessage?.buttonsMessage?.locationMessage?.jpegThumbnail))
					await CreateSticker(input, Wm).then(async (result: string | Error) => {
						try {
							if (typeof result !== 'string') return
							await this.Ra.sendSticker(from, result, mess)
							await Tunggu(2000)
							if (fs.existsSync(result)) fs.unlinkSync(result)
							if (fs.existsSync(input)) fs.unlinkSync(input)
						} catch (err) {
							if (typeof result === 'string' && fs.existsSync(result)) fs.unlinkSync(result)
							if (fs.existsSync(input)) fs.unlinkSync(input)
								// Jan dihapus ntar bocor
						}
					}).catch(async () => {
						await CreateSticker(input, Wm).then(async (Res) => {
							try {
								if (typeof Res !== 'string') return
								await this.Ra.sendSticker(from, Res, mess)
								await Tunggu(2000)
								if (fs.existsSync(Res)) fs.unlinkSync(Res)
								if (fs.existsSync(input)) fs.unlinkSync(input)
							} catch (err) {
								if (typeof Res === 'string' && fs.existsSync(Res)) fs.unlinkSync(Res)
								if (fs.existsSync(input)) fs.unlinkSync(input)
							}
						}).catch(async () => {
							await createStickerV2(input, Wm).then(async (Result) => {
								try {
									if (typeof Result !== 'string') return
									await this.Ra.sendSticker(from, Result, mess)
									await Tunggu(2000)
									if (fs.existsSync(Result)) fs.unlinkSync(Result)
									if (fs.existsSync(input)) fs.unlinkSync(input)
								} catch (err) {
									if (typeof Result === 'string' && fs.existsSync(Result)) fs.unlinkSync(Result)
									if (fs.existsSync(input)) fs.unlinkSync(input)
								}
							}).catch(async () => {
								await createStickerV3(input, Wm).then(async (Res) => {
									 try {
										 if (typeof Res !== 'string') return
										 await this.Ra.sendSticker(from, Res, mess)
										 await Tunggu(2000)
										 if (fs.existsSync(Res)) fs.unlinkSync(Res)
										 if (fs.existsSync(input)) fs.unlinkSync(input)
										} catch (err) {
											if (typeof Res === 'string' && fs.existsSync(Res)) fs.unlinkSync(Res)
											if (fs.existsSync(input)) fs.unlinkSync(input)
										}
									}).catch((err) => {
										if (fs.existsSync(input)) fs.unlinkSync(input)
										this.Ra.reply(from, IndGagalSticker(), mess)
										this.Ra.sendText(sendOwner, 'ERROR Sticker : ' + err)
									})
								})
							})
						})
					} else if (quotedMsg?.stanzaId) {
						const message: proto.WebMessageInfo = await res.loadMessage(from, quotedMsg.stanzaId)
						const media: WAMessage | null = message?.message?.imageMessage || message?.message?.videoMessage || message?.message?.documentMessage || message?.message?.stickerMessage ? message
						: message?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage || message?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage || message?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage || message?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.documentMessage ? JSON.parse(JSON.stringify(message).replace('quotedM', 'm')).message?.extendedTextMessage?.contextInfo
						: message?.message?.viewOnceMessage ? message.message.viewOnceMessage  : quotedMsg ? quotedMsg.quotedMessage?.viewOnceMessage ? {  stanzaId: quotedMsg.stanzaId, ...quotedMsg.quotedMessage?.viewOnceMessage } : quotedMsg.quotedMessage?.buttonsMessage ?  quotedMsg.quotedMessage.buttonsMessage.imageMessage ? { stanzaId: quotedMsg.stanzaId, message: { imageMessage: quotedMsg.quotedMessage.buttonsMessage.imageMessage }} : quotedMsg.quotedMessage.buttonsMessage.videoMessage ? { stanzaId: quotedMsg.stanzaId, message: { videoMessage:  quotedMsg.quotedMessage.buttonsMessage.videoMessage }} :  quotedMsg.quotedMessage.buttonsMessage.documentMessage ? { stanzaId: quotedMsg.stanzaId, message: { documentMessage:  quotedMsg.quotedMessage.buttonsMessage.documentMessage }} : null : null : message?.message?.buttonsMessage ? message.message.buttonsMessage.imageMessage ? { participant: mess?.participant, message: { imageMessage: message.message.buttonsMessage.imageMessage}} :  message.message.buttonsMessage.videoMessage ? { participant: mess?.participant, message: { videoMessage: message.message.buttonsMessage.videoMessage}} 
						: message.message.buttonsMessage.documentMessage ? { participant: mess?.participant, message: { documentMessage: message.message.buttonsMessage.videoMessage}} : null : null
						if (!media) return
						if (media.message?.imageMessage || media.message?.stickerMessage) {
							await this.Ra.reply(from, IndTunggu(), mess)
							const input: string = await res.downloadAndSaveMediaMessage(media,  './lib/storage/temp/' + RandomName(24))
							await CreateSticker(input, Wm).then(async (result: string | Error) => {
								try {
									if (typeof result !== 'string') return
									await this.Ra.sendSticker(from, result, mess)
									await Tunggu(2000)
									if (fs.existsSync(result)) fs.unlinkSync(result)
									if (fs.existsSync(input)) fs.unlinkSync(input)
								} catch (err) {
									if (typeof result === 'string' && fs.existsSync(result)) fs.unlinkSync(result)
									if (fs.existsSync(input)) fs.unlinkSync(input)
										// Jan dihapus ntar bocor
								}
							}).catch(async () => {
								await CreateSticker(input, Wm).then(async (Res) => {
									try {
										if (typeof Res !== 'string') return
										await this.Ra.sendSticker(from, Res, mess)
										await Tunggu(2000)
										if (fs.existsSync(Res)) fs.unlinkSync(Res)
										if (fs.existsSync(input)) fs.unlinkSync(input)
									} catch (err) {
										if (typeof Res === 'string' && fs.existsSync(Res)) fs.unlinkSync(Res)
										if (fs.existsSync(input)) fs.unlinkSync(input)
									}
								}).catch(async () => {
									await createStickerV2(input, Wm).then(async (Result) => {
										try {
											if (typeof Result !== 'string') return
											await this.Ra.sendSticker(from, Result, mess)
											await Tunggu(2000)
											if (fs.existsSync(Result)) fs.unlinkSync(Result)
											if (fs.existsSync(input)) fs.unlinkSync(input)
										} catch (err) {
											if (typeof Result === 'string' && fs.existsSync(Result)) fs.unlinkSync(Result)
											if (fs.existsSync(input)) fs.unlinkSync(input)
										}
									}).catch(async () => {
										await createStickerV3(input, Wm).then(async (Res) => {
											 try {
												 if (typeof Res !== 'string') return
												 await this.Ra.sendSticker(from, Res, mess)
												 await Tunggu(2000)
												 if (fs.existsSync(Res)) fs.unlinkSync(Res)
												 if (fs.existsSync(input)) fs.unlinkSync(input)
												} catch (err) {
													if (typeof Res === 'string' && fs.existsSync(Res)) fs.unlinkSync(Res)
													if (fs.existsSync(input)) fs.unlinkSync(input)
												}
											}).catch((err) => {
												if (fs.existsSync(input)) fs.unlinkSync(input)
												this.Ra.reply(from, IndGagalSticker(), mess)
												this.Ra.sendText(sendOwner, 'ERROR Sticker : ' + err)
											})
										})
									})
								})
						} else {
							return this.Ra.reply(from, IndStickerReply(Command), mess)
						}
					}
				})
			}
    protected async ToVideo() {
        globalThis.CMD.on('converter|tovid <stickergif>',  { event: ["tovid <stickergif>"], tag: "converter"} ,["tovid", "tovideo"], async (res: WAConnection, data: Commands) => {
			const { isQuotedSticker, media, from, mess, sender, Command, args, Prefix } = data
			if (/^(?:-|--)(help)$/i.test(args[0])) return this.Ra.reply(from, HelpToVideo(Prefix), mess)
			let Proses: number = Date.now()
			if (!media && !isQuotedSticker) return this.Ra.reply(from, IndBukanSticker(Command), mess)
            if (!media?.message?.stickerMessage?.isAnimated) return this.Ra.reply(from, BukanStickerGif(Command), mess)
            await this.Ra.reply(from, IndTunggu(), mess)
            const input: string = await res.downloadAndSaveMediaMessage(media, './lib/storage/temp/' + RandomName(23) + sender?.replace('@s.whatsapp.net', ''))
            await ToVideo(input).then(async (value: { status: number; data: string } | any) => {
				const Timer = parsems(Date.now() - Proses)
				await this.Ra.sendVideo(from, await Buffer(value?.data),  IndSuccesToVid(String(Timer.seconds + " Detik, " + Timer.milliseconds + " Miliseconds")), mess)
                if (fs.existsSync(input)) fs.unlinkSync(input)
			}).catch(async (err: Error) => {
				let respon: string | any
				try {
					respon = await toVideoV2(input)
				} catch (err) {
					if (fs.existsSync(input)) fs.unlinkSync(input)
                    this.Ra.sendText(data.sendOwner, `ERROR ToVideo : ${err}`)
                    await this.Ra.reply(from, IndToVid(), mess)
                } finally {
					if (fs.existsSync(input)) fs.unlinkSync(input)
					const Timer = parsems(Date.now() - Proses)
                    await this.Ra.sendVideo(from, fs.readFileSync(respon),  IndSuccesToVid(String(Timer.seconds + " Detik, " + Timer.milliseconds + " Miliseconds")), mess)
                    if (fs.existsSync(respon)) fs.unlinkSync(input)
				}
			})
		},{ noPrefix: false })
	}
    protected async toMP3() {
		globalThis.CMD.on('converter|tomp3 <video>',  { event: ["tomp3 <video>"], tag: "converter"},'tomp3', async (res: WAConnection, data: Commands) => {
			const { media, isQuotedVideo, from, mess, isVideo, sendOwner, args, Prefix, Command } = data
			if (/^(?:-|--)(help)$/i.test(args[0])) return this.Ra.sendImage(from, " https://bit.ly/3l7GPUo", HelpToMP3(Prefix), mess)
			if (isQuotedVideo || isVideo) {
				await this.Ra.reply(from, IndTunggu(), mess)
				const input: string = await res.downloadAndSaveMediaMessage(media as proto.WebMessageInfo, './lib/storage/temp/' + RandomName(24))
				await Tomp3(input).then(async (result: string | Error) => {
					if (typeof result !== 'string') return
					this.Ra.sendAudio(from, fs.readFileSync(result), false, mess)
					await Tunggu(2000)
					if (fs.existsSync(result)) fs.unlinkSync(result)
				}).catch(async () => {
					await Tomp3(input).then(async (Respon) => {
						if (typeof Respon !== 'string') return
						await this.Ra.sendAudio(from, fs.readFileSync(Respon), false, mess)
						await Tunggu(2000)
						if (fs.existsSync(Respon)) fs.unlinkSync(Respon)
				}).catch((err) => {
					this.Ra.reply(from, IndErrorMP3(), mess)
					this.Ra.sendText(sendOwner, 'ERROR tomp3 :' + err)
				})
			})
		} else {
			return this.Ra.reply(from, IndBukanVid(Command), mess)
		}
		},{ noPrefix: false })
	}
	protected async toImg() {
		globalThis.CMD.on('converter|toimg <img>',  { event: ["toimg <img>"], tag: "converter"}, ["toimg", "toimage", "togambar"], async (res: WAConnection, data: Commands) => {
			const { from, mess, isQuotedSticker, media, args, Prefix, Command } = data
			if (/^(?:-|--)(help)$/i.test(args[0])) return this.Ra.reply(from, HelpToImg(Prefix), mess)
			const Time = Date.now()
            if (!isQuotedSticker) return this.Ra.reply(from,  InputSticker(Command), mess)
			if (media && media?.message?.stickerMessage?.isAnimated) return this.Ra.reply(from, GaSupportStickerGif(Command), mess)
			await this.Ra.reply(from, IndTunggu(), mess)
			try {
				const result: string = await Toimg(await res.downloadAndSaveMediaMessage(media as proto.WebMessageInfo, './lib/storage/temp/' + RandomName(27)))
				const Timer: Parsed = parsems(Date.now() - Time)
				return void (await this.Ra.sendImage(from, fs.readFileSync(result || ''),  IndToimgDone(String(Timer.seconds + " Detik, " + Timer.milliseconds + " Miliseconds")), mess))
			} catch (err) {
				this.Ra.sendText(data.sendOwner, "Error Toimg :" + err)
				throw this.Ra.reply(from, ErrorToimg, mess)
			}
        }, { noPrefix: false })
	}
}
