import { getKeyByValue, getRandomInt } from './utils.js';
import { getImagination } from './getText.js';
import quizEmojiDict from '../../data/emojis.json' assert { type: 'json' };
import quizStyleDict from '../../data/styles.json' assert { type: 'json' };
import dotenv from 'dotenv';
dotenv.config();
const quizObject = process.env.QUIZ_OBJECT;
const objectDict = quizEmojiDict[`${quizObject}Dict`];
const styleList = quizStyleDict['styles'];

function getOneEmojiPerOneObject() {
  let objectList = [];
  for (let x in objectDict) {
    objectList.push(objectDict[x]);
  }
  objectList = new Set(objectList);
  objectList = [...objectList];
  return objectList;
}

const objectList = getOneEmojiPerOneObject();

function getQuizDict(text, object) {
  const description = text;
  const quiz = description.toLowerCase().replaceAll(object, 'X');
  const emoji = getKeyByValue(objectDict, object);
  const quizDict = {
    description: description,
    quiz: quiz,
    object: object,
    emoji: emoji,
  };
  return quizDict;
}

async function getRandomQuiz(mode) {
  let description;
  const object = objectList[getRandomInt(objectList.length)];
  const imagine = await getImagination(`${object} shaped`);
  description = `${object} shaped${imagine}`;
  if (mode === 'style') {
    description = `${description}, in ${
      styleList[getRandomInt(styleList.length)]
    } style`;
  } else if (mode === 'drawing') {
    description = `A painting of ${description}`;
  }
  const quiz = description.toLowerCase().replaceAll(object, 'X');
  const emoji = getKeyByValue(objectDict, object); // 이렇게 한 이유 : 한 동물에 대한 이모지가 여러개 존재하는 경우가 있기 때문
  const quizDict = {
    description: description,
    quiz: quiz,
    object: object,
    emoji: emoji,
  };
  return quizDict;
}

export { getQuizDict, getRandomQuiz };
