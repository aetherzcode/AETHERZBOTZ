const owner3 = `${global.numberowner}@s.whatsapp.net`; // Format untuk WhatsApp ID

// Kode lainnya tetap sama
let handler = m => m;
handler.before = async function(m, { conn, participants, isPrems, isAdmin }) {
  if (!conn.danil_join) {
    conn.danil_join = {
      join: false,
      time: 0,
    };
  }
  const currentTime = Math.floor(Date.now() / 1000);

  if (!m.isGroup || conn.danil_join.time > currentTime) {
    return;
  }
  let messageText = "";
  let mentionedUsers = participants.map((u) => u.id).filter((v) => v !== conn.user.jid);
  switch (m.sender) {
    case `${owner3}`:
      messageText = `📣 *Perhatian semua* 📣, King ${global.nameowner} telah datang, beri hormat semua!!!`; // Menggunakan nameowner
      break;
  }
  if (messageText) {
    await conn.sendMessage(
      m.chat,
      {
        text: messageText,
      },
      {
        quoted: m,
        mentions: mentionedUsers,
      }
    );
    conn.danil_join = {
      join: true,
      time: currentTime + 1000,
    };
  }
};

module.exports = handler;