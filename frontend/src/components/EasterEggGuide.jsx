import React, { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const MAPAS = {
  'Shadows of Evil': [
    { titulo: '1. Los 4 Rituales', desc: 'Usa el modo Bestia para abrir los altares en cada distrito y derrota a los Margwas.' },
    { titulo: '2. Espadas de Apothicon', desc: 'Consigue el huevo en el Rift, cárgalo de almas y completa los círculos rojos.' },
    { titulo: '3. Batalla con el Shadowman', desc: 'Coloca la llave en el altar, baja su escudo disparando y atrápalos en el centro.' },
    { titulo: '4. Pasos Finales', desc: 'Electrifica las cajas de los trenes en modo Bestia mientras el gusano gigante está en el centro.' }
  ],
  'Der Eisendrache': [
    { titulo: '1. Los Arcos Elementales', desc: 'Alimenta los dragones y mejora tu arco elemental.' },
    { titulo: '2. Viaje al Pasado', desc: 'Dispara a los objetos con wisps para activar el teletransportador temporal.' },
    { titulo: '3. Códigos y Terminales', desc: 'Introduce el código de la caja fuerte y completa los paneles del Death Ray.' },
    { titulo: '4. Jefe Final', desc: 'Usa las Ragnaroks en las placas azules de la pirámide y ataca al Keeper.' }
  ]
};

export default function EasterEggGuide() {
  const [mapa, setMapa] = useState('Shadows of Evil');
  const [completados, setCompletados] = useState({});

  const toggle = (idx) => {
    const key = `${mapa}-${idx}`;
    setCompletados((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="guias" className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-black text-white text-center mb-6">Guía de Easter Eggs</h2>
      <div className="flex justify-center gap-3 mb-6">
        {Object.keys(MAPAS).map((m) => (
          <button
            key={m}
            onClick={() => setMapa(m)}
            className={`px-4 py-2 rounded-lg font-bold text-sm cursor-pointer ${mapa === m ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-900 text-zinc-300'}`}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {MAPAS[mapa].map((p, idx) => {
          const listo = !!completados[`${mapa}-${idx}`];
          return (
            <div
              key={idx}
              onClick={() => toggle(idx)}
              className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer ${listo ? 'bg-emerald-950/20 border-emerald-500/40 text-zinc-400' : 'bg-zinc-900 border-zinc-800 text-zinc-200'}`}
            >
              {listo ? <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" /> : <Circle className="w-6 h-6 text-zinc-600 shrink-0" />}
              <div>
                <h3 className={`font-bold ${listo ? 'line-through text-emerald-400' : 'text-white'}`}>{p.titulo}</h3>
                <p className="text-sm mt-1">{p.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}