export declare class TiktokStalk {
    id: string
    shortId: string
    uniqueId: string
    nickname: string
    avatarLarger: string
    avatarMedium: string
    avatarThumb: string
    signature: string
    createTime: number
    verified: boolean
    secUid: string
    ftc: boolean
    relation: number
    openFavorite: boolean
    bioLink: {
        link: string
        risk: number
    }
    commentSetting: number
    duetSetting: number
    stitchSetting: number
    privateAccount: boolean
    secret: boolean
    isADVirtual: boolean
    roomId: string
	follower: number
	following: number
	suka: number
	total_video: number
}
export declare class MusikTiktok {
	id: string
	title: string
	playUrl: string
	coverLarge: string
	coverMedium: string
	coverThumb: string
	authorName: string
	original: boolean
	duration: number
	album: string
	scheduleSearchTime: number
}
export interface StatistikTiktok {
	diggCount: number
	shareCount: number
	commentCount: number
	playCount: number
}
export declare class TiktokDownloaders {
	id: string;
	desk: string;
	tanggal_buat: string;
	durasi: string;
	resolusi: string;
	url_with_watermark: string;
	thumbnail: string;
	format: string;
	username: string;
	nickname:  string;
	foto_profil: string;
	verify: boolean;
	music: MusikTiktok;
	statistic: StatistikTiktok
	video_private: boolean
	duetEnabled: boolean
	stitchEnabled: boolean
	nowm: string | undefined
	wm: string | undefined
	audio: string | undefined
}

export interface Mussically {
	nowm: string | undefined;
	mp4: string | undefined;
	original: string | undefined;
}