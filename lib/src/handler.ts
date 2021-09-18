import { WAChatUpdate, WAMessage, WAGroupMetadata, WAContact, WAGroupParticipant, proto } from '@adiwajshing/baileys'
import { Validation } from './validasi'
import { Validasi, HandlingMessage } from '../typings'
import moment from 'moment-timezone';
import * as fs from "fs";
import { config } from 'dotenv';
import { isUrl, Buffer } from '../functions/function';
config({ path: './.env' })

export class HandlerMsg extends Validation {
    public async handling(chats: WAChatUpdate): Promise<HandlingMessage | undefined> {
        try {
            if (!chats.hasNewMessage) return
            const mess: WAMessage | undefined = chats.messages?.all()[0]
            if (mess?.key && mess.key.remoteJid === 'status@broadcast') return
            const { message, from, isGroupMsg, type, typeQuoted, body, sender, quotedMsg, media }: Validasi = this.validator(mess)
            const groupMetadata: WAGroupMetadata | null = isGroupMsg ? await this.client.groupMetadata(from || '') : null
            const contacts: string | WAContact | any = mess?.key.fromMe ? this.client.user.jid : this.client.contacts[sender || ''] || { notify: sender?.replace(/@.+/, '') }
            const content: string = JSON.stringify(message?.message)
            const pushname: string = mess?.key.fromMe ? this.client.user.name : contacts?.notify || contacts.vname || contacts.name || 'Tidak Terdeteksi'
            const fromMe: boolean | undefined | null = mess?.key ? mess.key.fromMe : false
            const isBot: boolean | undefined = mess?.key ? mess.key.id?.startsWith('3EB0') ? true : mess.key.id?.startsWith("RABOT") : false
            const botNumber: string = this.client.user.jid
            const bot: WAGroupParticipant | {} | undefined = isGroupMsg ? groupMetadata?.participants.find((v) => v.jid === this.client.user.jid) : {}
            const user: WAGroupParticipant | {} | undefined = isGroupMsg ? groupMetadata?.participants.find((v) => v.jid === this.client.user.jid) : {}
            const ownerNumber: string[] = [String(process.env.ownerNumber), botNumber]
            const sendOwner: string = ownerNumber[0]
            const isOwner: boolean = ownerNumber.includes(sender || '')
            const groupMember: WAGroupParticipant[] | null | undefined = isGroupMsg ? groupMetadata?.participants : null
            const groupAdmins: string[] = isGroupMsg ? groupMember !== null ? groupMember?.filter((value) => value.isAdmin == true) ? groupMember.filter((value) => value.isAdmin == true).map((value) => value.jid) : [] : [] : []
            const isGroupAdmins: boolean = isGroupMsg ? groupAdmins.includes(sender || '') : false
            const isBotAdmins: boolean = isGroupMsg ? groupAdmins.includes(botNumber) : false
            const ownerGroup: string | null | undefined = isGroupMsg ? groupMetadata?.owner : null
            const isMedia: boolean = type === 'imageMessage' || type === 'videoMessage'
            const isGambar: boolean = type === 'imageMessage'
            const isVideo: boolean = type === 'videoMessage'
            const isAudio: boolean = type === 'audioMessage'
            const isSticker: boolean = type === 'stickerMessage'
            const Jam: string = moment(new Date()).format('LLLL')
            const command: string = body?.toLowerCase().split(/ +/g)[0] || ''
            const Prefix: string = await this.database.GetPrefix(sender || '', command)
            const IsCMD: boolean = command.startsWith(Prefix)
            const isQuotedSticker: boolean = typeQuoted === 'stickerMessage'
            const isQuotedImage: boolean = typeQuoted ===  'imageMessage'
            const isQuotedVideo: boolean = typeQuoted === "videoMessage"
            const isQuotedAudio: boolean = typeQuoted === 'audioMessage'
            const isQuotedDokumen: boolean = typeQuoted === 'documentMessage'
			const getQuotedMsg = async (id?: string): Promise <proto.WebMessageInfo> => {
				let respon: proto.WebMessageInfo = await this.client.loadMessage(from as string, id ?? quotedMsg?.stanzaId as string)
				return respon
			}
			const SearchMessage = async (text: string, jumlah?: number): Promise<{ last: boolean, messages: proto.WebMessageInfo[]}> => {
				let respon: { last: boolean, messages: proto.WebMessageInfo[]} = await this.client.searchMessages(text, from as string, jumlah ?? 25, 1)
				return respon
			}
			const ToBuffer = async (getTxt?: string): Promise <Buffer> => {
				if (media) {
					let respon: Buffer = await this.client.downloadMediaMessage(media as proto.WebMessageInfo)
					return respon
				} else if (isUrl(String(getTxt))) {
					let respon: Buffer = await Buffer(String(getTxt))
					return respon
				} else {
					let respon: Buffer =  fs.readFileSync(String(getTxt))
					return respon
				} 
			}
            const Format: HandlingMessage = {
                ...this.validator(mess),
                mess,
                bot,
                user,
                groupMetadata,
                pushname,
                botNumber,
                isBot,
                fromMe,
                isOwner,
                sendOwner,
                Jam,
                Prefix,
                groupAdmins,
                groupMember,
                isGroupAdmins,
                isBotAdmins,
                ownerGroup,
                IsCMD,
                isMedia,
                isGambar,
                isVideo,
                isAudio,
                isSticker,
                isQuotedSticker,
                isQuotedImage,
                isQuotedVideo,
                isQuotedAudio,
                isQuotedDokumen,
				getQuotedMsg,
				SearchMessage,
				ToBuffer
            }
            return Format
        } catch (err: unknown | any) {
            if (`${err}`.match(/this.isZero/gi)) return
            console.log(err)
        }
    }
}
