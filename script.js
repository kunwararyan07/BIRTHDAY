/* ═══════════════════════════════════════════════════════════════
   PROJECT HARSHITA — script.js
   Cinematic birthday experience
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ────────────────────────────────────────────────────────────────
   CONFIGURATION — Edit placeholders here
──────────────────────────────────────────────────────────────── */
const CONFIG = {
  LETTER_CONTENT: `Dekh tereko aisa letter toh koi bhi likh sakta hai
  par ye cheez ke tere liye aise website bana kar host kar ke 
  sirf tere liye kishi ne nhi kia hoga and obviusly I want to do that things 
  for you jo ki ajj tak kishi ne nhi ki as I want to be the first person to 
  be the one who did this fro you........But in sab ka ye mtlb mat nikal lena ki 
  i will never write a love leter for you offcourse i will baby ye toh is liye kia
  taki aisa sabse alag dekhe mere cheez and i hope jab tu ye sab read kar rhi ho mai 
  tere bagal me hounga soo pleasee kiss me tight after reading this line 
  And I LOVE YOU A LOT MY GIRL I LOVE YOU FOREVER!!!!! nothing in this world
  could seperate us toh please tu kabhi tension mat lia kar and tere sirf ye 
  bithday nhi babu tere haar birthday pe sath rahunga and tere haad se zada pyyar karunga 
  basss please never give up on baby please never give up on your nayraaa
  i am a bit stupid but I know one thing clearly that I love you a lot and will
  love you a lot till my last breath and haaa ye sab maine khud banaya hai ter liye 
  tere birthday ke liye toh aise mat sochna ki kishi aur se help ya gpt nhi kia hai 
  i did all this for you babu becaue i love you.......

Happy Birthday, Harshita My BAby My Cutie My Pretty bitch 🌸

May this year be the most extraordinary yet.`,
  
  FINAL_MESSAGE: `This little corner of the internet was made with love, for you. No matter where you are or how far life takes you — know that you are celebrated, cherished, and deeply loved.`,
  
  SENDER_NAME: `{{YOUR_NAYRAAAA}}`,

  GALLERY_CAPTIONS: [
    "Look at my BICEPS bitch!!",
    "ayyeee hayeee kitni bholi lag rhi hai....Par hai thodi",
    "I just can't FUCKING believe that this baddie is my babayyy!!",
    "Yeahh you see yourself.....and yeah you are fucking mine",
    "In this pic the mountains are beautifull BUT!! not more than my babuu",
    "WOWWWW!!! hasssi toh dekho is bacche ki",
    "Massoomiyat tohhh haiii!",
    "My girl can be a bitch baddie tooo!!!!!",
    "Pose?? what pose bitvh my girl looks beautifull in every pose",
    "FOOKKING Hell my girl is a traditional BADDIEE!!",
    "CHAL BE PHOTO KHEECH POSE DE RHI HOOO(ATTITUDE TOH BACHPAN SE HAI)",
    "Cake to bade hi man se cut karti hooo",
    "You know this site hanged a lot because it is not able to handle the beauty of my girl!",
    "My sleeping beauty can sleep anywhere even in metro",
    "Mirror mirror who is the beautifull of all..... offcourse bitch just you areeee",
    "Bachpan se hi muh bna hua hai madam jiii ka tohh",
    "Wowww what a beAutafull babu",
    "How can i forget this day this trip...these are the moment from where we started to build the best fro our relationship",
    "Remember this day cutie??",
    "My didi:- areey ye tumahri bandi influencer hai kyaaaa??...(after looking at this pic)"
  ]
};

/* ────────────────────────────────────────────────────────────────
   STATE
──────────────────────────────────────────────────────────────── */
const state = {
  musicEnabled: false,
  isLoaded: false,
  currentLightbox: 0,
  letterOpened: false,
  finaleTriggered: false,
  cursorX: 0,
  cursorY: 0,
  fireworksInterval: null,
};

/* ────────────────────────────────────────────────────────────────
   DOM REFERENCES
──────────────────────────────────────────────────────────────── */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const DOM = {
  loader: $('#loader'),
  loaderBarFill: $('#loader-bar-fill'),
  loaderStars: $('#loader-stars'),
  musicModal: $('#music-modal'),
  musicYes: $('#btn-music-yes'),
  musicNo: $('#btn-music-no'),
  bgMusic: $('#bg-music'),
  musicControls: $('#music-controls'),
  musicToggle: $('#btn-music-toggle'),
  iconPlay: $('#icon-play'),
  iconPause: $('#icon-pause'),
  volumeSlider: $('#volume-slider'),
  musicDisc: $('#music-disc'),
  musicEq: $('#music-eq'),
  musicProgressFill: $('#music-progress-fill'),
  musicTime: $('#music-time'),
  mainSite: $('#main-site'),
  heroCanvas: $('#hero-canvas'),
  heroParticles: $('#hero-particles'),
  celebrateBtn: $('#celebrate-btn'),
  galleryGrid: $('#gallery-grid'),
  galleryCards: $$('.gallery-card'),
  lightbox: $('#lightbox'),
  lightboxMedia: $('#lightbox-media'),
  lightboxLabel: $('#lightbox-label'),
  lightboxCaption: $('#lightbox-caption'),
  lightboxCounter: $('#lightbox-counter'),
  lightboxClose: $('#lightbox-close'),
  lightboxPrev: $('#lightbox-prev'),
  lightboxNext: $('#lightbox-next'),
  envelopeScene: $('#envelope-scene'),
  envelope: $('#envelope'),
  envFlap: $('#env-flap'),
  letterContent: $('#letter-content'),
  letterSignature: $('#letter-signature'),
  envelopeHint: $('#envelope-hint'),
  fireworksCanvas: $('#fireworks-canvas'),
  petalsContainer: $('#petals-container'),
};

