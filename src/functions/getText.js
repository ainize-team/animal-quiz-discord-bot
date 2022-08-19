import { description, talkDescription } from '../../data/prompts.js';
import axios from 'axios';
import config from '../config.json' assert { type: 'json' };
const apikey = config['apikey'];
const OrganizationID = config['OrganizationID'];
const url = 'https://api.openai.com/v1/completions';

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
  const prompt = description + talkDescription + '\nme: ' + text + '\nMark:';
  const headers = {
    'content-type': 'application/json',
    Authorization: 'Bearer ' + apikey,
    'OpenAI-Organization': OrganizationID,
  };
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

export { getTalk };
