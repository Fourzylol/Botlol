import { Commands, HandlingMessage } from '../typings'
import { WAConnection, MessageType, WAGroupParticipant, WAParticipantAction, proto } from '@adiwajshing/baileys'
import moment from 'moment-timezone'
import { IndVoteStart, IndVoting, IndHasilVote, BukanDalamGroup, IndSesiVotingAda, IndSesiVotingGada, IndResetSesi, IndVoteLebih15, BerhasilKickVote, CancelVote, DiaKeluarVote, IndAbsenStart, IndAbsensi, IndAbsen, BerhasilVote,  IndUdahVote  } from '../lang/ind'

interface VoteMap {
	pelapor: string | null | undefined
	alasan: string
	expired: number
	target: string
	action: {
		id: string | null | undefined
		status: string
		pushname: string
	}[] 
}
interface AbsensMap {
	time: number
	action: any
}
let result: Map<String, VoteMap | any> = new Map()
let Absens: Map<String, AbsensMap> = new Map()

export class groupMembers {
	constructor(public Ra: WAConnection, public data: HandlingMessage) {}
    public sendDataMembers() {
		this.vote()
        this.ResponVote()
        this.delvote()
        this.Absen()
        this.ResponseAbsen()
    }
    private Absen() {
		globalThis.CMD.on('group|absen',  { event: ["absen"], tag: "group"},['absen'], async (res: WAConnection, data: Commands) => {
			const { from, mess, groupMember } = data
            if (Absens.has(from)) return
            Absens.set(from, { time: moment().add(30, 'minutes').unix(), action: [] })
            setInterval(async () => {
				const Time = Absens.get(from)
                if (!Time) return
                if (Number(Time.time) <= moment().unix()) {
					let hasil: WAGroupParticipant[] = []
					if (!Time.action) return
                    Time.action.map((value: any) => {
                        hasil.push(...(groupMember?.filter((ress: WAGroupParticipant) => value.id !== ress.jid) || []))
                    })
                    res.sendMessage(from, IndAbsen(hasil, Number(groupMember?.length) - Number(Time.action.length)), MessageType.text, { contextInfo: { mentionedJid: hasil.map((value: WAGroupParticipant) => value.jid)}})
                    Absens.delete(from)
				}
			}, 1000)
			return void (await res.sendMessage(from, IndAbsenStart(), MessageType.extendedText, { quoted: mess }))
        })
    }
    private ResponseAbsen() {
        const { from, Command, sender, pushname, groupMember, body } = this.data
        if (!from) return
        if (Absens.has(from)) {
			switch (Command) {
				case 'hadir': {
					const data: AbsensMap | undefined = Absens.get(from)
                    if (data?.action.find((value: any) => value.id == sender)) return
					if (!data) return 
					data?.action.push({ id: sender, nama: pushname || sender, status: 'HADIR' })
                    Absens.set(from, data)
                    const result = Absens.get(from)
                    this.Ra.sendMessage(from, IndAbsensi(result?.action, groupMember?.length || 0), MessageType.text)
				}
				break
                case 'izin': {
					const data: AbsensMap | undefined = Absens.get(from)
                    if (data?.action.find((value: any) => value.id == sender)) return
					const alasan: string[] = body ? body.split(" ") : []
					alasan.shift()
                    data?.action.push({ id: sender, nama: pushname || sender, status: 'IZIN', alasan: alasan[0] ? (Number(alasan.join(" ").trim().length) >= 50) ?  "*TANPA KETERANGAN* (otomatis disebabkan BANYAK ALASAN)" : alasan.join(" ").trim() : "Sekaratul maut" })
					if (!data) return
                    Absens.set(from, data)
                    const result = Absens.get(from)
					this.Ra.sendMessage(from, IndAbsensi(result?.action, groupMember?.length || 0), MessageType.text)
				}
                break
                case 'sakit': {
					const data: AbsensMap | undefined = Absens.get(from)
					if (!data) return
                    if (data.action.find((value: any) => value.id == sender)) return
                    data.action.push({ id: sender, nama: pushname || sender, status: 'SAKIT' })
                    Absens.set(from, data)
                    const result = Absens.get(from)
                    this.Ra.sendMessage(from, IndAbsensi(result?.action, groupMember?.length || 0), MessageType.text)
                }
                break
            }
        }
    }
    protected async ResponVote() {
        const { from, bodyButton, Command, sender, pushname, mess, isBotAdmins, groupMember } = this.data
        if (!from) return
        const data: VoteMap| undefined = result.get(from)
        if (data !== undefined) {
			setInterval(async () => {
				if (Number(data.expired) <= moment().unix()) {
					const ress: VoteMap = result.get(from)
					if (ress) result.delete(from) && this.Ra.sendMessage(from, IndHasilVote(ress.pelapor || '', ress.target, ress.alasan, ress.action), MessageType.extendedText, { contextInfo: { mentionedJid: [ress.pelapor || '', ress.target] }}) 
				}
			}, 1000)
            let vote: { id: string | null | undefined; status: string; pushname: string }[] | undefined = data?.action?.filter((value: any) => value.status == 'vote')
            let devote: { id: string | null | undefined; status: string; pushname: string }[] | undefined = data?.action?.filter((value: any) => value.status == 'devote')
            let CheckMem: WAGroupParticipant | undefined = groupMember?.find((value) => value.jid === data.target)
			let CheckRespon = result.get(from)
            if (Number(vote?.length) > 15 && CheckMem && isBotAdmins) return   (result.delete(from) &&  (await this.Ra.sendMessage(from, BerhasilKickVote(data.target), MessageType.extendedText, { contextInfo: { mentionedJid: [data.target] }}))  && this.Ra.groupRemove(from, [data.target])) 
			if (Number(vote.length) > 15 && CheckMem) return result.delete(from) && await this.Ra.sendMessage(from, BerhasilVote(data.target), MessageType.extendedText, { contextInfo: { mentionedJid: [data.target] }})
            if (Number(devote?.length) > 15) return result.delete(from) && (await this.Ra.sendMessage(from, CancelVote(), MessageType.text))
            const Body: string = bodyButton == '' ? Command : bodyButton || ''
			if (!sender) return
            switch (Body.toLocaleLowerCase()) {
                case 'vote': {
					const Format: VoteMap | any = {
						...data
					}
					if (Format?.action?.find((value: { id: string; status: string; pushname: string }) => value.id === sender)) return this.Ra.sendMessage(from,  IndUdahVote(), MessageType.extendedText, { quoted: mess})
					Format.action?.push({ id: sender || '', status: 'vote', pushname: pushname})
                    result.set(from, Format)
                    const hasil: VoteMap = result.get(from)
                    if (!hasil) return
                    this.Ra.sendMessage(from, IndVoting(hasil.pelapor || '', hasil.target, hasil.alasan, hasil.action), MessageType.extendedText, { quoted: mess, contextInfo: { mentionedJid: [hasil.pelapor || '', hasil.target]}})
				}
                break
                case 'devote': {
					const Format: VoteMap | any = {
						...data
					}
                    if (Format.action.find((value: any) => value.id === sender)) return  this.Ra.sendMessage(from,  IndUdahVote(), MessageType.extendedText, { quoted: mess})
                    Format.action.push({ id: sender || '', status: 'devote', pushname: pushname })
                    result.set(from, Format)
                    const hasil: VoteMap = result.get(from)
                    if (!hasil) return
                    this.Ra.sendMessage(from, IndVoting(hasil.pelapor || '', hasil.target, hasil.alasan, hasil.action), MessageType.extendedText, { quoted: mess, contextInfo: { mentionedJid: [hasil.pelapor || '', hasil.target]}})
				}
                break
			}
        }
    }
    private delvote() {
        globalThis.CMD.on('voting|delvote',  { event: ["delvoting"], tag: "voting"},['delvote', 'deletevote', 'resetvote'], async (res: WAConnection, data: Commands) => {
			const {  from, isGroupMsg, mess, Command } = data
            if (!isGroupMsg) return await res.sendMessage(from, BukanDalamGroup(Command), MessageType.extendedText, { quoted: mess })
            const Check: VoteMap = result.get(from)
            if (!Check) return await res.sendMessage(from, IndSesiVotingGada(), MessageType.extendedText, { quoted: mess })
            await result.delete(from)
            return void res.sendMessage(from, IndResetSesi(), MessageType.extendedText, { quoted: mess })
		})
    }
    private vote() {
        globalThis.CMD.on('voting|voting <alasan,time,tag/reply>',  { event: ["voting <alasan,time,tag/repl>"], tag: "voting"}, ['voting'], async (res: WAConnection, respon: Commands) => {
			const { args, from, mentioned, sender, mess, isGroupMsg, Command } = respon
            if (!isGroupMsg) return await res.sendMessage(from, BukanDalamGroup(Command), MessageType.extendedText, { quoted: mess })
            if (mentioned && mentioned[0] === undefined) return res.sendMessage(from, 'Harap tag seseorang', MessageType.text)
            let getRespon: string = args.join(' ').replace('@', '').replace(new RegExp(`${mentioned?.join(' ').replace('@s.whatsapp.net', '')}`, 'gi'), '')
            const Check: VoteMap = result.get(from)
            if (Check) return await res.sendMessage(from, IndSesiVotingAda(), MessageType.extendedText, { quoted: mess })
            if (/[0-9]/g.test(getRespon)) {
				if (Number(getRespon.replace(/\D/g, '')) > 15) return res.sendMessage(from, IndVoteLebih15(), MessageType.extendedText, { quoted: mess })
                const Format: VoteMap = {
					pelapor: sender,
                    alasan: getRespon.replace(/[0-9]/g, '') || 'Nothing',
                    expired: Number(moment().add(Number(getRespon.replace(/\D/g, '')), 'minutes').unix()),
                    target: mentioned ? mentioned[0] : '',
                    action: []
                }
                result.set(from, Format)
                const Data: VoteMap = result.get(from)
                const Buttons = {
					contentText: IndVoteStart(Data?.pelapor || '', Data?.target || '',Data?.alasan || '',Number(getRespon.replace(/\D/g, ''))),
                    footerText: 'Notes : Jika Kamu wa jelek gada tombol ketik vote/devote\n\nJika vote melebihi 15 orang maka otomatis target akan dikick JIKA BOT ADMIN, Sebaliknya jika devote melebihi 15 orang maka otomatis di batakan / ditutup\n\n🔖 @Powered bye Ra',
                    buttons: [
						{ buttonId: '1', buttonText: { displayText: '-' }, type: 1 },
                        { buttonId: '1', buttonText: { displayText: 'VOTE' }, type: 1 },
                        { buttonId: '1', buttonText: { displayText: 'DEVOTE' }, type: 1 }
					],
					headerType: 1
				} as proto.ButtonsMessage
                await res.sendMessage(from, Buttons, MessageType.buttonsMessage, { contextInfo: { mentionedJid: [Data?.target || '', Data?.pelapor || ''] }})
            } else {
				const Format: VoteMap = {
					pelapor: sender,
                    alasan: getRespon.replace(/[0-9]/g, '') || 'Nothing',
                    expired: Number(moment().add(Number(10), 'minutes').unix()),
                    target: mentioned ? mentioned[0] : '',
                    action: []
                }
                result.set(from, Format)
                const Data: VoteMap = result.get(from)
                const Buttons = {
					contentText: IndVoteStart(Data?.pelapor || '', Data?.target || '', Data?.alasan || '', 10),
                    footerText: 'Notes : Jika Kamu wa jelek gada tombol ketik vote/devote\n\nJika vote melebihi 15 orang maka otomatis target akan dikick JIKA BOT ADMIN, Sebaliknya jika devote melebihi 15 orang maka otomatis di batakan / ditutup\n\n🔖 @Powered bye Ra',
                    buttons: [
						{ buttonId: '1', buttonText: { displayText: '-' }, type: 1 },
                        { buttonId: '1', buttonText: { displayText: 'VOTE' }, type: 1 },
                        { buttonId: '1', buttonText: { displayText: 'DEVOTE' }, type: 1 }
                    ],
                    headerType: 1
                } as proto.ButtonsMessage
                await res.sendMessage(from, Buttons, MessageType.buttonsMessage, { contextInfo: { mentionedJid: [Data?.target || '', Data?.pelapor || '']}})
			}
		})
    }
}
export class CheckUpdate {
	constructor(public Ra: WAConnection) {}
    public CheckMem() {
		this.Ra.on('group-participants-update', async (update: { jid: string, participants: string[], actor?: string | undefined, action: WAParticipantAction }) => {
			const ress: VoteMap = result.get(update.jid)
            if (update.action == 'remove' && result.has(update.jid) && update.participants[0] == ress.target) return (result.delete(update.jid) && (await this.Ra.sendMessage(update.jid, DiaKeluarVote(), MessageType.text)))
		})
    }
}
