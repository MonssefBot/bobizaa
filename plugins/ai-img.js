import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
    if (!text) return m.reply("يستعمل هذا الأمر لترجمة النصوص الى اللغة الإنجليزية . مثلا\n*.trans إستعملت واتساب لترجمة النصوص*");
    try {
        let item = await SendImg(text)
        let cap = `🔍 *[ TRANSLATE ]*

✏️ *:* ${text}
📌 *:* ${item}
`
        await conn.sendFile(m.chat, item, "", "", m)
    } catch (e) {
        console.error(e)
        await m.reply('*حدث خطأ أثناء إنشاء الصور*❎')
    }
}
handler.help = ["img-ai"]
handler.tags = ["ai"]
handler.command = /^(img|img-ai)$/i
export default handler

/*async function SendImg(text) {
    const KEY = "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";
    let textTranslated = await Translate(text)
    const methods = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${KEY}`
        },
        body: JSON.stringify({
          "prompt": textTranslated,
          "n": 1,
          "size": "512x512"
        })
      };
      const res = await fetch("https://api.openai.com/v1/images/generations", methods);
      const data = await res.json();
      return data.data;
      }*/

async function SendImg(text) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURI(text)}`;
    let response = await fetch(url);
    let json = await response.json();
    let textT = json[0][0][0];

    const response = await openai.createImage({
  model: "dall-e-3",
  prompt: textT,
  n: 1,
  size: "1024x1024",
});
image_url = response.data.data[0].url;
return image_url;
}
