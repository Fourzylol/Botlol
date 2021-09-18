export declare interface GempaBMKG  {
	waktu: string;
    lintang: string;
    bujur: string;
    kedalaman: string;
    wilayah: string;
}
export declare interface CuacaWilayah {
	url: string;
    provinsi: string | null;
}
export declare interface CuacaInfo {
	kota: string;
	waktu: CuacaWaktu;
	suhu: string;
	kelembapan: string;
}
export interface CuacaWaktu {
	pagi: string;
	siang: string;
	malam: string;
	dini_hari: string;
}