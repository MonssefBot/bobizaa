import fetch from 'node-fetch';

let handler = async (m, {conn, args, usedPrefix, text, command}) => {
    if (!text) return m.reply(" يمكنك تنزيل الملفات ذات الرابط المباشر من خلال كتابة:\n*.download *")
    await m.reply(wait)
    try {
      
      await conn.sendFile(m.chat, text, "", cap, m)
              
    } catch (e) {
        await m.reply("*حدث خطأ أثناء العثور على الملف.* \n *المرجو المحاولة لاحقا.*");
        await m.reply(e);
    }
}
handler.help = ["download"]
handler.tags = ["search"]
handler.command = /^(download)$/i
export default handler
