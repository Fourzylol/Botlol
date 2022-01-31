import type { ICommands, Messages  } from "../types";

let cmd: ICommands = async (client, data) => {
	let { isMedia, media, args, quotedBody } = data;
	let fetch = await client.client.groupFetchAllParticipating()
	for (let index in (fetch)) {
		if (isMedia) {
			await client.sendFile(index, (await client.decryptMedia(media as Messages.IMedia)), { caption: `ㅤㅤㅤㅤ  *「 BROADCAST 」*\n\n${(args)?.[0] ? args.join(" ") : quotedBody || ""}`})
		} else {
			await client.sendTextWithMentions(index, `ㅤㅤㅤㅤ  *「 BROADCAST 」*\n\n${(args)?.[0] ? args.join(" ") : quotedBody || ""}`)
		}
	}
	await client.Panic("Succes Send Message All Group")
}

cmd.tag = "owner";
cmd.isOwner = true;
cmd.eventName = "Broadcast";
cmd.command = ["bc", "broadcast"];
cmd.event = "bc";

export default cmd