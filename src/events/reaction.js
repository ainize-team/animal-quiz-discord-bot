import { logLastUserTimestamp } from '../functions/setQuizScheduler.js';
import { isChannelExcluded } from '../functions/excludeChannels.js';
import { sendToGalleryChannel } from '../functions/sendToGallery.js';
import dotenv from 'dotenv';
dotenv.config();
const botName = process.env.BOT_NAME;
const discriminator = process.env.DISCRIMINATOR;

const eventName = 'messageReactionAdd';
const execute = async (reaction, user) => {
  if (isChannelExcluded(reaction.message['channelId'])) return;
  if (user.bot) return;
  logLastUserTimestamp();

  if (
    reaction._emoji.name === '❤️' &&
    reaction.message.author.username === `${botName} on Mars` &&
    reaction.message.author.discriminator === discriminator
  ) {
    sendToGalleryChannel(reaction.message);
  }
};

export { eventName as name, execute };
