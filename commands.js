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
      embed.setColor(parseInt(lsettings.getItem("rtcolor"), 16))
      embed.addField("PP: ", user.pp.raw, true);
      embed.addField("Play count: ", user.counts.plays, true);
      embed.addField("Country: ", user.country, true);
      embed.addField("Rank in " + user.country + ":", user.pp.countryRank, true);
      embed.addField("Global rank: ", user.pp.rank, true);
      embed.addField("Level: ", user.level, true);
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
  embed.setColor(parseInt(lsettings.getItem("rtcolor"), 16));

  embed.addField("Github:", settings.bio.github, false);
  embed.addField("Life stuff: ", settings.bio.lifestuff, false);

  embed.setFooter("encbot, created with ❤️️ by @Žygimantas👻#1755");

  message.edit({embed: embed})
}

exports.bot = function (message) {
  embed = new Discord.RichEmbed();

  embed.setTitle("encbot's info")
  embed.setColor(parseInt(lsettings.getItem("rtcolor"), 16));

  embed.addField("Where I'm living", "https://github.com/Zygimantass/encbot", false);
  embed.addField("Date of birth", "2017-03-23", false);

  embed.setFooter("encbot, created with ❤️️ by @Žygimantas👻#1755");

  message.edit({embed: embed})
}

exports.rtenable = function (message) {
  embed = new Discord.RichEmbed();

  embed.setTitle("RichText enabled");
  embed.setColor(parseInt(lsettings.getItem("rtcolor"), 16));

  message.edit({embed: embed});
  lsettings.setItem("richtext", "enabled");
}

exports.rtdisable = function (message) {
  embed = new Discord.RichEmbed();

  embed.setTitle("RichText disabled");
  embed.setColor(parseInt(lsettings.getItem("rtcolor"), 16));

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
      embed.setColor(rtcolor);
      embed.setDescription("RichText color set!");
      message.edit({embed: embed});
      lsettings.setItem("rtcolor", message.content.split(" ")[1])
    }

  }
}
