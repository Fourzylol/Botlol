import { Saklar, DEFAULT_PUBLIC } from "../connections/Events/Ban-Mute";

export var Public: Promise <void> = globalThis.ev.on("Public", (client, message) => {
	const { from, id } = message;
	if (DEFAULT_PUBLIC === Saklar.ON) return client.reply(from as string, `*「❗」* Mohon Maaf Status Bot Saat ini sudah Publik`, id);
	client.req.setPublic(Saklar.ON);
	return void client.reply(from as string, `*✅* Berhasil  mengubah Status bot Saat ini  menjadi Publik`, id)
}, { event: ["public"], tag: "owner", command: /^(publi(?:c|k))$/i, isPrefix: false, isOwner: true })

export var Self: Promise <void> = globalThis.ev.on("Self", (client, message) => {
	const { from, id } = message;
	if (DEFAULT_PUBLIC === Saklar.OFF) return client.reply(from as string, `*「❗」* Mohon Maaf Status Bot Saat ini sudah Self`, id);
	client.req.setPublic(Saklar.OFF);
	return void client.reply(from as string, `*✅* Berhasil  mengubah Status bot Saat ini  menjadi Self`, id)
}, { event: ["self"], tag: "owner", command: /^(self)$/i, isPrefix: false, isOwner: true })