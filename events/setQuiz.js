import { setQuiz } from '../functions/setQuizScheduler.js';
const name = 'ready';
const once = true;
const execute = function (client) {
  setQuiz(client);
};

export { name, once, execute };
