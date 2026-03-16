import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { api } from '../AuthContext';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import LocateControl from '../components/LocateControl';

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function MapPicker({ onLocationSelect, selectedPos }) {
  useMapEvents({
    click(e) { onLocationSelect(e.latlng); }
  });
  return selectedPos ? <Marker position={selectedPos} /> : null;
}

export default function ApplyPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPos, setSelectedPos] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const fileRef = useRef();

  const STEPS = [
    t('apply.steps.personal'),
    t('apply.steps.zone'),
    t('apply.steps.pin'),
    t('apply.steps.submit')
  ];

  const [form, setForm] = useState({
    applicant_name: '', applicant_email: '', applicant_phone: '',
    proposed_name: '', address: '', total_slots: 1, proposed_hourly_rate: '',
    operating_hours: '24/7', parking_surface: 'paved',
    has_security: false, has_cctv: false, access_instructions: '',
    latitude: '', longitude: '', documents: null,
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleNext = () => {
    setError('');
    if (step === 0) {
      if (!form.applicant_name || !form.applicant_email || !form.applicant_phone) {
        setError(t('apply.error.personal')); return;
      }
    }
    if (step === 1) {
      if (!form.proposed_name || !form.address || !form.proposed_hourly_rate) {
        setError(t('apply.error.zone')); return;
      }
    }
    if (step === 2) {
      if (!form.latitude || !form.longitude) {
        setError(t('apply.error.pin')); return;
      }
    }
    setStep(s => s + 1);
  };

  const handleSubmit = async () => {
    setLoading(true); setError('');
    
    // Check if document is uploaded
    if (!form.documents) {
      setError(t('apply.error.upload'));
      setLoading(false);
      return;
    }

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'documents') { if (v) fd.append(k, v); }
        else fd.append(k, v);
      });
      // Add acceptance timestamp or boolean if backend requires
      fd.append('accepted_terms', acceptedTerms);
      
      const res = await api.post('apply/', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/apply/success', { state: { applicationId: res.data.application_id } });
    } catch (e) {
      const msg = e.response?.data;
      if (typeof msg === 'object') {
        setError(Object.values(msg).flat().join(', '));
      } else {
        setError(t('apply.error.generic'));
      }
    } finally { setLoading(false); }
  };

  return (
    <>
      <Navbar showLinks={false} backLink={true} />

      <div className="apply-page">
        <div className="apply-container">
          <div className="apply-header">
            <h1>{t('apply.title')}</h1>
            <p>{t('apply.subtitle')}</p>
          </div>

          {/* Stepper */}
          <div className="stepper">
            {STEPS.map((label, i) => (
              <div key={i} className="step-item">
                <div className={`step-circle ${i < step ? 'done' : i === step ? 'active' : ''}`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className="step-label" style={{ color: i === step ? 'var(--text-primary)' : undefined }}>{label}</span>
                {i < STEPS.length - 1 && <div className={`step-line ${i < step ? 'done' : ''}`} />}
              </div>
            ))}
          </div>

          <div className="apply-form-card">
            {error && <div className="alert alert-error"><AlertTriangle size={18} /> {error}</div>}

            {/* Step 0 */}
            {step === 0 && (
              <div className="animate-in">
                <h2 style={{ marginBottom: 24, fontSize: 22, fontWeight: 700 }}>{t('apply.personal.title')}</h2>
                <div className="form-group">
                  <label>{t('apply.personal.name')}</label>
                  <input className="form-input" placeholder={t('apply.personal.namePlaceholder')} value={form.applicant_name} onChange={e => set('applicant_name', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>{t('apply.personal.email')}</label>
                  <input className="form-input" type="email" placeholder={t('apply.personal.emailPlaceholder')} value={form.applicant_email} onChange={e => set('applicant_email', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>{t('apply.personal.phone')}</label>
                  <input className="form-input" placeholder={t('apply.personal.phonePlaceholder')} value={form.applicant_phone} onChange={e => set('applicant_phone', e.target.value)} />
                </div>
              </div>
            )}

            {/* Step 1 */}
            {step === 1 && (
              <div className="animate-in">
                <h2 style={{ marginBottom: 24, fontSize: 22, fontWeight: 700 }}>{t('apply.zone.title')}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                  <div className="form-group">
                    <label>{t('apply.zone.name')}</label>
                    <input className="form-input" placeholder={t('apply.zone.namePlaceholder')} value={form.proposed_name} onChange={e => set('proposed_name', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>{t('apply.zone.address')}</label>
                    <input className="form-input" placeholder={t('apply.zone.addressPlaceholder')} value={form.address} onChange={e => set('address', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>{t('apply.zone.slots')}</label>
                    <input className="form-input" type="number" min={1} value={form.total_slots} onChange={e => set('total_slots', parseInt(e.target.value) || 1)} />
                  </div>
                  <div className="form-group">
                    <label>{t('apply.zone.rate')}</label>
                    <input className="form-input" type="number" min={0} placeholder={t('apply.zone.ratePlaceholder')} value={form.proposed_hourly_rate} onChange={e => set('proposed_hourly_rate', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>{t('apply.zone.hours')}</label>
                    <input className="form-input" placeholder={t('apply.zone.hoursPlaceholder')} value={form.operating_hours} onChange={e => set('operating_hours', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>{t('apply.zone.surface')}</label>
                    <select className="form-select" value={form.parking_surface} onChange={e => set('parking_surface', e.target.value)}>
                      <option value="paved">{t('apply.zone.surfaceOptions.paved')}</option>
                      <option value="gravel">{t('apply.zone.surfaceOptions.gravel')}</option>
                      <option value="indoor">{t('apply.zone.surfaceOptions.indoor')}</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 24, margin: '8px 0 20px' }}>
                  <label className="form-checkbox">
                    <input type="checkbox" checked={form.has_security} onChange={e => set('has_security', e.target.checked)} />
                    <span>{t('apply.zone.security')}</span>
                  </label>
                  <label className="form-checkbox">
                    <input type="checkbox" checked={form.has_cctv} onChange={e => set('has_cctv', e.target.checked)} />
                    <span>{t('apply.zone.cctv')}</span>
                  </label>
                </div>
                <div className="form-group">
                  <label>{t('apply.zone.instructions')}</label>
                  <textarea className="form-textarea" placeholder={t('apply.zone.instructionsPlaceholder')} value={form.access_instructions} onChange={e => set('access_instructions', e.target.value)} />
                </div>
              </div>
            )}

            {/* Step 2 — Map */}
            {step === 2 && (
              <div className="animate-in">
                <h2 style={{ marginBottom: 8, fontSize: 22, fontWeight: 700 }}>{t('apply.map.title')}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 20 }}>{t('apply.map.sub')}</p>
                {selectedPos && (
                  <div className="alert alert-success" style={{ marginBottom: 16 }}>
                    <CheckCircle2 size={18} /> {t('apply.map.success', { lat: selectedPos.lat.toFixed(6), lng: selectedPos.lng.toFixed(6) })}
                  </div>
                )}
                <div className="map-container" style={{ position: 'relative' }}>
                  <MapContainer center={[5.0, 20.0]} zoom={3} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='© <a href="https://openstreetmap.org">OpenStreetMap</a>'
                    />
                    <LocateControl onLocationFound={pos => {
                      setSelectedPos(pos);
                      set('latitude', pos.lat.toFixed(6));
                      set('longitude', pos.lng.toFixed(6));
                    }} />
                    <MapPicker
                      onLocationSelect={pos => {
                        setSelectedPos(pos);
                        set('latitude', pos.lat.toFixed(6));
                        set('longitude', pos.lng.toFixed(6));
                      }}
                      selectedPos={selectedPos}
                    />
                  </MapContainer>
                </div>
              </div>
            )}

            {/* Step 3 — Docs & Submit */}
            {step === 3 && (
              <div className="animate-in">
                <h2 style={{ marginBottom: 8, fontSize: 22, fontWeight: 700 }}>{t('apply.review.title')}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>{t('apply.review.sub')}</p>

                <div className="glass-card" style={{ padding: 20, marginBottom: 24 }}>
                  {[
                    [t('apply.review.summary.applicant'), form.applicant_name],
                    [t('apply.review.summary.email'), form.applicant_email],
                    [t('apply.review.summary.phone'), form.applicant_phone],
                    [t('apply.review.summary.zoneName'), form.proposed_name],
                    [t('apply.review.summary.address'), form.address],
                    [t('apply.review.summary.slots'), form.total_slots],
                    [t('apply.review.summary.rate'), form.proposed_hourly_rate],
                    [t('apply.review.summary.hours'), form.operating_hours],
                    [t('apply.review.summary.location'), form.latitude ? `${form.latitude}, ${form.longitude}` : '—'],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 14 }}>
                      <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{v}</span>
                    </div>
                  ))}
                </div>

                <div className="form-group">
                  <label>{t('apply.review.upload')}</label>
                  <input type="file" ref={fileRef} style={{ color: 'var(--text-secondary)', fontSize: 14 }}
                    onChange={e => set('documents', e.target.files[0])} />
                </div>

                <div className="terms-section">
                  <h3>{t('apply.review.terms')}</h3>
                  <div className="terms-content">
                    <p>{t('apply.review.terms_text')}</p>
                    <ul>
                      <li><strong>{t('apply.review.terms_list.accuracy').split(':')[0]}:</strong>{t('apply.review.terms_list.accuracy').split(':')[1]}</li>
                      <li><strong>{t('apply.review.terms_list.ownership').split(':')[0]}:</strong>{t('apply.review.terms_list.ownership').split(':')[1]}</li>
                      <li><strong>{t('apply.review.terms_list.safety').split(':')[0]}:</strong>{t('apply.review.terms_list.safety').split(':')[1]}</li>
                      <li><strong>{t('apply.review.terms_list.compliance').split(':')[0]}:</strong>{t('apply.review.terms_list.compliance').split(':')[1]}</li>
                      <li><strong>{t('apply.review.terms_list.fees').split(':')[0]}:</strong>{t('apply.review.terms_list.fees').split(':')[1]}</li>
                      <li><strong>{t('apply.review.terms_list.termination').split(':')[0]}:</strong>{t('apply.review.terms_list.termination').split(':')[1]}</li>
                    </ul>
                  </div>
                  <label className="form-checkbox" style={{ marginTop: 16 }}>
                    <input type="checkbox" checked={acceptedTerms} onChange={e => setAcceptedTerms(e.target.checked)} />
                    <span style={{ fontWeight: 600 }}>{t('apply.review.agree')}</span>
                  </label>
                </div>
              </div>
            )}

            <div className="apply-nav">
              {step > 0
                ? <button className="btn-secondary" onClick={() => { setError(''); setStep(s => s - 1); }}>← {t('apply.nav.back')}</button>
                : <div />
              }
              {step < STEPS.length - 1
                ? <button className="btn-primary" onClick={handleNext}><span>{t('apply.nav.next')} →</span></button>
                : <button className="btn-primary" onClick={handleSubmit} disabled={loading || !acceptedTerms}>
                    <span>{loading ? t('apply.nav.submitting') : t('apply.nav.submit')}</span>
                  </button>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
