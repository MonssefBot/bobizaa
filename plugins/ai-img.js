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
    if (!text) return m.reply("يستعمل هذا الأمر لترجمة النصوص الى اللغة الإنجليزية . مثلا\n*.trans إستعملت واتساب لترجمة النصوص*");
    await m.reply(wait)
    try {
        const openai = new OpenAI();


        const imgs = await openai.createImage({
            model: "dall-e-3",
            prompt: text,
            n: 1,
            size: "1024x1024",
        });
        const imageUrl = imgs.data.data[0].url;

        const t = JSON.stringify(imgs);

        await m.reply(t);
    } catch (e) {
        
        await m.reply('*حدث خطأ أثناء إنشاء الصور*❎');
    }
}
handler.help = ["img-ai"]
handler.tags = ["ai"]
handler.command = /^(img|img-ai)$/i
module.exports = handler;

async function Translate(text) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURI(text)}`;
    let response = await fetch(url);
    let json = await response.json();
    return json[0][0][0];
}
    //const openaiUrl = 'https://api.openai.com/v1/images/generations';
    //const openaiKey = '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';






    
    /*const methods = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          "prompt": textT,
          "n": 1,
          "size": "1024x1024"
        })
      };

    const res = await fetch(openaiUrl, methods);
    const data = await res.json();
    return data.data.data[0].url;*/
