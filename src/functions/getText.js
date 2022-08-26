import {
  description,
  talkDescription,
  designerPromptExampleList,
} from '../../data/prompts.js';
import { getRandomInt } from './utils.js';
import axios from 'axios';
import config from '../config.json' assert { type: 'json' };
const apikey = config['apikey'];
const OrganizationID = config['OrganizationID'];
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
Mark:`;
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

async function getImagination(animal) {
  const prompt = `${description}\n${
    designerPromptExampleList[getRandomInt(6)]
  }${animal}`;
  try {
    const response = await axios.post(
      url,
      {
        model: 'text-davinci-002',
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
