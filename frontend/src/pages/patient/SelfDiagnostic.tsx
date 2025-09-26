import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BrainIcon, StethoscopeIcon } from "../../utils/icons";
import { useAuth } from "../../contexts/AuthContext";

// Dummy doctors database
const doctorsDatabase = [
  {
    id: "doc_001",
    name: "Dr. Sarah Johnson",
    specialization: "Infectious Disease Specialist",
    expertise: ["Malaria", "Typhoid", "Tropical Diseases"],
    rating: 4.8,
    experience: "15 years",
    availability: ["Monday", "Wednesday", "Friday"],
    nextAvailable: "October 28, 2025",
    image: "👩‍⚕️"
  },
  {
    id: "doc_002", 
    name: "Dr. Michael Chen",
    specialization: "General Practitioner",
    expertise: ["General Medicine", "Fever Management", "Preventive Care"],
    rating: 4.6,
    experience: "12 years",
    availability: ["Tuesday", "Thursday", "Saturday"],
    nextAvailable: "October 27, 2025",
    image: "👨‍⚕️"
  },
  {
    id: "doc_003",
    name: "Dr. Amina Hassan",
    specialization: "Internal Medicine Specialist", 
    expertise: ["Malaria", "Typhoid", "Internal Medicine"],
    rating: 4.9,
    experience: "18 years",
    availability: ["Monday", "Tuesday", "Thursday"],
    nextAvailable: "October 29, 2025",
    image: "👩‍⚕️"
  }
];

// Chat conversation flow
const chatFlow = {
  greeting: {
    message: "Hello! I'm your AI Medical Assistant. I'll help you understand your symptoms better through a few questions. What's your name?",
    type: "text_input",
    next: "symptoms_start"
  },
  symptoms_start: {
    message: "Nice to meet you, {name}! I'm here to help you with a preliminary health assessment. Are you currently experiencing any health concerns or symptoms?",
    type: "yes_no",
    next: {yes: "main_symptom", no: "no_symptoms"}
  },
  no_symptoms: {
    message: "That's great to hear! Since you're feeling well, I recommend regular health checkups. Would you like me to help you book a routine consultation?",
    type: "yes_no",
    next: {yes: "book_routine", no: "end_healthy"}
  },
  main_symptom: {
    message: "I understand you're not feeling well. Let's start with your main concern. What is the most troubling symptom you're experiencing right now?",
    type: "symptom_selection",
    options: [
      "Fever", "Headache", "Abdominal pain", "Vomiting", "Fatigue", 
      "Cough", "Diarrhea", "Muscle pain", "Loss of appetite", "Other"
    ],
    next: "fever_check"
  },
  fever_check: {
    message: "Thank you for sharing that. Now, are you currently experiencing fever or have you had fever in the past few days?",
    type: "fever_options",
    options: ["High fever (above 38.5°C)", "Mild fever", "No fever", "Not sure"],
    next: "duration_check"
  },
  duration_check: {
    message: "How long have you been experiencing these symptoms?",
    type: "duration_options", 
    options: ["Less than 24 hours", "1-3 days", "4-7 days", "More than a week"],
    next: "additional_symptoms"
  },
  additional_symptoms: {
    message: "I need to check for additional symptoms. Please select ALL that you're currently experiencing:",
    type: "multiple_selection",
    options: [
      "Severe headache", "Nausea/Vomiting", "Stomach pain", "Back pain",
      "Chest pain", "Sweating", "Chills", "Weakness", "Constipation",
      "Sore throat", "Rash", "Joint pain"
    ],
    next: "severity_check"
  },
  severity_check: {
    message: "On a scale of 1-10, how would you rate the severity of your symptoms? (1 = very mild, 10 = extremely severe)",
    type: "severity_scale",
    next: "travel_history"
  },
  travel_history: {
    message: "Have you traveled to any malaria-endemic areas or areas with poor sanitation in the past month?",
    type: "yes_no_detail",
    next: "medication_check"
  },
  medication_check: {
    message: "Are you currently taking any medications or have you taken any medicine for these symptoms?",
    type: "yes_no_detail", 
    next: "analysis"
  },
  analysis: {
    message: "Thank you for providing all that information. Let me analyze your symptoms now...",
    type: "analysis",
    next: "results"
  }
};

