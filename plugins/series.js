import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {conn, args, usedPrefix, text, command}) => {
    if (!text) return m.reply("هذا الامر خاص بالبحث عن المسلسلات الأجنبية نكتب هكذا \n*.series prison break*")
    await m.reply(wait)
    try {
    let items = await Search(text);
    let cap = "";//JSON.stringify(item[0]);
    let loops = items.length < 10? items.length: 10;
    for(let i = 0;i < loops;i++){
        cap += `↳ 🔗 *LINK :* ${items[i].url} \n↳ 🕐 *DATE :* ${items[i].date} \n ↳ ✏️ *NAME :* ${items[i].title} \n\n◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦\n`;
    }
                
    await conn.sendFile(m.chat, items[0].img, "", cap, m)
                
    } catch (e) {
        await m.reply("*حدث خطأ أثناء العثور على المسلسل.* \n *المرجو المحاولة لاحقا.*");
        await m.reply(e)
    }
}
handler.help = ["series"]
handler.tags = ["search"]
handler.command = /^(series)$/i
export default handler

async function Search(query) {
  const name = query.trim().replace(/ /g, '+');
  const res = await fetch(`https://mycima.wecima.show/search/${name}/list/`);
  const html = await res.text();
  const $ = cheerio.load(html);
  let arrays = [];
  
  $('.Grid--WecimaPosts .GridItem').each((index, element) => {
    const title = $(element).find('.Thumb--GridItem').find('a').attr('title');
    const href = $(element).find('.Thumb--GridItem').find('a').attr('href');
    //const imgRaw = $(element).find('.Thumb--GridItem').find('a').find('.BG--GridItem').attr('style');
    
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
