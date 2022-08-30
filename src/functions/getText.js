import {
  description,
  talkDescription,
  designerPromptExampleDict,
} from '../../data/prompts.js';
import { getRandomInt } from './utils.js';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const botName = process.env.BOT_NAME;

const apikey = process.env.API_KEY;
const OrganizationID = process.env.ORGANIZATION_ID;
const url = 'https://api.openai.com/v1/completions';
const headers = {
  'content-type': 'application/json',
  Authorization: `Bearer ${apikey}`,
  'OpenAI-Organization': OrganizationID,
};

function getText(response) {
  const responseData = response['data'];
  if (!responseData) {
    console.log('error: get wrong format of response');
    console.log(response);
    return false;
  }

  const choicesData = responseData['choices'];
  if (!choicesData) {
    console.log('error: get wrong format of choicesData');
    console.log(response);
    return false;
  }
  const talkData = choicesData[0];
  if (!talkData) {
    console.log('error: fail to get talkData');
    console.log(responseData);
    return false;
  }

  const text = talkData['text'];
  if (!text) {
    console.log('error: fail to get text data');
    console.log(responseData);
    return false;
  }

  return text;
}

async function getTalk(text) {
  const prompt = `${description}
${talkDescription}
me: ${text}
${botName}:`;
  try {
    const response = await axios.post(
      url,
      {
        model: 'text-davinci-002',
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 128,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ['3.', '3)', 'me:'],
      },
      {
        headers: headers,
      },
    );

    const talk = getText(response);
    if (!talk) {
      return 'sorry, something is wrong with the text';
    }
    if (!talk.replace(/\s/g, '')) {
      return '.';
    } else {
      return talk;
    }
  } catch (e) {
    console.log(e);
    return 'sorry, something is wrong with the server';
  }
}

async function getImagination(object) {
  const promptList = designerPromptExampleDict[process.env.QUIZ_OBJECT];
  const prompt = `${description}
${promptList[getRandomInt(promptList.length)]}${object}`;
  try {
    const response = await axios.post(
      url,
      {
        model: 'text-curie-001',
        prompt: prompt,
        temperature: 1,
        max_tokens: 30,
        top_p: 1,
        frequency_penalty: 2.0,
        presence_penalty: 1.0,
        stop: ['12.', '.'],
      },
      {
        headers: headers,
      },
    );

    const imagination = getText(response);
    return imagination;
  } catch (e) {
    console.log(e);
    return 'sorry, something is wrong with the server';
  }
}

export { getImagination, getTalk };
