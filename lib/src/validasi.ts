import { HandlerMsg } from "./handler";
import { Main  } from ".";
import { WAMessage, proto, WAContact, WAGroupMetadata, WAConnection } from '@adiwajshing/baileys';
import { Validasi } from "../typings";

export class Validation  {
	constructor(public client: WAConnection){
	}
	public validator (chats: WAMessage | undefined): Validasi {
		const message: proto.IFutureProofMessage | undefined = chats?.message?.ephemeralMessage || chats;
		const from: string | null | undefined = chats?.key.remoteJid;
		const isGroupMsg: boolean | undefined = from?.endsWith("@g.us");
		const type: string =  Object.keys(message?.message || "")[0];
		let quotedType: string[] | null = null
		if (type === "extendedTextMessage" && message?.message?.extendedTextMessage ? message.message.extendedTextMessage.contextInfo ? message.message.extendedTextMessage.contextInfo.quotedMessage ? true : false : false : false) { 
			quotedType = Object.keys(message?.message?.extendedTextMessage?.contextInfo?.quotedMessage || "")
		}
		const typeQuoted: string =  type == "extendedTextMessage" &&  message?.message?.extendedTextMessage ? Object.keys(message.message.extendedTextMessage.contextInfo ? message.message.extendedTextMessage.contextInfo.quotedMessage ? message.message.extendedTextMessage.contextInfo.quotedMessage : { mentionedText: "RA BOT", } : { thumbnailMessage: "I`am Ra", })[0] : type;
		const quotedMsg: proto.IContextInfo | null | undefined = message?.message?.extendedTextMessage ? message.message.extendedTextMessage.contextInfo : message?.message?.imageMessage ? message.message.imageMessage.contextInfo : message?.message?.videoMessage ? message.message.videoMessage.contextInfo : 
			message?.message?.audioMessage ? message.message.audioMessage.contextInfo : message?.message?.orderMessage ? message.message.orderMessage.contextInfo : message?.message?.buttonsMessage ? message.message.buttonsMessage.contextInfo : message?.message?.listMessage ? message.message.listMessage.contextInfo : message?.message?.locationMessage ? 
			message.message.locationMessage.contextInfo : message?.message?.stickerMessage ? message.message.stickerMessage.contextInfo : null;
		const bodyQuoted: string | null | undefined = typeQuoted === "conversation" ? message?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation : typeQuoted === "imageMessage" ? message?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage?.caption : typeQuoted === "videoMessage" ? message?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage?.caption : message?.message?.buttonsResponseMessage ? message.message.buttonsResponseMessage.selectedDisplayText : ""
		const CommandButton: string | null | undefined = message?.message?.buttonsResponseMessage ? message.message.buttonsResponseMessage.selectedDisplayText : ""
		const body: string | null | undefined = message?.message?.conversation ? message.message.conversation : message?.message?.extendedTextMessage ? message.message.extendedTextMessage.text : message?.message?.imageMessage ? message.message.imageMessage.caption : message?.message?.videoMessage ? message.message.videoMessage.caption : message?.message?.buttonsResponseMessage ? message.message.buttonsResponseMessage.selectedDisplayText : ""
		const media: WAMessage | null = message?.message?.imageMessage || message?.message?.videoMessage ? message : message?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage || message?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage || message?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage ?
		JSON.parse(JSON.stringify(message).replace('quotedM', 'm')).message?.extendedTextMessage?.contextInfo : null;
		const sender: string | null | undefined = chats?.key.fromMe ? this.client.user.jid : isGroupMsg ? chats?.participant : chats?.key.remoteJid;
		const Format: Validasi = {
			from, message, isGroupMsg, type, quotedType, typeQuoted, quotedMsg, bodyQuoted, bodyButton: CommandButton, body, media, sender
		}
		return Format
		}
}