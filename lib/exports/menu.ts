import { ICommands, IEventsHandler  } from "../types";
import moment from "moment-timezone";
import Speed from 'performance-now';


moment.tz.setDefault('Asia/Jakarta').locale('id')

let command: ICommands = async (client, message) => {
	const { isOwner } = message;
	let data: any = {};
	for (let index of Object.entries(globalThis.Events)) {
		if ((data[(index[1] as IEventsHandler).tag as string]) as IEventsHandler) data[(index[1] as IEventsHandler).tag as string] =
		[...data[(index[1] as IEventsHandler).tag as string], Object.assign({}, index[1])]
		else {
			Object.defineProperty(data, String((index[1] as IEventsHandler).tag), {
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
*⚔️ Prefix :* ${message.Prefix}
*🕵🏻‍♂️ Github :* rayyreall
*🌚 Instagram :* @rayyreall
*🔑 Apikey* : Ga Pake
${(process.env.server !== undefined) ? "*🗄 Server :* " + process.env.server : ""} 
*👾 SC :* https://github.com/rayyreall/Bot-Whatsapp\n\n`

for (let index of Object.entries(data)) {
	if ((index[1] as IEventsHandler[]).filter((values) => values.skipMenu !== true).length !== 0) 	text += `\n\n            *MENU ${index[0].toUpperCase()}*\n\n`;
	for (let values of (index[1]) as IEventsHandler[]) {
		if (values.skipMenu === true) continue;
		if (typeof values.event === "string") text += "*ℒ⃝🕊️ •* *" + (values.isPrefix ? message.Prefix : "") + values.event +"*\n";
		else if (Array.isArray(values.event))  {
			for (let getArray of values.event) {
				text += "*ℒ⃝🕊️ •* *" + (values.isPrefix ? message.Prefix : "")  +getArray +"*\n"
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


return void await client.client.sendMessage(message.from as string, { text,
footer: '🔖 @Powered by Ra', templateButtons:[
	{index: 1, urlButton: {displayText: '𝗦𝗖𝗥𝗜𝗣𝗧 𝗕𝗢𝗧', url: 'https://github.com/rayyreall/Whatsapp_Bot'}},
    {index: 2, callButton: {displayText: '𝗢𝗪𝗡𝗘𝗥 / 𝗖𝗥𝗘𝗔𝗧𝗢𝗥', phoneNumber: '+33 7 53 04 55 34'}},
    {index: 3, quickReplyButton: {displayText: 'Semoga Saya Mandul', id: 'instagram'}}
]}, { quoted: message.id})
}

command.event = ["menu"];
command.tag = "user";
command.eventName = "AutoMenu";
command.command = ["menu", "help"];

export default command;