import { useState } from 'react';
import { useAuth, api } from '../AuthContext';
import { useTranslation } from 'react-i18next';
import { Lock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';

export default function BankDetailsPage() {
  const { user, setHasBankDetails } = useAuth();
  const { t } = useTranslation();
  const [form, setForm] = useState({ bank_name: '', account_number: '', account_holder_name: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.bank_name || !form.account_number || !form.account_holder_name) {
      setError(t('bank.error.required')); return;
    }
    setLoading(true); setError(''); setSuccess('');
    try {
      await api.post('bank-details/', form);
      setHasBankDetails(true);
      setSuccess(t('bank.success'));
    } catch (e) {
      setError(e.response?.data?.error || Object.values(e.response?.data || {}).flat().join(', ') || t('bank.error.generic'));
    } finally { setLoading(false); }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <div className="dashboard-header" style={{ marginBottom: 30 }}>
          <h1>{t('bank.title')}</h1>
          <p>{t('bank.subtitle')}</p>
        </div>

        <div className="glass-card" style={{ maxWidth: 600 }}>
          <div className="alert alert-info" style={{ marginBottom: 24 }}>
            <Lock size={18} /> {t('bank.info')}
          </div>

          {error && <div className="alert alert-error" style={{ marginBottom: 24 }}><AlertTriangle size={18} /> {error}</div>}
          {success && <div className="alert alert-success" style={{ marginBottom: 24 }}><CheckCircle2 size={18} /> {success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t('bank.bankName')}</label>
              <input className="form-input" placeholder={t('bank.bankNamePlaceholder')} value={form.bank_name}
                onChange={e => set('bank_name', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>{t('bank.accountNumber')}</label>
              <input className="form-input" placeholder={t('bank.accountNumberPlaceholder')} value={form.account_number}
                onChange={e => set('account_number', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>{t('bank.accountHolder')}</label>
              <input className="form-input" placeholder={t('bank.accountHolderPlaceholder')} value={form.account_holder_name}
                onChange={e => set('account_holder_name', e.target.value)} required />
            </div>

            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
              <span>{loading ? t('bank.saving') : t('bank.saveBtn')}</span>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
