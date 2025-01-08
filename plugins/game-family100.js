const fs = require('fs');
const path = require('path');
const winScore = 500;

async function handler(m) {
    this.game = this.game ? this.game : {};
    let id = 'family100_' + m.chat;

    if (id in this.game) {
        return this.reply(
            m.chat,
            'Masih ada kuis yang belum terjawab di chat ini.\nKetik *MENYERAH* untuk mengakhiri.',
            this.game[id].msg
        );
    }

    const filePath = path.join(process.cwd(), 'json', 'family100.json');
    console.log('Mencoba membaca file:', filePath);
    
    let src;
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        console.log('Berhasil membaca file JSON');
        src = JSON.parse(fileContent);
        console.log('Berhasil mem-parsing JSON');
    } catch (error) {
        console.error('Error saat membaca atau mem-parsing file JSON:', error);
        return this.reply(m.chat, 'Terjadi kesalahan saat memuat soal. Coba lagi nanti.', m);
    }

    let json = src[Math.floor(Math.random() * src.length)];

    let caption = `
*Soal:* ${json.soal}
Terdapat *${json.jawaban.length}* jawaban${json.jawaban.find((v) => v.includes(' ')) ? `
(beberapa jawaban terdapat spasi)` : ''}
+${winScore} kredit sosial untuk setiap jawaban benar!

Ketik *MENYERAH* tanpa reply soal jika menyerah.
Reply soal ini untuk menjawab.
    `.trim();

    this.game[id] = {
        id,
        msg: await m.reply(caption),
        ...json,
        terjawab: Array.from(json.jawaban, () => false),
        winScore,
    };
}

handler.help = ['family100'];
handler.tags = ['game'];
handler.group = true;
handler.command = /^family100$/i;

module.exports = handler;