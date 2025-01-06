let fetch = require('node-fetch');

let timeout = 100000;
let poin = 10000;
let src;
let handler = async (m, { conn, usedPrefix }) => {
    conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {};
    let id = m.chat;
    if (id in conn.siapakahaku) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.siapakahaku[id][0]);
        throw false;
    }
    
    // Mengambil data dari URL yang diberikan
    if (!src) {
        const response = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/siapakahaku.json');
        src = await response.json();
    }
    
    // Memilih karakter secara acak
    let json = src[Math.floor(Math.random() * src.length)];
    if (!json) throw "Terjadi kesalahan, ulangi lagi perintah!";
    
    // Buat caption untuk ditampilkan di WhatsApp
    let caption = `
${json.soal}

┌─⊷ *SOAL*
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Ketik ${usedPrefix}maka untuk bantuan
▢ Bonus: ${poin} money
▢ *Balas/ replay soal ini untuk menjawab*
└──────────────
    `.trim();
    
    conn.siapakahaku[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.siapakahaku[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.siapakahaku[id][0]);
            delete conn.siapakahaku[id];
        }, timeout)
    ];
}

handler.help = ['siapakahaku'];
handler.tags = ['game'];
handler.command = /^siapakahaku/i;
handler.register = false;
handler.group = true;

module.exports = handler;