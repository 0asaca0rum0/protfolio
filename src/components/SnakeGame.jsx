import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

const W = 600;
const H = 680;

const COLS = 9;
const ROWS = 4;
const EW = 28;
const EH = 24;
const GAP_X = 14;
const GAP_Y = 16;
const GRID_W = COLS * (EW + GAP_X) - GAP_X;
const GRID_X0 = (W - GRID_W) / 2;
const GRID_Y0 = 60;

const ROW_TYPE = ['elite', 'mid', 'mid', 'basic'];
const ROW_COLORS = { elite: '#FF6B6B', mid: '#FFA040', basic: '#1ED696' };
const ROW_PTS = { elite: 30, mid: 20, basic: 10 };

const PX = 3; // pixel size for sprites

const SPRITES = {
     player: [
          [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0],
          [0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1],
          [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1]
     ],
     basic: [
          [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
          [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
          [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
          [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
          [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0]
     ],
     mid: [
          [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
          [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
          [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
          [1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
          [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
          [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1]
     ],
     elite: [
          [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
          [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
          [0, 0, 1, 1, 2, 2, 2, 1, 1, 0, 0],
          [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
          [1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
     ],
     powerup_rapid: [
          [1, 1, 1, 1, 1],
          [1, 0, 0, 0, 1],
          [1, 1, 1, 1, 1],
          [1, 0, 1, 0, 0],
          [1, 0, 0, 1, 1]
     ],
     powerup_spread: [
          [1, 1, 1, 1, 1],
          [1, 0, 0, 0, 0],
          [1, 1, 1, 1, 1],
          [0, 0, 0, 0, 1],
          [1, 1, 1, 1, 1]
     ],
     powerup_shield: [
          [1, 1, 1, 1, 1],
          [1, 0, 0, 0, 1],
          [1, 0, 1, 0, 1],
          [0, 1, 0, 1, 0],
          [0, 0, 1, 0, 0]
     ]
};

// ── Pre-render sprites to offscreen canvases (done ONCE) ──────────────────
const spriteCache = {};

function bakeSprite(key, color, highlight = '#fff') {
     const cacheKey = `${key}_${color}_${highlight}`;
     if (spriteCache[cacheKey]) return spriteCache[cacheKey];

     const data = SPRITES[key];
     const sw = data[0].length * PX;
     const sh = data.length * PX;
     const off = document.createElement('canvas');
     off.width = sw;
     off.height = sh;
     const c = off.getContext('2d');

     for (let r = 0; r < data.length; r++) {
          for (let col = 0; col < data[r].length; col++) {
               if (data[r][col] === 1) {
                    c.fillStyle = color;
                    c.fillRect(col * PX, r * PX, PX, PX);
               } else if (data[r][col] === 2) {
                    c.fillStyle = highlight;
                    c.fillRect(col * PX, r * PX, PX, PX);
               }
          }
     }

     spriteCache[cacheKey] = off;
     return off;
}

// Pre-render grid background (done ONCE, static)
let gridBgCanvas = null;
function getGridBg() {
     if (gridBgCanvas) return gridBgCanvas;
     const off = document.createElement('canvas');
     off.width = W;
     off.height = H;
     const c = off.getContext('2d');
     const cell = 20;
     c.strokeStyle = 'rgba(30, 214, 150, 0.08)';
     c.lineWidth = 1;
     c.beginPath();
     for (let x = 0; x <= W; x += cell) { c.moveTo(x, 0); c.lineTo(x, H); }
     for (let y = 0; y <= H; y += cell) { c.moveTo(0, y); c.lineTo(W, y); }
     c.stroke();
     gridBgCanvas = off;
     return off;
}

function buildGrid() {
     const enemies = [];
     for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
               const type = ROW_TYPE[r];
               enemies.push({ row: r, col: c, type, alive: true, hp: type === 'elite' ? 2 : 1, x: 0, y: 0 });
          }
     }
     return enemies;
}

// ── Main component ───────────────────────────────────────────────────────────

export default function SpaceShooter({ onClose }) {
     const canvasRef = useRef(null);
     const S = useRef(null);
     const keys = useRef({});
     const shootCD = useRef(0);
     const raf = useRef(null);
     const touchX = useRef(null);

     const [score, setScore] = useState(0);
     const [lives, setLives] = useState(3);
     const [wave, setWave] = useState(1);
     const [phase, setPhase] = useState('start');

     function newState(w) {
          return {
               player: { x: W / 2, y: H - 52 },
               bullets: [], ebullets: [],
               particles: [],
               powerups: [],
               enemies: buildGrid(),
               fx: 0, fy: 0,
               fdx: 0.8 + w * 0.2,
               fdir: 1, fdrop: false,
               eFireTimer: 0,
               eFireRate: Math.max(30, 80 - w * 6),
               invTimer: 0,
               score: 0, lives: 3, wave: w,
               tick: 0,
               rapidFireTimer: 0,
               spreadFireTimer: 0,
               hasShield: false,
          };
     }

     function addParticles(s, x, y, color, big) {
          const n = big ? 10 : 4;
          for (let i = 0; i < n; i++) {
               const a = Math.random() * 6.28;
               const sp = Math.random() * (big ? 3 : 1.5) + 0.5;
               s.particles.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, decay: 0.06 + Math.random() * 0.06, s: Math.floor(Math.random() * 3) + 2, color });
          }
     }

     function spawnPowerup(s, x, y) {
          if (Math.random() > 0.15) return;
          const t = ['rapid', 'spread', 'shield'][Math.floor(Math.random() * 3)];
          s.powerups.push({ x, y, type: t, vy: 1.5 });
     }

     function launch(w = 1) {
          cancelAnimationFrame(raf.current);
          S.current = newState(w);
          setScore(0); setLives(3); setWave(w); setPhase('play');
     }

     function nextWave() {
          const w = (S.current?.wave || 1) + 1;
          const prev = S.current;
          cancelAnimationFrame(raf.current);
          S.current = newState(w);
          S.current.score = prev.score;
          S.current.lives = prev.lives;
          S.current.hasShield = prev.hasShield;
          setWave(w); setScore(prev.score); setLives(prev.lives); setPhase('play');
     }

     // ── Game loop (no shadowBlur, all cached sprites)
     useEffect(() => {
          if (phase !== 'play') return;
          const ctx = canvasRef.current?.getContext('2d');
          if (!ctx) return;

          // Ensure caches exist
          const grid = getGridBg();
          bakeSprite('player', '#1ED696', '#DCFFF5');
          Object.keys(ROW_COLORS).forEach(t => bakeSprite(t, ROW_COLORS[t]));

          const pColors = { rapid: '#FFEAA7', spread: '#00CEC9', shield: '#A29BFE' };

          function tick() {
               const s = S.current;
               if (!s) return;
               s.tick++;

               if (s.rapidFireTimer > 0) s.rapidFireTimer--;
               if (s.spreadFireTimer > 0) s.spreadFireTimer--;

               // player
               const spd = 5.5;
               if (keys.current.ArrowLeft || keys.current.a) s.player.x = Math.max(20, s.player.x - spd);
               if (keys.current.ArrowRight || keys.current.d) s.player.x = Math.min(W - 20, s.player.x + spd);

               // shoot
               if (shootCD.current > 0) shootCD.current--;
               if ((keys.current[' '] || keys.current.z) && shootCD.current === 0) {
                    if (s.spreadFireTimer > 0) {
                         s.bullets.push({ x: s.player.x, y: s.player.y - 16, vx: 0 });
                         s.bullets.push({ x: s.player.x - 10, y: s.player.y - 12, vx: -2 });
                         s.bullets.push({ x: s.player.x + 10, y: s.player.y - 12, vx: 2 });
                    } else {
                         s.bullets.push({ x: s.player.x, y: s.player.y - 16, vx: 0 });
                    }
                    shootCD.current = s.rapidFireTimer > 0 ? 6 : 15;
               }

               // formation
               const alive = s.enemies.filter(e => e.alive);
               if (s.fdrop) {
                    s.fy += 20; s.fdir *= -1; s.fdx += 0.15; s.fdrop = false;
               } else {
                    s.fx += s.fdx * s.fdir;
                    let hit = false;
                    for (let i = 0; i < alive.length; i++) {
                         const wx = GRID_X0 + alive[i].col * (EW + GAP_X) + s.fx;
                         if (wx < 16 || wx > W - 16) { hit = true; break; }
                    }
                    if (hit) s.fdrop = true;
               }

               // positions
               for (let i = 0; i < s.enemies.length; i++) {
                    const e = s.enemies[i];
                    e.x = GRID_X0 + e.col * (EW + GAP_X) + EW / 2 + s.fx;
                    e.y = GRID_Y0 + e.row * (EH + GAP_Y) + EH / 2 + s.fy;
               }

               // enemy fire
               s.eFireTimer++;
               if (s.eFireTimer >= s.eFireRate && alive.length) {
                    s.eFireTimer = 0;
                    const cols = new Set();
                    for (let i = 0; i < alive.length; i++) cols.add(alive[i].col);
                    const arr = [...cols];
                    const col = arr[Math.floor(Math.random() * arr.length)];
                    let bot = null;
                    for (let i = 0; i < alive.length; i++) {
                         if (alive[i].col === col && (!bot || alive[i].row > bot.row)) bot = alive[i];
                    }
                    if (bot) s.ebullets.push({ x: bot.x, y: bot.y + EH / 2 });
               }

               // move bullets
               for (let i = s.bullets.length - 1; i >= 0; i--) {
                    s.bullets[i].y -= 10;
                    s.bullets[i].x += s.bullets[i].vx;
                    if (s.bullets[i].y < -10) { s.bullets.splice(i, 1); }
               }
               for (let i = s.ebullets.length - 1; i >= 0; i--) {
                    s.ebullets[i].y += 5;
                    if (s.ebullets[i].y > H + 10) { s.ebullets.splice(i, 1); }
               }
               for (let i = s.powerups.length - 1; i >= 0; i--) {
                    s.powerups[i].y += s.powerups[i].vy;
                    if (s.powerups[i].y > H + 20) { s.powerups.splice(i, 1); }
               }

               // collisions: bullet vs enemy
               for (let bi = s.bullets.length - 1; bi >= 0; bi--) {
                    const b = s.bullets[bi];
                    for (let ei = 0; ei < s.enemies.length; ei++) {
                         const e = s.enemies[ei];
                         if (!e.alive) continue;
                         if (Math.abs(b.x - e.x) < EW * 0.6 && Math.abs(b.y - e.y) < EH * 0.6) {
                              e.hp--;
                              s.bullets.splice(bi, 1);
                              if (e.hp <= 0) {
                                   e.alive = false;
                                   s.score += ROW_PTS[e.type];
                                   addParticles(s, e.x, e.y, ROW_COLORS[e.type], true);
                                   spawnPowerup(s, e.x, e.y);
                              } else {
                                   addParticles(s, e.x, e.y, '#fff', false);
                              }
                              break;
                         }
                    }
               }

               // powerup pickup
               for (let i = s.powerups.length - 1; i >= 0; i--) {
                    const p = s.powerups[i];
                    if (Math.abs(p.x - s.player.x) < 24 && Math.abs(p.y - s.player.y) < 24) {
                         if (p.type === 'rapid') s.rapidFireTimer = 400;
                         if (p.type === 'spread') s.spreadFireTimer = 400;
                         if (p.type === 'shield') s.hasShield = true;
                         s.score += 50;
                         addParticles(s, s.player.x, s.player.y, pColors[p.type], false);
                         s.powerups.splice(i, 1);
                    }
               }

               // enemy bullet vs player
               if (s.invTimer === 0) {
                    for (let i = s.ebullets.length - 1; i >= 0; i--) {
                         const b = s.ebullets[i];
                         if (Math.abs(b.x - s.player.x) < 16 && Math.abs(b.y - s.player.y) < 16) {
                              s.ebullets.splice(i, 1);
                              if (s.hasShield) {
                                   s.hasShield = false;
                                   s.invTimer = 60;
                                   addParticles(s, s.player.x, s.player.y, '#A29BFE', true);
                              } else {
                                   s.lives--;
                                   s.invTimer = 100;
                                   s.rapidFireTimer = 0;
                                   s.spreadFireTimer = 0;
                                   addParticles(s, s.player.x, s.player.y, '#1ED696', true);
                              }
                              break;
                         }
                    }
               } else {
                    s.invTimer--;
               }

               // particles
               for (let i = s.particles.length - 1; i >= 0; i--) {
                    const p = s.particles[i];
                    p.x += p.vx; p.y += p.vy; p.life -= p.decay;
                    if (p.life <= 0) s.particles.splice(i, 1);
               }

               // sync react state every 5th frame to reduce re-renders
               if (s.tick % 5 === 0) { setScore(s.score); setLives(s.lives); }

               // end conditions
               if (s.lives <= 0) { setScore(s.score); setPhase('dead'); return; }
               const anyAlive = s.enemies.some(e => e.alive);
               if (!anyAlive) { setScore(s.score); setPhase('clear'); return; }
               if (s.enemies.some(e => e.alive && e.y > H - 60)) { setScore(s.score); setPhase('dead'); return; }

               // ── DRAW (no shadowBlur, cached sprites) ──────────────────────────
               ctx.fillStyle = '#050506';
               ctx.fillRect(0, 0, W, H);

               // Static grid background — single drawImage
               ctx.drawImage(grid, 0, 0);

               // Particles (simple rects, no shadow)
               for (let i = 0; i < s.particles.length; i++) {
                    const p = s.particles[i];
                    ctx.globalAlpha = p.life;
                    ctx.fillStyle = p.color;
                    ctx.fillRect(p.x - p.s / 2 | 0, p.y - p.s / 2 | 0, p.s, p.s);
               }
               ctx.globalAlpha = 1;

               // Enemies — cached sprite blit, animated frame toggle
               const frame2 = Math.floor(s.tick / 30) % 2 === 0;
               for (let i = 0; i < s.enemies.length; i++) {
                    const e = s.enemies[i];
                    if (!e.alive) continue;
                    const sprite = bakeSprite(e.type, ROW_COLORS[e.type]);
                    const yOff = frame2 ? 2 : -2;
                    ctx.drawImage(sprite, (e.x - sprite.width / 2) | 0, (e.y + yOff - sprite.height / 2) | 0);
               }

               // Powerups — simple rectangles, no shadow
               for (let i = 0; i < s.powerups.length; i++) {
                    const p = s.powerups[i];
                    const c = pColors[p.type];
                    ctx.strokeStyle = c;
                    ctx.lineWidth = 2;
                    ctx.strokeRect(p.x - 12, p.y - 12, 24, 24);
                    const sp = bakeSprite(`powerup_${p.type}`, c);
                    ctx.drawImage(sp, (p.x - sp.width / 2) | 0, (p.y - sp.height / 2) | 0);
               }

               // Player bullets
               ctx.fillStyle = '#1ED696';
               for (let i = 0; i < s.bullets.length; i++) {
                    ctx.fillRect(s.bullets[i].x - 2, s.bullets[i].y - 6, 4, 12);
               }

               // Enemy bullets
               ctx.fillStyle = '#FF4757';
               for (let i = 0; i < s.ebullets.length; i++) {
                    ctx.fillRect(s.ebullets[i].x - 2, s.ebullets[i].y, 4, 12);
               }

               // Player — cached
               const blink = s.invTimer > 0 && ((s.invTimer / 6 | 0) % 2 === 0);
               if (!blink) {
                    const ps = bakeSprite('player', '#1ED696', '#DCFFF5');
                    ctx.drawImage(ps, (s.player.x - ps.width / 2) | 0, (s.player.y - ps.height / 2) | 0);
                    if (s.hasShield) {
                         ctx.strokeStyle = 'rgba(30, 214, 150, 0.45)';
                         ctx.lineWidth = 2;
                         ctx.setLineDash([4, 4]);
                         ctx.beginPath();
                         ctx.arc(s.player.x, s.player.y, 24, 0, 6.28);
                         ctx.stroke();
                         ctx.setLineDash([]);
                    }
               }

               // Floor line
               ctx.globalAlpha = 0.3;
               ctx.strokeStyle = '#FF4757';
               ctx.setLineDash([10, 5]);
               ctx.lineWidth = 2;
               ctx.beginPath();
               ctx.moveTo(0, H - 55); ctx.lineTo(W, H - 55);
               ctx.stroke();
               ctx.setLineDash([]);
               ctx.globalAlpha = 1;

               raf.current = requestAnimationFrame(tick);
          }

          raf.current = requestAnimationFrame(tick);
          return () => cancelAnimationFrame(raf.current);
     }, [phase]);

     // keyboard
     useEffect(() => {
          const PR = new Set(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ']);
          const dn = e => { if (PR.has(e.key)) e.preventDefault(); if (e.key === 'Escape') { onClose(); return; } keys.current[e.key] = true; };
          const up = e => { keys.current[e.key] = false; };
          window.addEventListener('keydown', dn);
          window.addEventListener('keyup', up);
          return () => { window.removeEventListener('keydown', dn); window.removeEventListener('keyup', up); };
     }, [onClose]);

     // touch
     const ts = e => { touchX.current = e.touches[0].clientX; };
     const tm = e => {
          if (touchX.current == null || !S.current) return;
          S.current.player.x = Math.max(20, Math.min(W - 20, S.current.player.x + e.touches[0].clientX - touchX.current));
          touchX.current = e.touches[0].clientX;
     };
     const te = () => { if (S.current) S.current.bullets.push({ x: S.current.player.x, y: S.current.player.y - 16, vx: 0 }); };

     useEffect(() => () => cancelAnimationFrame(raf.current), []);

     return (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3">
               <motion.div
                    initial={{ opacity: 0, scale: 0.88, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.88, y: 30 }}
                    transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                    className="relative bg-[#070708] border border-[#1A936F]/35 rounded-2xl shadow-[0_0_60px_rgba(30,214,150,0.1)] flex flex-col overflow-hidden"
               >
                    {/* CRT scanline — pure CSS, no JS overhead */}
                    <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
                         style={{ background: 'linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.25) 50%)', backgroundSize: '100% 4px' }} />

                    {/* HUD */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A936F]/30 bg-[#08080a] z-20">
                         {/* Title */}
                         <div className="flex items-center gap-3">
                              <div className="flex gap-[2px]">
                                   {[1, 2, 3].map(i => <div key={i} className="w-[3px] h-3 bg-[#1ED696]" style={{ opacity: 1.1 - i * 0.3 }} />)}
                              </div>
                              <span className="font-mono font-bold text-sm tracking-[0.2em] text-[#1ED696]">SPACE INVADERS</span>
                         </div>

                         {/* Stats */}
                         <div className="flex gap-6 font-mono text-sm items-center">
                              <div className="flex items-center gap-2">
                                   <span className="text-[#8FE7C3]/40 text-[10px] tracking-widest">WAVE</span>
                                   <span className="text-[#1ED696] font-bold text-lg tabular-nums">{String(wave).padStart(2, '0')}</span>
                              </div>
                              <div className="w-px h-5 bg-[#1A936F]/30" />
                              <div className="flex items-center gap-2">
                                   <span className="text-[#8FE7C3]/40 text-[10px] tracking-widest">SCORE</span>
                                   <span className="text-[#1ED696] font-bold text-lg tabular-nums">{String(score).padStart(5, '0')}</span>
                              </div>
                              <div className="w-px h-5 bg-[#1A936F]/30" />
                              <div className="flex items-center gap-2">
                                   <span className="text-[#8FE7C3]/40 text-[10px] tracking-widest">LIVES</span>
                                   <div className="flex gap-1.5 items-center">
                                        {Array.from({ length: 3 }).map((_, i) => (
                                             <svg key={i} width="14" height="13" viewBox="0 0 14 13" className="block">
                                                  <path d="M7 12 L1.5 6 C0 4.5, 0 2, 1.5 0.7 C3 -0.5, 5 0, 7 2.5 C9 0, 11 -0.5, 12.5 0.7 C14 2, 14 4.5, 12.5 6 Z"
                                                       fill={i < lives ? '#FF4757' : '#2a2a2a'}
                                                       style={{ transition: 'fill 0.2s' }}
                                                  />
                                             </svg>
                                        ))}
                                   </div>
                              </div>
                         </div>

                         {/* Close */}
                         <button onClick={onClose} className="text-[#8FE7C3]/40 hover:text-[#FF4757] p-1.5 rounded border border-transparent hover:border-[#FF4757]/30 transition-all">
                              <IoClose size={18} />
                         </button>
                    </div>

                    <div className="relative" style={{ width: W, height: H }} onTouchStart={ts} onTouchMove={tm} onTouchEnd={te}>
                         <canvas ref={canvasRef} width={W} height={H} className="block" style={{ imageRendering: 'pixelated' }} />

                         <AnimatePresence>
                              {phase === 'start' && (
                                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-6 z-20">
                                        <h2 className="text-3xl font-bold font-mono text-[#1ED696]">SPACE INVADERS</h2>
                                        <div className="text-[#8FE7C3] font-mono text-xs text-center flex flex-col gap-2 bg-black/50 p-4 border border-[#1A936F]/30">
                                             <p>Defend the sector from invasion.</p>
                                             <p className="text-[#FF4757]">Do not let them cross the red line.</p>
                                        </div>
                                        <button onClick={() => launch(1)} className="px-8 py-3 bg-[#1ED696] text-black font-mono font-bold hover:bg-[#8FE7C3] transition-all tracking-widest text-sm uppercase">
                                             Insert Coin
                                        </button>
                                   </motion.div>
                              )}
                              {phase === 'dead' && (
                                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4 z-20">
                                        <h3 className="text-4xl font-bold text-[#FF4757] font-mono">GAME OVER</h3>
                                        <p className="text-white font-mono text-sm bg-black p-2 border border-[#FF4757]/50">Score: <span className="text-[#1ED696] font-bold">{score}</span></p>
                                        <button onClick={() => launch(1)} className="px-6 py-2 bg-transparent text-[#1ED696] font-mono font-bold border-2 border-[#1ED696] hover:bg-[#1ED696] hover:text-black transition-colors tracking-widest mt-4">
                                             CONTINUE?
                                        </button>
                                   </motion.div>
                              )}
                              {phase === 'clear' && (
                                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4 z-20">
                                        <h3 className="text-3xl font-bold text-[#1ED696] font-mono tracking-widest">SECTOR CLEARED</h3>
                                        <p className="text-[#8FE7C3]/80 font-mono text-sm">Score: <span className="text-white font-bold">{score}</span></p>
                                        <button onClick={nextWave} className="mt-4 px-6 py-2 bg-[#1ED696] text-black font-mono font-bold hover:bg-[#fff] transition-colors tracking-widest">
                                             NEXT WAVE →
                                        </button>
                                   </motion.div>
                              )}
                         </AnimatePresence>
                    </div>

                    {/* Footer */}
                    <div className="flex gap-6 justify-center items-center px-5 py-3.5 text-xs font-mono bg-[#08080a] border-t border-[#1A936F]/30 z-20 w-full">
                         <div className="flex items-center gap-2">
                              <div className="flex gap-[2px]"><div className="w-[6px] h-[3px] bg-white" /><div className="w-[3px] h-[3px] bg-white/50" /><div className="w-[6px] h-[3px] bg-white" /></div>
                              <span className="text-[#8FE7C3]/60">MOVE</span>
                         </div>
                         <div className="w-px h-4 bg-[#1A936F]/20" />
                         <div className="flex items-center gap-2">
                              <div className="w-5 h-[3px] bg-[#1ED696]" />
                              <span className="text-[#8FE7C3]/60">FIRE</span>
                         </div>
                         <div className="w-px h-4 bg-[#1A936F]/20" />
                         <div className="flex items-center gap-2">
                              <div className="flex gap-1">
                                   <div className="w-[6px] h-[6px] bg-[#FFEAA7]" />
                                   <div className="w-[6px] h-[6px] bg-[#00CEC9]" />
                                   <div className="w-[6px] h-[6px] bg-[#A29BFE]" />
                              </div>
                              <span className="text-[#8FE7C3]/60">POWERUPS</span>
                         </div>
                         <div className="w-px h-4 bg-[#1A936F]/20" />
                         <div className="flex items-center gap-2">
                              <span className="text-[#FF4757] text-[10px]">ESC</span>
                              <span className="text-[#8FE7C3]/60">CLOSE</span>
                         </div>
                    </div>
               </motion.div>
          </div>
     );
}
