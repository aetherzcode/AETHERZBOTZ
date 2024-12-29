const fetch = require('node-fetch');

const handler = async (m, { args, conn, usedPrefix, command }) => {
    if (!args[0]) throw `Contoh penggunaan:\n\n${usedPrefix}${command} clash of clans`;

    try {
        const query = args.join(' ');
        conn.reply(m.chat, 'Sedang mencari... Mohon tunggu sebentar!', m);

        const response = await fetch(`https://api.agatz.xyz/api/happymod?message=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (!data || !data.data || !data.data.status || !data.data.hsl || data.data.hsl.length === 0) {
            throw 'Pencarian tidak ditemukan! Coba kata kunci lain.';
        }

        let resultText = `Hasil Pencarian untuk: "${query}"\n\n`;
        data.data.hsl.forEach((item, index) => {
            resultText += `${index + 1}. ${item.name}\n`;
            resultText += `Versi: ${item.version || 'Tidak tersedia'}\n`;
            resultText += `Link: ${item.url || 'Tidak tersedia'}\n\n`;
        });

        resultText += `Gunakan link di atas untuk mengunduh mod HappyMod yang kamu cari!\n`;

        conn.reply(m.chat, resultText.trim(), m);

    } catch (error) {
        console.error("Error detail:", error.message);
        conn.reply(m.chat, `Terjadi kesalahan: ${error.message}`, m);
    }
};

handler.help = ['happymod'];
handler.tags = ['search'];
handler.command = /^(happymod|hmsearch)$/i;

module.exports = handler;