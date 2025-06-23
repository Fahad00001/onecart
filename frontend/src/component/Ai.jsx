import React, { useContext, useEffect, useState } from "react";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Ai = () => {
  const { showSearch, setShowSearch } = useContext(shopDataContext);
  const navigate = useNavigate();
  const [activeAi, setActiveAi] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("❌ Speech Recognition not supported in this browser");
      return;
    }

    const recog = new SpeechRecognition();
    recog.continuous = false;
    recog.interimResults = false;
    recog.lang = "en-US";

    recog.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim().toLowerCase();

      const speak = (message) => {
        const utterance = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(utterance);
      };

      if (transcript.includes("search") && transcript.includes("open")) {
        if (!showSearch) {
          speak("Opening search bar");
          setShowSearch(true);
          navigate("/collection");
        }
      } else if (transcript.includes("close search")) {
        if (showSearch) {
          speak("Closing search bar");
          setShowSearch(false);
        }
      } else if (
        transcript.includes("collection") ||
        transcript.includes("product")
      ) {
        speak("Opening collection page");
        navigate("/collection");
        setShowSearch(false);
      } else if (transcript.includes("about")) {
        speak("Opening about page");
        navigate("/about");
        setShowSearch(false);
      } else if (transcript.includes("home")) {
        speak("Opening home page");
        navigate("/");
        setShowSearch(false);
      } else if (
        transcript.includes("cart") ||
        transcript.includes("kaat") ||
        transcript.includes("caat")
      ) {
        speak("Opening cart");
        navigate("/cart");
        setShowSearch(false);
      } else if (transcript.includes("contact")) {
        speak("Opening contact page");
        navigate("/contact");
        setShowSearch(false);
      } else if (
        transcript.includes("order") ||
        transcript.includes("my orders") ||
        transcript.includes("myorder")
      ) {
        speak("Opening order page");
        navigate("/order");
        setShowSearch(false);
      } else {
        toast.error("❌ I don't understand");
      }
    };

    recog.onstart = () => setActiveAi(true);
    recog.onend = () => setActiveAi(false);

    setRecognition(recog);
  }, [navigate, setShowSearch, showSearch]);

  const startListening = () => {
    if (recognition) recognition.start();
  };

  return (
    <div
      className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]"
      onClick={startListening}
    >
      <img
        src="https://img.freepik.com/vektoren-kostenlos/graident-ai-robot-vectorart_78370-4114.jpg"
        alt="AI Assistant"
        className={`w-[100px] cursor-pointer rounded-full transition-transform duration-300 ${
          activeAi
            ? "translate-y-[-20px] scale-110 brightness-110"
            : "scale-100"
        } shadow-[0_0_25px_#38bdf8]`}
        // Optional: add inline style for even stronger glow
        style={{
          boxShadow: activeAi
            ? "0 0 30px 10px rgba(56, 189, 248, 0.8)"
            : "0 0 10px rgba(56, 189, 248, 0.4)",
        }}
      />
    </div>
  );
};

export default Ai;
