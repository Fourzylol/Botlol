export var tester = globalThis.ev.on("test-global", (client, message) => {
	console.log("horeee work")
}, { event: ["hay"], tag: "test global", command: ["hay", "syng", /(asulu)/i], isOwner: true})