/* ────────────────────────────────────────────────────────────────
   GSAP PLUGINS
──────────────────────────────────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger, TextPlugin);

/* ────────────────────────────────────────────────────────────────
   1. PREMIUM CURSOR TRAIL
──────────────────────────────────────────────────────────────── */
function initCursorGlow() {
  // Disable on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  // Soft ambient glow that follows cursor (unchanged)
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  // Trail particle pool — reuse DOM nodes for performance
  const POOL_SIZE = 28;
  const pool = [];
  for (let i = 0; i < POOL_SIZE; i++) {
    const el = document.createElement('div');
    el.className = 'cursor-particle';
    el.setAttribute('aria-hidden', 'true');
    document.body.appendChild(el);
    pool.push({ el, active: false });
  }

  function getFromPool() {
    return pool.find(p => !p.active) || null;
  }

  // Star shapes
  const STAR_CHARS = ['✦', '✧', '⋆', '·', '✺', '✹'];
  const HEART_CHARS = ['❤️', '💜', '🩷'];

  let moveThrottle = 0;
  let heartChance = 0;

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;

    const now = Date.now();
    if (now - moveThrottle < 38) return; // ~26fps spawn rate, smooth but not heavy
    moveThrottle = now;

    heartChance++;
    const isHeart = heartChance % 9 === 0; // One heart roughly every 9 particles

    const slot = getFromPool();
    if (!slot) return;

    slot.active = true;
    const el = slot.el;

    // Randomise spawn slightly off cursor
    const ox = (Math.random() - 0.5) * 18;
    const oy = (Math.random() - 0.5) * 18;
    const char = isHeart
      ? HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)]
      : STAR_CHARS[Math.floor(Math.random() * STAR_CHARS.length)];

    const size = isHeart
      ? (Math.random() * 8 + 10)
      : (Math.random() * 7 + 5);

    el.textContent = char;
    el.style.cssText = `
      left: ${e.clientX + ox}px;
      top:  ${e.clientY + oy}px;
      font-size: ${size}px;
      opacity: 1;
      transform: translate(-50%,-50%) scale(1) rotate(${(Math.random()-0.5)*60}deg);
      color: ${isHeart ? '#EC4899' : (Math.random() > 0.5 ? '#C4B5FD' : '#A855F7')};
      text-shadow: 0 0 ${isHeart ? 10 : 6}px currentColor;
    `;

    // Animate: float up + fade + scale down
    const driftX = (Math.random() - 0.5) * 40;
    const driftY = -(Math.random() * 55 + 25);
    const duration = isHeart ? 1400 : 900;

    gsap.to(el, {
      x: driftX,
      y: driftY,
      opacity: 0,
      scale: isHeart ? 0.4 : 0.1,
      duration: duration / 1000,
      ease: 'power2.out',
      onComplete: () => {
        el.style.cssText = 'opacity:0;';
        gsap.set(el, { x: 0, y: 0, scale: 1 });
        slot.active = false;
      }
    });
  });

  function animateGlow() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    glow.style.left = currentX + 'px';
    glow.style.top  = currentY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
}

/* ────────────────────────────────────────────────────────────────
   2. LOADER STAR CANVAS
──────────────────────────────────────────────────────────────── */
function initLoaderStars() {
  const canvas = DOM.loaderStars;
  const ctx = canvas.getContext('2d');
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const stars = Array.from({ length: 180 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.4 + 0.3,
    opacity: Math.random(),
    speed: Math.random() * 0.015 + 0.005,
    phase: Math.random() * Math.PI * 2,
  }));

  let running = true;
  let frame = 0;

  function draw() {
    if (!running) return;
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
      star.opacity = 0.3 + 0.7 * Math.abs(Math.sin(frame * star.speed + star.phase));
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(196, 181, 253, ${star.opacity})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
  return () => { running = false; };
}

/* ────────────────────────────────────────────────────────────────
   3. TULIP STROKE ANIMATION
──────────────────────────────────────────────────────────────── */
function animateTulip() {
  const paths = $$('.tulip-path');
  const glowDot = $('.tulip-glow');
  
  // Measure each path length
  paths.forEach(path => {
    const len = path.getTotalLength ? path.getTotalLength() : 500;
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
  });

  // Animate paths in sequence
  const delays = [0, 0.3, 0.5, 0.8, 1.1, 1.4];
  const durations = [0.9, 0.5, 0.5, 0.6, 0.6, 0.7];

  paths.forEach((path, i) => {
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: durations[i] || 0.5,
      delay: delays[i] || 0,
      ease: 'power2.out',
    });
  });

  // Glow dot appears after all paths drawn
  gsap.to(glowDot, {
    opacity: 1,
    duration: 0.6,
    delay: 2.0,
    ease: 'power2.out',
    yoyo: true,
    repeat: -1,
  });
}

/* ────────────────────────────────────────────────────────────────
   4. LOADER SEQUENCE
──────────────────────────────────────────────────────────────── */
function runLoader() {
  const stopStars = initLoaderStars();
  animateTulip();

  // Progress bar animation
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 3 + 1;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      // Loader done
      setTimeout(() => {
        exitLoader(stopStars);
      }, 400);
    }
    DOM.loaderBarFill.style.width = progress + '%';
  }, 60);
}

