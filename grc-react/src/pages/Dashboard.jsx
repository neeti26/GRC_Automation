import { useEffect, useRef } from 'react';
import { Chart, ArcElement, DoughnutController, BarElement, BarController, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import Card, { CardTitle } from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import EmptyState from '../components/EmptyState';
import StatusBadge from '../components/StatusBadge';

Chart.register(ArcElement, DoughnutController, BarElement, BarController, CategoryScale, LinearScale, Tooltip, Legend);

function DonutChart({ id, data, colors, cutout = '75%' }) {
  const ref = useRef(null);
  const chartRef = useRef(null);
  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();
    chartRef.current = new Chart(ref.current, {
      type: 'doughnut',
      data: { datasets: [{ data, backgroundColor: colors, borderWidth: 0 }] },
      options: { cutout, plugins: { legend: { display: false }, tooltip: { enabled: false } }, animation: { duration: 600 } },
    });
    return () => chartRef.current?.destroy();
  }, []);
  return <canvas ref={ref} />;
}

function CloudBarChart() {
  const ref = useRef(null);
  const chartRef = useRef(null);
  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();
    chartRef.current = new Chart(ref.current, {
      type: 'bar',
      data: {
        labels: ['IAM', 'EC2', 'S3', 'RDS', 'SNS', 'CloudTrail'],
        datasets: [
          { label: 'OK', data: [28, 25, 8, 5, 3, 3], backgroundColor: '#22c55e' },
          { label: 'Needs Attention', data: [12, 10, 4, 3, 2, 2], backgroundColor: '#ef4444' },
        ],
      },
      options: {
        plugins: { legend: { display: false } },
        scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } },
        responsive: true, maintainAspectRatio: false,
      },
    });
    return () => chartRef.current?.destroy();
  }, []);
  return <canvas ref={ref} />;
}

export default function Dashboard({ onNav, showToast }) {
  const frameworks = [
    { name: 'ISO 27001:2022', pct: 60, color: 'var(--teal)' },
    { name: 'SOC 2', pct: 42, color: 'var(--teal)' },
    { name: 'MAS TRM 2021', pct: 31, color: 'var(--yellow)' },
  ];

  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        Dashboard
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <select style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid var(--gray-200)', background: '#fff', cursor: 'pointer', fontSize: 13, outline: 'none' }}>
            <option>All Entities</option>
            <option>Entity A</option>
            <option>Entity B</option>
          </select>
          <button onClick={() => showToast('Data refreshed')} style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid var(--gray-200)', background: '#fff', cursor: 'pointer', fontSize: 16, lineHeight: 1 }} title="Refresh">↻</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card>
          <CardTitle action={<span onClick={() => onNav('frameworks')} style={{ fontSize: 12, color: 'var(--teal)', cursor: 'pointer' }}>View Compliance Trend</span>}>
            Compliance Progress
          </CardTitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ position: 'relative', width: 140, height: 140, flexShrink: 0 }}>
              <DonutChart id="cDonut" data={[129, 165]} colors={['#22c55e', '#f59e0b']} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', pointerEvents: 'none' }}>
                <div style={{ fontSize: 20, fontWeight: 700 }}>43.7%</div>
                <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>Compliant</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}><div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />Compliant: 129</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}><div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />Non Compliant: 165</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 16, borderTop: '1px solid var(--gray-100)', paddingTop: 16 }}>
            {[{ label: 'Policies', pct: 100, val: 100, color: '#22c55e', page: 'policies' },
              { label: 'Evidence Tasks', pct: 6.3, val: 6.3, color: '#ef4444', page: 'evidence' },
              { label: 'Automated Tests', pct: 57, val: 57, color: '#f59e0b', page: 'tests' }].map(g => (
              <div key={g.label} onClick={() => onNav(g.page)} style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ position: 'relative', width: 64, height: 64, margin: '0 auto' }}>
                  <DonutChart data={[g.val, 100 - g.val]} colors={[g.color, '#e5e7eb']} cutout="70%" />
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>{g.pct}%</div>
                <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{g.label}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle>Jobs that need your attention</CardTitle>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            <StatusBadge status="compliant" onClick={() => onNav('policies')}>Policies 0</StatusBadge>
            <StatusBadge status="needs-attention" onClick={() => onNav('evidence')}>Evidence Tasks 132</StatusBadge>
            <StatusBadge status="in-progress" onClick={() => onNav('tests')}>Automated Tests 32</StatusBadge>
          </div>
          <EmptyState icon="🔍" title="All good here" />
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card>
          <CardTitle>Vulnerability Overview</CardTitle>
          <EmptyState
            icon="🔎"
            title="No vulnerabilities found!"
            desc="Connect your vulnerability scanner to reveal hidden threats."
            action={<span onClick={() => onNav('integrations')} style={{ color: 'var(--teal)', fontSize: 13, cursor: 'pointer' }}>Go To Integrations →</span>}
          />
        </Card>
        <Card>
          <CardTitle>Cloud Security Overview</CardTitle>
          <div style={{ marginBottom: 10 }}>
            <StatusBadge status="compliant">AWS</StatusBadge>
          </div>
          <div style={{ height: 170 }}><CloudBarChart /></div>
          <div style={{ display: 'flex', gap: 14, marginTop: 8, fontSize: 12 }}>
            <span><span style={{ display: 'inline-block', width: 10, height: 10, background: '#22c55e', borderRadius: 2, marginRight: 4 }} />OK</span>
            <span><span style={{ display: 'inline-block', width: 10, height: 10, background: '#ef4444', borderRadius: 2, marginRight: 4 }} />Needs Attention</span>
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card>
          <CardTitle action={<span onClick={() => onNav('frameworks')} style={{ fontSize: 12, color: 'var(--teal)', cursor: 'pointer' }}>View All</span>}>Frameworks</CardTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {frameworks.map(f => (
              <div key={f.name} onClick={() => onNav('frameworks')} style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span>{f.name}</span><span style={{ fontWeight: 600 }}>{f.pct}%</span>
                </div>
                <ProgressBar value={f.pct} color={f.color} />
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardTitle action={<span onClick={() => onNav('audit')} style={{ fontSize: 12, color: 'var(--teal)', cursor: 'pointer' }}>View Audit Calendar</span>}>Upcoming Audits</CardTitle>
          <EmptyState icon="📅" title="No upcoming audits" desc="Make sure audit dates are assigned to frameworks so the calendar gets populated." />
        </Card>
      </div>
    </div>
  );
}
