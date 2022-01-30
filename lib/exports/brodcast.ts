import type { ICommands, Messages  } from "../types";

let cmd: ICommands = async (client, data) => {
	let { isMedia, media, args, quotedBody } = data;
	for (let index in (await client.client.groupFetchAllParticipating())) {
		if (isMedia) {
			await client.sendFile(index, (await client.decryptMedia(media as Messages.IMedia)), { caption: `ㅤㅤㅤㅤ  *「 BROADCAST 」*\n\n${(args)?.[0] ? args.join(" ") : quotedBody || ""}`})
		} else {
			await client.sendTextWithMentions(index, `ㅤㅤㅤㅤ  *「 BROADCAST 」*\n\n${(args)?.[0] ? args.join(" ") : quotedBody || ""}`)
		}
	}
}

cmd.tag = "owner";
cmd.isOwner = true;
cmd.eventName = "Broadcast";
cmd.command = ["bc", "broadcast"];
cmd.event = "bc";

export default cmd