function exitLoader(stopStars) {
  gsap.to(DOM.loader, {
    opacity: 0,
    scale: 1.04,
    duration: 0.9,
    ease: 'power2.inOut',
    onComplete: () => {
      DOM.loader.remove();
      if (stopStars) stopStars();
      // No music modal — go straight to the site and show player
      revealMainSite();
      showMusicControls(false);
    }
  });
}

/* ────────────────────────────────────────────────────────────────
   5. MUSIC MODAL
──────────────────────────────────────────────────────────────── */
function showMusicModal() {
  DOM.musicModal.removeAttribute('hidden');
  
  requestAnimationFrame(() => {
    DOM.musicModal.classList.add('visible');
  });
}

function hideMusicModal(withMusic) {
  state.musicEnabled = withMusic;

  // ── MUSIC: start FIRST, before any animations ──────────────
  // Browser autoplay policy: play() must be called synchronously
  // inside (or very close to) the user-gesture click handler.
  if (withMusic && DOM.bgMusic) {
    const targetVol = parseFloat(DOM.volumeSlider.value) || 0.35;
    DOM.bgMusic.muted  = false;
    DOM.bgMusic.volume = targetVol;

    // play() returns a Promise — handle it correctly
    const playPromise = DOM.bgMusic.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Playback started — UI is updated via the 'play' event listener
        })
        .catch((err) => {
          // Only reaches here if the browser still blocked it
          // (very rare since we're inside a click handler)
          console.warn('Audio play blocked:', err);
          // Show fallback hint in the player
          const timeEl = document.getElementById('music-time');
          if (timeEl) {
            timeEl.textContent = '▶ tap';
            timeEl.style.color = 'rgba(236,72,153,0.8)';
          }
          updateMusicIcon(false);
        });
    }

    showMusicControls(true);
  } else {
    // No music — still set volume so slider is ready
    if (DOM.bgMusic) {
      DOM.bgMusic.volume = parseFloat(DOM.volumeSlider.value) || 0.35;
    }
    showMusicControls(false);
  }

  // ── MODAL CLOSE ANIMATION: after triggering play ────────────
  gsap.to(DOM.musicModal, {
    opacity: 0,
    y: -20,
    scale: 0.97,
    duration: 0.5,
    ease: 'power2.in',
    onComplete: () => {
      DOM.musicModal.setAttribute('hidden', '');
      DOM.musicModal.remove();
      revealMainSite();
    }
  });
}

function showMusicControls(playing) {
  DOM.musicControls.removeAttribute('hidden');
  requestAnimationFrame(() => {
    DOM.musicControls.classList.add('visible');
    updateMusicIcon(playing);
    // Show the hint text alongside the music player
    const hint = document.getElementById('music-hint');
    if (hint) hint.classList.add('visible');
  });
}

function updateMusicIcon(playing) {
  if (playing) {
    DOM.iconPlay.style.display = 'none';
    DOM.iconPause.style.display = '';
    DOM.musicToggle.setAttribute('aria-label', 'Pause music');
  } else {
    DOM.iconPlay.style.display = '';
    DOM.iconPause.style.display = 'none';
    DOM.musicToggle.setAttribute('aria-label', 'Play music');
  }
}

/* ────────────────────────────────────────────────────────────────
   6. REVEAL MAIN SITE
──────────────────────────────────────────────────────────────── */
function revealMainSite() {
  DOM.mainSite.removeAttribute('hidden');
  
  // Kickstart hero animations
  gsap.timeline()
    .to('.hero-content', { opacity: 1, duration: 0 })
    .from(DOM.mainSite, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    })
    .add(() => {
      initHeroCanvas();
      initHeroParticles();
      animateHeroContent();
      initHeroParallax();
      initScrollAnimations();
      initGallery();
      initLightbox();
      initEnvelope();
    });
}

