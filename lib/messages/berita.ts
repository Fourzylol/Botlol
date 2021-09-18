import { Client } from '../src/Client'
import { ConnectMoongo } from '../database/mongoodb/main'
import { OwnerOnly as Owner } from ".";
import { WAConnection } from '@adiwajshing/baileys'
import { Commands, KompasTerkini  } from '../typings';
import { RandomKompas } from "../routers/api";
import { IndKompasError, IndKompas } from "../lang/ind";
import { HelpKompas } from "../lang/help";


export class BeritaTerkini extends Owner {
	constructor(public Ra: Client, public database: ConnectMoongo) {
        super(Ra, database)
    }
	public sendingResponsee () {
		this.SendOwner()
		this.Kompas()
	}
	private Kompas () {
		globalThis.CMD.on("BacaKompas", { event: ["kompas"], tag: "berita"}, ["kompas"], async (res: WAConnection, data: Commands) => {
			const { from, mess, args, Prefix } = data
			if (/^(?:-|--)(help)$/i.test(args[0])) return this.Ra.reply(from, HelpKompas(Prefix), mess)
			await RandomKompas().then((value: KompasTerkini[]) => {
				this.Ra.reply(from,  IndKompas(value), mess)
			}).catch ((err) => {
				this.Ra.reply(from, IndKompasError(), mess)
				this.Ra.sendText(data.sendOwner,  "Random Kompas Error :" + err)
				console.log(err)
			})
		})
	}
}