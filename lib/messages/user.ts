import { Converter as Convert } from '.'
import { WAConnection, MessageType, proto, WAChat, compressImage } from '@adiwajshing/baileys'
import { Commands } from '../typings'
import { Ucapan } from '../plugins'
import Speed from 'performance-now'
import moment from 'moment-timezone'
import jimp from 'jimp'
import { Runtime } from '../functions/function'
import { Client } from '../src/Client'
import * as fs from 'fs'
import { ConnectMoongo } from '../database/mongoodb/main'
import { config } from 'dotenv'
config({ path: './.env' })
import { IndSuccesSetPrefix, IndSuccesSetMulti, IndDonePushMulti, IndErrPushMulti, IndDoneDelMulti, IndErrDelMulti, IndMultiData, BerhasilJoin, IndGagalJoin, IndSudahDalamGc, IndItuNomerOwn, IndSendSc  } from '../lang/ind'

const LajuCepat: number = Speed()
const Ping: string = (Speed() - LajuCepat).toFixed(4)
const Jam: string = moment(new Date()).format('LLLL')

export class UserHandler extends Convert {
    constructor(public Ra: Client, public database: ConnectMoongo) {
        super(Ra)
    }
    public async sendData(): Promise<void> {
        this.SendingConverter()
        this.menu()
        this.setPrefix()
        this.multiPrefix()
        this.addPrefix()
        this.delPrefix()
        this.checkMulti()
        this.Creator()
        this.Join()
		this.pingg()
		this.ScBot()
    }
	private ScBot () {
		globalThis.CMD.on("user|sc", { event: ["sc"], tag: "user"}, ["sc", "script"], async (res: WAConnection, data: Commands) => {
			const { from, mess } = data
			return void this.Ra.reply(from, IndSendSc(), mess)
		})
	}
    private setPrefix(): void {
        globalThis.CMD.on('user|setprefix <prefix>',   { event: ["setprefix <prefix>"], tag: "user"},['setprefix'], async (res: WAConnection, data: Commands) => {
			const { from, mess, sender, args } = data
            if (!sender) return
			await this.database.setprefix(sender, args[0])
			return void this.Ra.reply(from, IndSuccesSetPrefix(args[0], await this.database.statusPrefix(sender)), mess)
		}, { noPrefix: false })
    }
    private checkMulti(): void {
        globalThis.CMD.on('user|cekmulti',   { event: ["cekmulti"], tag: "user"},'cekmulti', async (res: WAConnection, data: Commands) => {
			const { from, mess, sender } = data
            if (!sender) return
            const hasil: string | undefined = await this.database.getMultiPrefix(sender)
            if (typeof hasil !== 'string') return
            return void this.Ra.reply(from, IndMultiData(hasil), mess)
        })
    }
    private addPrefix(): void {
        globalThis.CMD.on('user|addmulti <prefix>',   { event: ["addmulti <prefix>"], tag: "user"}, ['addmulti'], async (res: WAConnection, data: Commands) => {
                const { from, mess, sender, args } = data
                if (args[0] == undefined) return this.Ra.reply(from, IndErrPushMulti(), mess)
                if (!sender) return
                await this.database.addMultiPrefix(sender, args[0])
                return void this.Ra.reply(from, IndDonePushMulti(args[0]), mess)
            },
            { noPrefix: false }
        )
    }
    private Creator(): void {
        globalThis.CMD.on('user|creator/owner',   { event: ["creator/owner"], tag: "user"},['owner', 'creator'], (res: WAConnection, data: Commands) => {
            const { from, mess } = data
            this.Ra.sendContactOwner(from, mess)
			return void this.Ra.reply(from, IndItuNomerOwn(), mess)
        })
    }
    private delPrefix(): void | undefined {
        globalThis.CMD.on('user|delmulti <prefix>',   { event: ["delmulti <prefix>"], tag: "user"}, ['delmulti'], async (res: WAConnection, data: Commands) => {
			const { from, mess, sender, args } = data
            if (!sender) return
            if (args[0] == undefined) return this.Ra.reply(from, IndErrDelMulti(), mess)
            await this.database.delMultiPrefix(sender, args[0])
            return void this.Ra.reply(from, IndDoneDelMulti(args[0]), mess)
		}, { noPrefix: false })
    }
    private multiPrefix(): void {
        globalThis.CMD.on('user|multi <on/off>',   { event: ["multi <on/off>"], tag: "user"},['multi'], async (res: WAConnection, data: Commands) => {
            const { from, mess, sender, args } = data
            if (!sender) return
            if (args[0] == 'on') {
				await this.database.multiPRefix(true, sender)
				return void this.Ra.reply(from, IndSuccesSetMulti(true), mess)
            } else if (args[0] == 'off') {
                await this.database.multiPRefix(false, sender)
                return void this.Ra.reply(from, IndSuccesSetMulti(false), mess)
			}
		}, { noPrefix: false })
    }
    private Join() {
        globalThis.CMD.on('user|join <link gc>',  { event: ["join <link group>"], tag: "user"},['join', 'gabung'], async (res: WAConnection, data: Commands) => {
            const { from, mess, args, bodyQuoted, quotedMsg } = data
            let check: RegExpMatchArray | null | undefined = args[0] ? args.join(' ').match(/(?:http(?:s|):\/\/|)chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i) : quotedMsg ? bodyQuoted?.match(/(?:http(?:s|):\/\/|)chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i) : []
            if (!check) return this.Ra.reply(from, IndGagalJoin(), mess)
            let [link, id] = check
            let response = await res.query({
                json: ['query', 'invite', id]
            })
            const CheckData: WAChat[] = await res.chats.all()
            if (CheckData.find((value) => value.jid == response.id)) return this.Ra.reply(from, IndSudahDalamGc(), mess)
            await res.acceptInvite(id).then(async () => {
				this.Ra.reply(from, BerhasilJoin(), mess)
			}).catch(() => {
				this.Ra.reply(from, IndGagalJoin(), mess)
			})
        })
    }
	private async pingg () {
		globalThis.CMD.on("user|ping", { event: ["ping"], tag: "user"}, ["ping"], async (res: WAConnection, data: Commands) => {
			const { from, mess } = data
			this.Ra.reply(from, "*🌪 Speed :* " + Ping, mess)
		})
	}
    private menu(): void {
        globalThis.CMD.on('user|menu',   { event: ["menu"], tag: "user"},['menu', "manu"], async (res: WAConnection, data: Commands) => {
			const { from, isOwner, sender, command, Prefix } = data
			const getTag: { name: string, tampil: { event: string[], tag: string, withPrefix: boolean}, pattern: any,callback: any}[] = Object.values(globalThis.CMD.events)
            let Converter: string[][] = getTag.filter((value) => value.tampil.tag === "converter").map((value) => value.tampil.event)
            let User: string[][] = getTag.filter((value) => value.tampil.tag === "user").map((value) => value.tampil.event)
            let Owner: string[][] = getTag.filter((value) => value.tampil.tag === "owner").filter((value) => value.tampil.withPrefix).map((value) => value.tampil.event)
			let OwnerNoPref: string[][] = getTag.filter((value) => value.tampil.tag === "owner").filter((value) => !value.tampil.withPrefix).map((value) => value.tampil.event)
            let Storage: string[][] = getTag.filter((value) => value.tampil.tag === "storage").map((value) => value.tampil.event)
            let Stalker: string[][] = getTag.filter((value) => value.tampil.tag === "stalking").map((value) => value.tampil.event)
            let Group: string[][] = getTag.filter((value) => value.tampil.tag === "groupadmins").map((value) => value.tampil.event)
            let GroupMem: string[][] = getTag.filter((value) => value.tampil.tag === "group").map((value) => value.tampil.event)
            let Musik: string[][] = getTag.filter((value) => value.tampil.tag === "musik").map((value) => value.tampil.event)
            let Voting: string[][] = getTag.filter((value) => value.tampil.tag === "voting").map((value) => value.tampil.event)
			let Guards: string[][] = getTag.filter((value) => value.tampil.tag === "groupguards").map((value) => value.tampil.event)
			let Search: string[][]= getTag.filter((value) => value.tampil.tag === "search").map((value) => value.tampil.event)
			let Downloader: string[][] = getTag.filter((value) => value.tampil.tag === "downloader").map((value) => value.tampil.event)
			let Berita: string[][] = getTag.filter((value) => value.tampil.tag === "berita").map((value) => value.tampil.event)
			let UserMenu: string[] = []
			let ConverterMenu: string[] = []
			let StorageMenu: string[] = []
			let StalkerMenu: string[] = []
			let GroupMenu: string[] = []
			let  GroupMemMenu: string[] = []
			let MusikMenu: string[] = []
			let VotingMenu: string[] = []
			let GuardsMenu: string[] = []
			let  SearchMenu: string[] = []
			let DownloaderMenu: string[] = []
			let OwnerMenu: string[] = []
			let OwnerNoPrefMenu: string[] = []
			let BeritaMenu: string[] = []
			for (let menu of  OwnerNoPref) {
				menu.map((value) => OwnerNoPrefMenu.push(value))
			}
			for (let menu of Owner) {
				menu.map((value) => OwnerMenu.push(value))
			} 
			for (let menu of User) {
				menu.map((value) => UserMenu.push(value))
			}
			for (let menu of Converter) {
				menu.map((value) =>  ConverterMenu.push(value))
			}
			for (let menu of Storage) {
				menu.map((value) =>  StorageMenu.push(value))
			}
			for (let menu of Stalker) {
				menu.map((value) => StalkerMenu.push(value))
			}
			for (let menu of Group) {
				menu.map((value) => GroupMenu.push(value))
			}
			for (let menu of GroupMem) {
				menu.map((value) => GroupMemMenu.push(value))
			}
			for (let menu of Musik) {
				menu.map((value) => MusikMenu.push(value))
			}
			for (let menu of Voting) {
				menu.map((value) => VotingMenu.push(value))
			}
			for (let menu of Guards) {
				menu.map((value) => GuardsMenu.push(value))
			}
			for (let menu of Search) {
				menu.map((value) => SearchMenu.push(value))
			}
			for (let menu of Downloader) {
				menu.map((value) => DownloaderMenu.push(value))
			}
			for (let menu of Berita) {
				menu.map((value) => BeritaMenu.push(value))
			}
            let informasi: string = `
👋🏻 Halo ${isOwner ? 'My Owner 🤴🏻' : 'ka'} ${Ucapan()}


*🤴🏻 Bot :* ${process.env.bot}
*⏰ Jam* : ${Jam}
*⏳ Runtime* : ${Runtime(process.uptime())}
*🍃 Speed* : ${Ping}
*🪀 Creator* : @33753045534 ( *Ra* )
*🌄 Lib* : Baileys
*🗄️ Database* : MongoDB
*♦️ Hit User* : ${await this.database.getHIT(sender || '')}
*📜 Language :* Typescript
*⚔️ Prefix :* ${Prefix}
*🔑 Apikey* : 𝐍𝐨𝐭 𝐅𝐨𝐮𝐧𝐝\n\n`

informasi += '\n         *MENU OWNER*\n\n'
for (let result of OwnerMenu.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix + result + '*\n'
}
for (let result of OwnerNoPrefMenu.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + result + '*\n'
}
informasi += '\n         *MENU USER*\n\n'
for (let result of UserMenu.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix + result + '*\n'
}
informasi += '\n         *MENU CONVERTER*\n\n'
for (let result of ConverterMenu.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix + result + '*\n'
}
informasi += '\n         *MENU MUSIK*\n\n'
for (let result of MusikMenu.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix + result + '*\n'
}
informasi += '\n         *MENU STORAGE*\n\n'
for (let result of StorageMenu.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix + result + '*\n'
}
informasi += "\n         *MENU SEARCH*\n\n"
for (let result of SearchMenu.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix + result + '*\n'
}
informasi += "\n         *MENU DOWNLOADER*\n\n"
for (let result of DownloaderMenu.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix + result + '*\n'
}
informasi += '\n         *MENU STALK*\n\n'
for (let result of StalkerMenu.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix + result + '*\n'
}
informasi += '\n         *MENU ADMIN GROUP*\n\n'
for (let result of GroupMenu.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix + result + '*\n'
}
informasi += '\n         *MENU GROUP*\n\n'
for (let result of GroupMemMenu.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix + result + '*\n'
}
informasi +=  '\n         *GROUP GUARD*\n\n'
for (let result of GuardsMenu.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix + result + '*\n'
}
informasi += '\n         *VOTING*\n\n'
for (let result of VotingMenu.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix + result + '*\n'
}
informasi += "\n         *BERITA*\n\n"
for (let result of BeritaMenu.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix + result + '*\n'
}
informasi += `\n\n__________________________________
*Notes :*
*- Jangan Pernah Menelpon Bot Dan Owner Jika Menelpon Akan di block Otomatis dan TIdak ada Kata Unblock ‼️*
*- Jika Menemukan Bug, Error, Saran Fitur Harap Segera Lapor Ke Owner*
*- Bot Ini masih dalam Tahap pengembangan baru bikin:v*
*- Prefix bisa di set sesuai keinginan sendiri*
*- Bot Ini Dilengkapi Anti Spam, anda bisa menggunakan command berikutnya setelah prosess sebelumnya berakhir*

*Group : Coming soon*
__________________________________
*🔖 || IG*
@rayyreall`
            const Thumb: Buffer = await compressImage(fs.readFileSync('./lib/storage/polosan/thumb.png'))
            const Buttons = {
                contentText: informasi,
                footerText: '🔖 @Powered by Ra',
                buttons: [
                    {
                        buttonId: 'gas owner',
                        buttonText: { displayText: '𝗢𝗪𝗡𝗘𝗥 / 𝗖𝗥𝗘𝗔𝗧𝗢𝗥' },
                        type: 1
                    },
                    {
                        buttonId: 'keluarkan sc',
                        buttonText: { displayText: '𝗦𝗖𝗥𝗜𝗣𝗧 𝗕𝗢𝗧' },
                        type: 1
                    },
                    {
                        buttonId: 's2k bot Ra',
                        buttonText: { displayText: '𝗦𝗬𝗔𝗥𝗔𝗧 & 𝗞𝗘𝗧𝗘𝗡𝗧𝗨𝗔𝗡' },
                        type: 1
                    }
                ],
                headerType: 4,
                imageMessage: await (await res.prepareMessageMedia(fs.readFileSync('./lib/storage/polosan/thumb.png'), MessageType.image,{ thumbnail: await compressImage(fs.readFileSync('./lib/storage/polosan/thumb.png')).toString()})).imageMessage
            } as proto.ButtonsMessage
            let response: proto.WebMessageInfo | any = await res.prepareMessage(from, Buttons, MessageType.buttonsMessage, { thumbnail: await compressImage(fs.readFileSync('./lib/storage/polosan/thumb.png')).toString(), contextInfo: { mentionedJid: ['33753045534@s.whatsapp.net', sender || '']}})
            if (response.message?.ephemeralMessage) {
                response.message.ephemeralMessage.message.buttonsMessage.imageMessage.jpegThumbnail = Thumb
            } else {
                response.message.buttonsMessage.imageMessage.jpegThumbnail = Thumb
            }
            return void (await res.relayWAMessage(response))
        })
    }
}
