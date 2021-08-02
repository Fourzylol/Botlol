import { MessageType, WAConnection } from "@adiwajshing/baileys";
import { AddRegister, Addhit  } from "../plugins";
import { HandlingMessage } from "../typings";
import { Verify } from "../chats";
import { Client } from "../src/Client";
import chalk from "chalk";
import { IndPrefix } from "../lang/ind"
import * as fs from "fs"
import ts from "typescript";
import util from "util";


export class Detector extends Verify {
	constructor(public client: WAConnection, public data: HandlingMessage) {
		super(client, data)
	}
	public antiAll () {
		this.antiTroli()
	}
	public CommnadGlobal (){
		this.Handle()
	}
	public Handling () {
		this.getRegister()
		this.PrefixCheck()
		if (this.data.IsCMD) {
			this.addHit()
		}
	}
	protected antiTroli () {
		const { typeQuoted, mess, from, groupMetadata, sender, pushname, isBot } = this.data
		if (typeQuoted === MessageType.product && isBot) {
			console.log(chalk.keyword('red')("\x1b[1;31m~\x1b[1;37m>"), chalk.keyword('blue')(`[\x1b[1;32m${chalk.hex('#009940').bold('TROLI DETECTED')}]`), chalk.red.bold("\x1b[1;31m=\x1b[1;37m>"), (`(${sender?.replace(/@s.whatsapp.net/i, '')})`), chalk.greenBright('IN'), chalk.hex('#0428c9')(`${from.endsWith("@g.us") ? groupMetadata.subject : pushname}`))
			this.client.modifyChat(from, "clear")
		}
	}
	protected async PrefixCheck (){
		const { from, Prefix, Command, mess, body } = this.data
		if (/(prefix)/.test(Command)) {
			this.client.sendMessage(from, IndPrefix(Prefix), MessageType.extendedText, { quoted: mess})
		} else if (/^=>$/.test(Command)) {
			const Text = this.data.body.split(" ")
			Text.shift()
			const convert: string = ts.transpile(`(async () => { ${Text.join(" ")}})()`)
			const send: string = util.format(eval(convert))
			await this.client.sendMessage(from, send, MessageType.text, { quoted: mess})
		} else if (/^\$cat/.test(Command)) {
			if (!fs.existsSync(body.split(" ")[1] || "")) return
			const res: string = await ts.transpile(fs.readFileSync(body.split(" ")[1] || "").toString())
			await this.client.sendMessage(from, res, MessageType.extendedText, { quoted: mess})
		} 
	}
	private getRegister () {
		AddRegister(this.data.sender)
	}
	private addHit () {
		Addhit (this.data.sender)
	}
}