import { Translate } from '@google-cloud/translate';
import fs from 'fs';

// يرجى تعيين متغيرات البيئة GOOGLE_APPLICATION_CREDENTIALS وGOOGLE_PROJECT_ID
// إلى معرفاتك الخاصة بمشروع Google Cloud ومفتاح واجهة برمجة التطبيقات

const translate = new Translate();

let handler = async (m, { conn, text }) => {
  if (!text) throw 'يُرجى إرسال نص للترجمة';

  // الحصول على أول حرفين من الرسالة
  const targetLang = text.substring(0, 2);
  const textToTranslate = text.substring(2);

  await conn.reply(m.chat, global.wait, m);

  // ترجمة النص إلى اللغة المحددة
  const [translation] = await translate.translate(textToTranslate, targetLang);
  const translatedText = translation;

  conn.reply(m.chat, translatedText, m);
};

handler.help = ['coffee'];
handler.tags = ['tools'];
handler.command = ['ترجم'];

export default handler;


/*
let handler = async (m, {
    conn,
    isOwner,
    usedPrefix,
    command,
    args
}) => {
    try {
        await m.reply(wait)
        let cofe = "https://coffee.alexflipnote.dev/random"
        await conn.sendFile(m.chat, cofe, "", "*[ إحتسي لك كأسا من القهوة ]*", m)
    } catch (e) {
        throw eror
    }
}
handler.help = ["coffee"]
handler.tags = ["tools"]
handler.command = /^(coffee)$/i
export default handler*/
