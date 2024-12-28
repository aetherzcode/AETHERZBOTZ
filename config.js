global.owner = ['YOUR_NUMBER']
global.mods = ['YOUR_NUMBER']
global.prems = ['YOUR_NUMBER']
global.numberowner = 'YOUR_NUMBER'
global.nameowner = 'YOUR_NAME'
global.mail = 'YOUR_EMAIL' 
global.namebot = 'YOUR_NAME_BOT'
global.wm = '© YOUR_NAMEBOT'
global.instagram = 'YOUR_LINK_INSTAGRAM'
global.gc = 'YOUR_LINK_GROUP'

// Ini Untuk Upload File Ke Channel Discord
global.webhookUrlDiscord = 'WEBHOOK_URL'
global.idChannelDiscord = 'DISCORD_CHANNEL_ID'

global.packname = 'Made With'
global.author = 'Bot WhatsApp'

global.wait = '_*Tunggu sedang di proses...*_'
global.eror = '_*Server Error*_'
global.stiker_wait = '*⫹⫺ Stiker sedang dibuat...*'

global.Qris = 'https://files.catbox.moe/ap9e2y.jpg'
global.Payment = `
*Metode Pembayaran Tersedia:*

1. **Dana**       : 085798045817
2. **OVO**        : 085798045817
3. **GoPay**      : 085798045817
4. **ShopeePay**  : 085798045817
5. **SeaBank**    : 901201296150
6. **BankJago**   : 104458766508
7. **Madera**     : 86100581006
8. **NeoBank**    : 5859459280114413

*Untuk QRIS, silakan scan gambar di bawah ini.*
`

global.ownerrepo = 'GITHUB_USERNAME'
global.repo = 'REPOSITORY_NAME'
global.githubToken = 'YOUR_GITHUB_TOKEN'

global.maxwarn = '2'
global.antiporn = true

global.lann = 'YOUR_APIKEY_HERE' 
global.btc = 'YOUR_APIKEY_HERE' 

global.APIs = {   
  lann: 'https://api.betabotz.eu.org',
  btc: 'https://api.botcahx.eu.org'
}
global.APIKeys = { 
  'https://api.betabotz.eu.org': global.lann, 
  'https://api.botcahx.eu.org': global.btc
}

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})
