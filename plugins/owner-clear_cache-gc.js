let handler = async(m, { conn, text, usedPrefix, command }) => {

	let item = ["--gc", "--total", "--user"];
	
	let data = db.data.chats;
	let keys = Object.keys(data)
	let keys_group = keys.filter((v) => v.endsWith("g.us"));
	let keys_user = keys.filter((v) => v.endsWith("@s.whatsapp.net"));
	
	if (!item.includes(text)) return m.reply(`*Example:*\n${usedPrefix + command} --gc\n\n*Pilih type yg ada*\n` + item.map((v, index) => "  ○ " + v).join("\n"))
	
	switch(text) {
		
		case "--gc": {
			let tersisa = 0;
			let dibersihkan = 0;
			await m.reply(`Waiting.. proses ini memerlukan waktu`)
			
			for (let id of keys_group) {
				await sleep(500)
				try {
					let getout = await conn.groupMetadata(id);
					tersisa++
					console.log(`Status aktif : ${getout.subject} [ ${tersisa} ]`)
				} catch {
					dibersihkan++
					delete data[id]
					console.log(`Status mati : ${id} [ ${dibersihkan} ]`)
				}
			};
			
			await sleep(1000)
			let tx = `Data berhasil dibersihkan!\n`
			tx += `  <> Group aktif : ${tersisa}\n`
			tx += `  <> Group mati : ${dibersihkan}`
			return m.reply(tx)
		}
		break;
		case "--total": {
			let tx = `Berikut data yang tersimpan di database *Group* bot\n`
			tx += `  *<> Group :* ${keys_group.length}\n`
			tx += `  *<> User :* ${keys_user.length}\n`
			return m.reply(tx)
		}
		break;
		case "--user": {
			await m.reply(`Waiting.. proses ini memerlukan waktu`)
			let txt = `Berhasil membersihkan data user!\n`
			txt += `Total data ${keys_user.length}`
			for (let us of keys_user) {
				await sleep(300)
				delete data[us]
			}
			await sleep(1000)
			return m.reply(txt)
		}
		break;
	}	
}
handler.help = ["clearcachegc"];
handler.tags = ["owner"];
handler.command = /^(clearcachegc)$/i;
handler.register = true
handler.owner = true

module.exports = handler;

async function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}