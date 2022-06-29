const Discord = require('discord.js');
const { token } = require('./config.json');
const maps = ["bind", "haven", "split", "ascent", "icebox", "breeze", "pearl"];
const agents = ["astra", "breach", "brimstone", "chamber", "cypher", "jett", "kayo", "killjoy", "neon", "omen", "phoenix", "raze", "reyna", "sage", "skye", "sova", "viper", "yoru"];

const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"],
    allowedMentions: { parse: ['users'], repliedUser: true}
});

client.once('ready', async () => {
    console.log(`${client.user.tag} is online`);

    const data = {
        name: 'add',
        description: 'Add preferred agents to maps!',
        options: [{
            name: 'map',
            type: 'STRING',
            description: 'map name or \"all\"',
            required: true,
            
        },
        {
            name: 'agent',
            type: 'STRING',
            description: 'agent name',
            required: true
        }]
    }

    //const command = await client.guilds.cache.get('990430213190078474')?.commands.create(data)
});

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
        if (interaction.commandName === 'add') {
            const a = interaction.options.getString('agent').toLowerCase();
            const m = interaction.options.getString('map').toLowerCase();
            if (!agents.includes(a)) {
                await interaction.reply({
                    content: a + ' is an invalid agent!', ephemeral: true
                });
            } else if (!maps.includes(m)) {
                await interaction.reply({
                    content: m + ' is an invalid map!', ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: 'Added ' + a + " to " + m, ephemeral: true
                });
            }
        }
    }
})

client.on('messageCreate', async message => {
    if (message.author.bot || message.channel.type == 'DM') {
        return;
    }
});

client.login(token);