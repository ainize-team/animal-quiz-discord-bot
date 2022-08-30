import dotenv from 'dotenv';
dotenv.config();
const quizChannelId = process.env.QUIZ_CHANNEL_ID; // 실제 배포시에 사용할 코드

function isCommandExcluded(interaction, commandMessage) {
  const isExcluded = isChannelExcluded(interaction.channel['id']);
  if (isExcluded) {
    interaction.reply(
      `Move to <#${quizChannelId}> Channel to ${commandMessage}!`,
    );
  }
  return isExcluded;
}

function isChannelExcluded(channelId) {
  return channelId !== quizChannelId;
}

export { isCommandExcluded, isChannelExcluded };
