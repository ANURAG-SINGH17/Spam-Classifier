import React, { useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [message, setMessage] = useState("");
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        {
          message: message,
        }
      );

      setPrediction(response.data.prediction);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-slate-100 to-purple-100 flex items-center justify-center px-4 py-8">

      <div className="
      w-full
      max-w-3xl
      backdrop-blur-lg
      bg-white/70
      border
      border-white/30
      shadow-2xl
      rounded-[30px]
      p-6
      sm:p-8
      ">

        {/* Header */}
        <div className="text-center">


          <h1 className="
          text-3xl
          sm:text-5xl
          font-bold
          bg-gradient-to-r
          from-indigo-600
          to-purple-600
          bg-clip-text
          text-transparent
          ">
            Spam Classifier
          </h1>

          <p className="
          mt-4
          text-sm
          sm:text-base
          text-slate-600
          ">
            Detect whether a message is Spam or Ham using
            Machine Learning and NLP
          </p>

        </div>


        {/* Input Section */}
        <div className="mt-8">

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="
            w-full
            h-36
            sm:h-44
            rounded-2xl
            border
            border-slate-300
            bg-white
            p-4
            text-sm
            sm:text-base
            outline-none
            focus:ring-4
            focus:ring-indigo-200
            transition
            resize-none
            "
          />

          <button
            onClick={handlePredict}
            disabled={loading}
            className="
            w-full
            mt-5
            py-4
            rounded-2xl
            font-semibold
            text-white
            bg-gradient-to-r
            from-indigo-600
            to-purple-600
            hover:scale-[1.02]
            active:scale-[0.98]
            transition-all
            duration-300
            disabled:opacity-50
            "
          >
            {loading ? "Predicting..." : "Predict Message"}
          </button>

        </div>


        {/* Result Section */}
        {prediction && (

          <div className="
          mt-8
          rounded-2xl
          p-6
          border
          bg-white
          shadow-md
          ">

            <h2 className="
            text-lg
            font-semibold
            text-slate-700
            mb-4
            ">
              Prediction Result
            </h2>

            <div className="flex justify-center">

              <span
                className={`
                px-6
                py-3
                rounded-full
                text-lg
                font-bold

                ${
                  prediction.toLowerCase() === "spam"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }
                `}
              >
                {prediction}
              </span>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default HomePage;