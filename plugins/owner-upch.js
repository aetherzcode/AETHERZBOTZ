const { proto } = require('@adiwajshing/baileys'); 

let handler = async (m, { conn, text }) => {
    try {

        let teks = text 
            ? text 
            : m.quoted && m.quoted.text 
            ? m.quoted.text 
            : m.quoted && m.quoted.caption 
            ? m.quoted.caption 
            : m.quoted && m.quoted.description 
            ? m.quoted.description 
            : '';
        if (!teks) {
            return m.reply('Harap masukkan teks untuk dikirim ke channel!');
        }

        await sendMessage(conn, teks);
        m.reply('Sukses mengirim pesan ke channel');
    } catch (e) {
        console.error(e);
        m.reply('Gagal mengirim pesan');
    }
};


handler.command = /^(ch)$/i; 
handler.owner = true; 
module.exports = handler; 


function sendMessage(conn, teks) {
    const msg = {
        conversation: teks,
    };
    const plaintext = proto.Message.encode(msg).finish();
    const plaintextNode = {
        tag: 'plaintext',
        attrs: {},
        content: plaintext,
    };
    const node = {
        tag: 'message',
        attrs: {
            to: '120363376612967837@newsletter', //isi dengan id channel kalian! 
            type: 'text',
        },
        content: [plaintextNode],
    };

    return conn.query(node); 
}