import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PartyPopper, Lightbulb, CheckCircle2, Copy } from 'lucide-react';

export default function SuccessPage() {
  const { state } = useLocation();
  const { t } = useTranslation();
  const applicationId = state?.applicationId || 'N/A';
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(applicationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(74,222,128,0.15) 0%, transparent 60%)' }}>
      <div style={{ maxWidth: 540, width: '100%', textAlign: 'center' }} className="animate-in">
        <div style={{ fontSize: 72, marginBottom: 24 }}><PartyPopper size={72} color="var(--success)" /></div>
        <h1 style={{ fontSize: 36, fontWeight: 900, marginBottom: 12 }}>{t('success.title')}</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.7, marginBottom: 40 }}>
          {t('success.subtitle')}
        </p>

        <div style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 16, padding: '32px 40px', marginBottom: 32 }}>
          <p style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--success)', marginBottom: 12 }}>
            {t('success.appIdLabel')}
          </p>
          <div style={{ fontSize: 20, fontWeight: 800, fontFamily: 'monospace', color: 'var(--text-primary)',
            background: 'rgba(0,0,0,0.3)', padding: '16px 24px', borderRadius: 10, marginBottom: 16, wordBreak: 'break-all' }}>
            {applicationId}
          </div>
          <button onClick={copy} className="btn-secondary" style={{ fontSize: 14 }}>
            {copied ? <><CheckCircle2 className="inline-icon" size={16} /> {t('success.copied')}</> : <><Copy className="inline-icon" size={16} /> {t('success.copyId')}</>}
          </button>
        </div>

        <div className="alert alert-info" style={{ textAlign: 'left', marginBottom: 32 }}>
          <Lightbulb className="inline-icon" size={18} /> {t('success.saveIdTip')}
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/status" className="btn-primary">
            <span>{t('success.checkStatus')}</span><span>→</span>
          </Link>
          <Link to="/" className="btn-secondary">{t('success.backHome')}</Link>
        </div>
      </div>
    </div>
  );
}
