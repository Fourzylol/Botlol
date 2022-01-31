import Command, {  Cmd, getCallback  } from "../connections/Events/cmdDecorator";

@Cmd("ngetes-Pak", {
	command: ["ngetes"],
	event: "halo",
	tag: "ngetes",
})
export default class extends Command  {
	public callback: getCallback  = (client, data) => {
		console.log("hore work")
	}
}