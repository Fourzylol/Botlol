import {  ICommand, IMessages } from "../types";


export default class implements ICommand {
	callback(client: import("../connections/clients/Cli").default, message: IMessages) {
		return void console.debug("Lo Kontol")
	}
	settings: ICommand["settings"]
	constructor () {
		this.settings = {
			command: "testasdad",
			eventName: "haloosadasda",
			tag: "ownesadr",
			isOwner: true
		};
	}
}

