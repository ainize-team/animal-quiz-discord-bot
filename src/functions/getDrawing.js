import axios from 'axios';
import { text2imageInfo as image } from '../../data/const.js';
const url =
  'https://hf.space/embed/multimodalart/latentdiffusion/+/api/predict/';

function getBase64Data(response) {
  const responseData = response['data'];
  if (!responseData) {
    console.log('error: get wrong format of response');
    console.log(response);
    return false;
  }
  const imageDataArray = responseData['data'];
  if (!imageDataArray) {
    console.log('error: fail to get image data array');
    console.log(responseData);
    return false;
  }

  // 현재 사용중인 서버는 base64Data를 배열 안에 넣어 전송함. 로컬 서버로 이전한 뒤에는 imageDataArray => imageData로 변경하여 아래의 if문을 위와 통합할 것
  const imageData = imageDataArray[0];
  if (!imageData) {
    console.log('error: fail to get image data');
    console.log(imageDataArray);
    return false;
  }

  const base64Data = imageData.replace(/^data:image\/png;base64,/, '');
  if (base64Data.length === imageData.length) {
    console.log('error: fail to get base64 data');
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

    return base64Data;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export { getDrawing };
