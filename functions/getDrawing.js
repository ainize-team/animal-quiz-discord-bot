import axios from 'axios';
import { text2imageInfo as image } from '../const.js';
const url =
  'https://hf.space/embed/multimodalart/latentdiffusion/+/api/predict/';

function getBase64Data(response) {
  const responseData = response['data'];
  if (!responseData) {
    console.log('error: get wrong format of response');
    console.log(response);
    return false;
  }
  const imageData = responseData['data'];
  if (!imageData) {
    console.log('error: fail to get image data');
    console.log(responseData);
    return false;
  }

  // 현재 사용중인 서버는 base64Data를 배열 안에 넣어 전송함. 로컬 서버로 이전한 뒤에는 아래의 if문 까지의 코드는 삭제 (imageData가 바로 base64Data가 될 것)
  const base64Data = imageData[0];
  if (!base64Data) {
    console.log('error: fail to get image');
    console.log(imageData);
    return false;
  }

  return base64Data;
}

async function getDrawing(text) {
  try {
    const response = await axios.post(url, {
      data: [
        text,
        image.steps,
        image.width,
        image.height,
        image.count,
        image.diversityScale,
      ],
    });

    const base64Data = getBase64Data(response);
    if (!base64Data) {
      return false;
    }

    const base64DataOnly = base64Data.replace(/^data:image\/png;base64,/, '');
    return base64DataOnly;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export { getDrawing };
