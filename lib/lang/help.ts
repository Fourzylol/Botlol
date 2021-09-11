export const HelpToUrl = (prefix: string) => {
	return `Fitur ini berguna jika kamu ingin mengubah file menjadi link atau url,

*Contoh Hasil :* https://telegra.ph/file/bef8c24e804e81c6f71b4.jpg 
(tapi menggunakan server uguu.se ini cuman contoh)

*Contoh penggunaan :*

*-* ${prefix}tourl (reply media atau kirim media beserta caption ${prefix}tourl)

*Media support :*

*-* Gambar
*-* Video
*-* Document
*-* Audio

*Perintah terkait*: (Perintah terkait ini kamu juga bisa menggunakan command lain)

*-* ${prefix}tourl
*-* ${prefix}tolink

*NOTES :*

- _Fitur ini berhubungan dengan server https://uguu.se/_

- _Media yang kakak simpan akan bertahan selama 48 Jam (2 Hari) Dengan maksimal ukuran media 100 MB_

- _Jika ada yang error harap segera hubungi owner_

- _Fitur ini dapat di gunakan oleh semua orang jika bot aktif_

- _*DILARANG* menggunakan perintah ini untuk pornograpi/rasisme/ yang berkaitan dengan sesuatu yang bersifat sensitif atau sesuatu yang bersifat kejahatan_

- _Jika tetap melanggar bot tidak segan memblokir nomer anda dan melakukan banned_

- _Perintah terkait Adalah command yang saling berhubungan beberapa tidak dimasukkan kedalam menu_`
}
export const HelpSemoji = (prefix: string) => {
	return `Fitur ini berguna untuk mengubah emoji anda menjadi sticker

*Contoh Hasil :* https://bit.ly/3nohQ2a (Jika kamu ingin melihat hasil nya kamu bisa melihat di link tersebut)

*Contoh Penggunaan :*

*-* ${prefix}semoji 😂
*-* ${prefix}semoji microsoft ♥

*Perintah terkait*: (Perintah terkait ini kamu juga bisa menggunakan command lain)

*-* ${prefix}stickeremoji
*-* ${prefix}semoji
*-* ${prefix}stimoji
*-* ${prefix}emoji
*-* ${prefix}emot
*-* ${prefix}emotikon
*-* ${prefix}smoji

*FORMAT FITUR :*

- ${prefix}semoji <options> <emoji>
- Default option adalah apple anda bisa memasukkan tanpa options
- Gunakan tanpa tanda <>
- Contoh penggunaan seperti diatas
- Untuk list options ada dibawah

*LIST OPTIONS* :

1. Apple
2. Google
3. Samsung
4. Microsoft
5. Whatsapp
6. Twitter
7. Facebook
8. Skype
9. JoyPixel
10. Openmoji
11. Emojidex
12. Messenger
13. LG
14. HTC
15. Mozilla
16. Softbank
17. Docomo
18. KDDI

*NOTES :*

*-* _Fitur ini dapat mengubah emoji yang anda kirim menjadi sticker maksimal emoji untuk sementara support 1_

*-* _*DILARANG* melakukan spamming terhadap bot_

*-* _Jika tetap melanggar bot tidak segan memblokir nomer anda dan melakukan banned_

*-* _Fitur ini belum support penggabungan emoji Seperti ${prefix}semoji 🤣😂_
`
}
export const HelpTranslate = (prefix: string) => {
	return `Fitur ini di gunakan untuk melakukan translate bahasa (mengartikan bahasa),

*Contoh Hasil :*

Input : Hello, Welcome to RA BOT.
Translate : Halo, Selamat datang ke RA BOT.

*Contoh penggunaan :*

*-* ${prefix}translate id Hello Word
*-* ${prefix}translate en (reply pesan seseorang yang ingin di translate)
*-* ${prefix}translate Hello word (default bahasa adalah indonesia)

*Bahasa Support : (kode bahasa)*

- Ketik *${prefix}kodebhs* untuk melihat bahasa yang apa saja yang support digunakan untuk translate

*NOTES :*

- _Fitur ini membantu anda untuk mengubah bahasa yang tidak anda mengerti_

- _*DILARANG* menggunakan perintah ini untuk pornograpi/rasisme/ yang berkaitan dengan sesuatu yang bersifat sensitif atau sesuatu yang bersifat kejahatan_

- _Jika tetap melanggar bot tidak segan memblokir nomer anda dan melakukan banned_

- _Fitur ini berkaitan dengan kode bahasa yang kamu masukkan. ${prefix}translate (ini adalah command) id (ini adalah kode bahasa id ~> indonesia) Hello word (ini adalah kata yang ingin di ubah)_

- _tanda kurung () itu hanya kalimat / kata penjelasan gunakan perintah tanpa tanda kurung_
`
}
export const KodeBhs = `
List Kode bahasa :

zh-CN ~> Chinese (Simplified)
zh-TW ~> Chinese (Traditional)
af ~> Afrikaans
am ~> Amharic
ar ~> Arabic
auto ~> Automatic
az ~> Azerbaijani
be ~> Belarusian
bg ~> Bulgarian
bn ~> Bengali
bs ~> Bosnian
ca ~> Catalan
ceb ~> Cebuano
co ~> Corsican
cs ~> Czech
cy ~> Welsh
da ~> Danish
de ~> German
el ~> Greek
en ~> English
eo ~> Esperanto
es ~> Spanish
et ~> Estonian
eu ~> Basque
fa ~> Persian
fi ~> Finnish
fr ~> French
fy ~> Frisian
ga ~> Irish
gd ~> Scots Gaelic
gl ~> Galician
gu ~> Gujarati
ha ~> Hausa
haw ~> Hawaiian
he ~> Hebrew
hi ~> Hindi
hmn ~> Hmong
hr ~> Croatian
ht ~> Haitian Creole
hu ~> Hungarian
hy ~> Armenian
id ~> Indonesian
ig ~> Igbo
is ~> Icelandic
it ~> Italian
iw ~> Hebrew
ja ~> Japanese
jw ~> Javanese
ka ~> Georgian
kk ~> Kazakh
km ~> Khmer
kn ~> Kannada
ko ~> Korean
ku ~> Kurdish (Kurmanji)
ky ~> Kyrgyz
la ~> Latin
lb ~> Luxembourgish
lo ~> Lao
lt ~> Lithuanian
lv ~> Latvian
mg ~> Malagasy
mi ~> Maori
mk ~> Macedonian
ml ~> Malayalam
mn ~> Mongolian
mr ~> Marathi
ms ~> Malay
mt ~> Maltese
my ~> Myanmar (Burmese)
ne ~> Nepali
nl ~> Dutch
no ~> Norwegian
ny ~> Chichewa
pa ~> Punjabi
pl ~> Polish
ps ~> Pashto
pt ~> Portuguese
ro ~> Romanian
ru ~> Russian
sd ~> Sindhi
si ~> Sinhala
sk ~> Slovak
sl ~> Slovenian
sm ~> Samoan
sn ~> Shona
so ~> Somali
sq ~> Albanian
sr ~> Serbian
st ~> Sesotho
su ~> Sundanese
sv ~> Swedish
sw ~> Swahili
ta ~> Tamil
te ~> Telugu
tg ~> Tajik
th ~> Thai
tl ~> Filipino
tr ~> Turkish
uk ~> Ukrainian
ur ~> Urdu
uz ~> Uzbek
vi ~> Vietnamese
xh ~> Xhosa
yi ~> Yiddish
yo ~> Yoruba
zu ~> Zulu`

