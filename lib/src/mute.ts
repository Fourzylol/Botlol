import { Saklar } from "../connections/Events/Ban-Mute";
import { ParseStringCmd, convertTime } from '../functions/functions';


export var Mute = globalThis.ev.on("Event-Mute", async (client, data) => {
	const { from, id, mentioned, args  } = data;
	if ((ParseStringCmd(args.join(" ")).jid) && !client.req.checkMute(ParseStringCmd(args.join(" ")).jid) || (mentioned && !client.req.checkMute(mentioned[0]))) {
		await client.req.setMute({ jid: ParseStringCmd(args.join(" ")).jid ? ParseStringCmd(args.join(" ")).jid : mentioned[0], time: ParseStringCmd(args.join(" "))?.time  ? convertTime(ParseStringCmd(args.join(" "))?.time) : undefined, status: Saklar.OFF, reason: ParseStringCmd(args.join(" "))?.reason || "No reason"});
		await client.sendTextWithMentions(from, `@${ParseStringCmd(args.join(" ")).jid ? ParseStringCmd(args.join(" ")).jid.split("@")[0] : mentioned[0].split("@")[0]} has been muted for ${`${ParseStringCmd(args.join(" "))?.time} seconds.` || "Infinity."}`, id);	
	} else {
		await client.reply(from, `*「❗」* Mohon Maaf Jid/Mention tidak ditemukan`, id);
	}
}, { event: ["mute"], tag: "owner", command: ["mute"], isOwner: true } );

export var Unmute = globalThis.ev.on("Event-Unmute", async (client, data) => {
	const { from, id, mentioned, args  } = data;
	if ((ParseStringCmd(args.join(" ")).jid) && client.req.checkMute(ParseStringCmd(args.join(" ")).jid) || (mentioned && client.req.checkMute(mentioned[0]))) {
		await client.req.setMute({ jid: ParseStringCmd(args.join(" ")).jid ? ParseStringCmd(args.join(" ")).jid : mentioned[0], time: ParseStringCmd(args.join(" "))?.time  ? convertTime(ParseStringCmd(args.join(" "))?.time) : undefined, status: Saklar.ON, reason: ParseStringCmd(args.join(" "))?.reason || "No reason"});
		await client.sendTextWithMentions(from, `@${ParseStringCmd(args.join(" ")).jid ? ParseStringCmd(args.join(" ")).jid.split("@")[0] : mentioned[0].split("@")[0]} has been unmuted.`, id);	
	} else {
		await client.reply(from, `*「❗」* Mohon Maaf Jid/Mention tidak ditemukan`, id);
	}
}, { event: ["unmute"], tag: "owner", command: ["unmute"], isOwner: true } );