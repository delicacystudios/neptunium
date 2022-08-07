const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const config = require('../../configs/config.js');
const i18n = require("../../references/i18n.js");

module.exports = {
  name: "invite",
  aliases: [],
  description: i18n.__("infoctg.invite.description"),
  category: "Information",
  usage: '',
  cooldown: 3,
  premium: false,

  run: async (client, message, args) => {
    // // // // //
    const premSchema = require('../../database/premium.js');
    const prem = await premSchema.findOne({ User: message.author.id });

    const pgSchema = require('../../database/pg.js');
    const guildPrem = await pgSchema.findOne({ GuildID: message.guild.id });

    const premuser = prem || guildPrem;
    const color = `${premuser ? config.embeds.premium : config.embeds.color}`;
    const namefooter = `${premuser ? `👑 ${client.user.username} Premium` : `${client.user.username}`} ${i18n.__("infoctg.bugreport.footer")}`
    // // // //

    const embed = new MessageEmbed()
      .setColor(color)
      .setDescription(`${i18n.__("infoctg.invite.embed.one")} ${client.user.username} ${i18n.__("infoctg.invite.embed.two")}`)
      .setImage('https://media.discordapp.net/attachments/984299199967408163/994026105298223206/PicsArt_22-07-05_17-44-42-657.png')
      .setFooter({ text: `${namefooter}` })
    const invitebtn = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel(`${i18n.__("infoctg.invite.embed.button")}`)
          .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
          .setStyle('LINK'),
      )
    message.reply({ embeds: [embed], components: [invitebtn] }).catch(
      (error) => console.log(`Ошибка: Невозможно отправить сообщение в канал`)
    )
  },

  SlashCommand: {
    run: async (client, interaction, args) => {
      // // // // //
      const premSchema = require('../../database/premium.js');
      const prem = await premSchema.findOne({ User: message.author.id });

      const pgSchema = require('../../database/pg.js');
      const guildPrem = await pgSchema.findOne({ GuildID: message.guild.id });

      const premuser = prem || guildPrem;
      const color = `${premuser ? config.embeds.premium : config.embeds.color}`;
      const namefooter = `${premuser ? `👑 ${client.user.username} Premium` : `${client.user.username}`} ${i18n.__("infoctg.bugreport.footer")}`
      // // // /  
      const embed = new MessageEmbed()
        .setColor(color)
        .setDescription(`${i18n.__("infoctg.invite.embed.one")} ${client.user.username} ${i18n.__("infoctg.invite.embed.two")}`)
        .setImage('https://media.discordapp.net/attachments/984299199967408163/994026105298223206/PicsArt_22-07-05_17-44-42-657.png')
        .setFooter({ text: `${namefooter}` })
      const invitebtn = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel(`${i18n.__("infoctg.invite.embed.button")}`)
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
            .setStyle('LINK'),
        )
      interaction.reply({ embeds: [embed], components: [invitebtn] }).catch(
        (error) => console.log(`Ошибка: Невозможно отправить сообщение в канал`)
      )
    }
  }
}