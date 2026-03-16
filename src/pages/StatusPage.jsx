import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../AuthContext';
import { useTranslation } from 'react-i18next';
import { Hourglass, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';

export default function StatusPage() {
  const { t, i18n } = useTranslation();
  const [appId, setAppId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const check = async () => {
    if (!appId.trim()) { setError(t('status.error.empty')); return; }
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await api.get(`status/${appId.trim()}/`);
      setResult(res.data);
    } catch (e) {
      if (e.response?.status === 404) setError(t('status.error.notFound'));
      else setError(t('status.error.generic'));
    } finally { setLoading(false); }
  };

  const statusConfig = {
    pending: { label: t('status.states.pending.label'), icon: <Hourglass size={40} color="var(--warning)" />, badge: 'badge-pending', msg: t('status.states.pending.msg') },
    approved: { label: t('status.states.approved.label'), icon: <CheckCircle2 size={40} color="var(--success)" />, badge: 'badge-approved', msg: t('status.states.approved.msg') },
    rejected: { label: t('status.states.rejected.label'), icon: <XCircle size={40} color="var(--danger)" />, badge: 'badge-rejected', msg: t('status.states.rejected.msg') },
  };

  const cfg = result ? statusConfig[result.status] : null;

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo"><img src="/logo.png" alt="Space Park" style={{ height: 36, objectFit: 'contain' }} /><span>{t('navbar.logo')}</span></Link>
        <div className="navbar-links">
          <Link to="/apply">{t('navbar.getApp')}</Link>
          <Link to="/login" style={{ color: 'var(--accent-light)', fontWeight: 600 }}>{t('navbar.partnerLogin')}</Link>
          <LanguageSelector />
        </div>
      </nav>

      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 60px',
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 60%)' }}>
        <div style={{ maxWidth: 580, width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h1 style={{ fontSize: 36, fontWeight: 900, marginBottom: 12 }}>{t('status.title')}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>{t('status.subtitle')}</p>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: 40 }}>
            <div className="form-group">
              <label>{t('status.label')}</label>
              <input className="form-input" placeholder={t('status.placeholder')}
                value={appId} onChange={e => setAppId(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && check()} />
            </div>
            {error && <div className="alert alert-error" style={{ marginBottom: 16 }}><AlertTriangle size={18} /> {error}</div>}
            <button className="btn-primary" onClick={check} disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
              <span>{loading ? t('status.checking') : t('status.checkBtn')}</span>
            </button>
          </div>

          {result && cfg && (
            <div className="glass-card animate-in" style={{ marginTop: 24, padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div style={{ fontSize: 40 }}>{cfg.icon}</div>
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 800 }}>{result.proposed_name}</h2>
                  <span className={`badge ${cfg.badge}`}>{cfg.label}</span>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{cfg.msg}</p>
              {result.admin_notes && (
                <div className="alert alert-info">
                  <div><strong>{t('status.notes')}</strong> {result.admin_notes}</div>
                </div>
              )}
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {t('status.submittedOn', { date: new Date(result.created_at).toLocaleDateString(i18n.language, { day: 'numeric', month: 'long', year: 'numeric' }) })}
              </p>
              {result.status === 'approved' && (
                <div style={{ marginTop: 20 }}>
                  <Link to="/login" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    <span>{t('status.loginBtn')}</span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
