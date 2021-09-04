import { instaStalk, TiktokStalk, LirikResult, Azlirik,  GhStalk, Googlesearch, Question, Answer, PlayStore, youtubeDlCore, YoutubeMP3PlaySer2, YoutubeMP4PlaySer2, IgPostDown, IgReelsDown, IgTvDown, FaceBookDown,  TiktokDownloaders, ToUrlUguuse, Joox, KompasTerkini } from '../typings'
import { ChannelSearchResult, VideoSearchResult  } from 'yt-search'
import { WAGroupMetadata, WAGroupParticipant } from '@adiwajshing/baileys'
import parsems from 'parse-ms';
import moment from "moment-timezone";
import { convertAngka } from "../functions/function";
import { ITranslateResponse, languages } from "@vitalets/google-translate-api"
const html = require("html-filter");

moment.tz.setDefault('Asia/Jakarta').locale('id')


export const IndTest = (): string => {
    return `Test`
}
export const IndTungguDown = (Type: string) => {
	return `*⏳* Tunggu sebentar sedang mengeksekusi link ${Type}`
}
export const GaSuppotrFb = () => {
	return `*「❗」* Mohon maaf kak untuk saat ini downloader facebook hanya support link dengan type videos`
}
export const IndBlomSupport = () => {
	return `*「❗」* Mohon maaf kak link yang kakak masukkan belum support untuk fitur downloader`
}
export const IndTunggu = (): string => {
	let kata: string[] = [
		`Tunggu sebentar sedang menjalankan perintah...`,
		`Mohon tunggu sebentar ya kak bot sedang mengeksekusi perintah`,
		`Tunggu sebentar ya kak`,
		`Harap tunggu sebentar bot sedang mengeksekusi perintah`,
		`Mohon tunggu sebentar bot sedang melaksanakan perintah`,
		`Harap tunggu sesaat bot sedang melaksanakan perintah anda`
	];
	let Loading: string[] = [
		`*⏳*`, `*⌛*`, `*⏱*`, `*⏲*`, `*🕰*`, `*🕔*`, `*🕖*`, `*🕙*`, `*🕧*`, `*🕞*`
	]
    return Loading[Math.floor(Math.random() * (Loading.length))] + " " + kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndBukanVid = (): string => {
    return `Maaf file yang anda kirim bukan berformat video`
}
export const IndBukanAud = (): string => {
	let kata: string[] = [
		`*「❗」* Maaf kak untuk menggunakan perintah ini harap reply audio dengan caption`,
		`*「❗」*  Maaf kak harap reply audio menggunakan caption`,
		`*「❗」*  Maaf kak bot tidak dapat melaksanakan perintah dikarenakan bot tidak menerima audio`
	]
    return  kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndSuccesToVid = (Proses: string) => {
	let Success: string[] = [
		`*✅*`,
		`*✔*`
	]
	let kata: string[] = [
		`Success mengubah sticker menjadi video dengan waktu ${Proses}`,
		`Berhasil mengubah sticker menjadi video dalam waktu ${Proses}`,
		`Berhasil melaksanakan perintah dengan waktu ${Proses}`
	]
	return Success[Math.floor(Math.random() * (Success.length))] + " " + kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndToVid = (): string => {
	let kata: string[] = [
		`*「❗」*  Maaf kak terjadi kesalahan saat conversi sticker menjadi video harap gunakan media yang lain`,
		`*「❗」*  Mohon maaf kak terjadi kesalahan saat conversi sticker menjadi video harap gunakan media yang berbeda ya kak makasih 🙏🏻`,
		`*「❗」*  Maaf kak ada terjadi error saat bot ingin conversi sticker menjadi video harap ganti media ya kak`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndToCute = (): string => {
    return `Maaf terjadi kesalahan pada fitur media tocute harap coba lagi`
}
export const IndSuccesSetPrefix = (prefix: string, status: boolean): string => {
    return `Sukses mengubah prefix menjadi ${prefix}.\n\n*Status Prefix saat ini :* ${status ? 'multi' : prefix}`
}
export const IndSuccesSetMulti = (status: boolean): string => {
    return `Sukses  ${status ? 'Mengaktifkan mode multi prefix' : 'Menonaktifkan mode multi prefix'}`
}
export const IndErrMulti = (status: boolean): string => {
    return `${
        status
            ? 'Anda sudah berada dalam mode multi prefix'
            : 'Anda sudah berada dalam mode non multi prefix check prefix anda, ketik prefix'
    }`
}
export const IndDonePushMulti = (Prefix: string): string => {
    return `Sukses menambakan prefix *[${Prefix}]* kedalam multi prefix`
}
export const IndErrPushMulti = () => {
    return `Harap masukkan prefix yang ingin di tambahkan kedalam multi prefix`
}
export const IndDoneDelMulti = (Prefix: string): string => {
    return `Berhasil menghapus prefix *[${Prefix}]* dalam multi prefix`
}
export const IndErrDelMulti = (): string => {
    return `Harap masukkan prefix yang ingin di dihapus dalam multi prefix`
}
export const IndMultiData = (prefix: string): string => {
    return `Multi Prefix saat ini adalah *${prefix}*`
}
export const IndBukanSticker = (caption: string): string => {
	let kata: string[] = [
		`*「❗」* Mohon maaf ka reply sticker dengan caption *${caption}*, untuk menggunakan perintah ini`,
		`*「❗」* Mohon maaf ka Kaka tidak reply sticker apapun harap reply sticker dengan caption *${caption}*, untuk menggunakan perintah ini`,
		`*「❗」* Mohon maaf ka harap reply sticker dengan caption *${caption}*, untuk menggunakan perintah ini`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndGagalSticker = (): string => {
	let kata: string[] = [
		`*「❗」*  Maaf ka terjadi kesalahan / error saat process membuat sticker harap ganti media lain`,
		`*「❗」*  Mohon maaf ka terjadi error saat prosess membuat sticker harap ganti media lainnya kak`,
		`*「❗」*  Maaf ka bot tidak dapat membuat sticker pada media itu harap ganti medianya kak`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndFileGede = (sender: string): string => {
    return `Maaf ka @${sender.replace(/@s.whatsapp.net/i, '')} Size media yang anda kirim terlalu besar untuk bot`
}
export const LimitStorage = (): string => {
    return `Maaf, Limit storage anda telah habis. Agar anda bisa menggunakan kembali harap hapus salah satu media anda untuk menambah limit storage`
}
export const IndIdDuplicate = (): string => {
    return `Maaf, Id yang anda masukkan sudah ada di penyimpanan bot harap ganti dengan id lain`
}
export const IndSuccesSave = (Id: string, Prefix: string, isOwner: boolean, limit: number): string => {
    return `
*ID :* ${Id}
*STATUS :* Berhasil menyimpan media ketik ${Prefix}get ${Id} untuk mengambil file anda
*NOTES*
Sisa Limit File anda tersisa  ${
        isOwner ? 'Unlimited' : Number(4 - limit)
    }, jika habis anda tidak dapat menyimpan kembali`
}
export const IndMasukkanId = (): string => {
    return `Harap masukkan id`
}
export const IndIdStorageKosong = (): string => {
    return `Maaf id storage yang ingin anda cari kosong`
}
export const IndCheckStorage = (data: string[], sender: string): string => {
    let jumlah = 1
    let text = `*STORAGE*\n\n`
    for (let result of data) {
        text += `${jumlah}. ${result.split('.')[0].replace(sender, '')}\n`
        jumlah++
    }
    return text
}
export const IndTungguSearch = () => {
	let kata: string[] = [
		`*🔎* Tunggu sebentar bot akan mencarikan untuk anda`,
		`*🔎* Tunggu sebentar bot sedang mencarikan perintah anda`,
		`*🔎* Tunggu sebentar bot sedang mencarikan untuk anda`
	]
	return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndErrorMP3 = (): string => {
    return `Maaf, Terjadi kesalahan pada fitur media mp3 silahkan coba kembali`
}
export const IgStalk = (data: instaStalk): string => {
    return `
	ㅤㅤ  *「 INSTA STALK 」* 


*🖥️ Id :* ${data.id}
*👤 Username :* ${data.username}
*🉐 Nickname :* ${data.nickname}
*⚔️ Kategori :* ${data.category}
*👥 Pengikut :* ${data.follower}
*🫂 Mengikuti :* ${data.following} 
*🛡️ Bio :* ${data.bio}
*🔖Akun bisnis :* ${data.akun_bisnis ? '✅' : '❎'}
*🔐 Private Akun :* ${data.private ?  '✅' : '❎'}
*📧 Akun Terverifikasi :* ${data.centang ?  '✅' : '❎'}
*📦 Total Post:* ${data.total_post}
`
}
export const IndUserKosong = (nama: string): string => {
	let kata: string[] = [
		`*❌* Mohon maaf kak username ${nama} yang mau kakak stalk tidak di temukan`,
		`*❌* Mohon maaf, username ${nama} yang kakak ingin stalk tidak bot temukan`,
		`*❌* Mohon maaf kak, username ${nama} yang mau kakak cari tidak bot temukan, Harap ganti usernamenya kak *🙏🏻*`,
		`*❌* Mohon maaf kak, username ${nama} yang ingin kakak cari tidak ditemukan, Harap ganti usernamenya ya kak *🙏🏻*`,
		`*❌* Mohon maaf kak, Username ${nama} yang mau kakak cari tidak bot temukan, Mohon ganti usernamenya ya kak  *🙏🏻*`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndUsernameNoKosong = (nama: string) => {
	let kata: string[] = [
		`*「❗」* Mohon maaf kak, harap masukkan username ${nama}, yang mau kakak stalk`,
		`*「❗」* Mohon maaf kak, masukkan username ${nama} yang mau kakak cari  *🙏🏻*`,
		`*「❗」* Maaf kak, harap masukkan username ${nama} yang ingin kakak cari  *🙏🏻*`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndAntiDahViewOnce = (status: boolean) => {
	let kata: string[] = [
		`*「❗」* Mohon maaf kak mode anti view once ${status ? "Sudah diaktifkan" : "Sudah dimatikan"} di group ini`,
		`*「❗」* Mohon maaf kak anti view once sudah ${status ? "Di nyalakan" : "Di matikan"}di group ini`
	]
	return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndMuted = (status: boolean, metadata: WAGroupMetadata) => {
	return `ㅤ   *「 MUTED 」* 

*🛡 ID :* ${metadata.id}
*💫 STATUS :* ${status ? "AKTIF" : "MATI"}
*🌐 IN :* ${metadata.subject}
`
}
export const IndMutedDah = (status: boolean) => {
	let kata: string[] = [
		`*「❗」* Mohon maaf kak mode mute ${status ? "Sudah diaktifkan" : "Sudah dimatikan"} di group ini`,
		`*「❗」* Mohon maaf kak mode mute sudah ${status ? "Di nyalakan" : "Di matikan"} di group ini`
	]
	return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndAntiViewOnce = (status: boolean, metadata: WAGroupMetadata) => {
	return  `ㅤ   *「 ANTI VIEW ONCE 」* 

*💠 ID :* ${metadata.id}
*⚠ STATUS :* ${status ? "AKTIF" : "MATI"}
*🖋 IN :* ${metadata.subject}
`
}
export const IndYtStalk = (data: ChannelSearchResult): string => {
    return `ㅤㅤㅤ  *「 YT STALK 」* 


*🎬 Nama Channel :* ${data.name}
*🌐 Url :* ${data.url}
*📽 Total Video :* ${data.videoCount}
*👥 Total Subcriber :* ${data.subCountLabel}
`
}
export const IndYtStalkError = (): string => {
	let kata: string[] = [
		`*「❗」* Mohon maaf kak, untuk saat ini fitur yt stalk sedang error harap coba lagi lain kali`,
		`*「❗」* Mohon maaf kak, fitur yt stalk saat ini sedang error harap coba lagi nanti`,
		`*「❗」* Mohon maaf kak, Fitur yt stalk untuk saat ini error, bisa di coba lain kali`
	]
    return  kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndGhStalk = (data:  GhStalk ) => {
	return `	ㅤㅤ   *「 GITHUB STALK 」*


*💫 URL :* ${data.html_url}
*🌐 ID :* ${data.id}
*🕵🏻‍♂️ Username :* ${data.login}
*👤 Nama :* ${data.name}
*👥 Pengikut :* ${data.followers}
*🫂 Mengikuti :* ${data.following}
*🔰 Type :* ${data.type}
*🏬 Company :* ${data.company ?? "Tidak terdata"}
*🧭 Blog :* ${data.blog == "" ?? "Tidak terdata"}
*💌 Email :* ${data.email ?? "Email tidak terdeteksi"}
*🛡️ Bio :* ${data.bio ?? "Tidak ada bio"}
*🖥️ Username Twitter :* ${data.twitter_username ?? "Tidak di cantumkan"}
*💠 Repo Publik :* ${data.public_repos}
*💥 Git Publik :* ${data.public_gists}
*🎥 Tanggal Buat :* ${moment(data.created_at).format("LLLL")}
*🕒 Tanggal Update :* ${moment(data.updated_at).format("LLLL")}
`
}
export const IndTiktokStalk = (data: TiktokStalk): string => {
    const TanggalUpload: string = new Date(Number(data.createTime) * 1000).toLocaleString('id', {
        year: 'numeric',
        month: 'short',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric'
    })
    return `	ㅤ *「 TIKTOK STALK 」*


*📡 ID :* ${data.id}
*🕵🏻‍♂️ Username :* ${data.uniqueId}
*👤 Nama :* ${data.nickname}
*👥 Pengikut :* ${data.follower}
*🫂  Mengikuti :* ${data.following}
*❤ Suka :* ${data.suka}
*🎞 Total Video :* ${data.total_video}
*🎥 Tanggal Buat :* ${TanggalUpload}
*📧 Verived :* ${data.verified ?  '✅' : '❎'}
*🔐 Private :* ${data.privateAccount ?  '✅' : '❎'}
*🌐 Bio Link :* ${data.bioLink ? data.bioLink.link : ''}
*🛡️ Bio :* ${data.signature}
`
}
export const IndMasukkanUsernameNoUrl = (fitur: string): string => {
	let kata: string[] = [
		`*「❗」*  Mohon maaf kak, harap masukkan username ${fitur} bukan link`,
		`*「❗」*  Mohon maaf kak, harap masukkan username ${fitur}, Bukan URL nya kak`
	];
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const Indverifikasi = (status: number, otp: string, data?: { nama: string, id: string, dalam: string}): string => {
    if (status === 1) {
        return `Kode Verifikasi anda adalah ${otp}, anda baru bisa meminta kode lagi dalam 5 menit.\n\nKetik kode verifikasi anda dengan valid agar bot dapat verifikasi bahwa anda adalah user`
    } else if (status === 2) {
        return `Kode Verifikasi anda adalah ${otp}, anda baru bisa meminta kode lagi dalam 90 menit.\n\nKetik kode verifikasi anda dengan valid agar bot dapat verifikasi bahwa anda adalah user`
    } else if (status === 3) {
        return `Kode verifikasi anda adalah ${otp}, anda baru bisa meminta kode lagi dalam 8 jam.\n\nKetik kode verifikasi anda dengan valid agar bot dapat verifikasi bahwa anda adalah user`
    } else if (status === 4) {
        return `ㅤㅤㅤ  *「 VERIFICATION 」* 

*❒ Nama :* ${data?.nama}
*❒ Id :* ${data?.id}
*❒ Status :* SUCCESS
*❒ In :* ${data?.dalam}`
    } else {
        return ''
    }
}
export const IndSdhVerifikasi = (nama: string) => {
	nama = /@s.whatsapp.net/i.test(nama) ? "@"+ nama.replace("@s.whatsapp.net", "") : nama
	const result = [`*「❗」* Maaf ka ${nama}, kaka sudah terverifikasi, cukup sekali untuk melakukan verifikasi tidak usah berulang kali`, `*「❗」* Maaf ka ${nama}, kaka sudah pernah verifikasi sebelumnya`, `*「❗」* Maaf ka ${nama}, kaka udah terverifikasi mohon untuk tidak menggunakan command ini lagi ya kak ☺🙏🏻`]
	return result[Math.floor(Math.random() * (result.length))]
}
export const IndPublicSucces = (status: boolean): string => {
    return `Berhasil mengubah status Bot ${status ? 'ke publik' : 'ke Self'}`
}
export const IndPublicDuplicate = (status: boolean): string => {
    return `Status Bot untuk saat ini sudah ${status ? 'PUBLIK' : 'SELF'}`
}
export const IndPrefix = (Pref: string): string => {
    return `Prefix anda untuk saat ini adalah *[${Pref}]*`
}
export const IndSpammer = (): string => {
    return `Warning Harap tunggu perintah anda sebelumnya berakhir untuk mencegah terjadinya spam`
}
export const IndStickerReply = (command: string): string => {
	let kata: string[] = [
		`*「❗」* Mohon maaf ka, diharapkan kirim/reply Gambar / Video / Sticker / dokument (image/video) dengan caption ${command} untuk menggunakan perintah ini`,
		`*「❗」* Maaf ka, kaka tidak mengirimkan media apapun, Harap Kirim/reply media dengan caption ${command} untuk menggunakan command ini`,
		`*「❗」* Mohon maaf kak, harap kirim/ reply media menggunakan caption ${command} Untuk menggunakan perintah ini`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndStickerVideoPanjang = () => {
	let kata: string[] = [
		`*「❗」* Mohon maaf kak, video yang kakak kirim terlalu besar untuk dijadikan sticker maksimal video 10 detik`,
		`*「❗」* Mohon maaf kak, durasi video yang kakak kirim terlalu besar untuk dijadikan sticker maksimal video hanya 10 detik`,
		`*「❗」* Mohon maaf kak, durasi video yang kakak kirim terlalu besar untuk bot jadikan sticker, untuk video maksimal hanya 10 detik kak`
	]
	return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndSpam5S = (jeda: string): string => {
    return `Maaf ka setelah anda menggunakan command ada jeda ${jeda} detik untuk anda bisa menggunakan command kembali`
}
export const StickerDuplicate = (sender: string, posisi: number): string => {
	let kata: string[] = [
		`*「❗」* Mohon maaf Ka media itu sudah dijadikan sticker sebelumnya,  @${sender.replace('@s.whatsapp.net','')} yang bikin. Harap tidak menggunakan media yang sama ya kak 🙏🏻`,
		`*「❗」* Mohon maaf ka di harapkan tidak membuat sticker dengan media yang sama kak @${sender.replace('@s.whatsapp.net','')} sudah pernah bikin media itu sebelumnya. Harap gunakan media yang berbeda`,
		`*「❗」* Mohon maaf ka media yang kaka ingin jadikan sticker sudah pernah dibuat sama @${sender.replace('@s.whatsapp.net','')} sebelumnya. Diharapkan gunakan media yang berbeda ya kak makasih 🙏🏻`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const StickerFound = (sender: string): string => {
	let kata: string[] = [
		`Ini ka stickernya @${sender.replace('@s.whatsapp.net', '')}, Mohon tidak gunakan media yang sama ya kak 🙏🏻`,
		`Ini kak sticker yang mau kakak buat tadi  @${sender.replace('@s.whatsapp.net', '')} `,
		`ini kan kak sticker yang mau di buat tadi ?, Mohon tidak gunakan media yang sama ya kak makasih 🙏🏻`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const ErrorCircle = () => {
	return `*「❗」* Mohon maaf Sticker Circle yang ingin anda buat rusak harap ganti media lain`
}
export const BotGaAdmin = () => {
	let kata: string[] = [
		`*「❗」*  Maaf kak bot bukan admin group tidak bisa melaksanakan perintah`,
		`*「❗」*  Mohon maaf kak jika ingin menggunakan fitur ini harap jadikan bot sebagai admin`,
		`*「❗」* Maaf ka, fitur ini berlaku jika bot menjadi admin`,
		`*「❗」*  Maaf kak, bot bukan admin grup bot tidak bisa melaksanakan perintah :(`,
		`*「❗」*  Mohon maaf kak harap jadikan bot sebagai admin terlebih dahulu`,
		`*「❗」*  Maaf kak bot bukan admin grup tidak dapat melaksanakan perintah`
	]
	return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const PilihBukatutup = () => {
	let kata: string[] = [
		`*「❗」*  Maaf kak format yang kakak masukkan salah, pilih buka/tutup`,
		`*「❗」*  Mohon maaf kak untuk menggunakan perintah ini harap pilih buka atau tutup`,
		`*「❗」*  Maaf kak harap pilih buka/tutup`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const PilihOnOff = () => {
	let kata: string[] = [
		`*「❗」*  Maaf kak format yang kakak masukkan salah, pilih on/off`,
		`*「❗」*  Mohon maaf kak untuk menggunakan perintah ini harap pilih on atau off`,
		`*「❗」*  Maaf kak harap pilih buka/tutup`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const BukanDalamGroup = () => {
	let kata: string[] = [
		`*「❗」* Maaf kak perintah ini hanya bisa di gunakan di dalam grup saja kak`,
		`*「❗」* Mohon maaf kak sebelumnya, command ini hanya tersedia dalam group`,
		`*「❗」* Maaf ka perintah ini khusus untuk didalam group saja kak`, 
		`*「❗」* Maaf kak perintah ini hanya berlaku jika kakak berada didalam group`,
		`*「❗」* Maaf kak perintah ini khusus untuk group, bukan personal chat`,
		`*「❗」* Maaf kak fitur ini tersedia hanya di dalam group`,
		`*「❗」* Maaf kak fitur ini tidak berlaku dalam personal chat`,
		`*「❗」* Maaf kak, kakak hanya bisa menggunakan perintah ini jika berada didalam group`,
		`*「❗」* Mohon maaf kak perintah ini tidak tersedia untuk personal chat`
	]
	return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const UserBaruOut = () => {
    return `Maaf user tersebut baru baru ini keluar group anda tidak bisa memasukkannya`
}
export const UserDalamGroup = () => {
	let kata: string[] = [
		`*「❗」* Maaf kak user tersebut telah berada didalam group`,
		`*「❗」* Maaf kak user tersebut sudah berada di group`,
		`*「❗」* Maaf kak user tersebut sekarang ada di group`
	]
	return  kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const UserGadaDalamGroup = () => {
	let kata: string[] = [
		`*「❗」* Mohon maaf kak untuk saat ini user tersebut sedang tidak berada didalam group`,
		`*「❗」*  maaf kak user tersebut sedang tidak berada didalam group`,
		`*「❗」*  Maaf kak bot tidak bisa melaksanakan perintah karena user tersebut sedang tidak berada didalam group`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const UserPrivate = () => {
    return `Maaf tidak dapat menginvit user tersebut kedalam group kemungkinan di private`
}
export const SuccesAdd = (namagc: string) => {
	let kata: string[] = [
		`*✅* Berhasil menambahkan target ke dalam group ${namagc}`,
		`*✅* Berhasil memasukkan user tersebut ke dalam group ${namagc}`,
		`*✅* Berhasil memasukkan peserta tersebut ke dalam group ${namagc}`
	]
    return  kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const AddHarapTagSeseorang = () => {
	let kata: string[] = [
		`*「❗」* Mohon maaf kak harap tag/reply seseorang yang ingin ditambahkan kedalam group`,
		`*「❗」* Maaf kak harap tag/reply seseorang yang ingin ditambahkan ke group`,
		`*「❗」* Mohon maafkak untuk menggunakan perintah ini kaka harus tag/reply seseorang yang ingin ditambahkan`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const TagOrReply = () => {
	let kata: string[] = [
		`*「❗」* Mohon maaf kak untuk menggunakan perintah ini harap tag/reply pesan seseorang`,
		`*「❗」* Maaf kak harap tag/reply pesan seseorang untuk menggunakan fitur ini`,
		`*「❗」* Maaf kak untuk menggunakan command ini harap tag/ reply pesan seseorang`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const isOwnerGroupNokick = () => {
	let kata: string[] = [
		`*「❗」* Mohon maaf kak bot tidak dapat mengeluarkan pembuat group`,
		`*「❗」* Maaf kak bot tidak dapat mengeluarkan owner group`,
		`*「❗」* Mohon maaf kak bot tidak dapat mengeluarkan pembuat group`
	]
    return  kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const kickSucces = (sender: string, admin: string) => {
	let kata: string[] = [
		`*✅* Berhasil mengeluarkan @${sender.replace('@s.whatsapp.net', '')} atas perintah admin ${admin.replace("@s.whatsapp.net","")}`,
		`*✅* Berhasil mengnyepak @${sender.replace('@s.whatsapp.net', '')} atas perintah admin ${admin.replace("@s.whatsapp.net","")}`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const Admindia = (sender: string) => {
	let kata: string[] = [
		`*「❗」* Tidak dapat mengeluarkan @${sender.replace('@s.whatsapp.net', '')} karena dia admin`,
		`*「❗」* Tidak dapat mengeluarkan @${sender.replace('@s.whatsapp.net',"")}, dikarenakan masih menjabat sebagai admin hanya owner group yang bisa mengeluarkan admin`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const ButakahLinkGc = () => {
    return `Butakah ? di deskripsi group ada tod, caper caper`
}
export const IndAntiViewOn = () => {
	let kata: string[] = [
		`*✅* Anti ViewOnce on kamu setiap media ViewOnce akan dikirim ulang otomatis. Jika tidak menginginkan fitur ini admin group bisa mematikannya`,
		`*✅*  Anti ViewOnce dinyalakan setiap media yang kamu kirim berupa View Once maka otomatis di kirim ulang oleh bot. Jika tidak menginginkan fitur ini admin group bisa mematikannya`,
		`*✅*  Anda Terdeteksi mengirim ViewOnce setiap media yang dikirim berupa ViewOnce maka otomatis akan di kirim ulang oleh bot. Jika tidak menginginkan fitur ini admin group bisa mematikannya`
	]
	return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndLinkGroup = (groupMetadata: WAGroupMetadata, link: string) => {
    return `ㅤㅤㅤ  ㅤㅤ *「 LINK GROUP 」* 

*🚀 Group :* ${groupMetadata.subject}
*🤴🏻 Owner Group :* ${groupMetadata.owner || "Tidak terdeteksi"}
*💫 Creation :* ${groupMetadata.subject ? moment(Number(groupMetadata.creation * 1000)).format("LLLL") : "Tidak terdeteksi"}
*🌐 Link :* ${link}`
}
export const SuccesOpenCloseGc = (Status: boolean, metadata: WAGroupMetadata) => {
	let Close: string[] = [
		`*✅* Berhasil menutup group ${metadata.subject}, Sekarang semua member tidak dapat mengirim pesan`,
		`*✅* Berhasil menutup group ${metadata.subject}, Member tidak dapat mengirim pesan`
	]
	let Open: string[] = [
		`*✅* Berhasil membuka group  ${metadata.subject}, Sekarang semua member dapat mengirimkan pesan`,
		`*✅* Berhasil menutup group ${metadata.subject}, Member dapat mengirim pesan`
	]
    return Status ? Close[Math.floor(Math.random() * (Close.length))].trim() : Open[Math.floor(Math.random() * (Open.length))].trim()
}
export const PromoteSuccess = (tag: string) => {
	let kata: string[] = [
		`*✅* Berhasil menaikkan jabatan ${tag.replace('@s.whatsapp.net', '')} menjadi admin`,
		`*✅* Berhasil menjadikan  ${tag.replace('@s.whatsapp.net', '')} seorang admin`
	]
    return  kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const DemoteSuccess = (tag: string) => {
	let kata: string[] = [
		`*✅* Berhasil menurunkan jabatan ${tag.replace("@s.whatsapp.net", "")} menjadi seorang member`,
		`*✅* Berhasil mencabut jabatan admin  ${tag.replace("@s.whatsapp.net", "")}`
	]
    return  kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const PromoteDiaAdmin = (tag: string) => {
	let kata: string[] = [
		`*「❗」* Perintah di tolak dikarenakan ${tag.replace('@s.whatsapp.net', '')} telah menjadi seorang admin`,
		`*「❗」* kamu tidak dapat menaikkan  ${tag.replace('@s.whatsapp.net', '')}, karena dia telah menjadi admin`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const DemoteBukanAdmin = (tag: string) => {
	let kata: string[] = [
		`*「❗」* Kamu tidak dapat menurunkan jabatan ${tag.replace("@s.whatsapp.net", "")} karena dia bukan admin`,
		`*「❗」* Perintah ditolak dikarenakan  ${tag.replace("@s.whatsapp.net", "")} bukan seorang admin`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const GagalUpdatePP = () => {
	let kata: string[] = [
		`*「❗」*  Terjadi kesalahan saat ingin mengubah foto profil harap ganti media anda`,
		`*「❗」*  Maaf ada kesalahan saat proses mengubah foto profil group harap ganti media anda`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const SuccesUpdatePP = () => {
	let kata: string[] = [
		`*✅* Berhasil mengubah foto profil group`,
		`*✅* Berhasil menganti foto profil group`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const SuccesSetName = (nama: string) => {
	let kata: string[] = [
		`*✅*  Berhasil mengubah nama group menjadi ${nama}`,
		`*✅* Berhasil mengganti nama grup menjadi ${nama}`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const SuccesSetDesk = () => {
	let kata: string[] = [
		`*✅*  Berhasil mengubah deskripsi group`,
		`*✅* Berhasil mengganti deskripsi group`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndListOn = (result: { id: string; nama: string | undefined }[]): string => {
    let Text: string = `*╭───㊚ LIST ONLINE ㊚────*\n*│*⁩\n`
    let count: number = 1
    for (let respon of result) {
        Text += "*│" + count + '.* ' + '@' + respon.id.replace('@s.whatsapp.net', '') + ` (${respon.nama})\n`
        count++
    }
	Text += `*│⁩*\n*╰───── ㊊ RA BOT ㊊ ───*`
    return Text
}
export const IndGadaOn = () => {
    return `Maaf untuk saat ini tidak ada yang terlihat online`
}
export const IndVoteStart = (pelapor: string, target: string, alasan: string, time: number) => {
    return `*VOTING*

Pengajuan Voting : @${pelapor.replace('@s.whatsapp.net', '')}
Target Vote : @${target.replace('@s.whatsapp.net', '')}
Alasan : ${alasan}



Ketik *vote* Jika setuju
Ketik *devote* Jika tidak

Voting berlangsung selama ${time} Menit
`
}
export const IndVoting = (pelapor: string, target: string, alasan: string, data: any) => {
    let Text: string = `
	ㅤㅤㅤㅤㅤ  *「 VOTING 」*
	
*📬 Pengajuan Voting :* @${pelapor.replace('@s.whatsapp.net', '')}
*🐷 Target Vote :* @${target.replace('@s.whatsapp.net', '')}
*💬 Alasan :* ${alasan}\n\n\n
	
	
Ketik *vote* Jika anda setuju mengeluarkan target
Ketik *devote* Jika anda tidak setuju mengeluarkan target\n\n
`
    let Vote: number = 1
    let Devote: number = 1
    let vote: { id: string | null | undefined, status: string, pushname: string }[] = data.filter((value: { id: string | null | undefined; status: string; pushname: string }) => value.status == 'vote')
    let devote: { id: string | null | undefined, status: string, pushname: string }[] = data.filter((value: { id: string | null | undefined; status: string; pushname: string }) => value.status == 'devote')
    Text += '*VOTE*\n\n'
    for (let result of vote) {
        Text += `*${Vote}.* ${result.pushname} *(${result.id?.replace('@s.whatsapp.net', '')})*\n`
        Vote++
    }
    Text += '\n\n*DEVOTE*\n\n'
    for (let result of devote) {
        Text += `*${Devote}.* ${result.pushname} *(${result.id?.replace('@s.whatsapp.net', '')})*\n`
        Devote++
    }
    return Text
}
export const IndHasilVote = (pelapor: string, target: string, alasan: string, data: any) => {
    let Text: string = `
	ㅤㅤㅤㅤㅤ  *「 VOTING 」*


*📬 Pengajuan Voting :* @${pelapor.replace('@s.whatsapp.net', '')}
*🐷 Target Vote :* @${target.replace('@s.whatsapp.net', '')}
*💬 Alasan :* ${alasan}\n\n\n
`
    let Vote: number = 1
    let Devote: number = 1
    let vote: { id: string | null | undefined, status: string, pushname: string }[] = data.filter((value: { id: string | null | undefined; status: string; pushname: string }) => value.status == 'vote')
    let devote: { id: string | null | undefined, status: string, pushname: string }[] = data.filter((value: { id: string | null | undefined; status: string; pushname: string }) => value.status == 'devote')
    Text += `*Voting berakhir dengan hasil :*\n\n*✅ Vote :* ${vote.length}\n*❎ Devote :* ${devote.length}\n\n\n`
    Text += '  	ㅤㅤㅤㅤㅤ  *VOTE*\n\n'
    for (let result of vote) {
        Text += `${Vote}. ${result.pushname} *(${result.id?.replace('@s.whatsapp.net', '')})*\n`
        Vote++
    }
    Text += '\n\n  	ㅤㅤㅤㅤㅤ  *DEVOTE*\n\n'
    for (let result of devote) {
        Text += `*${Devote}.* ${result.pushname}  *(${result.id?.replace('@s.whatsapp.net', '')})*\n`
        Devote++
    }
    Text += '\n\nVoting telah berakhir, Sesi voting telah *DI TUTUP* untuk group ini.'
    return Text
}
export const IndTagall = (data: string[] | undefined) => {
    let Text: string = '*╭───㊚ TAGALL ㊚────* \n*│*⁩\n'
    let count: number = 1
    for (let result of data || []) {
        Text += `*│ ` + count + '.* ' + '@' + result.replace('@s.whatsapp.net', '') + '\n'
        count++
    }
	Text += `*│⁩*\n*╰───── ㊊ RA BOT ㊊ ───*`
    return Text
}
export const IndRevoked = (metadata: WAGroupMetadata) => {
	let kata: string[] = [
		`*✅* Success menarik link group ${metadata.subject}`,
		`*✅* Berhasil mereset link group ${metadata.subject}`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndSesiVotingAda = () => {
	let kata: string[] = [
		`*「❗」* Mohon maaf kak, Sesi voting berlangsung di dalam group ini kakak bisa menyelesaikan sesi voting sebelumnya / kaka bisa menggunakan fitur delvote`,
		`*「❗」* Maaf sesi voting sedang berlangsung di grup ini selesaikan sesi voting terlebih dahulu/ admin group bisa mereset sesi voting yang berlangsung.`,
		`*「❗」* Mohon maaf kak sesi voting sedang berjalan di group ini kaka bisa selesaikan sesi voting sebelumnya / kaka bisa menggunakan fitur *delvote*`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndSesiVotingGada = () => {
	let kata: string[] = [
		`*「❗」*  Mohon maaf kak, sesi voting tidak ada dalam group ini`,
		`*「❗」* Mohon maaf, sesi voting sedang tidak berlangsung didalam group ini`,
		`*「❗」* Mohon maaf kak, Group ini tidak mempunyasi sesi voting apapun`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndResetSesi = () => {
	let kata: string[] = [
		`*✅* Berhasil menghapus sesi voting yang berlangsung di group ini untuk saat ini tidak ada sesi votung yang berlangsung`,
		`*✅* Berhasil mereset sesi voting yang sedang berlangsung di dalam group ini. Untuk saat ini tidak ada sesi voting yang berlangsung`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndVoteLebih15 = () => {
	let kata: string[] = [
		`*「❗」* Mohon maaf kak waktu voting tidak bisa lebih dari 15 menit maksimal 15 menit`,
		`*「❗」* Mohon maaf, waktu voting yang anda masukkan lebih dari 15 menit.`,
		`*「❗」* Mohon maaf waktu voting tidak boleh melebihi dari 15 menit`
	]
    return  kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const BerhasilKickVote = (sender: string) => {
    return `Bot akan mengeluarkan @${sender.replace("@s.whatsapp.net", "")} dikarenakan voting 15 Orang memilih vote`
}
export const BerhasilVote = (sender: string) => {
	return `Voting berakhir dengan hasil anggota setuju telah melebihi 15 orang, tetapi bot tidak akan mengeluarkan ${sender.replace("@s.whatsapp.net", "")} karena bot bukan admin, Keputusan sekarang diserahkan kepada admin group`
}
export const CancelVote = () => {
    return `Voting berakhir dengan hasil anggota yang tidak setuju melebihi 15 orang, Voting di tutup.`
}
export const DiaKeluarVote = () => {
    return `Target vote terdeteksi kabur Sesi voting otomatis di tutup`
}
export const IndUdahVote = () => {
	let kata: string[] = [
		`*「❗」* Mohon maaf kak anda sudah melakukan pemilihan kakak tidak bisa memilih kedua kalinya`,
		`*「❗」* Mohon maaf kak kakak sudah mememilih sebelumnya, kakak tidak bisa memilih 2 kali`,
		`*「❗」* Mohon maaf kak kakak sebelumnya sudah pernah melakukan pemilihan, kakak tidak bisa memilih 2 kali`,
		`*「❗」* Mohon maaf, Anda sudah pernah melakukan pemilihan sebelumnya anda tidak dapat memilih untuk kedua kalinya, harap tunggu sampai voting berakhir`,
		`*「❗」* Mohon maaf, kamu telah melakukan voting sebelumnya. voting hanya dapat dilakukan sekali di setiap nomer`
	]
	return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const BukanStickerGif = () => {
	let kata: string[] = [
		`*「❗」*  Mohon maaf kak Sticker yang kaka gunakan bukan sticker gif, bot tidak dapat melaksanakan perintah`,
		`*「❗」*  Maaf ka harap gunakan sticker gif kak 🙏🏻`,
		`*「❗」* Maaf ka media yang kaka gunakan bukan sticker gif harap gunakan sticker gif kak 🙏🏻`
	]
    return  kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const InputImage = () => {
    return `Maaf ka harap kirim / reply gambar dengan caption`
}
export const InputSticker = () => {
	let kata: string[] = [
		`*「❗」* Maaf kak untuk menggunakan perintah ini harap kirim caption dengan reply sticker`,
		`*「❗」* Mohon maaf kak Harap reply sticker dengan caption`,
		`*「❗」* Maaf kak perintah ini berlaku jika kakak mereply sticker`
	]
	return  kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndToimgDone = (waktu: string) => {
	let Success: string[] = [
		`*✅*`,
		`*✔*`
	]
	let kata: string[] = [
		`Success mengubah sticker menjadi Image dengan waktu ${waktu}`,
		`Berhasil mengubah sticker menjadi Image dalam waktu ${waktu}`,
		`Berhasil melaksanakan perintah dengan waktu ${waktu}`
	]
	return Success[Math.floor(Math.random() * (Success.length))] + " " + kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndBukanSgif = () => {
	let kata: string[] = [
		`*「❗」*  Mohon maaf kak sticker gif tidak bisa dijadikan foto profil`,
		`*「❗」*  Perintah ditolak dikarenakan sticker gif tidak dijadikan foto profil`,
		`*「❗」* Maaf kak sticker gif tidak dapat dijadikan foto profil`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndLirikMusicMatch = (result: LirikResult) => {
    return  `	ㅤㅤㅤㅤㅤ  *「 LIRIK LAGU 」*

*📚 Judul :* ${result.result.title}
*💍 Artis :* ${result.result.artist}
	
	
${result.result.lirik}`
}
export const IndAzLirik = (result: Azlirik) => {
    return `	ㅤㅤㅤㅤㅤ  *「 LIRIK LAGU 」*

*📚 Judul :* ${result.title}
*💍 Artis :* ${result.artis}


  ${result.lirik}`
}
export const LirikGada = () => {
	let kata: string[] = [
		`*❌* Maaf kak lirik lagu yang anda cari tidak ditemukan`,
		`*❌* Mohon maaf kak lirik lagu yang ingin kakak cari tidak bot temukan`,
		`*❌* Mohon maaf kak judul lagu yang kakak ingin cari tidak ditemukan, Harap ganti judul lagu!`
	]
    return  kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const BerhasilJoin = () => {
    return `Succes join group`
}
export const IndGagalJoin = () => {
    return `Harap masukkan link dengan valid`
}
export const IndSudahDalamGc = () => {
    return `Mohon maaf ka bot sudah berada di grup tersebut`
}
export const IndSpamPrefix = () => {
    return `Maaf ka setelah anda menggunakan command prefix ada jeda 60 detik untuk anda bisa menggunakan command prefix kembali`
}
export const IndAbsenStart = () => {
    return `Absen pada tanggal ${moment(Date.now()).format("LLLL")} dimulai silakan ketik : (Pilih salah satu)\n\n1. *HADIR* (Jika anda masuk)\n2. *IZIN* (Jika ada halangan) + alasan\n3. *SAKIT* (jika anda sakit)\n\n*Notes :*\n\n- Anda hanya dapat memilih salah satu\n- Absen berlangsung selama 30 menit\n- Jika ada anggota yang tidak mengisi absen selama 30 menit otomatis dimasukkan ke list *TANPA KETERANGAN* di akhir absen`
}
export const IndAbsensi = (result: any, mem: number) => {
    let text: string = `ㅤㅤㅤㅤ *「 ABSENSI 」*


*Daftar list absen yang terdata untuk saat ini*
	
*Total anggota sudah melakukan absen :* ${result.length}
*Total seluruh anggota :* ${mem}\n\n`
    let hadir: number = 1
    for (let respon of result) {
		if (respon.alasan) {
			text += `*${hadir}.* ${respon.nama} ( *${respon.status}* )\n*Alasan :* ${respon.alasan}\n\n`
			hadir++
		} else {
			text += `*${hadir}.* ${respon.nama} ( *${respon.status}* )\n\n`
			hadir++
		}
    }
    text += `\n\nAbsen pada tanggal ${moment(Date.now()).format("LLLL")} silakan ketik : (Pilih salah satu)\n\n1. *HADIR* (Jika anda masuk)\n2. *IZIN* (Jika ada halangan) + Alasan\n3. *SAKIT* (jika anda sakit)\n\n*Notes :*\n\n- Anda hanya dapat memilih salah satu\n- Absen berlangsung selama 30 menit\n- Jika ada anggota yang tidak mengisi absen selama 30 menit otomatis dimasukkan ke list *TANPA KETERANGAN* di akhir absen`
    return text
}
export const IndAbsen = (result: any, mem: number) => {
    let text: string = `ㅤㅤㅤ  *「 ABSEN 」*
	
*Jumlah Anggota Absen :* ${mem}\n\n`

    let hadir: number = 1
    text += '*TANPA KETERANGAN :*\n\n'
    for (let respon of result) {
        text += `*${hadir}.* @${respon.jid.replace('@s.whatsapp.net', '')} ( *TANPA KETERANGAN* )\n\n`
        hadir++
    }
    text += `\n\nAbsen untuk tanggal ${moment(Date.now()).format("LLLL")} telah berakhir`
    return text
}
export const indAfkOn = (target: string, group: string, alasan: string, pushname: string) => {
    return `ㅤㅤ *「 AFK MODE 」*

*➸ Nama :* ${pushname}
*➸ Target :* @${target}
*➸ In :* ${group}
*➸ Alasan :* ${alasan}

*Fitur AFK berhasil diaktifkan !*
`
}
export const indAfkDahNyala = () => {
	return `Fitur AFK telah anda diaktifkan sebelumnya.`
}
export const indJanganTagAfk = (alasan: string, waktu: number) => {
    const Time = parsems(Date.now() - waktu)
    return `Jangan tag dia dia sedang afk dengan alasan ${alasan},\n\nTelah afk selama ${Time.hours} Jam ${Time.minutes} menit ${Time.seconds} detik yang lalu`
}
export const IndWarningSpamTag = () => {
    return `Warning anda terdeteksi melakukan spam kepada user yang afk`
}
export const IndAfkBalik = (time: number) => {
    const Time = parsems(Date.now() -  time)
    return `Anda telah berhenti Afk, setelah afk selama  ${Time.hours} Jam ${Time.minutes} menit ${Time.seconds} detik yang lalu`
}

export const IndLebihDariLimit = (limit: number, fitur: string) => {
	let kata: string[] = [
		`*「❗」* Mohon maaf kak, Limit yang kakak masukkan melebihi batas, Batas maksimum limit fitur ${fitur} adalah ${limit}`,
		`*「❗」* Mohon maaf kak, Batas Limit yang kakak masukkan melebihi batas yang ditetapkan bot kak, batas ${fitur} adalah ${limit}`,
		`*「❗」* Mohon maaf, Batas wajar fitur ${fitur} adalah ${limit}, tidak bisa melebihi batas yang telah di tetapkan bot`
	]
	return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndQuerryKosong = () => {
	let kata: string[] = [
		`*「❗」* Mohon maaf kak, Querry yang kaka masukkan Kosong harap masukkan Querry untuk melakukan pencarian`,
		`*「❗」* Mohon maaf kak, Kakak belum memasukkan Querry pencarian harap masukkan Querry untuk melakukan pencarian`,
		`*「❗」* Mohon maaf kak, Kakak belum memasukkan Querry pencarian harap masukkan Querry untuk melakukan pencarian`
	]
	return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndGoogleSearch = (result: Googlesearch[]) => {
	let text: string = `ㅤㅤㅤㅤ  *「 GOOGLE SEARCH 」*\n\n`
	for (let data of result) {
		text +=  `\n*❒──────────────────────❒*\n\n*📚 Judul :* ${data.title}\n\n*💫 Url :* ${data.link}\n\n*📖 Information :* ${data.snippet}\n\n`
	}
	return text
}
export const IndGoogleKosong = () => {
	let kata: string[] = [
		`*「❗」* Mohon maaf kak, Bot tidak dapat menemukan pencarian yang kakak maksud, Mohon ganti querry ya kak *🙏🏻*`,
		`*「❗」* Mohon maaf kak, pencarian anda untuk saat ini tidak ditemukan, harap ganti querry ya kak  *🙏🏻*`,
		`*「❗」* Mohon maaf kak, bot tidak dapat menemukan pencarian yang kakak maksud harap ganti querry ya kak  *🙏🏻*`
	]
	return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndSuccesSearch = (waktu: string, fitur: string) => {
	let Success: string[] = [
		`*✅*`,
		`*✔*`
	]
	let kata: string[] = [
		`Success menlakukan pencarian ${fitur} dalam waktu ${waktu}`,
		`Berhasil mengirimkan data ${fitur} dalam waktu ${waktu}`,
		`Berhasil melaksanakan perintah dengan waktu ${waktu}`
	]
	return Success[Math.floor(Math.random() * (Success.length))] + " " + kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndSuccesDownloader = (waktu: string, fitur: string) => {
	let Success: string[] = [
		`*✅*`,
		`*✔*`
	]
	let kata: string[] = [
		`Success menlakukan Download ${fitur} dalam waktu ${waktu}`,
		`Berhasil mengirimkan data ${fitur} dalam waktu ${waktu}`,
		`Berhasil melaksanakan perintah dengan waktu ${waktu}`
	]
	return Success[Math.floor(Math.random() * (Success.length))] + " " + kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndBrainly = (result:  { question: Question, answers: Answer[] }[]) => {
	let text: string = `ㅤㅤㅤㅤ  *「 BRAINLY SEARCH 」*\n\n`
	for (let data of result) {
		text += `\n*❒──────────────────────❒*\n\n*📚 Pertanyaan  :* ${data.question.content}\n\n*🗓 Tanggal Pertanyaan :* ${moment(data.question.created.date).format("LLLL")}\n\n*📕 Tema :* ${data.question.education}\n\n*🏫 Tingkat :* ${data.question.grade}\n\n*💫 Jawaban :* ${data.question.answers.map((value) => "\n" + value.content + "\n\n")}`
	}
	const Html = new html()
	return Html.filter(String(text))
}
export const IndGroupWa = (result: { status: number; name: string; link: string | undefined }[]) => {
	let text: string = `ㅤㅤㅤㅤ  *「 GROUP SEARCH 」*\n\n`
	for (let data of result) {
		text += `\n*❒──────────────────────❒*\n\n*💘 Nama :* ${data.name}\n\n*💌 Link :* ${data.link}\n\n`
	}
	return text
}
export const IndWikipedia = (result: { url: string, judul: string, publish: string, desk: string, thumb: string, penjelasan: string}) => {
	return `ㅤㅤㅤㅤ  *「 WIKIPEDIA 」*


*📚 Judul :* ${result.judul}
*🌐 Url :* ${result.url}
*🤖 Timestamp :* ${moment(result.publish).format("LLLL")}
*📜 Deskripsi :* ${result.desk}


${result.penjelasan}
`
}
export const IndAccesDenided = () => {
	let kata: string[] = [
		`*「❗」* Mohon maaf, Akses menuju web di tolak harap coba lagi lain kali`,
		`*「❗」* Mohon maaf, bot gagal mengakses web yang anda cari akses di tolak harap coba lagi lain kali`,
		`*「❗」* Mohon maaf, bot gagal menghubungan pencarian anda dengan web yang ingin di tuju harap coba lagi lain waktu`
	]
	return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const IndSearchYt = (result: VideoSearchResult[]) => {
	let text: string = `ㅤㅤㅤㅤ  *「 YOUTUBE SEARCH 」*\n\n`
	let count: number = 1;
	for (let data of result) {
		text += `\n
*${count++}. 📚 Judul :* ${data.title}
*🌐 Id :* ${data.videoId}
*💫 Url :* ${data.url}
*🕧 Durasi :* ${data.timestamp}
*🤖 Publish :* ${data.ago ?? "Tidak terdeteksi//"}
*👁‍🗨 Penonton :* ${convertAngka(data.views)}
*💌 Channel :* ${data.author.name}\n`
	}
	return text
}
export const IndPlayStore = (result: PlayStore[]) => {
	let text: string =  `ㅤㅤ *「 PLAYSTORE SEARCH 」*\n\n`
	let count: number = 1;
	for (let data of result) {
		text += `\n
*${count++}. 📚 Judul :* ${data.title}
*🌟 Rating :* ${data.rating}
*🏢 Developer :* ${data.developer}
*💫 Url :* ${data.link}\n`
	}
	return text
}
export const IndDorker = (result:{ id: string, bio?: string, status: boolean, bisnis?: boolean }[]) => {
	let Aktif:{ id: string, bio?: string, status: boolean, bisnis?: boolean }[] = result.filter((value:{ id: string, bio?: string, status: boolean, bisnis?: boolean }) => value.status == true)
	let Mati:{ id: string, bio?: string, status: boolean, bisnis?: boolean }[] = result.filter((value:{ id: string, bio?: string, status: boolean, bisnis?: boolean }) => value.status == false)
	let text: string = `ㅤㅤㅤ ㅤ *「 DORK 」*\n\n`
	let aktif: number = 1
	let mati: number = 1
	text += `        *Aktif*\n\n`
	for (let data of Aktif) {
		text += `*${aktif++}. 📞 Nomer :* http://wa.me/${data.id.split("@")[0]}\n*⚠ Status :* ${data.status ? "*✅*" : "*❌*"}\n*💌 Bio :* ${/404/.test(String(data.bio)) ? "Tidak ada bio" : data.bio}\n*🏢 Akun Bisnis :* ${data.bisnis ? "*✅*" : "*❌*"}\n\n`
	}
	text += `ㅤㅤ   *Mati*\n\n`
	for (let data of Mati) {
		text += `*${mati++}. 📞 Nomer :* ${data.id.split("@")[0]}\n*⚠ Status :* ${data.status ? "*✅*" : "*❌*"}\n\n`
	}
	return text
}
export const IndDedork = (command: string) => {
	return `*「❗」* Untuk menggunakan fitur dork harap masukkan ${command} <nomer + xxx (disamarkan)> <jumlah>`
}
export const IndQuerryPanjangDork = () => {
	return `*「❗」* Mohon maaf kak nomer yang anda masukkan terlalu panjang untuk dork maximal 14`
}
export const IndDorkLebih = () => {
	return `*「❗」*  Mohon maaf kak, Maksimal jumlah dork adalah 125`
}
export const IndBknViewOnce = () => {
	return `*「❗」* Mohon maaf kak harap kirim/ reply media berupa viewonce untuk menggunakan perintah ini`
}
export const IndYoutubeKosong = () => {
	return `*「❗」* Mohon maaf kak hasil pencarian youtube anda error / kosong harap ganti media lain`
}
export const IndYtPlayVidSer2 = (value: YoutubeMP4PlaySer2): string => {
	return `
*╭────────────────*
*│「 𝐏𝐋𝐀𝐘 𝐘𝐎𝐔𝐓𝐔𝐁𝐄  」*
*╰────────────────*

*📬 ID :* ${value.videoId}
*📜 Judul :* ${value.title}
*📍 Link :* ${value.url}
*⏱️ Durasi :* ${value.duration}
*🎁 Type :* mp4
*🎞️ Penonton :* ${value.views}
*🛡️ Genre :* ${value.genre}
*🎉 Rilis :* ${value.uploadDate}
*⚖️ Ukuran :* ${value.size}
*📑 Deskripsi :* ${value.description}

*╭─── ⟬ Play MP4 ⟭ ───*
*│ 🤖 Author : I` + ` am Ra*  
*╰───「 RA BOT 」───*`
}
export const IndYtPlayAudSer2 = (value: YoutubeMP3PlaySer2): string => {
	return `
*╭────────────────*
*│「 𝐏𝐋𝐀𝐘 𝐘𝐎𝐔𝐓𝐔𝐁𝐄  」*
*╰────────────────*

*📬 ID :* ${value.videoId}
*📜 Judul :* ${value.title}
*📍 Link :* ${value.url}
*⏱️ Durasi :* ${value.duration}
*🎁 Type :* mp3
*🎞️ Penonton :* ${value.views}
*🛡️ Genre :* ${value.genre}
*🎉 Rilis :* ${value.uploadDate}
*⚖️ Ukuran :* ${value.size}
*📑 Deskripsi :* ${value.description}

*╭─── ⟬ Play MP3 ⟭ ───*
*│ 🤖 Author : I` + ` am Ra*  
*╰───「 RA BOT 」───*`
}
export const IndYtPlayMP3 = (value: youtubeDlCore) => {
	let Regex: RegExpExecArray | null | string = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/.exec(value.data.video_url)
	if (!Regex) Regex = value.data.video_url
	return `
*╭────────────────*
*│「 𝐏𝐋𝐀𝐘 𝐘𝐎𝐔𝐓𝐔𝐁𝐄  」*
*╰────────────────*

*📬 ID :* ${Regex[1]}
*📜 Judul :* ${value.data.title}
*📍 Link :* ${value.data.video_url}
*⏱️ Durasi :* ${value.data.durasi}
*❤ Like :* ${value.data.like}
*🖤 Dislike :* ${value.data.dislike}
*🎁 Type :* ${value.data.format}
*🎞️ Penonton :* ${value.data.viewers}
*🎉 Rilis :* ${value.data.rilis}
*🎯 Ago :* ${value.data.ago}
*🛡️ Genre :* ${value.data.category}
*🎥 Channel :* ${value.data.channel}
*💡 Kualitas :* ${value.data.quality}
*⚖️ Ukuran :* ${value.data.size}
*📑 Deskripsi :* ${value.data.desk}

*╭─── ⟬ Play MP3 ⟭ ───*
*│ 🤖 Author : I` + ` am Ra*  
*╰───「 RA BOT 」───*`
}
export const IndTiktokDown = (data:  TiktokDownloaders) => {
	return `ㅤㅤ *「 TIKTOK DOWNLOADER 」*


*📬 Id :* ${data.id}
*👤 Username :* ${data.username}
*💌 Nama :* ${data.nickname}
*🎯 Tanggal Upload :* ${data.tanggal_buat}
*🕐 Durasi :* ${data.durasi}
*💡 Resolusi :* ${data.resolusi}
*🎁 Type :* ${data.format}
*📧 Akun Terverifikasi :* ${data.verify ?   '✅' : '❎'}
*🔐 Video Private :* ${data.video_private ?   '✅' : '❎'}
*🔷 Stlich Status :* ${data.stitchEnabled ?   '✅' : '❎'}
*🐒 Duet Status :* ${data.duetEnabled ?   '✅' : '❎'}
*🎞️ Total Tayangan :* ${data.statistic.playCount}
*🌐 Total Share :* ${data.statistic.shareCount}
*💭 Total Komen :* ${data.statistic.commentCount}
*❤ Like :* ${data.statistic.diggCount}
*🎶 Judul Musik :* ${data.music.title}
`
}
export const IndIgPost = (value: IgPostDown, url: string) => {
	return `ㅤㅤ *「 IG DOWNLOADER 」*

*👤 Username :* ${value.username}
*❤ Like :* ${value.like}
*📍 Caption :* ${value.caption}
*💫 Url :* ${url}`
}
export const IndMediaFire = (value: { link: string | undefined, size: string}) => {
	return `ㅤㅤ  *「 MEDIAFIRE」*

*⚖️ Ukuran :* ${value.size}
*💫 Url :* ${value.link}

Tunggu sebentar file sedang dikirim.....
`
}
export const IndIgReelsDown = (value: IgReelsDown, url: string) => {
	return `ㅤㅤ *「 IG DOWNLOADER 」*

*👤 Username :* ${value.username}
*❤ Like :* ${value.like}
*🎥 Views :* ${value.total_views ?? value.total_plays}
*💭 Total Komen :* ${value.total_koment}
*🕐 Durasi :* ${value.durasi}
*💫 Url :* ${url}
`
}
export const IndIgTvDown = (value: IgTvDown, url: string) => {
	return `ㅤㅤ *「 IG DOWNLOADER 」*

*👤 Username :* ${value.username}
*📜 Judul :* ${value.title}
*🎥 Views :* ${value.total_view ?? value.total_play}
*💭 Total Komen :* ${value.total_coment}
*💫 Url :* ${url}
`
}
export const IndIGDlInvalid = () => {
	return `*「❗」* Mohon maaf kak, Link instagram yang ingin kaka download Invalid harap isi Url dengan benar`
}
export const BukanIgDown = () => {
	return `*「❗」*  Mohon maaf kak, kakak tidak memasukkan link instagram dengan benar. harap masukkan link instagram yang ingin kakak download dengan benar`
}
export const BukanUrl = () => {
	return `*「❗」* Mohon maaf kak, data yang kakak masukkan bukan berupa Url harap masukkan urlnya kak`
}
export const BukanMediaFire = () => {
	return `*「❗」*  Mohon maaf kak, Link yang kakak masukkan bukan link file dari media fire`
}
export const IndYtPlayMP4 = (value: youtubeDlCore) => {
	let Regex: RegExpExecArray | null | string = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/.exec(value.data.video_url)
	if (!Regex) Regex = value.data.video_url
	return `
*╭────────────────*
*│「 𝐏𝐋𝐀𝐘 𝐘𝐎𝐔𝐓𝐔𝐁𝐄  」*
*╰────────────────*

*📬 ID :* ${Regex[1]}
*📜 Judul :* ${value.data.title}
*📍 Link :* ${value.data.video_url}
*⏱️ Durasi :* ${value.data.durasi}
*❤ Like :* ${value.data.like}
*🖤 Dislike :* ${value.data.dislike}
*🎁 Type :* ${value.data.format}
*🎞️ Penonton :* ${value.data.viewers}
*🎉 Rilis :* ${value.data.rilis}
*🎯 Ago :* ${value.data.ago}
*🛡️ Genre :* ${value.data.category}
*🎥 Channel :* ${value.data.channel}
*💡 Kualitas :* ${value.data.quality}
*⚖️ Ukuran :* ${value.data.size}
*📑 Deskripsi :* ${value.data.desk}

*╭─── ⟬ Play MP4 ⟭ ───*
*│ 🤖 Author : I` + ` am Ra*  
*╰───「 RA BOT 」───*`
}
export const IndSizeBesar = (awal: string, akhir: string, fitur: string, Link: string) => {
	return `*「❗」* Mohon maaf kak ukuran media kakak ${awal} terlalu besar untuk dikirimkan bot, batas maksimal size fitur ${fitur} adalah ${akhir}. Kaka bisa download manual di link berikut : ${Link}`
}
export const IndInputLink = () => {
	return `*「❗」* Mohon maaf kak, kakak tidak menginput link apapun untuk menggunakan perintah ini kakak harus menginput link`
}
export const IndInputLinkYt = () => {
	return `*「❗」* Mohon maaf kak, kakak tidak memasukkan link youtube apapun Harap masukkan link youtube yang ingin di download`
}
export const IndFesbukErr = () => {
	return `*「❗」* Mohon maaf kak, Link facebook yang kakak kirim invalid harap masukkan link facebook dengan valid`
}
export const IndLinkFesbuk = () => {
	return `*「❗」* Mohon maaf kak, Harap masukkan link post facebook yang ingin di download dengan benar`
}
export const IndFotoFb = () => {
	return `*「❗」*  Mohon maaf kak, Kalo foto tinggal ss aja kak Ngapain pake bot nyusahin`
}
export const IndFaceBookDown = (data: FaceBookDown) => {
	return `ㅤ *「 FB DOWNLOADER 」*


*📜 Judul :* ${data.nama}
*👤 Username :* ${data.username}
*⏱️ Durasi :* ${data.durasi}
*🎯 Tanggal Upload :* ${moment(data.uploadedAt).format("LLLL")}
*🎉 Rilis :* ${moment(data.publishedAt).format("LLLL")}
*🌚 Nsfw :* ${data.nsfw ?  '✅' : '❎'}
*🛡️ Genre :* ${data.genre}
* ⚔ Hastag :* ${data.keywords.join(", ")}
* 💭 Total koment :* ${data.total_koment}
*⚖️ Ukuran :* ${data.size}
*💡 Kualitas :* ${data.quality}
*✨Transcript: ${data.transcript}
*💫 Url stream:* ${data.url_stream},
*📑 Desk :* ${data.desk}
`
}
export const IndTiktokErr = () => {
	return `*「❗」* Mohon maaf kak, link tiktok yang kakak masukkan invalid/video private harap ganti url tiktok lain`
}
export const IndBukanTiktok = () => {
	return `*「❗」* Mohon maaf kak, kakak tidak memasukkan link tiktok dengan benar harap isi link tiktok dengan valid`
}
export const IndEmojiNotFound = () => {
	return `*「❗」* Mohon maaf kak, Emoji yang ingin kakak buat sticker tidak ditemukan harap masukkan emoji dengan benar`
}
export const IndHarapInputEMot = () => {
	return `*「❗」* Mohon maaf kak harap masukkan emoji yang kakak ingin ubah menjadi sticker`
}
export const IndTranslate = (value: ITranslateResponse ) => {
	let Lang: languages | any = languages
	return `
*🌐 Negara deteksi :* ${Lang[value.from.language.iso]}
*📍 Translate :* ${value.text}`
}
export const IndTransErr = () => {
	return `*「❗」* Mohon maaf kak, Bahasa yang kakak masukkan termasuk kedalam list bahasa`
}
export const IndTranslateMasuk = () => {
	return `*「❗」* Mohon maaf kak,  harap masukkan text yang ingin kakak translate`
}
export const IndToUrl = (data: ToUrlUguuse) => {
	return `
*🕳 Nama :* ${data.name}
*⚖️ Ukuran :* ${data.size}
*💫 Url :* ${data.url}`
}
export const ErrorToUrl = () => {
	return `*「❗」* Mohon maaf kak, bot gagal menginput media untuk menjadikan url`
}
export const InputMedia = () => {
	return `*「❗」* Mohon maaf kak, harap masukkan media yang ingin di ubah menjadi url`
}
export const IndItuNomerOwn = () => {
	return `Itu ka nomer owner ku jangan di spam ya kak:v`
}
export const IndSendSc = () => {
	return `Ini scnya kak https://github.com/rayyreall/Whatsapp_Bot Cara penginstalan ada di readme`
}
export const JooxSer = (result: Joox[]) => {
	let text: string = "ㅤㅤㅤㅤ  *「 JOOX SEARCH 」*\n\n"
	let count: number = 1;
	for (let data of result) {
		text += `\n
*${count++}. 🌀 Judul :* ${data.name}
*⚔️ Id :* ${data.album_id}
*⏱️ Durasi :* ${data.play_duration}
*💍 Artist :* ${data.artist_list[0].name}
*📍 Url :* https://www.joox.com/id/single/${data.id}`
count++
	}
	return text
}
export const IndJooxSerError = () => {
	return `*「❗」* Judul musik yang ingin anda cari tidak di temukan harap ganti judul joox anda`
}
export const IndBcDone = () => {
	return `*✅* Berhasil melakukan broadcast`
}
export const IndKompasError = () => {
	return `*「❗」*  Mohon maafka fitur kompas untuk saat ini sedang error bot otomatis menghubungi owner`
}
export const IndKompas = (result: KompasTerkini[]) => {
	let text: string = "ㅤㅤㅤㅤ  *「 KOMPAS TERKINI 」*\n\n"
	let count: number = 1;
	for (let data of result) {
		text += `\n
*${count++}. 📜 Judul :* ${data.judul}
*🎯 Publish :* ${data.tanggal}
*📍 Url :* ${data.url}`
count++
	}
	return text
}