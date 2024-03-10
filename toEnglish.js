import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
    if (!text) return m.reply("يستعمل هذا الأمر لترجمة النصوص الى اللغة الإنجليزية . مثلا\n*.trans إستعملت واتساب لترجمة النصوص*")
    try {
        let item = await Translate(text)
        let cap = `🔍 *[ T R A N S L A T E ]*

✏️ *:* ${text}
📌 *:* ${item}
`
        await conn.sendFile(m.chat, "https://telegra.ph/file/e9884546aaad4c9f47125.jpg", "", cap, m)
    } catch (e) {
        console.error(e)
        await m.reply('حدث خطأ أثناء الترجمة')
    }
}
handler.help = ["to-en"]
handler.tags = ["search"]
handler.command = /^(to-en)$/i
export default handler

async function Translate(text, lang = "en") {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURI(text)}`;
    let response = await fetch(url);
    let json = await response.json();
    return json[0][0][0];
            }
