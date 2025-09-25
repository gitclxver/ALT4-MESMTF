import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

import { useState, useEffect } from "react";
import { CodeIcon } from "../utils/icons";

const carouselItems = [
  {
    icon: <CodeIcon />,
    title: "AI-Powered Self Diagnosis",
    description:
      "Utilize Our AI Doctor to Self-Diagnose Symptoms of Malaria and Typhoid Fever with High Accuracy.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-cyan-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Book Appointments",
    description:
      "Easily Schedule Appointments with Healthcare Professionals & Specialists at Your Convenience.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-cyan-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
    title: "Medication Management",
    description:
      "Access a Comprehensive Pharmacy Section to Manage and Order Medications Efficiently.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-cyan-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        />
        <polyline
          points="14 2 14 8 20 8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="12"
          y1="11"
          x2="12"
          y2="17"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="9"
          y1="14"
          x2="15"
          y2="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Health Records",
    description:
      "Maintain and Access Your Personal Health Records Securely Anytime, Anywhere.",
  },
];
function Landing() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <section className="bg-slate-50 flex items-center min-h-[87vh]">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center px-4 py-16 lg:py-24">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 leading-tight">
              <span>Pioneering Health Intelligence for </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">
                Namibia
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
              An AI-powered Expert System for the Diagnosis and Management of
              Malaria and Typhoid Fever, empowering the Ministry of Health and
              Social Services.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/diagnostic"
                className="bg-cyan-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-cyan-700 transition-transform transform hover:-translate-y-1"
              >
                Self Diagnose Now
              </Link>
              <a
                href="#about"
                className="bg-white text-cyan-600 font-semibold py-3 px-8 rounded-lg border border-slate-300 hover:bg-slate-100 transition-transform transform hover:-translate-y-1"
              >
                Learn More
              </a>
              
            </div>
          </div>

          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              How Our System Works
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              A simple, three-step process to manage your health online.
            </p>

            <div className="mt-12 max-w-3xl mx-auto bg-white rounded-xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {carouselItems.map((slide, index) => (
                    <div key={index} className="flex-shrink-0 w-full">
                      <div className="flex flex-col items-center px-8">
                        <div className="bg-cyan-100 p-4 rounded-full mb-6">
                          {slide.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 text-center">
                          {slide.title}
                        </h3>
                        <p className="mt-2 text-slate-600 text-center max-w-md">
                          {slide.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Landing;
