import axios, { AxiosResponse, AxiosPromise } from 'axios'
import cheerio, { CheerioAPI } from 'cheerio'
import FormData from 'form-data'
import * as fs from 'fs'
import { isUrl } from '../../functions/function';
import { ToUrlUguuse } from "../../typings"

export async function ToVideo(path: string): Promise<{ status: number; data: string } | Error> {
    return new Promise(async (resolve, reject) => {
		const Form: FormData = new FormData()
        Form.append('new-image', fs.createReadStream(path))
        Form.append('new-image-url', '')
        const upload: AxiosResponse = await axios({
            url: 'https://s7.ezgif.com/webp-to-mp4',
            method: 'POST',
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
                ...Form.getHeaders()
            },
            data: Form
        })
        if (upload.status !== 200) return reject(new Error(`Error status code : ${upload.status}`))
        const $: CheerioAPI = cheerio.load(upload.data)
        const NamaFile: string | undefined = $('form').find('input[type=hidden]:nth-child(1)').attr('value')
        const Format: { file: string | undefined, token: string | undefined, convert: string | undefined }| any = {
            file: NamaFile,
            token: $('form').find(' input[type=hidden]:nth-child(2)').attr('value'),
            convert: $('#tool-submit-button').find('input').attr('value')
        }
        const data: AxiosResponse = await axios({
            url: 'https://ezgif.com/webp-to-mp4/' + NamaFile,
            method: 'POST',
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36'
            },
            data: new URLSearchParams(Object.entries(Format))
        })
        if (data.status !== 200) reject(new Error(`Error status code : ${data.status}`))
        const ch: CheerioAPI = cheerio.load(data.data)
        const result: { status: number; data: string } = {
            status: data.status,
            data: 'https:' + ch('#output > p.outfile').find('video > source').attr('src')
        }
        resolve(result)
    })
}
export async function gifToWebp(input: string): Promise<{ status: number; data: string }> {
    return new Promise(async (resolve, reject) => {
        const result: { status: number; data: string } = {
            status: 200,
            data: ''
        }
        resolve(result)
    })
}
export async function videoToWebp(input: string): Promise<{ status: number; data: string }> {
    return new Promise(async (resolve, reject) => {
        const Form: FormData = new FormData()
        Form.append('new-image', fs.createReadStream(input))
        Form.append('new-image-url', '')
        const upload: AxiosResponse = await axios({
            url: 'https://s7.ezgif.com/video-to-webp',
            method: 'POST',
            headers: {
                ...Form.getHeaders(),
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36'
            },
            data: Form
        })
        if (upload.status !== 200) return reject(new Error('ERROR Status Code: ' + upload.status))
        const $: CheerioAPI = cheerio.load(upload.data)
        const NamaFile: string | undefined = $('form').find('input[type=hidden]:nth-child(1)').attr('value')
        const Format: { file: string | undefined, token: string | undefined, convert: string | undefined, size: string, fps: string, loop: string, start: string, end: string } | any = {
            file: NamaFile,
            token: $('form').find(' input[type=hidden]:nth-child(2)').attr('value'),
            convert: $('#tool-submit-button').find('input').attr('value'),
            size: '320p',
            fps: '10',
            loop: 'off',
            start: '0',
            end: '10'
        }
        const data: AxiosResponse = await axios({
            url: 'https://ezgif.com/video-to-webp/' + Format.file + '?ajax=true',
            method: 'POST',
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36'
            },
            data: new URLSearchParams(Object.entries(Format))
        })
        if (data.status !== 200) return reject(new Error('ERROR Status Code: ' + upload.status))
        const ch: CheerioAPI = cheerio.load(data.data)
        const result: { status: number; data: string } = {
            status: data.status,
            data: 'https:' + ch('p.outfile').find('img').attr('src')
        }
        resolve(result)
    })
}
export async function ToGif(file: string): Promise<{ status: number; data: string } | Error> {
    return new Promise(async (resolve, reject) => {
        const Form: FormData = new FormData()
        Form.append('new-image', fs.createReadStream(file))
        Form.append('new-image-url', '')
        const upload: AxiosResponse = await axios.post('https://s7.ezgif.com/webp-to-gif', Form, {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
                ...Form.getHeaders()
            }
        })
        if (upload.status !== 200) return reject(new Error('ERROR STATUS CODE : ' + upload.status))
        const $: CheerioAPI = cheerio.load(upload.data)
        const NamaFile: string | undefined = $('form').find('input[type=hidden]:nth-child(1)').attr('value')
        const Format: { file: string | undefined; token: string | undefined } | any = {
            file: NamaFile,
            token: $('form').find(' input[type=hidden]:nth-child(2)').attr('value')
        }
        const data: AxiosResponse = await axios({
            url: 'https://ezgif.com/webp-to-gif/' + NamaFile + '?ajax=true',
            method: 'POST',
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36'
            },
            data: new URLSearchParams(Object.entries(Format))
        })
        if (data.status !== 200) return reject(new Error('ERROR STATUS CODE : ' + data.status))
        const ch: CheerioAPI = cheerio.load(data.data)
        const result: { status: number; data: string } = {
            status: data.status,
            data: 'https:' + ch('p.outfile').find('img').attr('src')
        }
        resolve(result)
    })
}
export async function pngToWebp(File: string): Promise<{ status: number; hasil: string } | Error> {
    return new Promise(async (resolve, reject) => {
        if (isUrl(File)) {
            const getData: AxiosResponse = await axios({
                method: 'GET',
                url: 'https://ezgif.com/png-to-webp?url=' + File
            })
            if (getData.status !== 200) return reject(new Error(`Error status code : ${getData.status}`))
            const $: CheerioAPI = cheerio.load(getData.data)
            const form: FormData = new FormData()
            const file: string | undefined = $('input[name="file"]').attr('value')
            const token: string | undefined = $('input[name="token"]').attr('value')
            const actionpost: string | undefined = $('form[class="form ajax-form"]').attr('action')
            form.append('file', file)
            form.append('token', token)
            form.append('convert', 'Convert PNG to WebP!')
            const postData: AxiosResponse = await axios({
                method: 'POST',
                url: actionpost,
                data: form,
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`
                }
            })
            if (postData.status !== 200) return reject(new Error(`Error status code : ${postData.status}`))
            const ch: CheerioAPI = cheerio.load(postData.data)
            const result: { status: number; hasil: string } = {
                status: postData.status,
                hasil: 'https:' + ch('div[id="output"]').find('p').first().find('img').attr('src')
            }
            resolve(result)
        } else {
            const Form: FormData = new FormData()
            Form.append('new-image', fs.createReadStream(File))
            Form.append('new-image-url', '')
            const upload = await axios({
                url: 'https://s7.ezgif.com/jpg-to-webp',
                method: 'POST',
                headers: {
                    ...Form.getHeaders(),
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36'
                },
                data: Form
            })
            if (upload.status !== 200) return reject(new Error(`Error status code : ${upload.status}`))
            const $: CheerioAPI = cheerio.load(upload.data)
            const NamaFile: string | undefined = $('form').find('input[type=hidden]:nth-child(1)').attr('value')
            const Format: { file: string | undefined; token: string | undefined } | any = {
                file: NamaFile,
                token: $('form').find(' input[type=hidden]:nth-child(2)').attr('value')
            }
            const data: AxiosResponse = await axios({
                url: 'https://s7.ezgif.com/jpg-to-webp/' + NamaFile + '?ajax=true',
                method: 'POST',
                headers: {
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36'
                },
                data: new URLSearchParams(Object.entries(Format))
            })
            if (data.status !== 200) return reject(new Error(`Error status code : ${data.status}`))
            const ch: CheerioAPI = cheerio.load(data.data)
            const result: { status: number; hasil: string } = {
                status: data.status,
                hasil: 'https:' + ch('p.outfile').find('img').attr('src')
            }
            resolve(result)
        }
    })
}
export async function TelegraPh (Path: string) {
	return new Promise (async (resolve, reject) => {
		if (!fs.existsSync(Path)) return reject(new Error("File not Found"))
		try {
			const BodyForm: FormData = new FormData();
			BodyForm.append("file", fs.createReadStream(Path))
			const data: AxiosResponse = await  axios({
				url: "https://telegra.ph/upload",
				method: "POST",
				headers: {
					...BodyForm.getHeaders()
				},
				data: BodyForm
			})
			return resolve("https://telegra.ph" + data.data[0].src)
		} catch (err) {
			return reject(new Error(String(err)))
		}
	})
}
export async function ToUrluguuse (Path: string): Promise <ToUrlUguuse> {
	return new Promise (async (resolve, reject) => {
		if (!fs.existsSync(Path)) return reject(new Error("File not Found"))
		const BodyForm: FormData = new FormData();
		BodyForm.append("files[]", fs.createReadStream(Path))
		const data: AxiosResponse = await  axios({
			url: "https://uguu.se/upload.php",
			method: "POST",
			headers: {
				...BodyForm.getHeaders()
			},
			data: BodyForm
		})
		return resolve(data.data.files[0])
	})
}