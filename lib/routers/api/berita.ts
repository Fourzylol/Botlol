import axios, { AxiosResponse } from "axios";
import cheerio, { CheerioAPI } from "cheerio";
import { KompasTerkini } from "../../typings"

export async function RandomKompas (): Promise <KompasTerkini[]> {
	return new Promise (async (resolve, reject) => {
		try {
			const data: AxiosResponse= await axios({
				url: "https://www.kompas.com/",
				method: "GET",
				headers: {
					'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
				}
			})
			const $: CheerioAPI = cheerio.load(data.data)
			let result: KompasTerkini [] = []
			$("#general-container > div:nth-child(3) > div.col-bs10-7 > div").each((e, su) => {
				$(su).find("div").each(function (ken, tod) {
					let url: string | undefined = $(tod).find("div.article__list__title > h3 > a").attr("href")
					let judul: string = $(tod).find("div.article__list__title > h3 > a").text().trim()
					let tanggal: string = $(tod).find("div.article__list__info > div.article__date").text().trim()
					if (!url) return
					if (!tanggal) return
					const Format: KompasTerkini  = {
						url, judul, tanggal
					}
					result.push(Format)
				})
			})
			return resolve(result)
		} catch (err) {
			return reject(new Error(String(err)))
		}
	})
}