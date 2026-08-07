<template>
  <div class="about-page">
    <!-- Decorative gradient glow -->
    <div class="bg-glow"></div>

    <!-- Hero -->
    <header class="hero anim-entrance">
      <div class="hero-accent"></div>
      <h1 class="hero-name">
        Hi, I'm <span class="gradient-text">Zhiyuan Zhou</span> <span class="wave">👋</span>
      </h1>
      <p class="hero-tagline">
        Software Engineer at <strong>EasyStack, Inc.</strong> — Cloud-Native Observability
      </p>
      <div class="hero-chips">
        <span class="chip">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          Cloud Native
        </span>
        <span class="chip">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
          Observability
        </span>
        <span class="chip">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
          Monitoring
        </span>
        <span class="chip">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="18" r="3"/><path d="M10 10.5V4a2 2 0 014 0v6.5"/></svg>
          Open Source
        </span>
      </div>
    </header>

    <!-- Info Cards -->
    <div class="cards-row anim-entrance">
      <div class="info-card">
        <div class="info-card__icon edu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/>
          </svg>
        </div>
        <div class="info-card__text">
          <span class="info-card__label">Education</span>
          <p>Master's in Engineering<br><strong>Anhui University of Technology</strong></p>
        </div>
      </div>
      <div class="info-card">
        <div class="info-card__icon passion">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </div>
        <div class="info-card__text">
          <span class="info-card__label">Passions</span>
          <p>Exploring open-source, sharing knowledge. Small steps in open source drive giant leaps.</p>
        </div>
      </div>
    </div>

    <!-- Contributions -->
    <section class="contrib-section anim-entrance">
      <div class="section-head">
        <svg class="section-head__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="18" r="3"/><path d="M10 10.5V4a2 2 0 014 0v6.5"/><line x1="8" y1="18" x2="16" y2="18"/>
        </svg>
        <h2>Open Source Contributions</h2>
      </div>

      <div class="contrib-cards">
        <a href="https://github.com/prometheus/procfs/pull/719" target="_blank" class="contrib-card">
          <span class="contrib-card__status merged">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </span>
          <span class="contrib-card__repo">prometheus/<b>procfs</b></span>
          <span class="contrib-card__pr">#719</span>
          <span class="contrib-card__badge merged">Merged</span>
        </a>

        <a href="https://github.com/ncabatoff/process-exporter/pull/353" target="_blank" class="contrib-card">
          <span class="contrib-card__status pending">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </span>
          <span class="contrib-card__repo">ncabatoff/<b>process-exporter</b></span>
          <span class="contrib-card__pr">#353</span>
          <span class="contrib-card__badge pending">In Review</span>
        </a>

        <a href="https://github.com/mrlhansen/idrac_exporter/issues/172" target="_blank" class="contrib-card">
          <span class="contrib-card__status adopted">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
          </span>
          <span class="contrib-card__repo">mrlhansen/<b>idrac_exporter</b></span>
          <span class="contrib-card__pr">#172</span>
          <span class="contrib-card__badge adopted">Solution Adopted</span>
        </a>
      </div>
    </section>

    <!-- Contact -->
    <div class="contact anim-entrance">
      <div class="contact__icon-circle">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      </div>
      <h3>Get in Touch</h3>
      <p>Collaboration, questions, or just a friendly chat — always welcome.</p>
      <a href="mailto:zzy_ahut@163.com" class="contact__btn">
        zzy_ahut@163.com
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        obs.unobserve(e.target)
      }
    })
  }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' })

  document.querySelectorAll('.anim-entrance').forEach(el => obs.observe(el))
})
</script>

<style scoped>
/* ============================================
   Container
   ============================================ */
.about-page {
  position: relative;
  max-width: 720px;
  margin: 0 auto;
  padding: 3rem 1.5rem 5rem;
  isolation: isolate;
}

/* ============================================
   Background glow
   ============================================ */
.bg-glow {
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center,
    rgba(91, 39, 255, 0.06) 0%,
    rgba(0, 212, 255, 0.04) 35%,
    transparent 70%);
  pointer-events: none;
  z-index: -1;
}

/* ============================================
   Entrance animation
   ============================================ */
.anim-entrance {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.anim-entrance.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger children */
.hero.visible       { transition-delay: 0.00s; }
.cards-row.visible  { transition-delay: 0.10s; }
.contrib-section.visible { transition-delay: 0.20s; }
.contact.visible    { transition-delay: 0.30s; }

/* ============================================
   Hero
   ============================================ */
.hero {
  position: relative;
  text-align: center;
  padding: 3rem 2rem 2.8rem;
  margin-bottom: 2rem;
  border-radius: 24px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.04);
  overflow: hidden;
}

.hero-accent {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(120deg, #5b27ff 0%, #00d4ff 100%);
}

.hero-name {
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  margin: 0 0 0.6rem;
  color: var(--vp-c-text-1);
  line-height: 1.3;
}

.gradient-text {
  background: linear-gradient(120deg, #5b27ff 0%, #00d4ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.wave {
  display: inline-block;
  animation: wave 1.5s ease-in-out infinite;
  transform-origin: 70% 70%;
}
@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  25%      { transform: rotate(20deg); }
  50%      { transform: rotate(0deg); }
  75%      { transform: rotate(-10deg); }
}

.hero-tagline {
  font-size: 1.02rem;
  color: var(--vp-c-text-2);
  margin: 0 0 1.5rem;
  line-height: 1.65;
}

.hero-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.38rem;
  padding: 0.35rem 0.9rem;
  font-size: 0.8rem;
  font-weight: 550;
  border-radius: 40px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.25s ease;
  cursor: default;
}
.chip svg {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
  color: var(--vp-c-brand-1);
}
.chip:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 8px rgba(66, 89, 239, 0.12);
  transform: translateY(-1px);
}

