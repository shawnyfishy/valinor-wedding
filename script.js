/**
 * VALINOR WEDDING INVITATION — MOBILE-FIRST INTERACTIVE ENGINE
 * Majed & Fatima | Friday, 18 December 2026 | Rome, Italy
 */

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const heroStage = document.getElementById('hero-stage');
  const curtainOverlay = document.getElementById('curtain-overlay');
  const audioToggle = document.getElementById('audio-toggle');
  const bgMusic = document.getElementById('bg-music');

  let curtainsOpened = false;
  let audioPlaying = false;

  // =========================================================================
  // 0. LENIS SMOOTH SCROLL ENGINE
  // =========================================================================
  let lenis = null;
  if (typeof window.Lenis !== 'undefined') {
    lenis = new window.Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5
    });
    lenis.stop(); // Paused until curtains are opened

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // =========================================================================
  // 1. 3D QUILTED CURTAIN REVEAL (MATCHING REFERENCE VIDEO 00:00 - 00:08)
  // =========================================================================
  function openCurtains() {
    if (curtainsOpened) return;
    curtainsOpened = true;

    // Start romantic strings music on first user gesture with smooth fade-in
    playBackgroundMusic();

    // Step 1 (00:01 - 00:02): Slide the scalloped monogram seal to the right
    heroStage.classList.add('curtains-sliding-seal');

    // Step 2 (00:02 - 00:07): Part the 3D quilted curtains into tied side drapes
    // and reveal Majed & Fatima's names + the 3D embroidered Roman palace
    setTimeout(() => {
      heroStage.classList.add('curtains-opened');
      body.classList.remove('locked-scroll');
      if (lenis) lenis.start();
    }, 260);
  }

  if (curtainOverlay) {
    curtainOverlay.addEventListener('click', openCurtains);
    curtainOverlay.addEventListener('touchstart', () => {
      openCurtains();
    }, { passive: true });
    curtainOverlay.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCurtains();
      }
    });
  }

  // Smooth anchor scroll with Lenis for the scroll prompt
  const scrollPrompt = document.getElementById('scroll-prompt');
  if (scrollPrompt) {
    scrollPrompt.addEventListener('click', (e) => {
      if (lenis) {
        e.preventDefault();
        lenis.scrollTo('#section-welcome', { duration: 1.4 });
      }
    });
  }

  // Also allow a brief auto-open option if user swipes/wheels on locked screen
  window.addEventListener('wheel', () => {
    if (!curtainsOpened) openCurtains();
  }, { passive: true });

  // =========================================================================
  // 2. CLASSICAL STRINGS BACKGROUND MUSIC CONTROLLER (WITH SMOOTH FADE-IN)
  // =========================================================================
  function playBackgroundMusic() {
    if (!bgMusic || audioPlaying) return;
    bgMusic.volume = 0.08;
    bgMusic.play().then(() => {
      audioPlaying = true;
      audioToggle.classList.add('playing');
      let vol = 0.08;
      const fadeInterval = setInterval(() => {
        vol = Math.min(0.65, vol + 0.04);
        bgMusic.volume = vol;
        if (vol >= 0.65 || bgMusic.paused) clearInterval(fadeInterval);
      }, 90);
    }).catch(() => {
      // Browser blocked autoplay until explicit button tap
    });
  }

  if (audioToggle && bgMusic) {
    audioToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (bgMusic.paused) {
        bgMusic.volume = 0.65;
        bgMusic.play().then(() => {
          audioPlaying = true;
          audioToggle.classList.add('playing');
        }).catch(() => {});
      } else {
        bgMusic.pause();
        audioPlaying = false;
        audioToggle.classList.remove('playing');
      }
    });
  }

  // =========================================================================
  // 3. LIVE COUNTDOWN TIMER TO FRIDAY, 18 DECEMBER 2026, 19:00 ROME TIME
  // =========================================================================
  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMinutes = document.getElementById('cd-minutes');

  // Target: December 18, 2026 at 19:00 CET (UTC+1)
  const weddingTargetDate = new Date('2026-12-18T19:00:00+01:00').getTime();

  function toArabicNumerals(num, minDigits = 2) {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    const padded = String(Math.max(0, num)).padStart(minDigits, '0');
    return padded.replace(/\d/g, (d) => arabicDigits[Number(d)]);
  }

  function updateCountdown() {
    const now = Date.now();
    const diff = weddingTargetDate - now;

    if (diff <= 0) {
      if (cdDays) cdDays.textContent = toArabicNumerals(0, 2);
      if (cdHours) cdHours.textContent = toArabicNumerals(0, 2);
      if (cdMinutes) cdMinutes.textContent = toArabicNumerals(0, 2);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (cdDays) cdDays.textContent = toArabicNumerals(days, days >= 100 ? 3 : 2);
    if (cdHours) cdHours.textContent = toArabicNumerals(hours, 2);
    if (cdMinutes) cdMinutes.textContent = toArabicNumerals(minutes, 2);
  }

  updateCountdown();
  setInterval(updateCountdown, 30000);

  // =========================================================================
  // 4. ENHANCED VENUE GALLERY SWITCHER (ROME, ITALY)
  // =========================================================================
  const venueActiveImg = document.getElementById('venue-active-img');
  const venueActiveCaption = document.getElementById('venue-active-caption');
  const venueThumbs = document.querySelectorAll('.venue-thumb');

  venueThumbs.forEach((btn) => {
    btn.addEventListener('click', () => {
      const newSrc = btn.getAttribute('data-src');
      const newCaption = btn.getAttribute('data-caption');
      if (!newSrc || !venueActiveImg) return;

      venueThumbs.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      venueActiveImg.style.opacity = '0.25';
      setTimeout(() => {
        venueActiveImg.src = newSrc;
        if (venueActiveCaption && newCaption) {
          venueActiveCaption.textContent = newCaption;
        }
        venueActiveImg.style.opacity = '1';
      }, 180);
    });
  });

  // =========================================================================
  // 5. ADD TO CALENDAR (.ICS DOWNLOAD FOR MOBILE & DESKTOP)
  // =========================================================================
  const addCalendarBtn = document.getElementById('add-calendar-btn');
  if (addCalendarBtn) {
    addCalendarBtn.addEventListener('click', () => {
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Majed and Fatima Wedding//AR',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        'UID:majed-fatima-rome-2026@valinor-invitation.com',
        'SUMMARY:حفل عشاء ماجد و فاطمه | روما – إيطاليا',
        'DTSTART:20261218T180000Z',
        'DTEND:20261218T230000Z',
        'LOCATION:Rome\\, Italy (روما – إيطاليا)',
        'DESCRIPTION:نتشرّف بدعوتكم لمشاركتنا حفل عشاء ماجد و فاطمه — يوم الجمعة 18 ديسمبر 2026 — روما – إيطاليا، وبحضوركم تكتمل فرحتنا.',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Majed-and-Fatima-Rome-2026.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  }

  // =========================================================================
  // 6. RSVP FORM HANDLING & GUEST COUNT TOGGLE
  // =========================================================================
  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpSuccess = document.getElementById('rsvp-success');
  const rsvpSuccessMsg = document.getElementById('rsvp-success-msg');
  const rsvpResetBtn = document.getElementById('rsvp-reset-btn');
  const guestsCountGroup = document.getElementById('guests-count-group');
  const attendanceRadios = document.querySelectorAll('input[name="attendance"]');

  attendanceRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      if (guestsCountGroup) {
        guestsCountGroup.style.display = radio.value === 'no' ? 'none' : 'flex';
      }
    });
  });

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const guestNameInput = document.getElementById('guest-name');
      const guestName = guestNameInput ? guestNameInput.value.trim() : '';

      if (!guestName) {
        guestNameInput.focus();
        guestNameInput.style.borderColor = '#A63A50';
        return;
      }

      const selectedAttendance = document.querySelector('input[name="attendance"]:checked');
      const isAttending = !selectedAttendance || selectedAttendance.value === 'yes';

      if (rsvpSuccessMsg) {
        if (isAttending) {
          rsvpSuccessMsg.textContent = `أهلاً بكم يا ${guestName}، تم تسجيل تأكيد حضوركم بنجاح. نتطلع بشوق للقائكم في روما يوم الجمعة ١٨ ديسمبر ٢٠٢٦، وبحضوركم تكتمل فرحتنا.`;
        } else {
          rsvpSuccessMsg.textContent = `شكراً جزيلاً لكم يا ${guestName} على مشاعركم الطيبة وتبريكاتكم الغالية للعروسين ماجد و فاطمه.`;
        }
      }

      rsvpForm.hidden = true;
      if (rsvpSuccess) rsvpSuccess.hidden = false;
    });
  }

  if (rsvpResetBtn) {
    rsvpResetBtn.addEventListener('click', () => {
      if (rsvpSuccess) rsvpSuccess.hidden = true;
      if (rsvpForm) rsvpForm.hidden = false;
    });
  }

  // =========================================================================
  // 7. INTERSECTION OBSERVER FOR SMOOTH SCROLL REVEALS
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  // =========================================================================
  // 8. AMBIENT FLOATING BLUSH ROSE PETALS CANVAS
  // =========================================================================
  const canvas = document.getElementById('petals-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const petalCount = 14;
    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 4 + Math.random() * 5,
      vy: 0.35 + Math.random() * 0.55,
      vx: -0.25 + Math.random() * 0.5,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.015,
      alpha: 0.22 + Math.random() * 0.28
    }));

    function drawPetals() {
      ctx.clearRect(0, 0, width, height);
      for (const p of petals) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.angle) * 0.25;
        p.angle += p.spin;

        if (p.y > height + 20) {
          p.y = -15;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -15;
        if (p.x < -20) p.x = width + 15;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 0.62, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 176, 186, ${p.alpha})`;
        ctx.fill();
        ctx.restore();
      }
      requestAnimationFrame(drawPetals);
    }

    drawPetals();
  }
});
