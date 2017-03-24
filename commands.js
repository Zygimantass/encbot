const Discord = require('discord.js');
const osu = require("node-osu");
const settings = require("./settings.json")

exports.ping = function(message) {
  message.edit("pong");
}

exports.osustats = function (message) {
  embed = new Discord.RichEmbed();
  osuApi = new osu.Api(settings.osutoken);

  if (message.content.split(" ").length > 1) {
    username = message.content.split(" ")[1];

    message.edit("**Please wait, fetching stats for " + username + ".**");

    osuApi.getUser({'u': username}).then(user => {
      embed.setTitle("Osu! stats for " + username);
      embed.setColor(0x303030)
      embed.setDescription("PP: " + user.pp.raw);
      embed.addField("Play count: ", user.counts.plays, false);
      embed.addField("Country: ", user.country, false);
      console.log(user);

      embed.setFooter("encbot, created with ❤️️ by @Žygimantas👻#1755");

      message.edit({embed: embed});
    }).catch(function (reason) {
      message.edit("**Osu! bot encountered an error! Reason: " + reason + "**");
    });

  } else {
    message.edit("Not enough arguments for this command!");
  }
}

exports.bio = function (message) {
  embed = new Discord.RichEmbed();

  embed.setTitle("@Žygimantas👻#1755's info");
  embed.setColor(0x03FE03);

  embed.addField("Github:", "https://github.com/Zygimantass", false);
  embed.addField("Life stuff: ", "I am Žygimantas, 14 years old and live in Lithuania", false);

  embed.setFooter("encbot, created with ❤️️ by @Žygimantas👻#1755");

  message.edit({embed: embed})
}

exports.bot = function (message) {
  embed = new Discord.RichEmbed();

  embed.setTitle("encbot's info")
  embed.setColor(0xFE0303);

  embed.addField("Where I'm living", "https://github.com/Zygimantass/encbot", false);
  embed.addField("Date of birth", "2017-03-23", false);

  embed.setFooter("encbot, created with ❤️️ by @Žygimantas👻#1755");

  message.edit({embed: embed})
}
