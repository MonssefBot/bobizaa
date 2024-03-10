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
            await m.reply(wait)
            try {
                let item = await Translate(text)
                let cap = `🔍 *[ TRANSLATE ]*

✏️ *:* ${text}
📌 *:* ${item}
`
                await conn.sendFile(m.chat, "https://telegra.ph/file/e9884546aaad4c9f47125.jpg", "", cap, m)
                
            } catch (e) {
                await m.reply('error')
            }
}
handler.help = ["trans"]
handler.tags = ["search"]
handler.command = /^(trans)$/i
export default handler

function Translate(text, lang = "en") {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURI(text)}`;
  fetch(url).then((response) => response.json())
  .then((json) => {
    return json[0].map((item) => item[0]).join("");
  })
      }
