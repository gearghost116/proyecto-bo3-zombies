import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function MysteryBox3D() {
  const mountRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const isOpenRef = useRef(false);

  const toggleBox = () => {
    const next = !isOpenRef.current;
    isOpenRef.current = next;
    setIsOpen(next);
  };

  useEffect(() => {
    const container = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 2.5, 6);
    camera.lookAt(0, 0.6, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dirLight = new THREE.DirectionalLight(0xffb703, 1.8);
    dirLight.position.set(4, 8, 5);
    scene.add(dirLight);

    const innerLight = new THREE.PointLight(0xffaa00, 0, 8);
    innerLight.position.set(0, 1, 0);
    scene.add(innerLight);

    const boxGroup = new THREE.Group();
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x3b2313, roughness: 0.8 });
    const metalMat = new THREE.MeshStandardMaterial({ color: 0x27272a, metalness: 0.8 });
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xffd166 });

    const base = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.1, 1.3), woodMat);
    base.position.y = 0.55;
    boxGroup.add(base);

    [-1.6, 0, 1.6].forEach((x) => {
      const strap = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.14, 1.34), metalMat);
      strap.position.set(x, 0.55, 0);
      boxGroup.add(strap);
    });

    const lidPivot = new THREE.Group();
    lidPivot.position.set(0, 1.1, -0.65);
    const lid = new THREE.Mesh(new THREE.BoxGeometry(3.44, 0.25, 1.34), woodMat);
    lid.position.set(0, 0.125, 0.65);
    lidPivot.add(lid);

    [-0.9, 0.9].forEach((x) => {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.05, 0.45), glowMat);
      bar.position.set(x, 0.26, 0.55);
      const dot = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.05, 0.15), glowMat);
      dot.position.set(x, 0.26, 0.9);
      lidPivot.add(bar, dot);
    });
    boxGroup.add(lidPivot);

    const weapon = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.2, 1.2, 12),
      new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.7 })
    );
    weapon.rotation.z = Math.PI / 2;
    weapon.position.set(0, 1.4, 0);
    weapon.visible = false;
    boxGroup.add(weapon);

    scene.add(boxGroup);

    let isDragging = false;
    let prevX = 0;
    let targetRotY = 0.4;

    const onDown = (e) => { isDragging = true; prevX = e.clientX; };
    const onMove = (e) => {
      if (!isDragging) return;
      targetRotY += (e.clientX - prevX) * 0.01;
      prevX = e.clientX;
    };
    const onUp = () => { isDragging = false; };

    renderer.domElement.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging && !isOpenRef.current) targetRotY += 0.005;
      boxGroup.rotation.y += (targetRotY - boxGroup.rotation.y) * 0.08;

      const targetLid = isOpenRef.current ? -Math.PI / 2.3 : 0;
      lidPivot.rotation.x += (targetLid - lidPivot.rotation.x) * 0.1;

      if (isOpenRef.current) {
        innerLight.intensity = 4;
        weapon.visible = true;
        weapon.rotation.y += 0.04;
      } else {
        innerLight.intensity = 0;
        weapon.visible = false;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.domElement.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
          Modelo 3D Interactivo • Three.js
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white mt-4 mb-4">
          Guía Easter Eggs <span className="text-amber-500">COD BO3</span>
        </h1>
        <p className="text-zinc-400 mb-6">
          Consulta los pasos de los mapas de Zombies, deja tus tips y prueba la Caja Misteriosa interactiva.
        </p>
        <button
          onClick={toggleBox}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black rounded-lg cursor-pointer transition"
        >
          {isOpen ? 'Cerrar Caja (950 pts)' : 'Abrir Caja Misteriosa (950 pts)'}
        </button>
      </div>
      <div
        ref={mountRef}
        className="w-full h-[360px] bg-zinc-900/80 rounded-2xl border border-amber-500/30 cursor-grab"
      />
    </section>
  );
}