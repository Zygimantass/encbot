const Discord = require('discord.js');
const osu = require("node-osu");
const settings = require("./settings.json")
const lsettings = require("./settings.js").lstorage;

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

  embed.setTitle(settings.bio.username + "'s info");
  embed.setColor(0x03FE03);

  embed.addField("Github:", settings.bio.github, false);
  embed.addField("Life stuff: ", settings.bio.lifestuff, false);

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

exports.rtenable = function (message) {
  embed = new Discord.RichEmbed();

  embed.setTitle("RichText enabled");

  message.edit({embed: embed});
  lsettings.setItem("richtext", "enabled");
}

exports.rtdisable = function (message) {
  embed = new Discord.RichEmbed();

  embed.setTitle("RichText disabled");

  message.edit({embed: embed});
  lsettings.setItem("richtext", "disabled");
}

exports.rtcolor = function (message) {
  if (message.content.split(" ").length > 1) {
    rtcolor = parseInt(message.content.split(" ")[1], 16);
    console.log(rtcolor);
    if (isNaN(rtcolor)) {
      embed = new Discord.RichEmbed();

      embed.setTitle("RichText");
      embed.setColor(rtcolor);
      embed.setDescription("Invalid RichText color!");
      message.edit({embed: embed})
    } else {
      embed = new Discord.RichEmbed();

      embed.setTitle("RichText");
      embed.setDescription("RichText color set!");
      message.edit({embed: embed});
      lsettings.setItem("rtcolor", message.content.split(" ")[1])
    }

  }
}
