let { sticker5 } = require('../lib/sticker')
let fs = require('fs')
let fetch = require('node-fetch')

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    const packname = global.packname || 'Sticker'
    const author = global.author || 'Bot'
    
    text = text || m.quoted?.text || m.quoted?.caption || m.quoted?.description || ''
    if (!text) throw `Contoh penggunaan: ${usedPrefix + command} Lagi Ruwet`

    let res;
    const errorPath = `./media/sticker/emror.webp`

    try {
        if (command === 'attp') {
            res = `https://api.tioo.eu.org/attp?text=${encodeURIComponent(text.substring(0, 151))}`;
        } else if (command === 'ttp') {
            res = `https://api.tioo.eu.org/ttp?text=${encodeURIComponent(text.substring(0, 151))}`;
        } else if (command === 'brat') {
            res = `https://api.tioo.eu.org/brat?text=${encodeURIComponent(text.substring(0, 151))}`;
        } else {
            throw new Error('Perintah tidak dikenal');
        }

        let fetchResult = await fetch(res);
        if (!fetchResult.ok) throw new Error(`Gagal mengunduh gambar dari API: ${fetchResult.statusText}`);
        
        let imageBuffer = await fetchResult.buffer();
        let stiker = await sticker5(imageBuffer, null, packname, author, ['🎨']);
        
        if (stiker) {
            await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);
        } else {
            throw new Error('Pembuatan stiker gagal');
        }

    } catch (e) {
        console.error('Error:', e.message || e);

        if (fs.existsSync(errorPath)) {
            let errorSticker = fs.readFileSync(errorPath);
            await conn.sendFile(m.chat, errorSticker, 'error.webp', '', m);
        } else {
            await m.reply('Terjadi kesalahan, namun file error tidak ditemukan.');
        }
    }
}

handler.command = ['attp', 'ttp', 'brat']
handler.help = ['attp', 'ttp', 'brat']
handler.tags = ['sticker']
handler.limit = true
handler.group = false

module.exports = handler