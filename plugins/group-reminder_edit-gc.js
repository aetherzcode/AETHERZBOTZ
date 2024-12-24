let aether1 = '';
let aether2 = '';

async function before(m) {
    if (m.isGroup) {
        const aether3 = await conn.groupMetadata(m.chat).then(res => res.subject);
        const aether4 = await conn.groupMetadata(m.chat).then(res => res.desc);

        if (aether1 && aether3 !== aether1) {
            await conn.sendMessage(
                m.chat,
                {
                    text: `🔄 *Nama grup telah berubah* \n\nSebelumnya: *${aether1}*\nSekarang: *${aether3}*`
                }
            );
        }

        if (aether2 && aether4 !== aether2) {
            await conn.sendMessage(
                m.chat,
                {
                    text: `🔄 *Deskripsi grup telah berubah* \n\nSebelumnya: *${aether2}*\nSekarang: *${aether4}*`
                }
            );
        }
        aether1 = aether3;
        aether2 = aether4;
    }
}

module.exports = {
    before
};