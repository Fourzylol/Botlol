import { Stalking } from '.'
import { Client } from '../src/Client'
import { WAConnection } from '@adiwajshing/baileys'
import { Commands, LirikResult, Azlirik, youtubeDlCore, YoutubeMP3PlaySer2, YoutubeMP4PlaySer2, Joox } from '../typings'
import { LirikLagu, AzLirik, YtPlaymp3, YtPlaymp4, Ytplaymp3Server2, Ytplaymp4Server2, LirikServer2, JooxSearch, LirikIndo } from '../routers/api'
import { IndLirikMusicMatch, IndAzLirik, LirikGada, IndYtPlayMP3, IndQuerryKosong, IndYoutubeKosong, IndTungguSearch, IndSizeBesar, IndYtPlayMP4, IndYtPlayAudSer2, IndYtPlayVidSer2, JooxSer, IndJooxSerError, IndLirikIndo, IndTunggu } from '../lang/ind';
import { ConnectMoongo } from '../database/mongoodb/main';
import { Tunggu } from "../functions/function"

export class MusicHandling extends Stalking {
	constructor(public Ra: Client, public database: ConnectMoongo) {
        super(Ra, database)
    }
    public SendDataMusic() {
        this.Sendding()
        this.Lirik()
		this.PlayYt()
		this.YtMp3()
		this.YtMP4()
		this.JooxSearch()
		this.LirikIndo()
		this.Nyanyi()
    }
	private JooxSearch () {
		globalThis.CMD.on("musik|jooxserching", { event: ["jooxsearch <title>"], tag: "musik"}, ["jooxsearch", "searchjoox"], async (res: WAConnection, data: Commands) => {
			const { from, args, mess } = data
			if (!args[0]) return this.Ra.reply(from, IndQuerryKosong(), mess)
			this.Ra.reply(from,  IndTungguSearch(), mess)
			await JooxSearch(args.join(" ")).then((value: Joox[]) => {
				this.Ra.sendImage(from, value[0].images[0].url,  JooxSer(value), mess)
			}).catch (() => {
				this.Ra.reply(from,  IndJooxSerError(), mess)
			})
		})
	}
	private YtMP4 () {
		globalThis.CMD.on("musik|ytmp4 <judul/url>",  { event: ["ytmp4 <judul/url>"], tag: "musik"}, ["ytmp4"], async (res: WAConnection, data: Commands) => {
			const { from, args, mess } = data
			if (!args[0]) return this.Ra.reply(from, IndQuerryKosong(), mess)
			this.Ra.reply(from,  IndTungguSearch(), mess)
			await YtPlaymp4(args.join(" ")).then(async (value: youtubeDlCore) => {
				await this.Ra.sendImage(from, value.data.thumbnail ?? "", IndYtPlayMP4(value), mess)
				if (/(gb)/gi.test(value.data.size)) return void this.Ra.reply(from, IndSizeBesar(value.data.size, "50 MB","Play mp4", value.data.down))
				if (Number(value.data.size.split(" MB")[0]) >= 50 && /(mb)/gi.test(value.data.size)) return  void this.Ra.reply(from, IndSizeBesar(value.data.size, "50 MB","Play mp4", value.data.down))
				return void await this.Ra.sendVideo(from, value.data.down, "", mess)
			}).catch(async () => {
				await Ytplaymp4Server2(args.join(" ")).then(async (value: YoutubeMP4PlaySer2) => {
					await this.Ra.sendImage(from, value.thumbnail, IndYtPlayVidSer2(value), mess)
					if (/(gb)/gi.test(String(value.size))) return void this.Ra.reply(from, IndSizeBesar(value.size ?? "", "50 MB","Play mp4", String(value.link)))
					if (Number(String(value.size).split(" MB")[0]) >= 50 && /(mb)/gi.test(String(value.size))) return  void this.Ra.reply(from, IndSizeBesar(String(value.size), "50 MB","Play mp4", String(value.link)))
					return void await this.Ra.sendVideo(from, String(value.link), "", mess)
				}).catch(() => {
					return void this.Ra.reply(from, IndYoutubeKosong(), mess)
				})
			})
		})
	}
	private YtMp3 () {
		globalThis.CMD.on("musik|ytmp3 <judul/url>",   { event: ["ytmp3 <judul/url>"], tag: "musik"},["ytmp3"], async (res: WAConnection, data: Commands) => {
			const { from, args, mess } = data
			if (!args[0]) return this.Ra.reply(from, IndQuerryKosong(), mess)
			this.Ra.reply(from,  IndTungguSearch(), mess)
			await YtPlaymp3(args.join(" ")).then(async (value: youtubeDlCore) => {
				await this.Ra.sendImage(from, value.data.thumbnail ?? "", IndYtPlayMP3(value), mess)
				if (/(gb)/gi.test(value.data.size)) return void this.Ra.reply(from, IndSizeBesar(value.data.size, "13 MB","Play mp3", value.data.down))
				if (Number(value.data.size.split(" MB")[0]) >= 13 && /(mb)/gi.test(value.data.size)) return  void this.Ra.reply(from, IndSizeBesar(value.data.size, "13 MB","Play mp3", value.data.down))
				return void await this.Ra.sendAudio(from, value.data.down, true, mess)
			}).catch(async () => {
				await Ytplaymp3Server2(args.join(" ")).then(async (value: YoutubeMP3PlaySer2) => {
					await this.Ra.sendImage(from, value.thumbnail, IndYtPlayAudSer2(value), mess)
					if (/(gb)/gi.test(String(value.size))) return void this.Ra.reply(from, IndSizeBesar(value.size ?? "", "13 MB","Play mp3", String(value.link)))
					if (Number(String(value.size).split(" MB")[0]) >= 13 && /(mb)/gi.test(String(value.size))) return  void this.Ra.reply(from, IndSizeBesar(String(value.size), "13 MB","Play mp3", String(value.link)))
					return void await this.Ra.sendAudio(from, String(value.link), false, mess)
				}).catch(() => {
					return void this.Ra.reply(from, IndYoutubeKosong(), mess)
				})
			})
		})
	}
	private PlayYt () {
		globalThis.CMD.on("musik|play <judul/url>",   { event: ["play <judul/url>", "play mp4 <judul/url>", "play mp3 <judul/url>"], tag: "musik"}, ["play"], async (res: WAConnection, data: Commands) => {
			const { from, args, mess } = data
			if (!args[0]) return this.Ra.reply(from, IndQuerryKosong(), mess)
			if (args[0].toLocaleLowerCase() === "mp3") {
				args.shift()
				if (!args[0]) return this.Ra.reply(from, IndQuerryKosong(), mess)
				this.Ra.reply(from,  IndTungguSearch(), mess)
				await YtPlaymp3(args.join(" ")).then(async (value: youtubeDlCore) => {
					await this.Ra.sendImage(from, value.data.thumbnail ?? "", IndYtPlayMP3(value), mess)
					if (/(gb)/gi.test(value.data.size)) return void this.Ra.reply(from, IndSizeBesar(value.data.size, "13 MB","Play mp3", value.data.down))
					if (Number(value.data.size.split(" MB")[0]) >= 13 && /(mb)/gi.test(value.data.size)) return  void this.Ra.reply(from, IndSizeBesar(value.data.size, "13 MB","Play mp3", value.data.down))
					return void await this.Ra.sendAudio(from, value.data.down, false, mess)
				}).catch(async () => {
					await Ytplaymp3Server2(args.join(" ")).then(async (value: YoutubeMP3PlaySer2) => {
						await this.Ra.sendImage(from, value.thumbnail, IndYtPlayAudSer2(value), mess)
						if (/(gb)/gi.test(String(value.size))) return void this.Ra.reply(from, IndSizeBesar(value.size ?? "", "13 MB","Play mp3", String(value.link)))
						if (Number(String(value.size).split(" MB")[0]) >= 13 && /(mb)/gi.test(String(value.size))) return  void this.Ra.reply(from, IndSizeBesar(String(value.size), "13 MB","Play mp3", String(value.link)))
						return void await this.Ra.sendAudio(from, String(value.link), false, mess)
					}).catch(() => {
						return void this.Ra.reply(from, IndYoutubeKosong(), mess)
					})
				})
			} else if (args[0].toLowerCase() === "mp4") {
				args.shift()
				if (!args[0]) return this.Ra.reply(from, IndQuerryKosong(), mess)
				this.Ra.reply(from,  IndTungguSearch(), mess)
				await YtPlaymp4(args.join(" ")).then(async (value: youtubeDlCore) => {
					await this.Ra.sendImage(from, value.data.thumbnail ?? "", IndYtPlayMP4(value), mess)
					if (/(gb)/gi.test(value.data.size)) return void this.Ra.reply(from, IndSizeBesar(value.data.size, "50 MB","Play mp4", value.data.down))
					if (Number(value.data.size.split(" MB")[0]) >= 50 && /(mb)/gi.test(value.data.size)) return  void this.Ra.reply(from, IndSizeBesar(value.data.size, "50 MB","Play mp4", value.data.down))
					return void await this.Ra.sendVideo(from, value.data.down, "", mess)
				}).catch(async () => {
					await Ytplaymp4Server2(args.join(" ")).then(async (value: YoutubeMP4PlaySer2) => {
						await this.Ra.sendImage(from, value.thumbnail, IndYtPlayVidSer2(value), mess)
						if (/(gb)/gi.test(String(value.size))) return void this.Ra.reply(from, IndSizeBesar(value.size ?? "", "50 MB","Play mp4", String(value.link)))
						if (Number(String(value.size).split(" MB")[0]) >= 50 && /(mb)/gi.test(String(value.size))) return  void this.Ra.reply(from, IndSizeBesar(String(value.size), "50 MB","Play mp4", String(value.link)))
						return void await this.Ra.sendVideo(from, String(value.link), "", mess)
					}).catch(() => {
						return void this.Ra.reply(from, IndYoutubeKosong(), mess)
					})
				})
			} else {
				this.Ra.reply(from,  IndTungguSearch(), mess)
				await YtPlaymp3(args.join(" ")).then(async (value: youtubeDlCore) => {
					await this.Ra.sendImage(from, value.data.thumbnail ?? "", IndYtPlayMP3(value), mess)
					if (/(gb)/gi.test(value.data.size)) return void this.Ra.reply(from, IndSizeBesar(value.data.size, "13 MB","Play mp3", value.data.down))
					if (Number(value.data.size.split(" MB")[0]) >= 13 && /(mb)/gi.test(value.data.size)) return  void this.Ra.reply(from, IndSizeBesar(value.data.size, "13 MB","Play mp3", value.data.down))
					return void await this.Ra.sendAudio(from, value.data.down, true, mess)
				}).catch(async () => {
					await Ytplaymp3Server2(args.join(" ")).then(async (value: YoutubeMP3PlaySer2) => {
						await this.Ra.sendImage(from, value.thumbnail, IndYtPlayAudSer2(value), mess)
						if (/(gb)/gi.test(String(value.size))) return void this.Ra.reply(from, IndSizeBesar(value.size ?? "", "13 MB","Play mp3", String(value.link)))
						if (Number(String(value.size).split(" MB")[0]) >= 13 && /(mb)/gi.test(String(value.size))) return  void this.Ra.reply(from, IndSizeBesar(String(value.size), "13 MB","Play mp3", String(value.link)))
						return void await this.Ra.sendAudio(from, String(value.link), true, mess)
					}).catch(() => {
						return void this.Ra.reply(from, IndYoutubeKosong(), mess)
					})
				})
			}
		})
	}
	private LirikIndo () {
		globalThis.CMD.on("lirikInd", { event: ["lirikindo <judul>"], tag: "musik"}, ["lirikind", "lirikindo"], async (res: WAConnection, data: Commands) => {
			const { from, args, mess } = data
			if (!args[0]) return this.Ra.reply(from, IndQuerryKosong(), mess)
			try {
				const respon: { judul: string, lirik: string} = await LirikIndo(args.join(" "))
				await this.Ra.reply(from, IndLirikIndo(respon), mess)
			} catch (err) {
				this.Ra.reply(from, LirikGada(), mess)
			}
		})
	}
	private Nyanyi () {
		globalThis.CMD.on("musik|nyanyi", { event: ["nyanyi <judul>"], tag: "musik"}, ["nyanyi"], async (res: WAConnection, data: Commands) => {
			const { from, mess, args, isOwner } = data;
			if (!isOwner) return
			await this.Ra.reply(from, IndTunggu(), mess)
			const Sound: youtubeDlCore = await YtPlaymp3(args.join(" "))
			const result: LirikResult | undefined = await LirikLagu(args.join(" "))
			if (!result) return this.Ra.reply(from, "judul Not Found", mess)
			const Lirik: string[] = result.result.lirik.split("\n").filter((values: string) => values)
			let Limit: number = 0
			const RandomLimit = (): number => {
				const Data: number[] = [5000, 3000, 4000, 5000,4500, 5000, 6000, 5000, 5000, 7000, 5000]
				const ret: number = Data[Math.floor(Math.random() * Data.length)]
				return ret
			}
			const RandomKata = async () => {
				const Data: number[] = [1, 2, 3, 1, 2, 1, 2, 3]
				const ret: number = Data[Math.floor(Math.random() * Data.length)]
				const Path: string = "./lib/storage/polosan/gitar.webp"
				if (!Lirik) return
				if (ret == 1) {
					await this.Ra.sendText(from, Lirik[Limit])
					Limit++
					await this.Ra.sendSticker(from, Path)
				} else if (ret == 2) {
					await this.Ra.sendText(from, Lirik[Limit])
					Limit++
					await this.Ra.sendText(from, Lirik[Limit])
					Limit++
					await this.Ra.sendSticker(from, Path)
				} else if (ret == 3) {
					await this.Ra.sendText(from, Lirik[Limit])
					Limit++
					await this.Ra.sendText(from, Lirik[Limit])
					Limit++
					await this.Ra.sendText(from, Lirik[Limit])
					Limit++
					await this.Ra.sendSticker(from, Path)
				}
			}
			await this.Ra.sendAudio(from, Sound.data.down, false, mess)
			await this.Ra.sendText(from, `Bot akan Menyanyikan lagu yang berjudul : ${Sound.data.title}`)
			await Tunggu(3500)
			for (let i = 0; i < Lirik.length; i++) {
				if (Limit > 21) return void await this.Ra.sendText(from, "Makasih jangan lupa donasinya ya kaka:v")
				await Tunggu(RandomLimit())
				await RandomKata()
				await Tunggu(RandomLimit())
			}
		})
	}
    private Lirik() {
		globalThis.CMD.on('musik|lirik <judul>',   { event: ["lirik <judul>"], tag: "musik"},['lirik', 'lyrics'], async (res: WAConnection, data: Commands) => {
			const { from, args, mess } = data
			if (!args[0]) return this.Ra.reply(from, IndQuerryKosong(), mess)
            await LirikLagu(args.join(' ')).then(async (result: LirikResult | undefined) => {
				if (!result) {
					await AzLirik(args.join(' ')).then((value: Azlirik) => {
						this.Ra.reply(from, IndAzLirik(value), mess)
					}).catch(async () => {
						await LirikServer2(args.join(" ")).then((values: { title: string, artis: string,  lirik: string } ) => {
							this.Ra.reply(from, IndAzLirik(values), mess)
						}).catch(() => {
							this.Ra.reply(from, LirikGada(), mess)
						})
					})
				} else {
					this.Ra.sendImage(from, result.result.thumbnail, IndLirikMusicMatch(result), mess)
				}
			}).catch(async () => {
				await AzLirik(args.join(' ')).then((value: Azlirik) => {
					this.Ra.reply(from, IndAzLirik(value), mess)
				}).catch(async () => {
					await LirikServer2(args.join(" ")).then((values: { title: string, artis: string,  lirik: string } ) => {
						this.Ra.reply(from, IndAzLirik(values), mess)
					}).catch(() => {
						this.Ra.reply(from, LirikGada(), mess)
					})
					})
				})
			})
		}
	}
