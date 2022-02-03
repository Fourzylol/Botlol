import Database from "../clients/database";

enum Saklar {
	ON = 1,
	OFF = 0
}
export interface Mute {
	id?: string;
	time?: number;
	status?: Saklar;
	reason?: string;
};
let DEFAULT_PUBLIC: Saklar = Saklar.OFF;
let Mute_Event: Map<string, Mute> = new Map<string, Mute>();


class HandlerCommand {
	public dbBanned: Promise<Database>;
	constructor () {
		this.dbBanned = new Promise<Database>(async (resolve, reject) => {
			let database: Database = new Database("banned");
			await database.connect;
			return resolve(database)
		})
		setInterval(() => {
			Mute_Event.forEach((value, key) => {
				if (value.time && value.time <= Date.now() && value.status === Saklar.ON && value.id)  this.setMute({ jid: key, status: Saklar.OFF })
			})
		}, 1000);
	};
	public  setPublic (config: Saklar): 0 | 1 {
		DEFAULT_PUBLIC = config;
		return DEFAULT_PUBLIC;
	}
	public getMute (jid: string): Mute | undefined {
		return Mute_Event.get(jid);
	}
	public setMute (config: { jid: string, time?: number, status: Saklar, reason?: string}) {
		if (config.time) config.time = (Date.now() + config.time)
		Mute_Event.set(config.jid, config);
		return Mute_Event.get(config.jid);
	}
	public checkMute (jid: string): boolean {
		return Mute_Event.has(jid) ? Mute_Event.get(jid)?.status === Saklar.ON : false;
	}
	public async setBanned (config: { jid: string, status: Saklar }) {
		let db: Database = await this.dbBanned;
		if (await db.Test({ id: config.jid })) {
			return await db.setConfig(config.jid, { ...config })
		} else {
			return await db.setConfig(config.jid, { ...config })
		}
	}
	public async checkBanned (jid: string): Promise <boolean> {
		let db: Database = await this.dbBanned;
		if (await db.Test({ id: jid })) {
			return true
		} else {
			return false
		}
	}

}

export default HandlerCommand;
export {
	Saklar,
	DEFAULT_PUBLIC
}