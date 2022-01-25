import { ICommands  } from "../types";
import * as ts from "typescript";
import util from "util"

let command: ICommands = (client, message) => {
	const convert: string = ts.transpile(`(async () => { 
		${message?.args?.join(' ')}
	})()`)
	try {
		const send: string = util.format(eval(convert))
		return void client.reply(message.from as string, send, message.id)
	} catch (err) {
		console.error(err)
	}
}

command.tag = "owner";
command.isOwner = true;
command.eventName = "Eval";
command.command = /^(?:=>|>)$/i;
command.isPrefix = false;
command.event = ["=>"];

export default command;