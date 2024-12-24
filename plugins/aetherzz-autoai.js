const fetch = require('node-fetch');
const search = require('yt-search');
const axios = require('axios');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.aetherzz = conn.aetherzz || {};

    if (!text) throw `*• Example:* ${usedPrefix}${command} *[on/off]*`;

    if (text.toLowerCase() === "on") {
        conn.aetherzz[m.sender] = { pesan: [] };
        m.reply("[ ✓ ] Berhasil Membuat Sesi Chat AETHERz-AI");
    } else if (text.toLowerCase() === "off") {
        delete conn.aetherzz[m.sender];
        m.reply("[ ✓ ] Berhasil Menghapus Sesi Chat AETHERz-AI");
    } else {
        throw `*• Example:* ${usedPrefix}${command} *[on/off]*`;
    }
};

handler.before = async (m, { conn, text }) => {
    conn.aetherzz = conn.aetherzz || {};
    if (!m.text || !conn.aetherzz[m.sender]) return;

    const skipPrefixes = [".", "#", "!", "/", "\\"];
    if (skipPrefixes.some(prefix => m.text.startsWith(prefix))) return;

    try {
        // Custom logic for AI
        const logic = `Mulai dari sekarang nama anda adalah AETHERz-Ai, anda adalah seorang kecerdasan buatan yang di buat oleh AETHER. \nSifat anda adalah baik, ramah, lucu. Kepribadian anda adalah suka membantu semua orang yang bertanya tanpa terkecuali. \nBahasa anda adalah bahasa Indonesia. Ubahlah gaya bahasa kamu menjadi sangat tidak formal seperti gaya bahasa sehari-hari \nyang dipakai oleh manusia. Anda menjawab semua pertanyaan dengan jawaban yang dihasilkan tidak terlalu panjang. \nTambahkan sedikit emoticon lucu pada jawaban kamu. Buatlah obrolan yang menyenangkan dan tidak membosankan.`;

   
        const response = await fetch(`https://api.betabotz.eu.org/api/search/openai-logic?text=${encodeURIComponent(m.text)}&logic=${encodeURIComponent(logic)}&apikey=${lann}`);
        const json = await response.json();
        
        if (json.message) {
            await conn.sendMessage(m.chat, {
                text: json.message,
                contextInfo: {
                    externalAdReply: {
                        mediaType: 1,
                        title: "AETHERz AI - Jawaban dari Pertanyaanmu",
                        body: "AETHERz-AI siap membantu 😄",
                        thumbnailUrl: "https://files.catbox.moe/v6potj.png",
                        sourceUrl: "https://aetherz.xyz",
                        renderLargerThumbnail: true, 
                        showAdAttribution: true
                    }
                }
            });
        }

       if (m.text.toLowerCase().includes("lagu")) {
            const look = await search(m.text);
            const convert = look.videos[0];
            if (!convert) throw 'Video/Audio Tidak Ditemukan';
            
            const response = await axios.get(`https://api.betabotz.eu.org/api/download/ytmp3?url=${convert.url}&apikey=${lann}`);        
            const res = response.data.result;      
            const { mp3, title, duration } = res;

            let caption = `*Title:* ${title}\n*Duration:* ${duration}`;
            await conn.sendMessage(m.chat, { 
                document: { url: mp3 }, 
                mimetype: 'audio/mpeg',
                fileName: `${title}.mp3`,
                caption: caption
            }, { quoted: m });
        }

        // Pinterest image search
        if (m.text.toLowerCase().includes("foto")) {
            const query = m.text.split("foto")[1]?.trim();
            if (!query) throw "Harap tulis kata kunci setelah 'foto'. Contoh: foto kucing lucu";

            const pinterestRes = await fetch(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(query)}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${encodeURIComponent(query)}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);
            const pinData = await pinterestRes.json();
            const pinImage = pinData.resource_response.data.results[0].images.orig.url;

            await conn.sendMessage(m.chat, { image: { url: pinImage }, caption: `Berikut hasil pencarian untuk: "${query}"` }, { quoted: m });
        }

    } catch (error) {
        m.reply(`Terjadi kesalahan: ${error.message}`);
    }
};

handler.command = ['aetherzz'];
handler.tags = ['ai'];
handler.help = ['aetherzz [on/off]'];
handler.register = false;

module.exports = handler;