import React, { useState, useEffect } from 'react';

const deptData: Record<string, any> = {
  all:    { noshow: 15, attendance: 71, engagement: 68, idle: -25, trendBefore: [52, 52, 52, 52, 52, 52], trendAfter: [52, 56, 60, 64, 68, 71] },
  general:{ noshow: 18, attendance: 68, engagement: 64, idle: -20, trendBefore: [55, 55, 55, 55, 55, 55], trendAfter: [55, 58, 61, 64, 66, 68] },
  cardio: { noshow: 12, attendance: 76, engagement: 72, idle: -28, trendBefore: [50, 50, 50, 50, 50, 50], trendAfter: [50, 55, 61, 68, 73, 76] },
  ortho:  { noshow: 22, attendance: 64, engagement: 60, idle: -18, trendBefore: [48, 48, 48, 48, 48, 48], trendAfter: [48, 52, 55, 58, 61, 64] },
  dental: { noshow: 10, attendance: 79, engagement: 74, idle: -30, trendBefore: [60, 60, 60, 60, 60, 60], trendAfter: [60, 64, 68, 72, 76, 79] },
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

const initialPatients = [
  { name: 'Rahul S.', risk: 'High', score: 88, day: 'Mon AM' },
  { name: 'Priya K.', risk: 'High', score: 82, day: 'Mon PM' },
  { name: 'Amit T.', risk: 'High', score: 79, day: 'Tue AM' },
  { name: 'Sunita R.', risk: 'Medium', score: 64, day: 'Wed AM' },
  { name: 'Vikram M.', risk: 'Medium', score: 61, day: 'Thu PM' },
  { name: 'Neha P.', risk: 'Medium', score: 58, day: 'Fri AM' },
  { name: 'Deepa L.', risk: 'Low', score: 32, day: 'Tue PM' },
  { name: 'Arun C.', risk: 'Low', score: 28, day: 'Wed PM' },
];

const doctors = [
  { name: 'Dr. Sharma', util: 92, idle: 1 },
  { name: 'Dr. Patel', util: 87, idle: 2 },
  { name: 'Dr. Mehta', util: 84, idle: 3 },
  { name: 'Dr. Reddy', util: 78, idle: 4 },
  { name: 'Dr. Singh', util: 95, idle: 0 },
];

const weeklyData = [
  { day: 'Mon', val: 58 }, { day: 'Tue', val: 74 }, { day: 'Wed', val: 95 },
  { day: 'Thu', val: 82 }, { day: 'Fri', val: 71 }, { day: 'Sat', val: 45 },
];

const heatmapData = {
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  times: ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM'],
  vals: [
    [88, 42, 30, 52, 65, 22],
    [45, 38, 25, 40, 55, 18],
    [35, 28, 20, 35, 48, 15],
    [55, 45, 30, 50, 60, 20],
    [72, 50, 38, 58, 68, 25],
  ]
};

const donutSegs = [
  { label: 'High Risk', pct: 25, color: '#ef4444' },
  { label: 'Medium Risk', pct: 35, color: '#f59e0b' },
  { label: 'Low Risk', pct: 40, color: '#14a085' },
];

const funnelSteps = [
  { label: 'Booked', val: 100, desc: 'All scheduled appointments' },
  { label: 'Reminded', val: 92, desc: 'Received at least 1 reminder' },
  { label: 'Engaged', val: 68, desc: 'Opened/clicked reminder' },
  { label: 'Confirmed', val: 78, desc: 'Replied confirmed' },
  { label: 'Attended', val: 71, desc: 'Arrived at appointment' },
];

function getCellColor(v: number) {
  if (v >= 80) return 'rgba(239,68,68,0.9)';
  if (v >= 60) return 'rgba(239,68,68,0.55)';
  if (v >= 40) return 'rgba(217,119,6,0.55)';
  if (v >= 20) return 'rgba(20,160,133,0.55)';
  return 'rgba(20,160,133,0.2)';
}

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeDept, setActiveDept] = useState('all');
  const [activePeriod, setActivePeriod] = useState('6m');
  const [showBefore, setShowBefore] = useState(true);
  const [showAfter, setShowAfter] = useState(true);

  // Tooltip
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, content: '' });

  const handleMouseMove = (e: React.MouseEvent, content: string) => {
    let x = e.clientX + 12;
    let y = e.clientY - 10;
    if (x + 180 > window.innerWidth) x = e.clientX - 160;
    setTooltip({ show: true, x, y, content });
  };
  const handleMouseLeave = () => setTooltip({ show: false, x: 0, y: 0, content: '' });

  // Data helpers
  const d = deptData[activeDept];
  const periodMonths = activePeriod === '3m' ? months.slice(3) : activePeriod === '1m' ? [months[5]] : months;
  const periodBefore = activePeriod === '3m' ? d.trendBefore.slice(3) : activePeriod === '1m' ? [d.trendBefore[5]] : d.trendBefore;
  const periodAfter = activePeriod === '3m' ? d.trendAfter.slice(3) : activePeriod === '1m' ? [d.trendAfter[5]] : d.trendAfter;

  const barMax = Math.max(...periodBefore, ...periodAfter) || 100;

  // Donut
  const [activeDonutSeg, setActiveDonutSeg] = useState(-1);
  const donutCenter = activeDonutSeg === -1 ? { pct: '100%', lbl: 'All' } : { pct: donutSegs[activeDonutSeg].pct + '%', lbl: donutSegs[activeDonutSeg].label };

  // Load animation driver
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(false);
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, [activeTab]);

  // Patients Table
  const [sortCol, setSortCol] = useState('score');
  const [sortDir, setSortDir] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir(prev => prev === -1 ? 1 : -1);
    else {
      setSortCol(col);
      setSortDir(-1);
    }
  };

  const sortedPatients = [...initialPatients]
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.risk.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a: any, b: any) => {
      const va = a[sortCol], vb = b[sortCol];
      if (typeof va === 'number') return sortDir * (vb - va);
      return sortDir * va.localeCompare(vb);
    });

  return (
    <div className="pbi-wrap reveal visible">
      <div className="pbi-topbar">
        <div className="pbi-logo">⚡ <span>Power BI</span> · Smart Appointment Analytics</div>
        <div className="pbi-tabs">
          <div className={`pbi-tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</div>
          <div className={`pbi-tab ${activeTab === 'noshow' ? 'active' : ''}`} onClick={() => setActiveTab('noshow')}>No-Show Analysis</div>
          <div className={`pbi-tab ${activeTab === 'doctor' ? 'active' : ''}`} onClick={() => setActiveTab('doctor')}>Doctor Utilization</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
          <select value={activeDept} onChange={(e) => setActiveDept(e.target.value)} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', padding: '0.25rem 0.5rem', borderRadius: '0.3rem', outline: 'none', cursor: 'pointer' }}>
            <option value="all" style={{ background: '#132040' }}>All Departments</option>
            <option value="general" style={{ background: '#132040' }}>General</option>
            <option value="cardio" style={{ background: '#132040' }}>Cardiology</option>
            <option value="ortho" style={{ background: '#132040' }}>Orthopedics</option>
            <option value="dental" style={{ background: '#132040' }}>Dental</option>
          </select>
          <select value={activePeriod} onChange={(e) => setActivePeriod(e.target.value)} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', padding: '0.25rem 0.5rem', borderRadius: '0.3rem', outline: 'none', cursor: 'pointer' }}>
            <option value="6m" style={{ background: '#132040' }}>Last 6 Months</option>
            <option value="3m" style={{ background: '#132040' }}>Last 3 Months</option>
            <option value="1m" style={{ background: '#132040' }}>Last Month</option>
          </select>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)' }}>Refreshed just now</div>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="pbi-tab-content">
          <div className="pbi-body">
            <div className="pbi-kpi teal">
              <div className="pbi-kpi-label">No-Show Rate</div>
              <div className="pbi-kpi-val">{d.noshow}%</div>
              <div className="pbi-kpi-delta down">↓ {28 - d.noshow}pp vs baseline (28%)</div>
              <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', marginTop: '0.6rem', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${d.noshow}%`, background: '#14a085', borderRadius: '2px', transition: 'width 1s' }} />
              </div>
            </div>
            <div className="pbi-kpi green">
              <div className="pbi-kpi-label">Attendance Rate</div>
              <div className="pbi-kpi-val">{d.attendance}%</div>
              <div className="pbi-kpi-delta up">↑ {d.attendance - 52}pp improvement</div>
              <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', marginTop: '0.6rem', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${d.attendance}%`, background: '#68d391', borderRadius: '2px', transition: 'width 1s' }} />
              </div>
            </div>
            <div className="pbi-kpi amber">
              <div className="pbi-kpi-label">Reminder Engagement</div>
              <div className="pbi-kpi-val">{d.engagement}%</div>
              <div className="pbi-kpi-delta up">↑ {d.engagement - 40}pp vs control</div>
              <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', marginTop: '0.6rem', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${d.engagement}%`, background: '#fbd38d', borderRadius: '2px', transition: 'width 1s' }} />
              </div>
            </div>
            <div className="pbi-kpi red">
              <div className="pbi-kpi-label">Doctor Idle Time</div>
              <div className="pbi-kpi-val">{d.idle}%</div>
              <div className="pbi-kpi-delta up">↑ Better utilization</div>
              <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', marginTop: '0.6rem', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.abs(d.idle)}%`, background: '#fc8181', borderRadius: '2px', transition: 'width 1s' }} />
              </div>
            </div>
          </div>
          <div className="pbi-charts">
            <div className="pbi-chart">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <div className="pbi-chart-title" style={{ margin: 0 }}>Attendance Trend</div>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button onClick={() => setShowBefore(!showBefore)} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', padding: '0.2rem 0.5rem', borderRadius: '2rem', border: '1px solid #ef4444', background: 'rgba(239,68,68,0.2)', color: '#fc8181', cursor: 'pointer', opacity: showBefore ? 1 : 0.35 }}>Before AI</button>
                  <button onClick={() => setShowAfter(!showAfter)} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', padding: '0.2rem 0.5rem', borderRadius: '2rem', border: '1px solid #14a085', background: 'rgba(20,160,133,0.2)', color: '#4fd1c5', cursor: 'pointer', opacity: showAfter ? 1 : 0.35 }}>After AI</button>
                </div>
              </div>
              <div style={{ position: 'relative', height: '130px', display: 'flex', alignItems: 'flex-end', gap: '4px', paddingBottom: '20px' }}>
                {periodMonths.map((m, i) => (
                  <div key={m} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '2px', position: 'relative' }}>
                    <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', width: '100%', height: '100px' }}>
                      {showBefore && (
                        <div
                          style={{ flex: 1, height: loaded ? `${(periodBefore[i] / barMax) * 100}%` : 0, borderRadius: '2px 2px 0 0', background: 'rgba(239,68,68,0.6)', transition: `height 0.8s ${i * 0.1}s`, cursor: 'pointer' }}
                          onMouseEnter={(e) => handleMouseMove(e, `<b>${m}</b><br>Before AI: <span style="color:#fc8181">${periodBefore[i]}%</span>`)}
                          onMouseLeave={handleMouseLeave}
                          onMouseMove={(e) => handleMouseMove(e, `<b>${m}</b><br>Before AI: <span style="color:#fc8181">${periodBefore[i]}%</span>`)}
                        />
                      )}
                      {showAfter && (
                        <div
                          style={{ flex: 1, height: loaded ? `${(periodAfter[i] / barMax) * 100}%` : 0, borderRadius: '2px 2px 0 0', background: '#14a085', transition: `height 0.8s ${i * 0.1}s`, cursor: 'pointer' }}
                          onMouseEnter={(e) => handleMouseMove(e, `<b>${m}</b><br>After AI: <span style="color:#4fd1c5">${periodAfter[i]}%</span>`)}
                          onMouseLeave={handleMouseLeave}
                          onMouseMove={(e) => handleMouseMove(e, `<b>${m}</b><br>After AI: <span style="color:#4fd1c5">${periodAfter[i]}%</span>`)}
                        />
                      )}
                    </div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center', position: 'absolute', bottom: '2px', left: 0, right: 0 }}>{m}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pbi-chart">
              <div className="pbi-chart-title">Risk Distribution</div>
              <div style={{ position: 'relative', width: '110px', height: '110px', margin: '0 auto' }}>
                <svg width="110" height="110" viewBox="0 0 110 110" style={{ transform: 'rotate(-90deg)', pointerEvents: 'auto' }}>
                  {(() => {
                    let cum = 0;
                    return donutSegs.map((seg, i) => {
                      const r = 40;
                      const circ = 2 * Math.PI * r;
                      const strokeDasharray = `${(seg.pct / 100) * circ} ${circ}`;
                      const strokeDashoffset = -(cum / 100) * circ;
                      cum += seg.pct;
                      const isHovered = activeDonutSeg === i;
                      const isFaded = activeDonutSeg !== -1 && !isHovered;
                      return (
                        <circle
                          key={i} cx="55" cy="55" r={r} fill="transparent" stroke={seg.color}
                          strokeWidth={isHovered ? 14 : 10} strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset}
                          style={{ transition: 'all 0.2s', opacity: isFaded ? 0.35 : 1, cursor: 'pointer' }}
                          onMouseEnter={() => setActiveDonutSeg(i)}
                          onMouseLeave={() => setActiveDonutSeg(-1)}
                        />
                      );
                    });
                  })()}
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{donutCenter.pct}</div>
                  <div style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.4)', fontFamily: "'IBM Plex Mono', monospace" }}>{donutCenter.lbl}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.8rem' }}>
                {donutSegs.map((seg, i) => (
                  <div
                    key={i}
                    className="pbi-donut-leg"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.2rem 0.3rem', borderRadius: '0.3rem', transition: 'background 0.2s' }}
                    onClick={() => setActiveDonutSeg(prev => prev === i ? -1 : i)}
                  >
                    <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: seg.color, flexShrink: 0 }}></div>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.6)' }}>{seg.label} · {seg.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pbi-chart">
              <div className="pbi-chart-title">Conversion Funnel</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {funnelSteps.map((s, i) => (
                  <div
                    key={s.label}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                    onMouseEnter={e => handleMouseMove(e, `<b>${s.label}</b><br>${s.val}% · ${s.desc}`)}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={e => handleMouseMove(e, `<b>${s.label}</b><br>${s.val}% · ${s.desc}`)}
                  >
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', width: '62px', textAlign: 'right', flexShrink: 0 }}>{s.label}</div>
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.07)', borderRadius: '2px', overflow: 'hidden', height: '16px' }}>
                      <div style={{ height: '100%', width: loaded ? `${s.val}%` : 0, borderRadius: '2px', background: 'linear-gradient(to right,#0d7377,#14a085)', transition: `width 1s ${i * 0.15}s` }} />
                    </div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: 'rgba(255,255,255,0.5)', width: '30px', flexShrink: 0 }}>{s.val}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'noshow' && (
        <div className="pbi-tab-content">
          <div className="pbi-body">
            <div className="pbi-kpi teal"><div className="pbi-kpi-label">Total No-Shows (Jun)</div><div className="pbi-kpi-val">87</div><div className="pbi-kpi-delta down">↓ 42 vs Jan (129)</div></div>
            <div className="pbi-kpi red"><div className="pbi-kpi-label">Highest Risk Day</div><div className="pbi-kpi-val">Monday</div><div className="pbi-kpi-delta down">3.2× avg rate</div></div>
            <div className="pbi-kpi amber"><div className="pbi-kpi-label">Repeat No-Shows</div><div className="pbi-kpi-val">34%</div><div className="pbi-kpi-delta down">3× higher risk</div></div>
            <div className="pbi-kpi green"><div className="pbi-kpi-label">Recovered via Reschedule</div><div className="pbi-kpi-val">62%</div><div className="pbi-kpi-delta up">↑ One-click feature</div></div>
          </div>
          <div className="pbi-charts pbi-charts-2col">
            <div className="pbi-chart">
              <div className="pbi-chart-title">No-Show Heatmap by Day & Time</div>
              <div style={{ display: 'grid', gridTemplateColumns: '40px repeat(6, 1fr)', gap: '3px', marginTop: '0.5rem' }}>
                <div />
                {heatmapData.days.map(d => <div key={d} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.45rem', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>{d}</div>)}
                {heatmapData.times.map((t, ti) => (
                  <React.Fragment key={t}>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.45rem', color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center' }}>{t}</div>
                    {heatmapData.days.map((d, di) => {
                      const v = heatmapData.vals[ti][di];
                      return (
                        <div
                          key={`${di}-${ti}`}
                          style={{ height: '18px', borderRadius: '2px', cursor: 'pointer', transition: 'transform 0.15s', background: getCellColor(v) }}
                          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)'; handleMouseMove(e, `<b>${d} · ${t}</b><br>No-show risk: <b>${v}%</b>`); }}
                          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; handleMouseLeave(); }}
                          onMouseMove={e => handleMouseMove(e, `<b>${d} · ${t}</b><br>No-show risk: <b>${v}%</b>`)}
                        />
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.6rem', alignItems: 'center' }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)' }}>Low</span>
                <div style={{ display: 'flex', gap: '2px' }}>
                  <div style={{ width: '12px', height: '8px', borderRadius: '2px', background: 'rgba(20,160,133,0.2)' }}></div>
                  <div style={{ width: '12px', height: '8px', borderRadius: '2px', background: 'rgba(20,160,133,0.5)' }}></div>
                  <div style={{ width: '12px', height: '8px', borderRadius: '2px', background: 'rgba(217,119,6,0.5)' }}></div>
                  <div style={{ width: '12px', height: '8px', borderRadius: '2px', background: 'rgba(239,68,68,0.5)' }}></div>
                  <div style={{ width: '12px', height: '8px', borderRadius: '2px', background: 'rgba(239,68,68,0.9)' }}></div>
                </div>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)' }}>High</span>
              </div>
            </div>

            <div className="pbi-chart" style={{ padding: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <div className="pbi-chart-title" style={{ margin: 0 }}>High-Risk Patients</div>
                <input
                  placeholder="Search…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', padding: '0.2rem 0.5rem', borderRadius: '0.3rem', outline: 'none', width: '90px' }}
                />
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.7rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    {['name', 'risk', 'score', 'day'].map((k) => (
                      <th
                        key={k}
                        onClick={() => handleSort(k)}
                        style={{ textAlign: 'left', padding: '0.3rem 0.4rem', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', userSelect: 'none' }}
                      >
                        {k.charAt(0).toUpperCase() + k.slice(1)} {sortCol === k ? (sortDir === -1 ? '↓' : '↑') : '↕'}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedPatients.map((r, i) => {
                    const riskColor = r.risk === 'High' ? '#fc8181' : r.risk === 'Medium' ? '#fbd38d' : '#68d391';
                    const riskBg = r.risk === 'High' ? 'rgba(239,68,68,0.12)' : r.risk === 'Medium' ? 'rgba(251,211,141,0.12)' : 'rgba(104,211,145,0.12)';
                    return (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer' }}>
                        <td style={{ padding: '0.35rem 0.4rem', color: 'rgba(255,255,255,0.75)', fontSize: '0.72rem' }}>{r.name}</td>
                        <td style={{ padding: '0.35rem 0.4rem' }}><span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', padding: '0.15rem 0.4rem', borderRadius: '2rem', background: riskBg, color: riskColor, border: `1px solid ${riskColor}40` }}>{r.risk}</span></td>
                        <td style={{ padding: '0.35rem 0.4rem', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.68rem', color: riskColor }}>{r.score}</td>
                        <td style={{ padding: '0.35rem 0.4rem', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)' }}>{r.day}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'doctor' && (
        <div className="pbi-tab-content">
          <div className="pbi-body">
            <div className="pbi-kpi green"><div className="pbi-kpi-label">Avg Slot Utilization</div><div className="pbi-kpi-val">87%</div><div className="pbi-kpi-delta up">↑ 25% improvement</div></div>
            <div className="pbi-kpi teal"><div className="pbi-kpi-label">Idle Slots (This Week)</div><div className="pbi-kpi-val">4</div><div className="pbi-kpi-delta up">↓ from 18/week</div></div>
            <div className="pbi-kpi amber"><div className="pbi-kpi-label">Overbooking Applied</div><div className="pbi-kpi-val">12%</div><div className="pbi-kpi-delta up">Safe buffer slots</div></div>
            <div className="pbi-kpi red"><div className="pbi-kpi-label">Peak Day</div><div className="pbi-kpi-val">Wed</div><div className="pbi-kpi-delta up">95% occupied</div></div>
          </div>
          <div className="pbi-charts pbi-charts-2col">
            <div className="pbi-chart">
              <div className="pbi-chart-title">Doctor Slot Utilization</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                {doctors.map((d, i) => {
                  const color = d.util >= 90 ? '#68d391' : d.util >= 80 ? '#14a085' : '#f59e0b';
                  return (
                    <div
                      key={d.name}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                      onMouseEnter={e => handleMouseMove(e, `<b>${d.name}</b><br>Utilization: ${d.util}%<br>Idle slots today: ${d.idle}`)}
                      onMouseLeave={handleMouseLeave}
                      onMouseMove={e => handleMouseMove(e, `<b>${d.name}</b><br>Utilization: ${d.util}%<br>Idle slots today: ${d.idle}`)}
                    >
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: 'rgba(255,255,255,0.5)', width: '78px', flexShrink: 0 }}>{d.name}</div>
                      <div style={{ flex: 1, background: 'rgba(255,255,255,0.07)', borderRadius: '2px', overflow: 'hidden', height: '14px' }}>
                        <div style={{ height: '100%', width: loaded ? `${d.util}%` : 0, borderRadius: '2px', background: color, transition: `width 0.9s ${i * 0.1}s` }} />
                      </div>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)', width: '30px', flexShrink: 0 }}>{d.util}%</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="pbi-chart">
              <div className="pbi-chart-title">Weekly Attendance by Day</div>
              <div style={{ position: 'relative', height: '120px', marginTop: '0.5rem', display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
                {weeklyData.map((d, i) => {
                  const color = d.val >= 90 ? '#68d391' : d.val >= 70 ? '#14a085' : '#f59e0b';
                  return (
                    <div
                      key={d.day}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '3px', cursor: 'pointer' }}
                      onMouseEnter={e => handleMouseMove(e, `<b>${d.day}</b><br>Attendance: <span style="color:#4fd1c5">${d.val}%</span>`)}
                      onMouseLeave={handleMouseLeave}
                      onMouseMove={e => handleMouseMove(e, `<b>${d.day}</b><br>Attendance: <span style="color:#4fd1c5">${d.val}%</span>`)}
                    >
                      <div style={{ width: '100%', height: loaded ? `${d.val}%` : 0, borderRadius: '3px 3px 0 0', background: color, transition: `height 0.8s ${i * 0.1}s` }} />
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', color: 'rgba(255,255,255,0.35)' }}>{d.day}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {tooltip.show && (
        <div
          style={{ position: 'fixed', left: tooltip.x, top: tooltip.y, background: 'rgba(10,22,40,0.95)', border: '1px solid rgba(20,160,133,0.4)', padding: '0.5rem 0.7rem', borderRadius: '0.4rem', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: '#fff', pointerEvents: 'none', zIndex: 999 }}
          dangerouslySetInnerHTML={{ __html: tooltip.content }}
        />
      )}
    </div>
  );
}
