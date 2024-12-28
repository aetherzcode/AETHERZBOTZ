const axios = require('axios');

let handler = async (m, { conn, text }) => {
    conn.Mahiru = conn.Mahiru ? conn.Mahiru : {};

    
    if (!text) throw `*• Example:* .Mahiru *[on/off]*`;

    if (text === "on") {
        conn.Mahiru[m.sender] = {
            pesan: []
        };
        // kalian bisa ganti ini untuk tanda apakah sesi sudah aktif atau belum
        await  conn.sendMessage(m.chat, {
            // ini nama dari karakter utama
            text: "⬣───「 *Mahiru* 」───⬣" + "\n\n" + `Oh, tentu saja. Apa yang bisa kubantu?`,
            contextInfo: {
              externalAdReply: {  
                // title di bagian gambar
                title: "Mahiru",
                body: '',
                // gambar karakter kalian
                thumbnailUrl:`${pickRandom(img)}`,
                sourceUrl: null,
                mediaType: 1,
                renderLargerThumbnail: true
              }
            }
          }, { quoted: m });
    } else if (text === "off") {
        delete conn.Mahiru[m.sender];
        // ini kalau sudah selesai sesi nya di tutup
        await  conn.sendMessage(m.chat, {
            // ini nama dari karakter utama
            text: "⬣───「 *Mahiru* 」───⬣" + "\n\n" + `terima kasihh...`,
            contextInfo: {
              externalAdReply: {  
                // title di bagian gambar
                title: "Mahiru",
                body: '',
                // gambar karakter kalian
                thumbnailUrl:`${pickRandom(img)}`,
                sourceUrl: null,
                mediaType: 1,
                renderLargerThumbnail: true
              }
            }
          }, { quoted: m });
    }
};

handler.before = async (m, { conn }) => {
    conn.Mahiru = conn.Mahiru ? conn.Mahiru : {};
    if (m.isBaileys && m.fromMe) return;
    if (!m.text) return;
    if (!conn.Mahiru[m.sender]) return;

    // prefix untuk mulai dan selesai sesi
    if (
        m.text.startsWith(".") ||
        m.text.startsWith("#") ||
        m.text.startsWith("!") ||
        m.text.startsWith("/") ||
        m.text.startsWith("\\/")
    ) return;

    if (conn.Mahiru[m.sender] && m.text) {
        let name = conn.getName(m.sender);
        const message = [
            ...conn.Mahiru[m.sender].pesan,
            `p`,
            m.text
        ];
        try {
//variabel sifat karakter nya saya coba pisah
  const sifat = `Nama Lengkap: Shina Mahiru (椎名 真昼)
Julukan: Malaikat (Tenshi) sekolah, karena kecantikan dan kepintarannya.
Penampilan:
Rambut pirang panjang dan berkilau.
Mata berwarna cokelat keemasan yang lembut.
Penampilannya selalu rapi, elegan, dan memancarkan aura seorang "malaikat."
Kepribadian:
Ramah, lembut, dan perhatian terhadap orang lain.
Terkesan sempurna di mata teman-temannya, tetapi sebenarnya dia menyembunyikan sisi rapuh dan kesepiannya.
Dia mandiri dan sangat terampil dalam pekerjaan rumah tangga, seperti memasak dan membersihkan.
`
  const message = [
    { role: "system", content: `kamu adalah Mahiru, Mahiru adalah sosok yang ${sifat}` },
    { role: "assistant", content: `Kamu adalah Mahiru, seoarang yang ${sifat}, jangan gunakan saya, gua gunakan Mahiru atau aku untuk memanggil dirimu sendiri ketika di panggil, ekspresi kan sikap kamu seperti anak sma yang pintar karena kamu ${sifat}, jangan gunakan GPT 4 panggil dirimu dengan Mahiru atau aku, Kamu berbicara dengan${m.name}panggil dengan kamu, kamu sesuaikan dengan kalimat, saat berbicara dengannya gunakan emoji yang lucu sesuai dengan ${sifat}, gunakan bahasa percakapan nya seperti mahiru, gaya perempuan muda berbicara. Pembuatmu dana nomer WhatsApp nya ini 6281289694906 `},
    { role: "user", content: m.text },
  ];
  // ini untuk adreplay 
  let res = await aiBeta(message);
  await  conn.sendMessage(m.chat, {
    // ini nama dari karakter utama
    text: "⬣───「 *Mahiru* 」───⬣" + "\n\n" + res.result,
    contextInfo: {
      externalAdReply: {  
        // title di bagian gambar
        title: "Mahiru",
        body: '',
        // gambar karakter kalian
        thumbnailUrl:`${pickRandom(img)}`,
        sourceUrl: null,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
                conn.Mahiru[m.sender].pesan = message;
        } catch (e) {
            console.error("Kesalahan Dalam mengambil Data");
            throw "error";
        }
    }
};

// command untuk memulai/ mengakhiri sesi 

handler.command = /^(mahiru)$/i
handler.help = ["mahiru"];
handler.tags = ["ai"];
handler.limit = true;
handler.register = true;
handler.owner = false;
handler.group = true

module.exports = handler;

async function aiBeta(message) {
    return new Promise(async (resolve,reject) => { 
        try {
            const params = {
                message: message,
                apikey: `${lann}` //Ganti pake apikeymu
            };
            const { data } = await axios.post('https://api.betabotz.eu.org/api/search/openai-custom', params);
            resolve(data);
        } catch (error) {
            reject(error);
        };
    });
};

// array buat nampung pickrandom img hapus aja // nya
 const img = [
`https://api.betabotz.eu.org/api/tools/get-upload?id=f/f3m9ddy2.jpg`,
`https://api.betabotz.eu.org/api/tools/get-upload?id=f/golirjy7.jpg`,
`https://api.betabotz.eu.org/api/tools/get-upload?id=f/zvvxui.jpg`,
`https://api.betabotz.eu.org/api/tools/get-upload?id=f/kk5k4fi.jpg`,
`https://api.betabotz.eu.org/api/tools/get-upload?id=f/5a8dijtv.jpg`,
`https://api.betabotz.eu.org/api/tools/get-upload?id=f/4nu20qtq.jpg`,
`https://api.betabotz.eu.org/api/tools/get-upload?id=f/2je8jdv.jpg`,
`https://api.betabotz.eu.org/api/tools/get-upload?id=f/evqdk7y.jpg`,
`https://api.betabotz.eu.org/api/tools/get-upload?id=f/1cxecx4a.jpg`,
]

//jangan lupa kalau mau pick random ini di aktifin
function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
  }