const uploadImage = require('../lib/uploadImage.js');
const { sticker } = require('../lib/sticker.js');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [atas, bawah] = text.split`|`;
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!mime) throw `Balas Gambar Dengan Perintah\n\n${usedPrefix + command} <${atas ? atas : 'teks atas'}>|<${bawah ? bawah : 'teks bawah'}>`;
    if (!/image\/(jpe?g|png)/.test(mime)) throw `_*Mime ${mime} tidak didukung!*_`;
    let img = await q.download();
    let url = await uploadImage(img);
    let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas ? atas : '')}/${encodeURIComponent(bawah ? bawah : '')}.png?background=${url}`;
    let stiker = await sticker(false, meme, global.packname, global.author);
    if (stiker) await conn.sendFile(m.chat, stiker, '', global.author, m, '', { asSticker: 1 });
};

handler.help = ['smeme'];
handler.tags = ['tools'];
handler.command = /^(smeme)$/i;
handler.register = true;
handler.limit = true;

module.exports = handler;