interface ChatMessage {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

interface DiagnosisData {
  name: string;
  mainSymptom: string;
  fever: string;
  duration: string;
  additionalSymptoms: string[];
  severity: number;
  travelHistory: string;
  medications: string;
}

interface DiagnosisResult {
  diagnosis: string;
  confidence: number;
  diseases: string[];
  severity: string;
  requiresXray: boolean;
  recommendedDoctors: typeof doctorsDatabase;
  urgency: 'immediate' | 'urgent' | 'routine';
  recommendations: string[];
}

function SelfDiagnostic() {
  const { userData } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState("greeting");
  const [isTyping, setIsTyping] = useState(false);
  const [diagnosisData, setDiagnosisData] = useState<DiagnosisData>({
    name: "",
    mainSymptom: "",
    fever: "",
    duration: "",
    additionalSymptoms: [],
    severity: 0,
    travelHistory: "",
    medications: ""
  });
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Start conversation
    setTimeout(() => {
      addAIMessage(chatFlow.greeting.message);
    }, 1000);
  }, []);

  const addAIMessage = (content: string, nextStep?: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const message: ChatMessage = {
        id: Date.now().toString(),
        type: 'ai',
        content: content.replace('{name}', diagnosisData.name || userData?.firstName || 'there'),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, message]);
      setIsTyping(false);
      
      // Update current step only after message is fully sent
      if (nextStep) {
        setCurrentStep(nextStep);
      }
    }, 1500);
  };

  const addUserMessage = (content: string) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      type: 'user', 
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const handleUserResponse = (response: string, data?: any) => {
    addUserMessage(response);
    
    // Update diagnosis data based on current step
    const newData = { ...diagnosisData };
    
    switch (currentStep) {
      case "greeting":
        newData.name = response;
        break;
      case "main_symptom":
        newData.mainSymptom = response;
        break;
      case "fever_check":
        newData.fever = response;
        break;
      case "duration_check":
        newData.duration = response;
        break;
      case "additional_symptoms":
        newData.additionalSymptoms = data || [];
        break;
      case "severity_check":
        newData.severity = parseInt(response);
        break;
      case "travel_history":
        newData.travelHistory = response;
        break;
      case "medication_check":
        newData.medications = response;
        break;
    }
    
    setDiagnosisData(newData);
    
    // Navigate to next step
    const flow = chatFlow[currentStep as keyof typeof chatFlow];
    let nextStep = "";
    
    if (typeof flow.next === 'string') {
      nextStep = flow.next;
    } else if (typeof flow.next === 'object') {
      const response_key = response.toLowerCase().includes('yes') ? 'yes' : 'no';
      nextStep = (flow.next as any)[response_key];
    }
    
    if (nextStep === "analysis") {
      setTimeout(() => {
        runDiagnosis(newData);
      }, 2000);
    } else if (nextStep && chatFlow[nextStep as keyof typeof chatFlow]) {
      // Send AI message and update step only after typing is complete
      setTimeout(() => {
        addAIMessage(chatFlow[nextStep as keyof typeof chatFlow].message, nextStep);
      }, 2000);
    }
  };

  const runDiagnosis = (data: DiagnosisData) => {
    setIsTyping(true);
    
    setTimeout(() => {
      // Rule-based diagnosis logic
      let malariaScore = 0;
      let typhoidScore = 0;
      
      // Main symptom scoring
      if (data.mainSymptom.toLowerCase().includes('fever')) malariaScore += 3, typhoidScore += 3;
      if (data.mainSymptom.toLowerCase().includes('headache')) malariaScore += 3, typhoidScore += 3;
      if (data.mainSymptom.toLowerCase().includes('abdominal')) malariaScore += 4, typhoidScore += 4;
      if (data.mainSymptom.toLowerCase().includes('vomiting')) malariaScore += 4;
      
      // Fever scoring
      if (data.fever.includes('High fever')) malariaScore += 4, typhoidScore += 4;
      if (data.fever.includes('Mild fever')) malariaScore += 2, typhoidScore += 2;
      
      // Duration scoring
      if (data.duration.includes('More than a week')) malariaScore += 2, typhoidScore += 3;
      if (data.duration.includes('4-7 days')) malariaScore += 3, typhoidScore += 2;
      
      // Additional symptoms
      data.additionalSymptoms.forEach(symptom => {
        if (symptom.toLowerCase().includes('headache')) malariaScore += 3, typhoidScore += 3;
        if (symptom.toLowerCase().includes('nausea') || symptom.toLowerCase().includes('vomiting')) malariaScore += 4;
        if (symptom.toLowerCase().includes('stomach') || symptom.toLowerCase().includes('abdominal')) malariaScore += 4, typhoidScore += 4;
        if (symptom.toLowerCase().includes('weakness')) typhoidScore += 2;
        if (symptom.toLowerCase().includes('muscle') || symptom.toLowerCase().includes('joint')) malariaScore += 2;
        if (symptom.toLowerCase().includes('rash')) malariaScore += 1, typhoidScore += 1;
      });
      
      // Severity multiplier
      const severityMultiplier = data.severity / 10;
      malariaScore = Math.round(malariaScore * (1 + severityMultiplier));
      typhoidScore = Math.round(typhoidScore * (1 + severityMultiplier));
      
      // Travel history boost
      if (data.travelHistory.toLowerCase().includes('yes')) {
        malariaScore += 3;
        typhoidScore += 2;
      }
      
      // Generate diagnosis
      let diagnosis = "";
      let diseases: string[] = [];
      let confidence = 0;
      let severity = "";
      let urgency: 'immediate' | 'urgent' | 'routine' = 'routine';
      let requiresXray = false;
      
      if (malariaScore >= 10 && typhoidScore >= 10) {
        diagnosis = "High probability of Malaria and Typhoid co-infection";
        diseases = ["Malaria", "Typhoid"];
        confidence = Math.min(95, Math.max(malariaScore, typhoidScore) * 8);
        severity = "Critical";
        urgency = "immediate";
        requiresXray = true;
      } else if (malariaScore >= 8) {
        diagnosis = "High probability of Malaria";
        diseases = ["Malaria"];
        confidence = Math.min(90, malariaScore * 10);
        severity = malariaScore >= 12 ? "Severe" : "Moderate";
        urgency = malariaScore >= 12 ? "immediate" : "urgent";
        requiresXray = malariaScore >= 12;
      } else if (typhoidScore >= 8) {
        diagnosis = "High probability of Typhoid Fever";
        diseases = ["Typhoid"];
        confidence = Math.min(90, typhoidScore * 10);
        severity = typhoidScore >= 12 ? "Severe" : "Moderate";
        urgency = typhoidScore >= 12 ? "immediate" : "urgent";
        requiresXray = typhoidScore >= 12;
      } else if (malariaScore >= 5 || typhoidScore >= 5) {
        const primary = malariaScore > typhoidScore ? "Malaria" : "Typhoid";
        diagnosis = `Possible ${primary} infection`;
        diseases = [primary];
        confidence = Math.min(75, Math.max(malariaScore, typhoidScore) * 12);
        severity = "Mild to Moderate";
        urgency = "urgent";
      } else {
        diagnosis = "Symptoms suggest viral infection or other condition";
        diseases = [];
        confidence = 30;
        severity = "Mild";
        urgency = "routine";
      }
      
      // Select appropriate doctors
      const recommendedDoctors = doctorsDatabase.filter(doctor => {
        if (diseases.length === 0) return doctor.specialization === "General Practitioner";
        return diseases.some(disease => doctor.expertise.includes(disease));
      }).slice(0, 2);
      
      // Generate recommendations
      const recommendations = [];
      if (urgency === "immediate") {
        recommendations.push("🚨 Seek immediate medical attention");
        recommendations.push("🏥 Consider emergency room visit if symptoms worsen");
      }
      if (requiresXray) {
        recommendations.push("📋 Chest X-ray recommended");
      }
      recommendations.push("💊 Do not self-medicate without doctor consultation");
      recommendations.push("💧 Stay well hydrated and rest");
      recommendations.push("🌡️ Monitor temperature regularly");
      
      const result: DiagnosisResult = {
        diagnosis,
        confidence,
        diseases,
        severity,
        requiresXray,
        recommendedDoctors,
        urgency,
        recommendations
      };
      
      setDiagnosisResult(result);
      setIsTyping(false);
      
      // Show final message
      const finalMessage = `Based on our conversation, here's my assessment: ${diagnosis} with ${confidence}% confidence. I've prepared detailed results and doctor recommendations for you.`;
      addAIMessage(finalMessage);
      
      setTimeout(() => {
        setShowResults(true);
      }, 3000);
      
    }, 4000);
  };

  const getCurrentOptions = (): string[] => {
    const flow = chatFlow[currentStep as keyof typeof chatFlow];
    if (!flow || !('options' in flow)) return [];
    return flow.options || [];
  };

  const handleOptionClick = (option: string) => {
    if (currentStep === "additional_symptoms") {
      // Handle multiple selection
      const currentSelections = diagnosisData.additionalSymptoms;
      const newSelections = currentSelections.includes(option)
        ? currentSelections.filter(s => s !== option)
        : [...currentSelections, option];
      
      setDiagnosisData(prev => ({ ...prev, additionalSymptoms: newSelections }));
      return;
    }
    
    handleUserResponse(option);
  };

  const handleTextSubmit = (text: string) => {
    if (text.trim()) {
      handleUserResponse(text.trim());
    }
  };

  const handleMultipleSubmit = () => {
    const selected = diagnosisData.additionalSymptoms;
    const response = selected.length > 0 ? selected.join(", ") : "None of the above";
    handleUserResponse(response, selected);
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentStep("greeting");
    setDiagnosisData({
      name: "",
      mainSymptom: "",
      fever: "",
      duration: "",
      additionalSymptoms: [],
      severity: 0,
      travelHistory: "",
      medications: ""
    });
    setDiagnosisResult(null);
    setShowResults(false);
    
    setTimeout(() => {
      addAIMessage(chatFlow.greeting.message);
    }, 1000);
  };

  const renderChatInput = () => {
    const flow = chatFlow[currentStep as keyof typeof chatFlow];
    if (!flow || showResults || isTyping) return null;

    if (flow.type === "text_input") {
      return (
        <div className="flex space-x-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="Type your response..."
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleTextSubmit((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
        </div>
      );
    }

    if (flow.type === "yes_no" || flow.type === "yes_no_detail") {
      return (
        <div className="flex space-x-3">
          <button
            onClick={() => handleUserResponse("Yes")}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Yes
          </button>
          <button
            onClick={() => handleUserResponse("No")}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            No
          </button>
        </div>
      );
    }

    if (flow.type === "severity_scale") {
      return (
        <div className="grid grid-cols-5 gap-2">
          {[1,2,3,4,5,6,7,8,9,10].map(num => (
            <button
              key={num}
              onClick={() => handleUserResponse(num.toString())}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-cyan-50 hover:border-cyan-300 transition-colors text-sm"
            >
              {num}
            </button>
          ))}
        </div>
      );
    }

    if (flow.type === "multiple_selection") {
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {getCurrentOptions().map((option: string) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                  diagnosisData.additionalSymptoms.includes(option)
                    ? 'bg-cyan-100 border-cyan-300 text-cyan-800'
                    : 'bg-white border-gray-300 hover:border-gray-400'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={handleMultipleSubmit}
            className="w-full px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Continue with selected symptoms
          </button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-2">
        {getCurrentOptions().map((option: string) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            className="px-4 py-2 text-left bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            {option}
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mb-4">
              <BrainIcon />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              AI Medical Assistant
            </h1>
            <p className="text-slate-600">
              Chat with our AI for personalized health assessment
            </p>
          </div>

          {!showResults ? (
            <div className="max-w-4xl mx-auto">
              {/* Chat Header with New Chat Button */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-800">Medical Consultation</h2>
                  <p className="text-sm text-slate-600">Messages: {messages.length}</p>
                </div>
                <button
                  onClick={resetChat}
                  className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors duration-200 border border-slate-300"
                  title="Start a new conversation"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-sm font-medium">New Chat</span>
                </button>
              </div>

              {/* Chat Messages */}
              <div className="bg-white rounded-xl shadow-lg mb-6 h-96 overflow-y-auto p-6">
                <div className="space-y-4">
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-cyan-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {message.type === 'ai' && (
                          <div className="flex items-center mb-1">
                            <span className="text-sm">🤖 AI Doctor</span>
                          </div>
                        )}
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 px-4 py-2 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                {renderChatInput()}
              </div>
            </div>
          ) : (
            /* Results Section */
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Diagnosis Results */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-cyan-100 rounded-full mb-4">
                    <StethoscopeIcon />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-800">Diagnosis Complete</h2>
                </div>

                {diagnosisResult && (
                  <>
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div className="text-center p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm font-semibold text-slate-500 mb-2">DIAGNOSIS</p>
                        <p className="text-lg font-bold text-slate-800">{diagnosisResult.diagnosis}</p>
                      </div>
                      <div className="text-center p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm font-semibold text-slate-500 mb-2">CONFIDENCE</p>
                        <p className={`text-lg font-bold ${
                          diagnosisResult.confidence >= 80 ? 'text-red-600' :
                          diagnosisResult.confidence >= 60 ? 'text-orange-600' :
                          diagnosisResult.confidence >= 40 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {diagnosisResult.confidence}%
                        </p>
                      </div>
                      <div className="text-center p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm font-semibold text-slate-500 mb-2">URGENCY</p>
                        <p className={`text-lg font-bold ${
                          diagnosisResult.urgency === 'immediate' ? 'text-red-600' :
                          diagnosisResult.urgency === 'urgent' ? 'text-orange-600' : 'text-green-600'
                        }`}>
                          {diagnosisResult.urgency.toUpperCase()}
                        </p>
                      </div>
                    </div>

                    {/* Recommended Doctors */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                        <span className="bg-blue-100 p-2 rounded-lg mr-3">👨‍⚕️</span>
                        Recommended Doctors
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {diagnosisResult.recommendedDoctors.map(doctor => (
                          <div key={doctor.id} className="border border-slate-200 rounded-lg p-6">
                            <div className="flex items-start space-x-4">
                              <div className="text-4xl">{doctor.image}</div>
                              <div className="flex-1">
                                <h4 className="text-xl font-bold text-slate-800">{doctor.name}</h4>
                                <p className="text-slate-600">{doctor.specialization}</p>
                                <p className="text-sm text-slate-500">{doctor.experience} experience</p>
                                <div className="flex items-center mt-2">
                                  <span className="text-yellow-500">⭐</span>
                                  <span className="text-slate-600 ml-1">{doctor.rating}</span>
                                </div>
                                <p className="text-sm text-green-600 mt-2">
                                  Next available: {doctor.nextAvailable}
                                </p>
                                <Link
                                  to="/book-appointment"
                                  state={{ doctorId: doctor.id, doctorName: doctor.name }}
                                  className="inline-block mt-3 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors text-sm"
                                >
                                  Book Appointment
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-blue-50 rounded-lg p-6 mb-6">
                      <h3 className="text-xl font-bold text-slate-800 mb-4">Medical Recommendations</h3>
                      <ul className="space-y-2">
                        {diagnosisResult.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start text-slate-700">
                            <span className="text-lg mr-2">{rec.split(' ')[0]}</span>
                            <span>{rec.substring(rec.indexOf(' ') + 1)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {/* Action Buttons */}
                <div className="text-center space-x-4">
                  <button
                    onClick={resetChat}
                    className="bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    Start New Assessment
                  </button>
                  <Link
                    to="/book-appointment"
                    className="bg-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-cyan-700 transition-colors inline-block"
                  >
                    Book Appointment Now
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SelfDiagnostic;