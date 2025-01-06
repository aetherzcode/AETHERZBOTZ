let handler = async (m, { conn }) => {
    conn.tebakkata = conn.tebakkata ? conn.tebakkata : {};
    let id = m.chat;
    if (!(id in conn.tebakkata)) {
        m.reply('Tidak ada soal yang sedang berlangsung di chat ini.');
        return;
    }

    let json = conn.tebakkata[id][1]; 
    let clue = json.jawaban.replace(/[AIUEOaiueo]/g, '_'); 
    conn.reply(m.chat, `Petunjuk: ${clue}`, conn.tebakkata[id][0]);
};

handler.command = /^kata$/i; 
module.exports = handler;