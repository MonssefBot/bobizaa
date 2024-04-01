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
                let item = await Wiki(text);
                
                let cap = "";

                item.forEach(e => {
                    cap += `
↳ 🔗 *_LINK :_* ${e.url} /n ↳ 🕒 *_DATE :_* ${122} /n ↳ ✏️ *_NAME :_* ${e.title}

◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦
`;
                });
                
                
                await conn.sendFile(m.chat, item[0].img || "https://telegra.ph/file/6ebc06f2b66e93e18155f.jpg", "", cap, m)
                
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
    const title = $(element).find('div').find('a').attr('title');
    const href = $(element).find('div').find('a').attr('href');
    const imgRaw = $(element).find('div').find('a').find('.BG--GridItem').attr('style');
    
    const matches = imgRaw.match(/\((.*?)\)/);
    if (matches) {
      let img = matches[1];
    } else {
      let img = null;
    }

    
    linksArray.push({"title":title, "url":href, "img":img});
  });
   
  
    
  return linksArray;





  




}
