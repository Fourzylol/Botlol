import got, { Response } from 'got'
import cheerio, { CheerioAPI } from 'cheerio'
import { LirikResult, LirikSearching, Azlirik } from '../../typings';
import proxyAgent from "https-proxy-agent";

const MusicMatchReg: RegExp = /(?:http(?:s|):\/\/|)(?:www\.|)musixmatch.com/
const getJudul: RegExp = /.\/(.)\/(.*)$/
export async function LirikLagu(judul: string): Promise<LirikResult | undefined> {
    return new Promise(async (resolve, reject) => {
		const Agent = proxyAgent({ port: "", host: "36.94.13.63"})
        await got({
            url: 'https://www.musixmatch.com/search/' + judul,
            method: 'GET',
            headers: {
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
            },
			port: 3128,
			host: "36.94.13.63"
        }).then((respon): void => {
			const c: CheerioAPI = cheerio.load(respon.body)
            const Url: string | undefined = c('#search-all-results > div.main-panel > div:nth-child(1)').find('div.box-content > div > ul > li > div > div.media-card-body > div > h2 > a').attr('href')
            if (Url === undefined) return resolve(undefined)
			got('https://www.musixmatch.com' + Url, {
				method: 'GET',
                headers: {
					'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
				},
				port: 3128,
				host: "36.94.13.63"
			}).then((response): void => {
				const $: CheerioAPI = cheerio.load(response.body)
                const title: string = $('div.mxm-track-banner.top > div > div > div > div').find('div.track-title-header > div.mxm-track-title').find('h1').text().trim().replace(/Lyrics/, '')
                const thumbnail: string = 'https:' + $('div.mxm-track-banner.top > div > div > div').find('div > div > div > div > img').attr('src')
                const artist: string = $('div.mxm-track-banner.top > div > div > div > div').find('div.track-title-header > div.mxm-track-title > h2 > span').text().trim()
                const lirik: string = $('div.mxm-track-lyrics-container > div.container > div > div > div').find('div > div.mxm-lyrics > span').text().trim()
                const Format: LirikResult = {
					status: response.statusCode,
					author: 'I`am Ra',
                    result: {
						title,
						thumbnail,
                        artist,
                        lirik
					}
				}
				resolve(Format)
			}).catch((err) => reject(new Error(err)))
		}).catch((err) => reject(new Error(err)))
    })
}
export async function LirikInfo(Url: string): Promise<LirikResult | undefined | null> {
    return new Promise(async (resolve, reject) => {
        if (!MusicMatchReg.test(Url)) return resolve(null)
        await got({
            url: Url,
            method: 'GET',
            headers: {
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
            },
			port: 3128,
			host: "36.94.13.63"
        }).then((response): void => {
			const $: CheerioAPI = cheerio.load(response.body)
            const title: string = $('div.mxm-track-banner.top > div > div > div > div').find('div.track-title-header > div.mxm-track-title').find('h1').text().trim().replace(/Lyrics/, '')
            const thumbnail: string = 'https:' + $('div.mxm-track-banner.top > div > div > div').find('div > div > div > div > img').attr('src')
            const artist: string = $('div.mxm-track-banner.top > div > div > div > div').find('div.track-title-header > div.mxm-track-title > h2 > span').text().trim()
            const lirik: string = $('div.mxm-track-lyrics-container > div.container > div > div > div').find('div > div.mxm-lyrics > span').text().trim()
            const Format: LirikResult = {
				status: response.statusCode,
                author: 'I`am Ra',
                result: {
					title,
                    thumbnail,
                    artist,
                    lirik
                }
            }
			resolve(Format)
		}).catch((err) => reject(new Error(err)))
    })
}
export async function LirikSearch(judul: string): Promise<LirikSearching[]> {
    return new Promise(async (resolve, reject) => {
        await got({
            url: 'https://www.musixmatch.com/search/' + judul,
            method: 'GET',
            headers: {
                'user-agent':
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
            },
			port: 3128,
			host: "36.94.13.63"
        }).then((respon): void => {
			const $: CheerioAPI = cheerio.load(respon.body)
            const result: LirikSearching[] = []
			$('#search-all-results > div.main-panel').find('div:nth-child(2) > div.box-content > div > ul').each(function (san, sana) {
				$(sana).find('li').each(function (tyu, mina) {
					const url: string = 'https://www.musixmatch.com' + $(mina).find('div > div.media-card-body > div > h2 > a').attr('href')
                    const title: string = $(mina).find('div > div.media-card-body > div > h2 > a > span').text().trim()
                    const thumb: string | undefined = $(mina).find('div > div.media-card-picture > img').attr('srcset') || $(mina).find('div > div.media-card-picture > img').attr('src')
                    const artist: string = $(mina).find('div > div.media-card-body > div > h3 > span > span > a').text().trim()
                    const Format: LirikSearching = {
						title,
						thumb,
                        artist,
                        url
					}
					result.push(Format)
				})
			})
			resolve(result)
		}).catch((err) => reject(new Error(err)))
    })
}
export async function AzLirik(judul: string): Promise<Azlirik> {
    return new Promise(async (resolve, reject) => {
        try {
            const search: Response<string> = await got('https://search.azlyrics.com/search.php?q=' + judul, {
                method: 'GET',
                headers: {
                    'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
                }
            })
            if (search.statusCode !== 200) return reject(new Error(String(search.statusCode)))
            const $: CheerioAPI = cheerio.load(search.body)
            let Link: string[] = []
            $('body > div.container.main-page > div > div > div:nth-child(1) > table > tbody').each(function (tyu, b) {
				$(b).find('tr').each(function (oh, begitu) {
					let Url: string | undefined = $(begitu).find('td > a').attr('href')
                    if (Url == undefined) return
                    Link.push(Url)
				})
            })
            const data: Response<string> = await got(Link[0], {
                method: 'GET',
                headers: {
                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
                },
				port: 3128,
				host: "36.94.13.63"
            })
            if (data.statusCode !== 200) return reject(new Error(String(search.statusCode)))
            const ch: CheerioAPI = cheerio.load(data.body)
            const Judul: string = ch('body > div.container.main-page').find('div > div > b').text()
            const Lirik: string = ch('body > div.container.main-page').find('div > div > div:nth-child(8)').text()
            const Artist: string = ch('body > div.container.main-page').find('div > div> div.lyricsh > h2 > a > b').text().trim().replace(/Lyrics/gi, '')
            const Format: Azlirik = {
                title: Judul,
                artis: Artist,
                lirik: Lirik
            }
            resolve(Format)
        } catch (err) {
            reject(err)
        }
    })
}
