import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
            if (!text) return m.reply("هذا الامر خاص بالبحث عن المواضيع في ويكيبيديا نكتب هكذا \n*.wiki العدالة*")
            await m.reply(wait)
            try {
                let item = await Translate(text)
                let cap = `🔍 *[ RESULT ]*

✏️ *:* ${item}
📌 *:* ${text}
`
                await conn.sendFile(m.chat, item[0].thumb || logo, "", cap, m)
                
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
