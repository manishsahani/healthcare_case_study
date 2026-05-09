import React, { useEffect, useState } from 'react';
import { Dashboard } from './Dashboard';

export default function App() {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    // Scroll handling for progress bar and nav highlighting
    const handleScroll = () => {
      const scrollableRange = document.body.scrollHeight - window.innerHeight;
      const pct = scrollableRange > 0 ? (window.scrollY / scrollableRange) * 100 : 0;
      setScrollPct(pct);

      const navH = document.querySelector('nav')?.offsetHeight || 60 + 20;
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-links a');
      
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - navH) current = s.id;
      });
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + current);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Intersection Observer for scroll reveal
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <div id="progress" style={{ width: `${scrollPct}%` }}></div>

      <nav>
        <div className="nav-inner">
          <a href="#hero" className="nav-logo">MANISH SAHANI <span>· Case Study</span></a>
          <div className="nav-links">
            <a href="#problem">Problem</a>
            <a href="#solution">Solution</a>
            <a href="#wireframes">Screens</a>
            <a href="#dashboard">Dashboard</a>
            <a href="#prd">PRD</a>
            <a href="#roadmap">Roadmap</a>
            <a href="#impact">Impact</a>
          </div>
          <div className="nav-badge">BA · Product Analyst · APM</div>
        </div>
      </nav>

      <section id="hero">
        <div className="hero-pattern"></div>
        <div className="hero-glow"></div>
        <div className="hero-glow2"></div>
        <div className="hero-inner">
          <div className="hero-domain">Healthcare · Digital Health · Patient Engagement</div>
          <h1 className="hero-h1">AI-Driven Appointment<br /><em>No-Show Reduction</em> System</h1>
          <p className="hero-sub">A 16-week end-to-end business analysis initiative — from stakeholder discovery and requirements elicitation to PRD writing, SQL-driven insights, and KPI-measured rollout — reducing patient no-shows from 28% to 15%.</p>
          <div className="hero-pills">
            <span className="hero-pill">Business Analysis</span>
            <span className="hero-pill">Requirements & PRD</span>
            <span className="hero-pill">Product Analytics</span>
            <span className="hero-pill">SQL & KPI Tracking</span>
            <span className="hero-pill">Power BI Dashboards</span>
            <span className="hero-pill">Agile · Scrum</span>
            <span className="hero-pill">UAT & Stakeholder Mgmt</span>
          </div>
          <div className="hero-metrics">
            <div className="hero-metric">
              <div className="metric-val">13% <span className="metric-arrow">↓</span></div>
              <div className="metric-label">No-Show Rate Reduced</div>
              <div className="metric-sub">28% → 15%</div>
            </div>
            <div className="hero-metric">
              <div className="metric-val">19% <span className="metric-arrow">↑</span></div>
              <div className="metric-label">Patient Attendance</div>
              <div className="metric-sub">52% → 71%</div>
            </div>
            <div className="hero-metric">
              <div className="metric-val">28% <span className="metric-arrow">↑</span></div>
              <div className="metric-label">Engagement Rate</div>
              <div className="metric-sub">40% → 68%</div>
            </div>
            <div className="hero-metric">
              <div className="metric-val">25% <span className="metric-arrow">↓</span></div>
              <div className="metric-label">Doctor Idle Time</div>
              <div className="metric-sub">Utilization optimized</div>
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className="section">
        <div className="section-inner">
          <div className="section-label reveal">Business Problem</div>
          <h2 className="section-h2 reveal">Operational Gaps Causing <em>Revenue Leakage</em></h2>
          <div className="problem-grid">
            <div className="problem-card reveal">
              <div className="problem-icon icon-red">📉</div>
              <div>
                <div className="problem-title">28% Patient No-Show Rate</div>
                <div className="problem-impact">Every missed appointment = lost revenue + wasted doctor time. With hundreds of daily appointments, this compounded into significant operational loss.</div>
                <span className="problem-badge">Critical · Revenue Impact</span>
              </div>
            </div>
            <div className="problem-card reveal">
              <div className="problem-icon icon-amber">📢</div>
              <div>
                <div className="problem-title">Manual Reminder Workflows</div>
                <div className="problem-impact">Staff manually called patients — a time-intensive, inconsistent process with no personalization and low engagement rates (~40%).</div>
                <span className="problem-badge">High · Operational Inefficiency</span>
              </div>
            </div>
            <div className="problem-card reveal">
              <div className="problem-icon icon-blue">👥</div>
              <div>
                <div className="problem-title">No Patient Segmentation</div>
                <div className="problem-impact">Generic, one-size-fits-all communication ignored patient behavior, risk level, and channel preferences — resulting in poor response rates.</div>
                <span className="problem-badge">High · UX Gap</span>
              </div>
            </div>
            <div className="problem-card reveal">
              <div className="problem-icon icon-green">🩺</div>
              <div>
                <div className="problem-title">Underutilized Doctor Schedules</div>
                <div className="problem-impact">No-shows left appointment slots empty with no automated backfill mechanism, directly reducing doctor productivity and patient throughput.</div>
                <span className="problem-badge">High · Resource Waste</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <section className="section alt-bg">
        <div className="section-inner">
          <div className="section-label reveal">Stakeholder Map</div>
          <h2 className="section-h2 reveal">Cross-functional <em>Team</em></h2>
          <div className="stakeholder-grid">
            <div className="stakeholder-card reveal"><div className="stakeholder-icon">🎯</div><div className="stakeholder-role">Product Manager</div><div className="stakeholder-resp">Vision & roadmap ownership</div></div>
            <div className="stakeholder-card reveal"><div className="stakeholder-icon">📊</div><div className="stakeholder-role">Business Analyst</div><div className="stakeholder-resp">Requirements & KPI tracking</div></div>
            <div className="stakeholder-card reveal"><div className="stakeholder-icon">🏥</div><div className="stakeholder-role">Healthcare Ops</div><div className="stakeholder-resp">Scheduling workflows</div></div>
            <div className="stakeholder-card reveal"><div className="stakeholder-icon">👨‍⚕️</div><div className="stakeholder-role">Doctors</div><div className="stakeholder-resp">Appointment management</div></div>
            <div className="stakeholder-card reveal"><div className="stakeholder-icon">🧑‍💻</div><div className="stakeholder-role">Engineering</div><div className="stakeholder-resp">Product development</div></div>
            <div className="stakeholder-card reveal"><div className="stakeholder-icon">📈</div><div className="stakeholder-role">Data Team</div><div className="stakeholder-resp">Predictive analytics</div></div>
            <div className="stakeholder-card reveal"><div className="stakeholder-icon">🤒</div><div className="stakeholder-role">Patients</div><div className="stakeholder-resp">Primary end users</div></div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <section className="section">
        <div className="section-inner">
          <div className="section-label reveal">User Research</div>
          <h2 className="section-h2 reveal">User <em>Personas</em></h2>
          <div className="personas-grid">
            <div className="persona-card reveal">
              <div className="persona-header">
                <div className="persona-avatar avatar-blue">👨‍💼</div>
                <div>
                  <div className="persona-name">Rahul Sharma</div>
                  <div className="persona-tag">Persona 01 · Working Professional</div>
                  <div className="persona-age">Age 31 · Software Engineer · Urban, Mumbai</div>
                </div>
              </div>
              <div className="persona-body">
                <div className="persona-section-title">Goals</div>
                <ul className="persona-list">
                  <li>Quick and frictionless appointment booking</li>
                  <li>Automated smart reminders on preferred channels</li>
                  <li>Instant one-click rescheduling without calling</li>
                </ul>
                <div className="persona-section-title">Pain Points</div>
                <ul className="persona-list">
                  <li>Forgets appointments due to busy work schedule</li>
                  <li>Doesn't check emails; prefers WhatsApp/push</li>
                  <li>Long wait times on phone for rescheduling</li>
                </ul>
                <div className="persona-opportunity">Enable personalized push + WhatsApp reminders with smart one-click rescheduling flows.</div>
              </div>
            </div>
            <div className="persona-card reveal">
              <div className="persona-header">
                <div className="persona-avatar avatar-green">👩‍🦳</div>
                <div>
                  <div className="persona-name">Meera Patel</div>
                  <div className="persona-tag">Persona 02 · Elderly Patient</div>
                  <div className="persona-age">Age 62 · Retired · Suburban, Nagpur</div>
                </div>
              </div>
              <div className="persona-body">
                <div className="persona-section-title">Goals</div>
                <ul className="persona-list">
                  <li>Simple, clear appointment tracking</li>
                  <li>Voice-based or SMS reminders (low-tech)</li>
                  <li>Support from family caregiver when needed</li>
                </ul>
                <div className="persona-section-title">Pain Points</div>
                <ul className="persona-list">
                  <li>Difficulty navigating complex mobile apps</li>
                  <li>Frequently misses silent push notifications</li>
                  <li>No caregiver loop-in for critical appointments</li>
                </ul>
                <div className="persona-opportunity">Introduce voice reminders, SMS fallback, and optional caregiver notification system.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <section className="section alt-bg">
        <div className="section-inner">
          <div className="section-label reveal">Journey Mapping</div>
          <h2 className="section-h2 reveal">Before vs After <em>User Journey</em></h2>

          <div className="journey-label label-red reveal">❌ &nbsp;Existing Journey — High Friction, Low Completion</div>
          <div className="journey-wrap old-journey reveal">
            <div className="journey-step">
              <div className="step-num">Step 01</div>
              <div className="step-icon">📅</div>
              <div className="step-title">Books Appointment</div>
              <div className="step-desc">Patient schedules via phone or portal with no confirmation flow</div>
              <div className="journey-arrow">→</div>
            </div>
            <div className="journey-step">
              <div className="step-num">Step 02</div>
              <div className="step-icon">📧</div>
              <div className="step-title">Generic Reminder</div>
              <div className="step-desc">Receives single generic email days before — no personalization</div>
              <div className="journey-arrow">→</div>
            </div>
            <div className="journey-step">
              <div className="step-num">Step 03</div>
              <div className="step-icon">🤔</div>
              <div className="step-title">Forgets / Conflicts</div>
              <div className="step-desc">No rescheduling option, no follow-up, long booking gap causes forgetting</div>
              <div className="journey-arrow">→</div>
            </div>
            <div className="journey-step">
              <div className="step-num">Step 04</div>
              <div className="step-icon">❌</div>
              <div className="step-title">No-Show</div>
              <div className="step-desc">Patient doesn't arrive — slot wasted, doctor idle, revenue lost</div>
            </div>
          </div>

          <div className="journey-gap"></div>

          <div className="journey-label label-green reveal">✅ &nbsp;Improved Journey — AI-Powered, Patient-Centric</div>
          <div className="journey-wrap new-journey reveal">
            <div className="journey-step">
              <div className="step-num">Step 01</div>
              <div className="step-icon">📅</div>
              <div className="step-title">Books Appointment</div>
              <div className="step-desc">Instant booking confirmation with preferred channel preferences captured</div>
              <div className="journey-arrow">→</div>
            </div>
            <div className="journey-step">
              <div className="step-num">Step 02</div>
              <div className="step-icon">🤖</div>
              <div className="step-title">AI Risk Scoring</div>
              <div className="step-desc">Model predicts no-show probability using booking gap, history, behavior</div>
              <div className="journey-arrow">→</div>
            </div>
            <div className="journey-step">
              <div className="step-num">Step 03</div>
              <div className="step-icon">💬</div>
              <div className="step-title">Personalized Reminder</div>
              <div className="step-desc">Multi-channel (WhatsApp/SMS/push) reminders with risk-based frequency</div>
              <div className="journey-arrow">→</div>
            </div>
            <div className="journey-step">
              <div className="step-num">Step 04</div>
              <div className="step-icon">🔄</div>
              <div className="step-title">One-Click Reschedule</div>
              <div className="step-desc">Patient reschedules instantly if needed — slot automatically backfilled</div>
              <div className="journey-arrow">→</div>
            </div>
            <div className="journey-step">
              <div className="step-num">Step 05</div>
              <div className="step-icon">✅</div>
              <div className="step-title">Appointment Kept</div>
              <div className="step-desc">Patient arrives on time — doctor utilized, revenue protected</div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <section id="solution" className="section">
        <div className="section-inner">
          <div className="section-label reveal">Analytics</div>
          <h2 className="section-h2 reveal">SQL Insights & <em>A/B Testing</em></h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }} className="responsive-grid">
            <div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1rem' }}>Root Cause Findings</div>
              <div className="insights-grid reveal">
                <div className="insight-card">
                  <div className="insight-icon">📅</div>
                  <div>
                    <div className="insight-label">Highest Risk Window</div>
                    <div className="insight-val">Monday Mornings</div>
                    <span className="insight-badge">3.2× no-show rate</span>
                  </div>
                </div>
                <div className="insight-card">
                  <div className="insight-icon">👶</div>
                  <div>
                    <div className="insight-label">Demographic Insight</div>
                    <div className="insight-val">Age 20–35 Cohort</div>
                    <span className="insight-badge">Lowest engagement</span>
                  </div>
                </div>
                <div className="insight-card">
                  <div className="insight-icon">⏳</div>
                  <div>
                    <div className="insight-label">Booking Gap Effect</div>
                    <div className="insight-val">&gt; 14 Days</div>
                    <span className="insight-badge">2× cancellation risk</span>
                  </div>
                </div>
                <div className="insight-card">
                  <div className="insight-icon">🔁</div>
                  <div>
                    <div className="insight-label">Repeat Offenders</div>
                    <div className="insight-val">Prior No-Shows</div>
                    <span className="insight-badge">3× higher risk</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.8rem' }}>Sample SQL Analysis</div>
                <div className="sql-block reveal">
                  <div className="sql-header">
                    <div className="sql-dots"><div className="sql-dot"></div><div className="sql-dot"></div><div className="sql-dot"></div></div>
                    <div className="sql-lang">SQL · appointments_db</div>
                  </div>
                  <div className="sql-code">
                    <span className="cmt">-- No-show rate by day of week</span><br />
                    <span className="kw">SELECT</span><br />
                      &nbsp;&nbsp;<span className="fn">DATENAME</span>(<span className="str">'weekday'</span>, appointment_date)<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">AS</span> <span className="col">appointment_day</span>,<br />
                      &nbsp;&nbsp;<span className="fn">COUNT</span>(*) <span className="kw">AS</span> <span className="col">total_appts</span>,<br />
                      &nbsp;&nbsp;<span className="fn">SUM</span>(<span className="kw">CASE WHEN</span> status = <span className="str">'No Show'</span><br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">THEN</span> <span className="num">1</span> <span className="kw">ELSE</span> <span className="num">0</span> <span className="kw">END</span>) <span className="kw">AS</span> <span className="col">no_shows</span>,<br />
                      &nbsp;&nbsp;<span className="fn">ROUND</span>(<span className="fn">AVG</span>(no_show_flag) * <span className="num">100</span>, <span className="num">2</span>)<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">AS</span> <span className="col">no_show_pct</span><br />
                    <span className="kw">FROM</span> appointments<br />
                    <span className="kw">WHERE</span> appointment_date<br />
                      &nbsp;&nbsp;&gt;= <span className="fn">DATEADD</span>(<span className="str">'month'</span>, <span className="num">-6</span>, <span className="fn">GETDATE</span>())<br />
                    <span className="kw">GROUP BY</span> appointment_day<br />
                    <span className="kw">ORDER BY</span> no_show_pct <span className="kw">DESC</span>;
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1rem' }}>A/B Test Results</div>
              <div className="ab-grid reveal" style={{ gridTemplateColumns: '1fr' }}>
                <div className="ab-card">
                  <div className="ab-label">Variant A — Control</div>
                  <div className="ab-rate">52%</div>
                  <div className="ab-desc">Generic reminder (single email, no personalization)</div>
                  <div className="ab-bar-wrap"><div className="ab-bar" style={{ width: '52%', background: '#e53e3e', opacity: 0.7 }}></div></div>
                </div>
                <div className="ab-card winner">
                  <div className="ab-label">Variant B — Personalized AI Reminder</div>
                  <div className="ab-rate">71%</div>
                  <div className="ab-desc">Multi-channel, risk-scored, timing-optimized reminder flow</div>
                  <div className="ab-bar-wrap"><div className="ab-bar" style={{ width: '71%' }}></div></div>
                  <span className="winner-badge">🏆 Winner · +19pp improvement</span>
                </div>
              </div>
              <div style={{ marginTop: '1.5rem', background: 'var(--teal-light)', border: '1px solid rgba(13,115,119,0.2)', borderRadius: '0.7rem', padding: '1.2rem', fontSize: '0.83rem', color: 'var(--teal)', fontWeight: 500 }}>
                <strong>Key Learning:</strong> Personalized, risk-tiered reminders delivered through the patient's preferred channel improved appointment adherence by <strong>19 percentage points</strong> over generic communication.
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <section className="section alt-bg">
        <div className="section-inner">
          <div className="section-label reveal">Solution Architecture</div>
          <h2 className="section-h2 reveal">AI-Powered <em>Feature Set</em></h2>
          <div className="features-grid">
            <div className="feature-card reveal">
              <div className="feature-num">01</div>
              <div className="feature-icon">🧠</div>
              <h3>Predictive No-Show Scoring</h3>
              <p>ML model assigns a real-time risk score to each patient before their appointment, enabling proactive intervention only where needed — not spray-and-pray reminders.</p>
              <div className="feature-tags">
                <span className="feature-tag">Booking gap</span>
                <span className="feature-tag">Patient history</span>
                <span className="feature-tag">Attendance trends</span>
                <span className="feature-tag">Appointment timing</span>
                <span className="feature-tag">Engagement score</span>
              </div>
            </div>
            <div className="feature-card reveal">
              <div className="feature-icon">💬</div>
              <div className="feature-num">02</div>
              <h3>Smart Multi-Channel Reminders</h3>
              <p>Automated, personalized reminders delivered via the patient's preferred channel at optimized intervals. Risk-score determines reminder frequency and urgency.</p>
              <div className="feature-tags">
                <span className="feature-tag">WhatsApp</span>
                <span className="feature-tag">SMS</span>
                <span className="feature-tag">Push notification</span>
                <span className="feature-tag">Email</span>
                <span className="feature-tag">Voice (elderly)</span>
              </div>
            </div>
            <div className="feature-card reveal">
              <div className="feature-icon">🔄</div>
              <div className="feature-num">03</div>
              <h3>One-Click Rescheduling</h3>
              <p>Patients can change slots instantly from within the reminder message — zero phone calls, zero friction. System automatically backfills released slots to maximize utilization.</p>
              <div className="feature-tags">
                <span className="feature-tag">In-message CTA</span>
                <span className="feature-tag">Slot optimization</span>
                <span className="feature-tag">Auto-backfill</span>
                <span className="feature-tag">Confirmation flow</span>
              </div>
            </div>
            <div className="feature-card reveal">
              <div className="feature-icon">📊</div>
              <div className="feature-num">04</div>
              <h3>Doctor Slot Optimization</h3>
              <p>Admin dashboard identifies high-risk appointment windows, underutilized schedules, and calculates safe overbooking thresholds based on historical no-show probability.</p>
              <div className="feature-tags">
                <span className="feature-tag">Risk windows</span>
                <span className="feature-tag">Smart overbooking</span>
                <span className="feature-tag">Utilization heatmap</span>
                <span className="feature-tag">Idle slot alerts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <section id="wireframes" className="section">
        <div className="section-inner">
          <div className="section-label reveal">Product Design</div>
          <h2 className="section-h2 reveal">Screen <em>Wireframes</em></h2>
          <div className="wireframe-grid">

            {/* Screen 1: Patient Dashboard */}
            <div className="wireframe-card reveal">
              <div className="wireframe-screen">
                <div className="wf-bar"><div className="wf-dot"></div><div className="wf-dot"></div><div className="wf-dot"></div></div>
                <div className="wf-kpi-row">
                  <div className="wf-kpi"><div className="wf-kpi-num">3</div><div className="wf-kpi-lbl">Upcoming</div></div>
                  <div className="wf-kpi"><div className="wf-kpi-num" style={{ color: '#38a169' }}>✓ 12</div><div className="wf-kpi-lbl">Attended</div></div>
                  <div className="wf-kpi"><div className="wf-kpi-num" style={{ color: '#e53e3e' }}>✗ 1</div><div className="wf-kpi-lbl">Missed</div></div>
                </div>
                <div style={{ background: '#e2e8f0', borderRadius: '4px', padding: '0.5rem', marginBottom: '0.5rem' }}>
                  <div className="wf-row"><div className="wf-block teal" style={{ flex: 0.4, height: '10px' }}></div><div className="wf-block sm" style={{ flex: 1 }}></div><div className="wf-block teal" style={{ flex: 0.3, height: '20px', borderRadius: '3px' }}></div></div>
                </div>
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '4px', padding: '0.4rem', marginBottom: '0.4rem' }}>
                  <div className="wf-row"><div className="wf-block green" style={{ flex: 0.3, height: '8px' }}></div><div className="wf-block sm"></div></div>
                </div>
                <div style={{ background: '#fef9c3', border: '1px solid #fef08a', borderRadius: '4px', padding: '0.4rem', marginBottom: '0.4rem' }}>
                  <div className="wf-row"><div className="wf-block" style={{ background: '#ca8a04', opacity: 0.4, flex: 0.3, height: '8px' }}></div><div className="wf-block sm"></div></div>
                </div>
                <div className="wf-row" style={{ marginTop: '0.6rem' }}>
                  <div className="wf-block teal lg" style={{ borderRadius: '4px', height: '24px' }}></div>
                  <div className="wf-block lg" style={{ borderRadius: '4px', height: '24px', background: '#e2e8f0' }}></div>
                </div>
              </div>
              <div className="wf-meta">
                <div className="wf-screen-title">01 · Patient Dashboard</div>
                <div className="wf-screen-desc">Central hub for appointment management, reminders, and history tracking.</div>
                <div className="wf-feature-list">
                  <span className="wf-feat">Upcoming appointments</span>
                  <span className="wf-feat">Reschedule CTA</span>
                  <span className="wf-feat">Reminder settings</span>
                  <span className="wf-feat">History</span>
                </div>
              </div>
            </div>

            {/* Screen 2: AI Risk Dashboard */}
            <div className="wireframe-card reveal">
              <div className="wireframe-screen">
                <div className="wf-bar"><div className="wf-dot"></div><div className="wf-dot"></div><div className="wf-dot"></div></div>
                <div style={{ fontSize: '0.55rem', fontFamily: "'IBM Plex Mono', monospace", color: '#64748b', marginBottom: '0.5rem', letterSpacing: '0.08em' }}>AI RISK DASHBOARD</div>
                <div className="wf-kpi-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <div className="wf-kpi"><div className="wf-kpi-num" style={{ color: '#e53e3e' }}>15%</div><div className="wf-kpi-lbl">No-Show Rate</div></div>
                  <div className="wf-kpi"><div className="wf-kpi-num" style={{ color: '#38a169' }}>68%</div><div className="wf-kpi-lbl">Engagement</div></div>
                </div>
                <div className="wf-table-header"><div className="wf-th"></div><div className="wf-th"></div><div className="wf-th"></div><div className="wf-th"></div></div>
                <div className="wf-tr"><div className="wf-td text"></div><div className="wf-td badge-red"></div><div className="wf-td text"></div><div className="wf-td text"></div></div>
                <div className="wf-tr"><div className="wf-td text"></div><div className="wf-td badge-amber"></div><div className="wf-td text"></div><div className="wf-td text"></div></div>
                <div className="wf-tr"><div className="wf-td text"></div><div className="wf-td badge-green"></div><div className="wf-td text"></div><div className="wf-td text"></div></div>
                <div className="wf-tr"><div className="wf-td text"></div><div className="wf-td badge-red"></div><div className="wf-td text"></div><div className="wf-td text"></div></div>
                <div className="wf-heatmap" style={{ marginTop: '0.6rem' }}>
                  <div className="wf-hm-cell" style={{ background: 'rgba(229,62,62,0.7)' }}></div>
                  <div className="wf-hm-cell" style={{ background: 'rgba(229,62,62,0.4)' }}></div>
                  <div className="wf-hm-cell" style={{ background: 'rgba(217,119,6,0.5)' }}></div>
                  <div className="wf-hm-cell" style={{ background: 'rgba(56,161,105,0.5)' }}></div>
                  <div className="wf-hm-cell" style={{ background: 'rgba(56,161,105,0.7)' }}></div>
                  <div className="wf-hm-cell" style={{ background: 'rgba(229,62,62,0.3)' }}></div>
                  <div className="wf-hm-cell" style={{ background: 'rgba(56,161,105,0.4)' }}></div>
                </div>
              </div>
              <div className="wf-meta">
                <div className="wf-screen-title">02 · AI Risk Dashboard</div>
                <div className="wf-screen-desc">Operations view with patient risk scores, heatmaps, and engagement metrics.</div>
                <div className="wf-feature-list">
                  <span className="wf-feat">Risk scores</span>
                  <span className="wf-feat">High-risk list</span>
                  <span className="wf-feat">Heatmap</span>
                  <span className="wf-feat">Trend charts</span>
                </div>
              </div>
            </div>

            {/* Screen 3: Doctor Utilization */}
            <div className="wireframe-card reveal">
              <div className="wireframe-screen">
                <div className="wf-bar"><div className="wf-dot"></div><div className="wf-dot"></div><div className="wf-dot"></div></div>
                <div style={{ fontSize: '0.55rem', fontFamily: "'IBM Plex Mono', monospace", color: '#64748b', marginBottom: '0.5rem', letterSpacing: '0.08em' }}>DOCTOR UTILIZATION</div>
                <div className="wf-kpi-row">
                  <div className="wf-kpi"><div className="wf-kpi-num">87%</div><div className="wf-kpi-lbl">Utilization</div></div>
                  <div className="wf-kpi"><div className="wf-kpi-num" style={{ color: '#e53e3e' }}>4</div><div className="wf-kpi-lbl">Idle Slots</div></div>
                  <div className="wf-kpi"><div className="wf-kpi-num" style={{ color: '#38a169' }}>71%</div><div className="wf-kpi-lbl">Attendance</div></div>
                </div>
                <div style={{ fontSize: '0.5rem', fontFamily: "'IBM Plex Mono', monospace", color: '#94a3b8', margin: '0.5rem 0 0.3rem', letterSpacing: '0.08em' }}>WEEKLY HEATMAP</div>
                <div className="wf-heatmap" style={{ gridTemplateColumns: 'repeat(7,1fr)' }}>
                  <div className="wf-hm-cell" style={{ background: 'rgba(229,62,62,0.7)' }}></div>
                  <div className="wf-hm-cell" style={{ background: 'rgba(56,161,105,0.7)' }}></div>
                  <div className="wf-hm-cell" style={{ background: 'rgba(56,161,105,0.5)' }}></div>
                  <div className="wf-hm-cell" style={{ background: 'rgba(217,119,6,0.5)' }}></div>
                  <div className="wf-hm-cell" style={{ background: 'rgba(56,161,105,0.8)' }}></div>
                  <div className="wf-hm-cell" style={{ background: 'rgba(229,62,62,0.4)' }}></div>
                  <div className="wf-hm-cell" style={{ background: 'rgba(56,161,105,0.3)' }}></div>
                  <div className="wf-hm-cell" style={{ background: 'rgba(56,161,105,0.6)' }}></div>
                  <div className="wf-hm-cell" style={{ background: 'rgba(229,62,62,0.5)' }}></div>
                  <div className="wf-hm-cell" style={{ background: 'rgba(56,161,105,0.4)' }}></div>
                  <div className="wf-hm-cell" style={{ background: 'rgba(56,161,105,0.9)' }}></div>
                  <div className="wf-hm-cell" style={{ background: 'rgba(217,119,6,0.3)' }}></div>
                  <div className="wf-hm-cell" style={{ background: 'rgba(229,62,62,0.6)' }}></div>
                  <div className="wf-hm-cell" style={{ background: 'rgba(56,161,105,0.5)' }}></div>
                </div>
                <div style={{ marginTop: '0.6rem' }}>
                  <div className="wf-row"><div className="wf-block teal lg" style={{ flex: 0.7, height: '18px', borderRadius: '3px' }}></div><div className="wf-block" style={{ flex: 0.3, height: '18px', background: '#fee2e2', borderRadius: '3px' }}></div></div>
                </div>
              </div>
              <div className="wf-meta">
                <div className="wf-screen-title">03 · Doctor Utilization</div>
                <div className="wf-screen-desc">Slot occupancy, idle analysis, and attendance heatmap for schedule optimization.</div>
                <div className="wf-feature-list">
                  <span className="wf-feat">Utilization %</span>
                  <span className="wf-feat">Idle alerts</span>
                  <span className="wf-feat">Daily heatmap</span>
                  <span className="wf-feat">Overbooking</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="divider"></div>

      <section id="dashboard" className="section alt-bg">
        <div className="section-inner">
          <div className="section-label reveal">Analytics Dashboard</div>
          <h2 className="section-h2 reveal">Power BI <em>Dashboard</em></h2>
          <Dashboard />
        </div>
      </section>

      <div className="divider"></div>

      <section id="prd" className="section">
        <div className="section-inner">
          <div className="section-label reveal">Documentation</div>
          <h2 className="section-h2 reveal">Product Requirements <em>Document</em></h2>
          <div className="prd-wrap reveal">
            <div className="prd-header">
              <div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>PRD · v1.2 · FINAL</div>
                <div className="prd-doc-title">Smart Healthcare Appointment Optimization Platform</div>
                <div className="prd-doc-sub">Author: Manish Sahani · BA / APM &nbsp;|&nbsp; Stakeholders: Product, Engineering, Data, Ops</div>
                <div className="prd-meta-chips">
                  <span className="prd-chip">16 Weeks</span>
                  <span className="prd-chip">Healthcare · Digital Health</span>
                  <span className="prd-chip">AI-Powered</span>
                  <span className="prd-chip">1M+ Appointments</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)' }}>STATUS</div>
                <div style={{ display: 'inline-block', background: '#14a085', color: '#fff', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.68rem', padding: '0.3rem 0.8rem', borderRadius: '2rem', marginTop: '0.3rem' }}>✓ Approved</div>
              </div>
            </div>
            <div className="prd-body">
              <div className="prd-section">
                <div className="prd-section-title">Functional Requirements</div>
                <table className="prd-table">
                  <thead><tr><th>ID</th><th>Requirement</th><th>Priority</th></tr></thead>
                  <tbody>
                    <tr><td>FR-1</td><td>Predict patient no-show probability using ML</td><td><span className="status-badge status-must">Must Have</span></td></tr>
                    <tr><td>FR-2</td><td>Send personalized multi-channel reminders</td><td><span className="status-badge status-must">Must Have</span></td></tr>
                    <tr><td>FR-3</td><td>Enable one-click rescheduling from reminder</td><td><span className="status-badge status-must">Must Have</span></td></tr>
                    <tr><td>FR-4</td><td>Provide admin analytics & risk dashboard</td><td><span className="status-badge status-high">High</span></td></tr>
                    <tr><td>FR-5</td><td>Generate doctor utilization insights</td><td><span className="status-badge status-high">High</span></td></tr>
                    <tr><td>FR-6</td><td>Caregiver notification for elderly patients</td><td><span className="status-badge status-med">Medium</span></td></tr>
                  </tbody>
                </table>
              </div>
              <div className="prd-section">
                <div className="prd-section-title">Non-Functional Requirements</div>
                <table className="prd-table">
                  <thead><tr><th>Requirement</th><th>Target SLA</th></tr></thead>
                  <tbody>
                    <tr><td>System Availability</td><td>99.9% uptime</td></tr>
                    <tr><td>Notification Latency</td><td>&lt; 5 seconds</td></tr>
                    <tr><td>Dashboard Load Time</td><td>&lt; 3 seconds</td></tr>
                    <tr><td>Scalability</td><td>1M+ appointments</td></tr>
                    <tr><td>Data Security</td><td>HIPAA compliant</td></tr>
                    <tr><td>API Response Time</td><td>&lt; 200ms</td></tr>
                  </tbody>
                </table>
                <div style={{ marginTop: '1.5rem' }}>
                  <div className="prd-section-title">KPI Targets</div>
                  <table className="prd-table">
                    <thead><tr><th>Metric</th><th>Before</th><th>Target</th></tr></thead>
                    <tbody>
                      <tr><td>No-Show Rate</td><td>28%</td><td>≤ 15%</td></tr>
                      <tr><td>Attendance Rate</td><td>52%</td><td>≥ 70%</td></tr>
                      <tr><td>Engagement Rate</td><td>40%</td><td>≥ 68%</td></tr>
                      <tr><td>Doctor Idle Time</td><td>High</td><td>−25%</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <section id="roadmap" className="section alt-bg">
        <div className="section-inner">
          <div className="section-label reveal">Execution Plan</div>
          <h2 className="section-h2 reveal">Product <em>Roadmap</em></h2>
          <div className="roadmap-wrap">
            <div className="roadmap-line"></div>
            <div className="roadmap-phases">
              <div className="phase-card reveal">
                <div style={{ padding: '1rem', textAlign: 'center', paddingBottom: 0 }}>
                  <div className="phase-dot"></div>
                </div>
                <div className="phase-header">
                  <div className="phase-num">Phase 1</div>
                  <div className="phase-title">Discovery & Research</div>
                  <div className="phase-weeks">Weeks 1–2</div>
                </div>
                <div className="phase-body">
                  <ul className="phase-tasks">
                    <li>Stakeholder interviews</li>
                    <li>KPI definition</li>
                    <li>Workflow analysis</li>
                    <li>User journey mapping</li>
                    <li>Competitive landscape</li>
                  </ul>
                </div>
              </div>
              <div className="phase-card reveal">
                <div style={{ padding: '1rem', textAlign: 'center', paddingBottom: 0 }}>
                  <div className="phase-dot"></div>
                </div>
                <div className="phase-header">
                  <div className="phase-num">Phase 2</div>
                  <div className="phase-title">Product Design</div>
                  <div className="phase-weeks">Weeks 3–5</div>
                </div>
                <div className="phase-body">
                  <ul className="phase-tasks">
                    <li>Wireframe creation</li>
                    <li>PRD finalization</li>
                    <li>Persona development</li>
                    <li>Dashboard planning</li>
                    <li>Requirement sign-off</li>
                  </ul>
                </div>
              </div>
              <div className="phase-card reveal">
                <div style={{ padding: '1rem', textAlign: 'center', paddingBottom: 0 }}>
                  <div className="phase-dot"></div>
                </div>
                <div className="phase-header">
                  <div className="phase-num">Phase 3</div>
                  <div className="phase-title">Development</div>
                  <div className="phase-weeks">Weeks 6–10</div>
                </div>
                <div className="phase-body">
                  <ul className="phase-tasks">
                    <li>AI model integration</li>
                    <li>Notification workflows</li>
                    <li>Power BI dashboards</li>
                    <li>SQL analysis pipelines</li>
                    <li>API integrations</li>
                  </ul>
                </div>
              </div>
              <div className="phase-card reveal">
                <div style={{ padding: '1rem', textAlign: 'center', paddingBottom: 0 }}>
                  <div className="phase-dot"></div>
                </div>
                <div className="phase-header">
                  <div className="phase-num">Phase 4</div>
                  <div className="phase-title">Testing & UAT</div>
                  <div className="phase-weeks">Weeks 11–13</div>
                </div>
                <div className="phase-body">
                  <ul className="phase-tasks">
                    <li>Functional testing</li>
                    <li>A/B test execution</li>
                    <li>UAT with stakeholders</li>
                    <li>Defect resolution</li>
                    <li>API validation</li>
                  </ul>
                </div>
              </div>
              <div className="phase-card reveal">
                <div style={{ padding: '1rem', textAlign: 'center', paddingBottom: 0 }}>
                  <div className="phase-dot"></div>
                </div>
                <div className="phase-header">
                  <div className="phase-num">Phase 5</div>
                  <div className="phase-title">Launch & Optimize</div>
                  <div className="phase-weeks">Weeks 14–16</div>
                </div>
                <div className="phase-body">
                  <ul className="phase-tasks">
                    <li>Production rollout</li>
                    <li>KPI monitoring</li>
                    <li>Performance tuning</li>
                    <li>Feedback loops</li>
                    <li>Product iteration</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <section className="section">
        <div className="section-inner">
          <div className="section-label reveal">Tech Stack</div>
          <h2 className="section-h2 reveal">Tools & <em>Technologies</em></h2>
          <div className="tools-grid">
            <div className="tool-card reveal"><div className="tool-icon">🗄️</div><div><div className="tool-cat">Analytics</div><div className="tool-name">SQL + Excel</div></div></div>
            <div className="tool-card reveal"><div className="tool-icon">⚡</div><div><div className="tool-cat">Dashboarding</div><div className="tool-name">Power BI</div></div></div>
            <div className="tool-card reveal"><div className="tool-icon">📋</div><div><div className="tool-cat">Project Mgmt</div><div className="tool-name">JIRA + Confluence</div></div></div>
            <div className="tool-card reveal"><div className="tool-icon">🔌</div><div><div className="tool-cat">API Testing</div><div className="tool-name">Postman</div></div></div>
            <div className="tool-card reveal"><div className="tool-icon">🤖</div><div><div className="tool-cat">AI Tools</div><div className="tool-name">ChatGPT + Prompt Eng.</div></div></div>
            <div className="tool-card reveal"><div className="tool-icon">🔄</div><div><div className="tool-cat">Methodology</div><div className="tool-name">Agile / Scrum</div></div></div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <section id="impact" className="section" style={{ background: 'var(--navy)', padding: '5rem 4rem' }}>
        <div className="section-inner">
          <div className="section-label reveal" style={{ color: 'var(--teal2)' }}>Measurable Results</div>
          <h2 className="section-h2 reveal" style={{ color: '#fff' }}>Business <em>Impact</em></h2>
          <div className="impact-grid">
            <div className="impact-card reveal">
              <div className="impact-before">Before: 28%</div>
              <div className="impact-arrow-icon">📉</div>
              <div className="impact-after">15%</div>
              <div className="impact-label">No-Show Rate</div>
              <div className="impact-trend">↓ 46% relative reduction</div>
            </div>
            <div className="impact-card reveal">
              <div className="impact-before">Before: 52%</div>
              <div className="impact-arrow-icon">📈</div>
              <div className="impact-after">71%</div>
              <div className="impact-label">Attendance Rate</div>
              <div className="impact-trend">↑ +19 percentage points</div>
            </div>
            <div className="impact-card reveal">
              <div className="impact-before">Before: 40%</div>
              <div className="impact-arrow-icon">💬</div>
              <div className="impact-after">68%</div>
              <div className="impact-label">Engagement Rate</div>
              <div className="impact-trend">↑ +28 percentage points</div>
            </div>
            <div className="impact-card reveal">
              <div className="impact-before">Before: High idle time</div>
              <div className="impact-arrow-icon">⏱️</div>
              <div className="impact-after">−25%</div>
              <div className="impact-label">Doctor Idle Time</div>
              <div className="impact-trend">↑ Better slot utilization</div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <section className="section alt-bg">
        <div className="section-inner">
          <div className="section-label reveal">Next Steps</div>
          <h2 className="section-h2 reveal">Future <em>Enhancements</em></h2>
          <div className="future-grid">
            <div className="future-card reveal"><div className="future-icon">🤖</div><div className="future-title">AI Chatbot Assistant</div><div className="future-desc">Conversational AI to answer patient questions, confirm appointments, and guide rescheduling 24/7.</div></div>
            <div className="future-card reveal"><div className="future-icon">📊</div><div className="future-title">Patient Churn Prediction</div><div className="future-desc">Predictive model to identify patients at risk of disengaging from care plans before it happens.</div></div>
            <div className="future-card reveal"><div className="future-icon">🔮</div><div className="future-title">Dynamic Scheduling AI</div><div className="future-desc">Real-time appointment optimization that auto-adjusts slots based on risk scores and doctor capacity.</div></div>
            <div className="future-card reveal"><div className="future-icon">🎙️</div><div className="future-title">Voice Reminders</div><div className="future-desc">IVR and voice assistant reminders for elderly patients with low digital literacy.</div></div>
            <div className="future-card reveal"><div className="future-icon">🏥</div><div className="future-title">Insurance Integration</div><div className="future-desc">Eligibility verification and pre-auth checks embedded directly in the appointment flow.</div></div>
            <div className="future-card reveal"><div className="future-icon">⚡</div><div className="future-title">Real-Time Scoring</div><div className="future-desc">Live patient engagement scoring that updates risk tiers as patients interact with reminders.</div></div>
          </div>
        </div>
      </section>

      <footer>
        <p>Case Study by <span>Manish Sahani</span></p>
        <p style={{ marginTop: '0.4rem' }}>Business Analyst &nbsp;·&nbsp; Product Analyst &nbsp;·&nbsp; Associate Product Manager</p>
        <p style={{ marginTop: '0.4rem' }}>sahanimanish3@gmail.com &nbsp;·&nbsp; +91 9579274394 &nbsp;·&nbsp; Nagpur, MH, India</p>
      </footer>
    </>
  );
}
