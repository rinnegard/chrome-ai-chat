"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Chat() {
    const [status, setStatus] = useState<string | undefined>();
    const [answer, setAnswer] = useState<string | undefined>();
    const inputRef = useRef<HTMLInputElement>(null);
    const sessionRef = useRef<any>(null);

    useEffect(() => {
        async function init() {
            const { available } = await window.ai.languageModel.capabilities();
            console.log(available);

            setStatus(available);

            if (available !== "no") {
                setStatus("Ready");
                sessionRef.current = await window.ai.languageModel.create();
            }
        }
        init();
    }, []);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e?.preventDefault();
        console.log(inputRef.current?.value);
        const result = await sessionRef.current.prompt(inputRef.current?.value);
        setAnswer(result);
    }

    return (
        <div className="flex flex-col justify-center items-center gap-8">
            {status ? (
                <div className="size-4 bg-green-600 rounded-full self-start"></div>
            ) : (
                <div className="size-4 bg-red-600 rounded-full self-start"></div>
            )}
            <form className="w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="prompt">Question:</label>
                    <input
                        className="rounded-lg h-8 p-2"
                        type="text"
                        name="prompt"
                        id="prompt"
                        ref={inputRef}
                    />
                    <button
                        className="rounded-lg bg-black text-white w-32 px-2 py-1 font-semibold self-center mt-2"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
            <div className="prose">
                <ReactMarkdown>{answer || ""}</ReactMarkdown>
            </div>
        </div>
    );
}
