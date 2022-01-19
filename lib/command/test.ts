import {  ICommand, IMessages } from "../types";
import Clients from "../connections/clients/Cli";


export default class implements ICommand {
	callback(client: Clients, message: IMessages) {
		return void console.debug("Lo Kontol")
	}
	settings: ICommand["settings"]
	constructor () {
		this.settings = {
			command: "tests",
			eventName: "haloo",
			tag: "owner",
			isOwner: true
		};
	}
}