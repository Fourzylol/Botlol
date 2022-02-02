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
	constructor () {
		setInterval(() => {
			Mute_Event.forEach((value, key) => {
				if (value.time && value.time <= Date.now()) Mute_Event.delete(key)
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
}

export default HandlerCommand;
export {
	Saklar,
	DEFAULT_PUBLIC
}