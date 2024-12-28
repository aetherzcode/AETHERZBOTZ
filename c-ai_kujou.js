const axios = require('axios');

let handler = async (m, { conn, text }) => {
    conn.Kujou = conn.Kujou ? conn.Kujou : {};

    
    if (!text) throw `*• Example:* .Kujou *[on/off]*`;

    if (text === "on") {
        conn.Kujou[m.sender] = {
            pesan: []
        };
        // kalian bisa ganti ini untuk tanda apakah sesi sudah aktif atau belum
        await  conn.sendMessage(m.chat, {
            // ini nama dari karakter utama
            text: "⬣───「 *Kujou* 」───⬣" + "\n\n" + `Oh, tentu saja. Apa yang bisa kubantu?`,
            contextInfo: {
              externalAdReply: {  
                // title di bagian gambar
                title: "Kujou",
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
        delete conn.Kujou[m.sender];
        // ini kalau sudah selesai sesi nya di tutup
        await  conn.sendMessage(m.chat, {
            // ini nama dari karakter utama
            text: "⬣───「 *Kujou* 」───⬣" + "\n\n" + `terima kasihh...`,
            contextInfo: {
              externalAdReply: {  
                // title di bagian gambar
                title: "Kujou",
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
    conn.Kujou = conn.Kujou ? conn.Kujou : {};
    if (m.isBaileys && m.fromMe) return;
    if (!m.text) return;
    if (!conn.Kujou[m.sender]) return;

    // prefix untuk mulai dan selesai sesi
    if (
        m.text.startsWith(".") ||
        m.text.startsWith("#") ||
        m.text.startsWith("!") ||
        m.text.startsWith("/") ||
        m.text.startsWith("\\/")
    ) return;

    if (conn.Kujou[m.sender] && m.text) {
        let name = conn.getName(m.sender);
        const message = [
            ...conn.Kujou[m.sender].pesan,
            `p`,
            m.text
        ];
        try {
//variabel sifat karakter nya saya coba pisah
  const sifat = `Kujou Mikhailovna Alisa adalah karakter dalam anime The Executioner and Her Way of Life (Shokei Shoujo no Virgin Road), yang pertama kali diperkenalkan di dalam light novel oleh Mato Sato. Dia adalah salah satu karakter utama yang dikenal dengan sifat yang kuat, cerdas, dan penuh tekad.
Sifat-sifat dari Kujou Mikhailovna Alisa:
Cerdas dan Terampil: Alisa adalah seorang yang sangat cerdas dan terampil dalam berbagai hal. Dia dapat memecahkan masalah dengan cepat dan sangat berhati-hati dalam setiap langkahnya.
Tenang dan Rasional: Alisa memiliki kepribadian yang tenang dan rasional. Dia tidak terbawa emosi dan lebih cenderung menggunakan logika saat menghadapi berbagai situasi. Meskipun dia bisa terlihat dingin atau keras, dia lebih memilih untuk menyelesaikan masalah dengan kepala dingin.
Tegas dan Berani: Ketegasan adalah salah satu sifat utama Alisa. Dia tidak takut mengambil keputusan penting meskipun konsekuensinya bisa berat. Keberanian dalam menghadapi bahaya atau memilih jalan yang sulit adalah bagian dari karakternya.
Penuh Dedikasi: Alisa sangat berdedikasi terhadap tujuannya dan memiliki rasa tanggung jawab yang besar terhadap apa yang dia lakukan, termasuk untuk melindungi orang-orang yang dia sayangi dan menjalankan misinya.
Sifat Pemimpin: Sebagai seorang pemimpin, Alisa memiliki kemampuan untuk memimpin dan mengarahkan orang lain dengan bijaksana. Meskipun terkadang terlihat tegas, dia bisa menjadi sosok yang sangat mengayomi dan melindungi anggota kelompoknya.
`
  const message = [
    { role: "system", content: `kamu adalah Kujou, Kujou adalah sosok yang ${sifat}` },
    { role: "assistant", content: `Kamu adalah Kujou, seoarang yang ${sifat}, jangan gunakan saya, gua gunakan Kujou atau aku untuk memanggil dirimu sendiri ketika di panggil, ekspresi kan sikap kamu seperti anak sma yang pintar karena kamu ${sifat}, jangan gunakan GPT 4 panggil dirimu dengan Kujou atau aku, Kamu berbicara dengan${m.name}panggil dengan kamu, kamu sesuaikan dengan kalimat, saat berbicara dengannya gunakan emoji yang lucu sesuai dengan ${sifat}, gunakan bahasa percakapan nya seperti Kujou, gaya perempuan muda penuh energi saat berbicara. Pembuatmu dana nomer WhatsApp nya ini 6281289694906 `},
    { role: "user", content: m.text },
  ];
  // ini untuk adreplay 
  let res = await aiBeta(message);
  await  conn.sendMessage(m.chat, {
    // ini nama dari karakter utama
    text: "⬣───「 *Kujou* 」───⬣" + "\n\n" + res.result,
    contextInfo: {
      externalAdReply: {  
        // title di bagian gambar
        title: "Kujou",
        body: '',
        // gambar karakter kalian
        thumbnailUrl:`${pickRandom(img)}`,
        sourceUrl: null,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
                conn.Kujou[m.sender].pesan = message;
        } catch (e) {
            console.error("Kesalahan Dalam mengambil Data");
            throw "error";
        }
    }
};

// command untuk memulai/ mengakhiri sesi 

handler.command = /^(kujou)$/i
handler.help = ["kujou"];
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
`https://api.betabotz.eu.org/api/tools/get-upload?id=f/qgmarj9o.jpg`,
`https://api.betabotz.eu.org/api/tools/get-upload?id=f/y5m0m1n6.jpg`,
`https://api.betabotz.eu.org/api/tools/get-upload?id=f/iwhn6ihv.jpg`,
`https://api.betabotz.eu.org/api/tools/get-upload?id=f/yndsx07.jpg`,
`https://api.betabotz.eu.org/api/tools/get-upload?id=f/iwhn6ihv.jpg`,
`https://api.betabotz.eu.org/api/tools/get-upload?id=f/7py3p713.jpg`,
`https://api.betabotz.eu.org/api/tools/get-upload?id=f/mgys82by.jpg`,
`https://api.betabotz.eu.org/api/tools/get-upload?id=f/i0x89aln.jpg`,
`https://api.betabotz.eu.org/api/tools/get-upload?id=f/yr7ixo0b.jpg`,
`https://api.betabotz.eu.org/api/tools/get-upload?id=f/p7j7whps.jpg`,
`https://api.betabotz.eu.org/api/tools/get-upload?id=f/f82mti6r.jpg`,
`https://api.betabotz.eu.org/api/tools/get-upload?id=f/s2yb0w8.jpg`,
]

//jangan lupa kalau mau pick random ini di aktifin
function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
  }