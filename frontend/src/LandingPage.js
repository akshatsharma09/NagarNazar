import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const CityNetworkAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const cols = 4;
    const rows = 3;
    const zones = [];

    // Create city zones
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        zones.push({
          x: (canvas.width / cols) * i,
          y: (canvas.height / rows) * j,
          w: canvas.width / cols,
          h: canvas.height / rows,
          label: String.fromCharCode(65 + i) + (j + 1)
        });
      }
    }

    const nodes = [];
    for (let i = 0; i < 30; i++) {
      // Risk: 0=Low(Green), 1=Medium(Yellow), 2=High(Red)
      const risk = Math.random() > 0.85 ? 2 : Math.random() > 0.5 ? 1 : 0;
      let color = '#4ade80'; // low (green)
      if (risk === 1) color = '#facc15'; // med (yellow)
      if (risk === 2) color = '#f87171'; // high (red)

      // Node type: 0=Water(Blue), 1=Sewage(Purple), 2=Electricity(Orange)
      const type = Math.floor(Math.random() * 3);
      let lineColor = '#3b82f6'; // water (blue)
      if (type === 1) lineColor = '#a855f7'; // sewage (purple)
      if (type === 2) lineColor = '#f97316'; // electricity (orange)

      nodes.push({
        x: Math.random() * (canvas.width - 40) + 20,
        y: Math.random() * (canvas.height - 40) + 20,
        baseX: 0,
        baseY: 0,
        radius: risk === 2 ? 5 : risk === 1 ? 4 : 3,
        color,
        lineColor,
        risk,
        type,
        pulse: Math.random() * Math.PI * 2,
        connections: []
      });
    }

    nodes.forEach(node => {
      node.baseX = node.x;
      node.baseY = node.y;
    });

    nodes.forEach((node, i) => {
      nodes.forEach((other, j) => {
        if (i !== j) {
          const dist = Math.hypot(node.x - other.x, node.y - other.y);
          if (dist < 120 && Math.random() > 0.5) {
            node.connections.push(other);
          }
        }
      });
    });

    const particles = [];
    for (let i = 0; i < 30; i++) {
      const startNode = nodes[Math.floor(Math.random() * nodes.length)];
      if (startNode && startNode.connections.length > 0) {
        const endNode = startNode.connections[Math.floor(Math.random() * startNode.connections.length)];
        particles.push({
          start: startNode,
          end: endNode,
          progress: Math.random(),
          speed: 0.005 + Math.random() * 0.01 + (startNode.risk * 0.005),
        });
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0a0a0c';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw zones
      zones.forEach((zone, idx) => {
        ctx.fillStyle = idx % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.05)';
        ctx.fillRect(zone.x + 10, zone.y + 10, zone.w - 20, zone.h - 20);
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 1;
        ctx.strokeRect(zone.x + 10, zone.y + 10, zone.w - 20, zone.h - 20);

        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.font = 'bold 10px monospace';
        ctx.fillText(`ZONE ${zone.label}`, zone.x + 20, zone.y + 25);
      });

      // Cluster highlight for high risk areas
      nodes.forEach(node => {
        if (node.risk === 2) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 45, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 45);
          gradient.addColorStop(0, 'rgba(248, 113, 113, 0.15)');
          gradient.addColorStop(1, 'rgba(248, 113, 113, 0)');
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      // Draw connections
      nodes.forEach(node => {
        node.connections.forEach(other => {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);

          let opacity = 0.3;
          // Flicker effect for high risk connections
          if (node.risk === 2 && Math.random() > 0.95) opacity = Math.random() * 0.8 + 0.2;

          ctx.strokeStyle = node.lineColor;
          ctx.globalAlpha = opacity;
          ctx.lineWidth = node.risk === 2 ? 1.5 : 1;
          ctx.stroke();
          ctx.globalAlpha = 1.0;
        });
      });

      // Update and draw particles
      particles.forEach(p => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.start = p.end;
          if (p.start.connections.length > 0) {
            p.end = p.start.connections[Math.floor(Math.random() * p.start.connections.length)];
            p.progress = 0;
            p.speed = 0.005 + Math.random() * 0.01 + (p.start.risk * 0.005);
          } else {
            p.start = nodes[Math.floor(Math.random() * nodes.length)];
            if (p.start && p.start.connections.length > 0) {
              p.end = p.start.connections[Math.floor(Math.random() * p.start.connections.length)];
            }
            p.progress = 0;
          }
        }

        if (p.start && p.end) {
          let x = p.start.x + (p.end.x - p.start.x) * p.progress;
          let y = p.start.y + (p.end.y - p.start.y) * p.progress;

          if (p.start.risk === 2) {
            x += (Math.random() - 0.5) * 3;
            y += (Math.random() - 0.5) * 3;
          }

          ctx.beginPath();
          ctx.arc(x, y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = p.start.lineColor;
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.start.lineColor;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Draw nodes
      nodes.forEach((node) => {
        node.pulse += node.risk === 2 ? 0.015 : 0.04;
        node.x = node.baseX + Math.sin(node.pulse * 0.5) * 2;
        node.y = node.baseY + Math.cos(node.pulse * 0.5) * 2;

        ctx.beginPath();
        let pulseMultiplier = node.risk === 2 ? 3 : node.risk === 1 ? 1.5 : 0.5;
        // Blink effect for high risk
        let isFlashing = node.risk === 2 && Math.random() > 0.98;
        if (isFlashing) pulseMultiplier = 8;

        const pulseRadius = node.radius + Math.sin(node.pulse) * pulseMultiplier;
        ctx.arc(node.x, node.y, Math.max(0, pulseRadius), 0, Math.PI * 2);
        ctx.fillStyle = isFlashing ? '#ffffff' : node.color;

        ctx.shadowBlur = (node.risk === 2 ? 30 : node.risk === 1 ? 15 : 5) + Math.sin(node.pulse) * 5;
        ctx.shadowColor = node.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full rounded-xl" />;
};

const LandingPage = () => {
  return (
    <div className="bg-[#0B0F19] font-body-md text-zinc-400 overflow-x-hidden min-h-screen flex flex-col relative transition-opacity duration-700 ease-in-out">
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-[#05080f]"></div>
      {/* TopNavBar */}
      <nav className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 max-w-7xl mx-auto w-full bg-[#111827]/90 backdrop-blur-md rounded-full border border-white/10 mx-4 mt-6 shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)] relative z-10 border-b-[1px] border-b-white/10">
        <div className="text-3xl font-black tracking-tighter uppercase text-yellow-400 italic drop-shadow-[0_0_10px_rgba(250,204,21,0.3)]">NagarNazar</div>
        <div className="hidden md:flex gap-8 items-center bg-white/5 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10">
          <Link className="font-['Plus_Jakarta_Sans'] font-bold text-lg uppercase text-zinc-300 hover:text-white hover:scale-105 transition-all relative group" to="/reports">
            Reports
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-yellow-400 transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"></span>
          </Link>
          <Link className="font-['Plus_Jakarta_Sans'] font-bold text-lg uppercase text-zinc-300 hover:text-white hover:scale-105 transition-all relative group" to="/maintenance">
            Maintenance
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-yellow-400 transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"></span>
          </Link>
          <Link className="font-['Plus_Jakarta_Sans'] font-bold text-lg uppercase text-zinc-300 hover:text-white hover:scale-105 transition-all relative group" to="/pricing">
            Plans
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-yellow-400 transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"></span>
          </Link>
        </div>
      </nav>

      {/* HeroSection */}
      <section className="max-w-7xl mx-auto px-container-padding py-20 flex flex-col md:flex-row items-center gap-12 flex-grow relative z-10">
        <div className="flex-1 space-y-8">
          <div className="inline-block bg-white/5 border border-white/10 px-4 py-1 rounded-full text-zinc-300 font-bold uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(255,255,255,0.05)] backdrop-blur-sm">
            Smart City Solution
          </div>
          <h1 className="font-headline-xl text-headline-xl text-white uppercase leading-none drop-shadow-md">
            Apne Seher ko<span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]"> Dekho, Samjho aur Surakshit</span> rakho
          </h1>
          <p className="font-body-lg text-body-lg text-zinc-400 max-w-xl">
            The pulse of the streets in real-time. Detect leaks, monitor sewage, and manage city power with a vibrant, high-energy dashboard built for action.
          </p>
          <div className="flex flex-wrap gap-6 mt-8">
            <Link className="bg-gradient-to-r from-yellow-400 to-orange-500 px-8 py-4 rounded-xl text-black font-black text-xl shadow-[0_0_20px_rgba(255,200,0,0.4)] hover:scale-105 hover:-translate-y-1 transition-all duration-300 uppercase flex items-center gap-3" to="/dashboard">
              View Dashboard
              <span className="material-symbols-outlined"></span>
            </Link>
          </div>
        </div>
        <div className="flex-1 relative z-10">
          <div className="bg-[#0F172A] border border-white/10 rounded-[16px] p-2 shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden h-[500px] relative group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)] hover:-translate-y-2">
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(255,255,255,0.02)] rounded-[16px]"></div>
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full border border-white/20 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full border border-white/20 shadow-[0_0_10px_rgba(250,204,21,0.8)]"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full border border-white/20 shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
            </div>
            <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl flex flex-col gap-1 items-end shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <p className="font-bold text-sm uppercase flex items-center gap-2 text-white/90 tracking-widest">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                Active Risk Detection
              </p>
              <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                Live Utility Monitoring System
              </p>
            </div>
            <div className="w-full h-full rounded-lg border border-white/5 overflow-hidden relative">
              <CityNetworkAnimation />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;