/* ────────────────────────────────────────────────────────────────
   7. HERO CANVAS (Stars + Nebula)
──────────────────────────────────────────────────────────────── */
function initHeroCanvas() {
  const canvas = DOM.heroCanvas;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    generateStars();
    generateNebula();
  }

  let stars = [];
  let nebulaClouds = [];

  function generateStars() {
    stars = Array.from({ length: 280 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.2,
      opacity: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.012 + 0.003,
      phase: Math.random() * Math.PI * 2,
      twinkle: Math.random() > 0.6,
    }));
  }

  function generateNebula() {
    nebulaClouds = [
      { x: canvas.width * 0.15, y: canvas.height * 0.25, r: 200, opacity: 0.06 },
      { x: canvas.width * 0.75, y: canvas.height * 0.6, r: 280, opacity: 0.05 },
      { x: canvas.width * 0.5, y: canvas.height * 0.1, r: 180, opacity: 0.04 },
    ];
  }

  let frame = 0;

  function draw() {
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Nebula clouds
    nebulaClouds.forEach(cloud => {
      const grad = ctx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, cloud.r);
      grad.addColorStop(0, `rgba(124, 58, 237, ${cloud.opacity})`);
      grad.addColorStop(0.5, `rgba(168, 85, 247, ${cloud.opacity * 0.5})`);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    // Stars
    stars.forEach(star => {
      let opacity = star.opacity;
      if (star.twinkle) {
        opacity = star.opacity * (0.5 + 0.5 * Math.sin(frame * star.speed + star.phase));
      }
      
      // Glow for brighter stars
      if (star.r > 1.2) {
        const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r * 3);
        glow.addColorStop(0, `rgba(196, 181, 253, ${opacity * 0.4})`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220, 210, 255, ${opacity})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  draw();
}

/* ────────────────────────────────────────────────────────────────
   8. HERO PARTICLES
──────────────────────────────────────────────────────────────── */
function initHeroParticles() {
  const container = DOM.heroParticles;
  const count = 22;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const duration = Math.random() * 12 + 10;
    const delay = Math.random() * -20;
    const hue = Math.random() > 0.5 ? '196, 181, 253' : '168, 85, 247';

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      background: rgba(${hue}, ${Math.random() * 0.5 + 0.2});
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      box-shadow: 0 0 ${size * 2}px rgba(${hue}, 0.3);
    `;
    container.appendChild(p);
  }
}

/* ────────────────────────────────────────────────────────────────
   9. HERO CONTENT ANIMATION
──────────────────────────────────────────────────────────────── */
function animateHeroContent() {
  const items = $$('.reveal-item');
  
  gsap.to(items, {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: 1.1,
    stagger: 0.14,
    ease: 'power3.out',
    delay: 0.2,
  });

  // Moon whisper: fade in gently after hero settles
  const whisper = $('.moon-whisper');
  if (whisper) {
    gsap.to(whisper, {
      opacity: 1,
      duration: 1.8,
      delay: 1.6,
      ease: 'power2.out',
    });
  }
}

/* ────────────────────────────────────────────────────────────────
   10. CANDLE BLOW-OUT + CONFETTI CELEBRATION (infinitely reusable)
──────────────────────────────────────────────────────────────── */
let celebrationRunning = false;

function relightCandles() {
  $$('.flame').forEach(f => {
    f.classList.remove('blown-out');
    void f.offsetWidth; // force reflow — restarts CSS animation cleanly
  });
  $$('.candle-smoke').forEach(s => {
    s.classList.remove('active');
    void s.offsetWidth;
  });
}

function blowOutCandles() {
  if (celebrationRunning) return;
  celebrationRunning = true;

  const btn = DOM.celebrateBtn;
  btn.disabled = true;
  btn.textContent = 'Celebrating ✦';

  // Step 1: Stagger blow-out per candle (left → right)
  $$('.flame').forEach((flame, i) => {
    setTimeout(() => flame.classList.add('blown-out'), i * 160);
  });

  // Step 2: Smoke rises after flames go out
  setTimeout(() => {
    $$('.candle-smoke').forEach((smoke, i) => {
      setTimeout(() => smoke.classList.add('active'), i * 120);
    });
  }, 700);

  // Step 3: Confetti burst
  setTimeout(() => fireConfetti(), 1200);

  // Step 4: Sparkle burst from button
  setTimeout(() => spawnCelebrationSparkles(btn), 1000);

  // Step 5: Relight after 2.5s + re-enable button
  setTimeout(() => {
    relightCandles();
    btn.textContent = 'Celebrate ✦';
    btn.disabled = false;
    celebrationRunning = false;
  }, 3200);
}

function spawnCelebrationSparkles(anchor) {
  const rect  = anchor.getBoundingClientRect();
  const cx    = rect.left + rect.width  / 2;
  const cy    = rect.top  + rect.height / 2;
  const chars = ['✦', '✧', '⋆', '·', '✺'];

  for (let i = 0; i < 12; i++) {
    const el    = document.createElement('div');
    el.className = 'cursor-particle';
    el.setAttribute('aria-hidden', 'true');
    el.textContent = chars[i % chars.length];
    const angle = (i / 12) * Math.PI * 2;
    const dist  = Math.random() * 60 + 30;
    el.style.cssText = `left:${cx}px;top:${cy}px;font-size:${Math.random()*8+8}px;opacity:1;transform:translate(-50%,-50%);color:#C4B5FD;text-shadow:0 0 8px #A855F7;`;
    document.body.appendChild(el);
    gsap.to(el, {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      opacity: 0, scale: 0,
      duration: 1.1, ease: 'power2.out',
      onComplete: () => el.remove()
    });
  }
}

function fireConfetti() {
  const colors = ['#7C3AED', '#A855F7', '#C4B5FD', '#F4D35E', '#EC4899', '#FAFAFA'];
  const fire = (opts) => confetti({ ...opts, origin: { y: 0.6 }, colors, disableForReducedMotion: true });
  fire({ spread: 26, startVelocity: 55, particleCount: 80 });
  setTimeout(() => fire({ spread: 60,  particleCount: 60 }), 150);
  setTimeout(() => fire({ spread: 100, decay: 0.91, scalar: 0.8, particleCount: 80 }), 300);
  setTimeout(() => fire({ spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, particleCount: 40 }), 500);
  setTimeout(() => fire({ spread: 120, startVelocity: 45, particleCount: 40 }), 700);
}

/* ────────────────────────────────────────────────────────────────
   11. SCROLL ANIMATIONS (GSAP ScrollTrigger)
──────────────────────────────────────────────────────────────── */
function initScrollAnimations() {
  // Gallery section header
  gsap.utils.toArray('.gallery-reveal').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.9,
      delay: i * 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      }
    });
  });

  // Letter section reveal
  gsap.utils.toArray('.letter-reveal').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      delay: i * 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      }
    });
  });

  // Finale reveal elements
  gsap.utils.toArray('.finale-reveal').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      delay: i * 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#finale',
        start: 'top 75%',
        toggleActions: 'play none none none',
      }
    });
  });

  // Finale effects (fireworks + petals) trigger
  ScrollTrigger.create({
    trigger: '#finale',
    start: 'top 75%',
    onEnter: () => {
      if (!state.finaleTriggered) {
        state.finaleTriggered = true;
        setTimeout(startFinale, 600);
      }
    }
  });

  // Footer fade
  gsap.from('.site-footer', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.site-footer',
      start: 'top 95%',
    }
  });
}

