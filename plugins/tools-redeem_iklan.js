const { MessageType } = require('@adiwajshing/baileys').default;

let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Check if the user is registered (add your registration check here)
    if (!(m.sender in global.db.data.users)) {
        conn.reply(m.chat, 'Kamu belum terdaftar. Silakan daftar terlebih dahulu.', m);
        return;
    }

    if (!text) return conn.reply(m.chat, `Penggunaan: ${usedPrefix + command} <code>`, m);

    if (!global.redeemCodes || Object.keys(global.redeemCodes).length === 0) {
        conn.reply(m.chat, 'Tidak ada kode redeem yang tersedia saat ini.', m);
        return;
    }

    if (!(text in global.redeemCodes)) {
        conn.reply(m.chat, 'Kode redeem tidak valid.', m);
        return;
    }

    const codeData = global.redeemCodes[text];

    if (codeData.claimedBy.length >= codeData.userLimit) {
        conn.reply(m.chat, 'Kode redeem telah habis.', m);
        return;
    }

    if (codeData.expiry && codeData.expiry < Date.now()) {
        conn.reply(m.chat, 'Kode redeem telah kadaluarsa.', m);
        return;
    }

    // Check if the user has already claimed this code
    if (codeData.claimedBy.includes(m.sender)) {
        conn.reply(m.chat, 'Anda sudah menukarkan kode redeem ini.', m);
        return;
    }

    codeData.claimedBy.push(m.sender);

    // Award the user with the rewards
    let user = global.db.data.users[m.sender] || { limit: 0, bank: 0, money: 0, exp: 0, premium: false, premiumTime: 0 };
    user.limit += codeData.limit || 0;
    user.bank += codeData.bank || 0;
    user.money += codeData.money || 0;
    user.exp += codeData.exp || 0; 

    if (codeData.premium && codeData.premium > 0) {
        // Using the addprem logic here
        const jumlahHari = 86400000 * parseInt(codeData.premium); // 86400000 milliseconds in a day
        const now = Date.now(); // Current time as milliseconds
        user.premium = true;

        // Calculate new premiumTime based on existing premiumTime
        if (now < user.premiumTime) {
            user.premiumTime += jumlahHari;
        } else {
            user.premiumTime = now + jumlahHari;
        }
    }

    global.db.data.users[m.sender] = user;

    const rewardMessage = generateRewardMessage(codeData);
    conn.reply(m.chat, `Selamat! Kamu telah berhasil menukarkan kode redeem ${text} dan mendapatkan:\n${rewardMessage}`, m);
};

function generateRewardMessage(codeData) {
    let message = '';
    if (codeData.exp) message += `+${codeData.exp} Exp\n`; // Changed 'xp' to 'exp'
    if (codeData.money) message += `+${codeData.money} Money\n`;
    if (codeData.bank) message += `+${codeData.bank} Bank\n`;
    if (codeData.limit) message += `+${codeData.limit} Limit\n`;
    if (codeData.premium && codeData.premium > 0) message += `Premium selama ${codeData.premium} hari\n`;
    return message.trim();
}

handler.help = ['redeem'];
handler.tags = ['xp']; 
handler.command = /^(redeem|redeemcode)$/i;

module.exports = handler;