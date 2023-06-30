import { getServerAuthSession } from "~/server/auth";
import { type GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { type ChangeEvent } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

export default function Chat() {
  const { data: session } = useSession();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<{id: number,user: string,text: string}[]>([
    {id:  0, user: "cyberavian", text: "hello"},
    {id:  1, user: "cyberavian", text: "welcome to the world"},
    {id:  2, user: "cyberavian", text: "test"},
    {id:  3, user: "cyberavian", text: "test"},
    {id:  4, user: "cyberavian", text: "test"},
    {id:  5, user: "cyberavian", text: "test"},
    {id:  6, user: "cyberavian", text: "test"},
    {id:  7, user: "cyberavian", text: "test"},
    {id:  8, user: "cyberavian", text: "test"},
    {id:  9, user: "cyberavian", text: "test"},
    {id: 10, user: "cyberavian", text: "test"},
    {id: 11, user: "cyberavian", text: "test"},
    {id: 12, user: "cyberavian", text: "test"},
    {id: 13, user: "cyberavian", text: "test"},
    {id: 14, user: "cyberavian", text: "test"},
  ]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const messageAreaRef = useRef<HTMLUListElement>(null);

  useAutosizeTextArea(textAreaRef.current, text);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  })

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const mes = event.target.value;
    setText(mes);
  };

  const handleSubmit = () => {
    const currentMessages = [...messages];
    const messageNum = currentMessages.length;
    currentMessages.push({id: messageNum, user: "cyberavian", text: text});
    setMessages(currentMessages);
    setText("");
  };

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-white bg-gradient-to-b pt-20 dark:from-slate-800 dark:to-slate-950 dark:text-white">
        <h1 className="text-5xl font-extrabold text-pink-400">Access Denied</h1>
        <p>
          To access chat, please <b>sign in</b>.
        </p>
      </div>
    );
  }

  return (
    <div className="flex max-h-screen min-h-screen w-screen bg-white pt-16 bg-gradient-to-b dark:from-slate-800 dark:to-slate-950 dark:text-white">
      <div className="flex w-full flex-col">
        <div className="h-[5%] w-full justify-self-start text-center">
          <h1 className="p-2 text-xl">Chatroom</h1>
        </div>
        <div className="mt-auto flex h-[85%] flex-col items-end px-2 py-2">
          <ul
            className="flex flex-col items-end gap-2 overflow-scroll"
            ref={messageAreaRef}
          >
            {messages.map((message) => {
              return (
                <li
                  key={message.id}
                  className="h-fit w-fit rounded-full border px-2 py-1 text-center dark:border-pink-800 dark:bg-pink-700"
                >
                  {message.text}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-auto flex h-[10%] w-full gap-2 justify-self-end items-center px-2 py-2">
          <textarea
            id="message"
            value={text}
            rows={1}
            onChange={(e) => handleChange(e)}
            placeholder="Type here..."
            ref={textAreaRef}
            className="max-h-36 self-end w-full resize-none overflow-hidden rounded-full px-4 py-2 bg-white/10 text-black outline-none dark:text-white"
          />
          <div onClick={handleSubmit} className="flex h-full items-center">
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
