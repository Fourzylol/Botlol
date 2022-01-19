import { proto } from "@adiwajshing/baileys-md";

export declare type TypesMedia = "imageMessage" | "videoMessage"| "audioMessage"| "documentMessage" | "stickerMessage";

export declare type ParsedType = "image" | "video" | "audio" | "document" | "sticker";


export declare type TypesFile = "document" |	"image"| "video"| "audio" | "sticker";

export declare interface IMessages {
	from?: string | undefined | null;
	fromMe?: boolean | undefined | null;
	pushName?: string | null | undefined;
	message?: proto.IFutureProofMessage;
	id?: proto.IWebMessageInfo
	isGroupMsg?: boolean;
	type?: string;
	typeQuoted?: string;
	quotedMsg?: proto.IContextInfo | null | undefined;
	botNumber?: string;
	body?: string | null | undefined;
	buttonsID?: string | null | undefined;
	mentioned?: Array<string>;
	media?: IMedia;
	sender?: string | null;
	command?: string;
	args?: string[]
	ownerNumber?: `${number}@s.whatsapp.net`[];
	isOwner?: boolean;
	isMedia?: boolean;
	isGambar?: boolean;
	isVideo?: boolean;
	isAudio?: boolean;
	isSticker?: boolean;
	isQuotedSticker?: boolean;
	isQuotedImage?: boolean;
	isQuotedVideo?: boolean;
	isQuotedAudio?: boolean;
	isQuotedDokumen?: boolean;
	isQuotedStickerGif?: boolean | null | undefined;
	prefix?: string | RegExp | Array<string>;
	Prefix?: string;
	isPrefix?: boolean;
	mimetype?: string;
	parseMentions?: (text: string) => Promise<Array<string>>
	groupMetadata?: () => Promise < HandlerGroupMetadata>
}

export declare class IMedia  {
	type: TypesMedia;
	file: proto.IImageMessage | proto.IVideoMessage | proto.IAudioMessage | proto.IDocumentMessage | proto.IStickerMessage | proto.ImageMessage | proto.VideoMessage | proto.AudioMessage | proto.DocumentMessage | proto.StickerMessage;
	mimetype?: string
};
export declare interface HandlerGroupMetadata {
	groupMetadata: import("@adiwajshing/baileys-md").GroupMetadata;
	groupMember: import("@adiwajshing/baileys-md").GroupParticipant[];
	groupAdmins: string[];
	isGroupAdmins: boolean;
	isBotAdmins: boolean;
	ownerGroup: string | null | undefined;

}

export declare type MetadataFile = {
	caption?: string;
	quoted?: proto.IWebMessageInfo;
	jpegThumbnail?: string;
	gifPlayback?: boolean;
	ptt?: boolean;
	seconds?: number;
	mimetype?: string;
	fileName?: string;
	docs?: boolean;
	isMentions?: boolean
}