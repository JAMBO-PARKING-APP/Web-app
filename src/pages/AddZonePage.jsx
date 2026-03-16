import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useTranslation } from 'react-i18next';
import { api } from '../AuthContext';
import Sidebar from '../components/Sidebar';
import { PartyPopper, AlertTriangle } from 'lucide-react';
import LocateControl from '../components/LocateControl';

// Fix leaflet icon issue natively in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function MapPicker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return position ? <Marker position={position} /> : null;
}

export default function AddZonePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    proposed_name: '',
    address: '',
    total_slots: '',
    proposed_hourly_rate: '',
    operating_hours: '24/7',
    parking_surface: 'paved',
    has_security: false,
    has_cctv: false,
    access_instructions: '',
  });
  const [position, setPosition] = useState(null); // [lat, lng]
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleApply = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!position) {
      setError(t('apply.error.pin'));
      return;
    }

    setLoading(true);
    const payload = {
      ...formData,
      latitude: position[0].toString(),
      longitude: position[1].toString(),
    };

    try {
      const res = await api.post('zones/apply/', payload);
      setSuccessMsg(t('addZone.successMsg', { id: res.data.application_id }));
      setFormData({
        proposed_name: '', address: '', total_slots: '', proposed_hourly_rate: '',
        operating_hours: '24/7', parking_surface: 'paved', has_security: false, has_cctv: false,
        access_instructions: '',
      });
      setPosition(null);
    } catch (err) {
      setError(err.response?.data?.message || t('addZone.errorMsg'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <div className="dashboard-header" style={{ marginBottom: 30 }}>
          <h1>{t('addZone.title')}</h1>
          <p>{t('addZone.subtitle')}</p>
        </div>

        <div className="glass-card" style={{ maxWidth: 800 }}>
          {successMsg ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}><PartyPopper size={48} color="var(--success)" /></div>
              <h2 style={{ fontSize: 24, marginBottom: 16 }}>{t('addZone.successTitle')}</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.6 }}>{successMsg}</p>
              <button 
                className="btn-primary" 
                onClick={() => navigate('/dashboard')}
                style={{ width: 'auto', padding: '12px 32px' }}>
                {t('addZone.returnBtn')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleApply}>
              {error && <div className="alert alert-error" style={{ marginBottom: 24 }}><AlertTriangle size={18} /> {error}</div>}
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div className="form-group">
                  <label>{t('apply.zone.name')}</label>
                  <input type="text" required placeholder={t('addZone.form.namePlaceholder')} 
                    value={formData.proposed_name} onChange={e => setFormData({...formData, proposed_name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>{t('apply.zone.address')}</label>
                  <input type="text" required placeholder={t('addZone.form.addressPlaceholder')}
                    value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div className="form-group">
                  <label>{t('apply.zone.slots')}</label>
                  <input type="number" required min="1" placeholder={t('addZone.form.slotsPlaceholder')}
                    value={formData.total_slots} onChange={e => setFormData({...formData, total_slots: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>{t('apply.zone.rate')}</label>
                  <input type="number" required step="0.01" min="0" placeholder={t('addZone.form.ratePlaceholder')}
                    value={formData.proposed_hourly_rate} onChange={e => setFormData({...formData, proposed_hourly_rate: e.target.value})} />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: 10 }}>
                <label>{t('addZone.form.mapLocation.label')}</label>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>
                  {t('addZone.form.mapLocation.instruction')}
                </div>
                <div style={{ height: 300, width: '100%', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', position: 'relative' }}>
                  <MapContainer center={[5.0, 20.0]} zoom={3} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                    <LocateControl onLocationFound={pos => setPosition([pos.lat, pos.lng])} />
                    <MapPicker position={position} setPosition={setPosition} />
                  </MapContainer>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 24 }}>
                <div className="form-group">
                  <label>{t('apply.zone.surface')}</label>
                  <select value={formData.parking_surface} onChange={e => setFormData({...formData, parking_surface: e.target.value})}>
                    <option value="paved">{t('apply.zone.surfaceOptions.paved')}</option>
                    <option value="gravel">{t('apply.zone.surfaceOptions.gravel')}</option>
                    <option value="indoor">{t('apply.zone.surfaceOptions.indoor')}</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>{t('apply.zone.hours')}</label>
                  <input type="text" placeholder={t('addZone.form.hoursPlaceholder')}
                    value={formData.operating_hours} onChange={e => setFormData({...formData, operating_hours: e.target.value})} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 24, marginTop: 16, marginBottom: 24 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
                  <input type="checkbox" checked={formData.has_security} 
                    onChange={e => setFormData({...formData, has_security: e.target.checked})} />
                  {t('apply.zone.security')}
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
                  <input type="checkbox" checked={formData.has_cctv} 
                    onChange={e => setFormData({...formData, has_cctv: e.target.checked})} />
                  {t('apply.zone.cctv')}
                </label>
              </div>

              <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', padding: '14px' }}>
                {loading ? t('addZone.nav.submitting') : t('addZone.nav.submit')}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
