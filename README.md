## New Update

**Pembaruan :**
- Upload file ke repo bot github
- Update file repo bot github
- Delete file repo bot github
- Fix upload file ke server cdn 
- Menggunakan QR dan pairing code 
- Penggunaan pairing ```node . --pairing```
- Fitur 90% implementasi dari website api
- Penambah output url expres.js agar bisa di jalankan di render dsb.
  ## Note!
  **Important :**
  
- Untuk menggunakan bot ini, kamu diwajibkan mengisi ApiKey terlebih dahulu. Jika tidak mengisinya, bot tidak akan berfungsi dengan baik.
- Tidak disarankan menginstal bot ini di termux atau panel yang tidak mempunyai kelengkapan express, ffmpeg, imagemagick, webp.
  
- Menggunakan 60% fitur dari [`RestApi`](https://api.betabotz.eu.org) sebagai media downloader


## ApiKey Harga

| No | Plan/Role    | Limit          | Expired         | Harga |
|----|--------------|----------------|-----------------|-------|
| 1  | Free         | 30 Request/day| -               | Gratis|
| 2  | Cheap1       | 3000 Request   | 1 bulan         | 5000     |
| 3  | Cheap2       | 4000 Request   | 1 bulan         | 6000     |
| 4  | PREMIUM      | 5000 Request   | 1 bulan         | 7000     |
| 5  | VIP          | 10000 Request  | 2 bulan         | 12000     |
| 6  | VVIP         | 15000 Request  | 2 bulan         | 17000     |
| 7  | SUPREME      | 30000 Request  | 3 bulan         | 32000     |

- Jika ingin membeli ApiKey Cheap1, Cheap2, Premium, Vip, Vvip, Supreme silahkan register lalu pilih paket yang diinginkan dan tekan button order via qris [`Pilih`](https://api.betabotz.eu.org/price)

**Website Api :**
- BOTCAHX (Optional)[`Register`](https://api.botcahx.eu.org)
- Lann (Wajib) [`Register`](https://api.betabotz.eu.org)
- Setelah mendapatkan apikey silahkan paste di config.js pada bagian ```global.btc``` dan ```global.lann```

## Support

<a href="https://saweria.co/aetherscode" target="_blank"><img src="https://files.catbox.moe/i2ro3b.png" height="32px" alt="SAWERIA"></a>

### `Render`

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://dashboard.render.com/blueprint/new?repo=https%3A%2F%2Fgithub.com%2Faetherzcode%2FAETHERZBOTZ)


## Run On Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/aetherzcode/AETHERZBOTZ)
# Heroku Buildpack
### Instal Buildpack
```bash
* heroku/nodejs
* https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest.git
* https://github.com/clhuang/heroku-buildpack-webp-binaries.git
```

## UNTUK PENGGUNA WINDOWS/VPS/RDP

* Unduh & Instal Git [`Klik Disini`](https://git-scm.com/downloads)
* Unduh & Instal NodeJS [`Klik Disini`](https://nodejs.org/en/download)
* Unduh & Instal FFmpeg [`Klik Disini`](https://ffmpeg.org/download.html) (**Jangan Lupa Tambahkan FFmpeg ke variabel lingkungan PATH**)
* Unduh & Instal ImageMagick [`Klik Disini`](https://imagemagick.org/script/download.php)

```javascript
git clone https://github.com/aetherzcode/AETHERZBOTZ
cd AETHERZBOTZ
npm install
npm start
```
```javascript
// to get pairing code //

node index.js --pairing

```

## Creator

**Nama:** AETHER  
**GitHub:** [aetherzcode](https://github.com/aetherzcode)  
**Website:** [aetherz.xyz](https://aetherz.xyz) 
