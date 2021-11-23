const axios = require("axios");
const data = require("./data.json");
const differenceInWeeks = require("date-fns/differenceInWeeks");
const getDay = require("date-fns/getDay");

const greetings = ["Ciao a tutt*!"];
const messages = [
  "Oggi le nostre bimbe e bimbi mangieranno:",
  "Ecco il menù di oggi:",
  "Oggi si mangia:",
];
const closing = ["Buon appetito 😋", "Che la fame sia con voi"];

const getRandom = (list) => list[Math.floor(Math.random() * list.length)];

function sendMesage() {
  const week =
    differenceInWeeks(new Date(), new Date(data.startDate)) % data.menu.length;
  const day = getDay(new Date());

  if (!data.menu[week][day]) return;

  const menu = data.menu[week][day].lunch.map((d) => `• ${d}`).join("\n");
  const greet = getRandom(greetings);
  const message = getRandom(messages);
  const close = getRandom(closing);

  const encodedMsg = encodeURIComponent(
    `${greet}\n${message}\n\n${menu}\n\n${close}`.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, '\\$&')
  );
  const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=-776165198&text=${encodedMsg}&parse_mode=MarkdownV2`;

  return axios
    .post(url)
    .then((res) => console.log(`Status: ${res.status}`, "Body: ", res.data))
    .catch(console.error);
}

sendMesage();
