const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json')
const fs = require("fs")


client.commands = new Discord.Collection()
let prefix = config.prefix;



 
client.login(config.token);
 
client.on("ready", () => {
    console.log("connecté !")
    client.user.setStatus("online")
    client.user.setActivity("Être developper",{type: 1})
});

//division des commandes
const loadCommands = (dir = "./commands/") => {
    fs.readdirSync(dir).forEach(dirs => {
      const commands = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
  
      for (const file of commands) {
        const getFileName = require(`${dir}/${dirs}/${file}`);
        client.commands.set(getFileName.help.name, getFileName);
        console.log(`Commande chargée: ${getFileName.help.name}`);
      };
    });
  };
  
  loadCommands();

//Renvoie Messages
client.on('message', message => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;
    const args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (!client.commands.has(command)) return;
    client.commands.get(command).run(client, message, args);
  });
