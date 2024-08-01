'use client';

import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const fetchArrowPoints = async () => {
  const response = await fetch('/api/points'); // Endpoint für die JSON-Datei
  const data = await response.json();
  return data;
};

const ThreeJSPage = () => {
  useEffect(() => {
    const initializeScene = async () => {
      const arrowPoints = await fetchArrowPoints();

      // Szene erstellen
      const scene = new THREE.Scene();

      // Kamera erstellen
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      // Renderer erstellen
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById('threejsDiv').appendChild(renderer.domElement);

      // OrbitControls hinzufügen
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;

      // Innere Kugel-Geometrie erstellen
      const innerGeometry = new THREE.SphereGeometry(0.5, 16, 16);

      // Material für innere Kugel
      const innerMaterial = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        transparent: true,
        opacity: 0.5,
        wireframe: true
      });

      // Inneres Kugel-Mesh erstellen
      const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
      scene.add(innerSphere);

      // Äußere Kugel-Geometrie erstellen
      const outerGeometry = new THREE.SphereGeometry(1, 16, 16);

      // Material für äußere Kugel
      const outerMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.5,
        wireframe: true
      });

      // Äußeres Kugel-Mesh erstellen
      const outerSphere = new THREE.Mesh(outerGeometry, outerMaterial);
      scene.add(outerSphere);

      // Innere Vektorpfeil erstellen
      const innerArrowData = arrowPoints.coordinates.find(point => point.diameter === 1);
      if (innerArrowData) {
        const innerArrowDirection = new THREE.Vector3(innerArrowData.coordinates.x, innerArrowData.coordinates.y, innerArrowData.coordinates.z).normalize();
        const innerArrowOrigin = new THREE.Vector3(0, 0, 0);
        const innerArrowLength = 0.5; // Length matches the inner sphere radius
        const innerArrowColor = 0xff0000;
        const innerArrowHelper = new THREE.ArrowHelper(innerArrowDirection, innerArrowOrigin, innerArrowLength, innerArrowColor);
        scene.add(innerArrowHelper);
      }

      // Äußere Vektorpfeil erstellen
      const outerArrowData = arrowPoints.coordinates.find(point => point.diameter === 2);
      if (outerArrowData) {
        const outerArrowDirection = new THREE.Vector3(outerArrowData.coordinates.x, outerArrowData.coordinates.y, outerArrowData.coordinates.z).normalize();
        const outerArrowOrigin = new THREE.Vector3(0, 0, 0);
        const outerArrowLength = 1; // Length matches the outer sphere radius
        const outerArrowColor = 0xffff00;
        const outerArrowHelper = new THREE.ArrowHelper(outerArrowDirection, outerArrowOrigin, outerArrowLength, outerArrowColor);
        scene.add(outerArrowHelper);
      }

      // Render-Funktion
      const animate = function () {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };

      animate();

      // Fenstergröße anpassen
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    };

    initializeScene();
  }, []);

  return (
    <div>
      <h1>Three.js Chart in Next.js</h1>
      <div id="threejsDiv" style={{ width: '100%', height: '600px' }}></div>
    </div>
  );
};

export default ThreeJSPage;
