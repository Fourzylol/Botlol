import { GroupGuards as GroupGuard} from ".";
import { WAConnection, MessageType, proto, WAChat } from '@adiwajshing/baileys'
import { Commands } from '../typings'
import { Client } from '../src/Client'
import { ConnectMoongo } from '../database/mongoodb/main'
import { IndBcDone } from "../lang/ind"

export class OwnerOnly extends GroupGuard {
	constructor(public Ra: Client, public database: ConnectMoongo) {
        super(Ra, database)
    }
	public SendOwner () {
		this.sendGlobal()
		this.ResetDatabase()
		this. Broadcast()
	}
	private ResetDatabase () {
		globalThis.CMD.on("owner|reset", { event: ["resetdatabase"], tag: "owner"}, ["resetdatabase"], async(res: WAConnection, data: Commands) => {
			if (!data.isOwner) return
			await this.database.resetMongoDb()
			await this.Ra.reply(data.from, "Success", data.mess)
		})
	}
	private Broadcast () {
		globalThis.CMD.on("owner|bc", { event: ["bc <media/text>", "bcgc <media/text>", "bcpc <media/text>", "publik <on/off>"], tag: "owner"}, ["bc", "bcgc", "bcpc"], async (res: WAConnection, data: Commands) => {
			const { from, media, mess, isVideo, isQuotedVideo, args, bodyQuoted, isGambar,  isQuotedImage, Command } = data
			if (!data.isOwner) return
			let bc: string[]
			if (Command === prefix + "bcgc"){
				 bc = await res.chats.all().filter((values: WAChat) => values.jid.endsWith("@g.us")).map((values) => values.jid) 
			} else if (Command === prefix + "bcpc") { 
				bc = await res.chats.all().filter((values: WAChat) => values.jid.endsWith("@s.whatsapp.net")).map((values) => values.jid)
			} else {
				bc =  await res.chats.all().map((values: WAChat) => values.jid)
			}
			for (let respon of bc) {
				setTimeout(async () => {
					if (media) {
						let getFile: Buffer = await this.Ra.decryptMediaMessage(media)
						switch (true) {
							case isVideo || isQuotedVideo: {
								await this.Ra.sendVideo(respon, getFile, `ㅤㅤㅤㅤ  *「 BROADCAST 」*\n\n ${args[0] ? args.join(" ") : bodyQuoted}`)
							}
							break
							case isGambar || isQuotedImage: {
								await this.Ra.sendImage(respon, getFile,  `ㅤㅤㅤㅤ  *「 BROADCAST 」*\n\n${args[0] ? args.join(" ") : bodyQuoted}`)
							}
							break
						}
					} else {
						await this.Ra.sendTextWithMentions(respon, `ㅤㅤㅤㅤ  *「 BROADCAST 」*\n\n${args[0] ? args.join(" ") : bodyQuoted}`)
					}
				}, 4000)
			}
			this.Ra.reply(from, IndBcDone(), mess)
		})
	}
}