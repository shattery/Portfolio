import React, { useEffect, useRef, useState } from 'react';

const MatrixOverlay = ({ active, direction, axis = 'y' }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(0);
  const posRef = useRef([]); // Positionen entlang Bewegungsachse
  const speedsRef = useRef([]);
  const fontSize = 26;
  const color = '#22c55e';

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const init = () => {
      const cols = Math.floor(canvas.width / fontSize);
      const rows = Math.floor(canvas.height / fontSize);
      const count = axis === 'y' ? cols : rows;
      const maxNeg = 60;
      posRef.current = new Array(count).fill(0).map(() => {
        if (axis === 'y') {
          return direction === 1
            ? -Math.floor(Math.random() * maxNeg)
            : Math.floor(canvas.height / fontSize) + Math.floor(Math.random() * maxNeg);
        }
        return direction === 1
          ? -Math.floor(Math.random() * maxNeg)
          : Math.floor(canvas.width / fontSize) + Math.floor(Math.random() * maxNeg);
      });
      speedsRef.current = new Array(count).fill(0).map(() => 0.4 + Math.random() * 0.7);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };
    resize();
    window.addEventListener('resize', resize);

    const characters = 'アイウエオカキクケコｱｲｳｴｵｶｷｸｹｺ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const draw = () => {
      if (!active) return;
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.16)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;

      const cols = Math.floor(canvas.width / fontSize);
      const rows = Math.floor(canvas.height / fontSize);

      if (axis === 'y') {
        posRef.current.forEach((y, i) => {
          const text = characters.charAt(Math.floor(Math.random() * characters.length));
          const x = i * fontSize;
          const yPos = y * fontSize;
          if (yPos >= -fontSize && yPos <= canvas.height + fontSize) {
            ctx.fillText(text, x, yPos);
          }
          const speed = speedsRef.current[i] * direction;
          const nextY = y + speed;
          if (direction === 1) {
            const isOff = nextY * fontSize > canvas.height;
            posRef.current[i] = isOff && Math.random() > 0.985 ? -Math.random() * 30 : nextY;
          } else {
            const isOff = nextY * fontSize < 0;
            posRef.current[i] = isOff && Math.random() > 0.985 ? rows + Math.random() * 30 : nextY;
          }
        });
      } else {
        posRef.current.forEach((xPos, j) => {
          const text = characters.charAt(Math.floor(Math.random() * characters.length));
          const y = j * fontSize;
          const xDraw = xPos * fontSize;
          if (xDraw >= -fontSize && xDraw <= canvas.width + fontSize) {
            ctx.fillText(text, xDraw, y);
          }
          const speed = speedsRef.current[j] * direction;
          const nextX = xPos + speed;
          if (direction === 1) {
            const isOff = nextX * fontSize > canvas.width;
            posRef.current[j] = isOff && Math.random() > 0.985 ? -Math.random() * 30 : nextX;
          } else {
            const isOff = nextX * fontSize < 0;
            posRef.current[j] = isOff && Math.random() > 0.985 ? cols + Math.random() * 30 : nextX;
          }
        });
      }

      animRef.current = requestAnimationFrame(draw);
    };

    if (active) {
      const ctx2 = canvasRef.current?.getContext('2d');
      if (ctx2) {
        ctx2.fillStyle = 'rgba(0,0,0,1)';
        ctx2.fillRect(0, 0, canvas.width, canvas.height);
      }
      animRef.current = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [active, direction, axis]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 20, pointerEvents: 'none', opacity: active ? 1 : 0, transition: 'opacity 250ms ease' }}
    />
  );
};

const OverlayTransition = () => {
  const [active, setActive] = useState(false);
  const [direction, setDirection] = useState(1);
  const [axis, setAxis] = useState('y');
  const isAnimatingRef = useRef(false);

  // Zielseitenseitiges Fortsetzen der Transition (deaktiviert)
  useEffect(() => {
    try {
      const resumeRaw = sessionStorage.getItem('overlayResume');
      if (resumeRaw) {
        sessionStorage.removeItem('overlayResume');
      }
      document.documentElement.classList.remove('overlay-active');
      setActive(false);
      isAnimatingRef.current = false;
    } catch {
      document.documentElement.classList.remove('overlay-active');
      isAnimatingRef.current = false;
    }
  }, []);

  // Handle bfcache (Zurück/Vorwärts) - sicherstellen, dass nichts eingeblendet bleibt
  useEffect(() => {
    const onPageShow = () => {
      document.documentElement.classList.remove('overlay-active');
      sessionStorage.removeItem('overlayResume');
      setActive(false);
      isAnimatingRef.current = false;
    };
    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;
      // Overlay-Effect vollständig deaktiviert
      return;
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <div
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 10, opacity: active ? 1 : 0, pointerEvents: active ? 'auto' : 'none', transition: 'opacity 200ms ease' }}
      />
      <MatrixOverlay active={active} direction={direction} axis={axis} />
    </>
  );
};

export default OverlayTransition; 