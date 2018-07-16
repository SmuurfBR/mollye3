const https = require('https');
const Discord = require('discord.js');

exports.run = (client, message, args) => {
    var name = "";
    for(var i = 1; i < args.length; i++){
        name += args[i] + " ";
    }
    name = name.trim(); // remove last space

    if(name === "" || name.indexOf(":") > -1 || !isValid(name)){
        var emoji = client.emojis.find("name", "aaa");
        if(emoji === null) emoji = ":(";
        message.channel.send(`Argumento Invalido! ${emoji}`);
        return;
    }

    var options = {
        host: 'api.fortnitetracker.com',
        path: '/v1/profile/pc/' + encodeURIComponent(name),
        port: 443,  // isnt this used for mail?
        method: 'GET',
        headers: { 'TRN-Api-Key': "365cbe23-843d-499d-bc48-55024b024dbb" }
    };

    var req = https.request(options, function(res){
        var body = "";
        res.on('data', function(data){
            body += data;
        });
        res.on('end', end => {
            body = JSON.parse(body);
            console.log(body);    // debug

            // player not found
            if(body.error){
                var emoji = client.emojis.find("name", "feelsbadman");
                if(emoji === null) emoji = ":(";
                message.channel.send(`Usúario não encontrado ${emoji}`);
                return;
            }
            // player found
            var epicName = body["epicUserHandle"];
            var platform = body["platformName"];
            var score = body.lifeTimeStats[6]["value"];
            var matchesPlayed = body.lifeTimeStats[7]["value"];
            var wins = body.lifeTimeStats[8]["value"];
            //var timePlayed = body.lifeTimeStats[13]["value"]; // removed from API?
            var wr = body.lifeTimeStats[9]["value"];
            var kills = body.lifeTimeStats[10]["value"];
            var kd = body.lifeTimeStats[11]["value"];
            //var killsPerMin = body.lifeTimeStats[12]["value"];
            var url = "https://fortnitetracker.com/profile/pc/"
                                    + encodeURIComponent(name);

            var msg = "";
            msg += '\nPlataforma :desktop:';
            msg += "\n🏆 | `Vitórias`: " + wins;
            msg += "\n🔎 | `Partidas`: " + matchesPlayed;
            msg += "\n📊 | `Taxa de vitorias`: " + wr;
            msg += "\n\n🔪 | `Kills`: " + kills /* + " (" + killsPerMin + "/min)"*/ ;
            msg += "\n🛡 | `K/D`: " + kd;
            msg += "\n\n🌐 | `Usúario`: " + epicName;

            var embed = new Discord.RichEmbed()
                .setAuthor(epicName, "", url)
                .setDescription(msg)
                .setColor(9955331)
                .setImage("https://media1.tenor.com/images/d89ba4e965cb9144c82348a1c234d425/tenor.gif?itemid=11793362")
                .setURL(url)
                .setThumbnail("https://cdn2.unrealengine.com/Fortnite%2Fhome%2Ffn_battle_logo-1159x974-8edd8b02d505b78febe3baacec47a83c2d5215ce.png");

            message.channel.send(embed);
        });
    });

    req.end();
};

// copypasted from stackoverflow. weird regex stuff
function isValid(str){
    return !/[~`!#$%\^&*+=\[\]\\';,/{}|\\":<>\?]/g.test(str);
}
