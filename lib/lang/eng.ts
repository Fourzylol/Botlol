import { instaStalk, TiktokStalk, LirikResult, Azlirik,  GhStalk, Googlesearch, Question, Answer, PlayStore, youtubeDlCore, YoutubeMP3PlaySer2, YoutubeMP4PlaySer2, IgPostDown, IgReelsDown, IgTvDown, FaceBookDown,  TiktokDownloaders, ToUrlUguuse, Joox, KompasTerkini } from '../typings'
import { ChannelSearchResult, VideoSearchResult  } from 'yt-search'
import { WAGroupMetadata, WAGroupParticipant } from '@adiwajshing/baileys'
import parsems from 'parse-ms';
import moment from "moment-timezone";
import { convertAngka } from "../functions/function";
import { ITranslateResponse, languages } from "@vitalets/google-translate-api"
const html = require("html-filter");

moment.tz.setDefault('Asia/Jakarta').locale('id')

export const EngTest = (): string => {
    return `Test`
}
export const EngTungguDown = (Type: string) => {
	return `*⏳* Please Wait Executing Url ${Type}`
}
export const EngSupportStickerGif = (command: string) => {
	return `*「❗」*  Sorry, This Features is Not Supported For Gif Type Sticker. If You Are Confused, Please Type ${command} -help To Get More Info`
}
export const EngSuppotrFb = () => {
	return `*「❗」* Sorry, For Now The Facebook Downloader Only Support Links With Type Videos Only`
}
export const EngBlomSupport = (command: string) => {
	return `*「❗」* Sorry, Url Your Gife For Now Not Supported For Feature Downloader, If You Are Confused, Please Type ${command} -help To Get More Info.`
}
export const EngTunggu = (): string => {
	let kata: string[] = [
		`Please Wait, Try Executing The Command...`,
		`Please Wait, Bot Now Try To Executing The Command`,
		`Please Wait`,
		`Please Wait a Moment The Bot is Executing The Command`,
		`Wait a Moment The Bot is Executing The Command`,
		`Please Wait a Moment The Bot is Executing The Your Order`
	];
	let Loading: string[] = [
		`*⏳*`, `*⌛*`, `*⏱*`, `*⏲*`, `*🕰*`, `*🕔*`, `*🕖*`, `*🕙*`, `*🕧*`, `*🕞*`
	]
    return Loading[Math.floor(Math.random() * (Loading.length))] + " " + kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const EngBukanVid = (command: string): string => {
    return `Sorry, The File You Sent is Not Type Format Vide, If You Are Confused, Please Type ${command} -help To Get More Info.`
}
export const EngBukanAud = (): string => {
	let kata: string[] = [
		`*「❗」* Sorry, For Use This Command Please Reply Audio With Caption`,
		`*「❗」*  Please Reply Audio Using a Caption`,
		`*「❗」*  Sorry Bot Can't Run The Command, Because The Bot Doesn't Receive Audio`
	]
    return  kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const EngSuccesToVid = (Proses: string) => {
	let Success: string[] = [
		`*✅*`,
		`*✔*`
	]
	let kata: string[] = [
		`Success Convert Sticker To Video in Procces ${Proses}`,
		`Successfully Convert Sticker Into Video in Procces, ${Proses}`,
		`Successfully Execute Orders With Time, ${Proses}`
	]
	return Success[Math.floor(Math.random() * (Success.length))] + " " + kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const EngToVid = (): string => {
	let kata: string[] = [
		`*「❗」*  Sorry, an Error Occurred When Converting the Sticker Into a Video Please Use Other Media`,
		`*「❗」*  Sorry, There Was an Error When Converting The Sticker Into a Video, Please Used Different Media, Thank You 🙏🏻`,
		`*「❗」*  Sorry, an Error Occurred When The Bot Wanted to Convert the Sticker Into a Video, Please Change the Media.`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const EndToCute = (): string => {
    return `Sorry, an Error Occurred in The tocute Media Feature, Please Try Again.`
}
export const EngSuccesSetPrefix = (prefix: string, status: boolean): string => {
    return `Succes Changed Prefix To ${prefix}.\n\n*Current Prefix Status :* ${status ? 'multi' : prefix}`
}
export const EngSuccesSetMulti = (status: boolean): string => {
    return `Succes  ${status ? 'Enable Multi Prefix Mode' : 'Disable Multi Prefix Mode'}`
}
export const EngErrMulti = (status: boolean): string => {
    return `${
        status
            ? 'You Are Already In Multi Prefix Mode'
            : 'You Are Already In Non Multi Prefix Mode Check Your Prefix, Type prefix'
    }`
}
export const EngDonePushMulti = (Prefix: string): string => {
    return `Succes Add Prefix *[${Prefix}]* To Multi Prefix`
}
export const EngErrPushMulti = () => {
    return `Please Enter The Prefix You Want to Add, To The Multi Prefix`
}
export const EngDoneDelMulti = (Prefix: string): string => {
    return `Succes Delete Prefix *[${Prefix}]* In Multi Prefix`
}
export const EngErrDelMulti = (): string => {
    return `Please Enter The Prefix You Want To Felete In Multi Prefix`
}
export const EngMultiData = (prefix: string): string => {
    return `Multi Prefix Currently Is *${prefix}*`
}
export const EngBukanSticker = (caption: string): string => {
	let kata: string[] = [
		`*「❗」*Sorry, Please Reply Sticker With Caption *${caption}*, For Using This Feature. If You Are Confused, Please Type ${caption} -help To Get More Info.`
		`*「❗」* Sorry, You Not Reply Sticker Message Please Reply Sticker With Caption *${caption}*, For Using This Feature, If You Are Confused, Please Type ${caption} -help To Get More Info.`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const EngGagalSticker = (): string => {
	let kata: string[] = [
		`*「❗」*  Sorry If There Was an Error During The Process of Making The Sticker, Please Change to Another Media`,
		`*「❗」*  Sorry The Bot Can't Make a Sticker On The Media, Please Change the Another Media`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const EngFileGede = (sender: string): string => {
    return `Sorry @${sender.replace(/@s.whatsapp.net/i, '')} The Size of The Media You Sent is Too Large For This Feature`
}
export const LimitStorage = (): string => {
    return `Sorry, Your Storage Limit has Run Out. So That You Can Reuse it, Please Delete One of Your Media to Increase The Storage Limit`
}
export const EngIdDuplicate = (): string => {
    return `Sorry, The Id You Entered Is Already in The Bot Storage, Please Replace it With Another Id`
}
export const EngSuccesSave = (Id: string, Prefix: string, isOwner: boolean, limit: number): string => {
    return `
*ID :* ${Id}
*STATUS :* Succes Save Media Type ${Prefix}get ${Id} For Take Your File
*NOTES*
Your Remaining File Limit Remains  ${
        isOwner ? 'Unlimited' : Number(4 - limit)
    }, If It Runs Out You Can't Save Back`
}
export const EngMasukkanId = (): string => {
    return `Please Enter ID`
}
export const EngIdStorageKosong = (): string => {
    return `Sorry, The Storage ID You Want To Find is Empty or Not Found`
}
export const EngCheckStorage = (data: string[], sender: string): string => {
    let jumlah = 1
    let text = `*STORAGE*\n\n`
    for (let result of data) {
        text += `${jumlah}. ${result.split('.')[0].replace(sender, '')}\n`
        jumlah++
    }
    return text
}
export const EngTungguSearch = () => {
	let kata: string[] = [
		`*🔎* Wait a Minute I Will Find For you`,
		`*🔎* Wait a Minute I'am is looking For Your Order`,
		`*🔎* Please Wait a Minute Bot Searching Your Order`
	]
	return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const EngErrorMP3 = (): string => {
    return `Sorry, An Error Occurred in The Mp3 Media Feature, Please Try Again`
}
export const EngIgStalk = (data: instaStalk): string => {
    return `
	ㅤㅤ  *「 INSTA STALK 」* 


*🖥️ Id :* ${data.id}
*👤 Username :* ${data.username}
*🉐 Nickname :* ${data.nickname}
*⚔️ Category :* ${data.category}
*👥 Follower :* ${data.follower}
*🫂 Following :* ${data.following} 
*🛡️ Bio :* ${data.bio}
*🔖 Bussiness Acc :* ${data.akun_bisnis ? '✅' : '❎'}
*🔐 Private Acc :* ${data.private ?  '✅' : '❎'}
*📧 Verify Acc :* ${data.centang ?  '✅' : '❎'}
*📦 Total Post:* ${data.total_post}
`
}
export const EngUserKosong = (nama: string): string => {
	let kata: string[] = [
		`*❌* Sorry, Username ${nama} What You Want To Stalk Is Not Found`,
		`*❌* Sorry, Username ${nama} Is In't Not Found`,
		`*❌* Sorry, Username ${nama} What You Want Is Not Found, Please Change That Username  *🙏🏻*`,
		`*❌* Sorry, Username ${nama} What You Want Not Found, You Can Change That Username  *🙏🏻*`,
		`*❌* Sorry, Username ${nama} What You Want Not Found, Please Change Username  *🙏🏻*`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const EngUsernameNoKosong = (nama: string) => {
	let kata: string[] = [
		`*「❗」*Please Enter The Username ${nama}, Which You Want To Stalk`,
		`*「❗」* Sorry, Please Enter The Username ${nama} Which You Want To Search  *🙏🏻*`
	]
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const EngAntiDahViewOnce = (status: boolean) => {
	let kata: string[] = [
		`*「❗」* Sorry Anti View Once Mode ${status ? "Already Enable" : "Already Turned Off"} In This Group`,
		`*「❗」* Sorry Anti View Once Mode ${status ? "Enable" : "Unable"} In This Group`,
	]
	return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const EngMuted = (status: boolean, metadata: WAGroupMetadata) => {
	return `ㅤ   *「 MUTED 」* 

*🛡 ID :* ${metadata.id}
*💫 STATUS :* ${status ? "ACTIVE" : "UNACTIVE"}
*🌐 IN :* ${metadata.subject}
`
}
export const IndMutedDah = (status: boolean) => {
	let kata: string[] = [
		`*「❗」* Sorry Mute Mode Is ${status ? "Already Enable" : "Already Turned Off"} In This Group`,
		`*「❗」* Sorry Mute Mode Is ${status ? "Active" : "Unactive"} In This Group`
	]
	return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const EngAntiViewOnce = (status: boolean, metadata: WAGroupMetadata) => {
	return  `ㅤ   *「 ANTI VIEW ONCE 」* 

*💠 ID :* ${metadata.id}
*⚠ STATUS :* ${status ? "ACTIVE" : "UNACTIVE"}
*🖋 IN :* ${metadata.subject}
`
}
export const EngYtStalk = (data: ChannelSearchResult): string => {
    return `ㅤㅤㅤ  *「 YT STALK 」* 


*🎬 Channel Name :* ${data.name}
*🌐 Url :* ${data.url}
*📽 Video Count :* ${data.videoCount}
*👥 Subcriber Count :* ${data.subCountLabel}
`
}
export const EngYtStalkError = (): string => {
	let kata: string[] = [
		`*「❗」* Sorry, For Right Now Feature Youtube Stalk Error Please Try Again Next Time`,
		`*「❗」* Sorry, The Youtube Stalk Feature is Currently Error, You Can Try Next Time`
	]
    return  kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const EngGhStalk = (data:  GhStalk ) => {
	return `	ㅤㅤ   *「 GITHUB STALK 」*


*💫 URL :* ${data.html_url}
*🌐 ID :* ${data.id}
*🕵🏻‍♂️ Username :* ${data.login}
*👤 Name :* ${data.name}
*👥 Followers :* ${data.followers}
*🫂 Following :* ${data.following}
*🔰 Type :* ${data.type}
*🏬 Company :* ${data.company ?? "Not Recorded"}
*🧭 Blog :* ${data.blog == "" ?? "Not Recorded"}
*💌 Email :* ${data.email ?? "Email Not Detected"}
*🛡️ Bio :* ${data.bio ?? "Nothing"}
*🖥️ Username Twitter :* ${data.twitter_username ?? "Not Listed"}
*💠 Public Repo :* ${data.public_repos}
*💥 Publik Git :* ${data.public_gists}
*🎥 Created At :* ${moment(data.created_at).format("LLLL")}
*🕒 Date At :* ${moment(data.updated_at).format("LLLL")}
`
}
export const EngTiktokStalk = (data: TiktokStalk): string => {
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
*👤 Nickname :* ${data.nickname}
*👥 Followers :* ${data.follower}
*🫂  Following :* ${data.following}
*❤ Likes :* ${data.suka}
*🎞 Total Video :* ${data.total_video}
*🎥 Uploaded At :* ${TanggalUpload}
*📧 Verified Acc :* ${data.verified ?  '✅' : '❎'}
*🔐 Private Acc :* ${data.privateAccount ?  '✅' : '❎'}
*🌐 Bio Link :* ${data.bioLink ? data.bioLink.link : ''}
*🛡️ Signature :* ${data.signature}
`
}
export const EngMasukkanUsernameNoUrl = (fitur: string): string => {
	let kata: string[] = [
		`*「❗」*  Please Enter The Username ${fitur} Not The Url`,
		`*「❗」*  Sorry, Please Enter The Username ${fitur}, Not The URL`
	];
    return kata[Math.floor(Math.random() * (kata.length))].trim()
}
export const Engverifikasi = (status: number, otp: string, data?: { nama: string, id: string, dalam: string}): string => {
    if (status === 1) {
        return `Your Verification Code is ${otp}, You Can Only Request Another Code in 5 Minutes.\n\nType Your Verification Code Validly So That Bots Can Verify That You Are a User`
    } else if (status === 2) {
        return `Your Verification Code is ${otp}, You Can Only Request Another Code in 90 Minutes.\n\nType Your Verification Code Validly So That Bots Can Verify That You Are a User`
    } else if (status === 3) {
        return `Your Verification Code is ${otp}, You Can Only Request Another Code in 8 Hours.\n\nType Your Verification Code Validly So That Bots Can Verify That You Are a User`
    } else if (status === 4) {
        return `ㅤㅤㅤ  *「 VERIFICATION 」* 

*❒ Name :* ${data?.nama}
*❒ Id :* ${data?.id}
*❒ Status :* SUCCESS
*❒ In :* ${data?.dalam}`
    } else {
        return ''
    }
}
export const EngSdhVerifikasi = (nama: string) => {
	nama = /@s.whatsapp.net/i.test(nama) ? "@"+ nama.replace("@s.whatsapp.net", "") : nama
	const result = [`*「❗」* Sorry, ${nama}, You Have Been Verified, You Only Need to Verify Once, You Don't Have To Do It Repeatedly`, `*「❗」* Sorry, ${nama}, You Have Verified Before`, `*「❗」* Sorry ${nama}, You Have Been Verified, Please Don't Use This Command Again  🙏🏻`]
	return result[Math.floor(Math.random() * (result.length))]
}
export const EngPublicSucces = (status: boolean): string => {
    return `Successfully Changed Status Bot ${status ? 'To Public' : 'To Self'}`
}
export const EngPublicDuplicate = (status: boolean): string => {
    return `Status Bot For Now is ${status ? 'PUBLIC' : 'SELF'}`
}
export const EngPrefix = (Pref: string): string => {
    return `Your Prefix Now Is *[${Pref}]*`
}
export const IndSpammer = (): string => {
    return `Warning! Please Wait For Your Previous Command To End Prevent Spam`
}
