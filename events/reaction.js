import { logLastUserTimestamp } from '../functions/setQuizScheduler.js';
import { isChannelExcluded } from '../functions/excludeChannels.js';

const name = 'messageReactionAdd';
const execute = async (reaction, user) => {
  if (isChannelExcluded(reaction.message['channelId'])) return;
  if (user.bot) return;
  logLastUserTimestamp();
};

export { name, execute };
