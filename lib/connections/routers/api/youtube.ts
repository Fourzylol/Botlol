import axios from "axios";
import cheerio from "cheerio";
import ytdl, { videoFormat, videoInfo } from "ytdl-core";
import ytSearch, { SearchResult, VideoMetadataResult, VideoSearchResult } from "yt-search"
import { config } from "dotenv";
import type { ConfigYTSearch  } from "../../../types"
import filesize from "filesize";
config({ path: "./.env"})

export default class Youtube {
	constructor () {};
	public readonly regexYoutubeId: RegExp = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]|\S*[^\w\-\s]))([\w\-]{11})[?=&+%\w-]*/gi;
	public readonly regexYoutube: RegExp = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/;
	public readonly y2Mate = async (url: string, format?: { ext?: "mp4" | "mp3", quality?: "1080" | "720" | "480" | "360" | "240p" | "144p" | "128" }) => {
		return new Promise <import("../../../types").Y2Mate> (async (resolve, reject) => {
			if (format?.ext === "mp3") format.quality = "128";
			if (!format) format = {
				ext: "mp4",
				quality: "720"
			}
			else if (!format.ext) format.ext = "mp4";
			else if (!format.quality) format.quality = "720";
			let getParams, Upload;
			try {
				getParams = (await axios({
					url: "https://www.y2mate.com/mates/id104/analyze/ajax",
					method: "POST",
					headers: {
						"accept": "*/*",
						"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
						"User-Agent": globalThis.UserAgent
					},
					data: new URLSearchParams(Object.entries({
						url,
						q_auto: "0",
						ajax: "1"
					}))
				})).data.result;
				Upload = (await axios({
					url: "https://www.y2mate.com/mates/convert",
					method: "POST",
					data: new URLSearchParams(Object.entries({
						type: 'youtube',
						_id: getParams.split(/var k__id = /)[1].split(";")[0].replace(/[\"\']/gi, "") as string,
						v_id: (this.regexYoutubeId.exec(url) as RegExpExecArray)[1],
						ajax: "1",
						token: '',
						ftype: format.ext as string,
						fquality: format.quality as string
					}))
				})).data.result;
			} catch (err) {
				return reject(err)
			} finally {
				if (!Upload) return reject(new Error("No Upload found"))
				return resolve({
					link: ((await import("../../../functions/functions")).ExtractAndCheckUrl(Upload).url)?.[0],
					thumb: cheerio.load(getParams)('div.thumbnail.cover').find('a > img').attr('src') || '',
					size: cheerio.load(getParams)('#mp4 > table > tbody > tr:nth-child(2) > td:nth-child(2)').text(),
					data: (await axios({
						url: ((await import("../../../functions/functions")).ExtractAndCheckUrl(Upload).url)?.[0],
						method: "GET",
						headers: {
							'User-Agent': globalThis.UserAgent
						},
						responseType: "arraybuffer",
						httpsAgent: new((await import("https")).Agent)({
							rejectUnauthorized: false
						})
					})).data
				} as import("../../../types").Y2Mate)
			}
		})
	};
	public readonly ytdlCore = async (url: string, respon: "audio" | "video"): Promise <import("../../../types").YoutubeDlCore | undefined> => {
		let data: videoInfo = await ytdl.getInfo(url, {
			requestOptions: {
				headers: {
					"User-Agent": globalThis.UserAgent,
					"cookie": process.env.xclientdata_youtube,
					"x-client-data": process.env.cookies_youtube
				}
			}
		});
		let Format: videoFormat | undefined;
		if (respon === "audio") Format =  ytdl.filterFormats(data.formats, "audio").find((result => result.audioQuality === "AUDIO_QUALITY_MEDIUM"));
		else if (respon === "video") Format = ytdl.filterFormats(data.formats, "video").find((result) => result.mimeType?.startsWith("video/mp4"))
		if (!Format) return;
		const size: string = filesize(Number(Format.contentLength))
		return {
			title: data.videoDetails.title,
			quality: Format.quality,
			size: size,
			format: Format.container,
			down: Format.url,
			like: Number(data.videoDetails.likes),
			dislike: Number(data.videoDetails.dislikes),
			viewers: Number(data.videoDetails.viewCount),
			category: data.videoDetails.category,
			rilis: data.videoDetails.category,
			video_url: data.videoDetails.video_url,
			channel: data.videoDetails.ownerChannelName,
			durasi: data.videoDetails.lengthSeconds,
			thumbnail: data.videoDetails.thumbnails.find((filter) => filter.width === 1920)?.url,
			desk: data.videoDetails.description
		} as import("../../../types").YoutubeDlCore
	}
	public readonly ytSearch = async (config: ConfigYTSearch): Promise <VideoMetadataResult | VideoMetadataResult[] | SearchResult | VideoSearchResult[] | VideoSearchResult> => {
		return new Promise <VideoMetadataResult | VideoMetadataResult[] | SearchResult | VideoSearchResult[] | VideoSearchResult>(async (resolve) => {
			let engine: Promise<SearchResult|VideoMetadataResult> | null;
			if ("querry" in config) engine = ytSearch(config.querry);
			else if ("videoId" in config) engine = ytSearch({ videoId: config.videoId });
			else if ("url" in config && this.regexYoutube.exec(config.url)) engine = ytSearch({videoId: String(this.regexYoutubeId.exec(config.url)?.[1])});
			else engine = null;
			if (!engine) return;
			const result: SearchResult | VideoMetadataResult = (await Promise.all([engine]))[0];
			if ("querry" in config && config.infoAll) {
				let data: Array<VideoMetadataResult> = new Array();
				for (const Index of (result as SearchResult).videos) {
					data.push(await ytSearch({ videoId: Index.videoId }))
				}
				if ("getFirst" in config && config.getFirst) return resolve(data[0]);
				else return resolve(data);
			} else if ("querry" in config) {
				if ("getFirst" in config && config.getFirst) return resolve((result as SearchResult).videos[0]);
				else return resolve((result as SearchResult).videos);
			} else {
				return resolve(result);
			}
		});
	}
}