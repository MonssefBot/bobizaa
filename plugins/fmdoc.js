import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {conn, args, usedPrefix, text, command}) => {
    if (!text) return m.reply("هذا الامر خاص بالبحث عن الأفلام الأجنبية نكتب هكذا \n*.series prison break*")
    await m.reply(wait)
    try {
      let items = await Search(text);
            
      await conn.sendFile(m.chat, items[0].img, "", cap, m)
              
    } catch (e) {
        await m.reply("*حدث خطأ أثناء العثور على الفيلم.* \n *المرجو المحاولة لاحقا.*");
    }
}
handler.help = ["fmdoc"]
handler.tags = ["search"]
handler.command = /^(fmdoc)$/i
export default handler

async function Search(query) {
  const name = query.trim();
  const res = await fetch(name);
  const html = await res.text();
  const $ = cheerio.load(html);
  let arrays = [];
  
  $('.Grid--WecimaPosts .GridItem').each((index, element) => {
    const title = $(element).find('.Thumb--GridItem').find('a').attr('title');
    const href = $(element).find('.Thumb--GridItem').find('a').attr('href');
    
    const span = $(element).find('.Thumb--GridItem').find('a').html();
    const regex = /\((.*?)\)/g;
    let matches = [];
    let match;
    while ((match = regex.exec(span)) !== null) {
      matches.push(match[1]);
    }
    arrays.push({"title":title, "url":href, "img":matches[0], "date":matches[1], "span":span});
  });
  return arrays.filter(obj => Object.keys(obj).length !== 0);

}
