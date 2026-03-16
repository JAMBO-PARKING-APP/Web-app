import { useMap } from 'react-leaflet';
import { LocateFixed } from 'lucide-react';
import L from 'leaflet';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function LocateControl({ onLocationFound }) {
  const map = useMap();
  const { t } = useTranslation();

  const handleLocate = () => {
    map.locate({ setView: true, maxZoom: 16 });
  };

  useEffect(() => {
    const handleLocationFound = (e) => {
      onLocationFound(e.latlng);
      L.marker(e.latlng).addTo(map).bindPopup(t('locate.here')).openPopup();
    };

    const handleLocationError = (e) => {
      alert(t('locate.error'));
    };

    map.on('locationfound', handleLocationFound);
    map.on('locationerror', handleLocationError);

    return () => {
      map.off('locationfound', handleLocationFound);
      map.off('locationerror', handleLocationError);
    };
  }, [map, onLocationFound, t]);

  return (
    <div className="leaflet-top leaflet-right" style={{ marginTop: '10px', marginRight: '10px', pointerEvents: 'auto' }}>
      <div className="leaflet-control leaflet-bar">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleLocate();
          }}
          title={t('locate.title')}
          style={{
            backgroundColor: 'var(--card-bg)',
            color: 'var(--text-primary)',
            width: '34px',
            height: '34px',
            lineHeight: '34px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '4px',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--card-bg)'}
        >
          <LocateFixed size={20} />
        </button>
      </div>
    </div>
  );
}
