export var tester = globalThis.ev.on("test-global", (client, message) => {
	console.log("horeee work")
}, { event: ["hay"], tag: "test global", command: /(asulu)/i, isOwner: true})