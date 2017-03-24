const Discord = require('discord.js');
const _ = require("underscore");

const settings = require('./settings.json');
const commands = require('./commands.js');
const lsettings = require('./settings.js').lstorage;

const client = new Discord.Client();

const delimiter = ".";
const commandList = {".ping": commands.ping, ".osu": commands.osustats, ".bio": commands.bio, ".bot": commands.bot, ".rtdisable": commands.rtdisable, ".rtenable": commands.rtenable, ".rtcolor": commands.rtcolor};

if (lsettings.getItem("richtext") === null) {
  lsettings.setItem("richtext", "enabled");
}

if (lsettings.getItem("rtcolor") === null) {
  lsettings.setItem("rtcolor", "0xFE0303");
}


client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  if (message.author.id === client.user.id) {
      console.log("it's my message");

      parsedCommand = message.content.split(" ")[0];

      if (_.has(commandList, parsedCommand)) {
          commandList[parsedCommand](message);
      } else {
          if (lsettings.getItem("richtext") === "enabled") {
            console.log("asdasd");
            embed = new Discord.RichEmbed();
            embed.setDescription(message.content);
            embed.setColor(parseInt(lsettings.getItem("rtcolor"), 16));
            message.edit({embed: embed});
          }
      }
  }
});

client.login(settings.token);
