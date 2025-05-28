import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTelegramPlane, FaTimes, FaPaperPlane } from "react-icons/fa";

const supportMessages = [
  { text: "Здравствуйте! Чем помочь?", from: "support" },
  { text: "Оформить возврат или задать вопрос — пишите сюда!", from: "support" }
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(supportMessages);
  const [input, setInput] = useState("");
  const ref = useRef();

  useEffect(() => {
    if (open && ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [open, messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, from: "user" }]);
    setTimeout(() => {
      setMessages(msgs => [...msgs, { text: "Ожидайте ответа оператора 👨‍💻", from: "support" }]);
    }, 900);
    setInput("");
  };

  return (
    <>
      <motion.button
        className="fixed bottom-24 right-4 z-50 bg-accent2 text-mainbg shadow-glow rounded-full w-16 h-16 flex items-center justify-center text-3xl border-accent2 border-2"
        onClick={() => setOpen(true)}
        whileTap={{ scale: 0.93 }}
      >
        <FaTelegramPlane />
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-5 right-5 w-80 h-96 bg-cardbg border-2 border-accent2 rounded-3xl shadow-glow flex flex-col z-[100]"
            initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 70 }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b-2 border-accent2 bg-accent2/10 rounded-t-3xl">
              <span className="font-bold text-accent2">Поддержка</span>
              <button className="text-xl text-pink" onClick={() => setOpen(false)}><FaTimes /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4" ref={ref}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`mb-2 flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`px-4 py-2 rounded-2xl shadow-glow max-w-[70%]
                    ${msg.from === "user" ? "bg-accent text-mainbg" : "bg-darkglow text-accent2"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <form className="flex gap-2 px-3 py-3" onSubmit={e => { e.preventDefault(); send(); }}>
              <input
                className="flex-1 bg-darkglow text-accent2 px-4 py-2 rounded-xl border border-accent2 outline-none"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Введите сообщение..."
              />
              <button type="submit" className="bg-accent2 text-mainbg px-4 py-2 rounded-xl font-bold shadow-glow">
                <FaPaperPlane />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