/* ────────────────────────────────────────────────────────────────
   12. GALLERY
──────────────────────────────────────────────────────────────── */
function initGallery() {
  // Update captions from config
  const cards = $$('.gallery-card');
  cards.forEach((card, i) => {
    const caption = card.querySelector('.gallery-caption p');
    if (caption && CONFIG.GALLERY_CAPTIONS[i]) {
      caption.textContent = CONFIG.GALLERY_CAPTIONS[i];
    }
  });

  // Scroll-triggered stagger entrance
  gsap.utils.toArray('.gallery-card').forEach((card, i) => {
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 92%',
        toggleActions: 'play none none none',
      },
      delay: (i % 4) * 0.07,
    });
  });

  // Click to open lightbox
  cards.forEach((card, i) => {
    card.addEventListener('click', () => openLightbox(i));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(i);
      }
    });
  });
}

/* ────────────────────────────────────────────────────────────────
   13. LIGHTBOX
──────────────────────────────────────────────────────────────── */
function initLightbox() {
  DOM.lightboxClose.addEventListener('click', closeLightbox);
  DOM.lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
  DOM.lightboxNext.addEventListener('click', () => navigateLightbox(1));

  // Backdrop click
  DOM.lightbox.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (DOM.lightbox.classList.contains('open')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    }
  });

  // Touch/swipe support
  let touchStartX = 0;
  DOM.lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  DOM.lightbox.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 50) {
      navigateLightbox(delta < 0 ? 1 : -1);
    }
  }, { passive: true });
}

function openLightbox(index) {
  state.currentLightbox = index;
  updateLightboxContent(index);

  DOM.lightbox.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  
  requestAnimationFrame(() => {
    DOM.lightbox.classList.add('open');
  });

  DOM.lightboxClose.focus();
}

function closeLightbox() {
  DOM.lightbox.classList.remove('open');
  
  setTimeout(() => {
    DOM.lightbox.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }, 400);
}

function navigateLightbox(direction) {
  const cards = $$('.gallery-card');
  const total = cards.length;
  state.currentLightbox = (state.currentLightbox + direction + total) % total;

  // Slide animation
  gsap.to(DOM.lightboxMedia, {
    x: direction > 0 ? -30 : 30,
    opacity: 0,
    duration: 0.2,
    ease: 'power2.in',
    onComplete: () => {
      updateLightboxContent(state.currentLightbox);
      gsap.fromTo(DOM.lightboxMedia,
        { x: direction > 0 ? 30 : -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  });
}

function updateLightboxContent(index) {
  const cards = $$('.gallery-card');
  const card = cards[index];
  if (!card) return;

  const label = card.querySelector('.placeholder-text');
  const captionEl = card.querySelector('.gallery-caption p');
  const imgEl = card.querySelector('img');

  // Update label
  DOM.lightboxLabel.textContent = label ? label.textContent : `PHOTO_${String(index + 1).padStart(2, '0')}`;

  // Update caption
  DOM.lightboxCaption.textContent = captionEl ? captionEl.textContent : CONFIG.GALLERY_CAPTIONS[index] || '';

  // If there's an actual image, show it
  if (imgEl) {
    const existing = DOM.lightboxMedia.querySelector('img');
    if (existing) existing.remove();
    const newImg = document.createElement('img');
    newImg.src = imgEl.src;
    newImg.alt = imgEl.alt || `Memory ${index + 1}`;
    newImg.style.cssText = `
      width: 100%;
      height: auto;
      max-height: 72svh;
      object-fit: contain;
      object-position: center;
      display: block;
      border-radius: 8px;
    `;
    DOM.lightboxMedia.prepend(newImg);
    DOM.lightboxMedia.querySelector('.lightbox-placeholder').style.display = 'none';
  } else {
    const existing = DOM.lightboxMedia.querySelector('img');
    if (existing) existing.remove();
    const placeholder = DOM.lightboxMedia.querySelector('.lightbox-placeholder');
    if (placeholder) placeholder.style.display = '';
  }

  // Counter
  DOM.lightboxCounter.textContent = `${index + 1} / ${cards.length}`;
}

/* ────────────────────────────────────────────────────────────────
   14. ENVELOPE & LETTER
──────────────────────────────────────────────────────────────── */
function initEnvelope() {
  // Set final message
  const finalTagline = $('#finale .finale-tagline');
  if (finalTagline) finalTagline.textContent = CONFIG.FINAL_MESSAGE;

  // Set sender name
  const sigName = $('.sig-name');
  if (sigName) sigName.textContent = CONFIG.SENDER_NAME;

  const trigger = () => openEnvelope();

  DOM.envelopeScene.addEventListener('click', trigger);
  DOM.envelopeScene.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      trigger();
    }
  });
}

function openEnvelope() {
  if (state.letterOpened) return;
  state.letterOpened = true;

  DOM.envelopeScene.setAttribute('aria-expanded', 'true');
  DOM.envelopeScene.style.cursor = 'default';

  // Hide hint
  if (DOM.envelopeHint) {
    gsap.to(DOM.envelopeHint, { opacity: 0, y: 10, duration: 0.3 });
  }

  // Step 1: Flood screen with floating hearts (cinematic moment)
  spawnLetterHearts();

  // Step 2: Begin envelope flap opening while hearts are floating
  setTimeout(() => {
    DOM.envelope.classList.add('open');
  }, 400);

  // Step 3: As hearts fade, paper rises — start typewriter after paper is visible
  setTimeout(() => {
    typeLetterContent();
  }, 2200);
}

