import moment from 'moment-timezone';

const handler = async (m, {conn}) => {
  const tzAF = moment().tz('Africa/Casablanca').format('DD/MM/YY HH:mm:ss');
  await conn.sendMessage(m.chat, {text: `الوقت الحالي في المغرب هو : \n${tzAF} \n
  ${String.fromCharCode(8206).repeat(850)}`}, {quoted: m});
};
handler.help = ["timezone"]
handler.tags = ["infobot"]
handler.command = /^(tz|timezone)$/i
export default handler;
