import React, { useState, useEffect } from 'react';
import { 
  Landmark, AlertTriangle, ShieldCheck, Sliders, 
  CheckCircle2, XCircle, Activity
} from 'lucide-react';
import { mockCurrencyChecklist } from '../data/mockData';

export default function CurrencyNoteScanner() {
  const [selectedNote, setSelectedNote] = useState(mockCurrencyChecklist.samples[0]); // Default to Genuine
  const [scanMode, setScanMode] = useState('visible'); // 'visible', 'uv', 'ir', 'mg'
  const [uvIntensity, setUvIntensity] = useState(100);
  const [verificationLogged, setVerificationLogged] = useState(false);
  
  // Magnetic sensor sweep states
  const [sweepOffset, setSweepOffset] = useState(0);
  const [waveOffset, setWaveOffset] = useState(0);

  // Animate magnetic sweep head
  useEffect(() => {
    if (scanMode !== 'mg') return;
    
    const interval = setInterval(() => {
      setSweepOffset(prev => (prev + 2) % 100);
      setWaveOffset(prev => (prev + 1) % 10);
    }, 35);
    
    return () => clearInterval(interval);
  }, [scanMode]);

  const handleLogSeizure = (e) => {
    e.preventDefault();
    setVerificationLogged(true);
  };

  const isFeatureFail = (featureId) => {
    return selectedNote.failures.includes(featureId);
  };

  // Generate magnetic waveform path points based on genuine vs fake note
  const getMagneticWavePath = () => {
    const width = 360;
    const height = 50;
    const isGenuine = selectedNote.status === 'Genuine';
    
    if (!isGenuine) {
      // Counterfeit: Flatline with micro noise
      let path = `M 0 ${height / 2}`;
      for (let x = 1; x <= width; x += 5) {
        const noise = (Math.sin(x * 0.5 + waveOffset) * 1);
        path += ` L ${x} ${height / 2 + noise}`;
      }
      return path;
    } else {
      // Genuine: Peaks at thread (around 30% of width) and serials (around 80% of width)
      let path = `M 0 ${height / 2}`;
      const threadPos = width * 0.3;
      const serialPos = width * 0.8;
      
      for (let x = 1; x <= width; x += 4) {
        let amplitude = height / 2;
        
        // Thread peak
        const threadDist = Math.abs(x - threadPos);
        if (threadDist < 25) {
          amplitude -= Math.cos((threadDist / 25) * Math.PI / 2) * 20;
        }
        
        // Serial peak
        const serialDist = Math.abs(x - serialPos);
        if (serialDist < 20) {
          amplitude -= Math.cos((serialDist / 20) * Math.PI / 2) * 16;
        }

        // Bouncing background scan noise
        const noise = Math.sin(x * 0.4 + waveOffset) * 1.5;
        path += ` L ${x} ${amplitude + noise}`;
      }
      return path;
    }
  };

  return (
    <div className="space-y-6" id="currency-verifier-panel">
      
      {/* Page Title */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-black font-outfit text-gov-navy tracking-tight">FICN Counterfeit Note Identifier</h2>
        <p className="text-xs text-slate-500 font-medium">Point-of-sale forensic simulator checking Mahatma Gandhi watermark alignment, microlettering clarity, and multi-spectral ink parameters.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Banknote Verification Visualizer */}
        <div className="lg:col-span-2 card-flat p-5 flex flex-col justify-between h-[540px]">
          
          <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="text-sm font-extrabold text-gov-navy font-outfit">Multi-Spectral Verification Bed</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Toggle filter beds to audit forensic ink signatures.</p>
            </div>

            {/* Note Selector */}
            <div className="flex gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
              {mockCurrencyChecklist.samples.map(sample => (
                <button
                  key={sample.id}
                  onClick={() => {
                    setSelectedNote(sample);
                    setVerificationLogged(false);
                  }}
                  className={`px-3 py-1 rounded font-bold transition-all ${
                    selectedNote.id === sample.id 
                      ? 'bg-gov-navy text-white shadow-sm' 
                      : 'text-slate-600 hover:text-gov-navy hover:bg-slate-200'
                  }`}
                >
                  {sample.status === 'Genuine' ? 'Genuine Reference' : 'Mewat Counterfeit'}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Note SVG Canvas */}
          <div className="flex-1 my-4 flex flex-col justify-center items-center">
            
            {/* Banknote visual frame */}
            <div 
              className={`relative w-full max-w-[500px] aspect-[2.35/1] rounded-lg border shadow-md transition-all duration-500 overflow-hidden ${
                scanMode === 'uv' 
                  ? 'bg-slate-950 border-blue-900/50 shadow-[0_0_20px_rgba(29,78,216,0.3)]' 
                  : scanMode === 'ir'
                    ? 'bg-zinc-800 border-zinc-700 shadow-inner'
                    : scanMode === 'mg'
                      ? 'bg-slate-950 border-emerald-900/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                      : 'bg-[#EAF0E6] border-emerald-900/10'
              }`}
            >
              
              {/* NORMAL VISIBLE LIGHT BED */}
              {scanMode === 'visible' && (
                <div className="absolute inset-0 p-4 flex flex-col justify-between font-serif text-[#3C533A]">
                  
                  {/* Top Bar: Reserve Bank heading */}
                  <div className="flex justify-between items-start border-b border-[#3C533A]/20 pb-1 text-[9px] font-bold">
                    <span>भारतीय रिज़र्व बैंक // RESERVE BANK OF INDIA</span>
                    <span className="font-sans text-[8px] bg-emerald-800/10 text-emerald-800 px-1 rounded">केंद्रीय सरकार द्वारा प्रत्याभूत</span>
                  </div>

                  {/* Note Body */}
                  <div className="flex-1 flex justify-between items-center relative py-1">
                    
                    {/* Ashoka Pillar on Left */}
                    <div className="w-10 h-16 border border-dashed border-[#3C533A]/30 rounded flex items-center justify-center text-[7px] text-center font-sans opacity-60">
                      Ashoka<br/>Pillar
                    </div>

                    {/* Security Thread (Windowed strip) */}
                    <div className="absolute left-[30%] top-0 bottom-0 w-2.5 flex flex-col justify-around items-center">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`w-full h-2.5 rounded-sm transition-all duration-350 ${
                            // thread color shift: tilt is simulated by green/blue block
                            i % 2 === 0 ? 'bg-[#3A5D40] text-[5px] text-white flex justify-center items-center font-sans' : 'bg-transparent'
                          }`}
                        >
                          {i % 2 === 0 && 'RBI'}
                        </span>
                      ))}
                    </div>

                    {/* Central Gandhi Portrait mock outline */}
                    <div className="flex-1 flex flex-col items-center justify-center opacity-85">
                      <div className="w-14 h-16 rounded-full border-2 border-[#3C533A]/40 flex items-center justify-center text-[8px] font-sans font-bold">
                        GANDHI
                      </div>
                      <span className="text-[12px] font-sans font-extrabold mt-1">₹500</span>
                    </div>

                    {/* Right white Watermark panel */}
                    <div className="w-20 h-full border border-[#3C533A]/20 rounded bg-white/40 flex items-center justify-center text-[8px] text-center font-sans opacity-70">
                      Watermark<br/>Window
                    </div>

                  </div>

                  {/* Bottom details */}
                  <div className="flex justify-between border-t border-[#3C533A]/10 pt-1 text-[8px] font-mono">
                    <span>Serial No: <strong className="font-sans font-bold text-slate-800">{selectedNote.serial}</strong></span>
                    <span className="font-sans">स्वच्छ भारत (एक कदम स्वच्छता की ओर)</span>
                  </div>

                </div>
              )}

              {/* ULTRAVIOLET (UV 365NM) LIGHT BED */}
              {scanMode === 'uv' && (
                <div 
                  className="absolute inset-0 p-4 flex flex-col justify-between font-mono text-[9px] transition-opacity duration-300"
                  style={{ opacity: uvIntensity / 100 }}
                >
                  {/* UV Background paper glow for cheap fakes */}
                  {selectedNote.status === 'Counterfeit' && (
                    <div className="absolute inset-0 bg-blue-600/10 pointer-events-none z-10 animate-pulse"></div>
                  )}

                  <div className="flex justify-between text-blue-400 border-b border-blue-900/30 pb-1 z-15">
                    <span>UV RADAR DETECT // FICN_BED</span>
                    <span>WAVELENGTH: 365 NM</span>
                  </div>

                  <div className="flex-1 flex justify-between items-center relative py-1 z-15">
                    {/* Fiber glows */}
                    {selectedNote.status === 'Genuine' && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-[20%] left-[10%] w-1.5 h-1.5 bg-green-400 rounded-full blur-[0.8px]"></div>
                        <div className="absolute top-[60%] left-[45%] w-1 h-1 bg-yellow-400 rounded-full blur-[0.8px]"></div>
                        <div className="absolute top-[40%] left-[75%] w-1 h-1.5 bg-cyan-400 rounded-full blur-[0.8px]"></div>
                        <div className="absolute top-[80%] left-[25%] w-1.5 h-1 bg-green-400 rounded-full blur-[0.8px]"></div>
                      </div>
                    )}

                    <div className="w-10 h-16 border border-blue-950 rounded flex items-center justify-center text-[7px] text-blue-900 text-center opacity-40">
                      NO GLOW
                    </div>

                    <div className="absolute left-[30%] top-0 bottom-0 w-2.5 flex flex-col justify-around items-center">
                      {[...Array(5)].map((_, i) => {
                        const glows = selectedNote.status === 'Genuine';
                        return (
                          <span 
                            key={i} 
                            className={`w-full h-2.5 rounded-sm transition-all ${
                              glows 
                                ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]' 
                                : 'bg-transparent'
                            }`}
                          />
                        );
                      })}
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center text-blue-900 opacity-60">
                      <div className="w-14 h-16 rounded-full border-2 border-blue-900/40 flex items-center justify-center text-[7px]">
                        NO GLOW
                      </div>
                      <span className="text-[12px] font-sans font-extrabold mt-1">₹500</span>
                    </div>

                    <div className="w-20 h-full border border-blue-900/30 rounded bg-[#0a0d1d] flex flex-col items-center justify-center text-center text-blue-500 shadow-inner">
                      {selectedNote.status === 'Genuine' ? (
                        <div className="opacity-90 flex flex-col items-center animate-pulse">
                          <span className="text-[6px] border border-blue-500/20 px-1 rounded font-bold">500</span>
                          <span className="text-[7px] mt-0.5">GANDHI</span>
                        </div>
                      ) : (
                        <span className="text-[6px] text-red-500 font-bold opacity-80">BLURRED / MISSING</span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between border-t border-blue-900/30 pt-1 text-[8px] z-15">
                    <span>SERIAL: <strong className={selectedNote.status === 'Genuine' ? "text-green-400 font-bold" : "text-blue-900"}>{selectedNote.serial}</strong></span>
                    <span className="text-blue-700">RBI_CHEST_SYSTEM</span>
                  </div>
                </div>
              )}

              {/* INFRARED (IR) SCAN LIGHT BED */}
              {scanMode === 'ir' && (
                <div className="absolute inset-0 p-4 flex flex-col justify-between font-mono text-[9px] text-zinc-400">
                  <div className="flex justify-between border-b border-zinc-700 pb-1 text-zinc-500">
                    <span>IR EXPOSURE CHECK // 850NM BANDS</span>
                    <span>FILTER: HIGH-ABSORPTION</span>
                  </div>

                  <div className="flex-1 flex justify-between items-center relative py-1">
                    
                    {/* Genuine IR ink: Left side graphics disappear completely */}
                    {selectedNote.status === 'Genuine' ? (
                      <>
                        {/* Left side is faded white/gray */}
                        <div className="w-[45%] h-full bg-zinc-800/90 border border-dashed border-zinc-700/20 flex items-center justify-center text-[7px] text-zinc-600 font-bold uppercase tracking-wider">
                          IR Absorbed (Invisible)
                        </div>
                        
                        {/* Right side shows portrait and watermark window */}
                        <div className="flex-1 flex justify-around items-center pl-4">
                          <div className="w-14 h-16 rounded-full border border-zinc-500/30 flex items-center justify-center text-[8px] font-bold">
                            GANDHI
                          </div>
                          <div className="w-20 h-full border border-zinc-700 bg-zinc-950 flex flex-col items-center justify-center text-center text-[7px]">
                            <span>WATERMARK</span>
                            <span className="font-bold text-zinc-400 mt-1">500</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Counterfeit note: IR-absorbing ink is absent, note remains fully visible */
                      <div className="absolute inset-0 p-2 flex justify-between items-center bg-zinc-900 text-zinc-500">
                        <div className="w-10 h-16 border border-zinc-700 rounded flex items-center justify-center text-[7px] text-center opacity-65">
                          Ashoka
                        </div>
                        <div className="w-0.5 bg-zinc-700 h-full mx-2" />
                        <div className="flex-1 flex flex-col items-center justify-center opacity-65">
                          <div className="w-14 h-16 rounded-full border border-zinc-700 flex items-center justify-center text-[7px] font-bold">
                            GANDHI
                          </div>
                          <span className="text-[10px] mt-1">₹500</span>
                        </div>
                        <div className="w-20 h-full border border-zinc-700 rounded bg-zinc-950 flex flex-col items-center justify-center text-center text-[7px] opacity-65">
                          Watermark
                        </div>
                        {/* Warning notice overlay */}
                        <div className="absolute inset-0 bg-red-950/20 flex items-center justify-center pointer-events-none">
                          <span className="bg-saffron-alert text-white border border-red-500 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider">
                            Fail: Left-Side Ink Visible
                          </span>
                        </div>
                      </div>
                    )}

                  </div>

                  <div className="flex justify-between border-t border-zinc-700 pt-1 text-[8px]">
                    <span>SERIAL CODE: <strong>{selectedNote.serial}</strong></span>
                    <span>IR_CAM_CLEARANCE</span>
                  </div>
                </div>
              )}

              {/* MAGNETIC RESONANCE (MG) DETECT BED */}
              {scanMode === 'mg' && (
                <div className="absolute inset-0 p-4 flex flex-col justify-between font-mono text-[9px] text-emerald-400">
                  <div className="flex justify-between border-b border-emerald-900/30 pb-1 text-emerald-500">
                    <span>MG COIL SCANNER // RES-SWEEP</span>
                    <span>STATUS: ACTIVE SCAN</span>
                  </div>

                  <div className="flex-1 flex justify-between items-center relative py-1">
                    {/* Visual Banknote skeleton structure */}
                    <div className="absolute inset-0 flex justify-between items-center opacity-30 border border-emerald-900/20 p-2 rounded">
                      <div className="w-8 h-12 border border-emerald-900 rounded" />
                      <div className="w-14 h-14 rounded-full border border-emerald-900" />
                      <div className="w-16 h-full border border-emerald-900 rounded" />
                    </div>

                    {/* Sweeping sensor line */}
                    <div 
                      className="absolute top-0 bottom-0 w-1 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all duration-300 z-20"
                      style={{ left: `${sweepOffset}%` }}
                    />
                    
                    {/* Sweep head target label */}
                    <div 
                      className="absolute -top-1 bg-emerald-950 border border-emerald-500/40 text-[7px] px-1 rounded -translate-x-1/2 z-20 font-bold uppercase"
                      style={{ left: `${sweepOffset}%` }}
                    >
                      Coil
                    </div>

                    {/* Sensor stats overlay */}
                    <div className="absolute inset-0 flex items-center justify-center font-bold text-[8px] gap-6 text-emerald-600 bg-slate-950/20">
                      <div>COIL ANGLE: 90°</div>
                      <div>FREQUENCY: 12.8 HZ</div>
                    </div>
                  </div>

                  <div className="flex justify-between border-t border-emerald-900/30 pt-1 text-[8px]">
                    <span>THREAD MAG-SIGNATURE: <strong>{selectedNote.status === 'Genuine' ? 'DETECTED' : 'ABSENT'}</strong></span>
                    <span>MG_RES_BED</span>
                  </div>
                </div>
              )}

            </div>

            {/* Sub-note dynamic diagnostic message block */}
            <div className="mt-4 w-full max-w-[400px] p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-mono leading-normal text-slate-600 text-center">
              {scanMode === 'visible' && "Mode: Visible Light Bed. Check Gandhi Watermark alignment & Serial Progressive sizing."}
              {scanMode === 'uv' && `Mode: UV Backlight Scan. ${selectedNote.uvResult}`}
              {scanMode === 'ir' && `Mode: Infrared Absorption Scan. ${selectedNote.irResult}`}
              {scanMode === 'mg' && `Mode: Magnetic Ink Scan. ${selectedNote.mgResult}`}
            </div>

            {/* Magnetic wave visualization (renders only during MG mode) */}
            {scanMode === 'mg' && (
              <div className="mt-4 bg-slate-950 border border-slate-800 p-3 rounded-lg w-full max-w-[400px]">
                <div className="flex justify-between items-center text-[8px] font-mono text-emerald-500 uppercase tracking-wider mb-2 font-bold">
                  <span>Magnetic resonance signal amplitude</span>
                  <span className="flex items-center gap-1">
                    <Activity size={10} className="animate-pulse" />
                    {selectedNote.status === 'Genuine' ? '12.8 Hz Signature matched' : '0 Hz flatline'}
                  </span>
                </div>
                
                {/* SVG Line Graph Waveform */}
                <div className="h-14 w-full flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 360 50">
                    <path 
                      d={getMagneticWavePath()} 
                      fill="none" 
                      stroke={selectedNote.status === 'Genuine' ? '#10B981' : '#EF4444'} 
                      strokeWidth={2} 
                      className="transition-all duration-300"
                    />
                    {/* Center baseline helper */}
                    <line x1="0" y1="25" x2="360" y2="25" stroke="#1E293B" strokeDasharray="3,3" strokeWidth={1} />
                  </svg>
                </div>
              </div>
            )}

            {/* UV Intensity Slider control Bed (renders only during UV mode) */}
            {scanMode === 'uv' && (
              <div className="mt-4 flex items-center gap-4 bg-slate-50 border border-slate-200 p-3 rounded-lg w-full max-w-[400px] text-xs">
                <Sliders size={16} className="text-gov-navy" />
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex justify-between font-bold text-slate-700 text-[10px] uppercase">
                    <span>UV Scanner Intensity</span>
                    <span>{uvIntensity}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gov-navy"
                    value={uvIntensity} 
                    onChange={(e) => setUvIntensity(parseInt(e.target.value))}
                  />
                </div>
              </div>
            )}

            {/* Spectrum Switch Selectors */}
            <div className="mt-4 flex items-center gap-2 bg-slate-100 p-1.5 rounded-lg border border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-600">
              <span className="px-2 shrink-0 text-slate-400">Sensor Bed:</span>
              <div className="grid grid-cols-4 gap-1 w-full">
                {[
                  { id: 'visible', label: 'Visible' },
                  { id: 'uv', label: 'UV 365nm' },
                  { id: 'ir', label: 'Infrared' },
                  { id: 'mg', label: 'Magnetic' }
                ].map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setScanMode(mode.id)}
                    className={`py-1 rounded text-center transition-all ${
                      scanMode === mode.id 
                        ? 'bg-gov-navy text-white shadow-sm font-black' 
                        : 'hover:text-gov-navy hover:bg-slate-200'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Verification checklist and RBI seizure logger */}
        <div className="card-flat p-5 flex flex-col justify-between h-[540px] bg-slate-50/50">
          
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-2">
              <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Scan Analysis Verdict</span>
              <h4 className="text-base font-extrabold text-gov-navy mt-1">Verification Report</h4>
            </div>

            {/* Checklist elements mapping state */}
            <div className="space-y-2 text-xs">
              {mockCurrencyChecklist.features.map(f => {
                const fails = isFeatureFail(f.id);
                return (
                  <div key={f.id} className="bg-white p-2 border border-slate-200 rounded flex justify-between gap-3">
                    <div className="min-w-0">
                      <span className="font-bold text-gov-navy block">{f.name}</span>
                      <p className="text-[9px] text-slate-500 leading-normal mt-0.5 truncate">{f.description}</p>
                    </div>
                    <div className="shrink-0 flex items-center">
                      {fails ? (
                        <XCircle size={15} className="text-saffron-alert" title="Checkpoint Failed" />
                      ) : (
                        <CheckCircle2 size={15} className="text-teal-success" title="Checkpoint Verified" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Seizure Logger Form */}
          <div className="border-t border-slate-200 pt-3">
            
            {/* Show different card based on note type */}
            {selectedNote.status === 'Genuine' ? (
              <div className="bg-teal-50 border border-teal-200 text-teal-700 p-3.5 rounded-lg text-[10px] font-medium leading-relaxed flex items-start gap-2">
                <ShieldCheck className="shrink-0 mt-0.5 text-teal-600" size={15} />
                <div>
                  <span className="font-bold block uppercase text-[8px] text-teal-800 mb-0.5">Reference Note Certified</span>
                  All RBI security marks successfully verified. Note meets full compliance thresholds for cash operations.
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                
                {verificationLogged ? (
                  <div className="bg-blue-50 border border-blue-200 text-gov-navy p-3.5 rounded-lg text-[10px] font-mono leading-normal text-center">
                    <CheckCircle2 size={20} className="text-teal-success mx-auto mb-1 animate-bounce" />
                    <span className="font-bold block text-xs uppercase text-gov-navy">SEIZURE LOGGED</span>
                    FICN Case logged at RBI Central Chest database. Bank teller ID credited for intercept.
                  </div>
                ) : (
                  <form onSubmit={handleLogSeizure} className="space-y-2 text-xs">
                    <div className="p-3 bg-red-50 border border-red-200 text-saffron-alert rounded-lg text-[10px] leading-relaxed flex items-start gap-2 mb-1.5">
                      <AlertTriangle className="shrink-0 mt-0.5 text-saffron-alert animate-pulse" size={14} />
                      <div>
                        <span className="font-bold block uppercase text-[8px] text-red-800 mb-0.5">CRITICAL: FICN DETECTED</span>
                        This note is classified as counterfeit. Failed security features: UV glow test, IR invisible ink, & magnetic resonance check.
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gov-navy hover:bg-gov-blue text-white font-bold py-2 rounded shadow-sm text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Landmark size={12} />
                      Log Fake Note Seizure to RBI Chest
                    </button>
                  </form>
                )}

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
