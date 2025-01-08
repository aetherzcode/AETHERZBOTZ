let fs = require('fs');
let path = require('path');

let handler = async (m, { text, usedPrefix, command }) => {

  if (!text) throw `ehemm.. teksnya mana jir?\n\npenggunaan:\n${usedPrefix + command} <nama direktori>\n\ncontoh:\n${usedPrefix + command} <nama direktori>`;

  const rootDir = path.join(__dirname, '..', 'container'); // Folder root/container

  if (command === 'tambahdir') {

    let newDir = path.join(rootDir, text); // Gabungkan jalur root/container dengan nama direktori yang diberikan

    if (!fs.existsSync(newDir)) {
      fs.mkdirSync(newDir, { recursive: true }); // Membuat direktori
      m.reply(`Direktori *${newDir}* berhasil ditambahkan.`);
    } else {
      m.reply(`Direktori *${newDir}* sudah ada.`);
    }

  } else if (command === 'hapusdir') {

    let dirPath = path.join(rootDir, text); // Gabungkan jalur root/container dengan nama direktori yang akan dihapus

    if (!fs.existsSync(dirPath)) {
      throw `Direktori *${text}* tidak ditemukan.`;
    }

    fs.rmSync(dirPath, { recursive: true, force: true }); // Menghapus direktori beserta isinya

    m.reply(`Direktori *${text}* dan isinya berhasil dihapus.`);

  }

};

handler.help = ['tambahdir', 'hapusdir'].map(v => v + ' <nama direktori>');

handler.tags = ['owner'];
handler.command = /^(tambahdir|hapusdir)$/i;
handler.rowner = true;
module.exports = handler;