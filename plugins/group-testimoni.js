const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const handler = async (m, {
    conn,
    args
}) => {
    try {
        let quoted = m.quoted ? m.quoted : null;
        if (!quoted) throw `- reply gambarnya`;
        let mime = quoted.mimetype || '';
        if (!/image/.test(mime)) throw `- mana gambar.`;
        let media = await quoted.download?.();
        if (!media) throw `gagal.`;
        let caption = `
[ NEXT ORDER ]
- 📑 Sewa Bot
Link Group :
Link Testi :
- 🍃 Contact owner
🏡 • wa.me/6285798045817
> minat? Pm sekarang!!!
        `.trim();
        //--group
        if (args.includes('--group')) {
            let groups = Object.keys(await conn.groupFetchAllParticipating());
            if (!groups.length) throw `hoax gaada group.`;
            for (let group of groups) {
                await conn.sendMessage(group, {
                    image: media,
                    caption: caption
                }, {
                    quoted: m
                });
                await delay(3500); // diley
            }
            conn.sendMessage(m.chat, {
                text: `- 🏡 Dikirim ke ${groups.length} group.`
            }, {
                quoted: m
            });
        } else {
            await conn.sendMessage(m.chat, {
                image: media,
                caption: caption
            }, {
                quoted: m
            });
            conn.sendMessage(m.chat, {
                text: `tuh.` //notif 2
            }, {
                quoted: m
            });
        }
    } catch (error) {
        conn.sendMessage(m.chat, {
            text: `reply gambar`
        }, {
            quoted: m
        });
    }
};
handler.command = ['testi'];
handler.tags = ['tools'];
handler.help = ['testi [--group]'];
module.exports = handler;