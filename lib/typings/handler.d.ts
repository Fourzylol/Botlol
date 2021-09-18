import { Validasi } from '.'
import { proto, WAMessage, WAGroupMetadata, WAGroupParticipant } from '@adiwajshing/baileys'

export interface HandlingMessage {
    from: string | null | undefined
    message: proto.IFutureProofMessage | undefined
    isGroupMsg: boolean | undefined
    type: string
    quotedType: string[] | null
    typeQuoted: string
    quotedMsg: proto.IContextInfo | null | undefined
    bodyQuoted: string | null | undefined
    bodyButton: string | null | undefined
    body: string | null | undefined
    media: WAMessage | null
    sender: string | null | undefined
    mess: proto.WebMessageInfo | undefined
    getIdButton: string | null | undefined
    FileSha: string | null | undefined
    mentioned: string[] | undefined
    groupMetadata: WAGroupMetadata | null
    botNumber: string
    isBot: boolean | undefined
    fromMe: boolean | undefined | null
    isOwner: boolean
    sendOwner: string
    Command: string
    Jam: string
    Prefix: string
    groupAdmins: string[]
    groupMember: WAGroupParticipant[] | null | undefined
    isGroupAdmins: boolean
    ownerGroup: string | null | undefined
    isBotAdmins: boolean
    IsCMD: boolean
    pushname: string
    bot: any
    user: any
    isMedia: boolean
    isGambar: boolean
    isVideo: boolean
    isAudio: boolean
    isQuotedSticker: boolean
    isSticker: boolean
    isQuotedImage: boolean
    isQuotedVideo: boolean
    isQuotedAudio: boolean
    isQuotedDokumen: boolean
	getQuotedMsg: (id?: string | undefined) => Promise <proto.WebMessageInfo>
	SearchMessage: (text: string, jumlah?: number) => Promise <{ last: boolean, messages: proto.WebMessageInfo[]}>
	ToBuffer: () => Promise <Buffer>
	getBatas: () => { durasi: number | null, fileSize: { Length: number | null | Long, size: null | string}, type: string | null }
}
export declare class Commands {
    args: string[]
    _args: string[]
    text: string
    command: string
    _text: string
    match: any
    from: string
    message: proto.IFutureProofMessage | undefined
    isGroupMsg: boolean
    type: string
    quotedType: string[] | null
    typeQuoted: string
    quotedMsg: proto.IContextInfo | null | undefined
    bodyQuoted: string | null | undefined
    bodyButton: string | null | undefined
    body: string | null | undefined
    media: WAMessage | null
    sender: string | null | undefined
    Filesize: number | null
    FileSha: string | null
    mentioned: string[] | undefined
    groupAdmins: string[]
    groupMember: WAGroupParticipant[] | null | undefined
    Command: string
    mess: proto.WebMessageInfo | undefined
    getIdButton: string | null | undefined
    bot: isBOT
    user: isUser
    groupMetadata: WAGroupMetadata | null
    botNumber: string
    isGroupAdmins: boolean
    isBotAdmins: boolean
    isBot: boolean | undefined
    fromMe: boolean | undefined | null
    isOwner: boolean
    sendOwner: string
    ownerGroup: string | null | undefined
    pushname: string
    Jam: string
    Prefix: string
    IsCMD: boolean
    isSticker: boolean
    isMedia: boolean
    isGambar: boolean
    isVideo: boolean
    isAudio: boolean
    isQuotedSticker: boolean
    isQuotedImage: boolean
    isQuotedVideo: boolean
    isQuotedAudio: boolean
    isQuotedDokumen: boolean
	getQuotedMsg: (id?: string | undefined) => Promise <proto.WebMessageInfo>
	SearchMessage: (text: string, jumlah?: number) => Promise <{ last: boolean, messages: proto.WebMessageInfo[]}>
	ToBuffer: () => Promise <Buffer>
	getBatas: () => { durasi: number | null, fileSize: { Length: number | null | Long, size: null | string}, type: string | null }
}

interface isBOT {
    jid: string
    id: string
    isAdmin: boolean
    isSuperAdmin: boolean
}
interface isUser {
    jid: string
    id: string
    isAdmin: boolean
    isSuperAdmin: boolean
}
