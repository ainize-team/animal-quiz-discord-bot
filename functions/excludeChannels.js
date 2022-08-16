import config from '../config.json' assert { type: 'json' };
const quizChannelId = config['quizChannelId'];
//const quizChannelId = process.env.CHANNEL_ID // 실제 배포시에 사용할 코드

function isChannelExcluded(channelId) {
  return channelId !== quizChannelId;
}

export { isChannelExcluded };
