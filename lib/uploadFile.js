const fetch = require('node-fetch');
const axios = require('axios');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');

const pomf = async (buffer) => {
  const { ext, mime } = (await fromBuffer(buffer)) || {};
  const form = new FormData();
  form.append("files[]", buffer, { filename: `tmp.${ext}`, contentType: mime });
  try {
    const { data } = await axios.post("https://pomf.lain.la/upload.php", form, {
      headers: form.getHeaders(),
    });
    return data.files[0]?.url || null;
  } catch (error) {
    throw new Error('Pomf upload failed');
  }
};

const fileIO = async (buffer) => {
  const { ext } = (await fromBuffer(buffer)) || {};
  const form = new FormData();
  form.append('file', buffer, `tmp.${ext}`);
  const res = await fetch('https://file.io/?expires=1d', { method: 'POST', body: form });
  const json = await res.json();
  if (!json.success) throw new Error('File.io upload failed');
  return json.link;
};

module.exports = async function (buffer) {
  let err = null;
  for (const upload of [pomf, fileIO]) {
    try {
      return await upload(buffer);
    } catch (e) {
      err = e;
    }
  }
  throw err || new Error('All upload methods failed');
};