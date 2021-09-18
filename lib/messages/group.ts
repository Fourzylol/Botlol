import { MusicHandling } from '.'
import { Client } from '../src/Client'
import { WAConnection, MessageType, GroupSettingChange, WAGroupParticipant, WAPresenceData } from '@adiwajshing/baileys'
import { Commands } from '../typings'
import { ConnectMoongo } from '../database/mongoodb/main'
import { BotGaAdmin, BukanDalamGroup, UserDalamGroup, SuccesAdd, AddHarapTagSeseorang, UserGadaDalamGroup, isOwnerGroupNokick, kickSucces, Admindia, ButakahLinkGc, IndLinkGroup, PilihBukatutup, SuccesOpenCloseGc, TagOrReply, PromoteSuccess, PromoteDiaAdmin, DemoteSuccess, DemoteBukanAdmin, GagalUpdatePP, SuccesUpdatePP, SuccesSetName, SuccesSetDesk, IndListOn, IndGadaOn, IndTagall, IndRevoked, IndBukanSgif } from '../lang/ind'
import { HelpAddGroup, HelpLinkGroup, HelpRevoked, HelpGroupOT, HelpPromote, HelpDemote, HelpSetppGc, HelpSetNameGc, HelpSetBioGc  } from "../lang/help";
import { Toimg } from '../tools'
import { RandomName, Tunggu } from '../functions/function'
import * as fs from 'fs'

