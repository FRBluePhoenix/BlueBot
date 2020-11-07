module.exports.run = (client, message, args) => {
    let role = message.guild.roles.cache.find(r => r.name === args.toString())
    let user_mention = message.mentions.members.first();

    if (role) {
        if (message.member.roles.cache.has(role.id)) return message.channel.send("Vous avez deja ce rôle")

        if (role.permissions.has('ADMINISTRATOR')) return message.channel.send('Vous ne pouvez pas avoir ce rôles')  
            
        message.member.roles.add(role)
            .then(m => message.channel.send("Vous possédez le rôle ${role}"))
            .catch(e => console.log(e))

        if (message.author.hasPermission(Administator, ROLE_MANAGER))
            then(user_mention.addRole(role))

    }   else {
        message.channel.send("Ce role n'existe pas")
    }
}

module.exports.help = {
    name: "add",
    description: "Ajouter un rôles seulement pour les admins ",
}

/*        if (user.permissions.has('Administator', 'ROLE_MANAGER')
            .then(m => guildMemberAdd.id(user_mention))
            .then(m => message.channel.send('${user_mention} a reçu le role ${role}'),
*/