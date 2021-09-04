import axios, { AxiosResponse } from "axios";
import { JooxAll, JooxItems, SongInfo, Joox  } from "../../typings";


export async function JooxSearch (title: string): Promise <Joox[]> {
	return new Promise (async (resolve, reject) => {
		try {
			const data: AxiosResponse = await axios({
				url: encodeURI(`https://api-jooxtt.sanook.com/openjoox/v3/search?country=id&lang=id&keyword=${title}`),
				method: "GET",
				headers: {
					"accept": "application/json, text/plain, */*",
					'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
				}
			})
			let result: Joox[] = []
			data.data.section_list.find((values: JooxAll) => values.section_title === "Lagu"). item_list.map((values: JooxItems) => values.song.map((value: SongInfo) => value.song_info)).map((value: Joox[]) => { result.push(value[0])})
			if (!result[0]) return reject(new Error("Respon kosong"))
			return resolve(result)
		} catch (err) {
			return reject(new Error(String(err)))
		}
	})
}