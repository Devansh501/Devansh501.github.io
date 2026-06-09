import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import LightRays from './LightRays';

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/20 relative">
      {location.pathname === '/' && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <LightRays 
            raysColor="#ffffff" 
            raysSpeed={1.5}
            lightSpread={5.0}
            rayLength={0.5}
            pulsating={false}
            followMouse={false}
            saturation={1.5}
          />
        </div>
      )}
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
