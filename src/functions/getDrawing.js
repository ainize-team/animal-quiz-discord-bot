import axios from 'axios';
import { text2imageInfo as image } from '../../data/const.js';
import { delay } from './utils.js';
const url = 'https://3873-103-139-119-10.jp.ngrok.io';
const headers = {
  'content-type': 'application/json',
  accept: 'application/json',
};

async function getDrawing(text) {
  try {
    const response = await axios.post(
      `${url}/generate`,
      {
        prompt: text,
        steps: image.steps,
        seed: image.seed,
        width: image.width,
        height: image.height,
        images: image.count,
        guidance_scale: image.diversityScale,
      },
      {
        headers: headers,
      },
    );
    const task_id = response['data']['task_id'];
    let i = 0;
    let responseData;
    for (; i <= 15; i++) {
      const second = 1000;
      await delay(2 * second); /// waiting 1 second.

      const getResponse = await axios.get(`${url}/result/${task_id}`, {
        headers: headers,
      });

      responseData = getResponse['data'];
      const status = responseData['status'];
      if (status === 'completed') {
        const imageUrl = responseData['result']['grid']['url'];
        return imageUrl;
      }
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export { getDrawing };
