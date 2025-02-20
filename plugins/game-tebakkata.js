let fetch = require('node-fetch');

let timeout = 100000;
let poin = 10000;
let src;
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakkata = conn.tebakkata ? conn.tebakkata : {};
    let id = m.chat;
    if (id in conn.tebakkata) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakkata[id][0]);
        throw false;
    }
    
    if (!src) {
        const response = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json');
        src = await response.json();
    }
    
    let json = src[Math.floor(Math.random() * src.length)];
    if (!json) throw "Terjadi kesalahan, ulangi lagi perintah!";
    
    let caption = `
${json.soal}

┌─⊷ *SOAL*
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Ketik ${usedPrefix}kata untuk bantuan
▢ Bonus: ${poin} money
▢ *Balas/ replay soal ini untuk menjawab*
└──────────────
    `.trim();
    
    conn.tebakkata[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakkata[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakkata[id][0]);
            delete conn.tebakkata[id];
        }, timeout)
    ];
}

handler.help = ['tebakkata'];
handler.tags = ['game'];
handler.command = /^tebakkata/i;
handler.register = false;
handler.group = true;

module.exports = handler;