const quizInterval = 1;
const longTermQuizInterval = quizInterval * 60;
const second = 1000;
const minute = 60 * second;
const extendIntervalAfter = 10 * minute;

const maxSteps = 50;
const maxDiversity = 5;
const text2imageInfo = {
  steps: maxSteps, //Steps - more steps can increase quality but will take longer to generate
  width: '256',
  height: '384',
  count: 2,
  diversityScale: maxDiversity, //Diversity scale - How different from one another you wish the images to be
};

export {
  quizInterval,
  longTermQuizInterval,
  extendIntervalAfter,
  text2imageInfo,
};
