"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import ChatMessage from "./chat-message";

export type Message = {
    id: string;
    text: string;
    self: boolean;
};

export default function Chat() {
    const [status, setStatus] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const sessionRef = useRef<any>(null);

    useEffect(() => {
        async function init() {
            const { available } = await window.ai.languageModel.capabilities();
            console.log(available);

            setStatus(available);

            if (available !== "no") {
                setStatus(true);
                sessionRef.current = await window.ai.languageModel.create();
            }
        }
        init();
    }, []);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e?.preventDefault();
        setStatus(false);
        if (!inputRef.current) {
            return;
        }

        const inputValue = inputRef.current.value;

        inputRef.current.value = "";

        setMessages((prev) => {
            return [
                ...prev,
                { id: crypto.randomUUID(), self: true, text: inputValue },
            ];
        });

        const result = await sessionRef.current.prompt(inputValue);

        setMessages((prev) => {
            return [
                ...prev,
                { id: crypto.randomUUID(), self: false, text: result },
            ];
        });

        setStatus(true);
    }

    return (
        <div className="flex flex-col justify-between h-full p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
            <div className="flex items-center">
                <div
                    className={`w-4 h-4 rounded-full ${
                        status ? "bg-green-600" : "bg-red-600"
                    }`}
                ></div>
                <span className="ml-2 text-gray-600">
                    {status ? "Online" : "Offline"}
                </span>
            </div>

            <div className="overflow-y-scroll max-h-[40rem] my-4 p-2 border border-gray-200 rounded-lg bg-gray-50 flex flex-col gap-2">
                {messages.map((message) => {
                    return (
                        <ChatMessage
                            key={message.id}
                            message={message}
                        ></ChatMessage>
                    );
                })}
            </div>

            <form className="flex flex-col mt-auto" onSubmit={handleSubmit}>
                <label
                    htmlFor="prompt"
                    className="text-sm font-medium text-gray-700"
                >
                    Question:
                </label>
                <input
                    className="rounded-lg h-10 p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="prompt"
                    id="prompt"
                    ref={inputRef}
                    placeholder="Type your question..."
                />
                <button
                    className="rounded-lg bg-blue-600 text-white w-full py-2 font-semibold mt-2 hover:bg-blue-500 transition duration-200 ease-in-out disabled:bg-gray-300 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={!status}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
