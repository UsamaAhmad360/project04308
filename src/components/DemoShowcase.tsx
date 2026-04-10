import { useEffect, useRef, useState, useCallback } from 'react';

interface DemoShowcaseProps {
  activeDemo: string | null;
  onClose: () => void;
  showToast: (msg: string) => void;
}

export default function DemoShowcase({ activeDemo, onClose, showToast }: DemoShowcaseProps) {
  // QR Code state
  const [qrInput, setQrInput] = useState('https://usamaahmad360.github.io/Usama-s-Portfolio/');
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  // Link Shortener state
  const [shortenerInput, setShortenerInput] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [showShortenerResult, setShowShortenerResult] = useState(false);

  // Password Generator state
  const [passLength, setPassLength] = useState(16);
  const [passSpecials, setPassSpecials] = useState(true);
  const [passwordOutput, setPasswordOutput] = useState('NEON-ARCHITECT-SECURE-KEY');

  // Pong state
  const pongCanvasRef = useRef<HTMLCanvasElement>(null);
  const pongIntervalRef = useRef<number | null>(null);
  const pongStateRef = useRef({ paddleY: 100, ballX: 200, ballY: 150, ballDX: 3, ballDY: 2 });

  // Snake state
  const snakeCanvasRef = useRef<HTMLCanvasElement>(null);
  const snakeIntervalRef = useRef<number | null>(null);
  const snakeStateRef = useRef({
    snake: [{ x: 5, y: 5 }],
    dir: { x: 1, y: 0 },
    food: { x: 10, y: 10 }
  });

  // Memory state
  const [memoryCards, setMemoryCards] = useState<{ sym: string; id: number; flipped: boolean; matched: boolean }[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  // Tab Manager state
  const [activeTabs, setActiveTabs] = useState([
    "Dashboard - Neon Architect",
    "GitHub - Code Ecosystem",
    "Figma - Blueprint Designs",
    "Matrix Core Control"
  ]);

  // Color Picker state
  const [colorFeedback, setColorFeedback] = useState('');

  // --- QR Code Generator ---
  const generateQR = useCallback(() => {
    const canvas = qrCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const size = 200;
    const grid = 10;
    const cells = size / grid;

    ctx.fillStyle = '#100b1d';
    ctx.fillRect(0, 0, size, size);

    let hash = 0;
    for (let i = 0; i < qrInput.length; i++) {
      hash = qrInput.charCodeAt(i) + ((hash << 5) - hash);
    }

    ctx.fillStyle = '#00F0FF';
    const drawAnchor = (x: number, y: number) => {
      ctx.fillStyle = '#00F0FF';
      ctx.fillRect(x, y, 30, 30);
      ctx.fillStyle = '#100b1d';
      ctx.fillRect(x + 5, y + 5, 20, 20);
      ctx.fillStyle = '#00F0FF';
      ctx.fillRect(x + 10, y + 10, 10, 10);
    };
    drawAnchor(10, 10);
    drawAnchor(160, 10);
    drawAnchor(10, 160);

    for (let r = 0; r < cells; r++) {
      for (let c = 0; c < cells; c++) {
        if ((r < 4 && c < 4) || (r < 4 && c > 15) || (r > 15 && c < 4)) continue;
        const val = Math.sin(hash * (r + 1) * (c + 1)) * 10000;
        if (val - Math.floor(val) > 0.5) {
          ctx.fillStyle = '#00dbe9';
          ctx.fillRect(c * grid, r * grid, grid - 1, grid - 1);
        }
      }
    }
  }, [qrInput]);

  // --- Password Generator ---
  const generatePassword = useCallback(() => {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    if (passSpecials) chars += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let result = '';
    for (let i = 0; i < passLength; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPasswordOutput(result);
  }, [passLength, passSpecials]);

  // --- Pong Game ---
  const startPong = useCallback(() => {
    const canvas = pongCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    pongStateRef.current = { paddleY: 100, ballX: 200, ballY: 150, ballDX: 3, ballDY: 2 };

    if (pongIntervalRef.current) clearInterval(pongIntervalRef.current);
    pongIntervalRef.current = window.setInterval(() => {
      const s = pongStateRef.current;
      ctx.fillStyle = '#100b1d';
      ctx.fillRect(0, 0, 400, 300);

      ctx.fillStyle = '#00F0FF';
      ctx.fillRect(20, s.paddleY, 10, 60);

      ctx.beginPath();
      ctx.arc(s.ballX, s.ballY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#7df4ff';
      ctx.fill();
      ctx.closePath();

      s.ballX += s.ballDX;
      s.ballY += s.ballDY;

      if (s.ballY < 0 || s.ballY > 300) s.ballDY *= -1;
      if (s.ballX > 400) s.ballDX *= -1;

      if (s.ballX < 30 && s.ballY > s.paddleY && s.ballY < s.paddleY + 60) {
        s.ballDX *= -1;
        s.ballX = 30;
      } else if (s.ballX < 0) {
        s.ballX = 200;
        s.ballY = 150;
      }
    }, 1000 / 60);
  }, []);

  const movePongPaddle = useCallback((dir: 'up' | 'down') => {
    const s = pongStateRef.current;
    if (dir === 'up') s.paddleY = Math.max(0, s.paddleY - 20);
    else s.paddleY = Math.min(240, s.paddleY + 20);
  }, []);

  // --- Snake Game ---
  const startSnake = useCallback(() => {
    const canvas = snakeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    snakeStateRef.current = {
      snake: [{ x: 5, y: 5 }],
      dir: { x: 1, y: 0 },
      food: { x: 10, y: 10 }
    };

    if (snakeIntervalRef.current) clearInterval(snakeIntervalRef.current);
    snakeIntervalRef.current = window.setInterval(() => {
      const s = snakeStateRef.current;
      let head = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y };

      if (head.x < 0) head.x = 14;
      if (head.x > 14) head.x = 0;
      if (head.y < 0) head.y = 14;
      if (head.y > 14) head.y = 0;

      s.snake.unshift(head);

      if (head.x === s.food.x && head.y === s.food.y) {
        s.food = {
          x: Math.floor(Math.random() * 15),
          y: Math.floor(Math.random() * 15)
        };
      } else {
        s.snake.pop();
      }

      ctx.fillStyle = '#100b1d';
      ctx.fillRect(0, 0, 300, 300);

      ctx.fillStyle = '#ffb4ab';
      ctx.fillRect(s.food.x * 20, s.food.y * 20, 18, 18);

      ctx.fillStyle = '#00F0FF';
      s.snake.forEach(part => {
        ctx.fillRect(part.x * 20, part.y * 20, 18, 18);
      });
    }, 150);
  }, []);

  const setSnakeDir = useCallback((dir: { x: number; y: number }) => {
    snakeStateRef.current.dir = dir;
  }, []);

  // --- Memory Game ---
  const setupMemoryGame = useCallback(() => {
    const symbols = ['Δ', 'Δ', 'Σ', 'Σ', 'Φ', 'Φ', 'Ψ', 'Ψ', 'Ω', 'Ω', 'λ', 'λ', 'θ', 'θ', 'ξ', 'ξ'];
    const shuffled = symbols.sort(() => 0.5 - Math.random());
    setMemoryCards(shuffled.map((sym, i) => ({ sym, id: i, flipped: false, matched: false })));
    setSelectedCards([]);
  }, []);

  const handleMemoryClick = useCallback((id: number) => {
    if (selectedCards.length >= 2) return;
    const card = memoryCards.find(c => c.id === id);
    if (!card || card.flipped || card.matched) return;

    const newCards = memoryCards.map(c => c.id === id ? { ...c, flipped: true } : c);
    setMemoryCards(newCards);

    const newSelected = [...selectedCards, id];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const c1 = newCards.find(c => c.id === newSelected[0])!;
      const c2 = newCards.find(c => c.id === newSelected[1])!;

      setTimeout(() => {
        if (c1.sym === c2.sym) {
          setMemoryCards(prev => prev.map(c =>
            c.id === newSelected[0] || c.id === newSelected[1]
              ? { ...c, matched: true }
              : c
          ));
          showToast('Matrix Paired!');
        } else {
          setMemoryCards(prev => prev.map(c =>
            c.id === newSelected[0] || c.id === newSelected[1]
              ? { ...c, flipped: false }
              : c
          ));
        }
        setSelectedCards([]);
      }, 800);
    }
  }, [memoryCards, selectedCards, showToast]);

  // --- Effects ---
  useEffect(() => {
    if (activeDemo === 'qr') generateQR();
    if (activeDemo === 'password') generatePassword();
    if (activeDemo === 'pong') startPong();
    if (activeDemo === 'snake') startSnake();
    if (activeDemo === 'memory') setupMemoryGame();

    return () => {
      if (pongIntervalRef.current) clearInterval(pongIntervalRef.current);
      if (snakeIntervalRef.current) clearInterval(snakeIntervalRef.current);
    };
  }, [activeDemo, generateQR, generatePassword, startPong, startSnake, setupMemoryGame]);

  // Keyboard controls for pong and snake
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeDemo === 'pong') {
        if (e.key === 'ArrowUp') movePongPaddle('up');
        if (e.key === 'ArrowDown') movePongPaddle('down');
      }
      if (activeDemo === 'snake') {
        if (e.key === 'ArrowUp') setSnakeDir({ x: 0, y: -1 });
        if (e.key === 'ArrowDown') setSnakeDir({ x: 0, y: 1 });
        if (e.key === 'ArrowLeft') setSnakeDir({ x: -1, y: 0 });
        if (e.key === 'ArrowRight') setSnakeDir({ x: 1, y: 0 });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDemo, movePongPaddle, setSnakeDir]);

  if (!activeDemo) return null;

  // --- Link Shortener ---
  const handleShorten = () => {
    if (!shortenerInput) {
      showToast('Please enter a valid URL');
      return;
    }
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let hash = '';
    for (let i = 0; i < 6; i++) hash += chars.charAt(Math.floor(Math.random() * chars.length));
    setShortenedUrl('https://neon.link/' + hash);
    setShowShortenerResult(true);
    showToast('Link Optimized Successfully!');
  };

  // --- Tab Manager ---
  const addTab = () => {
    setActiveTabs(prev => [...prev, "New Data Portal " + Math.floor(Math.random() * 100)]);
  };
  const removeTab = (i: number) => {
    setActiveTabs(prev => prev.filter((_, idx) => idx !== i));
    showToast('Tab Cleared!');
  };

  // --- Color Picker ---
  const handleColorClick = (color: string) => {
    navigator.clipboard.writeText(color).then(() => {
      setColorFeedback(`Hex code ${color} copied to clipboard!`);
      showToast('Color Hex Copied!');
    });
  };

  return (
    <div className="mt-16 bg-[#151023] border border-[#00F0FF]/30 rounded-2xl p-8 max-w-3xl mx-auto shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all">
      <div className="flex justify-end mb-4">
        <button
          onClick={onClose}
          className="text-[#ffb4ab] hover:text-red-500 font-['Inter'] text-xs flex items-center gap-1 uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-sm">close</span> Close Demo
        </button>
      </div>

      {/* QR Code Demo */}
      {activeDemo === 'qr' && (
        <div className="space-y-6">
          <h4 className="text-2xl font-['Space_Grotesk'] font-bold text-[#e8def9]">Interactive QR Code Encoder</h4>
          <p className="text-sm text-[#b9cacb]">Input any digital address or keyphrase to dynamically generate a cryptographic grid code in real time.</p>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-grow w-full space-y-2">
              <label className="text-xs text-[#c0c1ff] uppercase tracking-widest">Payload Input</label>
              <input
                type="text"
                value={qrInput}
                onChange={(e) => setQrInput(e.target.value)}
                className="w-full bg-[#100b1d] border border-[#3b494b]/30 rounded-md px-4 py-3 text-[#e8def9] focus:outline-none focus:border-[#00F0FF]"
              />
            </div>
            <button
              onClick={() => { generateQR(); showToast('Neon QR Code Encoded!'); }}
              className="bg-gradient-to-r from-[#00dbe9] to-[#00f0ff] text-[#002022] font-bold px-6 py-3 rounded-md uppercase tracking-wider text-xs hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              Encode Matrix
            </button>
          </div>
          <div className="flex justify-center p-6 bg-[#100b1d] rounded-xl border border-[#3b494b]/20">
            <canvas ref={qrCanvasRef} width="200" height="200" className="border border-[#00F0FF]/40 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.2)]" />
          </div>
        </div>
      )}

      {/* Link Shortener Demo */}
      {activeDemo === 'shortener' && (
        <div className="space-y-6">
          <h4 className="text-2xl font-['Space_Grotesk'] font-bold text-[#e8def9]">Quantum Link Optimizer</h4>
          <p className="text-sm text-[#b9cacb]">Minimize long enterprise URLs into compact neon hashes instantly.</p>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-grow w-full space-y-2">
              <label className="text-xs text-[#c0c1ff] uppercase tracking-widest">Original Full URL</label>
              <input
                type="text"
                value={shortenerInput}
                onChange={(e) => setShortenerInput(e.target.value)}
                placeholder="https://example.com/very/long/enterprise/url"
                className="w-full bg-[#100b1d] border border-[#3b494b]/30 rounded-md px-4 py-3 text-[#e8def9] focus:outline-none focus:border-[#00F0FF]"
              />
            </div>
            <button
              onClick={handleShorten}
              className="bg-gradient-to-r from-[#00dbe9] to-[#00f0ff] text-[#002022] font-bold px-6 py-3 rounded-md uppercase tracking-wider text-xs hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              Optimize Link
            </button>
          </div>
          {showShortenerResult && (
            <div className="bg-[#100b1d] p-4 rounded-xl border border-[#00F0FF]/30 flex justify-between items-center">
              <div>
                <span className="text-xs text-[#b9cacb] block">Shortened Address:</span>
                <span className="text-[#00F0FF] font-mono tracking-wider">{shortenedUrl}</span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shortenedUrl).then(() => showToast('Short URL Copied!'));
                }}
                className="bg-[#373246] px-4 py-2 rounded-md text-xs font-['Inter'] uppercase tracking-widest hover:bg-[#3b494b]"
              >
                Copy
              </button>
            </div>
          )}
        </div>
      )}

      {/* Password Generator Demo */}
      {activeDemo === 'password' && (
        <div className="space-y-6">
          <h4 className="text-2xl font-['Space_Grotesk'] font-bold text-[#e8def9]">Entropy Shield Generator</h4>
          <p className="text-sm text-[#b9cacb]">Craft maximum-strength enterprise passwords with real-time entropy evaluation.</p>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-[#100b1d] border border-[#3b494b]/30 p-4 rounded-xl">
              <span className="font-mono text-xl tracking-widest text-[#00F0FF] break-all">{passwordOutput}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(passwordOutput).then(() => showToast('Secure Password Copied to Clipboard!'));
                }}
                className="bg-[#373246] px-4 py-2 rounded-md text-xs font-['Inter'] uppercase tracking-widest hover:bg-[#3b494b] ml-4 shrink-0"
              >
                Copy
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#c0c1ff] uppercase tracking-widest">Length: <span>{passLength}</span></label>
                <input
                  type="range"
                  min="8"
                  max="32"
                  value={passLength}
                  onChange={(e) => setPassLength(parseInt(e.target.value))}
                  className="w-full accent-[#00F0FF]"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={passSpecials}
                  onChange={(e) => setPassSpecials(e.target.checked)}
                  className="accent-[#00F0FF] w-4 h-4"
                />
                <label className="text-xs text-[#c0c1ff] uppercase tracking-widest">Include Symbols</label>
              </div>
            </div>
            <button
              onClick={() => { generatePassword(); showToast('New Shield Hash Generated!'); }}
              className="w-full bg-gradient-to-r from-[#00dbe9] to-[#00f0ff] text-[#002022] font-bold py-3 rounded-md uppercase tracking-wider text-xs hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              Generate Secure Hash
            </button>
          </div>
        </div>
      )}

      {/* Neon Pong Demo */}
      {activeDemo === 'pong' && (
        <div className="space-y-6">
          <h4 className="text-2xl font-['Space_Grotesk'] font-bold text-[#e8def9]">Neon Pong Classic</h4>
          <p className="text-sm text-[#b9cacb]">Use UP and DOWN arrow keys (or tap the controls) to deflect the glowing orb!</p>
          <div className="flex justify-center p-4 bg-[#100b1d] rounded-xl border border-[#3b494b]/20">
            <canvas ref={pongCanvasRef} width="400" height="300" className="border border-[#00F0FF]/40 rounded-lg shadow-[0_0_20px_rgba(0,240,255,0.2)] max-w-full" />
          </div>
          <div className="flex justify-center gap-4">
            <button onClick={() => movePongPaddle('up')} className="bg-[#2c273a] border border-[#00F0FF]/30 text-[#00F0FF] px-6 py-2 rounded-lg text-xs tracking-widest uppercase hover:bg-[#00F0FF]/10 active:scale-95">Move Up</button>
            <button onClick={() => movePongPaddle('down')} className="bg-[#2c273a] border border-[#00F0FF]/30 text-[#00F0FF] px-6 py-2 rounded-lg text-xs tracking-widest uppercase hover:bg-[#00F0FF]/10 active:scale-95">Move Down</button>
          </div>
        </div>
      )}

      {/* Cyber Snake Demo */}
      {activeDemo === 'snake' && (
        <div className="space-y-6">
          <h4 className="text-2xl font-['Space_Grotesk'] font-bold text-[#e8def9]">Cyber Snake Matrix</h4>
          <p className="text-sm text-[#b9cacb]">Use Arrow keys to collect neon nodes. Avoid colliding with grid boundaries or your own data tail.</p>
          <div className="flex justify-center p-4 bg-[#100b1d] rounded-xl border border-[#3b494b]/20">
            <canvas ref={snakeCanvasRef} width="300" height="300" className="border border-[#00F0FF]/40 rounded-lg shadow-[0_0_20px_rgba(0,240,255,0.2)] max-w-full" />
          </div>
          <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
            <div></div>
            <button onClick={() => setSnakeDir({ x: 0, y: -1 })} className="bg-[#2c273a] border border-[#00F0FF]/30 text-[#00F0FF] py-2 rounded-lg text-xs uppercase hover:bg-[#00F0FF]/10">Up</button>
            <div></div>
            <button onClick={() => setSnakeDir({ x: -1, y: 0 })} className="bg-[#2c273a] border border-[#00F0FF]/30 text-[#00F0FF] py-2 rounded-lg text-xs uppercase hover:bg-[#00F0FF]/10">Left</button>
            <button onClick={() => setSnakeDir({ x: 0, y: 1 })} className="bg-[#2c273a] border border-[#00F0FF]/30 text-[#00F0FF] py-2 rounded-lg text-xs uppercase hover:bg-[#00F0FF]/10">Down</button>
            <button onClick={() => setSnakeDir({ x: 1, y: 0 })} className="bg-[#2c273a] border border-[#00F0FF]/30 text-[#00F0FF] py-2 rounded-lg text-xs uppercase hover:bg-[#00F0FF]/10">Right</button>
          </div>
        </div>
      )}

      {/* Memory Matrix Demo */}
      {activeDemo === 'memory' && (
        <div className="space-y-6">
          <h4 className="text-2xl font-['Space_Grotesk'] font-bold text-[#e8def9]">Memory Matrix Unlocker</h4>
          <p className="text-sm text-[#b9cacb]">Click cards to flip and match cryptographic symbols. Complete all pairs to clear the sector.</p>
          <div className="grid grid-cols-4 gap-4 p-6 bg-[#100b1d] rounded-xl border border-[#3b494b]/20 max-w-sm mx-auto">
            {memoryCards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleMemoryClick(card.id)}
                className={`h-16 flex items-center justify-center rounded-lg border cursor-pointer text-xl font-bold select-none transition-all
                  ${card.matched
                    ? 'bg-[#00F0FF]/10 border-[#00F0FF]/50 text-[#00F0FF]'
                    : card.flipped
                      ? 'bg-[#2c273a] border-[#00F0FF]/50 text-[#00F0FF]'
                      : 'bg-[#2c273a] border-[#3b494b]/30 text-transparent hover:border-[#00F0FF]/30'
                  }`}
              >
                {(card.flipped || card.matched) ? card.sym : ''}
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => { setupMemoryGame(); showToast('Memory Matrix Reset'); }}
              className="bg-gradient-to-r from-[#00dbe9] to-[#00f0ff] text-[#002022] font-bold px-6 py-3 rounded-md uppercase tracking-wider text-xs hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              Reset Matrix
            </button>
          </div>
        </div>
      )}

      {/* Tab Manager Demo */}
      {activeDemo === 'tab-manager' && (
        <div className="space-y-6">
          <h4 className="text-2xl font-['Space_Grotesk'] font-bold text-[#e8def9]">Chrome Tab Manager (Simulated)</h4>
          <p className="text-sm text-[#b9cacb]">Organize, collapse, and group active web tabs to optimize browser memory and workflow.</p>
          <div className="bg-[#100b1d] border border-[#3b494b]/30 rounded-xl p-6 space-y-4 max-w-md mx-auto">
            <div className="flex justify-between items-center border-b border-[#3b494b]/20 pb-3">
              <span className="text-xs text-[#00F0FF] uppercase tracking-widest font-bold">Session Tabs ({activeTabs.length} Active)</span>
              <button onClick={addTab} className="bg-[#2c273a] border border-[#00F0FF]/30 text-[#00F0FF] px-3 py-1 rounded text-[10px] uppercase hover:bg-[#00F0FF]/10">+ New Tab</button>
            </div>
            <div className="space-y-2">
              {activeTabs.map((tab, i) => (
                <div key={i} className="flex justify-between items-center bg-[#2c273a] px-3 py-2 rounded border border-[#3b494b]/30 text-xs">
                  <span className="text-[#e8def9] truncate max-w-[200px]">{tab}</span>
                  <button onClick={() => removeTab(i)} className="text-[#ffb4ab] hover:text-red-500 font-bold ml-2">✖</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Color Picker Demo */}
      {activeDemo === 'color-picker' && (
        <div className="space-y-6">
          <h4 className="text-2xl font-['Space_Grotesk'] font-bold text-[#e8def9]">Devtools Color Palette Extractor</h4>
          <p className="text-sm text-[#b9cacb]">Select an active palette hue to instantly copy its CSS hex code to your clipboard.</p>
          <div className="flex flex-wrap justify-center gap-4 p-6 bg-[#100b1d] rounded-xl border border-[#3b494b]/20">
            {[
              { color: '#00f0ff', shadow: 'shadow-[0_0_10px_rgba(0,240,255,0.5)]' },
              { color: '#c0c1ff', shadow: 'shadow-[0_0_10px_rgba(192,193,255,0.5)]' },
              { color: '#ffb4ab', shadow: 'shadow-[0_0_10px_rgba(255,180,171,0.5)]' },
              { color: '#3c3f84', shadow: 'shadow-[0_0_10px_rgba(60,63,132,0.5)]' },
            ].map(({ color, shadow }) => (
              <button
                key={color}
                onClick={() => handleColorClick(color)}
                className={`w-16 h-16 rounded-lg ${shadow} active:scale-95 transition-transform`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="text-center text-xs text-[#00F0FF] font-['Inter'] tracking-widest h-4">{colorFeedback}</div>
        </div>
      )}
    </div>
  );
}
