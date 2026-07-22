import React, { useState, useEffect } from 'react';
import { 
  Shield, Landmark, PhoneCall, AlertTriangle, MapPin, 
  ChevronRight, RefreshCw, TrendingUp, CheckCircle 
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  BarChart, Bar, Cell 
} from 'recharts';
import { mockMapHotspots } from '../data/mockData';

export default function Dashboard({ liveAlerts, setActiveTab }) {
  const [selectedHotspot, setSelectedHotspot] = useState(mockMapHotspots[1]); // Default to Mewat
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [blocks, setBlocks] = useState([
    { height: 104921, hash: "0x3d82a1f9bc90e21a", caseId: "CASE-891", status: "VERIFIED" },
    { height: 104920, hash: "0xe29148b3da90a1e9", caseId: "CASE-890", status: "VERIFIED" },
    { height: 104919, hash: "0x7c81a1e9e29048b3", caseId: "CASE-889", status: "VERIFIED" }
  ]);
  const [operatorCoords, setOperatorCoords] = useState(null);

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
          setOperatorCoords({ lat: "28.6139", lng: "77.2090" });
        }
      );
    } else {
      setOperatorCoords({ lat: "28.6139", lng: "77.2090" });
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks(prev => {
        const nextHeight = prev[0].height + 1;
        const randomHash = "0x" + Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10);
        const nextBlock = {
          height: nextHeight,
          hash: randomHash,
          caseId: `CASE-${Math.floor(Math.random() * 100) + 900}`,
          status: "VERIFIED"
        };
        return [nextBlock, ...prev.slice(0, 3)]; // Keep last 4 blocks
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Stats calculation
  const totalComplaints = "1,142,890";
  const moneySaved = "Rs. 1,776 Cr";
  const fakeNotesSeized = "Rs. 38.45 Lakhs";

  // Recharts Data: Weekly scam volume trends
  const trendData = [
    { week: 'Wk 1', arrestScams: 230, moneyMules: 410, fakeNotes: 80 },
    { week: 'Wk 2', arrestScams: 340, moneyMules: 490, fakeNotes: 120 },
    { week: 'Wk 3', arrestScams: 410, moneyMules: 520, fakeNotes: 90 },
    { week: 'Wk 4', arrestScams: 580, moneyMules: 630, fakeNotes: 140 },
    { week: 'Wk 5', arrestScams: 690, moneyMules: 710, fakeNotes: 110 },
    { week: 'Wk 6', arrestScams: 840, moneyMules: 890, fakeNotes: 180 },
  ];

  // Hotspot cases data
  const hotspotChartData = mockMapHotspots.map(h => ({
    name: h.name.split(' ')[0],
    cases: h.cases,
    color: h.severity === 'Critical' ? '#E65F2B' : h.severity === 'High' ? '#F1A208' : '#1D4ED8'
  }));

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="space-y-6" id="dashboard-panel">
      
      {/* Dashboard Sub-Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-black font-outfit text-gov-navy tracking-tight">National Threat Command Center</h2>
          <p className="text-xs text-slate-500 font-medium">Aggregating nationwide complaints, phone tower grids, and financial alerts.</p>
        </div>
        <button 
          onClick={handleRefresh}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:border-slate-300 bg-white text-slate-600 hover:text-gov-navy text-xs font-bold rounded-lg shadow-sm transition-all"
        >
          <RefreshCw size={13} className={isRefreshing ? 'animate-spin' : ''} />
          Refresh Command Feeds
        </button>
      </div>

      {/* 4 Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Complaints */}
        <div className="card-flat p-5 flex justify-between items-start">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Complaints (YTD)</span>
            <h3 className="text-2xl font-black font-outfit text-gov-navy mt-1.5">{totalComplaints}</h3>
            <span className="text-[10px] text-saffron-alert font-bold block mt-2 flex items-center gap-1">
              <TrendingUp size={12} />
              +60% YoY increase
            </span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-slate-400">
            <Shield size={20} />
          </div>
        </div>

        {/* Money Saved */}
        <div className="card-flat p-5 flex justify-between items-start">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Funds Intercepted / Saved</span>
            <h3 className="text-2xl font-black font-outfit text-teal-success mt-1.5">{moneySaved}</h3>
            <span className="text-[10px] text-teal-success font-bold block mt-2 flex items-center gap-1">
              <CheckCircle size={12} />
              Secured at source
            </span>
          </div>
          <div className="p-3 bg-teal-50 border border-teal-100 rounded-lg text-teal-500">
            <Landmark size={20} />
          </div>
        </div>

        {/* Active Spoofed SIMs */}
        <div className="card-flat p-5 flex justify-between items-start">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Mapped Fraud Towers</span>
            <h3 className="text-2xl font-black font-outfit text-amber-alert mt-1.5">54 Cells</h3>
            <span className="text-[10px] text-slate-500 font-medium block mt-2">
              Jamtara & Mewat hotspots
            </span>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg text-amber-500">
            <PhoneCall size={20} />
          </div>
        </div>

        {/* Counterfeit Seized */}
        <div className="card-flat p-5 flex justify-between items-start">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Fake Notes Seized (FICN)</span>
            <h3 className="text-2xl font-black font-outfit text-gov-navy mt-1.5">{fakeNotesSeized}</h3>
            <span className="text-[10px] text-saffron-alert font-bold block mt-2">
              High-quality Rs. 500 fakes
            </span>
          </div>
          <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-saffron-alert">
            <AlertTriangle size={20} />
          </div>
        </div>

      </div>

      {/* Main Core Layout: Map on left/right + charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: India Geospatial Crime Map Simulation */}
        <div className="lg:col-span-2 card-flat p-5 flex flex-col justify-between h-[450px]">
          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
            <div>
              <h4 className="text-sm font-extrabold text-gov-navy font-outfit">Geospatial Crime Radar & Seizure Spots</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Click marked tower hubs to view active syndicate details.</p>
            </div>
            <span className="text-[9px] bg-slate-100 text-slate-600 border border-slate-200 font-bold px-2 py-0.5 rounded">
              Gps Update: Realtime
            </span>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 py-4 items-center">
            
            {/* SVG India Grid Radar */}
            <div className="md:col-span-2 relative bg-slate-900 border border-slate-800 rounded-lg aspect-[4/3] w-full h-full flex items-center justify-center overflow-hidden">
              
              {/* Radar Sweeper and Grid Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(30,58,138,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,138,0.15)_1px,transparent_1px)] bg-[size:15px_15px]"></div>
              <div className="absolute w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_50%,rgba(29,78,216,0.1)_100%)] rounded-full animate-spin pointer-events-none" style={{ animationDuration: '8s' }}></div>

              {/* Mapped SVG Nodes */}
              <svg className="w-[85%] h-[85%] text-slate-800 stroke-current fill-none stroke-[1.2] relative z-10" viewBox="0 0 100 100">
                {/* Simplified border outline of India (Mock representation) */}
                <path d="M 50,5 L 60,15 L 75,18 L 85,25 L 90,38 L 82,48 L 78,60 L 68,75 L 50,95 L 40,82 L 35,70 L 22,64 L 15,55 L 8,42 L 20,35 L 28,32 L 34,22 L 40,12 Z" className="stroke-slate-700/60 stroke-dashed" />
                <path d="M 50,7 L 58,16 L 73,19 L 83,26 L 88,37 L 80,47 L 76,59 L 66,74 L 50,93 L 41,80 L 36,69 L 23,63 L 16,54 L 9,41 L 21,34 L 29,31 L 35,21 L 41,13 Z" className="stroke-gov-blue/20" />
                
                {/* Connecting border route lines */}
                <line x1="50" y1="50" x2="24" y2="13" stroke="rgba(230,95,43,0.15)" strokeDasharray="2,2" />
                <line x1="50" y1="50" x2="27" y2="77" stroke="rgba(29,126,216,0.15)" strokeDasharray="2,2" />
                
                {/* Grid Rings */}
                <circle cx="50" cy="50" r="15" className="stroke-slate-800" />
                <circle cx="50" cy="50" r="30" className="stroke-slate-800" />
                <circle cx="50" cy="50" r="45" className="stroke-slate-800" />
              </svg>

              {/* Hotspot buttons overlay mapping coordinates onto SVG percentage grid */}
              {mockMapHotspots.map(h => {
                // Map latitude/longitude ranges linearly to percentage coordinates for rendering
                // lat range roughly 8 (south) to 36 (north) -> 95% to 5% y-axis
                // lng range roughly 68 (west) to 97 (east) -> 5% to 95% x-axis
                const yPercent = 100 - ((h.lat - 8) / (36 - 8)) * 100;
                const xPercent = ((h.lng - 68) / (97 - 68)) * 100;
                
                const isSelected = selectedHotspot?.id === h.id;

                return (
                  <button
                    key={h.id}
                    onClick={() => setSelectedHotspot(h)}
                    style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group"
                  >
                    {/* Glowing outer rings for critical clusters */}
                    {h.severity === 'Critical' && (
                      <span className="absolute inline-flex h-6 w-6 rounded-full bg-saffron-alert/30 animate-ping opacity-60"></span>
                    )}
                    
                    {/* Core node dot */}
                    <span className={`relative flex h-3.5 w-3.5 rounded-full border-2 border-white transition-all shadow-md ${
                      isSelected 
                        ? 'bg-gov-blue scale-125 ring-4 ring-gov-blue/20' 
                        : h.severity === 'Critical' 
                          ? 'bg-saffron-alert' 
                          : h.severity === 'High' 
                            ? 'bg-amber-alert' 
                            : 'bg-gov-blue'
                    }`}>
                    </span>

                    {/* Simple city tooltip on hover */}
                    <span className="absolute left-4 -top-3 scale-0 group-hover:scale-100 bg-slate-950 text-white font-mono text-[9px] px-1.5 py-0.5 rounded shadow z-30 transition-all truncate pointer-events-none whitespace-nowrap">
                      {h.name}
                    </span>
                  </button>
                );
              })}

            </div>

            {/* Hotspot Information details sidebar */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg flex flex-col justify-between h-full text-xs">
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Hotspot Diagnostic</span>
                <h5 className="font-extrabold text-gov-navy font-outfit text-sm mt-1.5 flex items-center gap-1">
                  <MapPin size={14} className="text-saffron-alert shrink-0" />
                  {selectedHotspot.name}
                </h5>
                
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between border-b border-slate-200/60 pb-1 font-medium">
                    <span className="text-slate-400">Class:</span>
                    <span className="text-slate-800">{selectedHotspot.type}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1 font-medium">
                    <span className="text-slate-400">Monthly Cases:</span>
                    <span className="text-saffron-alert font-bold">{selectedHotspot.cases}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1 font-medium">
                    <span className="text-slate-400">SIM towers in grid:</span>
                    <span className="text-slate-800">{selectedHotspot.activeTowers}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1 font-medium">
                    <span className="text-slate-400">Risk Severity:</span>
                    <span className={`font-bold uppercase text-[9px] px-1.5 py-0.2 rounded border ${
                      selectedHotspot.severity === 'Critical' 
                        ? 'bg-red-50 text-red-500 border-red-200' 
                        : 'bg-amber-50 text-amber-600 border-amber-200'
                    }`}>
                      {selectedHotspot.severity}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1 font-medium">
                    <span className="text-slate-400">Operator GPS Node:</span>
                    <span className="text-slate-800 font-mono font-bold">
                      {operatorCoords ? `${operatorCoords.lat} N, ${operatorCoords.lng} E` : 'Locating...'}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 mt-3 leading-relaxed italic">
                  "{selectedHotspot.description}"
                </p>
              </div>

              {/* Action buttons matching tab router */}
              <div className="space-y-1.5 pt-3 border-t border-slate-200">
                <button
                  onClick={() => setActiveTab(selectedHotspot.id.includes('patna') ? 'currency' : 'arrest')}
                  className="w-full bg-gov-navy hover:bg-gov-blue text-white py-1.5 px-3 rounded text-[10px] font-bold shadow-sm transition-all flex items-center justify-center gap-1"
                >
                  Inspect Area Transcripts
                  <ChevronRight size={10} />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Coordinated Scam Trends Chart */}
        <div className="card-flat p-5 flex flex-col justify-between h-[450px]">
          <div>
            <h4 className="text-sm font-extrabold text-gov-navy font-outfit">Coordinated Scam Volume Trends</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Analysis mapping weekly caseload surges.</p>
          </div>
          
          <div className="h-56 w-full py-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ left: -25, right: 5 }}>
                <defs>
                  <linearGradient id="colorArrests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E65F2B" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#E65F2B" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMules" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" stroke="#94A3B8" fontSize={9} />
                <YAxis stroke="#94A3B8" fontSize={9} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', color: '#1E293B', fontSize: 10 }} />
                <Area type="monotone" dataKey="arrestScams" stroke="#E65F2B" strokeWidth={2} fillOpacity={1} fill="url(#colorArrests)" name="Digital Arrests" />
                <Area type="monotone" dataKey="moneyMules" stroke="#1D4ED8" strokeWidth={2} fillOpacity={1} fill="url(#colorMules)" name="Mule Transfers" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="border-t border-slate-100 pt-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Weekly Ring Caseload Breakdown</span>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-medium text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-saffron-alert rounded-full"></span>
                <span>Digital Arrests (+120%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-gov-blue rounded-full"></span>
                <span>Mule Cashouts (+42%)</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Grid: Bar Chart + Recent Cases logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Bar chart comparison */}
        <div className="card-flat p-5 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-extrabold text-gov-navy font-outfit">Hotspot Caseloads comparison</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Complaints attributed to major fraud syndicates.</p>
          </div>
          
          <div className="h-44 w-full py-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hotspotChartData} margin={{ left: -25 }}>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={9} />
                <YAxis stroke="#94A3B8" fontSize={9} allowDecimals={false} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', color: '#1E293B', fontSize: 10 }} />
                <Bar dataKey="cases" radius={[4, 4, 0, 0]}>
                  {hotspotChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="text-[9px] text-slate-400 leading-normal border-t border-slate-100 pt-2 font-mono">
            Saffron: Critical Risk. Orange: High Risk. Blue: Medium Risk.
          </div>
        </div>

        {/* Center: Law Enforcement Bulletins list */}
        <div className="card-flat p-5 flex flex-col justify-between h-[280px]">
          <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
            <div>
              <h4 className="text-sm font-extrabold text-gov-navy font-outfit">Recent Active Bulletins</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">National cybercrime alerts received today.</p>
            </div>
            <span className="text-[9px] bg-saffron-alert/10 text-saffron-alert font-bold px-2 py-0.5 rounded">
              Active Ticker
            </span>
          </div>

          <div className="divide-y divide-slate-150 overflow-y-auto max-h-[160px] pr-1 py-1 space-y-1.5">
            {liveAlerts.map(alert => (
              <div key={alert.id} className="pt-2 flex justify-between items-start gap-3 text-xs">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-slate-400">{alert.id}</span>
                    <span className="font-bold text-gov-navy font-outfit">{alert.title}</span>
                  </div>
                  <p className="text-slate-600 text-[10px] truncate mt-0.5">{alert.subtitle}</p>
                </div>
                <span className={`px-1.5 py-0.2 rounded font-bold text-[8px] uppercase tracking-wider shrink-0 ${
                  alert.status === 'Intercepted' ? 'bg-green-50 text-teal-success border border-green-200' :
                  alert.status === 'Frozen' ? 'bg-blue-50 text-gov-blue border border-blue-200' :
                  alert.status === 'Seized' ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-red-50 text-red-500 border border-red-200'
                }`}>
                  {alert.status}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-2 text-[9px] text-slate-400 flex justify-between">
            <span>Source: cybercrime.gov.in</span>
            <span className="font-bold text-gov-navy">Clearance Active</span>
          </div>
        </div>

        {/* Right: MHA Blockchain Registry Audit Ledger */}
        <div className="card-flat p-5 flex flex-col justify-between h-[280px]">
          <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
            <div>
              <h4 className="text-sm font-extrabold text-gov-navy font-outfit">MHA Blockchain Registry</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Evidence signature registry (Sec 65B IEA).</p>
            </div>
            <span className="text-[9px] bg-teal-50 text-teal-600 border border-teal-200 font-bold px-2 py-0.5 rounded">
              Sec 65B
            </span>
          </div>

          <div className="divide-y divide-slate-150 overflow-y-auto max-h-[160px] pr-1 py-1 space-y-1.5 font-mono text-[9px]">
            {blocks.map(block => (
              <div key={block.height} className="pt-2 flex justify-between items-center gap-2">
                <div>
                  <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                    <span>Block #{block.height}</span>
                    <span className="text-[7px] bg-slate-100 text-slate-500 px-1 rounded">{block.caseId}</span>
                  </div>
                  <div className="text-slate-400 text-[8px] truncate mt-0.5 max-w-[140px]">{block.hash}</div>
                </div>
                <div className="shrink-0 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse"></span>
                  <span className="text-teal-600 font-bold text-[8px] uppercase">Verified</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-2 text-[9px] text-slate-400 flex justify-between">
            <span>Ledger Nodes: 14 Active</span>
            <span className="font-bold text-teal-600">Integrity Signed</span>
          </div>
        </div>

      </div>

    </div>
  );
}
