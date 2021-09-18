import { GroupData } from '.'
import { Client } from '../src/Client'
import { ConnectMoongo } from '../database/mongoodb/main';
import { WAConnection, MessageType } from '@adiwajshing/baileys'
import { Commands, IgPostDown, IgReelsDown, IgTvDown, youtubeDlCore, YoutubeMP3PlaySer2, YoutubeMP4PlaySer2, FaceBookDown, TiktokDownloaders, Mussically } from '../typings';
import {  InstaDownloader, mediafireDown, YtPlaymp3, YtPlaymp4, Ytplaymp3Server2, Ytplaymp4Server2, FacebookDown,  tiktokDownloader, Musically } from "../routers/api";
import { IndIgPost, IndSuccesDownloader, IndIgReelsDown, IndIgTvDown,  IndIGDlInvalid, BukanIgDown, BukanUrl,  IndTunggu, IndMediaFire, BukanMediaFire, IndSizeBesar, IndInputLink,  IndInputLinkYt,  IndYtPlayMP4, IndYtPlayAudSer2, IndYtPlayVidSer2,  IndYtPlayMP3,  IndQuerryKosong, IndYoutubeKosong, IndFaceBookDown, IndFesbukErr, IndLinkFesbuk, IndFotoFb, IndTiktokDown,  IndTiktokErr, IndBukanTiktok, IndTungguDown, GaSuppotrFb,  IndBlomSupport   } from "../lang/ind";
import { HelpDownloader, HelpTiktok, HelpFacebook, HelpYoutubeDown,  HelpMediaFire, HelpInstagramDown } from "../lang/help"
import parsems, { Parsed } from "parse-ms";
import { isUrl } from "../functions/function";

