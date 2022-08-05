
module.exports = {
  name: 'messageCreate',
  async execute(message) {

    const content = message.content;
    if (message.author.bot || message.author.system || content == '')
      return;

    message.reply("test");
    return;
  },
};

