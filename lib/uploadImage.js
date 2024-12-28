const axios = require('axios');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');

module.exports = async (buffer) => {
  const { ext, mime } = (await fromBuffer(buffer)) || {};
  const form = new FormData();
  form.append("file", buffer, { filename: `tmp.${ext}`, contentType: mime });

  try {
    const { data } = await axios.post("https://filezone-api.caliph.dev/upload", form, {
      headers: form.getHeaders(),
    });
    return data.result || null;
  } catch (error) {
    throw new Error('Image upload failed');
  }
};