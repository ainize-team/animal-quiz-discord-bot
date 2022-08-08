const name = 'messageCreate';
const execute = async function (message) {
  const content = message.content;
  if (message.author.bot || message.author.system || content == '') return;

  message.reply('test');
  return;
};

export { name, execute };
