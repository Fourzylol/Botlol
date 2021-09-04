export interface ArtisList {
	id: string;
	name: string;
}
export interface JooxImages {
	width: number;
	height: number;
	url: string;
}
export interface Joox {
	album_id: string;
	id: string;
	name: string;
	album_name: string;
	artist_list: ArtisList[];
	play_duration: number;
	images: JooxImages[];
	vip_flag: number;
	is_playable: boolean;
	track_free_action_control: number;
}
export declare class JooxAll {
	item_list: JooxItems [];
	section_type: number;
    section_title: string;
}
export interface JooxItems {
	type: number;
	song: SongInfo[];
}
export interface SongInfo {
	song_info: Joox;
	lyric: string;
}