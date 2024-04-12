import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {conn, args, usedPrefix, text, command}) => {
    if (!text) return m.reply(" يمكنك تنزيل الأفلام والمسلسلات ذات الرابط المباشر من خلال كتابة:\n*.fdoc https://tgb4.top15top.shop/ki71atw9c16d/Prison.Break.S03E13.720p.Bluray.MyCima.TO.mp4.html?Key=vB26vgc88-IJEgk2BAADaQ&Expires=1712918317*")
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




$('.List--Download--Wecima--Single li a').each((index, element) => {
  const url = $(element).attr('href');
  const text = $(element).find('resolution').text();
  arrays.push({"text":text, "url":url});
});
  
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
