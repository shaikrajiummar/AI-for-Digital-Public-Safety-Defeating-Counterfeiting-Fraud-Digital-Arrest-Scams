import React, { useState } from 'react';
import { 
  HelpCircle, MessageSquare, 
  Copy, Check, Languages, ArrowRight 
} from 'lucide-react';
import { languageDict } from '../data/mockData';

export default function CitizenFraudShield() {
  const [selectedLang, setSelectedLang] = useState('English');
  const [currentStep, setCurrentStep] = useState('start'); // 'start', 'q1', 'q2', 'q3', 'verdict'
  const [answers, setAnswers] = useState({ q1: null, q2: null, q3: null });
  const [customNum, setCustomNum] = useState("+91 99881 20431");
  const [copied, setCopied] = useState(false);

  const lang = languageDict[selectedLang];

  const handleOption = (option) => {
    if (option === 'call') {
      setCurrentStep('q1');
    } else {
      // payment option: jump to q3 direct
      setCurrentStep('q3');
    }
  };

  const handleAnswer = (qKey, value) => {
    const updated = { ...answers, [qKey]: value };
    setAnswers(updated);
    
    if (qKey === 'q1') {
      setCurrentStep('q2');
    } else if (qKey === 'q2') {
      setCurrentStep('q3');
    } else if (qKey === 'q3') {
      setCurrentStep('verdict');
    }
  };

  const resetChat = () => {
    setAnswers({ q1: null, q2: null, q3: null });
    setCurrentStep('start');
    setCopied(false);
  };

  // Evaluate risk level
  const evaluateRisk = () => {
    // If they answer yes to any major scam trigger, risk is critical
    const yesCount = Object.values(answers).filter(val => val === true).length;
    if (yesCount >= 2) return { level: 'Critical', score: 98, text: lang.verdictScam };
    if (yesCount === 1) return { level: 'Medium', score: 55, text: "Suspicious Activity. The caller exhibits key markers of a courier/banking scam. Do not transfer funds. Confirm caller identity with local authorities." };
    return { level: 'Low', score: 10, text: lang.verdictSafe };
  };

  const riskResult = evaluateRisk();

  // Generate NCRB Draft letter text
  const generateDraft = () => {
    const header = selectedLang === 'Hindi' ? 'शिकायत का प्रारूप (राष्ट्रीय साइबर अपराध पोर्टल के लिए):' : 'FIR Complaint Draft (For National Cyber Crime Portal):';
    
    const body = selectedLang === 'Hindi' 
      ? `महोदय, मैं यह शिकायत एक संदिग्ध 'डिजिटल अरेस्ट' कॉल के संबंध में दर्ज कर रहा हूँ। मुझे मोबाइल नंबर ${customNum} से एक कॉल प्राप्त हुई। कॉल करने वाले ने खुद को सीबीआई/कस्टम्स अधिकारी संजय पाटिल बताया। उसने दावा किया कि मेरे आधार नंबर पर मुंबई हवाई अड्डे पर नशीले पदार्थों वाला एक अवैध पार्सल जब्त किया गया है। उसने मुझे डराया, स्काइप वीडियो कॉल पर बने रहने के लिए मजबूर किया और पैसे ट्रांसफर करने की मांग की। कृपया इस नंबर और बैंक खाते के खिलाफ उचित कानूनी कार्रवाई करें।`
      : `Dear Officer, I am filing this report regarding a fraudulent 'Digital Arrest' scam call. I received a phone call from mobile number ${customNum}. The caller impersonated a Customs/CBI officer, claiming that an illegal parcel containing MDMA was intercepted at Mumbai airport linked to my Aadhaar card. I was placed under a fake digital arrest via a video call and ordered to keep my camera on. The caller pressured me to transfer funds to a clearance account. Please register a complaint against this number.`;

    return `${header}\n\n${body}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateDraft());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6" id="citizen-shield-panel">
      
      {/* Header with Language Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-black font-outfit text-gov-navy tracking-tight">Citizen Safety Shield</h2>
          <p className="text-xs text-slate-500 font-medium">Interactive risk assessment diagnosing call and courier scams. Available in regional languages.</p>
        </div>

        {/* Language switch bar */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <Languages size={13} className="text-slate-500 ml-1.5 shrink-0" />
          <div className="flex gap-1 overflow-x-auto text-[10px] font-bold">
            {['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali'].map(l => (
              <button
                key={l}
                onClick={() => setSelectedLang(l)}
                className={`px-2.5 py-1 rounded transition-all ${
                  selectedLang === l 
                    ? 'bg-gov-navy text-white shadow-sm' 
                    : 'text-slate-600 hover:text-gov-navy hover:bg-slate-200'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: WhatsApp-style Conversational UI */}
        <div className="lg:col-span-2 card-flat flex flex-col justify-between h-[490px] overflow-hidden bg-[#ECE5DD] border-slate-350">
          
          {/* WhatsApp Header bar */}
          <div className="bg-[#075E54] text-white p-3 flex justify-between items-center z-10 shadow-sm shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <HelpCircle size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-xs font-bold font-outfit">Citizen Guard Shield</h3>
                <span className="text-[9px] text-teal-100 block mt-0.2">National Cybercrime Assistant</span>
              </div>
            </div>
            <button 
              onClick={resetChat}
              className="text-[9px] bg-white/10 hover:bg-white/20 border border-white/20 px-2 py-1 rounded font-bold transition-all uppercase"
            >
              Reset Chat
            </button>
          </div>

          {/* Conversation Bubble body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs">
            
            {/* System welcome bubble */}
            <div className="flex flex-col items-start max-w-[85%]">
              <span className="text-[8px] text-slate-500 font-bold uppercase mb-0.5">Guard AI</span>
              <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-sm text-slate-800 leading-relaxed">
                {lang.welcome}
              </div>
            </div>

            {/* Step 1 Options */}
            {currentStep === 'start' && (
              <div className="flex flex-col gap-2 pt-2 items-start max-w-[85%] pl-2">
                <button
                  onClick={() => handleOption('call')}
                  className="bg-gov-navy text-white text-[11px] font-bold py-2 px-3.5 rounded-lg shadow-sm hover:bg-gov-blue transition-all flex items-center gap-1.5"
                >
                  {lang.option1}
                  <ArrowRight size={12} />
                </button>
                <button
                  onClick={() => handleOption('pay')}
                  className="bg-gov-navy text-white text-[11px] font-bold py-2 px-3.5 rounded-lg shadow-sm hover:bg-gov-blue transition-all flex items-center gap-1.5"
                >
                  {lang.option2}
                  <ArrowRight size={12} />
                </button>
              </div>
            )}

            {/* Q1 Bubble */}
            {answers.q1 !== null && (
              <div className="flex flex-col items-end max-w-[85%] ml-auto">
                <span className="text-[8px] text-slate-500 font-bold uppercase mb-0.5">You</span>
                <div className="p-3 rounded-lg bg-[#DCF8C6] border border-emerald-250 shadow-sm text-slate-800 font-semibold">
                  {lang.option1}
                </div>
              </div>
            )}

            {/* Q1 Bot Check */}
            {currentStep !== 'start' && (
              <div className="flex flex-col items-start max-w-[85%]">
                <span className="text-[8px] text-slate-500 font-bold uppercase mb-0.5">Guard AI</span>
                <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-sm text-slate-800">
                  {lang.question1}
                </div>
                {answers.q1 === null && (
                  <div className="flex gap-2 mt-2 pl-2">
                    <button 
                      onClick={() => handleAnswer('q1', true)}
                      className="bg-gov-navy hover:bg-gov-blue text-white font-bold py-1 px-3 rounded text-[11px]"
                    >
                      Yes
                    </button>
                    <button 
                      onClick={() => handleAnswer('q1', false)}
                      className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-1 px-3 rounded text-[11px]"
                    >
                      No
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Q1 User answer bubble */}
            {answers.q1 !== null && (
              <div className="flex flex-col items-end max-w-[85%] ml-auto">
                <span className="text-[8px] text-slate-500 font-bold uppercase mb-0.5">You</span>
                <div className="p-3 rounded-lg bg-[#DCF8C6] border border-emerald-250 shadow-sm text-slate-800 font-semibold">
                  {answers.q1 ? 'Yes, they claimed parcel intercepted' : 'No parcel claims'}
                </div>
              </div>
            )}

            {/* Q2 Bot Check */}
            {answers.q1 !== null && (
              <div className="flex flex-col items-start max-w-[85%]">
                <span className="text-[8px] text-slate-500 font-bold uppercase mb-0.5">Guard AI</span>
                <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-sm text-slate-800">
                  {lang.question2}
                </div>
                {answers.q2 === null && (
                  <div className="flex gap-2 mt-2 pl-2">
                    <button 
                      onClick={() => handleAnswer('q2', true)}
                      className="bg-gov-navy hover:bg-gov-blue text-white font-bold py-1 px-3 rounded text-[11px]"
                    >
                      Yes
                    </button>
                    <button 
                      onClick={() => handleAnswer('q2', false)}
                      className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-1 px-3 rounded text-[11px]"
                    >
                      No
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Q2 User answer bubble */}
            {answers.q2 !== null && (
              <div className="flex flex-col items-end max-w-[85%] ml-auto">
                <span className="text-[8px] text-slate-500 font-bold uppercase mb-0.5">You</span>
                <div className="p-3 rounded-lg bg-[#DCF8C6] border border-emerald-250 shadow-sm text-slate-800 font-semibold">
                  {answers.q2 ? 'Yes, they demanded video custody/arrest' : 'No video calls'}
                </div>
              </div>
            )}

            {/* Q3 Bot Check */}
            {answers.q2 !== null && (
              <div className="flex flex-col items-start max-w-[85%]">
                <span className="text-[8px] text-slate-500 font-bold uppercase mb-0.5">Guard AI</span>
                <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-sm text-slate-800">
                  {lang.question3}
                </div>
                {answers.q3 === null && (
                  <div className="flex gap-2 mt-2 pl-2">
                    <button 
                      onClick={() => handleAnswer('q3', true)}
                      className="bg-gov-navy hover:bg-gov-blue text-white font-bold py-1 px-3 rounded text-[11px]"
                    >
                      Yes
                    </button>
                    <button 
                      onClick={() => handleAnswer('q3', false)}
                      className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-1 px-3 rounded text-[11px]"
                    >
                      No
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Q3 User answer bubble */}
            {answers.q3 !== null && (
              <div className="flex flex-col items-end max-w-[85%] ml-auto">
                <span className="text-[8px] text-slate-500 font-bold uppercase mb-0.5">You</span>
                <div className="p-3 rounded-lg bg-[#DCF8C6] border border-emerald-250 shadow-sm text-slate-800 font-semibold">
                  {answers.q3 ? 'Yes, they demanded bank balance transfers' : 'No money transfer demands'}
                </div>
              </div>
            )}

          </div>

          {/* Chat entry bar placeholder */}
          <div className="p-3 bg-[#F0F0F0] border-t border-slate-300 flex gap-2 shrink-0">
            <input 
              type="text"
              readOnly
              placeholder="Select options inside chat flow to diagnose risk..."
              className="flex-1 p-2 bg-white border border-slate-200 rounded text-slate-400 text-xs focus:outline-none"
            />
          </div>

        </div>

        {/* Right Column: Risk Verdict and Draft complain letter */}
        <div className="card-flat p-5 flex flex-col justify-between h-[490px] bg-slate-50/50">
          
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-2">
              <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Real-time safety verdict</span>
              <h4 className="text-sm font-extrabold text-gov-navy mt-1">Diagnostic Report</h4>
            </div>

            {/* Risk Indicator box */}
            {currentStep === 'verdict' ? (
              <div className="space-y-3">
                <div className={`p-4 border rounded-lg flex items-center justify-between ${
                  riskResult.level === 'Critical' ? 'bg-red-50 border-red-200 text-saffron-alert' : 'bg-green-50 border-green-200 text-teal-success'
                }`}>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Threat Level</span>
                    <span className="font-extrabold text-sm">{riskResult.level} Alert</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black font-outfit block">{riskResult.score}%</span>
                    <span className="text-[8px] text-slate-500 uppercase block">Risk Score</span>
                  </div>
                </div>

                <div className="p-3.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 leading-relaxed font-semibold italic">
                  "{riskResult.text}"
                </div>

                <p className="text-[10px] text-slate-500 leading-normal">
                  {lang.advisory}
                </p>
              </div>
            ) : (
              <div className="text-center py-10 text-slate-400 text-xs flex flex-col items-center justify-center gap-2 border border-dashed border-slate-200 rounded-lg bg-white h-44">
                <MessageSquare size={26} className="text-slate-300 animate-bounce" />
                <span>Complete the chatbot evaluation on the left to get a safety verdict.</span>
              </div>
            )}
          </div>

          {/* NCRB Draft complaint */}
          <div className="border-t border-slate-200 pt-4 space-y-2">
            <span className="text-[9px] text-slate-400 uppercase font-bold block">NCRB Complaint drafting tool</span>
            
            {currentStep === 'verdict' && riskResult.level === 'Critical' ? (
              <div className="space-y-2">
                
                <div className="flex gap-2 items-center bg-white p-2 border border-slate-200 rounded-lg">
                  <span className="text-[9px] text-slate-400 font-bold shrink-0">Scam Caller:</span>
                  <input 
                    type="text" 
                    value={customNum}
                    onChange={(e) => setCustomNum(e.target.value)}
                    className="p-0 border-0 focus:ring-0 text-[10px] font-semibold text-slate-800 w-full focus:outline-none"
                  />
                </div>

                <button
                  onClick={handleCopy}
                  className="w-full bg-gov-navy hover:bg-gov-blue text-white font-bold py-2 rounded shadow-sm text-[10px] transition-colors flex items-center justify-center gap-1.5"
                >
                  {copied ? (
                    <>
                      <Check size={11} className="text-green-400" />
                      Draft Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={11} />
                      {lang.draftBtn}
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="text-[9px] text-slate-400 font-mono">
                NCRB complain template activates when a scam threat is flagged.
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
