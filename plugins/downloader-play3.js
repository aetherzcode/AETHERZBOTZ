const axios = require('axios');
const ytSearch = require('yt-search'); 

const formatAudio = ['mp3', 'm4a', 'webm', 'acc', 'flac', 'opus', 'ogg', 'wav'];
const formatVideo = ['360', '480', '720', '1080', '1440', '4k'];

const ddownr = {
  download: async (url, format) => {
    if (!formatAudio.includes(format) && !formatVideo.includes(format)) {
      throw new Error('Format tidak didukung, cek daftar format yang tersedia.');
    }

    const config = {
      method: 'GET',
      url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };

    try {
      const response = await axios.request(config);

      if (response.data && response.data.success) {
        const { id, title, info } = response.data;
        const { image } = info;
        const downloadUrl = await ddownr.cekProgress(id);

        return {
          id: id,
          image: image,
          title: title,
          downloadUrl: downloadUrl
        };
      } else {
        throw new Error('Gagal mengambil detail video.');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  cekProgress: async (id) => {
    const config = {
      method: 'GET',
      url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };

    try {
      while (true) {
        const response = await axios.request(config);

        if (response.data && response.data.success && response.data.progress === 1000) {
          return response.data.download_url;
        }
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};

const handler = async (m, { conn, usedPrefix, text, command }) => {
  if (!text) return m.reply(`Ketikkan nama lagu yang kamu sedang cari, misal\n${usedPrefix + command} dj kane`);

  try {
    const search = await ytSearch(text);
    const video = search.all[0];

    if (!video) {
      return m.reply('Lagu yang Anda cari tidak ditemukan.');
    }

    const detail = `*Youtube Audio Play*\n\n❏ Title : ${video.title}\n` +
      `❏ View : ${video.views}\n` +
      `❏ Author : ${video.author.name}\n` +
      `❏ Upload : ${video.ago}\n` +
      `🔗 Url : ${video.url}\n` +
      `_Proses pengunduhan audio..._`;

    await conn.sendMessage(m.chat, {
      text: detail,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: video.title,
          mediaType: 1,
          previewType: 1,
          body: `YT Play By AETHER`,
          thumbnailUrl: video.image,
          renderLargerThumbnail: true,
          mediaUrl: video.url,
          sourceUrl: video.url
        }
      }
    }, { quoted: m });

    const result = await ddownr.download(video.url, "mp3");
    if (!result.downloadUrl) return m.reply('Gagal mengunduh audio.');

    // Mengirimkan file sebagai dokumen
    await conn.sendMessage(m.chat, {
      document: { url: result.downloadUrl },
      mimetype: 'audio/mpeg',
      fileName: `${video.title}.mp3`
    }, { quoted: m });

    // Mengirimkan file sebagai voice note
    await conn.sendMessage(m.chat, {
      audio: { url: result.downloadUrl },
      mimetype: 'audio/mpeg',
      ptt: true // Mengirim sebagai voice note
    }, { quoted: m });

  } catch (error) {
    m.reply(`Terjadi kesalahan:\n${error.message}`);
  }
};

handler.help = ['play3'].map(v => v + ' <URL atau Judul Lagu>');
handler.tags = ['downloader'];
handler.command = /^(play3|song3|lagu|carikanlagu|cari kan lagu|songs3|musik|music)$/i;

module.exports = handler;