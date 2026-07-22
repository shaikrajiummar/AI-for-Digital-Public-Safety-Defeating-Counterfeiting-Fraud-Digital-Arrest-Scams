import React, { useState, useEffect, useCallback } from 'react';
import { 
  CheckCircle, Send, Play, RotateCcw, 
  Radio, Sparkles, X, Copy, Check, Map, Volume2
} from 'lucide-react';
import { mockScamCalls } from '../data/mockData';

export default function ArrestScamDetector() {
  const [activeCall, setActiveCall] = useState(mockScamCalls[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleLines, setVisibleLines] = useState(3); // Start with first 3 lines visible
  const [alertDispatched, setAlertDispatched] = useState(false);
  const [dispatchLogs, setDispatchLogs] = useState([]);
  const [targetAccount, setTargetAccount] = useState("State Bank of India - Mule #301 (Delhi)");
  
  // Phase 3 & 4 Telemetry States
  const [spectrogram, setSpectrogram] = useState(activeCall.spectrogramData);
  const [isTriangulating, setIsTriangulating] = useState(false);
  const [triangulationStep, setTriangulationStep] = useState(0);
  const [triangulationComplete, setTriangulationComplete] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);

  // Live Location & Audio States
  const [operatorCoords, setOperatorCoords] = useState(null);
  const [suspectCoords, setSuspectCoords] = useState({ lat: 27.8920, lng: 77.0120 });
  const [isSpeechMuted, setIsSpeechMuted] = useState(false);

  // Fetch operator's geolocation on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setOperatorCoords({
            lat: position.coords.latitude.toFixed(4),
            lng: position.coords.longitude.toFixed(4)
          });
        },
        () => {
          // Fallback to cyber headquarters in Delhi
          setOperatorCoords({ lat: "28.6139", lng: "77.2090" });
        }
      );
    } else {
      setOperatorCoords({ lat: "28.6139", lng: "77.2090" });
    }
  }, []);

  // Sync state if switching calls
  useEffect(() => {
    setVisibleLines(3);
    setIsPlaying(false);
    setAlertDispatched(false);
    setIsTriangulating(false);
    setTriangulationStep(0);
    setTriangulationComplete(false);
    setSpectrogram(activeCall.spectrogramData);
    setSuspectCoords(activeCall.id === 'call_fedex_mumbai' ? { lat: 27.8920, lng: 77.0120 } : { lat: 24.1350, lng: 86.8020 });
    
    if (activeCall.id === 'call_fedex_mumbai') {
      setTargetAccount("PNB Account *8912 (Mewat Syndicate)");
    } else {
      setTargetAccount("Reserve Bank Clearance Mule Account *9012 (Delhi Central)");
    }

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [activeCall]);

  // Clean speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Web Speech synthesis read lines helper
  const speakLine = useCallback((text, speaker) => {
    if (!window.speechSynthesis || isSpeechMuted) return;
    window.speechSynthesis.cancel(); // Stop current speech
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Choose voices / properties to simulate police/cyber taps
    utterance.rate = speaker === 'caller' ? 0.95 : 1.05;
    utterance.pitch = speaker === 'caller' ? 0.85 : 1.15;
    
    // Try to find a local english voice
    const voices = window.speechSynthesis.getVoices();
    const indVoice = voices.find(v => v.lang.includes('IN') || v.lang.includes('en'));
    if (indVoice) {
      utterance.voice = indVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  }, [isSpeechMuted]);

  // Simulated transcription player
  useEffect(() => {
    if (!isPlaying) {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      return;
    }
    
    if (visibleLines >= activeCall.transcript.length) {
      setIsPlaying(false);
      return;
    }

    // Speak the upcoming line before timeout triggers next index
    const currentLine = activeCall.transcript[visibleLines];
    if (currentLine) {
      speakLine(currentLine.text, currentLine.speaker);
    }

    const timer = setTimeout(() => {
      setVisibleLines(prev => prev + 1);
    }, 4000); // 4 seconds interval to give speech synthesis room to play

    return () => clearTimeout(timer);
  }, [isPlaying, visibleLines, activeCall, speakLine]);

  // Simulated Spectrogram bouncing frequencies
  useEffect(() => {
    if (!isPlaying) {
      setSpectrogram(activeCall.spectrogramData);
      return;
    }
    const timer = setInterval(() => {
      setSpectrogram(prev => prev.map(val => {
        const diff = Math.floor(Math.random() * 26) - 13;
        return Math.max(10, Math.min(100, val + diff));
      }));
    }, 150);
    return () => clearInterval(timer);
  }, [isPlaying, activeCall]);

  // Suspect live coordinates drift ticker
  useEffect(() => {
    if (!isPlaying && !isTriangulating) return;
    
    const interval = setInterval(() => {
      setSuspectCoords(prev => ({
        lat: (parseFloat(prev.lat) + (Math.random() * 0.0006 - 0.0003)).toFixed(4),
        lng: (parseFloat(prev.lng) + (Math.random() * 0.0006 - 0.0003)).toFixed(4)
      }));
    }, 1500);

    return () => clearInterval(interval);
  }, [isPlaying, isTriangulating]);

  // Triangulation steps
  useEffect(() => {
    if (!isTriangulating) {
      setTriangulationStep(0);
      setTriangulationComplete(false);
      return;
    }
    const timer = setInterval(() => {
      setTriangulationStep(prev => {
        if (prev >= 3) {
          clearInterval(timer);
          setTriangulationComplete(true);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(timer);
  }, [isTriangulating]);

  const handleDispatch = (e) => {
    e.preventDefault();
    setAlertDispatched(true);
    setDispatchLogs([
      `[${new Date().toLocaleTimeString()}] Case ${activeCall.id.toUpperCase()} mapped.`,
      `[${new Date().toLocaleTimeString()}] Target mule bank account registered for freeze.`,
      `[${new Date().toLocaleTimeString()}] Operator location verified: Lat ${operatorCoords?.lat || 'N/A'}, Lng ${operatorCoords?.lng || 'N/A'}.`,
      `[${new Date().toLocaleTimeString()}] Target suspect tower coordinate locked at ${suspectCoords.lat} N, ${suspectCoords.lng} E.`,
      `[${new Date().toLocaleTimeString()}] Alert package successfully transmitted to MHA I4C portal.`
    ]);
  };

  const getRiskColor = (score) => {
    if (score > 90) return 'text-saffron-alert';
    if (score > 70) return 'text-amber-alert';
    return 'text-gov-blue';
  };

  const getRiskBg = (score) => {
    if (score > 90) return 'bg-red-50 border-red-200';
    if (score > 70) return 'bg-amber-50 border-amber-200';
    return 'bg-blue-50 border-blue-200';
  };

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(`${suspectCoords.lat} N, ${suspectCoords.lng} E`);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  return (
    <div className="space-y-6" id="arrest-analyzer-panel">
      
      {/* Tab Header */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-black font-outfit text-gov-navy tracking-tight">Digital Arrest Scam Detector</h2>
        <p className="text-xs text-slate-500 font-medium">NLP parser scanning transcripts in real-time for psychological pressure tactics, video arrest threats, and money transfer orders.</p>
      </div>

      {/* Call selector & Mute controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2 bg-slate-100 p-1.5 rounded-lg border border-slate-200 w-fit">
          {mockScamCalls.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCall(c)}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                activeCall.id === c.id 
                  ? 'bg-gov-navy text-white shadow-sm' 
                  : 'text-slate-600 hover:text-gov-navy hover:bg-slate-200'
              }`}
            >
              {c.callerName.includes('FedEx') ? 'Customs FedEx Case' : 'CBI Money Laundering Case'}
            </button>
          ))}
        </div>

        {/* Audio Mute toggle */}
        <button
          onClick={() => {
            setIsSpeechMuted(!isSpeechMuted);
            if (!isSpeechMuted && window.speechSynthesis) window.speechSynthesis.cancel();
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-bold transition-all ${
            isSpeechMuted 
              ? 'bg-red-50 text-red-500 border-red-200 hover:bg-red-100' 
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Volume2 size={13} />
          {isSpeechMuted ? 'TTS Audio Muted' : 'TTS Audio Active (Tap calls)'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Call Transcript, Spectrogram & Triangulation HUD */}
        <div className="lg:col-span-2 card-flat p-5 flex flex-col justify-between h-[560px] relative overflow-hidden">
          
          <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="text-sm font-extrabold text-gov-navy font-outfit">Real-Time Transcription Stream</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">VoIP gateway intercept from active alert node.</p>
            </div>
            
            {/* Player Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (visibleLines >= activeCall.transcript.length) {
                    setVisibleLines(3);
                  }
                  setIsPlaying(!isPlaying);
                }}
                className="flex items-center gap-1 bg-gov-navy hover:bg-gov-blue text-white text-[10px] font-bold py-1 px-2.5 rounded shadow transition-all"
              >
                <Play size={11} className={isPlaying ? 'animate-spin' : ''} />
                {isPlaying ? 'Streaming Audio...' : visibleLines >= activeCall.transcript.length ? 'Replay Simulation' : 'Play Live Feed'}
              </button>
              <button
                onClick={() => {
                  setVisibleLines(3);
                  setIsPlaying(false);
                }}
                className="p-1 border border-slate-200 hover:border-slate-350 text-slate-500 hover:text-gov-navy rounded"
                title="Reset call"
              >
                <RotateCcw size={12} />
              </button>
            </div>
          </div>

          {/* Dynamic Spectrogram visualizer */}
          <div className="mt-3 bg-slate-950 border border-slate-800 p-2.5 rounded-lg flex items-end justify-between h-14 w-full text-slate-200">
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-wider self-center ml-1">Spectral Input</span>
            <div className="flex-1 flex items-end justify-around h-full max-w-[320px] px-6">
              {spectrogram.map((height, i) => (
                <span 
                  key={i} 
                  className={`w-1.5 rounded-t transition-all duration-100 ${
                    isPlaying ? 'bg-saffron-alert' : 'bg-gov-blue'
                  }`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <span className="text-[8px] font-mono text-slate-400 self-center mr-1">
              {isPlaying ? "AI CLONING DETECTING..." : "VOIP GATEWAY IDLE"}
            </span>
          </div>

          {/* Transcript view box (Wrapper for Absolute Triangulation HUD) */}
          <div className="relative flex-1 overflow-y-auto p-4 bg-slate-50 border border-slate-200 rounded-lg my-4 space-y-3 min-h-0">
            
            {/* Conditional Triangulation HUD Overlay */}
            {isTriangulating && (
              <div className="absolute inset-0 bg-slate-950/95 flex flex-col md:flex-row justify-between p-5 text-slate-200 z-30 font-mono text-[10px] leading-relaxed">
                
                {/* Visual Radar Screen */}
                <div className="flex-1 max-w-[280px] bg-slate-900 border border-slate-800 rounded-lg aspect-square flex items-center justify-center relative overflow-hidden">
                  
                  {/* Grid Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.08)_1px,transparent_1px)] bg-[size:12px_12px]" />
                  <div className="absolute w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_50%,rgba(34,197,94,0.06)_100%)] rounded-full animate-spin pointer-events-none" style={{ animationDuration: '6s' }} />

                  <svg className="w-[80%] h-[80%] text-slate-800 fill-none stroke-current stroke-[1]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="10" className="stroke-slate-800" />
                    <circle cx="50" cy="50" r="25" className="stroke-slate-800" />
                    <circle cx="50" cy="50" r="40" className="stroke-slate-800" />
                    
                    {/* Triangulating Towers (Mock locations) */}
                    <circle cx="20" cy="20" r="3" className="fill-blue-500 text-blue-500" />
                    <circle cx="80" cy="30" r="3" className="fill-blue-500 text-blue-500" />
                    <circle cx="50" cy="80" r="3" className="fill-blue-500 text-blue-500" />

                    {/* Concentric Shrinking Triangulation Waves */}
                    {triangulationStep >= 1 && <circle cx="20" cy="20" r={triangulationStep === 1 ? 40 : 25} className="stroke-blue-400/40 animate-pulse" />}
                    {triangulationStep >= 2 && <circle cx="80" cy="30" r={triangulationStep === 2 ? 55 : 36} className="stroke-blue-400/40 animate-pulse" />}
                    {triangulationStep >= 3 && <circle cx="50" cy="80" r={triangulationStep === 3 ? 45 : 30} className="stroke-blue-400/40 animate-pulse" />}

                    {/* Converged Center Dot */}
                    {triangulationComplete && (
                      <g>
                        <circle cx="48" cy="42" r="4" className="fill-red-500 stroke-white stroke-[1] animate-ping" />
                        <circle cx="48" cy="42" r="2" className="fill-red-500" />
                      </g>
                    )}
                  </svg>
                  
                  {/* Text Overlay */}
                  <span className="absolute bottom-2 left-2 text-[8px] text-green-500 font-bold uppercase tracking-wide">
                    TWR_RADAR_ACTIVE
                  </span>
                </div>

                {/* Console Log Panel */}
                <div className="flex-1 md:pl-5 flex flex-col justify-between py-1">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                      <span className="font-bold text-green-500 flex items-center gap-1.5">
                        <Radio size={12} className="animate-pulse" />
                        SIM-BOX SCAN LOG
                      </span>
                      <button 
                        onClick={() => setIsTriangulating(false)}
                        className="text-slate-400 hover:text-white p-0.5 rounded border border-slate-800"
                      >
                        <X size={10} />
                      </button>
                    </div>

                    <div className="space-y-1.5 text-[9px] text-slate-300">
                      <div>[SYSTEM] Initiating TDOA (Time Diff) scan...</div>
                      {triangulationStep >= 1 && <div className="text-blue-400">[BTS_1] BTS_Mewat_East mapped. Signal: -78dBm.</div>}
                      {triangulationStep >= 2 && <div className="text-blue-400">[BTS_2] BTS_Mewat_North mapped. Latency calculated.</div>}
                      {triangulationStep >= 3 && <div className="text-blue-400">[BTS_3] BTS_Bharatpur verified. Triangulating intersection...</div>}
                      {triangulationComplete && (
                        <div className="text-green-400 font-bold mt-1 bg-green-950/30 p-2 rounded border border-green-900/40">
                          [SUCCESS] Cluster found! Located within 15m radius.<br/>
                          Location: Mewat Rural Sector B.<br/>
                          Coordinates: {suspectCoords.lat} N, {suspectCoords.lng} E.
                        </div>
                      )}
                    </div>
                  </div>

                  {triangulationComplete && (
                    <button
                      onClick={handleCopyCoords}
                      className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold py-1.5 rounded flex items-center justify-center gap-1 text-[9px] transition-colors"
                    >
                      {copiedCoords ? (
                        <>
                          <Check size={11} className="text-green-400" />
                          Coords Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={11} />
                          Copy Target GPS Coordinates
                        </>
                      )}
                    </button>
                  )}
                </div>

              </div>
            )}

            {/* Standard Transcripts Bubbles */}
            {activeCall.transcript.slice(0, visibleLines).map((line, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col max-w-[85%] ${
                  line.speaker === 'caller' ? 'mr-auto items-start' : 'ml-auto items-end'
                }`}
              >
                <span className="text-[9px] text-slate-400 font-bold uppercase mb-0.5">
                  {line.speaker === 'caller' ? 'Spoofed Caller' : 'Target (Victim)'}
                </span>
                
                {/* Highlight scanned phrases in text */}
                <div className={`p-3 rounded-lg text-xs leading-relaxed border ${
                  line.speaker === 'caller' 
                    ? 'bg-red-50/50 border-red-200 text-slate-800' 
                    : 'bg-white border-slate-200 text-slate-700'
                }`}>
                  <p>
                    {line.text.split(/(\bFedEx\b|\bMDMA\b|\bnarcotics\b|\bdigital arrest\b|\bCBI\b|\bSkype\b|\bmoney laundering\b|\bReserve Bank\b|\btransfer\b)/i).map((part, i) => {
                      const lower = part.toLowerCase();
                      const isKeyword = ["fedex", "mdma", "narcotics", "digital arrest", "cbi", "skype", "money laundering", "reserve bank", "transfer"].includes(lower);
                      return isKeyword ? (
                        <span key={i} className="bg-red-100 text-red-700 font-bold px-1 rounded border border-red-200">
                          {part}
                        </span>
                      ) : (
                        part
                      );
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isPlaying && (
              <div className="flex gap-1.5 items-center justify-start text-[10px] text-slate-400 italic">
                <span className="w-1.5 h-1.5 bg-gov-blue rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gov-blue rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-gov-blue rounded-full animate-bounce [animation-delay:0.4s]"></span>
                <span>Interpreting speech audio channel...</span>
              </div>
            )}
          </div>

          {/* Quick Metrics Footer with GPS Drift coordinates */}
          <div className="grid grid-cols-3 gap-2.5 text-[10px] font-medium border-t border-slate-100 pt-3 text-slate-500">
            <div>
              <span className="text-[9px] text-slate-400 uppercase font-bold block">Live Suspect coordinates</span>
              <span className="text-saffron-alert font-bold block mt-0.5 font-mono">
                {suspectCoords.lat} N, {suspectCoords.lng} E
                {(isPlaying || isTriangulating) && (
                  <span className="text-[8px] font-normal text-slate-400 animate-pulse ml-1.5 font-sans">
                    (Tracking...)
                  </span>
                )}
              </span>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 uppercase font-bold block">Target victim</span>
              <span className="text-slate-800 font-semibold truncate block mt-0.5">{activeCall.targetVictim}</span>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 uppercase font-bold block">Call Duration</span>
              <span className="text-slate-800 font-semibold block mt-0.5">{activeCall.callDuration}</span>
            </div>
          </div>

        </div>

        {/* Right Column: AI Diagnostics & MHA Alert Form */}
        <div className="card-flat p-5 flex flex-col justify-between h-[560px] bg-slate-50/50">
          
          {/* Risk assessment and checkpoints */}
          <div className="space-y-4">
            <div className={`p-4 border rounded-lg flex items-center justify-between ${getRiskBg(activeCall.riskScore)}`}>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">AI Classification Verdict</span>
                <h4 className="text-sm font-extrabold text-gov-navy mt-1">Digital Arrest Threat</h4>
              </div>
              <div className="text-right">
                <span className={`text-2xl font-black font-outfit block ${getRiskColor(activeCall.riskScore)}`}>
                  {activeCall.riskScore}%
                </span>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Risk Score</span>
              </div>
            </div>

            {/* AI Deepfake & Cloned Voice analysis panel */}
            <div className="bg-white border border-slate-200 p-3 shadow-sm rounded-lg text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gov-navy flex items-center gap-1.5">
                  <Sparkles size={13} className="text-saffron-alert" />
                  AI Voice Clone Analysis
                </span>
                <span className="text-[10px] font-mono text-saffron-alert font-extrabold bg-red-50 border border-red-200 px-1.5 rounded">
                  {activeCall.deepfakeProbability}% Prob
                </span>
              </div>

              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-saffron-alert animate-pulse" 
                  style={{ width: `${activeCall.deepfakeProbability}%` }}
                />
              </div>

              <div className="text-[9px] text-slate-500 space-y-1 pt-1 leading-relaxed">
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={10} className="text-saffron-alert shrink-0" />
                  <span>Synthetic vocoder distortions matched</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={10} className="text-saffron-alert shrink-0" />
                  <span>Flat spectral resonance (no room echoes)</span>
                </div>
              </div>
            </div>

            {/* Investigator geolocated base node */}
            <div className="bg-white border border-slate-200 p-3 shadow-sm rounded-lg text-xs space-y-1.5">
              <span className="font-bold text-gov-navy flex items-center gap-1.5 uppercase text-[9px] tracking-wider">
                <Map size={13} className="text-gov-blue" />
                Operator Base Geolocation
              </span>
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-slate-400">Node Coords:</span>
                <span className="text-slate-800 font-bold">
                  {operatorCoords ? `${operatorCoords.lat} N, ${operatorCoords.lng} E` : 'Locating...'}
                </span>
              </div>
            </div>
          </div>

          {/* MHA Dispatch Form */}
          <div className="border-t border-slate-200 pt-3 space-y-2">
            <h4 className="text-[10px] font-extrabold text-gov-navy font-outfit uppercase">MHA Cyber Portal dispatcher</h4>
            
            {alertDispatched ? (
              <div className="bg-white border border-slate-200 p-3.5 rounded-lg space-y-1.5 text-[9px] font-mono leading-normal h-40 overflow-y-auto">
                <div className="text-teal-success font-bold text-xs flex items-center gap-1.5 mb-1">
                  <CheckCircle size={14} />
                  ALERT REGISTERED SUCCESSFULLY
                </div>
                {dispatchLogs.map((log, i) => (
                  <div key={i} className="text-slate-600">{log}</div>
                ))}
              </div>
            ) : (
              <form onSubmit={handleDispatch} className="space-y-2.5 text-xs">
                <div>
                  <label className="text-[9px] text-slate-400 uppercase font-bold block mb-1">Destination Mule Account to Freeze</label>
                  <input 
                    type="text" 
                    className="w-full p-2 bg-white border border-slate-200 rounded text-xs font-semibold text-slate-800 focus:outline-none focus:border-gov-blue"
                    value={targetAccount}
                    onChange={(e) => setTargetAccount(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsTriangulating(true)}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded text-[10px] flex items-center justify-center gap-1 border border-slate-700 transition-colors"
                  >
                    <Radio size={11} className="text-green-400" />
                    Triangulate tower
                  </button>
                  
                  <button
                    type="submit"
                    className="flex-1 bg-saffron-alert hover:bg-saffron-alert/90 text-white font-bold py-2 rounded shadow-sm text-[10px] transition-colors flex items-center justify-center gap-1"
                  >
                    <Send size={11} />
                    Transmit Case Alert
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
