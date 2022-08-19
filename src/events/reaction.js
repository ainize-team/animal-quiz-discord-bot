import { logLastUserTimestamp } from '../functions/setQuizScheduler.js';
import { isChannelExcluded } from '../functions/excludeChannels.js';

const eventName = 'messageReactionAdd';
const execute = async (reaction, user) => {
  if (isChannelExcluded(reaction.message['channelId'])) return;
  if (user.bot) return;
  logLastUserTimestamp();
};

export { eventName as name, execute };
