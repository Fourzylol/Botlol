import wiki from "wikipedia";

export async function Wikipedia (title: string): Promise <{ url: string, judul: string, publish: string, desk: string, thumb: string, penjelasan: string}> {
	return new Promise (async (resolve, reject) => {
		try {
			await wiki.setLang("id")
			const data = await wiki.page(title)
			const respon = await data.summary()
			const Format: { url: string, judul: string, publish: string, desk: string, thumb: string, penjelasan: string} = {
				url: respon.content_urls.desktop.page,
				judul: respon.title,
				publish: respon.timestamp,
				desk: respon.description,
				thumb: respon?.originalimage?.source ?? respon.thumbnail.source,
				penjelasan: respon.extract
			}
			return resolve(Format)
		} catch (err) {
			return reject(new Error(String(err)))
		}
	})
}