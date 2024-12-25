let axios = require('axios');
let moment = require('moment-timezone');

const timeZone = 'Asia/Jakarta';


const groupChats = [
    '120363377709205706@g.us',
];


async function getPrayerTimesAndSetReminders() {
    try {
        // URL API untuk mendapatkan jadwal sholat
        let city = 'jakarta';
        let url = `https://api.betabotz.eu.org/api/tools/jadwalshalat?kota=${city}&apikey=${lann}`;
        let response = await axios.get(url);

        let data = response.data;
        if (!data || data.result.code !== 200) {
            console.log(`[❗] Jadwal shalat untuk kota ${city.toUpperCase()} tidak ditemukan atau tidak tersedia.`);
            return;
        }


        let jadwal = data.result.data[0].timings;
        if (!jadwal) {
            console.log(`[❗] Jadwal shalat untuk kota ${city.toUpperCase()} tidak ditemukan atau tidak tersedia.`);
            return;
        }

        console.log(`
┌「 ${city.toUpperCase()} 」  
├ Subuh: ${jadwal.Fajr}
├ Dzuhur: ${jadwal.Dhuhr}
├ Ashar: ${jadwal.Asr}
├ Maghrib: ${jadwal.Maghrib}
├ Isya: ${jadwal.Isha}
└──────────`);


        setPrayerTimers(jadwal);
    } catch (error) {
        console.error(`[❗] Terjadi kesalahan saat mengambil data.`);
    }
}

function setPrayerTimers(jadwal) {
    let now = new Date();

    function calculateTimeDifference(prayerTime) {
        let cleanTime = prayerTime.replace(' (WIB)', '');
        let [hours, minutes] = cleanTime.split(':').map(Number);
        let prayerDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        return prayerDate.getTime() - now.getTime();
    }

    let prayerTimes = [
        { name: 'Subuh', time: jadwal.Fajr },
        { name: 'Dzuhur', time: jadwal.Dhuhr },
        { name: 'Ashar', time: jadwal.Asr },
        { name: 'Maghrib', time: jadwal.Maghrib },
        { name: 'Isya', time: jadwal.Isha },
    ];

    for (let prayer of prayerTimes) {
        let timeDifference = calculateTimeDifference(prayer.time);

        if (timeDifference > 0) {
            setTimeout(() => {
                sendPrayerReminderToGroups(prayer.name, prayer.time);
            }, timeDifference);
        }
    }
}

async function sendPrayerReminderToGroups(prayerName, prayerTime) {
    for (const chatId of groupChats) {
        const reminderMessage = `⏰ *PENGINGAT SHOLAT*\n\n🚨 Waktu Sholat ${prayerName} telah tiba!\nJam: ${prayerTime}\nJangan lupa untuk melaksanakan sholat.`;
        await sendReminderToGroup(chatId, reminderMessage);
    }
}

async function sendReminderToGroup(chatId, text) {
    await conn.sendMessage(chatId, { text }); // Mengirim pesan langsung tanpa hidetag
}

function startDailyPrayerReminder() {
    getPrayerTimesAndSetReminders();

    setInterval(() => {
        let now = new Date();
        console.log(`Mengambil jadwal sholat untuk hari ini (${now.toLocaleDateString()})`);
        getPrayerTimesAndSetReminders();
    }, 24 * 60 * 60 * 1000);
}

startDailyPrayerReminder();