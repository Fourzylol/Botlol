import { ICommands, IEventsCmd  } from "../types";
import moment from "moment-timezone";
import Speed from 'performance-now';
import { proto, generateWAMessage, generateMessageID } from '@adiwajshing/baileys-md';
import * as fs from "fs";


moment.tz.setDefault('Asia/Jakarta').locale('id')

let command: ICommands = async (client, message) => {
	const { isOwner } = message;
	let data: { [k: string]: IEventsCmd} = {};
	for (let index of Object.entries(globalThis.Events)) {
		if (!(index[1] as IEventsCmd).tag) continue;
		if (!(index[1] as IEventsCmd).event) continue;
		if ((data[(index[1] as IEventsCmd).tag as string]) as IEventsCmd) (data[(index[1] as IEventsCmd ).tag as keyof typeof data] as any) =
		[...data[(index[1] as IEventsCmd ).tag as string] as any, Object.assign({}, index[1])]
		else {
			Object.defineProperty(data, String((index[1] as IEventsCmd).tag), {
				value: [index[1]],
				writable: true,
				enumerable: true,
				configurable: true
			})
		}
	}
	let ping: number = Speed()
	let text: string = `👋🏻 Halo ${isOwner ? 'My Owner 🤴🏻' : 'ka'} Selamat menggunakan Bot ya


*🤴🏻 Bot :* RA BOT
*⏰ Jam* : ${moment(new Date()).format('LLLL').split(' GMT')[0]}
*⏳ Runtime* : ${((await import("../functions/functions")).Runtime(process.uptime()))}
*🍃 Speed* : ${(Speed() - ping).toFixed(4)}
*🪀 Creator* : @33753045534 ( *Ra* )
*🌄 Lib* : Baileys
*📜 Language :* Typescript
*⚔️ Prefix :* ${message.Prefix ? (message.Prefix.prefix === "") ? "No Prefix" : message.Prefix.prefix : "No Prefix"}
*🕵🏻‍♂️ Github :* rayyreall
*🌚 Instagram :* @rayyreall
*🔑 Apikey* : Ga Pake
${(process.env.server !== undefined) ? "*🗄 Server :* " + process.env.server : ""} 
*👾 SC :* https://github.com/rayyreall/Whatsapp_Bot\n\n`

for (let index of Object.entries(data)) {
	if ((index[1] as IEventsCmd[]).filter((values) => values.skipMenu !== true).length !== 0) 	text += `\n\n            *MENU ${index[0].toUpperCase()}*\n\n`;
	for (let values of (index[1]) as IEventsCmd []) {
		if (values.skipMenu === true) continue;
		if (typeof values.event === "string") text += "*ℒ⃝🕊️ •* *" + (values.isPrefix ? message.Prefix ? message.Prefix.prefix : "" : "") + values.event +"*\n";
		else if (Array.isArray(values.event))  {
			for (let getArray of values.event) {
				text += "*ℒ⃝🕊️ •* *" + (values.isPrefix ? message.Prefix ? message.Prefix.prefix : "" : "")  +getArray +"*\n"
			}
		}
	}
}
text += `\n\n__________________________________
*Notes :*
*- Jangan Pernah Menelpon Bot Dan Owner Jika Menelpon Akan di block Otomatis dan TIdak ada Kata Unblock ‼️*
*- Jika Menemukan Bug, Error, Saran Fitur Harap Segera Lapor Ke Owner*
*- Bot Ini masih dalam Tahap pengembangan baru bikin:v*
*- Bot Ini Dilengkapi Anti Spam, anda bisa menggunakan command berikutnya setelah prosess sebelumnya berakhir*
	
*Group : Coming soon*
__________________________________
*🔖 || IG*
@rayyreall`

return void await client.client.relayMessage(message.from as string, proto.Message.fromObject({
	buttonsMessage: proto.ButtonsMessage.fromObject({
		contentText: text,
		footerText: "🔖 @Powered by Ra",
		buttons: [{
			buttonId: "owner",
			buttonText: {
				displayText: "𝗢𝗪𝗡𝗘𝗥 / 𝗖𝗥𝗘𝗔𝗧𝗢𝗥",
			},
			type: 1, 
		}, {
			buttonId: "sc",
			buttonText: {
				displayText: "𝗦𝗖𝗥𝗜𝗣𝗧 𝗕𝗢𝗧",
			},
			type: 1
		}],
		contextInfo: proto.ContextInfo.fromObject({
			mentionedJid: ["33753045534@s.whatsapp.net", String(message.sender)]
		}),
		headerType: 4,
		imageMessage: proto.ImageMessage.fromObject((await generateWAMessage(message.from as string, { image: {
			stream: fs.createReadStream("./lib/database/media/image/thumb.png")
		}, jpegThumbnail: await client.compressImage("./lib/database/media/image/thumb.png") as any }, { userJid: client.client.authState.creds.me!.id, upload: client.client.waUploadToServer, messageId: generateMessageID()})
	).message?.imageMessage as proto.ImageMessage) })
}), { messageId: generateMessageID() })
}

command.event = ["menu"];
command.tag = "user";
command.eventName = "AutoMenu";
command.command = ["menu", "help"];

export default command;