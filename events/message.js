import { logLastUserTimestamp } from '../functions/setQuizScheduler.js';
import { isChannelExcluded } from '../functions/excludeChannels.js';

const name = 'messageCreate';
const execute = async function (message) {
  const content = message.content;
  if (message.author.bot || message.author.system || content == '') return;
  if (isChannelExcluded(message.channel['id'])) return;
  logLastUserTimestamp();

  message.reply('test');
  return;
};

export { name, execute };
