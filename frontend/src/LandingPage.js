import React from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from 'motion/react';
import { Radar } from 'lucide-react';

import logoImg from './logo.jpeg'; 

const LOGO_URL = logoImg;
const CITY_IMAGE_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuAMXC93oMQLg9OS7PVkkaW204S44UXlFPPaKHOtbgCckzEdVONiBeHHiPX16SbL8XET3OEabPTKlFZFpEy54sHlTbQdPGJv0J3YRu32n-jrKH3--1ieGI4XDcrQzydNRqbJ9Xm43YTW5My9dzpqeTvYxrKsLL4-8mZMbKdtOyFIGmTKZHoJxc0sRxMRmU7DQYKW418U4hEXhcMUABRBpvpjg-aQI90J4-y_zGuS7nPe011YMgr1ESf-nFxVCmaOEGcT10QQquEVluG-";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div id="landing-brand-container" className="h-screen w-full bg-[#FEFBEA] text-black font-sans selection:bg-[#FFD600]/50 flex flex-col overflow-hidden relative">
      {/* Background Environment - Neo Brutalist geometric accents */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-32 -top-32 w-[350px] h-[350px] border-[16px] border-[#EAE3C8] rounded-full opacity-60"></div>
        <div className="absolute left-10 top-1/4 w-20 h-20 bg-[#F5E673] border-4 border-[#A5A08D] rotate-12 opacity-80 shadow-none"></div>
        <div className="absolute right-16 bottom-1/4 w-28 h-28 bg-[#FFA6C9] border-4 border-[#B098A3] -rotate-[15deg] opacity-80 shadow-none"></div>
      </div>

      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 py-4 md:py-6 text-center h-full">

        <div className="max-w-5xl w-full flex flex-col items-center gap-2 md:gap-3 flex-grow justify-evenly overflow-visible">
          {/* Top Identity & Typography */}
          <div className="flex flex-col items-center justify-center gap-0">
            {/* Branding Identity */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-shrink-0"
            >
              <div className="relative inline-block border-[4px] border-black shadow-[6px_6px_0px_#000] rounded-[24px] bg-white overflow-hidden w-20 h-20 md:w-[100px] md:h-[100px]">
                <img 
                  id="brand-logo"
                  alt="NagarNazar Logo" 
                  className="w-[90%] h-[90%] object-contain m-auto translate-y-1"
                  src={LOGO_URL}
                />
              </div>
            </motion.div>

      {/* Tagline */}
      <p className="tagline">

      </p>


            {/* Typography Cluster */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex-shrink-0 flex flex-col items-center justify-center mt-2"
            >
              <h1 id="main-heading" className="font-display text-[45px] md:text-[70px] font-black tracking-[-0.05em] uppercase leading-none m-0 pt-0">
                NAGAR<span className="text-[#3300FF]">NAZAR</span>
              </h1>
            </motion.div>

            {/* Subtitle Banner */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-shrink-0 bg-[#FF007F] px-4 py-1 border-[3px] border-black shadow-[4px_4px_0px_#000] transform -rotate-[1.5deg] mt-1 mb-2 z-10"
            >
              <p className="font-display text-[9px] md:text-[13px] text-white tracking-[0.15em] uppercase font-black m-0 leading-tight">
                APNE SHEHER KO DEKHO, SAMJHO AUR SURAKSHIT RAKHO
              </p>
            </motion.div>
          </div>

          {/* Description */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex-shrink-0 w-full max-w-[650px] bg-white px-6 py-5 border-[4px] border-black shadow-[8px_8px_0px_#000] z-0"
          >
            <p className="text-sm md:text-[18px] font-extrabold leading-snug tracking-tight text-center m-0">
              City utility data is scattered. <span className="text-[#3300FF] font-black underline decoration-[#3300FF] decoration-[3px] underline-offset-[3px] mx-1">NagarNazar visualizes<br className="hidden md:block"/> utilities in 2.5D</span> and predicts risk for smarter decisions.
            </p>
          </motion.div>

          {/* Visual Anchor: 2.5D City Visualization */}
          <motion.div 
            id="city-preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative flex-grow w-full max-w-[850px] max-h-[30vh] min-h-[0px] rounded-2xl overflow-hidden border-[6px] border-black shadow-[12px_12px_0px_#000] group bg-[#333]"
          >
            <img 
              alt="2.5D City Visualization" 
              className="w-full h-full object-cover opacity-90 transition-transform duration-700 grayscale" 
              src={CITY_IMAGE_URL}
            />
            
            {/* Center Radar Scanner overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div 
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="px-3 py-2 bg-[#00FF99] border-[3px] border-black shadow-[4px_4px_0px_#000] flex items-center justify-center gap-2"
              >
                <div className="relative flex items-center justify-center w-5 h-5 bg-black rounded-full overflow-hidden">
                  <div className="absolute w-[1px] h-[150%] bg-[#00FF99]/80 animate-[spin_2s_linear_infinite]"></div>
                  <Radar className="w-3 h-3 text-[#00FF99]" />
                </div>
                <span className="font-display text-[10px] md:text-sm uppercase tracking-widest font-black text-black pt-0.5">
                  Scanning Infrastructure...
                </span>
              </motion.div>
            </div>

            {/* Top Left Coordinate overlay */}
            <div className="absolute top-0 left-0 bg-black text-white px-3 py-1 font-display text-[8px] md:text-[10px] uppercase font-bold tracking-widest rounded-br-lg border-r-[3px] border-b-[3px] border-black">
              Coord: 28.6139° N, 77.2090° E
            </div>
          </motion.div>

          {/* Action Cluster */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex-shrink-0 flex flex-row items-center justify-center gap-4 md:gap-6 pt-0 pb-2"
          >
            <motion.button 
              id="btn-initialize"
              whileHover={{ translate: "-4px -4px", boxShadow: "12px 12px 0px #000" }}
              whileTap={{ translate: "2px 2px", boxShadow: "2px 2px 0px #000" }}
              className="px-6 md:px-12 py-2 md:py-3 font-display text-[11px] md:text-[14px] font-black uppercase tracking-wider bg-[#3300FF] text-white border-[4px] border-black shadow-[8px_8px_0px_#000] transition-all"
            >
              UPLOAD LOCATIONS FILE
            </motion.button>
            
            <motion.button 
              id="btn-explore"
              onClick={() => navigate("/dashboard")}
              whileHover={{ translate: "-4px -4px", boxShadow: "12px 12px 0px #000" }}
              whileTap={{ translate: "2px 2px", boxShadow: "2px 2px 0px #000" }}
              className="px-6 md:px-12 py-2 md:py-3 font-display text-[11px] md:text-[14px] font-black uppercase tracking-wider bg-white text-black border-[4px] border-black shadow-[8px_8px_0px_#000] transition-all"
            >
              EXPLORE MAP
            </motion.button>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
