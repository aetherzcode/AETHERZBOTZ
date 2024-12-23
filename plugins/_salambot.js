let handler = async (m, { conn, args, command }) => {
    conn.reply(m.chat, `Waalaikumsalam`,m)
        }
handler.help = ['SALAM']
handler.tags = ['main']
handler.customPrefix = /^(assalamualaikum)$/i 
handler.command = new RegExp
handler.limit = false
handler.group = false


module.exports = handler