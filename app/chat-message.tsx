import ReactMarkdown from "react-markdown";
import { Message } from "./chat";

export default function ChatMessage({ message }: { message: Message }) {
    return (
        <span
            className={`border border-solid border-blue-200 rounded-lg p-4 bg-blue-100 ${
                message.self ? "self-end" : "self-start"
            }`}
        >
            <ReactMarkdown>{message.text}</ReactMarkdown>
        </span>
    );
}
