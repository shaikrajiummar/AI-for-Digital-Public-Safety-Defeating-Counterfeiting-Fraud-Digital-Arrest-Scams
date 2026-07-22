import React, { useState } from 'react';
import { 
  Link2, FileText, CheckCircle2, 
  HelpCircle, RefreshCw, Layers, ShieldAlert 
} from 'lucide-react';
import { mockNetworkGraph } from '../data/mockData';

export default function FraudNetworkGraph() {
  const [nodes, setNodes] = useState(
    mockNetworkGraph.nodes.map((node, idx) => {
      // Pre-distribute coordinates in a nice circular ring to look organized
      const angle = (idx / mockNetworkGraph.nodes.length) * 2 * Math.PI;
      return {
        ...node,
        x: 350 + 180 * Math.cos(angle),
        y: 240 + 140 * Math.sin(angle),
        r: node.type === 'scammer' ? 24 : node.type === 'mule' ? 22 : 18
      };
    })
  );
  
  const [selectedNode, setSelectedNode] = useState(nodes[1]); // Default to caller node
  const [hoveredNode, setHoveredNode] = useState(null);
  const [draggedNode, setDraggedNode] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [packGenerated, setPackGenerated] = useState(false);

  // Drag handlers for node customization
  const handleMouseDown = (node, e) => {
    e.preventDefault();
    setDraggedNode(node.id);
    setSelectedNode(node);
  };

  const handleMouseMove = (e) => {
    if (!draggedNode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Constrain coordinates inside SVG viewbox dimensions
    const cx = Math.max(30, Math.min(rect.width - 30, x));
    const cy = Math.max(30, Math.min(rect.height - 30, y));

    setNodes(prev => prev.map(n => 
      n.id === draggedNode ? { ...n, x: cx, y: cy } : n
    ));
  };

  const handleMouseUp = () => {
    setDraggedNode(null);
  };

  // Run a quick force spring layout algorithm to organize clusters
  const runLayoutSimulation = () => {
    setIsSimulating(true);
    let count = 0;
    
    const timer = setInterval(() => {
      setNodes(prevNodes => {
        return prevNodes.map(n1 => {
          let fx = 0;
          let fy = 0;

          // 1. Repulsion between all node pairs (anti-overlap)
          prevNodes.forEach(n2 => {
            if (n1.id === n2.id) return;
            const dx = n1.x - n2.x;
            const dy = n1.y - n2.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            if (dist < 120) {
              const force = (120 - dist) / dist * 1.5;
              fx += (dx / dist) * force;
              fy += (dy / dist) * force;
            }
          });

          // 2. Attraction along direct links (spring pull)
          mockNetworkGraph.links.forEach(link => {
            if (link.source === n1.id || link.target === n1.id) {
              const otherId = link.source === n1.id ? link.target : link.source;
              const otherNode = prevNodes.find(n => n.id === otherId);
              if (otherNode) {
                const dx = otherNode.x - n1.x;
                const dy = otherNode.y - n1.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                const force = (dist - 110) / dist * 0.06;
                fx += dx * force;
                fy += dy * force;
              }
            }
          });

          // Damping/gravity pull to center
          const centerX = 350;
          const centerY = 240;
          fx += (centerX - n1.x) * 0.005;
          fy += (centerY - n1.y) * 0.005;

          return {
            ...n1,
            x: Math.max(30, Math.min(670, n1.x + fx)),
            y: Math.max(30, Math.min(450, n1.y + fy))
          };
        });
      });

      count++;
      if (count > 50) {
        clearInterval(timer);
        setIsSimulating(false);
      }
    }, 16);
  };

  const isLinked = (n1Id, n2Id) => {
    return mockNetworkGraph.links.some(l => 
      (l.source === n1Id && l.target === n2Id) || 
      (l.source === n2Id && l.target === n1Id)
    );
  };

  const getNodeColor = (type, isDimmed) => {
    if (isDimmed) return '#E2E8F0';
    if (type === 'scammer') return '#E65F2B'; // Saffron alert
    if (type === 'mule') return '#F1A208'; // Amber alert
    if (type === 'victim') return '#1D4ED8'; // Gov Blue
    return '#64748B'; // Slate gray
  };

  const getNodeStroke = (type) => {
    if (type === 'scammer') return '#C2410C';
    if (type === 'mule') return '#B45309';
    if (type === 'victim') return '#1E40AF';
    return '#475569';
  };

  const handleGeneratePack = () => {
    setPackGenerated(true);
  };

  return (
    <div className="space-y-6" id="network-graph-panel">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-black font-outfit text-gov-navy tracking-tight">Scam Syndicate Linkage Graph</h2>
          <p className="text-xs text-slate-500 font-medium">Relational network linking spoofed calls, money mule accounts, victim FIR reports, and SIM device fingerprints.</p>
        </div>
        <button 
          onClick={runLayoutSimulation}
          disabled={isSimulating}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gov-navy hover:bg-gov-blue text-white text-xs font-bold rounded-lg shadow-sm transition-all disabled:opacity-50"
        >
          <RefreshCw size={13} className={isSimulating ? 'animate-spin' : ''} />
          {isSimulating ? 'Arranging Nodes...' : 'Optimize Link Clusters'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Interactive Graph Viewport */}
        <div className="lg:col-span-2 card-flat p-5 flex flex-col justify-between h-[500px] relative bg-slate-900 overflow-hidden border-slate-800">
          
          {/* Legend Overlay */}
          <div className="absolute top-3 left-3 bg-slate-950/80 p-2.5 rounded border border-slate-800 text-[9px] text-slate-400 space-y-1 z-10 font-mono">
            <div className="font-bold text-white mb-1 uppercase text-[8px] tracking-wider border-b border-slate-800 pb-0.5">Graph Legend</div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-saffron-alert rounded-full"></span>
              <span>Scammer Cells</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-amber-alert rounded-full"></span>
              <span>Mule Accounts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-gov-blue rounded-full"></span>
              <span>Victims (Reports)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-slate-500 rounded-full"></span>
              <span>Device / IP Nodes</span>
            </div>
          </div>

          {/* SVG Viewport Canvas */}
          <svg 
            className="w-full h-full cursor-grab active:cursor-grabbing select-none"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Draw Links/Lines */}
            {mockNetworkGraph.links.map((link, idx) => {
              const sNode = nodes.find(n => n.id === link.source);
              const tNode = nodes.find(n => n.id === link.target);
              if (!sNode || !tNode) return null;

              const isHighlighted = 
                (hoveredNode && (hoveredNode === sNode.id || hoveredNode === tNode.id)) ||
                (selectedNode && (selectedNode.id === sNode.id || selectedNode.id === tNode.id));

              return (
                <g key={idx}>
                  <line 
                    x1={sNode.x}
                    y1={sNode.y}
                    x2={tNode.x}
                    y2={tNode.y}
                    stroke={isHighlighted ? '#1D4ED8' : '#334155'}
                    strokeWidth={isHighlighted ? 2.5 : 1}
                    className="transition-all duration-200"
                  />
                  {/* Subtle link relation text label visible on highlight */}
                  {isHighlighted && (
                    <text
                      x={(sNode.x + tNode.x) / 2}
                      y={(sNode.y + tNode.y) / 2 - 4}
                      textAnchor="middle"
                      fill="#94A3B8"
                      fontSize={7}
                      fontWeight="bold"
                      className="font-mono bg-slate-900 pointer-events-none"
                    >
                      {link.relation}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Draw Nodes */}
            {nodes.map(node => {
              const isSelected = selectedNode?.id === node.id;
              const isHovered = hoveredNode === node.id;
              
              // Dim other nodes if hover or selection is active
              const isDimmed = (hoveredNode && hoveredNode !== node.id && !isLinked(hoveredNode, node.id)) ||
                               (selectedNode && selectedNode.id !== node.id && !isLinked(selectedNode.id, node.id));

              return (
                <g 
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onMouseDown={(e) => handleMouseDown(node, e)}
                  className="cursor-pointer"
                >
                  {/* Glowing focus ring */}
                  {(isSelected || isHovered) && (
                    <circle 
                      r={node.r + 5}
                      fill="none"
                      stroke="#1D4ED8"
                      strokeWidth={1.5}
                      strokeOpacity={0.6}
                      className="animate-ping"
                      style={{ animationDuration: '3s' }}
                    />
                  )}

                  {/* Base Circle */}
                  <circle 
                    r={node.r}
                    fill={getNodeColor(node.type, isDimmed)}
                    stroke={isDimmed ? '#334155' : getNodeStroke(node.type)}
                    strokeWidth={isSelected ? 3 : 1.5}
                    className="transition-all duration-200"
                  />

                  {/* ID label inside circle */}
                  <text
                    textAnchor="middle"
                    dy=".3em"
                    fill={isDimmed ? '#94A3B8' : '#FFFFFF'}
                    fontSize={node.type === 'infrastructure' ? 6 : 8}
                    fontWeight="bold"
                    className="pointer-events-none font-mono"
                  >
                    {node.id}
                  </text>

                  {/* Full label text below circle */}
                  <text
                    y={node.r + 13}
                    textAnchor="middle"
                    fill={isSelected ? '#FFFFFF' : '#94A3B8'}
                    fontSize={8}
                    fontWeight={isSelected ? 'bold' : 'medium'}
                    fillOpacity={isDimmed ? 0.3 : 1}
                    className="pointer-events-none font-sans"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Quick Help Overlay */}
          <div className="absolute bottom-3 left-3 text-[9px] text-slate-500 font-mono flex items-center gap-1.5 bg-slate-950/60 p-1.5 rounded border border-slate-800">
            <HelpCircle size={11} className="text-slate-400" />
            <span>Interactive Graph: Drag nodes to rearrange. Click to inspect linkages.</span>
          </div>

        </div>

        {/* Right Column: Node Inspector & Court Evidence Generator */}
        <div className="card-flat p-5 flex flex-col justify-between h-[500px] bg-slate-50/50">
          
          {/* Node Inspector */}
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-2">
              <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Node details inspector</span>
              <h3 className="text-sm font-extrabold text-gov-navy font-outfit mt-1 flex items-center gap-1.5">
                <Layers size={14} className="text-gov-blue" />
                {selectedNode.label}
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">Entity Details</span>
                <p className="p-3 bg-white border border-slate-200 rounded-lg text-slate-700 leading-relaxed font-medium">
                  {selectedNode.details}
                </p>
              </div>

              {/* Connections list */}
              <div>
                <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">Direct Syndicate Connections</span>
                <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
                  {nodes
                    .filter(n => n.id !== selectedNode.id && isLinked(selectedNode.id, n.id))
                    .map(cNode => (
                      <button
                        key={cNode.id}
                        onClick={() => setSelectedNode(cNode)}
                        className="w-full text-left p-2 bg-white border border-slate-200 hover:border-slate-350 rounded flex justify-between items-center text-[10px] transition-all font-medium text-slate-700"
                      >
                        <span>{cNode.label}</span>
                        <Link2 size={11} className="text-gov-navy" />
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Evidence Packager */}
          <div className="border-t border-slate-200 pt-4 space-y-3">
            
            {packGenerated ? (
              <div className="bg-white border border-slate-200 p-3.5 rounded-lg text-center text-[10px] font-mono leading-normal">
                <CheckCircle2 size={22} className="text-teal-success mx-auto mb-2 animate-bounce" />
                <span className="text-gov-navy font-bold block uppercase text-xs">INTELLIGENCE PACKAGE COMPILED</span>
                Evidence bundle signed digitally & locked. Ready for transmission to court jurisdictions.
              </div>
            ) : (
              <div className="space-y-2">
                <div className="p-3 bg-blue-50 border border-blue-200 text-gov-navy rounded-lg text-[10px] leading-relaxed flex items-start gap-2">
                  <ShieldAlert className="shrink-0 mt-0.5 text-gov-navy" size={14} />
                  <div>
                    <span className="font-bold block uppercase text-[9px] text-gov-navy mb-0.5">Court Admissibility</span>
                    Package links call recordings, VoIP IMEI headers, and banking trails into signed police evidence portfolios.
                  </div>
                </div>

                <button
                  onClick={handleGeneratePack}
                  className="w-full bg-gov-navy hover:bg-gov-blue text-white font-bold py-2 rounded shadow-sm text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <FileText size={12} />
                  Generate Case Evidence Pack
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
