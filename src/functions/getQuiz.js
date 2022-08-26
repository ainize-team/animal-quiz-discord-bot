import { getKeyByValue, getRandomInt } from './utils.js';
import { getImagination } from './getText.js';
import quizEmojiDict from '../../data/emojis.json' assert { type: 'json' };
import quizStyleDict from '../../data/styles.json' assert { type: 'json' };
const animalDict = quizEmojiDict['animalDict'];
const styleList = quizStyleDict['styles'];

function getOneEmojiPerOneAnimal() {
  let animalList = [];
  for (let x in animalDict) {
    animalList.push(animalDict[x]);
  }
  animalList = new Set(animalList);
  animalList = [...animalList];
  return animalList;
}

const animalList = getOneEmojiPerOneAnimal();

function getQuizDict(text, animal) {
  const description = text;
  const quiz = description.toLowerCase().replaceAll(animal, 'X');
  const emoji = getKeyByValue(animalDict, animal);
  const quizDict = {
    description: description,
    quiz: quiz,
    animal: animal,
    emoji: emoji,
  };
  return quizDict;
}

async function getRandomQuiz(mode) {
  let description;
  const animal = animalList[getRandomInt(animalList.length)];
  const imagine = await getImagination(`${animal} shaped`);
  description = `${animal} shaped${imagine}`;
  if (mode === 'style') {
    description = `${description}, in ${
      styleList[getRandomInt(styleList.length)]
    } style`;
  } else if (mode === 'drawing') {
    description = `A painting of ${description}`;
  }
  const quiz = description.toLowerCase().replaceAll(animal, 'X');
  const emoji = getKeyByValue(animalDict, animal); // 이렇게 한 이유 : 한 동물에 대한 이모지가 여러개 존재하는 경우가 있기 때문
  const quizDict = {
    description: description,
    quiz: quiz,
    animal: animal,
    emoji: emoji,
  };
  return quizDict;
}

export { getQuizDict, getRandomQuiz };
