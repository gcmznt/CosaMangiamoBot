const axios = require("axios");
const data = require("./data.json");
const differenceInWeeks = require("date-fns/differenceInWeeks");
const getDay = require("date-fns/getDay");

exports.sendMesage = function () {
  const week =
    differenceInWeeks(new Date(), new Date(data.startDate)) % data.menu.length;
  const day = getDay(new Date());

  if (!data.menu[week][day]) return;

  const encodedMsg = encodeURIComponent(
    `Ciao a tutt\\*\\! Oggi le nostre bimbe e bimbi mangieranno:

${data.menu[week][day].lunch.map((d) => `\\- ${d}`).join("\n")}

Buon appetito 😋`
  );

  return axios.post(
    `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=-776165198&text=${encodedMsg}&parse_mode=MarkdownV2`
  );
  // .then((res) => {
  //   console.log(`Status: ${res.status}`);
  //   console.log("Body: ", res.data);
  // })
  // .catch((err) => {
  //   console.error(err);
  // });
};
