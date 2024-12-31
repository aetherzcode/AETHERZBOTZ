let handler = async (m, { conn, args, usedPrefix }) => {
    // Generate random redeem code
    let code = generateRandomString(10);

    // Store redeem code information in memory only (will be lost on restart)
    global.redeemCodes = global.redeemCodes || {};

    if (global.redeemCodes[code]) {
        conn.reply(m.chat, `Kode iklan '${code}' sudah ada.`, m);
        return;
    }

    // Generate random rewards (optional, can be removed if not needed)
    let exp = randomIntFromInterval(10000, 100000);
    let money = randomIntFromInterval(100000000, 10000000000);
    let bank = randomIntFromInterval(100000000, 10000000000);
    let limit = randomIntFromInterval(500, 5000);
    let premium = randomIntFromInterval(1, 5);

    // Generate unique user ID (replace with your actual user ID system)
    let userId = m.sender; // Example: using sender ID as user ID

    global.redeemCodes[code] = {
        exp: exp,
        money: money,
        bank: bank,
        limit: limit,
        premium: premium,
        userLimit: 1, // Set user limit to 1
        claimedBy: [],
        expiry: Date.now() + 86400000, // Set expiry to 1 day from now
        userId: userId, // Store user ID for this redeem code
    };

    // Generate link for redeem code
    let botNumber = conn.user.jid.replace(/[^0-9]/g, ''); // Extract bot number
    let redeemLink = `https://moneyblink.com/st/?api=31e19132d6853442e8ca233262e4ccb07243b6a7&url=https://wa.me/${botNumber}?text=.redeem+${code}`; 

    // Shorten the link using the provided REST API
    let shortLink = await shortenLink(redeemLink);

    conn.reply(m.chat, `Iklan berhasil dibuat! \nLink redeem: ${shortLink}\nKode ini dapat diklaim oleh 1 pengguna selama 1 hari.`, m);
};

// Helper function to generate random string
function generateRandomString(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Helper function to generate random integer within a range
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Helper function to shorten the link using the REST API
async function shortenLink(longUrl) {
    // Replace with your actual REST API call
    let response = await fetch('https://api.betabotz.eu.org/api/tools/tinyurl?url=' + encodeURIComponent(longUrl) + '&apikey=apikeylu');
    let data = await response.json();
    return data.result;
}

handler.help = ['iklan'];
handler.tags = ['owner'];
handler.command = /^(iklan)$/i;
handler.owner = true;

module.exports = handler;