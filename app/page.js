

"use client";

import { useState } from "react";

export default function Home() {
  const [streamedData, setStreamedData] = useState("");
  const [prompt, setPrompt] = useState("");

  const handleChatSubmit = async (e) => {
    e.preventDefault();

    setPrompt("-");
    const formData = new FormData(e.currentTarget);
    setPrompt(formData.get("prompt"));
    setStreamedData("");

    //Fake History
    if (prompt != "" && prompt != null)
      if (streamedData != "" && streamedData != null) {

        let tuElement = document.createElement('div');
        tuElement.innerHTML = `
      <h3 class="text-gray-400" >You:</h3>
      <p class="text-gray-200 rounded-md bg-gray-700 p-4" >
        ${prompt}
      </p>
    `;
        document.getElementById("history").appendChild(tuElement);
        let asElement = document.createElement('div');
        asElement.innerHTML = `
      <h3 class="text-gray-400" >Assistant:</h3>
      <p class="text-gray-200 rounded-md bg-gray-700 p-4" >
        ${streamedData}
      </p>
    `;
        document.getElementById("history").appendChild(asElement);
      }

    //Call LLM and get response
    const response = await fetch("api/langchain", {
      method: "POST",
      body: JSON.stringify({
        chat: formData.get("prompt"),
        numeroMessaggi: "5",
        key: "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",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const reader = response.body.getReader();

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      const text = new TextDecoder().decode(value);
      setStreamedData((prevData) => prevData + text);
    }
  };

  const handleClearChat = () => {
    setStreamedData("");
    setPrompt("")
    const node = document.getElementById("history");
    while (node.firstChild) {
      node.removeChild(node.lastChild);
    }
  };

  return (


    <main className="max-w-4xl mx-auto items-center justify-center px-24 py-8">
      <div className="flex flex-col gap-12">
        <div id="chat">
          <div id="history">
          </div>
          {prompt && (
            <div>
              <h3 className="text-gray-400" >You:</h3>
              <p className="text-gray-200 rounded-md bg-gray-700 p-4" >
                {prompt}
              </p>
            </div>
          )}

          {streamedData && (
            <div>
              <h3 className="text-gray-400" >Assistant:</h3>
              <p className="text-gray-200 rounded-md bg-gray-700 p-4" >
                {streamedData}
              </p>
            </div>
          )}
        </div>
        <form onSubmit={handleChatSubmit}>
          <div className="md:bg-gray-700 ">
            <ul className="flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0">
              <li>
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="py-2 px-4 rounded-md bg-gray-600 text-white w-full outline-none mb-2">
                  Delete history
                </button>
              </li>
              <li>
                <input
                  className="py-2 px-4 rounded-md bg-gray-600 text-white w-full outline-none mb-2"
                  name="key"
                  placeholder="OpenAI API KEY"
                  type="password"
                  required
                ></input>
              </li>
            </ul>
          </div>

          <div className="relative flex h-full flex-1 items-stretch md:flex-col">
            <div className="flex w-full items-center">
              <div className="overflow-hidden border-token-border-xheavy flex flex-col w-full dark:border-token-border-heavy flex-grow relative border border-token-border-heavy dark:text-white rounded-2xl bg-white dark:bg-gray-800 ">

                <textarea
                  className="m-0 w-full resize-y outline-none border-white bg-gray-700 text-white py-3 pr-10 md:py-3.5 md:pr-1 pl-3 md:pl-4"
                  placeholder="Enter prompt"
                  name="prompt"
                  required></textarea>

                <button
                  type="submit"
                  className="absolute md:bottom-3 md:right-3 bottom-3 right-3 py-2 px-4 text-white  hover:opacity-80 transition-opacity">
                  <svg className="w-6 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