function spawnLetterHearts() {
  const count = 60;
  const hearts = ['❤️', '💜', '🩷', '❤️', '💜', '❤️'];
  const container = document.body;

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'letter-heart';
      el.setAttribute('aria-hidden', 'true');
      el.textContent = hearts[Math.floor(Math.random() * hearts.length)];

      const startX = Math.random() * 100;  // % of vw
      const size   = Math.random() * 20 + 14;
      const dur    = Math.random() * 1.4 + 1.6;
      const rot    = (Math.random() - 0.5) * 30;
      const drift  = (Math.random() - 0.5) * 80;

      el.style.cssText = `
        left: ${startX}vw;
        bottom: -60px;
        font-size: ${size}px;
        opacity: 0;
      `;
      container.appendChild(el);

      // Animate upward
      gsap.fromTo(el,
        { y: 0, opacity: 0, rotation: rot, x: 0 },
        {
          y: -(window.innerHeight * (0.5 + Math.random() * 0.6)),
          x: drift,
          opacity: 1,
          rotation: rot + (Math.random() - 0.5) * 20,
          duration: dur,
          ease: 'power1.out',
          delay: Math.random() * 0.8,
          onComplete: () => {
            gsap.to(el, {
              opacity: 0,
              y: `-=${40}`,
              duration: 0.5,
              onComplete: () => el.remove()
            });
          }
        }
      );
    }, i * 28);
  }
}

function typeLetterContent() {
  const el = DOM.letterContent;
  const text = CONFIG.LETTER_CONTENT;
  let i = 0;
  const speed = 22; // ms per character

  el.textContent = '';

  function type() {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
      setTimeout(type, speed + (text[i] === '\n' ? 80 : 0));
    }
  }
  
  type();
}

/* ────────────────────────────────────────────────────────────────
   15. FINALE — Fireworks + Petals
──────────────────────────────────────────────────────────────── */
function startFinale() {
  spawnPetals();
  startFireworks();
}

function spawnPetals() {
  const container = DOM.petalsContainer;
  const colors = [
    'rgba(196, 181, 253, 0.7)',
    'rgba(168, 85, 247, 0.6)',
    'rgba(124, 58, 237, 0.5)',
    'rgba(244, 211, 94, 0.5)',
    'rgba(236, 72, 153, 0.4)',
    'rgba(255, 255, 255, 0.3)',
  ];

  for (let i = 0; i < 30; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';

    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 12 + 8;
    const left = Math.random() * 110 - 5;
    const duration = Math.random() * 10 + 8;
    const delay = Math.random() * 12;
    const rotation = Math.random() * 45 + 10;

    petal.style.cssText = `
      width: ${size}px;
      height: ${size * 1.4}px;
      left: ${left}%;
      background: ${color};
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
      border-radius: 50% 50% ${rotation}% ${100 - rotation}%;
      transform: rotate(${Math.random() * 360}deg);
    `;

    container.appendChild(petal);
  }
}

