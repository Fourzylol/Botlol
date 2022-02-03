import { proto } from "@adiwajshing/baileys-md";

export namespace Messages {
	export declare type TypesMedia = "imageMessage" | "videoMessage"| "audioMessage"| "documentMessage" | "stickerMessage";
	export declare type ParsedType = "image" | "video" | "audio" | "document" | "sticker";
	export declare type TypesFile = "document" |	"image"| "video"| "audio" | "sticker";
	export declare type KeyChats = keyof IMessages;
	export declare interface Messages {
		from: string;
		fromMe: boolean | undefined | null;
		pushName: string | null | undefined;
		message: proto.IFutureProofMessage;
		id: proto.IWebMessageInfo;
		isGroupMsg: boolean;
		type: keyof proto.IMessage;
		typeQuoted: keyof proto.IMessage;
		quotedMsg: proto.IContextInfo | null | undefined;
		botNumber: string;
		body: string | null | undefined;
		buttonsID: string | null | undefined;
		mentioned: Array<string>;
		media: IMedia;
		sender: string | null;
		command: string;
		args: string[];
		querry: string;
		ownerNumber: `${number}@s.whatsapp.net`[];
		quotedBody: string | null ;
		isOwner: boolean;
		isMedia: boolean;
		isGambar: boolean;
		isVideo: boolean;
		isAudio: boolean;
		isSticker: boolean;
		isQuotedSticker: boolean;
		isQuotedImage: boolean;
		isQuotedVideo: boolean;
		isQuotedAudio: boolean;
		isQuotedDokumen: boolean;
		isQuotedStickerGif: boolean | null | undefined;
		Prefix?:  PrefixCheck;
		mimetype: string;
		parseMentions: (text: string) => Promise<Array<string>>;
		groupMetadata: () => Promise < HandlerGroupMetadata>;
	}
	type PrefixCheck = ReturnType<typeof import("../functions/functions").checkPrefix>;
	export declare interface IMessages {
		from?: string;
		fromMe?: boolean | undefined | null;
		pushName?: string | null | undefined;
		message?: proto.IFutureProofMessage;
		id?: proto.IWebMessageInfo;
		isGroupMsg?: boolean;
		type?: keyof proto.IMessage;
		typeQuoted?: keyof proto.IMessage;
		quotedMsg?: proto.IContextInfo | null | undefined;
		botNumber?: string;
		body?: string | null | undefined;
		buttonsID?: string | null | undefined;
		mentioned?: Array<string>;
		media?: IMedia;
		sender?: string | null;
		command?: string;
		args?: string[];
		querry?: string;
		ownerNumber?: `${number}@s.whatsapp.net`[];
		quotedBody?: string | null ;
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
		Prefix?:  PrefixCheck;
		mimetype?: string;
		parseMentions?: (text: string) => Promise<Array<string>>;
		groupMetadata?: () => Promise < HandlerGroupMetadata>;
	}
	export declare class IMedia  {
		type: keyof proto.IMessage;
		file: proto.IImageMessage | proto.IVideoMessage | proto.IAudioMessage | proto.IDocumentMessage | proto.IStickerMessage | proto.ImageMessage | proto.VideoMessage | proto.AudioMessage | proto.DocumentMessage | proto.StickerMessage;
		mimetype?: string;
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
		isMentions?: boolean;
	}
	export declare type HistorysMessages = {
		id: string,
		sender: string,
		time: number,
		message: proto.IWebMessageInfo
	}
}