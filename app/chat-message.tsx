import ReactMarkdown from "react-markdown";
import { Message } from "./chat";

export default function ChatMessage({ message }: { message: Message }) {
    return (
        <span
            className={` rounded-lg p-4  ${
                message.self
                    ? "self-end bg-green-100"
                    : "self-start bg-blue-100"
            }`}
        >
            <ReactMarkdown>{message.text}</ReactMarkdown>
        </span>
    );
}
