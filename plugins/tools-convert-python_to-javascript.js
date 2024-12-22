const axios = require('axios');
const handler = async (m, { text, command }) => {
  if (!text) {
    return m.reply(
      "masukkan code python yang ingin di cpnvert JavaScript."
    );
  }
  const url = "https://www.codeconvert.ai/api/free-convert";
  const headers = {
    Host: "www.codeconvert.ai",
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
    Accept: "*/*",
    Origin: "https://www.codeconvert.ai",
    Referer: "https://www.codeconvert.ai/python-to-javascript-converter",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
  };
  const data = {
    inputCodeText: text,
    inputLang: "Python",
    outputLang: "JavaScript",
    customInstruction: "",
  };

  try {
    m.reply("⏳sabar");
    const response = await axios.post(url, data, { headers });

    if (response?.data?.outputCodeText) {
      return m.reply(
        `✅ *Kode Berhasil Dikonversi ke JavaScript:*\n\n${response.data.outputCodeText}`
      );
    } else {
      return m.reply("❌ Gagal mengonversi kode. Silakan coba lagi.");
    }
  } catch (error) {
    console.error(error);
    return m.reply("❌ Terjadi kesalahan saat mengonversi kode.");
  }
};
handler.command = ["convertcode"];
handler.tags = ["tools"];
handler.help = ["convertcode code-piton"];
handler.limit = true;
handler.register = true;
module.exports = handler;