export const HelpStickerCircle = (prefix: string) => {
	return `Fitur ini akan membuat Gambar menjadi bulat / bundar dalam bentuk sticker

*Contoh Hasil :* https://bit.ly/3EhkD3c (Jika kamu ingin melihat hasil nya kamu bisa melihat di link tersebut)

*Contoh Penggunaan :*

*-* ${prefix}scircle (kirim media beserta caption ${prefix}scircle)
*-* ${prefix}scircle (reply media dengan caption ${prefix}scircle)

*Media support :*

- Image
- Sticker (Tidak support sticker gif)

*Perintah terkait*: (Perintah terkait ini kamu juga bisa menggunakan command lain)

*-* ${prefix}stikerc
*-* ${prefix}stickerc
*-* ${prefix}scircle
*-* ${prefix}stickercircle
*-* ${prefix}stikercirle

*NOTES :*

- _Fitur ini dapat digunakan untuk membuat sticker dalam bentuk bulat_

- _Fitur ini belum support bertype video/gif_

- _Fitur ini dapat di gunakan oleh semua orang jika bot aktif_

- _*DILARANG* menggunakan perintah ini untuk pornograpi/rasisme/ yang berkaitan dengan sesuatu yang bersifat sensitif atau sesuatu yang bersifat kejahatan_

- _Jika tetap melanggar bot tidak segan memblokir nomer anda dan melakukan banned_

- _Perintah terkait Adalah command yang saling berhubungan beberapa tidak dimasukkan kedalam menu_
`
}
export const HelpSticker = (prefix: string) => {
	return `Fitur ini akan dapat di gunakan untuk mengubah media menjadi sticker atau juga bisa di gunakan untuk mengubah watermark sticker

*Contoh Hasil :* https://bit.ly/39026d3 (Hasil Bisa kamu lihat seperti Gambar ini atau kunjungi link berikut )

*Contoh Penggunaan :*

*-* ${prefix}sticker (kirim atau reply media dengan caption untuk membuat sticker)
*-* ${prefix}sticker Punya RA (kirim atau reply media dengan caption untuk membuat sticker dengan costum watermark)
*-* ${prefix}sticker Ini WM RA (reply Sticker yang ingin di ubah watermarknya)

*Media support :*

- Image
- Video / Gif
- Document image/ Document Video
- Sticker Image/ Gif

*Perintah terkait*: (Perintah terkait ini kamu juga bisa menggunakan command lain)

*-* ${prefix}sticker
*-* ${prefix}s
*-* ${prefix}stiker
*-* ${prefix}stickergif
*-* ${prefix}stikergif
*-* ${prefix}sgif

*NOTES :*

- _Fitur ini dapat digunakan untuk membuat sticker atau mengubah watermark Sticker_

- _Fitur ini dapat di gunakan oleh semua orang jika bot aktif_

- _*DILARANG* menggunakan perintah ini untuk pornograpi/rasisme/ yang berkaitan dengan sesuatu yang bersifat sensitif atau sesuatu yang bersifat kejahatan_

- _Jika tetap melanggar bot tidak segan memblokir nomer anda dan melakukan banned_

- _Perintah terkait Adalah command yang saling berhubungan beberapa tidak dimasukkan kedalam menu_
`
}
export const HelpToVideo = (prefix: string) => {
	return `Fitur ini dapat di gunakan untuk mengubah Sticker Gif Menjadi Video,

*Contoh Penggunaan :* 

*-* ${prefix}tovid (reply sticker)

*Media support :*

*-* Sticker Gif

*Perintah terkait*: (Perintah terkait ini kamu juga bisa menggunakan command lain)

*-* ${prefix}tovideo
*-* ${prefix}tovid

*NOTES :*

- _Fitur ini dapat digunakan untuk mengconvert Sticker Gif menjadi Video / mp4_

- _Fitur ini dapat di gunakan oleh semua orang jika bot aktif_

- _*DILARANG* menggunakan perintah ini untuk pornograpi/rasisme/ yang berkaitan dengan sesuatu yang bersifat sensitif atau sesuatu yang bersifat kejahatan_

- _Jika tetap melanggar bot tidak segan memblokir nomer anda dan melakukan banned_

- _Perintah terkait Adalah command yang saling berhubungan beberapa tidak dimasukkan kedalam menu_
`
}
export const HelpToImg = (prefix: string) => {
	return `Fitur ini berguna jika anda ingin mengubah sticker menjadi Gambar (Tidak Support Sticker Gif)

*Contoh Penggunaan :*

*-* ${prefix}toimg (reply Sticker dengan caption)

*Media Support :*

*-* Sticker (Not Support Sticker Gif BACA NOTES KE 2)

*Perintah terkait*: (Perintah terkait ini kamu juga bisa menggunakan command lain)

*-* ${prefix}toimg
*-* ${prefix}toimage
*-* ${prefix}togambar

*NOTES :*

- _Fitur ini dapat digunakan untuk mengubah Sticker Menjadi Gambar_

- _Fitur ini tidak Support Sticker Gif, Jika Sticker Gif Gunakan Fitur to video atau anda ketik ${prefix}tovid -help_

- _Fitur ini dapat di gunakan oleh semua orang jika bot aktif_

- _*DILARANG* menggunakan perintah ini untuk pornograpi/rasisme/ yang berkaitan dengan sesuatu yang bersifat sensitif atau sesuatu yang bersifat kejahatan_

- _Jika tetap melanggar bot tidak segan memblokir nomer anda dan melakukan banned_

- _Perintah terkait Adalah command yang saling berhubungan beberapa tidak dimasukkan kedalam menu_
`
}
export const HelpToMP3 = (prefix: string) => {
	return `Fitur ini digunakan untuk mengubah Video menjadi mp3/sound,

*Contoh Hasil :* https://bit.ly/3l7GPUo  (Hasil Bisa kamu lihat seperti Gambar ini atau kunjungi link berikut )

*Contoh Penggunaan :*

*-* ${prefix}tomp3 (kirim video dengan caption)
*-* ${prefix}tomp3 (reply video dengan caption)

*Media support :*

*-* video/mp4

*NOTES :*

- _Fitur ini dapat digunakan untuk mengubah video Menjadi MP3/Audio_

- _Fitur ini dapat di gunakan oleh semua orang jika bot aktif_

- _*DILARANG* menggunakan perintah ini untuk pornograpi/rasisme/ yang berkaitan dengan sesuatu yang bersifat sensitif atau sesuatu yang bersifat kejahatan_

- _Jika tetap melanggar bot tidak segan memblokir nomer anda dan melakukan banned_
`
}

