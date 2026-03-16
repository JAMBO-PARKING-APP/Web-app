import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Rocket, FileText, CheckCircle2, Banknote, BarChart3, Landmark, Map, ShieldCheck, Smartphone, Search, CreditCard, Timer, Bell } from 'lucide-react';
import Navbar from '../components/Navbar';

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ fontSize: 32 }}>{icon}</div>
      <h3 style={{ fontSize: 18, fontWeight: 700 }}>{title}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8 }}>{desc}</p>
    </div>
  );
}

function AppStoreBadge({ platform, imgSrc, href, height = 52 }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{ display: 'inline-block', transition: 'opacity 0.2s', opacity: 1 }}
      onMouseEnter={e => e.currentTarget.style.opacity = 0.85}
      onMouseLeave={e => e.currentTarget.style.opacity = 1}>
      <img src={imgSrc} alt={platform} style={{ height, display: 'block' }} />
    </a>
  );
}

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-badge">
            <span style={{ display: 'flex' }}><Rocket size={16} /></span>
            <span>{t('hero.badge')}</span>
          </div>
          <h1 className="hero-title">
            {t('hero.title')}
          </h1>
          <p className="hero-sub">
            {t('hero.sub')}
          </p>
          <div className="hero-actions">
            <Link to="/apply" className="btn-primary">
              <span>{t('hero.applyNow')}</span><span>→</span>
            </Link>
            <Link to="/how-it-works" className="btn-secondary">{t('hero.learnHow')}</Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <div style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '32px 40px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', textAlign: 'center', gap: 24 }}>
          {[
            { val: '500+', label: t('stats.zones') },
            { val: '50K+', label: t('stats.parkers') },
            { val: '10%', label: t('stats.commission') },
            { val: '2–5 Days', label: t('stats.approval') },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 32, fontWeight: 900, background: 'linear-gradient(135deg,#fff,var(--accent-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.val}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── How it works teaser ── */}
      <section className="section">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p className="section-eyebrow">{t('process.eyebrow')}</p>
          <h2 className="section-title">{t('process.title')}</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>{t('process.sub')}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { n: '1', icon: <FileText size={24} />, title: t('process.step1.title'), desc: t('process.step1.desc') },
            { n: '2', icon: <CheckCircle2 size={24} />, title: t('process.step2.title'), desc: t('process.step2.desc') },
            { n: '3', icon: <Banknote size={24} />, title: t('process.step3.title'), desc: t('process.step3.desc') },
          ].map(s => (
            <div key={s.n} className="glass-card" style={{ padding: 32, textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,var(--accent),#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 16px' }}>{s.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>{t('process.step' + s.n + '.label')}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link to="/how-it-works" style={{ color: 'var(--accent-light)', textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>
            {t('process.guide')} → 
          </Link>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section id="benefits" style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '100px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 56 }}>
            <p className="section-eyebrow">{t('benefits.eyebrow')}</p>
            <h2 className="section-title">{t('benefits.title')}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            <FeatureCard icon={<Banknote size={32} color="var(--success)" />} title={t('benefits.card1.title')} desc={t('benefits.card1.desc')} />
            <FeatureCard icon={<BarChart3 size={32} color="var(--accent-light)" />} title={t('benefits.card2.title')} desc={t('benefits.card2.desc')} />
            <FeatureCard icon={<Landmark size={32} color="var(--warning)" />} title={t('benefits.card3.title')} desc={t('benefits.card3.desc')} />
            <FeatureCard icon={<Map size={32} color="#c084fc" />} title={t('benefits.card4.title')} desc={t('benefits.card4.desc')} />
            <FeatureCard icon={<ShieldCheck size={32} color="var(--success)" />} title={t('benefits.card5.title')} desc={t('benefits.card5.desc')} />
            <FeatureCard icon={<Smartphone size={32} color="var(--accent)" />} title={t('benefits.card6.title')} desc={t('benefits.card6.desc')} />
          </div>
        </div>
      </section>

      {/* ── Download App ── */}
      <section id="download" className="section" style={{ textAlign: 'center' }}>
        <p className="section-eyebrow">{t('mobile.eyebrow')}</p>
        <h2 className="section-title">{t('mobile.title')}</h2>
        <p className="section-sub" style={{ margin: '0 auto 48px' }}>
          {t('mobile.sub')}
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          <AppStoreBadge
            platform="App Store"
            imgSrc="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            href="#"
            height={52}
          />
          <AppStoreBadge
            platform="Google Play"
            imgSrc="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
            href="#"
            height={76}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, maxWidth: 800, margin: '0 auto' }}>
          {[
            { icon: <Search size={28} color="var(--accent-light)" />, title: t('mobile.card1.title'), desc: t('mobile.card1.desc') },
            { icon: <CreditCard size={28} color="var(--success)" />, title: t('mobile.card2.title'), desc: t('mobile.card2.desc') },
            { icon: <Timer size={28} color="var(--warning)" />, title: t('mobile.card3.title'), desc: t('mobile.card3.desc') },
            { icon: <Bell size={28} color="#c084fc" />, title: t('mobile.card4.title'), desc: t('mobile.card4.desc') },
          ].map(f => (
            <div key={f.title} className="glass-card" style={{ padding: 24, textAlign: 'left' }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <h4 style={{ fontWeight: 700, marginBottom: 6 }}>{f.title}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '0 40px 100px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          padding: '64px 40px', textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))',
          border: '1px solid rgba(99,102,241,0.2)', borderRadius: 24,
        }}>
          <h2 style={{ fontSize: 40, fontWeight: 900, marginBottom: 16 }}>{t('cta.title')}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 17, marginBottom: 40 }}>
            {t('cta.sub')}
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/apply" className="btn-primary" style={{ fontSize: 17, padding: '16px 40px' }}>
              <span>{t('cta.apply')}</span><span>→</span>
            </Link>
            <Link to="/status" className="btn-secondary" style={{ padding: '16px 28px' }}>
              {t('cta.status')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section id="contact" style={{ padding: '0 40px 100px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>{t('contact.sub')}</p>
        </div>
        <div className="glass-card" style={{ padding: '8px', background: 'rgba(255,255,255,0.02)', overflow: 'hidden' }}>
          <iframe
            id="JotFormIFrame-260734183295057"
            title={t('contact.title')}
            allowtransparency="true"
            allowfullscreen="true"
            allow="geolocation; microphone; camera"
            src="https://form.jotform.com/260734183295057"
            frameBorder="0"
            style={{ 
              width: "100%", 
              height: "1200px", 
              border: "none" 
            }}
            scrolling="yes"
          />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <img src="/logo.png" alt={t('navbar.logo')} style={{ height: 34, objectFit: 'contain' }} />
              <span style={{ fontWeight: 800, fontSize: 17 }}>{t('navbar.logo')}</span>
            </div>
            <p>{t('footer.desc')}</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" style={{ height: 36, display: 'block' }} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Google Play" style={{ height: 52, display: 'block', marginTop: -8 }} />
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>{t('footer.portal')}</h4>
            <Link to="/apply">{t('navbar.applyNow') || 'Apply Now'}</Link>
            <Link to="/status">{t('navbar.checkStatus')}</Link>
            <Link to="/how-it-works">{t('navbar.howItWorks')}</Link>
            <Link to="/login">{t('navbar.partnerLogin')}</Link>
          </div>
          <div className="footer-col">
            <h4>{t('footer.legal')}</h4>
            <Link to="/privacy">{t('footer.privacy')}</Link>
            <Link to="/terms">{t('footer.terms')}</Link>
            <a href="mailto:support@spacepark.com">{t('footer.contactSupport')}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 {t('navbar.logo')} Ltd. {t('footer.rights')} &nbsp;·&nbsp; <Link to="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{t('footer.privacy')}</Link> &nbsp;·&nbsp; <Link to="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{t('footer.terms')}</Link></p>
        </div>
      </footer>
    </>
  );
}
