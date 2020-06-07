const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const {TOKEN,PREFIX} = require("./config.js");

client.commands = new Discord.Collection()


var nombreAleatoire = Math.round(Math.random()*2);
 
client.login(TOKEN);
 
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
        client.commands.set(getFileName.help, getFileName);
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

/* if(message.content === prefix + "ping") { 
        message.channel.send("Pong")
    }

    if (message.content === prefix + "Quelle est ton jeu favori") {  //commande jeu favori
        const replies = ["Dur de choisir parmis tous les jeux disponibles mais je dirai GTA", "Dur de choisir mais je dirai Monster Hunter","Selon moi le meilleur jeu est Ride 3"]
        message.replytext = Math.floor((Math.random() * replies.length) + 0);
        message.channel.send(replies[message.replytext]
        );
    }
    
    if(message.content === prefix + "" )  {
        if(message.author.bot === false) {
            message.channel.send("Je ne suis pas sur de comprendre, êtes-vous sure de la commande?",)
        }
    }

    if(message.content === prefix + "Deconnection") { //commande deconnexion
        message.channel.send("**Déconnection en cours**")
            function fonctionAEtape(etape) {
                setTimeout(function() { 
                    message.channel.send("**Déconnécter**")
                    client.user.setStatus("offline"),
                5000, 2)};
            }
        }
    }
*/
