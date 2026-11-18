import React from 'react';
import MysteryBox3D from './components/MysteryBox3D';
import EasterEggGuide from './components/EasterEggGuide';
import CommunityTips from './components/CommunityTips';
import ContactForm from './components/ContactForm';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <nav className="border-b border-zinc-800 bg-zinc-950 sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <span className="font-black text-lg text-white">COD BO3 <span className="text-amber-500">ZOMBIES</span></span>
        <div className="space-x-6 text-sm text-zinc-300 hidden sm:block">
          <a href="#guias" className="hover:text-amber-400">Guías</a>
          <a href="#tips" className="hover:text-amber-400">Tips</a>
          <a href="#contacto" className="hover:text-amber-400">Contacto</a>
        </div>
      </nav>
      <MysteryBox3D />
      <EasterEggGuide />
      <CommunityTips />
      <ContactForm />
    </div>
  );
}