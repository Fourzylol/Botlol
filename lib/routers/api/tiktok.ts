import { TiktokStalk, TiktokDownloaders, Mussically } from '../../typings'
import axios, { AxiosResponse } from 'axios'
import cheerio, { CheerioAPI } from 'cheerio'
import { convertAngka } from "../../functions/function";
import { config } from "dotenv"
config({ path: './env' })

let getCookies: { cookie?: string} = {
	"cookie": process.env.cookieTiktok
}
if (!getCookies?.cookie) getCookies = {}

export async function tiktokDownloader (url: string): Promise <TiktokDownloaders> {
	return new Promise (async (resolve, reject) => {
		try {
			let RegToktok: RegExpMatchArray | null = url.match(/(?:http(?:s|):\/\/|)(?:www\.|)tiktok.com\/@([-_0-9A-Za-z]{3,14})\/video\/([0-9]{8,50})(?:\?is_copy_url=0&is_from_webapp=v1&sender_device=pc&sender_web_id=(?:[0-9]{8,50}))|(?:http(?:s|):\/\/|)(?:vt\.tiktok\.com\/([-_0-9A-Za-z]{3,14}))/g)
			if (!RegToktok) return reject(new Error(String('Url Invalid')))
			const data: AxiosResponse = await axios({
				url: RegToktok[0],
				method: "GET",
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
					... getCookies
				}
			})
			const getNowm: AxiosResponse  = await axios.request({
				url: "https://ttdownloader.com/",
				method: "GET",
				headers: {
					"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
				}
			})
			const c: CheerioAPI = cheerio.load(getNowm.data)
			const token: string | undefined = c("#token").attr('value')
			if (!token) return
			const format: { url: string, format: string, token: string} = {
				url: RegToktok[0],
				format: "",
				token
			}
			const post: AxiosResponse = await axios({
				url: "https://ttdownloader.com/req/",
				method: "POST",
				headers: {
					"accept": "*/*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
					"cookie": getNowm.headers["set-cookie"][0]
				},
				data: new URLSearchParams(Object.entries(format))
			})
			const ch: CheerioAPI = cheerio.load(post.data)
			const FormatPost: { nowm: string | undefined, wm: string | undefined, audio: string | undefined} = {
				nowm: ch("#results-list > div:nth-child(2)").find("div.download > a").attr('href'),
				wm: ch("#results-list > div:nth-child(3)").find("div.download > a").attr('href'),
				audio: ch("#results-list > div:nth-child(4)").find("div.download > a").attr("href")
			}
			const $: CheerioAPI = cheerio.load(data.data)
			const res: Node | any = $('body').find('#__NEXT_DATA__').get()[0].children[0]
			const result = JSON.parse(res.data).props.pageProps.itemInfo.itemStruct
			const Format: TiktokDownloaders = {
				id: result.id,
				desk: result.desc,
				tanggal_buat: new Date(Number(result.createTime) * 1000).toLocaleString("id", {
					year: "numeric",
					month: "short",
					weekday: 'short',
					hour: 'numeric',
					minute: 'numeric',
					day: "numeric"
				}),
				durasi: result.video.duration + " Detik",
				resolusi: result.video.ratio,
				url_with_watermark: result.video.downloadAddr,
				thumbnail: result.video.cover,
				format: result.video.format,
				username: result.author.uniqueId,
				nickname: result.author.nickname,
				foto_profil: result.author. avatarLarger,
				verify: result.author.verified,
				music: {
					...result.music
				},
				statistic: {
					...result.stats
				},
				video_private: result.privateItem,
				duetEnabled: result.duetEnabled,
				stitchEnabled: result. stitchEnabled,
				...FormatPost
			}
			return resolve(Format)
		} catch (err) {
			return reject(new Error(String(err)))
		}
	})
}
export async function Musically (url: string): Promise <Mussically> {
	return new Promise (async (resolve, reject) => {
		try {
			let RegToktok: RegExpMatchArray | null = url.match(/(?:http(?:s|):\/\/|)(?:www\.|)tiktok.com\/@([-_0-9A-Za-z]{3,14})\/video\/([0-9]{8,50})(?:\?is_copy_url=0&is_from_webapp=v1&sender_device=pc&sender_web_id=(?:[0-9]{8,50}))|(?:http(?:s|):\/\/|)(?:vt\.tiktok\.com\/([-_0-9A-Za-z]{3,14}))/g)
			if (!RegToktok) return reject(new Error(String('Url Invalid')))
			const data: AxiosResponse= await axios({
				url: "https://musicaldown.com/id",
				method: "GET",
				headers: {
					'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
				}
			})
			const $: CheerioAPI= cheerio.load(data.data)
			const getPost: AxiosResponse = await axios({
				url: "https://musicaldown.com/id/download",
				method: "POST",
				headers: {
					'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
					"cookie": data.headers["set-cookie"].join("")
				},
				data: new URLSearchParams(Object.entries({
					[`${$("#link_url").attr("name")}`]: url,
					[`${$("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("name")}`]: $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("value"),
					verify: $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(3)").attr("value")
				}))
			})
			const c: CheerioAPI= cheerio.load(getPost.data)
			const Format: Mussically = {
				nowm: c("body > div.welcome.section > div").find("div:nth-child(2) > div.col.s12.l8 > a:nth-child(4)").attr("href"),
				mp4: c("body > div.welcome.section").find("div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(6)").attr("href"),
				original: c("body > div.welcome.section > div").find("div:nth-child(2) > div.col.s12.l8 > a:nth-child(8)").attr("href")
			}
			return resolve(Format)
		} catch(err) {
			throw reject(new Error(String(err)))
		}
	})
}
export async function tiktokStalk(username: string): Promise<TiktokStalk> {
    return new Promise(async (resolve, reject) => {
        const User: string = username.startsWith('@') ? username : '@' + username
        await axios({
            url: `https://www.tiktok.com/${User}?lang=id`,
            method: 'GET',
            headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
				...getCookies
            }
        }).then((data: AxiosResponse) => {
			const $: CheerioAPI = cheerio.load(data.data)
            const res: any = $('body').find('#__NEXT_DATA__').get()[0].children[0]
            const result = JSON.parse(res.data).props.pageProps.userInfo.user
			const Stat = JSON.parse(res.data).props.pageProps.userInfo.stats
			const Format: TiktokStalk = {
				...result,
				follower: convertAngka(Number(Stat.followerCount)),
				following: convertAngka(Number(Stat.followingCount)),
				suka: convertAngka(Number(Stat.heart)),
				total_video: Stat. videoCount,
			}
			resolve(Format)
		}).catch((err: Error) => {
			reject(err)
			})
    })
}
