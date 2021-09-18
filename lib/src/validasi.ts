import { WAMessage, proto, WAContact, WAGroupMetadata, WAConnection } from '@adiwajshing/baileys'
import filesize from 'filesize'
import { ConnectMoongo } from '../database/mongoodb/main'
import { Validasi } from '../typings'

export class Validation {
    constructor(public client: WAConnection, public database: ConnectMoongo) {}
    public validator(chats: WAMessage | undefined): Validasi {
        const message: proto.IFutureProofMessage | undefined = chats?.message?.ephemeralMessage || chats
        const from: string | null | undefined = chats?.key.remoteJid
        const isGroupMsg: boolean | undefined = from?.endsWith('@g.us')
        const type: string = Object.keys(message?.message || '')[0]
        let quotedType: string[] | null = null
        if (type === 'extendedTextMessage' && message?.message?.extendedTextMessage ? message.message.extendedTextMessage.contextInfo ? message.message.extendedTextMessage.contextInfo.quotedMessage ? true : false : false : false) {
			quotedType = Object.keys(message?.message?.extendedTextMessage?.contextInfo?.quotedMessage || '')
        }
        const typeQuoted: string = type == 'extendedTextMessage' && message?.message?.extendedTextMessage ? Object.keys(message.message.extendedTextMessage.contextInfo ? message.message.extendedTextMessage.contextInfo.quotedMessage ? message.message.extendedTextMessage.contextInfo.quotedMessage : { mentionedText: 'RA BOT' } : { thumbnailMessage: 'I`am Ra' })[0] : type
        const quotedMsg: proto.IContextInfo | null | undefined = message?.message?.extendedTextMessage ? message.message.extendedTextMessage.contextInfo : message?.message?.imageMessage ? message.message.imageMessage.contextInfo : message?.message?.videoMessage ? message.message.videoMessage.contextInfo : message?.message?.audioMessage ? message.message.audioMessage.contextInfo : message?.message?.orderMessage ? message.message.orderMessage.contextInfo : message?.message?.buttonsMessage ? message.message.buttonsMessage.contextInfo : message?.message?.listMessage ? message.message.listMessage.contextInfo : message?.message?.locationMessage ? message.message.locationMessage.contextInfo : message?.message?.stickerMessage ? message.message.stickerMessage.contextInfo : null
        const bodyQuoted: string | null | undefined = typeQuoted === 'conversation' ? message?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation : typeQuoted === 'imageMessage' ? message?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage?.caption : typeQuoted === 'videoMessage' ? message?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage?.caption : message?.message?.buttonsResponseMessage ? message.message.buttonsResponseMessage.selectedDisplayText : typeQuoted == 'extendedTextMessage' ? message?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.extendedTextMessage?.text : ''
        const CommandButton: string | null | undefined = message?.message?.buttonsResponseMessage ? message.message.buttonsResponseMessage.selectedDisplayText : ''
        const getIdButton: string | null | undefined = message?.message?.buttonsResponseMessage ? message.message.buttonsResponseMessage.selectedButtonId : ''
        const body: string | null | undefined = message?.message?.conversation ? message.message.conversation : message?.message?.extendedTextMessage ? message.message.extendedTextMessage.text : message?.message?.imageMessage ? message.message.imageMessage.caption : message?.message?.videoMessage ? message.message.videoMessage.caption : message?.message?.buttonsResponseMessage ? message.message.buttonsResponseMessage.selectedDisplayText : message?.message?.viewOnceMessage?.message?.imageMessage?.caption ?? message?.message?.viewOnceMessage?.message?.videoMessage?.caption
        const Command: string = body?.toLowerCase().split(/ +/g)[0] || ''
		const media: WAMessage | null = message?.message?.imageMessage || message?.message?.videoMessage || message?.message?.documentMessage || message?.message?.stickerMessage ? message
		: message?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage || message?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage || message?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage || message?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.documentMessage ? JSON.parse(JSON.stringify(message).replace('quotedM', 'm')).message?.extendedTextMessage?.contextInfo
        : message?.message?.viewOnceMessage ? message.message.viewOnceMessage  : quotedMsg ? quotedMsg.quotedMessage?.viewOnceMessage ? {  stanzaId: quotedMsg.stanzaId, ...quotedMsg.quotedMessage?.viewOnceMessage } : quotedMsg.quotedMessage?.buttonsMessage ?  quotedMsg.quotedMessage.buttonsMessage.imageMessage ? { stanzaId: quotedMsg.stanzaId, message: { imageMessage: quotedMsg.quotedMessage.buttonsMessage.imageMessage }} : quotedMsg.quotedMessage.buttonsMessage.videoMessage ? { stanzaId: quotedMsg.stanzaId, message: { videoMessage:  quotedMsg.quotedMessage.buttonsMessage.videoMessage }} :  quotedMsg.quotedMessage.buttonsMessage.documentMessage ? { stanzaId: quotedMsg.stanzaId, message: { documentMessage:  quotedMsg.quotedMessage.buttonsMessage.documentMessage }} : null : null : message?.message?.buttonsMessage ? message.message.buttonsMessage.imageMessage ? { participant: chats?.participant, message: { imageMessage: message.message.buttonsMessage.imageMessage}} :  message.message.buttonsMessage.videoMessage ? { participant: chats?.participant, message: { videoMessage: message.message.buttonsMessage.videoMessage}} 
		: message.message.buttonsMessage.documentMessage ? { participant: chats?.participant, message: { documentMessage: message.message.buttonsMessage.videoMessage}} : null : null
        const mentioned: string[] | undefined[] = message?.message?.extendedTextMessage?.contextInfo?.mentionedJid && message.message.extendedTextMessage.contextInfo.mentionedJid.length > 0 ? message.message.extendedTextMessage.contextInfo.mentionedJid : message?.message?.extendedTextMessage?.contextInfo?.quotedMessage && message.message.extendedTextMessage.contextInfo.participant ? [message.message.extendedTextMessage.contextInfo.participant] : []
        const sender: string | null | undefined = chats?.key.fromMe ? this.client.user.jid : isGroupMsg ? chats?.participant : chats?.key.remoteJid
        const FileSha: string | null | undefined = message?.message?.imageMessage ? message.message.imageMessage.fileSha256?.toString() : message?.message?.videoMessage ? message.message.videoMessage.fileSha256?.toString() : message?.message?.stickerMessage ? message.message.stickerMessage.fileSha256?.toString() : quotedMsg ? quotedMsg.quotedMessage?.imageMessage ? quotedMsg.quotedMessage.imageMessage.fileSha256?.toString() : quotedMsg.quotedMessage?.videoMessage ? quotedMsg.quotedMessage.videoMessage.fileSha256?.toString() : quotedMsg.quotedMessage?.stickerMessage ? quotedMsg.quotedMessage.stickerMessage.fileSha256?.toString() : null : null
        const Filesize: number | Long | undefined | null = media ? media.message ? media.message.audioMessage ? media.message.audioMessage.fileLength : media.message.imageMessage ? media.message.imageMessage.fileLength : media.message.videoMessage ? media.message.videoMessage.fileLength : media.message.documentMessage ? media.message.documentMessage.fileLength : 0 : null : null
		const getBatas = (): { durasi: number | null, fileSize: { Length: number | null | Long, size: null | string}, type: string | null } => {
			const Format: { durasi: number | null, fileSize: { Length: number | null | Long, size: null | string}, type: string | null } = {
				durasi: null,
				fileSize: { 
					Length: null,
					size: null
				},
				type: null
			}
			if (typeQuoted === "audioMessage" || typeQuoted === "videoMessage" || typeQuoted === "stickerMessage") {
				let quoted: proto.IMessage | proto.AudioMessage | proto.VideoMessage | proto.StickerMessage | null | undefined = quotedMsg ? quotedMsg?.quotedMessage as proto.IMessage : message?.message as proto.IMessage
				if (!quoted) return Format
				quoted = quoted[typeQuoted] as proto.AudioMessage || proto.VideoMessage || proto.StickerMessage
				Format.durasi = quoted.seconds ?? null
				Format.fileSize.Length = Number(quoted.fileLength)
				Format.type = typeQuoted
				if (Format.fileSize.Length) Format.fileSize.size = filesize(Number(Format.fileSize.Length))
			}
			return Format
		}
        const Format: Validasi = {
            from,
            message,
            isGroupMsg,
            type,
            quotedType,
            typeQuoted,
            quotedMsg,
            bodyQuoted,
            bodyButton: CommandButton,
            body,
            media,
            sender,
            Filesize,
            FileSha,
            Command,
            mentioned,
            getIdButton,
			getBatas
        }
        return Format
    }
}
