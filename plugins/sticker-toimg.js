const sharp = require('sharp');

const handler = async (m, { conn, usedPrefix, command }) => {
  const notStickerMessage = `Reply sticker dengan command *${usedPrefix + command}*`;

  if (!m.quoted) throw notStickerMessage;

  const q = m.quoted || m;
  const mime = q.mimetype || '';

  if (!/image\/webp/.test(mime)) throw notStickerMessage;

  try {

    const media = await q.download();
    const decodedBuffer = await sharp(media).toFormat('png').toBuffer();
    if (decodedBuffer.length > 0) {
      await conn.sendFile(m.chat, decodedBuffer, 'out.png', wm, m);
    } else {
      throw `${global.eror}`;
    }
  } catch (error) {
    console.error(error);
    if (error.message === 'Timeout of 10000ms exceeded') {
      m.reply('Proses konversi terlalu lama. Silakan coba lagi.');
    } else {
      m.reply(global.eror);
    }
  }
};

handler.help = ['toimg'];
handler.tags = ['sticker'];
handler.command = ['toimg', 'toimage'];
handler.limit = true;
handler.register = true;

module.exports = handler;