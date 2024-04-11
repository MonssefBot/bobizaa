import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {conn, args, usedPrefix, text, command}) => {
    if (!text) return m.reply("هذا الامر خاص بالبحث عن المسلسلات الأجنبية نكتب هكذا \n*.series prison break*")
    await m.reply(wait)
    try {
    let item = await Search(text);
    let cap = JSON.stringify(item);
    /*item.forEach(e => {
        cap += `↳ 🔗 *_LINK :_* ${e.url} \n↳ 🕒 *_DATE :_* ${e.url} \n ↳ ✏️ *_NAME :_* ${e.title} \n\n◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦`;
    });*/
                
    await conn.sendFile(m.chat, "https://telegra.ph/file/6ebc06f2b66e93e18155f.jpg", "", cap, m)
                
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
    const imgRaw = $(element).find('.Thumb--GridItem').find('a').find('span').attr('style');
    
    /*let img = null;
    if (imgRaw && typeof imgRaw === 'string') {
      const matches = imgRaw.match(/\((.*?)\)/);
      if (matches) {
        img = matches[1];
      }
    }*/
    arrays.push({"title":title, "url":href, "img":imgRaw});
  });
  return arrays.filter(obj => Object.keys(obj).length !== 0);

}
