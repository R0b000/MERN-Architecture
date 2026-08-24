import React, { useEffect, useRef } from 'react';

interface MatrixBackgroundProps {
  marquee: string[];
}

export const MatrixBackground: React.FC<MatrixBackgroundProps> = ({ marquee }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        const fontSize = 13;
        let columns = Math.floor(width / fontSize);
        let drops = Array(columns).fill(0).map(() => Math.random() * -100);

        const codeTokens = [
          '0', '1', '{', '}', '[', ']', '(', ')', '<', '>', '/', '\\', '|', '=', '+', '-', '*', '&', '^', '%', '$', '#', '@', '!',
          '?', ':', ';', '.', ',', '_', '~', '"', '\'',
          'var', 'let', 'const', 'fn', 'if', 'else', 'for', 'do', 'while', 'return', 'class', 'import', 'export', 'async', 'await',
          'true', 'false', 'null', 'undefined', 'this', 'new', 'try', 'catch', 'throw',
          '===', '!==', '=>', '&&', '||', '++', '--', '+=', '//', '/*', '*/', '{}', '[]', '()',
          'a', 'b', 'c', 'd', 'e', 'f', 'x', 'y', 'z', 'i', 'j', 'k', 'n', 'm'
        ];

        const resizeMatrix = () => {
          if (!canvas) return;
          width = canvas.width = window.innerWidth;
          height = canvas.height = window.innerHeight;
          columns = Math.floor(width / fontSize);
          drops = Array(columns).fill(0).map(() => Math.random() * -100);
        };

        window.addEventListener('resize', resizeMatrix);

        const drawMatrix = () => {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
          ctx.fillRect(0, 0, width, height);
          ctx.font = '13px JetBrains Mono';
          for (let i = 0; i < drops.length; i++) {
            const token = codeTokens[Math.floor(Math.random() * codeTokens.length)];
            const y = drops[i] * 13;

            if (Math.random() > 0.975) {
              ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
            } else {
              ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
            }
            ctx.fillText(token, i * 13, y);

            if (y > height && Math.random() > 0.975) {
              drops[i] = 0;
            }
            drops[i]++;
          }
        };

        const interval = setInterval(drawMatrix, 55);

        return () => {
          clearInterval(interval);
          window.removeEventListener('resize', resizeMatrix);
        };
      }
    }
  }, []);

  return <canvas ref={canvasRef} id="matrix" className="fixed inset-0 z-[-10] opacity-18 pointer-events-none"></canvas>;
};

export default MatrixBackground;
