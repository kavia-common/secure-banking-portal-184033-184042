import React from 'react';
import './layout.css';

// PUBLIC_INTERFACE
export function StatCard({ title, value, hint, accent = 'blue' }) {
  /** Small statistic card with accent border. */
  const accentColor = accent === 'amber' ? '#F59E0B' : '#2563EB';
  return (
    <div className="card" style={{ borderLeft: `4px solid ${accentColor}` }}>
      <div style={{ fontSize: 12, color: '#6B7280' }}>{title}</div>
      <div style={{ fontSize: 24, fontWeight: 700, marginTop: 6 }}>{value}</div>
      {hint && <div style={{ fontSize: 12, color: '#6B7280', marginTop: 6 }}>{hint}</div>}
    </div>
  );
}

// PUBLIC_INTERFACE
export function Panel({ title, children, right }) {
  /** Panel with header and body. */
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ fontWeight: 700 }}>{title}</div>
        <div>{right}</div>
      </div>
      <div>{children}</div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function Input({ label, ...props }) {
  /** Labeled input control. */
  return (
    <label style={{ display: 'grid', gap: 6 }}>
      <span style={{ fontSize: 12, color: '#6B7280' }}>{label}</span>
      <input className="input" {...props} />
    </label>
  );
}

// PUBLIC_INTERFACE
export function Select({ label, children, ...props }) {
  /** Labeled select control. */
  return (
    <label style={{ display: 'grid', gap: 6 }}>
      <span style={{ fontSize: 12, color: '#6B7280' }}>{label}</span>
      <select className="select" {...props}>
        {children}
      </select>
    </label>
  );
}

// PUBLIC_INTERFACE
export function Table({ columns, data, keyField }) {
  /** Minimal table with columns [{key, header, render?}]. */
  return (
    <div className="card">
      <table className="table">
        <thead>
          <tr>
            {columns.map((c) => <th key={c.key}>{c.header}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row[keyField]}>
              {columns.map((c) => (
                <td key={c.key}>
                  {c.render ? c.render(row[c.key], row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// PUBLIC_INTERFACE
export function MiniBarChart({ data, height = 140, color = '#2563EB' }) {
  /** Simple SVG bar chart: data [{label, value}]. */
  if (!data || data.length === 0) return <div className="card">No data</div>;
  const max = Math.max(...data.map((d) => d.value)) || 1;
  const width = 24 * data.length + 20;
  const barWidth = 16;
  const gap = 8;
  const padTop = 10;
  const padBottom = 26;

  return (
    <div className="card">
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Monthly spend bar chart">
        {data.map((d, i) => {
          const barHeight = ((d.value / max) * (height - padTop - padBottom));
          const x = 10 + i * (barWidth + gap);
          const y = height - padBottom - barHeight;
          return (
            <g key={d.label}>
              <rect x={x} y={y} width={barWidth} height={barHeight} fill={color} rx="4" />
              <text x={x + barWidth / 2} y={height - 10} textAnchor="middle" fontSize="9" fill="#6B7280">
                {d.label.split(' ')[0]}
              </text>
            </g>
          );
        })}
        {/* Y axis baseline */}
        <line x1="8" y1={height - padBottom} x2={width - 8} y2={height - padBottom} stroke="#E5E7EB" />
      </svg>
    </div>
  );
}