export const HelpKompas = (prefix: string) => {
	return `Fitur Ini dapat digunakan untuk melihat Berita Terkini di website https://www.kompas.com/ (Kompas),
Fitur Ini Berhubung langsung dengan Website https://www.kompas.com/.

*Contoh hasil : (Hanya Memberikan Ilustrasi / Gambaran Hasil:v)*

Bot Akan mengirimkan Berita terkini kompas dalam Jumlah yang didapatkan dari web tersebut, Fitur ini berpengaruh dengan perubahan dari web
Kompas langsung, Jika Kompas Tersebut tidak update/ berubah maka Otomatis Bot akan mengirimkan result yang sama.

*Contoh Penggunaan :*

*-* ${prefix}kompas

*NOTES :*

- _Fitur ini berfungsi jika kamu ingin mendapatkan kilasan info untuk berita kompas terkini._

- _Fitur ini dapat di gunakan oleh semua orang jika bot aktif_

- _*DILARANG* menggunakan perintah ini untuk pornograpi/rasisme/ yang berkaitan dengan sesuatu yang bersifat sensitif atau sesuatu yang bersifat kejahatan_

- _Jika tetap melanggar bot tidak segan memblokir nomer anda dan melakukan banned_
`
}
export const HelpDownloader = (prefix: string) => {
	return `Fitur ini Digunakan untuk mendownload media dari url, (tidak semua support),
All Fitur downloader dijadikan satu untuk mempermudah dalam kata lain auto detector link bersangkutan
	
*Contoh Penggunaan :* 

*-* ${prefix}download https://youtu.be/YYHyAIFG3iI
*-* ${prefix}download (reply url support)

*URL SUPPORT :*

*-* Youtube
*-* Tiktok
*-* Mediafire
*-* Facebook
*-* Instagram

*Perintah terkait*: (Perintah terkait ini kamu juga bisa menggunakan command lain)

*-* ${prefix}download
*-* ${prefix}downloader
*-* ${prefix}down

*Format Tambahan :* (Format Tambahan di khususkan untuk link tertentu atau jika tidak mengerti skip aja langsung tempel url)

*-* ${prefix}download <options> <url> (khusus tiktok)
    List Options : (list + examples)
	  -> ${prefix}download nowm https://vt.tiktok.com/ZSJKyGkeP (Berfungsi untuk mendownload Tiktok tanpa watermark)
	  -> ${prefix}download wm https://vt.tiktok.com/ZSJKyGkeP  (Berfungsi untuk mendownload Tiktok Berwatermark)
	  -> ${prefix}download musik https://vt.tiktok.com/ZSJKyGkeP (Berfungsi untuk mendownload tiktok berformat audio / musik)
	  -> ${prefix}download https://vt.tiktok.com/ZSJKyGkeP (bisa langsung tanpa options tambahan)
	Tambahan : (sekedar info untuk options Tiktok)
	  -> options nowm juga bisa diganti dengan (withoutwm, dan nowatermark)
	  -> options wm juga bisa diganti dengan (withwm, dan watermark)
	  -> options musik juga bisa diganti dengan (sound atau music)

*-* ${prefix}download <options> <url> (khusus youtube)
    List Options : (list + examples)
	  -> ${prefix}download mp4 https://youtu.be/YYHyAIFG3iI (Berfungsi untuk mendownload file berformat video/mp4)
	  -> ${prefix}download mp3 https://youtu.be/YYHyAIFG3iI (Berfungsi untuk mendownload file berformat audio/mp3)
	  -> ${prefix}download https://youtu.be/YYHyAIFG3iI (bisa langsung tanpa options tambahan)

*-* ${prefix}download <url> (khusus instagram)
    SUPPORT INSTAGRAM :
	  *->* Instagram Post (example  https://www.instagram.com/p/CTZFyLoFq34/)
	  *->* Instagram Reels (example https://www.instagram.com/reel/CRWHqdJFdVT/)
	  *->* Instagram IgTv (example https://www.instagram.com/tv/CQNk0StF31n/)

*NOTES :*

- _Fitur ini Berguna Untuk mendonwload dari link tertentu untuk mempermudah_

- _Anda bisa menggunakan Format tambahan untuk mendownload, Anda juga bisa langsung menginput link tanpa menggunakan options_

- _Fitur ini dapat di gunakan oleh semua orang jika bot aktif_

- _*DILARANG* menggunakan perintah ini untuk pornograpi/rasisme/yang berkaitan dengan sesuatu yang bersifat sensitif atau sesuatu yang bersifat kejahatan_

- _Jika tetap melanggar bot tidak segan memblokir nomer anda dan melakukan banned_

- _Perintah terkait Adalah command yang saling berhubungan beberapa tidak dimasukkan kedalam menu_
`
}
export const HelpMediaFire = (prefix: string) => {
	return `Fitur ini berguna untuk jika anda ingin mendownload file dari web https://www.mediafire.com

*Contoh penggunaan :*

*-* ${prefix}mediafire https://www.mediafire.com/file/ila4of0e6z55lgm/domino.apk/file
*-* ${prefix}mediafire (reply url mediafire)

*NOTES :*

- _Fitur ini Berguna jika kamu ingin mendownload File dari mediafire untuk mempercepat_

- _Fitur ini dapat di gunakan oleh semua orang jika bot aktif_

- _*DILARANG* menggunakan perintah ini untuk pornograpi/rasisme/yang berkaitan dengan sesuatu yang bersifat sensitif atau sesuatu yang bersifat kejahatan_

- _Jika tetap melanggar bot tidak segan memblokir nomer anda dan melakukan banned_
`
}
export const HelpInstagramDown = (prefix: string) => {
	return `Fitur ini dapat digunakan jika kamu ingin mendownload link dari instagram, fitur ini terhubung langsung dengan web https://instagram.com

*Contoh Penggunaan :*

*-* ${prefix}igdl https://www.instagram.com/p/CTZFyLoFq34/
*-* ${prefix}igdl (reply link instagram)

*SUPPORT INSTAGRAM :*

*-* Instagram Post (example  https://www.instagram.com/p/CTZFyLoFq34/)
*-* Instagram Reels (example https://www.instagram.com/reel/CRWHqdJFdVT/)
*-* Instagram IgTv (example https://www.instagram.com/tv/CQNk0StF31n/)

*Perintah terkait*: (Perintah terkait ini kamu juga bisa menggunakan command lain)

*-* ${prefix}instagram
*-* ${prefix}igdl
*-* ${prefix}igdown
*-* ${prefix}instadown
*-* ${prefix}insta

*NOTES :*

- _Fitur ini Berguna jika kamu ingin mendownload Video/image dari instagram_

- _Fitur ini berfungsi jika url memenuhi syarat support instagram/tidak private_

- _Jika Error berkemungkinan bot di blockir/postingan di private oleh user tersebut_

- _Fitur ini dapat di gunakan oleh semua orang jika bot aktif_

- _*DILARANG* menggunakan perintah ini untuk pornograpi/rasisme/yang berkaitan dengan sesuatu yang bersifat sensitif atau sesuatu yang bersifat kejahatan_

- _Jika tetap melanggar bot tidak segan memblokir nomer anda dan melakukan banned_

- _Perintah terkait Adalah command yang saling berhubungan beberapa tidak dimasukkan kedalam menu_
`	
}
export const HelpYoutubeDown = (prefix: string) => {
	return `Fitur ini berguna jika anda ingin mendownload video/sound dari link youtube

*Contoh penggunaan :*

*-* ${prefix}ytdl https://youtu.be/YYHyAIFG3iI (default : akan mengirimkan file berbentuk mp3)
*-* ${prefix}ytdl mp4 https://youtu.be/YYHyAIFG3iI (mengirim file dalam bentuk video)
*-* ${prefix}ytdl mp3 https://youtu.be/YYHyAIFG3iI (mengirim file dalam bentuk sound/mp3)
*-* ${prefix}ytdl <options> (reply url youtube)

*Format Tambahan :* (Format Tambahan di khususkan untuk link tertentu atau jika tidak mengerti skip aja langsung tempel url)

*-* ${prefix}ytdl <options> <url> (khusus youtube)
    List Options : (list + examples)
	  -> ${prefix}download mp4 https://youtu.be/YYHyAIFG3iI (Berfungsi untuk mendownload file berformat video/mp4)
	  -> ${prefix}download mp3 https://youtu.be/YYHyAIFG3iI (Berfungsi untuk mendownload file berformat audio/mp3)
	  -> ${prefix}download https://youtu.be/YYHyAIFG3iI (bisa langsung tanpa options tambahan)


*Perintah terkait*: (Perintah terkait ini kamu juga bisa menggunakan command lain)

*-* ${prefix}ytdl
*-* ${prefix}youtube

*NOTES :*

- _Fitur ini Berguna jika kamu ingin mendownload video/sound dari youtube_

- _Anda bisa menggunakan Format tambahan untuk mendownload, Anda juga bisa langsung menginput link tanpa menggunakan options_

- _Fitur ini dapat di gunakan oleh semua orang jika bot aktif_

- _*DILARANG* menggunakan perintah ini untuk pornograpi/rasisme/yang berkaitan dengan sesuatu yang bersifat sensitif atau sesuatu yang bersifat kejahatan_

- _Jika tetap melanggar bot tidak segan memblokir nomer anda dan melakukan banned_

- _Perintah terkait Adalah command yang saling berhubungan beberapa tidak dimasukkan kedalam menu_
`
}
export const HelpFacebook = (prefix: string) => {
	return `Fitur ini digunakan untuk mendownload url *VIDEO FACEBOOK*, Fitur ini hanya support untuk mendownload link video facebook Jika Image *DOWNLOAD SENDIRI!!* Tinggal SS Ribet amat hiduplu,
Fitur ini berhubungan dengan web facebook langsung 

*Contoh Penggunaan :*

*-* ${prefix}facebook https://www.facebook.com/facebook/videos/10153231379946729/

*Perintah terkait*: (Perintah terkait ini kamu juga bisa menggunakan command lain)

*-* ${prefix}fbdl
*-* ${prefix}facebook

*NOTES :*

- _Fitur ini Berguna jika kamu ingin mendownload video dari url facebook_

- _Fitur ini dapat di gunakan oleh semua orang jika bot aktif_

- _*DILARANG* menggunakan perintah ini untuk pornograpi/rasisme/yang berkaitan dengan sesuatu yang bersifat sensitif atau sesuatu yang bersifat kejahatan_

- _Jika tetap melanggar bot tidak segan memblokir nomer anda dan melakukan banned_

- _Perintah terkait Adalah command yang saling berhubungan beberapa tidak dimasukkan kedalam menu_
`
}
export const HelpTiktok = (prefix: string) => {
	return `Fitur ini digunakan untuk mendownload dari link tiktok Fitur ini Berhubungan langsung dengan  https://tiktok.com/ dan beberapa web downloader lain

*Contoh Penggunaan :* 

*-* ${prefix}tiktok https://vt.tiktok.com/ZSJKyGkeP (default no watermark kalo ga error)
*-* ${prefix}tiktok nowm https://vt.tiktok.com/ZSJKyGkeP (download video tiktok tanpa watermark)
*-* ${prefix}tiktok wm https://vt.tiktok.com/ZSJKyGkeP (download video tiktok berwatermark)
*-* ${prefix}tiktok musik https://vt.tiktok.com/ZSJKyGkeP (download musik/ sound tiktok)
*-* ${prefix}tiktok <options> (reply yang berkaitan dengan link tiktok)

*Perintah terkait*: (Perintah terkait ini kamu juga bisa menggunakan command lain)

*-* ${prefix}tiktok
*-* ${prefix}tt
*-* ${prefix}tiktokdl

*Format Tambahan :* (Format Tambahan digunakan untuk mendownload tiktok dengan options)

*-* ${prefix}tiktok <options> <url> (khusus tiktok)
    List Options : (list + examples)
	  -> ${prefix}tiktok nowm https://vt.tiktok.com/ZSJKyGkeP (Berfungsi untuk mendownload Tiktok tanpa watermark)
	  -> ${prefix}tiktok wm https://vt.tiktok.com/ZSJKyGkeP  (Berfungsi untuk mendownload Tiktok Berwatermark)
	  -> ${prefix}tiktok musik https://vt.tiktok.com/ZSJKyGkeP (Berfungsi untuk mendownload tiktok berformat audio / musik)
	  -> ${prefix}tiktok https://vt.tiktok.com/ZSJKyGkeP (bisa langsung tanpa options tambahan)
	Tambahan : (sekedar info untuk options Tiktok)
	  -> options nowm juga bisa diganti dengan (withoutwm, dan nowatermark)
	  -> options wm juga bisa diganti dengan (withwm, dan watermark)
	  -> options musik juga bisa diganti dengan (sound atau music)

*NOTES :*

- _Fitur ini Berguna jika kamu ingin mendownload video/sound dari url tiktok_

- _Anda bisa menggunakan Format tambahan untuk mendownload, Anda juga bisa langsung menginput link tanpa menggunakan options_

- _Fitur ini dapat di gunakan oleh semua orang jika bot aktif_

- _*DILARANG* menggunakan perintah ini untuk pornograpi/rasisme/yang berkaitan dengan sesuatu yang bersifat sensitif atau sesuatu yang bersifat kejahatan_

- _Jika tetap melanggar bot tidak segan memblokir nomer anda dan melakukan banned_

- _Perintah terkait Adalah command yang saling berhubungan beberapa tidak dimasukkan kedalam menu_
`
}
export const HelpAddGroup = `*「❗」* Mohon maaf fitur ini terdisable dari publik mencegah bot terbanned Hanya owner yang dapat menggunakannya`

