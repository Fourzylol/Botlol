import Sticker from "wa-sticker-formatter";
import Jimp from "jimp";
import * as fs from "fs";

export default class createSticker {
	constructor (public default_config?: import("../types").StickerMetadata) {
		if (this.default_config) {
			if (!this.default_config?.author) this.default_config.author = " ";
			if (!this.default_config.pack) this.default_config.pack = "RA BOT";
			if (!this.default_config.type) this.default_config.type = "crop";
		}
	}
	public readonly convertSticker = async (file: string | Buffer, toFile?: string): Promise <Buffer | string> => {
		return new Promise <Buffer | string> (async(resolve, reject) => {
			try {
				const sticker: Sticker = new Sticker(file, this.default_config);
				this.buildImageCircle
				if (toFile) resolve(await sticker.toFile(toFile))
				else resolve(await sticker.build())
			} catch (err) {
				throw reject(err)
			}
		})
	}
	private readonly buildImageCircle = async (file: string): Promise <string> => {
		return new Promise <string>(async (resolve, reject) => {
			const input: Promise <Jimp>  = Jimp.read(file);
			const output: string = (await import("../functions/functions")).AutoPath("png");
			Promise.all([input]).then(function (images) {
				const lenna: Jimp = images[0];
				lenna
				.circle()
				.background(0)
				.resize(256, Jimp.AUTO)
				.write(output, (err) => {
					if (err) {
						if (fs.existsSync(output)) fs.unlinkSync(output);
						return reject(err)
					} else {
						return resolve(output)
					}
				})
			})
		}) 
	}
} 