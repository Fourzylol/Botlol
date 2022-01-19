export interface ExtractUrlType {
	url?: Array<string|never>;
	isDetect?: boolean;
	get first_url(): string;
}