const fetch = require('node-fetch');

let handler = async (m, { conn, args }) => {
  if (!args.length) {
    return m.reply('Harap masukkan kata kunci pencarian!\nContoh: .pinterest kucing lucu');
  }

  const query = args.join(' ');

  try {
    const pinterestRes = await fetch(`https://api.betabotz.eu.org/api/search/pinterest?text1=${encodeURIComponent(query)}&apikey=${lann}`);
    const data = await pinterestRes.json();

    if (!data.result || !data.result.length) {
      throw new Error("Tidak ada hasil ditemukan.");
    }

    let limit = Math.min(5, data.result.length);
    for (let i = 0; i < limit; i++) {
      await conn.sendMessage(m.chat, {
        image: { url: data.result[i] },
        caption: `Berikut hasil pencarian untuk: "${query}"`
      }, { quoted: m });
    }
  } catch (error) {
    m.reply(`Terjadi kesalahan: ${error.message}`);
  }
};

handler.help = ['pinterest <kata kunci>'];
handler.tags = ['downloader'];
handler.command = /^(pinterest|pin)$/i;
handler.register = true;
handler.limit = true;

module.exports = handler;