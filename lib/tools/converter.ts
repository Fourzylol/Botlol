import { AutoPath } from '../functions/functions';
import ffmpeg from "fluent-ffmpeg";
import * as fs from "fs";

export default class Converter {
	constructor (private config: { file: string, output?: string}) {
		if (!this.config.file) throw new Error("No file specified");
		if (!fs.existsSync(this.config.file)) throw new Error("File does not exist");
	}
	public readonly convertMp3 = async (respon?: "file" | "buffer"): Promise <Buffer|string> => {
		if (!this.config.output) this.config.output = AutoPath("mp3");
		return new Promise <Buffer|string> (async (resolve, reject) => {
			ffmpeg(this.config.file)
			.audioBitrate(128)
			.audioChannels(2)
			.audioFrequency(44100)
			.audioCodec("libmp3lame")
			.format("mp3")
			.on("error", (err) => {
				console.log('An error occurred: ' + err.message);
				reject(err);
			})
			.on("end", () => {
				if (respon === "file") {
					resolve(this.config.output as string);
				} else if (respon === 'buffer') {
					resolve(fs.readFileSync(this.config.output as string));
				} else {
					reject(new Error("Invalid response type"));
				}
			})
			.save(this.config.output as string);
		});
	}
}