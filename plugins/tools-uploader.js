const uploadFile = require('../lib/uploadFile');
const uploadImage = require('../lib/uploadImage');

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!mime) throw 'Tidak ada media yang ditemukan';

  let media = await q.download();
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
  let fileSizeLimit = 5 * 1024 * 1024; // Batas ukuran 5 MB
  
  if (media.length > fileSizeLimit) {
    throw 'Ukuran media tidak boleh melebihi 5MB';
  }

  try {
    let result = await (isTele ? uploadImage : uploadFile)(media);
    // Pastikan result adalah objek
    if (typeof result === 'string') {
      result = JSON.parse(result); // Parse jika result berupa JSON string
    }

    let url = result.url_file || result.url || 'Tidak ada URL';
    let size = `${media.length} Byte(s)`; // Konversi ukuran file
    let duration = result.expiredFmt || 'Tidak Memiliki Durasi Kedaluwarsa';

    // Kirim pesan hasil upload
    m.reply(`Url File: ${url}
Size: ${size}
Durasi: ${duration}`);
  } catch (err) {
    console.error(err);
    throw 'Terjadi kesalahan saat mengunggah file. Silakan coba lagi.';
  }
};

handler.help = ['tourl <reply image>'];
handler.tags = ['sticker'];
handler.command = /^(upload|tourl)$/i;
handler.register = true;

module.exports = handler;