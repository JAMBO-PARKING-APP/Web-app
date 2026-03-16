import { useEffect, useState } from 'react';
import { api } from '../AuthContext';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/Sidebar';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Banknote, Calendar, Sun, CarFront, Map as MapIcon, TrendingUp, PieChart as PieChartIcon, Car } from 'lucide-react';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'];

function StatCard({ label, value, sub, icon, iconColor }) {
  return (
    <div className="stat-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <span className="stat-label">{label}</span>
        <span style={{ color: iconColor || 'var(--text-secondary)' }}>{icon}</span>
      </div>
      <div className="stat-value">{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label, t }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: '#1e1e3a', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 16px' }}>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{label}</p>
        <p style={{ color: 'var(--accent-light)', fontWeight: 700, fontSize: 16 }}>
          {Number(payload[0].value).toLocaleString(i18n.language)}
        </p>
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('dashboard/')
      .then(res => setData(res.data))
      .catch(() => setError(t('dashboard.error')))
      .finally(() => setLoading(false));
  }, [t]);

  const fmt = (n) => Number(n || 0).toLocaleString(i18n.language, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>{t('dashboard.title')}</h1>
          <p>{t('dashboard.welcome')}</p>
        </div>

        {loading && <div className="loading-center"><div className="spinner" /><span>{t('dashboard.loading')}</span></div>}
        {error && <div className="alert alert-error">⚠️ {error}</div>}

        {data && (
          <>
            {/* Stats */}
            <div className="stats-grid">
              <StatCard label={t('dashboard.stats.totalEarnings')} value={fmt(data.summary.total_earnings)} sub={t('dashboard.stats.allTime')} icon={<Banknote size={24} />} iconColor="var(--success)" />
              <StatCard label={t('dashboard.stats.thisMonth')} value={fmt(data.summary.month_earnings)} sub={t('dashboard.stats.currentMonth')} icon={<Calendar size={24} />} iconColor="var(--accent-light)" />
              <StatCard label={t('dashboard.stats.today')} value={fmt(data.summary.today_earnings)} sub={t('dashboard.stats.todaySub')} icon={<Sun size={24} />} iconColor="var(--warning)" />
              <StatCard label={t('dashboard.stats.activeSessions')} value={data.summary.active_sessions} sub={t('dashboard.stats.activeSub', { count: data.summary.today_sessions })} icon={<CarFront size={24} />} iconColor="var(--accent)" />
              <StatCard label={t('dashboard.stats.zones')} value={data.summary.zones_count} sub={t('dashboard.stats.zonesSub')} icon={<MapIcon size={24} />} iconColor="#c084fc" />
            </div>

            {/* Charts section: Area Chart & Pie Chart */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24, marginBottom: 24 }} className="charts-grid">
              <div className="glass-card" style={{ padding: 28 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <TrendingUp size={20} color="var(--success)" /> {t('dashboard.charts.earningsTitle')}
                </h2>
                {data.earnings_chart.length === 0
                  ? <p style={{ color: 'var(--text-muted)', fontSize: 14, textAlign: 'center', padding: '40px 0' }}>{t('dashboard.charts.noData')}</p>
                  : (
                    <ResponsiveContainer width="100%" height={260}>
                      <AreaChart data={data.earnings_chart} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="date" tick={{ fill: '#475569', fontSize: 11 }} tickLine={false} axisLine={false}
                          tickFormatter={d => new Date(d).toLocaleDateString(i18n.language, { day: 'numeric', month: 'short' })} />
                        <YAxis tick={{ fill: '#475569', fontSize: 11 }} tickLine={false} axisLine={false}
                          tickFormatter={v => v.toLocaleString(i18n.language)} />
                        <Tooltip content={<CustomTooltip t={t} />} cursor={{ stroke: 'rgba(99,102,241,0.3)', strokeWidth: 1 }} />
                        <Area type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={2.5}
                          fill="url(#earningsGrad)" dot={false} activeDot={{ r: 5, fill: '#818cf8' }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  )
                }
              </div>

              {data.revenue_by_zone && data.revenue_by_zone.length > 0 && (
                <div className="glass-card" style={{ padding: 28 }}>
                  <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <PieChartIcon size={20} color="var(--warning)" /> {t('dashboard.charts.revenueSplit')}
                  </h2>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie
                        data={data.revenue_by_zone}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                      >
                        {data.revenue_by_zone.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip t={t} />} />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Zones table */}
            {data.zones.length > 0 && (
              <div className="glass-card" style={{ padding: 28, marginBottom: 24 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <MapIcon size={20} color="var(--accent-light)" /> {t('dashboard.table.zonesTitle')}
                </h2>
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>{t('dashboard.table.colZone')}</th><th>{t('dashboard.table.colSlots')}</th><th>{t('dashboard.table.colRate')}</th>
                        <th>{t('dashboard.table.colActive')}</th><th>{t('dashboard.table.colOccupancy')}</th><th>{t('dashboard.table.colCommission')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.zones.map(z => (
                        <tr key={z.id}>
                          <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{z.name}</td>
                          <td>{z.total_slots}</td>
                          <td>{fmt(z.hourly_rate)}</td>
                          <td><span className="badge badge-active">{z.active_sessions}</span></td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3 }}>
                                <div style={{ width: `${z.occupancy_rate}%`, height: '100%', borderRadius: 3, background: 'linear-gradient(90deg,var(--accent),#8b5cf6)' }} />
                              </div>
                              <span style={{ fontSize: 12, color: 'var(--text-muted)', minWidth: 36 }}>{z.occupancy_rate}%</span>
                            </div>
                          </td>
                          <td style={{ color: 'var(--text-muted)' }}>{z.commission_rate}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Recent sessions */}
            <div className="glass-card" style={{ padding: 28 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Car size={20} color="var(--text-secondary)" /> {t('dashboard.table.sessionsTitle')}
              </h2>
              {data.recent_sessions.length === 0
                ? <p style={{ color: 'var(--text-muted)', fontSize: 14, textAlign: 'center', padding: '40px 0' }}>{t('dashboard.table.noSessions')}</p>
                : (
                  <div className="table-wrapper">
                    <table>
                      <thead><tr><th>{t('dashboard.table.colVehicle')}</th><th>{t('dashboard.table.colZone')}</th><th>{t('dashboard.table.colStart')}</th><th>{t('dashboard.table.colStatus')}</th><th>{t('dashboard.table.colAmount')}</th></tr></thead>
                      <tbody>
                        {data.recent_sessions.map(s => (
                          <tr key={s.id}>
                            <td style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }}>{s.vehicle}</td>
                            <td>{s.zone}</td>
                            <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                              {new Date(s.start_time).toLocaleString(i18n.language, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td>
                              <span className={`badge ${s.status === 'active' ? 'badge-active' : s.status === 'completed' ? 'badge-approved' : 'badge-pending'}`}>
                                {t(`dashboard.table.status.${s.status}`)}
                              </span>
                            </td>
                            <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{fmt(s.final_cost)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              }
            </div>
          </>
        )}
      </main>
    </div>
  );
}
