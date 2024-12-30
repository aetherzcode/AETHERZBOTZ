const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const isOwner = m.sender === conn.user.jid;

  if (!isOwner) return m.reply("You are not authorized to use this command.");

  if (!m.mentionedJid[0]) {
    return m.reply('Tag the person to spam!\n\nExample: .spamtag @example | 10');
  }

  const [orang, Jumlah] = text.split("|").map(item => item.trim());
  const amount = parseInt(Jumlah, 10);

  if (isNaN(amount) || amount <= 0) {
    return m.reply('The number must be a positive number!');
  }

  for (let i = 0; i < amount; i++) {
    await conn.sendMessage(m.chat, {
      text: orang,
      mentions: [m.mentionedJid[0]]
    });
    await sleep(500);
  }
};

handler.help = ["spamtag"];
handler.tags = ["owner"];
handler.command = ["spamtag"];
handler.group = true;
handler.owner = true;

module.exports = handler;