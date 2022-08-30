import { logLastUserTimestamp } from '../functions/setQuizScheduler.js';
import { isChannelExcluded } from '../functions/excludeChannels.js';
import { sendToGalleryChannel } from '../functions/sendToGallery.js';

const eventName = 'messageReactionAdd';
const execute = async (reaction, user) => {
  if (isChannelExcluded(reaction.message['channelId'])) return;
  if (user.bot) return;
  logLastUserTimestamp();

  if (
    reaction._emoji.name === '❤️' &&
    reaction.message.author.username === 'Mark on Mars' &&
    reaction.message.author.discriminator === '5234'
  ) {
    sendToGalleryChannel(reaction.message);
  }
};

export { eventName as name, execute };
