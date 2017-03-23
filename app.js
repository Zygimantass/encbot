const Discord = require('discord.js');
const _ = require("underscore");

const settings = require('./settings.json');
const commands = require('./commands.js')

const client = new Discord.Client();

const delimiter = "."
const commandList = {".ping": commands.ping, ".osu": commands.osustats, ".bio": commands.bio, ".bot": commands.bot}

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  if (message.author.id === client.user.id) {
      console.log("it's my message");

      parsedCommand = message.content.split(" ")[0];

      if (_.has(commandList, parsedCommand)) {
          commandList[parsedCommand](message);
      }
  }
});

client.login(settings.token);
