import Sticker from "wa-sticker-formatter";


export default class createSticker {
	constructor (public default_config?: import("../types").StickerMetadata) {
		if (this.default_config) {
			if (!this.default_config?.author) this.default_config.author = " ";
			if (!this.default_config.pack) this.default_config.pack = "RA BOT";
			if (!this.default_config.type) this.default_config.type = "crop"
		}
	}
	public readonly convertSticker = async (file: string | Buffer, toFile?: string): Promise <Buffer | string> => {
		return new Promise <Buffer | string> (async(resolve, reject) => {
			try {
				const sticker: Sticker = new Sticker(file, this.default_config);
				if (toFile) resolve(await sticker.toFile(toFile))
				else resolve(await sticker.build())
			} catch (err) {
				throw reject(err)
			}
		})
	}
} 