import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function Hero3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    mountRef.current.innerHTML = '';

    let isHovering = false;
    let isAssemblyComplete = false;
    let originalTargetPosArr = null;
    let lastMouseMoveTime = Date.now();
    let animationFrameId;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x111111, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // 레티나 디스플레이 대응, 2 이상은 성능 저하
    mountRef.current.appendChild(renderer.domElement);

    const particleCount = 400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorGold = new THREE.Color(0xfccd4d);
    const colorWhite = new THREE.Color(0xffffff);
    const radius = 200;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4000;

      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      
      targetPositions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      targetPositions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      targetPositions[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = Math.random() > 0.3 ? colorGold : colorWhite;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3)); 
    originalTargetPosArr = new Float32Array(targetPositions);

    const particleMaterial = new THREE.PointsMaterial({
      size: 4.5, 
      vertexColors: true, 
      transparent: true,
      opacity: 0.8, 
      blending: THREE.AdditiveBlending, 
      depthTest: false
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    const connections = [];
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = targetPositions[i * 3] - targetPositions[j * 3];
        const dy = targetPositions[i * 3 + 1] - targetPositions[j * 3 + 1];
        const dz = targetPositions[i * 3 + 2] - targetPositions[j * 3 + 2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 60) connections.push(i, j);
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(connections.length * 3 * 2);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff, 
      transparent: true, 
      opacity: 0.08, 
      blending: THREE.AdditiveBlending
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    const posAttribute = geometry.attributes.position;
    
    gsap.fromTo(camera.position,
      { z: 1500, y: -200 }, 
      { z: 450, y: 0, duration: 4, ease: "power4.out" }
    );

    for (let i = 0; i < particleCount; i++) {
      gsap.to(posAttribute.array, {
        [i * 3]: targetPositions[i * 3],
        [i * 3 + 1]: targetPositions[i * 3 + 1],
        [i * 3 + 2]: targetPositions[i * 3 + 2],
        duration: 2.5 + Math.random() * 1.5,
        ease: "back.out(2.5)", 
        delay: 0.5 + Math.random() * 1.5,
        onUpdate: () => { posAttribute.needsUpdate = true; }
      });
    }

    const assemblyTimeout = setTimeout(() => { isAssemblyComplete = true; }, 4500);

    const raycaster = new THREE.Raycaster();
    const mouseVec = new THREE.Vector2();
    const interactionPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const mouse3DTarget = new THREE.Vector3();
    let mouseX = 0, mouseY = 0;

    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      mouseVec.set(mouseX, mouseY);
      lastMouseMoveTime = Date.now();
      isHovering = true;
    };
    
    const onMouseLeave = () => { isHovering = false; };

    window.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseleave', onMouseLeave);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;
      const isIdle = (Date.now() - lastMouseMoveTime) > 5000;

      camera.position.x += (mouseX * 50 - camera.position.x) * 0.03;
      camera.position.y += (mouseY * 50 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      particles.rotation.y += 0.0008;
      linesMesh.rotation.y += 0.0008;

      if (isAssemblyComplete) {
        raycaster.setFromCamera(mouseVec, camera);
        raycaster.ray.intersectPlane(interactionPlane, mouse3DTarget);
        const localMouse = mouse3DTarget.clone();
        const invRotation = new THREE.Matrix4().extractRotation(particles.matrixWorld).invert();
        localMouse.applyMatrix4(invRotation);

        for (let i = 0; i < particleCount; i++) {
          const baseX = originalTargetPosArr[i * 3];
          const baseY = originalTargetPosArr[i * 3 + 1];
          const baseZ = originalTargetPosArr[i * 3 + 2];
          let targetX = baseX, targetY = baseY, targetZ = baseZ;

          if (isHovering && !isIdle) {
            const dx = baseX - localMouse.x;
            const dy = baseY - localMouse.y;
            const dz = baseZ - localMouse.z;
            const distToMouse = Math.sqrt(dx*dx + dy*dy + dz*dz);
            const ripple = Math.sin(distToMouse * 0.03 - time * 6) * 35;
            const attenuation = Math.max(0, 1 - distToMouse / 250);

            targetX = baseX + (baseX / radius) * ripple * attenuation;
            targetY = baseY + (baseY / radius) * ripple * attenuation;
            targetZ = baseZ + (baseZ / radius) * ripple * attenuation;
          }

          posAttribute.array[i * 3] += (targetX - posAttribute.array[i * 3]) * 0.05;
          posAttribute.array[i * 3 + 1] += (targetY - posAttribute.array[i * 3 + 1]) * 0.05;
          posAttribute.array[i * 3 + 2] += (targetZ - posAttribute.array[i * 3 + 2]) * 0.05;
        }
        posAttribute.needsUpdate = true;
      }

      const currentPos = geometry.attributes.position.array;
      const linePosArr = lineGeometry.attributes.position.array;
      let lineIdx = 0;
      for (let i = 0; i < connections.length; i++) {
        const p1 = connections[i * 2], p2 = connections[i * 2 + 1];
        linePosArr[lineIdx++] = currentPos[p1 * 3];
        linePosArr[lineIdx++] = currentPos[p1 * 3 + 1];
        linePosArr[lineIdx++] = currentPos[p1 * 3 + 2];
        linePosArr[lineIdx++] = currentPos[p2 * 3];
        linePosArr[lineIdx++] = currentPos[p2 * 3 + 1];
        linePosArr[lineIdx++] = currentPos[p2 * 3 + 2];
      }
      lineGeometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      clearTimeout(assemblyTimeout);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none" 
    />
  );
}