export class GroupData extends MusicHandling {
    constructor(public Ra: Client, public database: ConnectMoongo) {
        super(Ra, database)
    }
    public SendDataGc() {
        this.SendDataMusic()
        this.AddGroup()
        this.kickGroup()
        this.linkgroup()
        this.OpenCloseGc()
        this.Promote()
        this.Demote()
        this.setPPGc()
        this.setNameGc()
        this.setBioGc()
        this.Hidetag()
        this.ListOnline()
        this.Tagall()
        this.revokedLink()
    }
    protected AddGroup() {
		globalThis.CMD.on('admingc|add/masuk <tag/reply>',  { event: ["add <tag/reply>", "masuk <tag/reply>"], tag: "groupadmins"},['add', 'masuk'], async (res: WAConnection, data: Commands) => {
			const { isBotAdmins, from, isGroupAdmins, isGroupMsg, mess, mentioned, groupMember, isOwner, groupMetadata, args, Command } = data
			if (/^(?:-|--)(help)$/i.test(args[0])) return this.Ra.reply(from, HelpAddGroup, mess)
            if (!isOwner) return
			if (!isGroupMsg) return this.Ra.reply(from, BukanDalamGroup(Command), mess)
			if (!isGroupAdmins) return
            if (!isBotAdmins) return  this.Ra.reply(from, BotGaAdmin(Command), mess)
            if (mentioned && mentioned[0] !== undefined) {
				if (groupMember !== null ? groupMember?.map((value) => value.jid).includes(mentioned[0]) : true) return this.Ra.reply(from, UserDalamGroup(), mess)
				await res.groupAdd(from, [mentioned[0]])
				await this.Ra.reply(from, SuccesAdd(groupMetadata?.subject || ""), mess)
			} else {
				await this.Ra.reply(from, AddHarapTagSeseorang(), mess)
			}
		})
	}
    protected kickGroup() {
		globalThis.CMD.on('admingc|kick/sepak <tag/reply>',  { event: ["kick <tag/reply>", "sepak <tag/reply>"], tag: "groupadmins"},['kick', 'tendang', 'sepak'], async (res: WAConnection, data: Commands) => {
			const { isBotAdmins, from, isGroupAdmins, isGroupMsg, mess, mentioned, groupMember, isOwner, ownerGroup, sender, args, Command } = data
			if (/^(?:-|--)(help)$/i.test(args[0])) return this.Ra.reply(from, HelpAddGroup, mess)
            if (!isOwner) return
            if (!isGroupMsg) return this.Ra.reply(from, BukanDalamGroup(Command), mess)
            if (!isBotAdmins) return this.Ra.reply(from, BotGaAdmin(Command), mess)
            if (!isGroupAdmins) return
            if (groupMember !== null ? !groupMember?.map((value) => value.jid).includes(mentioned !== undefined ? mentioned[0] : ''): true) return this.Ra.reply(from, UserGadaDalamGroup(), mess)
            if (mentioned && mentioned[0] !== undefined) {
            if (mentioned[0] == ownerGroup) return this.Ra.reply(from, isOwnerGroupNokick(), mess)
            if (groupMember !== null ? groupMember?.filter((value) => value.isAdmin == true).map((value) => value.jid).includes(mentioned[0]) : (false && ownerGroup == sender) || isOwner) {
				await res.groupRemove(from, [mentioned[0]])
				await this.Ra.sendTextWithMentions(from, kickSucces(mentioned[0], sender || ""), mess)
			} else {
				await this.Ra.sendTextWithMentions(from, Admindia(mentioned[0]), mess)
			}
		} else {
			await this.Ra.reply(from, TagOrReply(), mess)
		}
	})
}
    protected linkgroup() {
        globalThis.CMD.on('admingc|linkgc',  { event: ["linkgroup"], tag: "groupadmins"}, ['linkgroup', 'linkgc', 'linkgrup'], async (res: WAConnection, data: Commands) => {
			const { isBotAdmins, from, isGroupAdmins, groupMetadata, mess, isGroupMsg, isOwner, args, Prefix, Command } = data
			if (/^(?:-|--)(help)$/i.test(args[0])) return this.Ra.reply(from, HelpLinkGroup(Prefix), mess)
            if (!isGroupMsg) return this.Ra.reply(from, BukanDalamGroup(Command), mess)
            if (!isBotAdmins) return this.Ra.reply(from, BotGaAdmin(Command), mess)
            let LinkGc: string | undefined = (await Object.keys(groupMetadata !== null ? groupMetadata : []).includes('desc')) ? groupMetadata?.desc : ''
			if (isGroupAdmins || isOwner) {
				if (groupMetadata == null) return
				this.Ra.reply(from, IndLinkGroup(groupMetadata, 'https://chat.whatsapp.com/' + (await res.groupInviteCode(from))), mess)
			} else if (LinkGc?.match('https://chat.whatsapp.com/' + (await res.groupInviteCode(from)))) {
				this.Ra.reply(from, ButakahLinkGc(), mess)
			}
		})
    }
    protected revokedLink() {
		globalThis.CMD.on('admingc|revoke',  { event: ["revoked"], tag: "groupadmins"},['revoke', 'revoked'], async (res: WAConnection, data: Commands) => {
			const { isGroupMsg, isBotAdmins, isGroupAdmins, isOwner, from, mess, groupMetadata, Command, args, Prefix } = data
			if (/^(?:-|--)(help)$/i.test(args[0])) return this.Ra.reply(from, HelpRevoked (Prefix), mess)
            if (!isGroupMsg) return this.Ra.reply(from, BukanDalamGroup(Command), mess)
            if (!isBotAdmins) return this.Ra.reply(from, BotGaAdmin(Command), mess)
            if (!isOwner && !isGroupAdmins) return
            await res.revokeInvite(from)
			if (!groupMetadata) return
            return void (await this.Ra.reply(from, IndRevoked(groupMetadata), mess))
        })
    }
    protected OpenCloseGc() {
		globalThis.CMD.on('admingc|group <open/close>',  { event: ["group <open/close>"], tag: "groupadmins"},['group', 'grup'], async (res: WAConnection, data: Commands) => {
			const { isBotAdmins, from, isGroupAdmins, mess, isGroupMsg, args, isOwner, groupMetadata, Command, Prefix } = data
			if (/^(?:-|--)(help)$/i.test(args[0])) return this.Ra.reply(from, HelpGroupOT(Prefix), mess)
            if (!isGroupMsg) return this.Ra.reply(from, BukanDalamGroup(Command), mess)
            if (!isBotAdmins) return this.Ra.reply(from, BotGaAdmin(Command), mess)
            if (!isOwner && !isGroupAdmins) return
            let BukaTutup: boolean | null = /^(open|buka)/i.test(args[0]) ? false : /^(close|tutup)/i.test(args[0]) ? true : null
            if (BukaTutup == null) return await this.Ra.reply(from, PilihBukatutup(Command), mess)
			if (!groupMetadata) return
            await res.groupSettingChange(from, GroupSettingChange.messageSend, BukaTutup)
            return void await this.Ra.reply(from, SuccesOpenCloseGc(BukaTutup, groupMetadata), mess)
		})
    }
    protected Promote() {
		globalThis.CMD.on('admingc|promote <tag/reply>',  { event: ["promote <tag/reply>"], tag: "groupadmins"},['promote', 'getadmin'], async (res: WAConnection, data: Commands) => {
			const { isBotAdmins, from, isGroupAdmins, mess, isGroupMsg, mentioned, isOwner, sender, groupMetadata, Command, args, Prefix } = data
			if (/^(?:-|--)(help)$/i.test(args[0])) return this.Ra.sendTextWithMentions(from, HelpPromote(Prefix), mess)
            if (!isGroupMsg) return this.Ra.reply(from, BukanDalamGroup(Command), mess)
            if (!isBotAdmins) return this.Ra.reply(from, BotGaAdmin(Command), mess)
            if (!isOwner && !isGroupAdmins) return
            if (mentioned && mentioned[0] == undefined && isOwner) {
				await res.groupMakeAdmin(from, [sender || ''])
            } else if (mentioned && mentioned[0] == undefined) {
				await this.Ra.reply(from, TagOrReply(), mess)
            } else if (!groupMetadata?.participants.filter((value) => value.isAdmin == true).map((value) => value.jid).includes(mentioned !== undefined ? mentioned[0] : '')) {
				await res.groupMakeAdmin(from, [mentioned !== undefined ? mentioned[0] : ''])
                await this.Ra.sendTextWithMentions(from, PromoteSuccess(mentioned !== undefined ? mentioned[0] : ''),mess)
            } else {
				await this.Ra.sendTextWithMentions(from, PromoteDiaAdmin(mentioned !== undefined ? mentioned[0] : ''), mess)
            }
		})
    }
    protected Demote() {
        globalThis.CMD.on('admingc|demote <tag/reply>',  { event: ["demote <tag/reply>"], tag: "groupadmins"},['demote'], async (res: WAConnection, data: Commands) => {
			const { isBotAdmins, from, isGroupAdmins, mess, isGroupMsg, mentioned, isOwner, sender, groupMetadata, Command, args, Prefix } = data
			if (/^(?:-|--)(help)$/i.test(args[0])) return this.Ra.sendTextWithMentions(from, HelpDemote(Prefix), mess)
            if (!isGroupMsg) return this.Ra.reply(from, BukanDalamGroup(Command), mess)
            if (!isBotAdmins) return this.Ra.reply(from, BotGaAdmin(Command), mess)
            if (!isOwner && !isGroupAdmins) return
            if (mentioned && mentioned[0] == undefined) {
				await this.Ra.reply(from, TagOrReply(), mess)
            } else if (groupMetadata?.participants.filter((value) => value.isAdmin == true).map((value) => value.jid).includes(mentioned !== undefined ? mentioned[0] : '')) {
                await res.groupDemoteAdmin(from, [mentioned !== undefined ? mentioned[0] : ''])
                await this.Ra.sendTextWithMentions(from, DemoteSuccess(mentioned !== undefined ? mentioned[0] : ''),mess)
            } else {
                await this.Ra.sendTextWithMentions(from, DemoteBukanAdmin(mentioned !== undefined ? mentioned[0] : ''), mess)
            }
        })
    }
    protected setPPGc() {
		globalThis.CMD.on('admingc|setppgc <img/sticker',  { event: ["setppgc"], tag: "groupadmins"},['setppgc', 'setppgroup'], async (res: WAConnection, data: Commands) => {
			const { isBotAdmins, from, isGroupAdmins, mess, isGroupMsg, media, isQuotedImage, isGambar, isQuotedSticker, isOwner, Command, args, Prefix } = data
			if (/^(?:-|--)(help)$/i.test(args[0])) return this.Ra.reply(from, HelpSetppGc(Prefix), mess)
            if (!isGroupMsg) return this.Ra.reply(from, BukanDalamGroup(Command), mess)
            if (!isBotAdmins) return this.Ra.reply(from, BotGaAdmin(Command), mess)
            if (!isOwner && !isGroupAdmins) return
            if (media == null) return
            if (isGambar || isQuotedImage) {
				await res.updateProfilePicture(from, await res.downloadMediaMessage(media))
                await this.Ra.reply(from, SuccesUpdatePP(), mess)
			} else if (isQuotedSticker) {
				if (media.message?.stickerMessage?.isAnimated) return this.Ra.reply(from, IndBukanSgif(), mess)
                const Input: string = await res.downloadAndSaveMediaMessage(media, './lib/storage/temp/' + RandomName(22))
                await Toimg(Input).then(async (value: string) => {
					await res.updateProfilePicture(from, fs.readFileSync(value))
					await Tunggu(2000)
					if (fs.existsSync(value)) fs.unlinkSync(value)
				}).catch(() => {
					if (fs.existsSync(Input)) fs.unlinkSync(Input)
					this.Ra.reply(from, GagalUpdatePP(), mess)
				})
			}
		})
    }
    protected setNameGc() {
        globalThis.CMD.on('admingc|setnamegc <text>',  { event: ["setnamegc <text>"], tag: "groupadmins"},['setnamagc', 'setnamegc', 'setnamegrup', 'setnamagroup'], async (res: WAConnection, data: Commands) => {
			const { isBotAdmins, from, isGroupAdmins, mess, isGroupMsg, args, isOwner, Command , Prefix} = data
			if (/^(?:-|--)(help)$/i.test(args[0])) return this.Ra.reply(from, HelpSetNameGc(Prefix), mess)
            if (!isGroupMsg) return this.Ra.reply(from, BukanDalamGroup(Command), mess)
            if (!isBotAdmins) return this.Ra.reply(from, BotGaAdmin(Command), mess)
            if (!isOwner && !isGroupAdmins) return
			await res.groupUpdateSubject(from, args.join(' ') || '')
            await this.Ra.reply(from, SuccesSetName(args.join(' ') || ''))
		})
    }
    protected setBioGc() {
        globalThis.CMD.on('admingc|setbiogc <text>',  { event: ["setbiogc"], tag: "groupadmins"},['setdesk', 'setdeskgc', 'setdesc', "setbiogc"], async (res: WAConnection, data: Commands) => {
			const { isBotAdmins, from, isGroupAdmins, mess, isGroupMsg, args, isOwner, Command, Prefix } = data
			if (/^(?:-|--)(help)$/i.test(args[0])) return this.Ra.reply(from, HelpSetBioGc(Prefix), mess)
            if (!isGroupMsg) return this.Ra.reply(from, BukanDalamGroup(Command), mess)
            if (!isBotAdmins) return this.Ra.reply(from, BotGaAdmin(Command), mess)
            if (!isOwner && !isGroupAdmins) return
            await res.groupUpdateDescription(from, args.join(' ') || '')
            await this.Ra.reply(from, SuccesSetDesk(), mess)
		})
    }
    protected Hidetag() {
        globalThis.CMD.on('admingc|hidetag <img,vid,stick,txt>',  { event: ["hidetag <img/vid/stick/txt>"], tag: "groupadmins"},['hidetag', 'hidden'], async (res: WAConnection, data: Commands) => {
			const { isBotAdmins, from, isGroupAdmins, args, groupMember, isVideo, isQuotedVideo, media, isGambar, isQuotedImage, isQuotedSticker, isMedia, isQuotedDokumen, mentioned, isOwner } = data
            const Members: string[] | undefined = groupMember?.filter((value: WAGroupParticipant) => value.isAdmin == false).map((value: WAGroupParticipant) => value.jid)
            if ((isOwner && Members) || (isBotAdmins && isGroupAdmins && Members)) {
				if ((isVideo && media) || (isQuotedVideo && media)) {
					await res.sendMessage(from, await res.downloadMediaMessage(media), MessageType.video, { contextInfo: { mentionedJid: Members }, caption: args.join(' ')})
				} else if ((isGambar && media) || (isQuotedImage && media)) {
					const Data: Buffer | any = await res.downloadMediaMessage(media)
					await res.sendMessage(from, Data, MessageType.image, { thumbnail: Data, contextInfo: { mentionedJid: Members }, caption: args.join('')})
				} else if (isQuotedSticker && media) {
					await res.sendMessage(from, await res.downloadMediaMessage(media), MessageType.sticker, { contextInfo: { mentionedJid: Members }})
				} else if (!isQuotedDokumen || !isMedia) {
					mentioned ? await res.sendMessage(from, args.join(' '), MessageType.extendedText, { contextInfo: { mentionedJid: [...Members, ...mentioned] }}) : await res.sendMessage(from, args.join(' '), MessageType.extendedText, {contextInfo: { mentionedJid: Members }})
				}
			}
		})
    }
    protected Tagall() {
        globalThis.CMD.on('admingc|tagall',  { event: ["tagall"], tag: "groupadmins"},['tagall', 'tagal'], async (res: WAConnection, data: Commands) => {
            const { from, groupMember, isGroupMsg, isGroupAdmins, mess, isOwner, Command } = data
            if (!isGroupMsg) return this.Ra.reply(from, BukanDalamGroup(Command), mess)
            if (!isOwner && !isGroupAdmins) return
            const Members: string[] | undefined = groupMember?.map((value) => value.jid)
            return void (await this.Ra.sendTextWithMentions(from, IndTagall(Members), mess))
        })
    }
    protected ListOnline() {
        globalThis.CMD.on('admingc|listonline',  { event: ["listonline"], tag: "groupadmins"},['listonline', 'online'], async (res: WAConnection, data: Commands) => {
			const { from, isGroupAdmins, isGroupMsg, mess, isOwner, Command } = data
            if (!isGroupMsg) return this.Ra.reply(from, BukanDalamGroup(Command), mess)
            if (!isOwner && !isGroupAdmins) return
            try {
                let result: { id: string; nama: string | undefined }[] = []
                Object.keys((await res.chats.get(from).presences) || '').map((value) => {
                    const Target: { [k: string]: WAPresenceData } | undefined = res.chats.get(from).presences
                    if (Target) {
                        result.push({ id: value, nama: Target[value].name || '' })
                    }
                })
                await this.Ra.sendTextWithMentions(from, IndListOn(result), mess)
            } catch (err) {
                await this.Ra.reply(from, IndGadaOn(), mess)
            }
        })
    }
}
