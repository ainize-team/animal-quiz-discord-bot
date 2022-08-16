import config from '../config.json' assert { type: 'json' };
const quizChannelId = config['quizChannelId'];
//const quizChannelId = process.env.CHANNEL_ID // 실제 배포시에 사용할 코드

function isCommandExcluded(channelId, interaction) {
  const isExcluded = isChannelExcluded(channelId);
  if (isExcluded) {
    interaction.reply(`Move to <#${quizChannelId}> Channel to create quiz!`);
  }
  return isExcluded;
}

function isChannelExcluded(channelId) {
  return channelId !== quizChannelId;
}

export { isCommandExcluded, isChannelExcluded };
