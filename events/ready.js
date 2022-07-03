const config = require('../configs/config.js');
const Dashboard = require("../dashboard/dashboard.js");

module.exports = async (client) => {
  console.log('——————————————————————————————————————————')
  console.log(`| 🌐 Установлено соединение: ${client.user.tag}`)
  console.log(`| ⚙️  ID Бота: ${client.user.id}`)
  console.log(`| ⚙️  Префикс бота: ${config.chat.prefix}`)
  console.log('——————————————————————————————————————————')
  
  let i = 0;
  setInterval(() => {
    const activity = [
      `Miffie v${require("../package.json").version}`,
      `${client.users.cache.size} пользователей`,
      `${client.guilds.cache.size} серверов`,
    ]
    
    const index = Math.floor(i);
    client.user.setActivity(activity[index], {type: "WATCHING"});
    i = i + 1
    if (i === activity.length) i = i - activity.length
  }, 10000)
  client.user.setStatus('idle');

  Dashboard(client);
  for (const [id, guild] of client.guilds.cache) {
    await guild.members.fetch();
  }
}