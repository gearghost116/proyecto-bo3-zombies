import React, { useState } from 'react';

export default function CommunityTips() {
  const [tips, setTips] = useState([
    { id: 1, autor: 'Richtofen', mapa: 'Der Eisendrache', texto: 'Lleva Near Death Experience para revivir infinitamente en solitario.' }
  ]);
  const [autor, setAutor] = useState('');
  const [mapa, setMapa] = useState('Shadows of Evil');
  const [texto, setTexto] = useState('');

  const agregar = (e) => {
    e.preventDefault();
    if (!autor.trim() || !texto.trim()) return;
    setTips([{ id: Date.now(), autor, mapa, texto }, ...tips]);
    setAutor('');
    setTexto('');
  };

  return (
    <section id="tips" className="bg-zinc-900/50 border-y border-zinc-800 py-12 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <form onSubmit={agregar} className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 space-y-3 h-fit">
          <h3 className="font-bold text-amber-400">Deja tu Tip</h3>
          <input
            type="text"
            placeholder="Tu nombre"
            required
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-white"
          />
          <select
            value={mapa}
            onChange={(e) => setMapa(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-white"
          >
            <option>Shadows of Evil</option>
            <option>Der Eisendrache</option>
          </select>
          <textarea
            rows="3"
            placeholder="Escribe tu consejo..."
            required
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-white"
          />
          <button type="submit" className="w-full py-2 bg-amber-500 text-zinc-950 font-bold rounded-lg cursor-pointer">
            Publicar Tip
          </button>
        </form>
        <div className="md:col-span-2 space-y-3">
          {tips.map((t) => (
            <div key={t.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
              <span className="font-bold text-white text-sm">{t.autor}</span>
              <span className="ml-2 text-xs px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full">{t.mapa}</span>
              <p className="text-zinc-300 text-sm mt-1">{t.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}