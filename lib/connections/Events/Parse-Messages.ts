import { proto, WASocket, GroupMetadata, GroupParticipant } from "@adiwajshing/baileys-md";
import type  { Messages } from "../../types";
import { checkPrefix } from "../../functions/functions";

export function ChatUpdate (mess: proto.IWebMessageInfo, client: WASocket, config: { parsed?: boolean} = { parsed: true}): Messages.IMessages {
	var chats: Messages.IMessages = {};
	const mediaType: Array<Messages.TypesMedia> = ["imageMessage", "videoMessage", "audioMessage", "documentMessage", "stickerMessage"]
	const messageType: Array<keyof proto.IMessage> = ["conversation", ...mediaType, "contactMessage",  "extendedTextMessage", "contactsArrayMessage", "liveLocationMessage", "templateMessage", "stickerMessage",
"groupInviteMessage", "templateButtonReplyMessage", "productMessage", "listMessage", "viewOnceMessage", "orderMessage", "listResponseMessage", "buttonsMessage", "buttonsResponseMessage", "interactiveMessage",
"reactionMessage", "stickerSyncRmrMessage"];
	chats.from = mess.key.remoteJid;
	chats.fromMe = mess.key.fromMe;
	chats.pushName = mess.pushName;
	chats.message = mess.message?.ephemeralMessage || mess;
	chats.id = mess;
	chats.isGroupMsg = chats.from?.endsWith("@g.us") as boolean;
	chats.type = Object.keys(chats.message.message || {}).filter((value) => messageType.includes(String(value) as keyof proto.IMessage))[0] as keyof proto.IMessage
	chats.botNumber = (client?.user?.id?.split(":"))?.[0] + "@s.whatsapp.net";
	if (chats.type && chats.type !== "conversation") chats.quotedMsg = (chats?.message?.message as proto.IMessage | any)?.[chats.type]?.contextInfo as proto.IContextInfo;
	if (chats.quotedMsg) chats.typeQuoted = Object.keys(chats.quotedMsg.quotedMessage || {})[0] as keyof proto.IMessage;
	if (["conversation", "extendedTextMessage"].includes(chats.type)) chats.body = chats.message.message?.conversation || chats.message.message?.extendedTextMessage?.text
	if (["imageMessage", "videoMessage"].includes(chats.type)) chats.body = (chats.message.message)?.[(chats.type as "videoMessage" | "imageMessage")]?.caption;
	if (chats.type === "buttonsMessage") chats.body = chats.message.message?.buttonsMessage?.text;
	if (["buttonsResponseMessage", "templateButtonReplyMessage"].includes(chats.type)) chats.body = (chats.message.message)?.[chats.type as "buttonsResponseMessage" | "templateButtonReplyMessage"]?.selectedDisplayText;
	if (chats.type === "listMessage") chats.body = chats.message.message?.listResponseMessage?.title;
	if (chats.type === "locationMessage") chats.body = chats.message.message?.liveLocationMessage?.caption
	chats.buttonsID = chats.message.message?.buttonsResponseMessage?.selectedButtonId || chats.message.message?.templateButtonReplyMessage?.selectedId;
	chats.mentioned = chats.message.message?.extendedTextMessage?.contextInfo?.mentionedJid && chats.message.message.extendedTextMessage.contextInfo.mentionedJid.length > 0 ? chats.message.message.extendedTextMessage.contextInfo.mentionedJid : chats.message?.message?.extendedTextMessage?.contextInfo?.quotedMessage && chats.message.message.extendedTextMessage.contextInfo.participant ? [chats.message.message.extendedTextMessage.contextInfo.participant] : [];
	if (chats.type === "viewOnceMessage" && ["imageMessage", "videoMessage"].includes(Object.keys(chats.message.message?.viewOnceMessage?.message || {})[0])) chats.body = (chats.message.message?.viewOnceMessage?.message as proto.IMessage)?.[Object.keys(chats.message.message?.viewOnceMessage?.message || {})[0] as "imageMessage" | "videoMessage"]?.caption;
	if (chats.quotedMsg && ["conversation", "extendedTextMessage"].includes(chats.typeQuoted as string)) chats.quotedBody = chats.quotedMsg.quotedMessage?.conversation || chats.quotedMsg.quotedMessage?.extendedTextMessage?.text;
	if (chats.quotedMsg && ["imageMessage", "videoMessage"].includes(chats.typeQuoted as string)) chats.quotedBody =  (chats.quotedMsg.quotedMessage)?.[(chats.typeQuoted as "videoMessage" | "imageMessage")]?.caption;
	if (chats.quotedMsg && chats.typeQuoted === "buttonsMessage") chats.quotedBody = chats.quotedMsg.quotedMessage?.buttonsMessage?.text;
	if (chats.quotedMsg && (["buttonsResponseMessage", "templateButtonReplyMessage"].includes(chats.typeQuoted as string)))  chats.quotedBody =  (chats.quotedMsg.quotedMessage)?.[chats.typeQuoted as "buttonsResponseMessage" | "templateButtonReplyMessage"]?.selectedDisplayText;
	if (chats.quotedMsg &&  chats.typeQuoted === "listMessage") chats.quotedBody = chats.quotedMsg.quotedMessage?.listResponseMessage?.title;
	if (chats.quotedMsg && chats.typeQuoted === "locationMessage") chats.quotedBody =  chats.quotedMsg.quotedMessage?.liveLocationMessage?.caption;
	if (chats.quotedMsg && chats.typeQuoted === "viewOnceMessage" && ["imageMessage", "videoMessage"].includes(Object.keys(chats.quotedMsg.quotedMessage?.viewOnceMessage?.message || {})[0])) chats.quotedBody = (chats.quotedMsg.quotedMessage?.viewOnceMessage?.message as proto.IMessage)?.[Object.keys(chats.quotedMsg.quotedMessage?.viewOnceMessage?.message || {})[0] as "imageMessage" | "videoMessage"]?.caption;
	if (mediaType.find((values) => chats.typeQuoted === values)) chats.media = {
		type: (mediaType.find((values) => chats.typeQuoted === values) as Messages.TypesMedia).replace("Message", "") as Messages.TypesMedia,
		file: (chats.quotedMsg?.quotedMessage as proto.IMessage)?.[chats.typeQuoted as Messages.TypesMedia] as proto.IImageMessage | proto.IVideoMessage | proto.IAudioMessage | proto.IDocumentMessage | proto.IStickerMessage,
		mimetype: ((chats.quotedMsg?.quotedMessage as proto.IMessage)?.[chats.typeQuoted as Messages.TypesMedia] as proto.IImageMessage | proto.IVideoMessage | proto.IAudioMessage | proto.IDocumentMessage | proto.IStickerMessage).mimetype?.split("/")[1]
	}
	if (mediaType.find((values) => chats.type == values)) chats.media = {
		type: (mediaType.find((values) => chats.type === values) as Messages.TypesMedia).replace("Message", "") as Messages.TypesMedia,
		file: (chats.message.message as proto.IMessage)?.[chats.type as Messages.TypesMedia] as proto.IImageMessage | proto.IVideoMessage | proto.IAudioMessage | proto.IDocumentMessage | proto.IStickerMessage,
		mimetype:  ((chats.message.message as proto.IMessage)?.[chats.type as Messages.TypesMedia] as proto.IImageMessage | proto.IVideoMessage | proto.IAudioMessage | proto.IDocumentMessage | proto.IStickerMessage).mimetype?.split("/")[1]
	}
	chats.sender = mess.key.fromMe ? client?.user?.id : chats.isGroupMsg ? mess.key.participant : mess.key.remoteJid;
	if (chats.sender) chats.sender = `${(chats.sender.match(/([\d+\-])/gi) as RegExpMatchArray).join("")}@s.whatsapp.net`;
	if (chats.from) chats.from = `${chats.isGroupMsg ? chats.from : chats.sender}`;
	let [command, ...args]: string[] = chats.body ? chats.body.split(" ") : [];
	chats.command = command?.toLowerCase();
	chats.args = args || [];
	chats.ownerNumber = ['33753045534@s.whatsapp.net', chats.botNumber as `${number}@s.whatsapp.net`];
	chats.isOwner = chats.ownerNumber.includes(chats.sender as `${number}@s.whatsapp.net`);
	chats.isMedia = chats.type === 'imageMessage' || chats.type === 'videoMessage' || chats.typeQuoted === "imageMessage" || chats.typeQuoted === "videoMessage";
	chats.isGambar = chats.type === "imageMessage";
	chats.isVideo = chats.type === "videoMessage";
	chats.isAudio = chats.type === "audioMessage";
	chats.isSticker = chats.type === "stickerMessage";
	chats.isQuotedSticker = chats.typeQuoted === "stickerMessage";
	chats.isQuotedImage = chats.typeQuoted === "imageMessage";
	chats.isQuotedVideo = chats.typeQuoted === "videoMessage";
	chats.isQuotedAudio = chats.typeQuoted === "audioMessage";
	chats.isQuotedDokumen = chats.typeQuoted === "documentMessage";
	if (chats.isGroupMsg) chats.groupMetadata = async () => {
		const groupMetadata: GroupMetadata =  await client.groupMetadata(chats.from as string);
		const groupMember: GroupParticipant[] = groupMetadata.participants;
		const groupAdmins: string[] = groupMember.filter((value) => value.isAdmin).map((values) => values.id);
		const isGroupAdmins: boolean = groupAdmins.includes(chats.sender as string);
		const isBotAdmins: boolean = groupAdmins.includes(chats.botNumber as string)
		const ownerGroup: string | null | undefined = groupMetadata.owner;
		return { groupMetadata, groupMember, groupAdmins, isGroupAdmins, isBotAdmins, ownerGroup } as  Messages.HandlerGroupMetadata
	}
	chats.parseMentions = async (text: string) => {
		let ParseText: string[] =  (String(text).match(/@(0|[0-9]{4,16})/g)?.map((values: string) => values.split("@")[1] + "@s.whatsapp.net")) || [];
		let checkData: string[] | undefined = (await (await client.groupMetadata(chats.from as string)).participants)?.map((values) => values.id) || [];
		let mentions: string[] = [];
		for (let result of ParseText) {
			checkData?.filter((value: string) => {
				if (value === result) mentions.push(result)
			})
		}
		return mentions
	}
	chats.Prefix = checkPrefix(globalThis.prefix, chats.command);
	if (chats.media?.type as Messages.ParsedType === "sticker") chats.isQuotedStickerGif = (chats.media?.file as proto.IStickerMessage).isAnimated;
	if (config?.parsed) {
		for (const Parse in chats) {
			if ((chats as Messages.IMessages)?.[Parse as Messages.KeyChats] === null || (chats as Messages.IMessages)[Parse as Messages.KeyChats] === undefined) {
				delete (chats as Messages.IMessages)[Parse as Messages.KeyChats]
			}
		}
		return chats
	} else {
		return chats
	}
}