import { getServerAuthSession } from "~/server/auth";
import { type GetServerSideProps } from "next";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

export default function Chat() {
  const { data: session } = useSession();
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState<
    { id: number; user: string; text: string }[]
  >([
    { id: 0, user: "cyberavian", text: "hello" },
    { id: 1, user: "cyberavian", text: "welcome to the world" },
    { id: 2, user: "cyberavian", text: "test" },
    { id: 3, user: "cyberavian", text: "test" },
    { id: 4, user: "cyberavian", text: "test" },
    { id: 5, user: "cyberavian", text: "test" },
    { id: 6, user: "cyberavian", text: "test" },
    { id: 7, user: "cyberavian", text: "test" },
    { id: 8, user: "cyberavian", text: "test" },
    { id: 9, user: "cyberavian", text: "test" },
    { id: 10, user: "cyberavian", text: "test" },
    { id: 11, user: "cyberavian", text: "test" },
    { id: 12, user: "cyberavian", text: "test" },
    { id: 13, user: "cyberavian", text: "test" },
    { id: 14, user: "cyberavian", text: "test" },
  ]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const messageAreaRef = useRef<HTMLUListElement>(null);

  useAutosizeTextArea(textAreaRef.current, text);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  });

  useEffect(() => {
    if (session && session.user.name && !username) {
      setUsername(session.user.name);
    }
  }, [session, username]);

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleUserInput = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setUserInput(input);
  };

  const handleSetUsername = () => {
    setUsername(userInput);
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const mes = event.target.value;
    setText(mes);
  };

  const handleKeydown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    } else if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      let newText = text;
      newText += "\n";
      setText(newText);
    }
  }

  const handleSubmit = () => {
    if (!text.trim()) {return;}
    console.log(text);
    const currentMessages = [...messages];
    const messageNum = currentMessages.length;
    currentMessages.push({ id: messageNum, user: "cyberavian", text: text });
    setMessages(currentMessages);
    setText("");
  };

  if (!session && !username) {
    return (
      <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-5 bg-white bg-gradient-to-b pt-20 dark:from-slate-800 dark:to-slate-950 dark:text-white">
        <h1 className="text-5xl font-extrabold text-pink-400">Access Denied</h1>
        <p className="text-xl">To access chat:</p>
        <div className="flex flex-col gap-5 text-lg border px-4 py-6 rounded-xl dark:border-slate-800 dark:bg-slate-700">
          <div className="flex flex-col items-center gap-5">
            <p>Create a username to connect anonymously</p>
            <div className="flex flex-col">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="rounded-xl p-1 text-black"
                onChange={(e) => handleUserInput(e)}
                value={userInput}
              />
            </div>
            <button
              className="rounded-full border px-4 py-2 dark:border-sky-700 dark:bg-sky-600"
              onClick={() => handleSetUsername()}
            >
              Submit
            </button>
          </div>
          <div className="flex items-center justify-center text-xl">
            <div className="w-1/3 border" />
            <span className="px-3">OR</span>
            <div className="w-1/3 border" />
          </div>
          <div className="flex flex-col items-center gap-3">
            <p>Sign into an account</p>
            <button
              className="rounded-full border px-4 py-2 dark:border-sky-700 dark:bg-sky-600"
              onClick={() => void signIn()}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex max-h-screen min-h-screen w-screen bg-white bg-gradient-to-b pt-16 dark:from-slate-800 dark:to-slate-950 dark:text-white">
      <div className="flex w-full flex-col">
        <div className="h-[5%] w-full justify-self-start text-center">
          <h1 className="p-2 text-xl">Chatroom as {username}</h1>
        </div>
        <div className="mt-auto flex h-[85%] flex-col items-end px-2 py-2">
          <ul
            className="flex flex-col items-end gap-2 overflow-scroll"
            ref={messageAreaRef}
          >
            {messages.map((message) => {
              return (
                <div
                  key={message.id}
                  className="rounded-l-3xl rounded-r-lg border px-2 py-1 text-center whitespace-pre-wrap dark:border-pink-800 dark:bg-pink-700"
                >
                  {message.text}
                </div>
              );
            })}
          </ul>
        </div>
        <div className="mt-auto flex w-full items-center gap-2 justify-self-end px-2 py-2">
          <textarea
            id="message"
            value={text}
            rows={1}
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => handleKeydown(e)}
            placeholder="Type here..."
            ref={textAreaRef}
            className="max-h-36 w-full resize-none overflow-hidden rounded-full bg-white/10 px-4 py-2 text-black outline-none dark:text-white"
          />
          <div onClick={handleSubmit} className="flex items-center">
            <PaperAirplaneIcon className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
}

export const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  message: string
) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;

      textAreaRef.style.height = scrollHeight.toString() + "px";
      if (scrollHeight > 40) {
        textAreaRef.style.borderRadius = "0.75rem";
      } else {
        textAreaRef.style.borderRadius = "9999px";
      }
    }
  }, [textAreaRef, message]);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  return {
    props: { session },
  };
};
