import { config } from 'dotenv'
config()
import { WAChatUpdate, WAConnection, proto } from '@adiwajshing/baileys'
import { HandlerMsg } from './handler'
import { HandlingMessage } from '../typings'
import { Command } from './command'
import { OwnerOnly , groupMembers, CheckUpdate } from '../messages'
import { Detector } from './detector'
import { Client } from './Client'
import { IndPublicSucces, IndPublicDuplicate } from '../lang/ind'
import { ConnectMoongo } from '../database/mongoodb/main'

let Public: boolean = false

export class Main {
    public database: ConnectMoongo = new ConnectMoongo()
    public client: WAConnection = new WAConnection()
    public message: HandlerMsg = new HandlerMsg(this.client, this.database)
    public Ra: Client = new Client(this.client)
    private Respon: OwnerOnly  = new OwnerOnly(this.Ra, this.database)
    private Update: CheckUpdate = new CheckUpdate(this.client)
    protected detector: any
    constructor() {}
    public getUpdate() {
        this.Update.CheckMem()
    }
    public Response() {
        this.client.on('chat-update', async (chats: WAChatUpdate) => {
            const data: HandlingMessage | undefined = await this.message.handling(chats)
            if (data == undefined) return
			if (!data.isOwner && !data.isGroupAdmins && (await this.database.CheckMuted(String(data.from)))) return
            this.detector = new Detector(this.client, data, this.database)
            this.detector.antiAll()
            if (data.isBot) return
            if (!data.isOwner && !Public) return
            this.detector.Handling()
            globalThis.prefix = data.Prefix
            globalThis.CMD = new Command(globalThis.prefix)
            this.Respon.SendOwner()
            new groupMembers(this.client, data).sendDataMembers()
            this.detector.CommnadGlobal()
			if (/^(publik|public)/i.test(data.Command) && data.isOwner) {
				let Body: string = data.body ? data.body : ''
                if (/(on)/i.test(Body.split(' ')[1])) {
                    if (Public) return this.Ra.reply(data.from || '', IndPublicDuplicate(true), data.mess)
                    Public = true
                    this.Ra.reply(data.from || '', IndPublicSucces(true), data.mess)
                } else if (/(off)/i.test(Body.split(' ')[1])) {
                    if (!Public) return this.Ra.reply(data.from || '', IndPublicDuplicate(false), data.mess)
                    Public = false
                    this.Ra.reply(data.from || '', IndPublicSucces(false), data.mess)
                }
            }
            return void (await CMD.validate(data, this.client))
        })
    }
}
