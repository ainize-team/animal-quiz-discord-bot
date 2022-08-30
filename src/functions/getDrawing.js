import axios from 'axios';
import { text2imageInfo as image } from '../../data/const.js';
import { delay } from './utils.js';
import dotenv from 'dotenv';
dotenv.config();
const url = process.env.TTI_MODEL_URL;
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
    for (let i = 0; i <= 15; i++) {
      const second = 1000;
      await delay(2 * second); /// waiting 1 second.

      const getResponse = await axios.get(`${url}/result/${task_id}`, {
        headers: headers,
      });

      const responseData = getResponse['data'];
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
