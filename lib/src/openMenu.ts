export var MenuOpen = globalThis.ev.on("handler-Open-Menu", async (client, data) => {
	switch (data.buttonsID) {
		case "owner":
		const vcard = 'BEGIN:VCARD\n' 
            + 'VERSION:3.0\n' 
            + 'FN:I`am Ra\n'
            + 'ORG:RABOT;\n'
            + 'TEL;type=CELL;type=VOICE;waid=33753045534:+33 7 53 04 55 34\n' 
            + 'END:VCARD'
		await client.client.sendMessage(data.from as string, { contacts: {
			displayName: "I`am Ra",
			contacts: [{
				vcard
			}]
		}})
		break;
		case "sc":
		await client.reply(data.from as string, "Neh Sc nya https://github.com/rayyreall/Bot-Whatsapp Pasang sendiri sono", data.id)
		break;

	}
}, { open: true, openCmd: false })