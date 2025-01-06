let fetch = require('node-fetch');

let timeout = 100000;
let poin = 10000;
let src;
let handler = async (m, { conn, usedPrefix }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {};
    let id = m.chat;
    if (id in conn.tekateki) {
        if (conn.tekateki[id].length !== 0) return conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tekateki[id][0]);
        delete conn.tekateki[id]; 
        throw false;
    }
    
    if (!src) {
        const response = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tekateki.json');
        src = await response.json(); 
    }
    
    let json = src[Math.floor(Math.random() * src.length)];
    if (!json || !json.pertanyaan || !json.jawaban) throw "Terjadi kesalahan, ulangi lagi perintah!";
    
    let caption = `
*TEKA TEKI*

${json.pertanyaan}
┌─⊷ *SOAL*
▢ Waktu jawab *${(timeout / 1000).toFixed(2)} detik*
▢ Bonus: ${poin} money
▢ Bantuan ${usedPrefix}tete
▢ *Balas/ replay soal ini untuk menjawab*
└──────────────
    `.trim();
    
    conn.tekateki[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tekateki[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tekateki[id][0]);
            delete conn.tekateki[id];
        }, timeout)
    ];
}

handler.help = ['tekateki'];
handler.tags = ['game'];
handler.command = /^tekateki/i;
handler.group = true;

module.exports = handler;