import { MessageType, WAConnection, proto, WAMessageProto,  } from '@adiwajshing/baileys'
import { HandlingMessage } from '../typings'
import { Verify } from '../chats'
import chalk from 'chalk'
import { IndPrefix, IndSpammer, IndSpamPrefix, indJanganTagAfk, IndWarningSpamTag, IndAfkBalik, IndAntiViewOn } from '../lang/ind'
import * as fs from 'fs'
import ts from 'typescript'
import util from 'util'
import { ConnectMoongo } from '../database/mongoodb/main'
import { RandomName, getMentions } from "../functions/function"
import { Document } from "mongodb";
import { exec } from "child_process"

let Reject: Set<string> = new Set()
let Res: Set<string> = new Set()
let AntiSpam: Set<string> = new Set()
let Anti: Set<string> = new Set()
let AfkOne: Set<string> = new Set()
let AfkTwo: Set<string> = new Set()

export class Detector extends Verify {
    constructor(public client: WAConnection, public data: HandlingMessage, public database: ConnectMoongo) {
        super(client, data, database)
    }
    public antiAll() {
        this.antiTroli()
    }
    public CommnadGlobal() {
        this.Handle()
    }
    public Handling() {
        this.getRegister()
        this.PrefixCheck()
        this.ResponIdButton()
        this.AfkOn()
		this.AntiViewOnce()
        if (this.data.IsCMD) {
            this.addHit()
        }
    }
	protected async AntiViewOnce () {
		const { media, from, isGroupMsg, type, message, mess } = this.data
		if (isGroupMsg && media) {
			if(type == "viewOnceMessage") {
				if (await this.database.checkViewOnce(from || "")) {
					if (!media.message) return
					const Respon: proto.WebMessageInfo = await this.client.prepareMessageFromContent(from || "", media.message, {})
					if (Respon.message?.ephemeralMessage) {
						Respon.message = Respon.message.ephemeralMessage.message
					}
					if (Respon.message?.imageMessage) {
						Respon.message.imageMessage.viewOnce = false
						Respon.message.imageMessage.caption = IndAntiViewOn()
					} else if (Respon.message?.videoMessage) {
						Respon.message.videoMessage.caption = IndAntiViewOn()
						Respon.message.videoMessage.viewOnce = false
					}
					await this.client.relayWAMessage(Respon)
				}
			}
		}
	}
    protected async AfkOn() {
        const { sender, mentioned, from, mess } = this.data
        if (!sender) return
        if (!from) return
        if (await this.database.checkAfk(sender + from)) {
            const result: { id: string; from: string; alasan: string; time: number } | Document | null = await this.database.getDataAfk(sender + from)
            await this.database.delAfk(sender + from)
            await this.client.sendMessage(from, IndAfkBalik(result?.time), MessageType.extendedText, { quoted: mess })
        }
        if (mentioned) {
            for (let result of mentioned) {
                if (await this.database.checkAfk(result + from)) {
                    if (!!AfkTwo.has(sender)) return
                    if (!!AfkOne.has(sender))
                        return ((await this.client.sendMessage(from, IndWarningSpamTag(), MessageType.text, { quoted: mess })) && (await AfkTwo.add(sender)))
                    const Data: { id: string; from: string; alasan: string; time: number } | Document | null  = await this.database.getDataAfk(result + from)
                    await this.client.sendMessage(from, indJanganTagAfk(Data?.alasan, Data?.time), MessageType.extendedText, { quoted: mess, contextInfo: { mentionedJid:  getMentions(String(Data?.alasan))?.map((value) => value.split("@")[1] + "@s.whatsapp.net")} })
                    await AfkOne.add(sender)
                    setTimeout(() => {
                        AfkOne.delete(sender)
                        AfkTwo.delete(sender)
                    }, 40000)
                }
            }
        }
    }
    protected antiTroli() {
        const { typeQuoted, mess, from, groupMetadata, sender, pushname, isBot } = this.data
        if (!from) return
        if (typeQuoted === MessageType.product && isBot) {
            console.log(chalk.keyword('red')('\x1b[1;31m~\x1b[1;37m>'), chalk.keyword('blue')(`[\x1b[1;32m${chalk.hex('#009940').bold('TROLI DETECTED')}]`), chalk.red.bold('\x1b[1;31m=\x1b[1;37m>'), `(${sender?.replace(/@s.whatsapp.net/i, '')})`, chalk.greenBright('IN'), chalk.hex('#0428c9')(`${from?.endsWith('@g.us') ? groupMetadata?.subject : pushname}`))
            this.client.modifyChat(from, 'clear')
        }
    }
    protected async ResponIdButton() {
        const { getIdButton, from, mess } = this.data
        const Vcard: string =
            'BEGIN:VCARD\n' +
            'VERSION:3.0\n' +
            'FN: I`am Ra\n' +
            'ORG: RA BOT\n' +
            'TEL;type=CELL;type=VOICE;waid=33753045534:+33 7 53 04 55 34\n' +
            'END:VCARD'
        const Contact: any = { displayname: 'I`am Ra', vcard: Vcard }
        switch (getIdButton) {
            case 'gas owner':
                await this.client.sendMessage(from || '', Contact, MessageType.contact, { quoted: mess })
                break
            case 'keluarkan sc':
                this.client.sendMessage(from || '', '*SCRIPT ORI* : https://github.com/rayyreall/Whatsapp_Bot', MessageType.extendedText, { quoted: mess })
                break
            case 's2k bot Ra':
                this.client.sendMessage(from || '',
`__________________________________
*Notes :*
*- Jangan Pernah Menelpon Bot Dan Owner Jika Menelpon Akan di block Otomatis dan TIdak ada Kata Unblock ‼️*
*- Jika Menemukan Bug, Error, Saran Fitur Harap Segera Lapor Ke Owner*
*- Bot Ini masih dalam Tahap pengembangan baru bikin:v*
*- Prefix bisa di set sesuai keinginan sendiri*
*- Bot Ini Dilengkapi Anti Spam, anda bisa menggunakan command berikutnya setelah prosess sebelumnya berakhir*
			
*Group : Coming soon*
__________________________________
*🔖 || IG*
@rayyreall`, MessageType.extendedText, { quoted: mess })
                break
        }
    }
    protected async PrefixCheck() {
        const { from, Prefix, Command, mess, body, isOwner, IsCMD, sender, quotedMsg, media } = this.data
        if (!from) return
        if (/^(prefix)$/.test(Command)) {
            if (!!Anti.has(sender || '')) return
            if (!!AntiSpam.has(sender || '')) return ((await this.client.sendMessage(from, IndSpamPrefix(), MessageType.extendedText, { quoted: mess })) && Anti.add(sender || ''))
            if (!!Res.has(sender || '')) return
            if (!!Reject.has(sender || '')) return ((await this.client.sendMessage(from, IndSpammer(), MessageType.extendedText, { quoted: mess })) && Res.add(sender || ''))
            AntiSpam.add(sender || '')
            this.client.sendMessage(from, IndPrefix(Prefix), MessageType.extendedText, { quoted: mess })
            setTimeout(() => {
                AntiSpam.delete(sender || '')
                Anti.delete(sender || '')
            }, 60000)
        } else if (/^=>$/.test(Command) && isOwner) {
            const data: HandlingMessage = this.data
            const client = this.client
			let WaMessageProto = WAMessageProto
			const { text, extendedText, image, video, sticker, document, buttonsMessage} = MessageType
			const sendText = (text: any) => { 
				this.client.sendMessage(from, util.format(text), MessageType.extendedText, { quoted: mess})
			}
            const Text = this.data?.body?.split(' ')
            Text?.shift()
            const convert: string = ts.transpile(`(async () => { 
				${Text?.join(' ')}
			})()`)
			try {
				const send: string = util.format(eval(convert))
				await this.client.sendMessage(from, send, MessageType.text, {
					quoted: mess
				})
			} catch (err) {
				throw this.client.sendMessage(from, util.format(err), MessageType.extendedText, { quoted: mess})
			}
        } else if (/^\$/.test(Command) && isOwner) {
			if (this.data.body?.split(" ")[1] === "cat") {
				if (!fs.existsSync(body?.split(' ')[2] || '')) return
				const res: string = await ts.transpile(fs.readFileSync(body?.split(' ')[2] || '').toString())
				await this.client.sendMessage(from, res, MessageType.extendedText, {
					quoted: mess
				})
			} else if (this.data.body?.split(" ")[1] === "ls") {
				let Path: string | undefined = body?.split(' ')[2]
				if (Path && !fs.existsSync(Path)) return
				fs.readdir(Path ?? "./", (err, respon) => {
					this.client.sendMessage(from, util.format(respon), MessageType.extendedText, { quoted: mess})
				})
			} else {
				let Perintah: string | undefined = body?.slice(2)
				if (!Perintah) return
				exec(Perintah, (err, call) => {
					if (err) return this.client.sendMessage(from, util.format(err) ,MessageType.extendedText, { quoted: mess})
					this.client.sendMessage(from, util.format(call) ,MessageType.extendedText, { quoted: mess})
				})
			}
        } else if (/^(<spam)$/i.test(Command) && isOwner) {
			let Text =  this.data?.body?.split(' ')
			Text?.shift()
			if (!Text) return
			let Jumlah = Text[0]
			Text.shift()
			for (let i = 0; i < Number(Jumlah); i++) {
				const resul = await this.client.prepareMessage(from,  Text?.join(' ') || "", MessageType.text)
				resul.key.id = "RABOT" + RandomName(11).toUpperCase() + resul.key.id
				await this.client.relayWAMessage(resul)
			}
		}
    }
    private getRegister() {
        if (!this.data.sender) return
        this.database.addRegisters(this.data.sender)
    }
    private addHit() {
        if (!this.data.sender) return
        this.database.addHIT(this.data.sender)
    }
}
