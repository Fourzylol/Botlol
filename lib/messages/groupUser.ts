import { Searching } from '.'
import { Client } from '../src/Client'
import { ConnectMoongo } from '../database/mongoodb/main'
import { WAConnection, MessageType } from '@adiwajshing/baileys'
import { Commands } from '../typings'
import { indAfkOn,  BukanDalamGroup,  indAfkDahNyala } from '../lang/ind'

export class GroupCommands extends Searching {
    constructor(public Ra: Client, public database: ConnectMoongo) {
        super(Ra, database)
    }
    public sendHandling() {
        this.sendResponse()
        this.Afk()
    }
    public async Afk() {
        globalThis.CMD.on('group|afk <alasan>',  { event: ["afk <alasan>"], tag: "group"},['afk'], async (res: WAConnection, data: Commands) => {
            const { from, sender, isGroupMsg, args, mess, groupMetadata, pushname, Command } = data
            if (!isGroupMsg) return this.Ra.reply(from,  BukanDalamGroup(Command), mess)
			if (await this.database.checkAfk(sender || "")) return await this.Ra.reply(from,  indAfkDahNyala(), mess)
            const Format: { id: string; from: string; alasan: string; time: number } = {
                id: sender + from,
                from: from,
                alasan: args[0] ? args.join(' ') : 'Tanpa alasan',
                time: Date.now()
            }
            await this.database.AddAfk(sender + from, Format)
            return void (await this.Ra.sendTextWithMentions(from, indAfkOn(sender?.split("@")[0] || "", groupMetadata?.subject || "", args[0] ? args.join(' ') : 'Tanpa alasan', pushname), mess))
        })
    }
}
