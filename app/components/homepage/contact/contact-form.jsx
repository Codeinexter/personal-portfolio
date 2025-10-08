"use client";
import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    subject: "",
    email: "",
    message: "",
  });

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name && userInput.subject) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();
    if (!userInput.email || !userInput.message || !userInput.name || !userInput.subject) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) return;
    else setError({ ...error, required: false });

    try {
      setIsLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/contact`, userInput);
      toast.success("Message sent successfully!");
      setUserInput({ name: "", subject: "", email: "", message: "" });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto"
    >
      <h2 className="font-bold mb-4 text-[#16f2b3] text-2xl uppercase tracking-wider">
        Let's Get in Touch 👇
      </h2>

      <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-pink-500 via-[#16f2b3] to-violet-600">
        <div className="bg-[#0a1126]/80 backdrop-blur-lg rounded-2xl p-6 md:p-8 text-white shadow-2xl">
          <p className="text-sm text-[#d3d8e8] mb-5">
            Have a question or want to work together? Drop a message below 👇
          </p>

          <form onSubmit={handleSendMail} className="flex flex-col gap-5">
            {["name", "email", "subject", "message"].map((field, i) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col gap-2"
              >
                <label className="text-base font-medium capitalize tracking-wide">
                  {field === "message" ? "Your Message:" : `Your ${field}:`}
                </label>
                {field === "message" ? (
                  <textarea
                    className="bg-[#10172d]/70 border border-[#353a52] rounded-lg px-4 py-3 focus:border-[#16f2b3] focus:ring-2 focus:ring-[#16f2b3]/40 transition-all duration-300 outline-none placeholder:text-gray-400"
                    rows="3"
                    maxLength="500"
                    value={userInput.message}
                    placeholder="Write your message..."
                    onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
                    onBlur={checkRequired}
                  />
                ) : (
                  <input
                    type={field === "email" ? "email" : "text"}
                    className="bg-[#10172d]/70 border border-[#353a52] rounded-lg px-4 py-3 focus:border-[#16f2b3] focus:ring-2 focus:ring-[#16f2b3]/40 transition-all duration-300 outline-none placeholder:text-gray-400"
                    placeholder={`Enter your ${field}`}
                    maxLength="100"
                    value={userInput[field]}
                    onChange={(e) => setUserInput({ ...userInput, [field]: e.target.value })}
                    onBlur={() => {
                      checkRequired();
                      if (field === "email") {
                        setError({ ...error, email: !isValidEmail(userInput.email) });
                      }
                    }}
                  />
                )}
                {field === "email" && error.email && (
                  <p className="text-sm text-red-400">Please provide a valid email!</p>
                )}
              </motion.div>
            ))}

            {error.required && (
              <p className="text-sm text-red-400 text-center">All fields are required!</p>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              disabled={isLoading}
              type="submit"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-pink-500 via-[#16f2b3] to-violet-600 px-8 py-3 font-semibold uppercase tracking-wide text-white transition-all duration-300 shadow-lg shadow-[#16f2b3]/30 hover:shadow-[#16f2b3]/50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? "Sending..." : "Send Message"}
                {!isLoading && (
                  <TbMailForward
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    size={20}
                  />
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#16f2b3] via-pink-500 to-violet-600 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default ContactForm;
