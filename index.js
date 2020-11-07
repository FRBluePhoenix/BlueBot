const { Client, Collection } = require("discord.js");
const { Token, prefix } = require("./config.js");
const { readdirSync } = require("fs");

const client = new Client();
client.commands = new Collection();

//division des commandes
const loadCommands = (dir = "./commands/") => {
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

        for (const file of commands) {
            const getFileName = require(`${dir}/${dirs}/${file}`);
            client.commands.set(getFileName.help.name, getFileName);
            console.log(client.commands)
            console.log(`Commande chargée: ${getFileName.help.name}`);
        } 
    })
}

loadCommands();

//connexion du bot
client.login(Token);
client.on("ready", () => {
    console.log("Bot connecté avec succès")
});

//renvoie commandes
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;
    client.commands.get(command).run(client, message, args);
})