/* ============================================
   Info cards
   ============================================ */
.cards-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}

.info-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 20px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.04);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.info-card::after {
  content: '';
  position: absolute;
  left: -20px;
  top: 20%;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  opacity: 0.06;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
.info-card:hover::after {
  opacity: 0.12;
}

.info-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(7, 17, 27, 0.10);
  border-color: transparent;
}

.info-card__icon {
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  color: #fff;
}
.info-card__icon.edu {
  background: linear-gradient(135deg, #5b27ff, #764dfa);
}
.info-card__icon.passion {
  background: linear-gradient(135deg, #ff27a6, #ff6b4a);
}
.info-card__icon svg {
  width: 22px;
  height: 22px;
}

.info-card__text {
  flex: 1;
  min-width: 0;
}
.info-card__label {
  display: block;
  font-size: 0.72rem;
  font-weight: 650;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-3);
  margin-bottom: 0.35rem;
}
.info-card__text p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

/* ============================================
   Section heading
   ============================================ */
.section-head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
}
.section-head__icon {
  width: 22px;
  height: 22px;
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
}
.section-head h2 {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  letter-spacing: -0.01em;
}

/* ============================================
   Contribution cards
   ============================================ */
.contrib-section {
  margin-bottom: 2rem;
}

.contrib-cards {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.contrib-card {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.75rem 1rem;
  border-radius: 14px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  text-decoration: none;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}

.contrib-card::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  border-radius: 0 3px 3px 0;
  transition: width 0.25s ease;
}
.contrib-card:hover::before {
  width: 4px;
}

.contrib-card:hover {
  transform: translateX(4px);
  border-color: transparent;
  box-shadow: 0 4px 16px rgba(7, 17, 27, 0.08);
}

/* Status dot */
.contrib-card__status {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.contrib-card__status svg {
  width: 16px;
  height: 16px;
}

.contrib-card__status.merged  { background: #e6f7e9; color: #2d8a42; }
.contrib-card__status.pending  { background: #fff8e6; color: #b8860b; }
.contrib-card__status.adopted  { background: #e6f3fa; color: #1a6d8a; }

/* Left accent colors */
.contrib-card:has(.merged)::before  { background: #2d8a42; }
.contrib-card:has(.pending)::before  { background: #f0b400; }
.contrib-card:has(.adopted)::before  { background: #1a6d8a; }

.contrib-card__repo {
  flex: 1;
  font-family: 'SF Mono', 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 0.82rem;
  color: var(--vp-c-text-1);
  min-width: 0;
}
.contrib-card__repo b {
  font-weight: 650;
  color: var(--vp-c-text-1);
}

.contrib-card__pr {
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--vp-c-brand-1);
}

.contrib-card__badge {
  font-size: 0.7rem;
  padding: 0.18rem 0.6rem;
  border-radius: 10px;
  font-weight: 650;
  flex-shrink: 0;
  letter-spacing: 0.02em;
}
.contrib-card__badge.merged  { background: #e6f7e9; color: #2d8a42; }
.contrib-card__badge.pending  { background: #fff8e6; color: #8a6d14; }
.contrib-card__badge.adopted  { background: #e6f3fa; color: #1a6d8a; }

/* ============================================
   Contact
   ============================================ */
.contact {
  text-align: center;
  padding: 2.5rem 2rem;
  border-radius: 24px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.04);
}

.contact__icon-circle {
  width: 56px;
  height: 56px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(91, 39, 255, 0.10), rgba(0, 212, 255, 0.10));
  color: #5b27ff;
}
.contact__icon-circle svg {
  width: 26px;
  height: 26px;
}

.contact h3 {
  margin: 0 0 0.35rem;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.contact p {
  margin: 0 0 1.2rem;
  font-size: 0.92rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.contact__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.5rem;
  border-radius: 40px;
  background: linear-gradient(120deg, #5b27ff 0%, #00d4ff 100%);
  color: #fff;
  text-decoration: none;
  font-weight: 650;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(91, 39, 255, 0.25);
}
.contact__btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 22px rgba(91, 39, 255, 0.35);
}
.contact__btn svg {
  width: 15px;
  height: 15px;
  transition: transform 0.25s ease;
}
.contact__btn:hover svg {
  transform: translateX(3px);
}

/* ============================================
   Responsive
   ============================================ */
@media screen and (max-width: 640px) {
  .about-page {
    padding: 1.5rem 1rem 4rem;
  }
  .hero {
    padding: 2.2rem 1.2rem 2rem;
    border-radius: 20px;
  }
  .hero-name {
    font-size: 1.65rem;
  }
  .hero-tagline {
    font-size: 0.93rem;
  }
  .cards-row {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  .info-card {
    padding: 1.2rem;
    border-radius: 16px;
  }
  .contrib-card__repo {
    font-size: 0.76rem;
  }
  .contrib-card__badge {
    font-size: 0.68rem;
    padding: 0.15rem 0.5rem;
  }
  .contact {
    padding: 2rem 1.2rem;
  }
  .bg-glow {
    width: 300px;
    height: 250px;
  }
  .chip {
    font-size: 0.74rem;
    padding: 0.3rem 0.7rem;
  }
}
</style>
