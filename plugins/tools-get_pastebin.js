const fetch = require('node-fetch');
const handler = async (m, { args }) => {
  const link = args[0]?.trim();
  if (!link) {
    return m.reply('mana!');
  }
  if (!/^https:\/\/pastebin\.com\/[a-zA-Z0-9]+$/.test(link)) {
    return m.reply('url gk valid');
  }
  const pasteId = link.split('/').pop(); 
  try {
    const response = await fetch(`https://pastebin.com/raw/${pasteId}`);
    if (!response.ok) throw new Error('Gagal mengambil isi dari Pastebin.');
    const content = await response.text();
    if (!content) {
      return m.reply('Tidak ada isi yang ditemukan di Pastebin!');
    }
    m.reply(`${content}`);
  } catch (error) {
    console.error(error);
    m.reply('Terjadi kesalahan saat mengambil data dari Pastebin.');
  }
};
handler.command = ['getpb'];
handler.tags = ['tools'];
handler.help = ['getpb url'];
handler.limit = true;
handler.register = true;
module.exports = handler;