let fetch = require('node-fetch');

let timeout = 100000;
let poin = 10000;
let handler = async (m, { conn, usedPrefix }) => {
    conn.susun = conn.susun ? conn.susun : {};
    let id = m.chat;
    if (id in conn.susun) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.susun[id][0]);
        throw false;
    }

    try {
        let response = await fetch(`https://api.tioo.eu.org/susunkata`);
        let data = await response.json();

        if (!data.status || !data.result || !data.result.soal || !data.result.tipe || !data.result.jawaban) {
            conn.reply(m.chat, 'Data soal tidak valid. Silakan coba lagi.', m);
            return;
        }

        let json = data.result;
        let caption = `
${json.soal}

┌─⊷ *SOAL*
▢ Tipe: ${json.tipe}
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Ketik ${usedPrefix}susn untuk bantuan
▢ Bonus: ${poin} money
▢ *Balas/reply soal ini untuk menjawab, .nyerah untuk menyerah*
└──────────────
`.trim();

        conn.susun[id] = [
            await conn.reply(m.chat, caption, m),
            json, poin,
            setTimeout(() => {
                if (conn.susun[id]) {
                    conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.susun[id][0]);
                    delete conn.susun[id];
                }
            }, timeout)
        ];
    } catch (error) {
        console.error("Error API:", error);
        conn.reply(m.chat, 'Terjadi kesalahan saat mengambil soal. Silakan coba lagi nanti.', m);
    }
};

handler.help = ['susunkata'];
handler.tags = ['game'];
handler.command = /^susunkata/i;
handler.register = false;
handler.group = true;

module.exports = handler;