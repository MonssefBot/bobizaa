import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
            if (!text) return m.reply("هذا الامر خاص بالبحث عن المسلسلات الأجنبية نكتب هكذا \n*.series prison break*")
            await m.reply(wait)
            try {
                let item = await Wiki(text)
                let cap = item;
                await conn.sendFile(m.chat, "https://telegra.ph/file/6ebc06f2b66e93e18155f.jpg", "", cap, m)
                
            } catch (e) {
                await m.reply('error')
            }
}
handler.help = ["series"]
handler.tags = ["search"]
handler.command = /^(series)$/i
export default handler

async function Wiki(query) {
  const res = await fetch(`https://mycima.wecima.show/search/${query}/list/`);
  const html = await res.text();
  const $ = cheerio.load(html);
  let linksArray = [];
  
  $('.Grid--WecimaPosts div').each((index, element) => {
    const title = $(element).attr('title');
    const href = $(element).attr('href');
    linksArray.push({"title":title, "url":href});
  )};
   
  
    
  return wiki;





  




}
