import { ICommands  } from "../types";
import { exec } from "child_process"

let command: ICommands = (client, message) => {
	exec(message.args?.join(" ") as string, (err, output) => {
		if (err) return client.Panic(err)
		return void client.Panic(output)
	})
}

command.tag = "owner";
command.isOwner = true;
command.eventName = "Exec";
command.command = /^(\$)$/i;
command.isPrefix = false;
command.event = ["$"];

export default command;