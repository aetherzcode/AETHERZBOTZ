const similarity = require('similarity');
const threshold = 0.72;

module.exports = {
    async before(m) {
        
        this.game = this.game ? this.game : {};
        let id = 'family100_' + m.chat;
        if (!(id in this.game)) return true; 
        
        let room = this.game[id];
        if (!room.jawaban) {
            delete this.game[id];
            return true; 
        }

        let text = m.text.toLowerCase().replace(/[^\w\s\-]+/, ''); 
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text); 

        if (!isSurrender) {
            let index = room.jawaban.indexOf(text);
            if (index < 0) {
                let maxSimilarity = Math.max(
                    ...room.jawaban
                        .filter((_, i) => !room.terjawab[i])
                        .map((jawaban) => similarity(jawaban, text))
                );
                if (maxSimilarity >= threshold) {
                    m.reply('Dikit lagi!');
                } else {
                    m.reply('*Salah!*');
                }
                return true;
            }

            if (room.terjawab[index]) return true;

            room.terjawab[index] = m.sender;
            m.reply(`*Benar!*\n+${room.winScore} XP`);
        }

        let isWin = room.terjawab.every(Boolean);
        let caption = `
*Soal:* ${room.soal}
Terdapat *${room.jawaban.length}* jawaban${room.jawaban.find((v) => v.includes(' ')) ? `
(beberapa jawaban terdapat spasi)` : ''}
${isWin ? '*SEMUA JAWABAN TERJAWAB!*' : isSurrender ? '*MENYERAH!*' : ''}
${room.jawaban
            .map((jawaban, i) => {
                return `${i + 1}. ${jawaban} ${room.terjawab[i] ? `✔️ (${room.terjawab[i]})` : ''}`;
            })
            .join('\n')}
        `.trim();

        // kirim ulang soal
        if (room.msg_old) await this.sendMessage(m.chat, { delete: room.msg_old.key }).catch(() => { });
        room.msg_old = await this.reply(m.chat, caption, m);

        // delete game klo udh selesai
        if (isWin || isSurrender) {
            setTimeout(() => {
                delete this.game[id];
            }, 10000); // wait 10 detik sebelum delete game
        }
        return true;
    },
};