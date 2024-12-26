let groupData = {}; // Objek untuk menyimpan data grup secara dinamis

async function before(m) {
    if (m.isGroup) {
        const groupId = m.chat; // ID grup
        const groupMetadata = await conn.groupMetadata(groupId); // Metadata grup
        const newGroupName = groupMetadata.subject; // Nama grup baru
        const newGroupDesc = groupMetadata.desc || ''; // Deskripsi grup baru (default kosong jika tidak ada)

        // Periksa apakah grup sudah memiliki data sebelumnya
        if (!groupData[groupId]) {
            groupData[groupId] = {
                name: newGroupName,
                desc: newGroupDesc
            };
        }

        // Cek perubahan nama grup
        if (groupData[groupId].name !== newGroupName) {
            await conn.sendMessage(
                groupId,
                {
                    text: `🔄 *Nama grup telah berubah* \n\nSebelumnya: *${groupData[groupId].name}*\nSekarang: *${newGroupName}*`
                }
            );
            groupData[groupId].name = newGroupName; // Perbarui nama grup
        }

        // Cek perubahan deskripsi grup
        if (groupData[groupId].desc !== newGroupDesc) {
            await conn.sendMessage(
                groupId,
                {
                    text: `🔄 *Deskripsi grup telah berubah* \n\nSebelumnya: *${groupData[groupId].desc}*\nSekarang: *${newGroupDesc}*`
                }
            );
            groupData[groupId].desc = newGroupDesc; // Perbarui deskripsi grup
        }
    }
}

module.exports = {
    before
};