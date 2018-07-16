// O COMEÇO DE UMA NOVA ERA
const Discord = require("discord.js");
const client = new Discord.Client();

// Constant Variables
const prefix = 'm!'; // prefix
const ownerID = '314460143909601280';
const active = new Map();

const serverStats = {
  guildID: '467846690955591700',
  totalUsersID: '467863103259017217',
  memberCountID: '467863190064070656',
  botCountID: '467863222855139328'
};

const botStats = {
  totalGuildsID: '467868180811874314',
  totalUsersID: '467868275485835301',
  totalChannelsID: '467868305223450635'
};

async function getEval(message, args) {
    if(message.content.includes("token")) return message.reply("**CALA BOCA CUZÃO!**");
    let code = args.join(' ');

    try {
        let evaled = await eval(code);

        if(evaled === null) evaled = 'null';
        if(evaled === undefined) evaled = 'undefined';

        var msg12 = `**CÓDIGO:**\n\`\`\`js\n${code}\`\`\`\n**RESULTADO:**\n\`\`\`LDIF\n${evaled}\`\`\``

        message.channel.sendMessage(msg12.replace(/`${process.env.token}`/g, `PORQUEDESEJASABER`))

    } catch(err) {
        message.channel.sendMessage(`**CÓDIGO:**\n\`\`\`js\n${code}\`\`\`\n**ERRO:**\n\`\`\`LDIF\n${err}\`\`\``)
    }


}

client.on('message', message => {
    if(message.content.startsWith('m!eval') || message.content.startsWith('m!eval')) {
        var args = message.content.split(' ').slice(1)

        if(message.author.id === '314460143909601280') {
            getEval(message, args);
        } else {
            message.channel.sendMessage(`Ei ${message.author.username}, você não tem permissão para usar este comando!`)
        }
    }
});

client.on("ready", () => {
client.user.setActivity(`${client.users.size} filhos em ${client.guilds.size} servidores`, {type: "WATCHING"});
});

// Listener Events
client.on('message', message => {
    // Um evento super importante!

    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

// Command Handler

    try {

          delete require.cache[require.resolve(`./comandos/${cmd}.js`)];

          // Options

          let ops = {
            ownerID: ownerID,
            active: active
          }

          let commandFile = require(`./comandos/${cmd}.js`);
          commandFile.run(client, message, args, ops);

    } catch (e) {
        console.log(e.stack)
    }


});

// Evento de pronto!
client.on('ready', () => console.log(`Meu nome é ${client.user.tag} tenho ${client.users.size} filhos, em ${client.channels.size} canais de ${client.guilds.size} servers.`));

client.on('guildMemberAdd', member => {

  if (member.guild.id !== serverStats.guildID) return;

  client.channels.get(serverStats.totalUsersID).setName(`Usúarios ao total: ${member.guild.memberCount}`);
  client.channels.get(serverStats.memberCountID).setName(`Membros ao total: ${member.guild.members.filter(m => !m.user.bot).size}`);
  client.channels.get(serverStats.botCountID).setName(`Bots ao total: ${member.guild.members.filter(m => m.user.bot).size}`);

});

client.on('guildMemberRemove', member => {

  if (member.guild.id !== serverStats.guildID) return;

  client.channels.get(serverStats.totalUsersID).setName(`Usúarios ao total: ${member.guild.memberCount}`);
  client.channels.get(serverStats.memberCountID).setName(`Membros ao total: ${member.guild.members.filter(m => !m.user.bot).size}`);
  client.channels.get(serverStats.botCountID).setName(`Bots ao total: ${member.guild.members.filter(m => m.user.bot).size}`);

});

client.on('guildCreate', guild => {

  client.channels.get(botStats.totalGuildsID).setName(`Servidores ao total: ${client.guilds.size}`);
  client.channels.get(botStats.totalUsersID).setName(`Usúarios ao total: ${client.guilds.reduce((a, g) => a + g.memberCount, 0)}`);
  client.channels.get(botStats.totalChannelsID).setName(`Canais ao total: ${client.channels.size}`);

});

client.on('guildDelete', guild => {

  client.channels.get(botStats.totalGuildsID).setName(`Servidores ao total: ${client.guilds.size}`);
  client.channels.get(botStats.totalUsersID).setName(`Usúarios ao total: ${client.guilds.reduce((a, g) => a + g.memberCount, 0)}`);
  client.channels.get(botStats.totalChannelsID).setName(`Canais ao total: ${client.channels.size}`);

});

// Login
client.login('NDYxNTI0NTIwMzY1MTk1Mjc0.DiwlFg.wgjj4OL3c2Bryeltp6AlKqGVKiQ')
