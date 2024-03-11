import fetch from 'node-fetch';
import OpenAI from 'openai';

/*const fetch = require('node-fetch');
const OpenAI = require('openai');*/

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
    if (!text) return m.reply("يستعمل هذا الأمر لتوليد صور HD بواسطة الذكاء الإصطناعي . مثلا\n*.img A photograph of a white Siamese cat*");
    await m.reply(wait)
    try {
        const openai = new OpenAI();
        const imgs = await openai.createImage({
            model: "dall-e-3",
            prompt: text,
            n: 1,
            size: "1024x1024",
        });
        const imageUrl = imgs.data[0].url;

        //const t = JSON.stringify(imgs);
        await m.reply(imageUrl);
    } catch (e) {
        await m.reply('*حدث خطأ أثناء إنشاء الصور*❎'+ String(e));
    }
}
handler.help = ["img-ai"]
handler.tags = ["ai"]
handler.command = /^(img|img-ai)$/i
export default handler

async function Translate(text) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURI(text)}`;
    let response = await fetch(url);
    let json = await response.json();
    return json[0][0][0];
}
async function Send(text){
    const openaiUrl = 'https://api.openai.com/v1/images/generations';
    const openaiKey = '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';
    const methods = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          "prompt": text,
          "n": 1,
          "size": "1024x1024"
        })
      };
    const res = await fetch(openaiUrl, methods);
    const data = await res.json();
    return data.data.data[0].url;
}
