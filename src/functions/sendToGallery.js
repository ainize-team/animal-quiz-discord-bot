import dotenv from 'dotenv';
dotenv.config();
const galleryChannelId = process.env.GALLERY_CHANNEL_ID;
const botName = process.env.BOT_NAME;
const discriminator = process.env.DISCRIMINATOR;
let lastSentMessage = null;
let lastSentMessageEmbed = null;

function checkGalleryMessageAndReactWithAnswer(message, answerEmoji) {
  message.embeds.forEach((embed) => {
    if (lastSentMessageEmbed) {
      if (embed.data.description === lastSentMessageEmbed.data.description) {
        if (lastSentMessage) {
          lastSentMessage.react(answerEmoji);
        }
      }
      lastSentMessageEmbed = null;
    }

    if (lastSentMessage) {
      lastSentMessage = null;
    }
  });
}

function sendToGalleryChannel(message) {
  let object = '';
  for (const [key, value] of message.reactions.cache) {
    if (key === '🎨') {
      return;
    }
    if (
      value.message.author.username === `${botName} on Mars` &&
      value.message.author.discriminator === discriminator &&
      key !== '❤️' &&
      value.me
    ) {
      object = key;
    }
  }

  const galleryChannel = message.guild.channels.cache.get(galleryChannelId);
  message.attachments.forEach((attach) => {
    message.embeds.forEach(async (embed) => {
      lastSentMessage = await galleryChannel.send({
        embeds: [embed],
        files: [attach.attachment],
      });
      lastSentMessage.react('❤️');
      if (object) {
        lastSentMessage.react(object);
      }
      lastSentMessageEmbed = embed;
      message.react('🎨');
      message.reply(`Drawing has been sent to <#${galleryChannelId}>`);
    });
  });
}

export {
  sendToGalleryChannel,
  checkGalleryMessageAndReactWithAnswer,
  lastSentMessage,
  lastSentMessageEmbed,
};
