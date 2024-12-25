const fs = require('fs').promises;
const path = require('path');

let handler = async (m, { conn }) => {
    try {
        m.reply('Tunggu sebentar, proses mendapatkan file config.js...');

        const filePath = path.join(__dirname, '../config.js');

        let sesi = await fs.readFile(filePath, 'utf-8');

        await conn.sendMessage(
            m.chat,
            { document: Buffer.from(sesi), mimetype: 'application/javascript', fileName: 'config.js' },
            { quoted: m }
        );
    } catch (err) {
        console.error(err);
        m.reply('Terjadi kesalahan saat mendapatkan file config.js. Pastikan file tersebut tersedia di path yang benar.');
    }
};

handler.help = ['getconfig'];
handler.tags = ['owner'];
handler.command = /^(getconfig)$/i;

handler.rowner = true;

module.exports = handler;