let handler = async (m, { conn }) => {
    conn.susun = conn.susun ? conn.susun : {};
    let id = m.chat;
    if (!(id in conn.susun)) {
        m.reply('Tidak ada soal yang sedang berlangsung di chat ini.');
        return;
    }

    let json = conn.susun[id][1];
    conn.reply(m.chat, `Kamu menyerah? Cemen kali bjir!\nJawabannya adalah *${json.jawaban}*`, conn.susun[id][0]);
    clearTimeout(conn.susun[id][3]);
    delete conn.susun[id];
};

handler.command = /^nyerah$/i; 
module.exports = handler;