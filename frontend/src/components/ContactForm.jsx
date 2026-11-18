import React, { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });
  const [res, setRes] = useState(null);

  const enviar = async (e) => {
    e.preventDefault();
    try {
      const peticion = await fetch('http://localhost:3001/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await peticion.json();
      if (data.exito) {
        setRes({ ok: true, texto: data.mensajeServidor });
        setForm({ nombre: '', email: '', mensaje: '' });
      }
    } catch (err) {
      setRes({ ok: false, texto: 'Error: enciende el servidor backend con "node server.js".' });
    }
  };

  return (
    <section id="contacto" className="max-w-xl mx-auto px-4 py-12">
      <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
        <h2 className="text-2xl font-black text-white text-center mb-4">Contacto</h2>
        <form onSubmit={enviar} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            required
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-white"
          />
          <input
            type="email"
            placeholder="Correo"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-white"
          />
          <textarea
            rows="3"
            placeholder="Mensaje"
            required
            value={form.mensaje}
            onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
            className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-white"
          />
          <button type="submit" className="w-full py-2.5 bg-amber-500 text-zinc-950 font-black rounded-lg cursor-pointer">
            Enviar al Servidor
          </button>
        </form>
        {res && (
          <div className={`mt-4 p-3 rounded-lg text-sm ${res.ok ? 'bg-emerald-950 text-emerald-300 border border-emerald-500' : 'bg-red-950 text-red-300'}`}>
            {res.texto}
          </div>
        )}
      </div>
    </section>
  );
}