function startFireworks() {
  const canvas = DOM.fireworksCanvas;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  let frame = 0;

  class Firework {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height * 0.6;
      this.particles = [];
      this.exploded = false;
      this.rocketY = canvas.height;
      this.targetY = this.y;
      this.rocketX = this.x;
      this.speed = Math.random() * 4 + 6;
      this.color = this.randomColor();
    }

    randomColor() {
      const opts = [
        [124, 58, 237],
        [168, 85, 247],
        [196, 181, 253],
        [244, 211, 94],
        [236, 72, 153],
        [255, 255, 255],
      ];
      return opts[Math.floor(Math.random() * opts.length)];
    }

    update() {
      if (!this.exploded) {
        this.rocketY -= this.speed;

        if (this.rocketY <= this.targetY) {
          this.explode();
        }
      } else {
        this.particles = this.particles.filter(p => p.life > 0);
        this.particles.forEach(p => p.update());
        return this.particles.length > 0;
      }
      return true;
    }

    explode() {
      this.exploded = true;
      const count = Math.floor(Math.random() * 40 + 60);
      const [r, g, b] = this.color;

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        this.particles.push(new Particle(
          this.rocketX,
          this.rocketY,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          `rgba(${r}, ${g}, ${b}`,
          Math.random() * 60 + 60
        ));
      }
    }

    draw() {
      if (!this.exploded) {
        ctx.beginPath();
        ctx.arc(this.rocketX, this.rocketY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.join(',')}, 0.9)`;
        ctx.fill();
        
        // Trail
        ctx.beginPath();
        ctx.moveTo(this.rocketX, this.rocketY);
        ctx.lineTo(this.rocketX, this.rocketY + 12);
        ctx.strokeStyle = `rgba(${this.color.join(',')}, 0.3)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      } else {
        this.particles.forEach(p => p.draw());
      }
    }
  }

  class Particle {
    constructor(x, y, vx, vy, colorPrefix, life) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.colorPrefix = colorPrefix;
      this.life = life;
      this.maxLife = life;
      this.r = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.06; // gravity
      this.vx *= 0.98;
      this.life--;
    }

    draw() {
      const alpha = this.life / this.maxLife;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * alpha, 0, Math.PI * 2);
      ctx.fillStyle = `${this.colorPrefix}, ${alpha * 0.9})`;
      ctx.fill();
    }
  }

  const fireworks = [];
  let nextLaunch = 0;

  function animate() {
    frame++;
    ctx.fillStyle = 'rgba(8, 7, 13, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Launch fireworks periodically
    if (frame > nextLaunch) {
      fireworks.push(new Firework());
      nextLaunch = frame + Math.floor(Math.random() * 40 + 20);
    }

    for (let i = fireworks.length - 1; i >= 0; i--) {
      const alive = fireworks[i].update();
      fireworks[i].draw();
      if (!alive) {
        fireworks.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ────────────────────────────────────────────────────────────────
   16. MUSIC CONTROLS
──────────────────────────────────────────────────────────────── */
function initMusicControls() {
  const audio  = DOM.bgMusic;
  const btn    = DOM.musicToggle;
  const slider = DOM.volumeSlider;
  if (!audio || !btn || !slider) return;

  // Re-query new DOM refs (added after initial DOM parse)
  const disc        = document.getElementById('music-disc');
  const eq          = document.getElementById('music-eq');
  const progressFill = document.getElementById('music-progress-fill');
  const timeEl      = document.getElementById('music-time');
  const progressBar = document.getElementById('music-progress-bar');

  // ── Helper: format seconds → m:ss ─────────────────────────
  function fmt(sec) {
    if (!isFinite(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  // ── One-time hint fade-out on first play ────────────────────
  // The hint says "Play the music cutie ❤️" — it disappears the
  // moment the audio actually starts playing and never returns.
  const hint = document.getElementById('music-hint');
  if (hint) {
    const removeHint = () => {
      gsap.to(hint, {
        opacity: 0,
        y: 10,
        duration: 0.9,
        ease: 'power2.in',
        onComplete: () => hint.remove()
      });
      audio.removeEventListener('play', removeHint);
    };
    audio.addEventListener('play', removeHint);
  }

  // ── Update visual state ────────────────────────────────────
  function setPlayingState(playing) {
    updateMusicIcon(playing);
    if (disc)  disc.classList.toggle('spinning', playing);
    if (eq)    eq.classList.toggle('active',  playing);
  }

  // ── Progress bar RAF loop ──────────────────────────────────
  let progressRaf = null;
  function tickProgress() {
    if (audio.paused) return;
    if (progressFill && audio.duration) {
      progressFill.style.width = (audio.currentTime / audio.duration * 100) + '%';
    }
    if (timeEl) timeEl.textContent = fmt(audio.currentTime);
    progressRaf = requestAnimationFrame(tickProgress);
  }
  function startProgressTick() {
    if (progressRaf) cancelAnimationFrame(progressRaf);
    progressRaf = requestAnimationFrame(tickProgress);
  }
  function stopProgressTick() {
    if (progressRaf) cancelAnimationFrame(progressRaf);
    progressRaf = null;
  }

  // ── Smooth fade-out near end + seamless loop ───────────────
  // IMPORTANT: browsers often report a falsely short audio.duration
  // (1–3 s) while the file is still buffering. We guard against
  // this by requiring duration > 30 s and currentTime > 10 s so
  // the fade can never fire during the first few seconds of playback.
  audio.addEventListener('timeupdate', () => {
    if (audio.paused) return;
    const dur = audio.duration;
    // Bail out if duration looks invalid or hasn't settled yet
    if (!dur || !isFinite(dur) || dur < 30) return;
    // Also bail out if we're still in the opening seconds
    if (audio.currentTime < 10) return;

    const remaining = dur - audio.currentTime;
    if (remaining <= 1.5 && remaining > 0) {
      // Fade volume smoothly in the last 1.5 s
      const fadeProgress = 1 - (remaining / 1.5);
      const targetVol = parseFloat(slider.value);
      audio.volume = Math.max(0, targetVol * (1 - fadeProgress));
    }
  });

  audio.addEventListener('ended', () => {
    // Song genuinely ended — restart silently and fade back in
    audio.currentTime = 0;
    audio.volume = 0;
    audio.play().then(() => {
      const targetVol = parseFloat(slider.value);
      const startTime = performance.now();
      const fadeDuration = 1200;
      function fadeIn(now) {
        const progress = Math.min((now - startTime) / fadeDuration, 1);
        audio.volume = progress * targetVol;
        if (progress < 1) requestAnimationFrame(fadeIn);
      }
      requestAnimationFrame(fadeIn);
      startProgressTick();
    }).catch(() => {});
  });

  // ── Play when audio starts ──────────────────────────────────
  audio.addEventListener('play', () => {
    setPlayingState(true);
    startProgressTick();
  });

  audio.addEventListener('pause', () => {
    setPlayingState(false);
    stopProgressTick();
  });

  // Duration appears once metadata is loaded
  audio.addEventListener('loadedmetadata', () => {
    if (timeEl) timeEl.textContent = fmt(audio.currentTime);
  });

  // ── Play / Pause button ─────────────────────────────────────
  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  });

  // ── Progress bar click to seek ──────────────────────────────
  if (progressBar) {
    progressBar.addEventListener('click', (e) => {
      if (!audio.duration) return;
      const rect = progressBar.getBoundingClientRect();
      const fraction = (e.clientX - rect.left) / rect.width;
      audio.currentTime = fraction * audio.duration;
    });
  }

  // ── Volume slider ───────────────────────────────────────────
  slider.addEventListener('input', () => {
    // Only update volume if NOT in the last-second fade-out window
    if (!audio.duration || (audio.duration - audio.currentTime) > 1.2) {
      audio.volume = parseFloat(slider.value);
    }
  });
}

/* ────────────────────────────────────────────────────────────────
   17. LENIS SMOOTH SCROLL
──────────────────────────────────────────────────────────────── */
function initLenis() {
  const lenis = new Lenis({
    duration: 1.3,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenis;
}

/* ────────────────────────────────────────────────────────────────
   18. MUSIC MODAL EVENTS
──────────────────────────────────────────────────────────────── */
function initMusicModalEvents() {
  DOM.musicYes.addEventListener('click', () => hideMusicModal(true));
  DOM.musicNo.addEventListener('click', () => hideMusicModal(false));
}

/* ────────────────────────────────────────────────────────────────
   19. CELEBRATE BUTTON
──────────────────────────────────────────────────────────────── */
function initCelebrateButton() {
  DOM.celebrateBtn.addEventListener('click', blowOutCandles);
}

/* ────────────────────────────────────────────────────────────────
   20. HERO PARALLAX ON SCROLL
──────────────────────────────────────────────────────────────── */
function initHeroParallax() {
  const moon = $('.hero-moon');
  const heroContent = $('.hero-content');

  gsap.to(moon, {
    yPercent: -40,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    }
  });

  gsap.to(heroContent, {
    yPercent: 20,
    opacity: 0.2,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'center top',
      end: 'bottom top',
      scrub: 1.5,
    }
  });
}

/* ────────────────────────────────────────────────────────────────
   21. FOOTER AMBIENT ANIMATION
──────────────────────────────────────────────────────────────── */
function initFooter() {
  const footer = $('#footer');
  const canvas = $('#footer-canvas');
  if (!footer || !canvas) return;

  // ── Fade-in on enter viewport ──────────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footer.classList.add('footer-visible');
        startFooterCanvas(canvas);
        observer.unobserve(footer);
      }
    });
  }, { threshold: 0.08 });
  observer.observe(footer);
}

function startFooterCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  let raf;
  let running = true;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // ── Stars ──────────────────────────────────────────────────
  const stars = Array.from({ length: 55 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 1.2 + 0.3,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.012 + 0.006,
  }));

  // ── Petals ─────────────────────────────────────────────────
  const petalColors = [
    'rgba(168, 85, 247,',
    'rgba(196, 181, 253,',
    'rgba(124, 58, 237,',
    'rgba(232, 222, 255,',
  ];

  const petals = Array.from({ length: 14 }, (_, i) => ({
    x:    Math.random(),
    y:    Math.random(),
    size: Math.random() * 5 + 3,
    vx:   (Math.random() - 0.5) * 0.0006,
    vy:   Math.random() * 0.0008 + 0.0003,
    rot:  Math.random() * Math.PI * 2,
    vr:   (Math.random() - 0.5) * 0.01,
    phase: Math.random() * Math.PI * 2,
    color: petalColors[i % petalColors.length],
    opacity: Math.random() * 0.35 + 0.1,
  }));

  // ── Orbs ───────────────────────────────────────────────────
  const orbs = Array.from({ length: 5 }, () => ({
    x:    Math.random(),
    y:    Math.random(),
    r:    Math.random() * 40 + 20,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.004 + 0.002,
    vx:   (Math.random() - 0.5) * 0.0003,
    vy:   (Math.random() - 0.5) * 0.0003,
  }));

  let t = 0;

  function draw() {
    if (!running) return;
    raf = requestAnimationFrame(draw);
    t += 0.016;

    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    // Draw stars
    stars.forEach(s => {
      const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(s.phase + t * s.speed * 60));
      ctx.beginPath();
      ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232, 222, 255, ${twinkle * 0.6})`;
      ctx.fill();

      // Tiny glow
      if (s.r > 0.9) {
        const g = ctx.createRadialGradient(s.x * W, s.y * H, 0, s.x * W, s.y * H, s.r * 4);
        g.addColorStop(0, `rgba(196, 181, 253, ${twinkle * 0.18})`);
        g.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }
    });

    // Draw orbs
    orbs.forEach(o => {
      const pulse = 0.5 + 0.5 * Math.sin(o.phase + t * o.speed * 60);
      o.x = (o.x + o.vx + 1) % 1;
      o.y = (o.y + o.vy + 1) % 1;
      const g = ctx.createRadialGradient(o.x * W, o.y * H, 0, o.x * W, o.y * H, o.r * (1 + pulse * 0.3));
      g.addColorStop(0, `rgba(124, 58, 237, ${pulse * 0.06})`);
      g.addColorStop(0.5, `rgba(168, 85, 247, ${pulse * 0.03})`);
      g.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(o.x * W, o.y * H, o.r * (1 + pulse * 0.3), 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    });

    // Draw petals
    petals.forEach(p => {
      p.x = (p.x + p.vx + 1) % 1;
      p.y += p.vy;
      if (p.y > 1.05) { p.y = -0.05; p.x = Math.random(); }
      p.rot += p.vr;

      const px = p.x * W;
      const py = p.y * H;
      const s  = p.size;

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(p.rot);
      ctx.beginPath();
      // Petal shape: ellipse rotated
      ctx.ellipse(0, 0, s * 0.5, s, 0, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${p.opacity * (0.6 + 0.4 * Math.sin(t + p.phase || 0))})`;
      ctx.fill();
      ctx.restore();
    });
  }

  draw();

  // Pause when not visible (performance)
  const visObs = new IntersectionObserver(entries => {
    running = entries[0].isIntersecting;
    if (running) draw();
  }, { threshold: 0 });
  visObs.observe(canvas);
}

/* ────────────────────────────────────────────────────────────────
   INIT
──────────────────────────────────────────────────────────────── */
function init() {
  // Lenis must be first
  initLenis();

  // Cursor glow (desktop only)
  initCursorGlow();

  // Music controls setup
  initMusicControls();
  // (initMusicModalEvents removed — modal no longer exists)
  initCelebrateButton();

  // Footer ambient animation
  initFooter();

  // Start loader
  runLoader();
}

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
