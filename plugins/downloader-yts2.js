const yts = require('yt-search')
let axios = require("axios");
let handler = async (m, { conn, text, usedPrefix, command}) => {
    if (!text) throw `[❗] *Penggunaan:* ${usedPrefix + command} <search>`;   
    conn.sendMessage(m.chat, { react: { text: '🎧', key: m.key }})
    let anu = (await yts(text)).all
    let video = anu.filter(v => v.type === 'video') 
    let channel = anu.filter(v => v.type === 'channel') 
    if (!anu) throw 'Video/Audio Tidak Ditemukan';
    let { title } = anu;
    let responseText = '[❗] Balas pesan ini dengan nomor untuk mendapatkan lagunya.\n\n';
video.forEach(async(data, index) => {
        responseText += `*${index + 1}.* ${data.title} || ${data.timestamp}\n`;
    });
    const { key } = await conn.reply(m.chat, responseText, m);   
    conn.ytsearch[m.sender] = { anu, key, title };
switch (command) {
case "yts3" : {
handler.before = async (m, { conn }) => {
    conn.ytsearch = conn.ytsearch ? conn.ytsearch : {};
    if (m.isBaileys || !(m.sender in conn.ytsearch)) return;
    const { anu, key, title } = conn.ytsearch[m.sender];
    if (!m.quoted || m.quoted.id !== key.id || !m.text) return;
    const choice = m.text.trim();
    const inputNumber = Number(choice);
    if (inputNumber >= 1 && inputNumber <= anu.length) {
        conn.sendMessage(m.chat, { delete: key });
        delete conn.ytsearch[m.sender];
        const selectedTrack = anu[inputNumber - 1];
        try {
            if (anu.seconds >= 3600) {
            return conn.reply(m.chat, 'Video is longer than 1 hour!', m);
            } else {
            let audioUrl = await youtube(selectedTrack.url);
            let audioLink = audioUrl.result.mp3
            let caption = '';
            caption += `∘ Title : ${selectedTrack.title}\n`;
            caption += `∘ Ext : Search\n`;
            caption += `∘ ID : ${selectedTrack.videoId}\n`;
            caption += `∘ Duration : ${selectedTrack.timestamp}\n`;
            caption += `∘ Viewers : ${selectedTrack.views}\n`;
            caption += `∘ Upload At : ${selectedTrack.ago}\n`;
            caption += `∘ Author : ${selectedTrack.author.name}\n`;
            caption += `∘ Channel : ${selectedTrack.author.url}\n`;
            caption += `∘ Url : ${selectedTrack.url}\n`;
            caption += `∘ Description : ${selectedTrack.description}\n`;
            caption += `∘ Thumbnail : ${selectedTrack.image}`;

            await conn.relayMessage(m.chat, {
                extendedTextMessage: {
                    text: caption,
                    contextInfo: {
                        externalAdReply: {
                            title: selectedTrack.title,
                            mediaType: 1,
                            previewType: 0,
                            renderLargerThumbnail: true,
                            thumbnailUrl: selectedTrack.image,
                            sourceUrl: audioUrl.mp3
                        }
                    },
                    mentions: [m.sender]
                }
            }, {});
            conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key }})
            await conn.sendMessage(m.chat, {
            audio: {
            url: `${audioLink}`
            },
            mimetype: 'audio/mp4', 
            fileName: `${title}.mp3`,
            },{ quoted: m})
            }
        } catch (error) {
            console.error('Error downloading and sending audio:', error);
            await conn.reply(m.chat, 'error saat menngambil data, coba lagi dengan nomor yang lain tau hubungi owner!', m);
            conn.sendMessage(m.chat, { react: { text: '🚫', key: m.key }})
        }
    } else {
        await conn.reply(m.chat, "[❗] Nomor urut tidak valid. Silakan pilih nomor yang sesuai dengan daftar di atas.", m);
        conn.sendMessage(m.chat, { react: { text: '🚫', key: m.key }})
     }
   }
 }
  break
 case "yts4" : {
 handler.before = async (m, { conn }) => {
    conn.ytsearch = conn.ytsearch ? conn.ytsearch : {};
    if (m.isBaileys || !(m.sender in conn.ytsearch)) return;
    const { anu, key, title } = conn.ytsearch[m.sender];
    if (!m.quoted || m.quoted.id !== key.id || !m.text) return;
    const choice = m.text.trim();
    const inputNumber = Number(choice);
    if (inputNumber >= 1 && inputNumber <= anu.length) {
        conn.sendMessage(m.chat, { delete: key });
        delete conn.ytsearch[m.sender];
        const selectedTrack = anu[inputNumber - 1];
        try {
            if (anu.seconds >= 3600) {
            return conn.reply(m.chat, 'Video is longer than 1 hour!', m);
            } else {
            let videoUrl = await youtube(selectedTrack.url);
            let videoLink = videoUrl.result.mp4
             let tekss = '';
            tekss += `∘ Viewers : ${selectedTrack.views}\n`;
            tekss += `∘ Upload At : ${selectedTrack.ago}\n`;
            tekss += `∘ Channel : ${selectedTrack.author.url}\n`;
            tekss += `∘ Url : ${selectedTrack.url}\n`;
            tekss += `∘ Description : ${selectedTrack.description}\n`;
            conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key }})
            await conn.sendMessage(m.chat, {
            video : {
            url: `${videoLink}`
            },
            caption : `${tekss}`
            },{ quoted: m})
            }
        } catch (error) {
            console.error('Error downloading and sending audio:', error);
            await conn.reply(m.chat, 'error saat menngambil data, coba lagi dengan nomor yang lain tau hubungi owner!', m);
            conn.sendMessage(m.chat, { react: { text: '🚫', key: m.key }})
        }
    } else {
        await conn.reply(m.chat, "[❗] Nomor urut tidak valid. Silakan pilih nomor yang sesuai dengan daftar di atas.", m);
        conn.sendMessage(m.chat, { react: { text: '🚫', key: m.key }})
      }
    }
  }
 break
}
};
handler.help = ['yts3 <pencarian>', 'yts4 <pencarian>'];
handler.tags = ['downloader'];
handler.command = /^(yts3|yts4)$/i;
handler.limit = true;
handler.register = true;
module.exports = handler;

async function youtube(url) {
   try {
   const { data } = await axios.get("https://api.betabotz.eu.org/api/download/yt?url="+url+"&apikey="+lann)
   return data;
   } catch (e) {
   return e;
   }
}