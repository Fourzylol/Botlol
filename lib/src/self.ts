export var Public: Promise <void> = globalThis.ev.on("Public", (client, message) => {
	const { from, id } = message;
	if (globalThis.Publik) return client.reply(from as string, `*「❗」* Mohon Maaf Status Bot Saat ini sudah ${globalThis.Publik ? "Publik" : "Self"}`, id);
	globalThis.Publik = true;
	return void client.reply(from as string, `*✅* Berhasil  mengubah Status bot Saat ini  menjadi ${globalThis.Publik ? "Publik" : "Private"}`, id)
}, { event: ["public"], tag: "owner", command: /^(publi(?:c|k))$/i, isPrefix: false, isOwner: true })

export var Self: Promise <void> = globalThis.ev.on("Self", (client, message) => {
	const { from, id } = message;
	if (!globalThis.Publik) return client.reply(from as string, `*「❗」* Mohon Maaf Status Bot Saat ini sudah ${globalThis.Publik ? "Publik" : "Self"}`, id);
	globalThis.Publik = false;
	return void client.reply(from as string, `*✅* Berhasil  mengubah Status bot Saat ini  menjadi ${globalThis.Publik ? "Publik" : "Private"}`, id)
}, { event: ["self"], tag: "owner", command: /^(self)$/i, isPrefix: false, isOwner: true })