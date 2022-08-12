import { logLastUserTimestamp } from '../functions/setQuizScheduler.js';
import { isChannelExcluded } from '../functions/excludeChannels.js';

const name = 'messageReactionAdd';
const execute = async function (reaction, user) {
  if (isChannelExcluded(reaction.message['channelId'])) return;
  if (user.bot) return;
  logLastUserTimestamp();

  const emoji = reaction.emoji.name;
  console.log(emoji);
};

export { name, execute };