export const HelpLinkGroup = (prefix: string) => {
	return `Fitur ini Berfungsi jika ingin mendapatkan link group, Fitur ini Hanya berfungsi jika bot menjadi admin di group

*Contoh hasil :*

*-* Bot akan mengirim reply link group seperti : https://chat.whatsap.xyz/blabblabla (sengaja type biar ga kena antilink bot lain:v)

*Contoh Penggunaan :* 

*-* ${prefix}linkgrup

*Perintah terkait*: (Perintah terkait ini kamu juga bisa menggunakan command lain)

*-* ${prefix}linkgroup
*-* ${prefix}linkgc
*-* ${prefix}inkgrup

*NOTES :*

- _Fitur ini Berguna jika kamu ingin mendapatkan link group anda_

- _Fitur ini berfungsi jika kamu admin group dan bot menjadi admin group_

- _Fitur ini dapat di gunakan oleh semua orang jika bot aktif_

- _*DILARANG* menggunakan perintah ini untuk pornograpi/rasisme/yang berkaitan dengan sesuatu yang bersifat sensitif atau sesuatu yang bersifat kejahatan_

- _Jika tetap melanggar bot tidak segan memblokir nomer anda dan melakukan banned_

- _Perintah terkait Adalah command yang saling berhubungan beberapa tidak dimasukkan kedalam menu_
`
}
export const HelpRevoked = (prefix: string) => {
	return `Fitur ini Berfungsi jika ingin menarik link group, Fitur ini Hanya berfungsi jika bot menjadi admin di group

*Contoh hasil :*

*-* Bot akan menarik link group

*Contoh Penggunaan :* 

*-* ${prefix}revoke

*Perintah terkait*: (Perintah terkait ini kamu juga bisa menggunakan command lain)

*-* ${prefix}revoke
*-* ${prefix}revoked

*NOTES :*

- _Fitur ini Berguna jika kamu ingin menarik tautan link group anda_

- _Fitur ini berfungsi jika kamu admin group dan bot menjadi admin group_

- _Fitur ini dapat di gunakan oleh semua orang jika bot aktif_

- _*DILARANG* menggunakan perintah ini untuk pornograpi/rasisme/yang berkaitan dengan sesuatu yang bersifat sensitif atau sesuatu yang bersifat kejahatan_

- _Jika tetap melanggar bot tidak segan memblokir nomer anda dan melakukan banned_

- _Perintah terkait Adalah command yang saling berhubungan beberapa tidak dimasukkan kedalam menu_`
}
export const HelpGroupOT = (prefix: string) => {
	return `Fitur ini Berfungsi jika ingin membuka atau menutup group, Fitur ini Hanya berfungsi jika bot menjadi admin di group

*Contoh hasil :*

*-* Bot akan membuka atau menutup group sesuai perintah anda

*Format :*

*-* ${prefix}group <options>
   List Options :
     -> open (untuk membuka group)
	 -> buka (untuk membuka group)
	 -> close (untuk menutup group)
	 -> tutup (untuk menutup group)
	 
*Contoh Penggunaan :* 

*-* ${prefix}group buka (untuk membuka group)
*-* ${prefix}group tutup (untuk menutup group)

*Perintah terkait*: (Perintah terkait ini kamu juga bisa menggunakan command lain)

*-* ${prefix}group
*-* ${prefix}group

*NOTES :*

- _Fitur ini Berguna jika kamu ingin membuka atau menutup group anda

- _Fitur ini berfungsi jika kamu admin group dan bot menjadi admin group_

- _Fitur ini dapat di gunakan oleh semua orang jika bot aktif_

- _*DILARANG* menggunakan perintah ini untuk pornograpi/rasisme/yang berkaitan dengan sesuatu yang bersifat sensitif atau sesuatu yang bersifat kejahatan_

- _Jika tetap melanggar bot tidak segan memblokir nomer anda dan melakukan banned_

- _Perintah terkait Adalah command yang saling berhubungan beberapa tidak dimasukkan kedalam menu_`
}