import axios, { AxiosResponse } from "axios";
import cheerio, { CheerioAPI, Element } from "cheerio";
import { UserAgent } from "../../functions/function";
import { GempaBMKG, CuacaWilayah, CuacaInfo } from "../../typings"


export const GempaInfo = async (): Promise <GempaBMKG[]> => {
	return new Promise (async (resolve, reject) => {
		try {
			const data: AxiosResponse= await axios({
				url: "https://www.bmkg.go.id/gempabumi/gempabumi-terkini.bmkg",
				method: "GET",
				headers: {
					"User-Agent": UserAgent()
				}
			})
			const $: CheerioAPI = cheerio.load(data.data)
			const hasil: GempaBMKG[] = []
			$("body > div.wrapper > div.container.content > div").find("div.col-md-8 > div > div > table > tbody").each(function (a: number, b: Element) {
				$(b).find("tr").each(function (contol: number, ayam: Element) {
					let waktu: string = $(ayam).find("td:nth-child(2)").text()
					let lintang: string = $(ayam).find("td:nth-child(3)").text()
					let bujur: string = $(ayam).find("td:nth-child(4)").text()
					let kedalaman: string = $(ayam).find("td:nth-child(6)").text()
					let wilayah: string = $(ayam).find("td:nth-child(7)").text()
					const Format: GempaBMKG = { waktu, lintang, bujur, kedalaman, wilayah}
					hasil.push(Format)
				})
			})
			return resolve(hasil)
		} catch (err) {
			return reject(new Error(String(err)))
		}
	})
}
export const Cuaca = async (wilayah?: string): Promise <CuacaInfo[]> => {
	return new Promise (async (resolve, reject) => {
		return await checkWilayahCuaca(wilayah).then(async (data: CuacaWilayah) => {
			return await CuacagetInfo(data.url).then((values: CuacaInfo[]) => {
				return resolve(values)
			}).catch((err) => reject(new Error(err)))
		}).catch((err) => reject(new Error(err)))
	})
}
export const CuacagetInfo =  async  (url: string): Promise <CuacaInfo[]> => {
	return new Promise (async (resolve, reject) => {
		try {
			const data: AxiosResponse = await axios({
				url: url,
				method: "GET",
				headers: {
					"User-Agent": UserAgent(),
				}
			})
			const $: CheerioAPI= cheerio.load(data.data)
			let hasil: CuacaInfo[] = []
			$("div.table-responsive > table > tbody").each(function (a: number, b: Element) {
				$(b).find("tr").each(function (red: number, velvet: Element) {
					const Format: CuacaInfo = {
						kota: $(velvet).find("td:nth-child(1) > a").text(),
						waktu: {
							pagi: $(velvet).find("td:nth-child(2) > span").text(),
							siang: $(velvet).find("td:nth-child(3) > span").text(),
							malam: $(velvet).find("td:nth-child(4) > span").text(),
							dini_hari: $(velvet).find("td:nth-child(5) > span").text()
						},
						suhu:  $(velvet).find("td:nth-child(6)").text() + " °C",
						kelembapan: $(velvet).find("td:nth-child(7)").text() + " %"
					}
					hasil.push(Format)
				})
			})
			return resolve(hasil)
		} catch (err) {
			throw reject(new Error(String(err)))
		}
	})
}
export const checkWilayahCuaca = (wilayah?: string): Promise<CuacaWilayah> => {
	return new Promise (async (resolve, reject) => {
		try {
			const data: AxiosResponse = await axios({
				url: "https://www.bmkg.go.id/cuaca/prakiraan-cuaca-indonesia.bmkg",
				method: "GET",
				headers: {
					"User-Agent": UserAgent()
				}
			})
			const $: CheerioAPI= cheerio.load(data.data)
			const hasil: CuacaWilayah[] = []
			$("body > div.wrapper > div.container.content > div > div.col-md-8.margin-bottom-20 > div > div.row.list-cuaca-provinsi.md-margin-bottom-10").each(function (a: number, b: Element) {
				$(b).find("div").each(function (contol: number, ayam: Element) {
					let url : string | undefined = $(ayam).find("a").attr("href");
					if (!url) return
					let provinsi: RegExpExecArray | null | string = /NamaProv=([-_0-9A-Za-z ]{0,24})/gi.exec(String(url))
					if (provinsi) provinsi = provinsi[1] as string
					url = "https://www.bmkg.go.id/cuaca/prakiraan-cuaca-indonesia.bmkg" + url as string
					hasil.push({ url, provinsi})
				})
			})
			let respon: CuacaWilayah[] | CuacaWilayah | undefined = hasil
			respon = hasil.find((value: CuacaWilayah) => new RegExp(String(wilayah), "i").test(String(value.provinsi))) ? hasil.find((value: CuacaWilayah) => new RegExp(String(wilayah), "i").test(String(value.provinsi))) : hasil.find((value: CuacaWilayah) => new RegExp("indonesia", "i").test(String(value.provinsi)))
			return resolve(respon as CuacaWilayah)
		} catch (err) {
			return reject(new Error(String(err)))
		}
	})
}