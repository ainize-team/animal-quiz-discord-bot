import { logLastUserTimestamp } from '../functions/setQuizScheduler.js';
import { isChannelExcluded } from '../functions/excludeChannels.js';

const eventName = 'messageCreate';
const execute = async (message) => {
  const content = message.content;
  if (message.author.bot || message.author.system || content === '') return;
  if (isChannelExcluded(message.channel['id'])) return;
  logLastUserTimestamp();

  message.reply('test');
  return;
};

export { eventName as name, execute };
