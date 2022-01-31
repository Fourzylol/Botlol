export declare interface IMute { 
	id: string;
	to: string;
	time?: number, 
	withDatabase?: boolean
}

let muteEvents = new Map<string,IMute>()

export default class MuteUser {
	constructor() {};
	public checkMute (id: string, to: string): Boolean {
		if (muteEvents.has(id) && muteEvents.get(id)?.to === to) return true;
		else return false; 
	}
	public addMute (config: IMute) {
		muteEvents.set(config.id, config);
	}
}