export class Downloader extends GroupData {
    constructor(public Ra: Client, public database: ConnectMoongo) {
        super(Ra, database)
    }
    public SendDownloader() {
        this.SendDataGc()
		this.IgDownloader()
		this.MediaFireDown()
		this.YtDl()
		this.FesBuk()
		this.TiktokDown()
		this.Downloaders()
    }
	private Downloaders () {
		globalThis.CMD.on("Donwlodbro", { event: ["download <url>"], tag: "downloader"}, ["download", "downloader", "down"], async (res: WAConnection, data: Commands) => {
			const { from, args, mess, bodyQuoted, Prefix, Command } = data;
			if (/^(?:-|--)(help)$/i.test(args[0])) return this.Ra.reply(from, HelpDownloader(Prefix), mess)
			const getRespon: string | undefined = args[0] ? args.join(" ") : bodyQuoted ?? undefined
			if (!getRespon) return this.Ra.reply(from, IndInputLink(Command), mess)
			if (!isUrl(String(getRespon))) return this.Ra.reply(from, BukanUrl(Command), mess)
			if (getRespon?.match(/(?:http(?:s|):\/\/|)(?:www\.|)tiktok.com\/@([-_0-9A-Za-z]{3,14})\/video\/([0-9]{8,50})(?:\?is_copy_url=0&is_from_webapp=v1&sender_device=pc&sender_web_id=(?:[0-9]{8,50}))|(?:http(?:s|):\/\/|)(?:vt\.tiktok\.com\/([-_0-9A-Za-z]{3,14}))/g)) {
				this.Ra.reply(from,  IndTungguDown("Tiktok"), mess)
				await  tiktokDownloader(getRespon).then(async (value : TiktokDownloaders) => {
					switch (true) {
						case /(nowm|withoutwm|nowatermark)/i.test(args[0]):{
							await this.Ra.sendVideo(from, String(value.nowm), IndTiktokDown(value), mess)
						}
						break
						case /(wm|withwm|watermark)/i.test(args[0]): {
							await this.Ra.sendVideo(from, String(value.wm),  IndTiktokDown(value), mess)
						}
						break
						case /(musik|sound|musik)/i.test(args[0]): {
							await this.Ra.sendImage(from, value.music.coverLarge,  IndTiktokDown(value), mess)
							await this.Ra.sendAudio(from, value.music.playUrl, false, mess)
						}
						break
						default:
						await this.Ra.sendVideo(from, String(value.nowm || value.wm), IndTiktokDown(value), mess)
						break
					}
				}).catch(async () => {
					await Musically(getRespon).then(async (values: Mussically) => {
						switch (true) {
							case /(nowm|withoutwm|nowatermark)/i.test(args[0]):{
								await this.Ra.sendVideo(from, String(values.nowm ?? values.mp4), "", mess)
							}
							break
							case /(wm|withwm|watermark)/i.test(args[0]): {
								await this.Ra.sendVideo(from, String(values.original),  "", mess)
							}
							break
							default:
							await this.Ra.sendVideo(from, String(values.nowm || values.mp4 || values.original), "", mess)
							break
						}
					}).catch (() => {
						return void this.Ra.reply(from,  IndTiktokErr(Command), mess)
					})
				})
			} else if (getRespon.match(/(?:http(?:s|):\/\/|)(?:www\.|)facebook.com/gi)) {
				if (getRespon.match(/(?:http(?:s|):\/\/|)(?:www\.|)facebook.com\/photo\?([\.&=0-9A-Za-z]{14,50})/gi)) return this.Ra.reply(from, IndFotoFb(), mess)
				if (!getRespon.match(/(?:http(?:s|):\/\/|)(?:www\.|)facebook.com\/([0-9A-Za-z]{2,16})\/videos\/([0-9]{2,18})/gi)) return this.Ra.reply(from, GaSuppotrFb(), mess)
				this.Ra.reply(from,  IndTungguDown("Facebook video"), mess)
				await FacebookDown(getRespon).then(async (value: FaceBookDown) => {
					await this.Ra.sendImage(from, value.thumbnail, IndFaceBookDown(value), mess)
					return void await this.Ra.sendVideo(from, value.url_stream, "", mess)
				}).catch(() => {
					return void this.Ra.reply(from, IndFesbukErr(), mess)
				})
			} else if (getRespon.match(/(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/)) {
				if (args[0] && args[0].toLocaleLowerCase() === "mp3") {
					this.Ra.reply(from,   IndTungguDown("Youtube mp3"), mess)
					await YtPlaymp3(getRespon.slice(4)).then(async (value: youtubeDlCore) => {
						await this.Ra.sendImage(from, value.data.thumbnail ?? "", IndYtPlayMP3(value), mess)
						if (/(gb)/gi.test(value.data.size)) return void this.Ra.reply(from, IndSizeBesar(value.data.size, "13 MB","Play mp3", value.data.down))
						if (Number(value.data.size.split(" MB")[0]) >= 13 && /(mb)/gi.test(value.data.size)) return  void this.Ra.reply(from, IndSizeBesar(value.data.size, "13 MB","Play mp3", value.data.down))
						return void await this.Ra.sendAudio(from, value.data.down, false, mess)
					}).catch(async () => {
						await Ytplaymp3Server2(getRespon.slice(4)).then(async (value: YoutubeMP3PlaySer2) => {
							await this.Ra.sendImage(from, value.thumbnail, IndYtPlayAudSer2(value), mess)
							if (/(gb)/gi.test(String(value.size))) return void this.Ra.reply(from, IndSizeBesar(value.size ?? "", "13 MB","Play mp3", String(value.link)))
							if (Number(String(value.size).split(" MB")[0]) >= 13 && /(mb)/gi.test(String(value.size))) return  void this.Ra.reply(from, IndSizeBesar(String(value.size), "13 MB","Play mp3", String(value.link)))
							return void await this.Ra.sendAudio(from, String(value.link), false, mess)
						}).catch(() => {
							return void this.Ra.reply(from, IndYoutubeKosong(), mess)
						})
					})
				} else if (args[0] && args[0].toLowerCase() === "mp4") {
					this.Ra.reply(from, IndTungguDown("Youtube mp4"), mess)
					await YtPlaymp4(getRespon.slice(4)).then(async (value: youtubeDlCore) => {
						await this.Ra.sendImage(from, value.data.thumbnail ?? "", IndYtPlayMP4(value), mess)
						if (/(gb)/gi.test(value.data.size)) return void this.Ra.reply(from, IndSizeBesar(value.data.size, "50 MB","Play mp4", value.data.down))
						if (Number(value.data.size.split(" MB")[0]) >= 50 && /(mb)/gi.test(value.data.size)) return  void this.Ra.reply(from, IndSizeBesar(value.data.size, "50 MB","Play mp4", value.data.down))
						return void await this.Ra.sendVideo(from, value.data.down, "", mess)
					}).catch(async () => {
						await Ytplaymp4Server2(getRespon.slice(4)).then(async (value: YoutubeMP4PlaySer2) => {
							await this.Ra.sendImage(from, value.thumbnail, IndYtPlayVidSer2(value), mess)
							if (/(gb)/gi.test(String(value.size))) return void this.Ra.reply(from, IndSizeBesar(value.size ?? "", "50 MB","Play mp4", String(value.link)))
							if (Number(String(value.size).split(" MB")[0]) >= 50 && /(mb)/gi.test(String(value.size))) return  void this.Ra.reply(from, IndSizeBesar(String(value.size), "50 MB","Play mp4", String(value.link)))
							return void await this.Ra.sendVideo(from, String(value.link), "", mess)
						}).catch(() => {
							return void this.Ra.reply(from, IndYoutubeKosong(), mess)
						})
					})
				} else {
					if (!getRespon) return this.Ra.reply(from,  IndInputLinkYt(Command), mess)
					this.Ra.reply(from,   IndTungguDown("Youtube Play"), mess)
					await YtPlaymp3(getRespon).then(async (value: youtubeDlCore) => {
						await this.Ra.sendImage(from, value.data.thumbnail ?? "", IndYtPlayMP3(value), mess)
						if (/(gb)/gi.test(value.data.size)) return void this.Ra.reply(from, IndSizeBesar(value.data.size, "13 MB","Play mp3", value.data.down))
						if (Number(value.data.size.split(" MB")[0]) >= 13 && /(mb)/gi.test(value.data.size)) return  void this.Ra.reply(from, IndSizeBesar(value.data.size, "13 MB","Play mp3", value.data.down))
						return void await this.Ra.sendAudio(from, value.data.down, false, mess)
					}).catch(async () => {
						await Ytplaymp3Server2(getRespon).then(async (value: YoutubeMP3PlaySer2) => {
							await this.Ra.sendImage(from, value.thumbnail, IndYtPlayAudSer2(value), mess)
							if (/(gb)/gi.test(String(value.size))) return void this.Ra.reply(from, IndSizeBesar(value.size ?? "", "13 MB","Play mp3", String(value.link)))
							if (Number(String(value.size).split(" MB")[0]) >= 13 && /(mb)/gi.test(String(value.size))) return  void this.Ra.reply(from, IndSizeBesar(String(value.size), "13 MB","Play mp3", String(value.link)))
							return void await this.Ra.sendAudio(from, String(value.link), false, mess)
						}).catch(() => {
							return void this.Ra.reply(from, IndYoutubeKosong(), mess)
						})
					})
				}
			} else if (getRespon.match(/(?:http(?:s|):\/\/|)(?:www\.|)mediafire.com\/file\/([-_0-9A-Za-z]{4,18})/gi)) {
				let Process: number = Date.now()
				await this.Ra.reply(from,  IndTungguDown("Mediafire"), mess)
				await mediafireDown(getRespon).then(async (value: { link: string | undefined, size: string}) => {
					if (!value.link) return void this.Ra.reply(from, BukanMediaFire(Command), mess)
					await this.Ra.reply(from, IndMediaFire(value), mess)
					if (value.size.match(/(mb|gb)/gi) && Number(value.size.replace(/[a-z]/gi, "")) > 75.00) return this.Ra.reply(from, IndSizeBesar(value.size, "75 MB", "MediaFire", String(value.link)))
					await this.Ra.sendDocument(from, value.link, mess)
					const Timer: Parsed = parsems(Date.now() - Process)
					return void await this.Ra.reply(from, IndSuccesDownloader(String(Timer.hours + "Jam," + Timer.minutes + "Menit," + Timer.seconds + " Detik, " + Timer.milliseconds + " Miliseconds"), "MediaFire"), mess)
				}).catch(() => {
					return void this.Ra.reply(from, BukanMediaFire(Command), mess)
				})
			} else if (getRespon.match(/(?:http(?:s|):\/\/|)(?:www\.|)instagram.com/gi)) {
				let Process: number = Date.now()
				const RegPost: RegExpExecArray | null= /(?:http(?:s|):\/\/|)(?:www\.|)instagram.com\/p\/([-_0-9A-Za-z]{5,18})/gi.exec(getRespon)
				const RegReels: RegExpExecArray | null = /(?:http(?:s|):\/\/|)(?:www\.|)instagram.com\/reel\/([-_0-9A-Za-z]{5,18})/gi.exec(getRespon)
				const RegIgTv: RegExpExecArray | null =   /(?:http(?:s|):\/\/|)(?:www\.|)instagram.com\/tv\/([-_0-9A-Za-z]{5,18})/gi.exec(getRespon)
				if (RegPost) {
					await this.Ra.reply(from,   IndTungguDown("Instagram Post"), mess)
					await  InstaDownloader(RegPost[0]).then(async (value: IgPostDown) => {
						if (!value.getData) return
						let caption: { count: number, text: string} = {
							count: 0,
							text: IndIgPost(value, RegPost[0])
						}
						for (let result of value.getData) {
							if (result.isVideo) {
								await this.Ra.sendVideo(from, result.url, (caption.count >= 1) ? "" : caption.text, mess)
							} else {
								await this.Ra.sendImage(from, result.url,  (caption.count >= 1) ? "" : caption.text, mess)
							}
							caption.count++
						}
						const Timer: Parsed = parsems(Date.now() - Process)
						await this.Ra.reply(from, IndSuccesDownloader(String(Timer.hours + "Jam," + Timer.minutes + "Menit," + Timer.seconds + " Detik, " + Timer.milliseconds + " Miliseconds"), "Instagram Post"), mess)
					}).catch(() => {
						return void this.Ra.reply(from,  IndIGDlInvalid(), mess)
					})
				} else if (RegReels) {
					await this.Ra.reply(from,   IndTungguDown("Instagram Reels"), mess)
					await InstaDownloader(RegReels[0]).then(async (value: IgReelsDown) => {
						if (value.link) await this.Ra.sendVideo(from, value.link, IndIgReelsDown(value, RegReels[0]), mess)
						const Timer: Parsed = parsems(Date.now() - Process)
						await this.Ra.reply(from, IndSuccesDownloader(String(Timer.hours + "Jam," + Timer.minutes + "Menit," + Timer.seconds + " Detik, " + Timer.milliseconds + " Miliseconds"), "Instagram Reels"), mess)
					}).catch(() => {
						return void this.Ra.reply(from,  IndIGDlInvalid(), mess)
					})
				} else if (RegIgTv) {
					await this.Ra.reply(from,   IndTungguDown("Instagram IgTv"), mess)
					await InstaDownloader(RegIgTv[0]).then(async (value: IgTvDown) => {
						if (value.link) await this.Ra.sendVideo(from, value.link, IndIgTvDown(value, RegIgTv[0]), mess)
						const Timer: Parsed = parsems(Date.now() - Process)
						await this.Ra.reply(from, IndSuccesDownloader(String(Timer.hours + "Jam," + Timer.minutes + "Menit," + Timer.seconds + " Detik, " + Timer.milliseconds + " Miliseconds"), "Instagram Igtv"), mess)
					}).catch(() => {
						return void this.Ra.reply(from,  IndIGDlInvalid(), mess)
					})
				} else {
					return void this.Ra.reply(from, BukanIgDown(Command), mess)
				}
			} else {
				return void this.Ra.reply(from,  IndBlomSupport(Command), mess)
			}
		})
	} 
	private TiktokDown () {
		globalThis.CMD.on("Toktok", { event: ["tiktok <url tiktok>", "tiktok (wm/nowm/musik) <url tiktok>"], tag: "downloader"}, ["tiktok", "tt", "tiktokdl"], async (res: WAConnection, data: Commands) => {
			const { from, args, mess, bodyQuoted, Command, Prefix } = data;
			if (/^(?:-|--)(help)$/i.test(args[0])) return this.Ra.reply(from, HelpTiktok(Prefix), mess)
			const getRespon: string | undefined = args[0] ? args.join(" ") : bodyQuoted ?? undefined
			if (!getRespon) return this.Ra.reply(from, IndInputLink(Command), mess)
			if (!isUrl(getRespon)) return this.Ra.reply(from, BukanUrl(Command), mess)
			if (!getRespon.match(/(?:http(?:s|):\/\/|)(?:www\.|)tiktok.com\/@([-_0-9A-Za-z]{3,14})\/video\/([0-9]{8,50})(?:\?is_copy_url=0&is_from_webapp=v1&sender_device=pc&sender_web_id=(?:[0-9]{8,50}))|(?:http(?:s|):\/\/|)(?:vt\.tiktok\.com\/([-_0-9A-Za-z]{3,14}))/g)) return this.Ra.reply(from, IndBukanTiktok(Command), mess)
			this.Ra.reply(from,  IndTunggu(), mess)
			await  tiktokDownloader(getRespon).then(async (value : TiktokDownloaders) => {
				switch (true) {
					case /(nowm|withoutwm|nowatermark)/i.test(args[0]):{
						await this.Ra.sendVideo(from, String(value.nowm), IndTiktokDown(value), mess)
					}
					break
					case /(wm|withwm|watermark)/i.test(args[0]): {
						await this.Ra.sendVideo(from, String(value.wm),  IndTiktokDown(value), mess)
					}
					break
					case /(musik|sound|musik)/i.test(args[0]): {
						await this.Ra.sendImage(from, value.music.coverLarge,  IndTiktokDown(value), mess)
						await this.Ra.sendAudio(from, value.music.playUrl, false, mess)
					}
					break
					default:
					await this.Ra.sendVideo(from, String(value.nowm || value.url_with_watermark), IndTiktokDown(value), mess)
					break
				}
			}).catch(async () => {
				await Musically(getRespon).then(async (values: Mussically) => {
					switch (true) {
						case /(nowm|withoutwm|nowatermark)/i.test(args[0]):{
							await this.Ra.sendVideo(from, String(values.nowm ?? values.mp4), "", mess)
						}
						break
						case /(wm|withwm|watermark)/i.test(args[0]): {
							await this.Ra.sendVideo(from, String(values.original),  "", mess)
						}
						break
						default:
						await this.Ra.sendVideo(from, String(values.nowm || values.mp4 || values.original), "", mess)
						break
					}
				}).catch (() => {
					return void this.Ra.reply(from,  IndTiktokErr(Command), mess)
				})
			})
		})
	}
	private FesBuk () {
		globalThis.CMD.on("Fesbuk", { event: ["fbdl <url fb>"], tag: "downloader"}, ["fbdl", "facebook"], async (res:WAConnection, data: Commands) => {
			const { from, args, mess, bodyQuoted, Command, Prefix } = data;
			if (/^(?:-|--)(help)$/i.test(args[0])) return this.Ra.reply(from, HelpFacebook(Prefix), mess)
			const getRespon: string | undefined = args[0] ? args.join(" ") : bodyQuoted ?? undefined
			if (!getRespon) return this.Ra.reply(from, IndInputLink(Command), mess)
			if (!isUrl(getRespon)) return this.Ra.reply(from, BukanUrl(Command), mess)
			if (getRespon.match(/(?:http(?:s|):\/\/|)(?:www\.|)facebook.com\/photo\?([\.&=0-9A-Za-z]{14,50})/gi)) return this.Ra.reply(from, IndFotoFb(), mess)
			if (!getRespon.match(/(?:http(?:s|):\/\/|)(?:www\.|)facebook.com\/([0-9A-Za-z]{2,16})\/videos\/([0-9]{2,18})/gi)) return this.Ra.reply(from, IndLinkFesbuk(Command), mess)
			this.Ra.reply(from,  IndTunggu(), mess)
			await FacebookDown(getRespon).then(async (value: FaceBookDown) => {
				await this.Ra.sendImage(from, value.thumbnail, IndFaceBookDown(value), mess)
				return void await this.Ra.sendVideo(from, value.url_stream, "", mess)
			}).catch(() => {
				return void this.Ra.reply(from, IndFesbukErr(), mess)
			})
		})
	}
	private YtDl () {
		globalThis.CMD.on("YtDl", { event: ["ytdl <url yt>"], tag: "downloader"}, ["ytdl", "youtube"], async (res: WAConnection, data: Commands) => {
			const { from, args, mess, bodyQuoted, Command, Prefix } = data
			if (/^(?:-|--)(help)$/i.test(args[0])) return this.Ra.reply(from, HelpYoutubeDown(Prefix), mess)
			const getRespon: string | undefined = args[0] ? args.join(" ") : bodyQuoted ?? undefined
			if (!getRespon) return this.Ra.reply(from, IndInputLink(Command), mess)
			if (!isUrl(getRespon)) return this.Ra.reply(from, BukanUrl(Command), mess)
			if (!getRespon.match(/(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/)) return this.Ra.reply(from,  IndInputLinkYt(Command), mess)
			if (args[0] && args[0].toLocaleLowerCase() === "mp3") {
				this.Ra.reply(from,  IndTunggu(), mess)
				await YtPlaymp3(getRespon.slice(4)).then(async (value: youtubeDlCore) => {
					await this.Ra.sendImage(from, value.data.thumbnail ?? "", IndYtPlayMP3(value), mess)
					if (/(gb)/gi.test(value.data.size)) return void this.Ra.reply(from, IndSizeBesar(value.data.size, "13 MB","Play mp3", value.data.down))
					if (Number(value.data.size.split(" MB")[0]) >= 13 && /(mb)/gi.test(value.data.size)) return  void this.Ra.reply(from, IndSizeBesar(value.data.size, "13 MB","Play mp3", value.data.down))
					return void await this.Ra.sendAudio(from, value.data.down, false, mess)
				}).catch(async () => {
					await Ytplaymp3Server2(getRespon.slice(4)).then(async (value: YoutubeMP3PlaySer2) => {
						await this.Ra.sendImage(from, value.thumbnail, IndYtPlayAudSer2(value), mess)
						if (/(gb)/gi.test(String(value.size))) return void this.Ra.reply(from, IndSizeBesar(value.size ?? "", "13 MB","Play mp3", String(value.link)))
						if (Number(String(value.size).split(" MB")[0]) >= 13 && /(mb)/gi.test(String(value.size))) return  void this.Ra.reply(from, IndSizeBesar(String(value.size), "13 MB","Play mp3", String(value.link)))
						return void await this.Ra.sendAudio(from, String(value.link), false, mess)
					}).catch(() => {
						return void this.Ra.reply(from, IndYoutubeKosong(), mess)
					})
				})
			} else if (args[0] && args[0].toLowerCase() === "mp4") {
				this.Ra.reply(from,  IndTunggu(), mess)
				await YtPlaymp4(getRespon.slice(4)).then(async (value: youtubeDlCore) => {
					await this.Ra.sendImage(from, value.data.thumbnail ?? "", IndYtPlayMP4(value), mess)
					if (/(gb)/gi.test(value.data.size)) return void this.Ra.reply(from, IndSizeBesar(value.data.size, "50 MB","Play mp4", value.data.down))
					if (Number(value.data.size.split(" MB")[0]) >= 50 && /(mb)/gi.test(value.data.size)) return  void this.Ra.reply(from, IndSizeBesar(value.data.size, "50 MB","Play mp4", value.data.down))
					return void await this.Ra.sendVideo(from, value.data.down, "", mess)
				}).catch(async () => {
					await Ytplaymp4Server2(getRespon.slice(4)).then(async (value: YoutubeMP4PlaySer2) => {
						await this.Ra.sendImage(from, value.thumbnail, IndYtPlayVidSer2(value), mess)
						if (/(gb)/gi.test(String(value.size))) return void this.Ra.reply(from, IndSizeBesar(value.size ?? "", "50 MB","Play mp4", String(value.link)))
						if (Number(String(value.size).split(" MB")[0]) >= 50 && /(mb)/gi.test(String(value.size))) return  void this.Ra.reply(from, IndSizeBesar(String(value.size), "50 MB","Play mp4", String(value.link)))
						return void await this.Ra.sendVideo(from, String(value.link), "", mess)
					}).catch(() => {
						return void this.Ra.reply(from, IndYoutubeKosong(), mess)
					})
				})
			} else {
				this.Ra.reply(from,  IndTunggu(), mess)
				await YtPlaymp3(getRespon).then(async (value: youtubeDlCore) => {
					await this.Ra.sendImage(from, value.data.thumbnail ?? "", IndYtPlayMP3(value), mess)
					if (/(gb)/gi.test(value.data.size)) return void this.Ra.reply(from, IndSizeBesar(value.data.size, "13 MB","Play mp3", value.data.down))
					if (Number(value.data.size.split(" MB")[0]) >= 13 && /(mb)/gi.test(value.data.size)) return  void this.Ra.reply(from, IndSizeBesar(value.data.size, "13 MB","Play mp3", value.data.down))
					return void await this.Ra.sendAudio(from, value.data.down, false, mess)
				}).catch(async () => {
					await Ytplaymp3Server2(getRespon).then(async (value: YoutubeMP3PlaySer2) => {
						await this.Ra.sendImage(from, value.thumbnail, IndYtPlayAudSer2(value), mess)
						if (/(gb)/gi.test(String(value.size))) return void this.Ra.reply(from, IndSizeBesar(value.size ?? "", "13 MB","Play mp3", String(value.link)))
						if (Number(String(value.size).split(" MB")[0]) >= 13 && /(mb)/gi.test(String(value.size))) return  void this.Ra.reply(from, IndSizeBesar(String(value.size), "13 MB","Play mp3", String(value.link)))
						return void await this.Ra.sendAudio(from, String(value.link), false, mess)
					}).catch(() => {
						return void this.Ra.reply(from, IndYoutubeKosong(), mess)
					})
				})
			}
		})
	}
	private MediaFireDown () {
		globalThis.CMD.on("MediaFire", { event: ["mediafire <url mediafire>"], tag: "downloader"}, ["mediafire"], async (res: WAConnection, data: Commands) => {
			const { from, mess, args, bodyQuoted, Command, Prefix } = data
			if (/^(?:-|--)(help)$/i.test(args[0])) return this.Ra.reply(from,  HelpMediaFire(Prefix), mess)
			const getRespon: string | undefined = args[0] ? args.join(" ") : bodyQuoted ?? undefined
			if (!getRespon) return this.Ra.reply(from, IndInputLink(Command), mess)
			if (!isUrl(getRespon)) return this.Ra.reply(from, BukanUrl(Command), mess)
			if (!getRespon.match(/(?:http(?:s|):\/\/|)(?:www\.|)mediafire.com\/file\/([-_0-9A-Za-z]{4,18})/gi)) return this.Ra.reply(from, BukanMediaFire(Command), mess)
			let Process: number = Date.now()
			await this.Ra.reply(from,  IndTunggu(), mess)
			await mediafireDown(getRespon).then(async (value: { link: string | undefined, size: string}) => {
				if (!value.link) return void this.Ra.reply(from, BukanMediaFire(Command), mess)
				await this.Ra.reply(from, IndMediaFire(value), mess)
				if (value.size.match(/(mb|gb)/gi) && Number(value.size.replace(/[a-z]/gi, "")) > 75.00) return this.Ra.reply(from, IndSizeBesar(value.size, "75 MB", "MediaFire", String(value.link)))
				await this.Ra.sendDocument(from, value.link, mess)
				const Timer: Parsed = parsems(Date.now() - Process)
				return void await this.Ra.reply(from, IndSuccesDownloader(String(Timer.hours + "Jam," + Timer.minutes + "Menit," + Timer.seconds + " Detik, " + Timer.milliseconds + " Miliseconds"), "MediaFire"), mess)
			}).catch(() => {
				return void this.Ra.reply(from, BukanMediaFire(Command), mess)
			})
		})
	}
	private IgDownloader () {
		globalThis.CMD.on("igdownloader", { event: ["igdl <url instagram>"], tag: "downloader" }, ["instagram", "igdown", "igdl", "instadown", "insta"], async (res: WAConnection, data: Commands) => {
			const { from, mess, args, bodyQuoted, Command, Prefix } = data
			if (/^(?:-|--)(help)$/i.test(args[0])) return this.Ra.reply(from, HelpInstagramDown(Prefix), mess)
			const getRespon: string | undefined = args[0] ? args.join(" ") : bodyQuoted ?? undefined
			if (!getRespon) return this.Ra.reply(from, IndInputLink(Command), mess)
			if (!isUrl(getRespon)) return this.Ra.reply(from, BukanUrl(Command), mess)
			let Process: number = Date.now()
			const RegPost: RegExpExecArray | null= /(?:http(?:s|):\/\/|)(?:www\.|)instagram.com\/p\/([-_0-9A-Za-z]{5,18})/gi.exec(getRespon)
			const RegReels: RegExpExecArray | null = /(?:http(?:s|):\/\/|)(?:www\.|)instagram.com\/reel\/([-_0-9A-Za-z]{5,18})/gi.exec(getRespon)
			const RegIgTv: RegExpExecArray | null =   /(?:http(?:s|):\/\/|)(?:www\.|)instagram.com\/tv\/([-_0-9A-Za-z]{5,18})/gi.exec(getRespon)
			if (RegPost) {
				await this.Ra.reply(from,  IndTunggu(), mess)
				await  InstaDownloader(RegPost[0]).then(async (value: IgPostDown) => {
					if (!value.getData) return
					let caption: { count: number, text: string} = {
						count: 0,
						text: IndIgPost(value, RegPost[0])
					}
					for (let result of value.getData) {
						if (result.isVideo) {
							await this.Ra.sendVideo(from, result.url, (caption.count >= 1) ? "" : caption.text, mess)
						} else {
							await this.Ra.sendImage(from, result.url,  (caption.count >= 1) ? "" : caption.text, mess)
						}
						caption.count++
					}
					const Timer: Parsed = parsems(Date.now() - Process)
					await this.Ra.reply(from, IndSuccesDownloader(String(Timer.hours + "Jam," + Timer.minutes + "Menit," + Timer.seconds + " Detik, " + Timer.milliseconds + " Miliseconds"), "Instagram Post"), mess)
				}).catch(() => {
					return void this.Ra.reply(from,  IndIGDlInvalid(), mess)
				})
			} else if (RegReels) {
				await this.Ra.reply(from,  IndTunggu(), mess)
				await InstaDownloader(RegReels[0]).then(async (value: IgReelsDown) => {
					if (value.link) await this.Ra.sendVideo(from, value.link, IndIgReelsDown(value, RegReels[0]), mess)
					const Timer: Parsed = parsems(Date.now() - Process)
					await this.Ra.reply(from, IndSuccesDownloader(String(Timer.hours + "Jam," + Timer.minutes + "Menit," + Timer.seconds + " Detik, " + Timer.milliseconds + " Miliseconds"), "Instagram Reels"), mess)
				}).catch(() => {
					return void this.Ra.reply(from,  IndIGDlInvalid(), mess)
				})
			} else if (RegIgTv) {
				await this.Ra.reply(from,  IndTunggu(), mess)
				await InstaDownloader(RegIgTv[0]).then(async (value: IgTvDown) => {
					if (value.link) await this.Ra.sendVideo(from, value.link, IndIgTvDown(value, RegIgTv[0]), mess)
					const Timer: Parsed = parsems(Date.now() - Process)
					await this.Ra.reply(from, IndSuccesDownloader(String(Timer.hours + "Jam," + Timer.minutes + "Menit," + Timer.seconds + " Detik, " + Timer.milliseconds + " Miliseconds"), "Instagram Igtv"), mess)
				}).catch(() => {
					return void this.Ra.reply(from,  IndIGDlInvalid(), mess)
				})
			} else {
				return void this.Ra.reply(from, BukanIgDown(Command), mess)
			}
		})
	}
}
