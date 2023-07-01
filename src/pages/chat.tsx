import { getServerAuthSession } from "~/server/auth";
import { type GetServerSideProps } from "next";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

export default function Chat() {
  const { data: session, status } = useSession();
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState<
    { id: number; user: string; text: string, time: string }[]
  >([
    { id: 0, user: "cyberavian", text: "hello", time: "06/30/2023, 10:00:00 PM" },
    { id: 1, user: "cyberavian", text: "welcome to the world", time: "06/30/2023, 10:00:00 PM" },
    { id: 2, user: "cyberavian", text: "test", time: "06/30/2023, 10:00:00 PM" },
    { id: 3, user: "cyberavian", text: "test", time: "06/30/2023, 10:00:00 PM" },
    { id: 4, user: "cyberavian", text: "test", time: "06/30/2023, 10:00:00 PM" },
    { id: 5, user: "cyberavian", text: "test", time: "06/30/2023, 10:00:00 PM" },
    { id: 6, user: "cyberavian", text: "test", time: "06/30/2023, 10:00:00 PM" },
    { id: 7, user: "cyberavian", text: "test", time: "06/30/2023, 10:00:00 PM" },
    { id: 8, user: "cyberavian", text: "test", time: "06/30/2023, 10:00:00 PM" },
    { id: 9, user: "cyberavian", text: "test", time: "06/30/2023, 10:00:00 PM" },
    { id: 10, user: "cyberavian", text: "test", time: "06/30/2023, 10:00:00 PM" },
    { id: 11, user: "cyberavian", text: "test", time: "06/30/2023, 10:00:00 PM" },
    { id: 12, user: "cyberavian", text: "test", time: "06/30/2023, 10:00:00 PM" },
    { id: 13, user: "cyberavian", text: "test", time: "06/30/2023, 10:00:00 PM" },
    { id: 14, user: "cyberavian", text: "test", time: "06/30/2023, 10:00:00 PM" },
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
      console.log("Top, Height: ", messageAreaRef.current.scrollTop, ", ", messageAreaRef.current.scrollHeight)
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
    currentMessages.push({ id: messageNum, user: username, text: text, time: new Date().toLocaleString() });
    setMessages(currentMessages);
    setText("");
  };

  if (status === "unauthenticated" && !username) {
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
    <main className="flex max-h-screen min-h-screen w-screen bg-white dark:bg-slate-950 dark:text-white">
      <div className="min-h-full w-[13%] bg-white dark:bg-slate-900/30">
        <div>
          <p>Address Book</p>
        </div>
      </div>
      <div className="flex min-h-full w-[87%] dark:bg-slate-900/40">
        <div className="flex min-h-full w-full flex-col">
          <div className="flex w-full justify-self-start items-center border-b border-b-slate-950">
            <h1 className="p-4 text-xl">{username}</h1>
          </div>
          <div className="mt-auto flex flex-grow flex-shrink overflow-scroll flex-col justify-end px-2 py-2">
            <ul
              className="flex flex-col w-full items-end overflow-scroll"
              ref={messageAreaRef}
            >
              {messages.map((message, index) => {
                return (
                  index === 0 || messages[index - 1]?.user !== message.user ? (
                    <div
                      key={message.id}
                      className="w-full whitespace-pre-wrap dark:hover:bg-slate-950 mt-3"
                    >
                      <p>{message.user} <span className="text-xs text-white/50">{message.time}</span></p>
                      <p>{message.text}</p>
                    </div>
                  ) : (
                    <div
                      key={message.id}
                      className="w-full whitespace-pre-wrap dark:hover:bg-slate-950"
                    >
                      <p>{message.text}</p>
                    </div>
                  ))
              })}
            </ul>
          </div>
          <div className="mt-auto flex w-full items-end gap-2 justify-self-end px-2 py-2">
            <textarea
              id="message"
              value={text}
              rows={1}
              onChange={(e) => handleChange(e)}
              onKeyDown={(e) => handleKeydown(e)}
              placeholder="Type here..."
              ref={textAreaRef}
              className="w-full max-h-56 resize-none rounded-full bg-white/10 px-4 py-2 text-black outline-none dark:text-white"
            />
            <div onClick={handleSubmit} className="flex self-center">
              <PaperAirplaneIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </main>
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