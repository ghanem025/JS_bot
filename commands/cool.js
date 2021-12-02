const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cool')
		.setDescription('Replies with cool monke info'),
	async execute(interaction) {
		await interaction.reply('https://tenor.com/view/monkey-aquapark-glasses-based-gif-22841182');
	},
};
