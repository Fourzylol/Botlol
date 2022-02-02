export interface Y2Mate {
	link: string;
	thumb: string;
	size: string;
	data: Buffer;
}
export declare interface YoutubeDlCore {
	title: string;
	quality: string;
	size: string;
	format: string;
	down: string;
	like: Number;
	dislike: Number;
	viewers: Number;
	category: string;
	rilis: string;
	video_url: string
	channel: string;
	durasi: string;
	thumbnail: string;
	desk: string;
}

export declare type ConfigYTSearch = ({ querry: string, infoAll?: boolean } | { videoId: string } | { url: string }) & { getFirst?: boolean };