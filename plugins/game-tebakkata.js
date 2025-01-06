let fetch = require('node-fetch');

let timeout = 100000;
let poin = 10000;
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakkata = conn.tebakkata ? conn.tebakkata : {};
    let id = m.chat;
    if (id in conn.tebakkata) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini.', conn.tebakkata[id][0]);
        throw false;
    }

    try {
        let response = await fetch('https://api.tioo.eu.org/tebakkata');
        let src = await response.json();

        if (!src.status || !src.result || !src.result.soal || !src.result.jawaban) {
            conn.reply(m.chat, 'Tidak ada soal tersedia saat ini. Silakan coba lagi nanti.', m);
            return;
        }

        let json = src.result;
        
        let caption = `
${json.soal}

┌─⊷ *SOAL*
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Ketik ${usedPrefix}kata untuk bantuan
▢ Bonus: ${poin} money
▢ *Balas/reply soal ini untuk menjawab, Ketik .nyerah untuk menyerah*
└──────────────
`.trim();

        // Simpan soal aktif dalam objek
        conn.tebakkata[id] = [
            await conn.reply(m.chat, caption, m),
            json, poin,
            setTimeout(() => {
                if (conn.tebakkata[id]) {
                    conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakkata[id][0]);
                    delete conn.tebakkata[id];
                }
            }, timeout)
        ];
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, 'Terjadi kesalahan saat mengambil soal. Silakan coba lagi nanti.', m);
    }
};

handler.help = ['tebakkata'];
handler.tags = ['game'];
handler.command = /^tebakkata/i;
handler.register = false;
handler.group = true;

module.exports = handler;