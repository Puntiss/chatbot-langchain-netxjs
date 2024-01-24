# Description
Using the framework Langchan that helps develop to create chatbots I created a simple personalized assistant that in this case helps people generate responses to use in their everyday jobs as marketers. Is possible to integrate more than 10 rules and also a pre-made set of responses as base written into documents (PDF, DOCX etc.) but I didn't implement this feature.

TechStack:
- FE: NextJS, Tailwind.
- BE: Langchain.

# Usage and Modify
**0. Prerequisites:**

- Install [Node.js version 18.18.0+](https://nodejs.org/en/download/current) or check if it's already installed with `node -v`.
- Install [npm version 10.3.0+](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or check if it's already installed with `npm -v`.
- Generate an [OpenAI API KEY](https://platform.openai.com/api-keys).
 
**1. Install node_modules**
   
- After downloading the code, run the command `npm install` to download the Langchain, NextJs, Tailwind and all other node_modules

**2. Launch the application**

- Open the start.bat file or run the command `npm run dev` and wait until the app is loaded on `localhost:3000`

**3. Start chatting**

- Insert the OpenAI API Key in the correct field and start chatting:

![](https://github.com/Puntiss/chatbot-langchain-netxjs/blob/master/screenshot/usage.gif)
