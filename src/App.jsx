import React, { useState, useEffect } from 'react';
import { 
  Shield, Activity, PhoneCall, Landmark, Network, 
  HelpCircle, UserCheck
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import ArrestScamDetector from './components/ArrestScamDetector';
import CurrencyNoteScanner from './components/CurrencyNoteScanner';
import FraudNetworkGraph from './components/FraudNetworkGraph';
import CitizenFraudShield from './components/CitizenFraudShield';
import { mockRecentCases } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState('agency'); // 'agency', 'finance', 'citizen'
  const [liveAlerts] = useState(mockRecentCases);
  const [tickerIndex, setTickerIndex] = useState(0);

  // Simple live ticker animation simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % liveAlerts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [liveAlerts]);

  // Tab definitions with roles
  const tabs = [
    { id: 'dashboard', label: 'Command Center', icon: Activity, roles: ['agency', 'finance', 'citizen'] },
    { id: 'arrest', label: 'Digital Arrest Analyzer', icon: PhoneCall, roles: ['agency'] },
    { id: 'currency', label: 'FICN Note Verifier', icon: Landmark, roles: ['finance'] },
    { id: 'network', label: 'Syndicate Linkage Graph', icon: Network, roles: ['agency'] },
    { id: 'citizen', label: 'Citizen Safety Shield', icon: HelpCircle, roles: ['citizen', 'agency'] },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      
      {/* Top Ministry Banner */}
      <div className="bg-[#0B1E36] text-white text-[10px] px-6 py-1.5 flex justify-between items-center font-mono border-b border-[#1E3B5C]">
        <div className="flex items-center gap-4">
          <span>MINISTRY OF HOME AFFAIRS (MHA)</span>
          <span className="hidden sm:inline text-[#E65F2B]">●</span>
          <span className="hidden sm:inline">CYBER COORDINATION CENTRE (I4C)</span>
        </div>
        <div className="flex items-center gap-3 text-slate-300">
          <span>PORTAL VER: 2026.04</span>
          <span>●</span>
          <span>STATUS: ONLINE</span>
        </div>
      </div>

      {/* Main Clean Portal Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 gov-header-shadow z-15">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gov-navy to-gov-blue flex items-center justify-center text-white shadow-md">
            <Shield size={22} className="stroke-[1.8]" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold font-outfit text-gov-navy leading-tight flex items-center gap-2">
              KAWACH AI 
              <span className="text-[10px] bg-saffron-alert/10 text-saffron-alert border border-saffron-alert/20 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                Threat Intelligence
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">Digital Public Safety & Anti-Fraud Command Portal</p>
          </div>
        </div>

        {/* Role Switching Control Panel */}
        <div className="flex items-center gap-3 self-stretch md:self-auto bg-slate-50 border border-slate-200 p-1.5 rounded-lg">
          <span className="text-[10px] font-bold text-slate-500 uppercase px-2 flex items-center gap-1">
            <UserCheck size={12} className="text-gov-navy" />
            Access Persona:
          </span>
          <div className="grid grid-cols-3 gap-1 w-full md:w-auto">
            {[
              { id: 'agency', label: 'Agency Officer' },
              { id: 'finance', label: 'Bank Teller' },
              { id: 'citizen', label: 'Citizen Guard' }
            ].map(r => (
              <button
                key={r.id}
                onClick={() => {
                  setUserRole(r.id);
                  // Auto-switch to dashboard when changing role if current tab is restricted
                  const tabObj = tabs.find(t => t.id === activeTab);
                  if (tabObj && !tabObj.roles.includes(r.id)) {
                    setActiveTab('dashboard');
                  }
                }}
                className={`text-[10px] font-bold py-1 px-3 rounded transition-all truncate ${
                  userRole === r.id 
                    ? 'bg-gov-navy text-white shadow-sm' 
                    : 'text-slate-600 hover:text-gov-navy hover:bg-slate-200'
                }`}
                id={`role-select-${r.id}`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Live Threat Alert Bar Ticker */}
      <div className="bg-slate-100 border-b border-slate-200 py-2 px-6 flex items-center justify-between text-xs overflow-hidden h-9">
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 bg-saffron-alert/10 border border-saffron-alert/30 text-saffron-alert text-[9px] font-bold px-2 py-0.5 rounded-full">
            <span className="pulse-dot text-saffron-alert"></span>
            LIVE INTEL BULLETIN
          </span>
        </div>
        <div className="flex-1 px-4 truncate font-medium text-slate-700 transition-all duration-500">
          <span className="text-slate-400 font-mono text-[10px] mr-2">{liveAlerts[tickerIndex].id}</span>
          <span className="font-bold text-gov-navy mr-1.5">{liveAlerts[tickerIndex].title}:</span>
          <span>{liveAlerts[tickerIndex].subtitle}</span>
          <span className="text-slate-400 font-mono text-[9px] ml-2">({liveAlerts[tickerIndex].location})</span>
        </div>
        <div className="text-[10px] text-slate-500 font-mono hidden md:block shrink-0">
          Shift Coordinate: <span className="font-bold text-slate-800">ZONE-NORTH_04</span>
        </div>
      </div>

      {/* Tab Navigation Menu */}
      <div className="bg-white border-b border-slate-200 px-6">
        <div className="flex gap-2 -mb-px overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isTabActive = activeTab === tab.id;
            const isRoleAllowed = tab.roles.includes(userRole);

            return (
              <button
                key={tab.id}
                onClick={() => isRoleAllowed && setActiveTab(tab.id)}
                disabled={!isRoleAllowed}
                className={`flex items-center gap-2 py-3.5 px-4 font-outfit text-xs font-bold transition-all border-b-2 tracking-wide shrink-0 ${
                  !isRoleAllowed 
                    ? 'opacity-40 cursor-not-allowed border-transparent text-slate-400' 
                    : isTabActive 
                      ? 'border-gov-navy text-gov-navy bg-slate-50/50' 
                      : 'border-transparent text-slate-600 hover:text-gov-navy hover:border-slate-300'
                }`}
                id={`tab-link-${tab.id}`}
                title={!isRoleAllowed ? `Access restricted to ${tab.roles.join('/')} roles` : ''}
              >
                <Icon size={14} className={isTabActive ? 'text-gov-navy' : 'text-slate-500'} />
                {tab.label}
                {!isRoleAllowed && (
                  <span className="text-[8px] bg-slate-200 text-slate-500 px-1 py-0.2 rounded uppercase scale-90">
                    Restricted
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Dashboard Container */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        {activeTab === 'dashboard' && (
          <Dashboard 
            userRole={userRole} 
            liveAlerts={liveAlerts}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'arrest' && (
          <ArrestScamDetector />
        )}

        {activeTab === 'currency' && (
          <CurrencyNoteScanner />
        )}

        {activeTab === 'network' && (
          <FraudNetworkGraph />
        )}

        {activeTab === 'citizen' && (
          <CitizenFraudShield />
        )}
      </main>

      {/* Official Gov Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-6 text-center text-[10px] text-slate-500 font-medium">
        <div className="flex flex-wrap justify-center gap-6 mb-3">
          <a href="#cybercrime" className="hover:text-gov-navy transition-colors">National Cyber Crime Reporting Portal</a>
          <span>●</span>
          <a href="#mha" className="hover:text-gov-navy transition-colors">Ministry of Home Affairs (MHA)</a>
          <span>●</span>
          <a href="#rbi" className="hover:text-gov-navy transition-colors">Reserve Bank of India Security Chest</a>
        </div>
        <p className="max-w-2xl mx-auto leading-relaxed">
          Kawach AI Platform is an integrated public safety simulation sandbox dashboard. Mapped tower signals, transcript feeds, and network nodes are simulated for training, operational analysis, and proof-of-concept demonstration purposes.
        </p>
        <p className="mt-2 text-slate-400 font-mono text-[9px]">
          © 2026 National Cyber Crime Portal Intelligence Command. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
}
