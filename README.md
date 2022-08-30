# animal-quiz-discord-bot-jibaek

텍스트 모델에서 생성된 프롬프트로 이미지 모델에서 이미지를 생성하고, 어떤 동물을 그린 것인지 맞추는 퀴즈를 내는 디스코드 봇

## 개발 환경 & 스펙

- Node.js (16.15.1)
- npm
- Javascript
- eslint & prettier

## 시작

    npm install
    node deploy-commands
    node .

## 환경변수

- TOKEN = 디스코드봇 로그인을 위한 토큰
- CLIENT_ID = 디스코드봇 아이디
- GUILD_ID = 디스코드 서버 아이디
- API_KEY = GPT3 API KEY,
- ORGANIZATION_ID = GPT3 사용자 ID,
- QUIZ_CHANNEL_ID = 퀴즈채널 아이디
- GALLERY_CHANNEL_ID = 갤러리 채널 아이디

## 파일경로

- commands : 디스코드봇 커맨드 코드
- events : 디스코드봇 이벤트(메시지 전송 등) 코드
- functions : 디스코드봇이 제공하는 기능에 대한 코드

## 사용 모델

- GPT-3 - https://beta.openai.com/docs/models/gpt-3
- Latent Diffusion - https://huggingface.co/multimodalart/compvis-latent-diffusion-text2img-large/tree/main
