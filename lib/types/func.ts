export interface ExtractUrlType {
	url?: Array<string|never>;
	isDetect?: boolean;
	get first_url(): string;
}

export interface Log {
	error: (text: any) => void
	warn: (text: any) => void
	info: (msg: any, ...optionalParams: any[]) => void
	log: (text: any) => void
}