// sim-coach.jsx — Scenario Simulator + AI Coach
// Donut + line-range chart, sliders, scenario chips, coach chat.

const { useState: useStateSC, useMemo, useRef: useRefSC, useEffect: useEffectSC } = React;

/* ---- scenario presets: drive sliders + allocation ---- */
const SCENARIOS = {
  steady:      { monthly: 200, years: 15, risk: 1, alloc: [55, 35, 10] },
  dip:         { monthly: 200, years: 10, risk: 2, alloc: [70, 22, 8] },
  recession:   { monthly: 150, years: 20, risk: 0, alloc: [40, 45, 15] },
  long:        { monthly: 250, years: 30, risk: 2, alloc: [80, 16, 4] },
  diversified: { monthly: 200, years: 20, risk: 1, alloc: [60, 30, 10] },
};
const RISK_RETURN = [0.035, 0.055, 0.075]; // conservative / balanced / growth (nominal, illustrative)

function projectBand(monthly, years, risk) {
  const base = RISK_RETURN[risk];
  const spread = [0.02, 0.03, 0.04][risk];
  const make = (rate) => {
    const pts = [];
    for (let y = 0; y <= years; y++) {
      const m = y * 12;
      // future value of a monthly contribution annuity
      const r = rate / 12;
      const fv = r === 0 ? monthly * m : monthly * ((Math.pow(1 + r, m) - 1) / r);
      pts.push(fv);
    }
    return pts;
  };
  return { low: make(base - spread), mid: make(base), high: make(base + spread), contributed: monthly * 12 * years };
}

/* ============================================================
   SIMULATOR
   ============================================================ */
function SimulatorScreen({ t, go, lang }) {
  const rtl = I18N[lang]._dir === 'rtl';
  const [scenario, setScenario] = useStateSC('diversified');
  const [monthly, setMonthly] = useStateSC(200);
  const [years, setYears] = useStateSC(20);
  const [risk, setRisk] = useStateSC(1);

  const applyScenario = (key) => {
    setScenario(key); const s = SCENARIOS[key];
    setMonthly(s.monthly); setYears(s.years); setRisk(s.risk);
  };

  const alloc = useMemo(() => {
    // shift allocation by risk while keeping scenario flavor
    const base = SCENARIOS[scenario].alloc;
    const shift = (risk - 1) * 12;
    let stocks = Math.max(20, Math.min(90, base[0] + shift));
    let cash = Math.max(4, base[2] - Math.round(shift / 3));
    let bonds = 100 - stocks - cash;
    return [stocks, bonds, cash];
  }, [scenario, risk]);

  const band = useMemo(() => projectBand(monthly, years, risk), [monthly, years, risk]);
  const riskLabels = [t.riskLow, t.riskMid, t.riskHigh];

  const scenarioChips = [
    { id: 'steady', label: t.sc_steady, icon: 'coins' },
    { id: 'dip', label: t.sc_dip, icon: 'sim' },
    { id: 'recession', label: t.sc_recession, icon: 'clock' },
    { id: 'long', label: t.sc_long, icon: 'leaf' },
    { id: 'diversified', label: t.sc_diversified, icon: 'target' },
  ];

  return (
    <ScreenScroll>
      <h1 className="t-h1">{t.simTitle}</h1>
      <p className="t-sm text-2" style={{ marginTop: 4, marginBottom: 16 }}>{t.simSubtitle}</p>

      {/* scenario chips */}
      <p className="t-micro text-3" style={{ marginBottom: 10 }}>{t.pickScenario}</p>
      <div className="bursa-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', margin: '0 -20px 18px', padding: '0 20px' }}>
        {scenarioChips.map(c => (
          <Chip key={c.id} label={c.label} icon={c.icon} selected={scenario === c.id} onClick={() => applyScenario(c.id)} />
        ))}
      </div>

      {/* sliders */}
      <Card style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 16 }}>
        <Slider label={t.monthly} value={monthly} min={50} max={500} step={10} rtl={rtl}
          format={(v) => `${v}`} rightLabel="pts" ticks={[50, 200, 350, 500]} onChange={setMonthly} />
        <Slider label={t.horizon} value={years} min={5} max={35} step={1} rtl={rtl}
          format={(v) => `${v}`} rightLabel={t.years} ticks={[5, 15, 25, 35]} onChange={setYears} />
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <span className="t-sm" style={{ color: 'var(--text-2)', fontWeight: 600 }}>{t.risk}</span>
            <span className="t-h3" style={{ color: 'var(--accent)', fontWeight: 700 }}>{riskLabels[risk]}</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {riskLabels.map((rl, i) => (
              <button key={i} onClick={() => setRisk(i)} className="focusable"
                style={{ flex: 1, height: 44, borderRadius: 'var(--r-sm)', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700,
                  background: risk === i ? 'var(--accent)' : 'var(--surface-2)', color: risk === i ? 'var(--on-accent)' : 'var(--text-2)',
                  border: `1px solid ${risk === i ? 'transparent' : 'var(--border)'}`, transition: 'all var(--dur-base)' }}>{rl}</button>
            ))}
          </div>
        </div>
      </Card>

      {/* allocation donut */}
      <Card style={{ marginBottom: 16 }}>
        <p className="t-h3" style={{ marginBottom: 16 }}>{t.allocation}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <AllocationDonut alloc={alloc} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[{ l: t.stocks, c: 'var(--accent)' }, { l: t.bonds, c: 'var(--info)' }, { l: t.cash, c: 'var(--surface-3)' }].map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 12, height: 12, borderRadius: 4, background: row.c, flex: 'none', border: i === 2 ? '1px solid var(--border-strong)' : 'none' }} />
                <span className="t-sm" style={{ flex: 1, fontWeight: 600 }}>{row.l}</span>
                <span className="t-sm t-mono" style={{ fontWeight: 700 }}>{alloc[i]}%</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* projection range chart */}
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <p className="t-h3">{t.projection}</p>
        </div>
        <RangeChart band={band} years={years} rtl={rtl} t={t} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 14 }}>
          <LegendDot c="var(--accent)" label={t.expected} />
          <LegendDot c="var(--accent-ring)" label={`${t.optimistic} / ${t.pessimistic}`} band />
        </div>
        <p className="t-cap text-3" style={{ marginTop: 10 }}>{t.rangeNote}</p>
      </Card>

      {/* disclaimer + cta */}
      <SafetyNote>{t.disclaimer}</SafetyNote>
      <div style={{ marginTop: 14 }}>
        <Button size="lg" fullWidth variant="secondary" iconR="coach" onClick={() => go('coach', { topic: 'dip' })}>{t.askCoach}</Button>
      </div>
    </ScreenScroll>
  );
}

function LegendDot({ c, label, band }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
      <span style={{ width: 14, height: band ? 10 : 4, borderRadius: band ? 3 : 999, background: c, opacity: band ? 0.5 : 1 }} />
      <span className="t-cap text-2" style={{ fontWeight: 600 }}>{label}</span>
    </span>
  );
}

/* ---- Allocation donut (SVG) ---- */
function AllocationDonut({ alloc, size = 116 }) {
  const colors = ['var(--accent)', 'var(--info)', 'var(--surface-3)'];
  const r = (size - 16) / 2, cx = size / 2, cy = size / 2, circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div style={{ position: 'relative', width: size, height: size, flex: 'none' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {alloc.map((v, i) => {
          const len = (v / 100) * circ;
          const seg = (
            <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={colors[i]} strokeWidth={14}
              strokeDasharray={`${len} ${circ - len}`} strokeDashoffset={-offset}
              style={{ transition: 'stroke-dasharray 500ms var(--ease-out), stroke-dashoffset 500ms var(--ease-out)' }} />
          );
          offset += len; return seg;
        })}
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div>
          <p className="t-mono" style={{ fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{alloc[0]}%</p>
          <p className="t-micro text-3">stocks</p>
        </div>
      </div>
    </div>
  );
}

/* ---- Range line chart (SVG) ---- */
function RangeChart({ band, years, rtl, t }) {
  const W = 280, H = 130, padB = 18, padT = 8;
  const max = Math.max(...band.high);
  const n = band.mid.length;
  const x = (i) => {
    const p = i / (n - 1);
    return (rtl ? (1 - p) : p) * W;
  };
  const y = (v) => padT + (1 - v / max) * (H - padB - padT);
  const line = (arr) => arr.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
  const area = `M ${x(0)} ${y(band.high[0])} ` +
    band.high.map((v, i) => `L ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ') +
    ` L ${x(n-1)} ${y(band.low[n-1])} ` +
    [...band.low].reverse().map((v, i) => `L ${x(n-1-i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ') + ' Z';
  const fmt = (v) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : `${Math.round(v)}`;
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 150, display: 'block', direction: 'ltr' }}>
        <defs>
          <linearGradient id="rcband" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.34"/>
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.04"/>
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((g, i) => (
          <line key={i} x1="0" x2={W} y1={padT + g * (H - padB - padT)} y2={padT + g * (H - padB - padT)} stroke="var(--border)" strokeWidth="1" />
        ))}
        <path d={area} fill="url(#rcband)" />
        <path d={line(band.high)} stroke="var(--accent-ring)" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
        <path d={line(band.low)} stroke="var(--accent-ring)" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
        <path d={line(band.mid)} stroke="var(--accent)" strokeWidth="3" fill="none" strokeLinecap="round"
          style={{ transition: 'all 400ms var(--ease-out)' }} />
        <circle cx={x(n-1)} cy={y(band.mid[n-1])} r="4.5" fill="var(--accent)" stroke="var(--surface)" strokeWidth="2" />
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        <span className="t-cap text-3 t-mono">{fmt(band.contributed)} {t.stocks ? '' : ''}contributed</span>
        <span className="t-cap text-accent t-mono" style={{ fontWeight: 700 }}>~{fmt(band.mid[band.mid.length-1])} {t.expected.toLowerCase()}</span>
      </div>
    </div>
  );
}

/* ============================================================
   AI COACH — chat
   ============================================================ */
function CoachScreen({ t, go, lang, entryTopic }) {
  const answers = { div: t.coachAnswerDiv, dip: t.coachAnswerDip, comp: t.coachAnswerComp };
  const [thread, setThread] = useStateSC([{ from: 'coach', text: t.coachGreeting }]);
  const scrollRef = useRefSC(null);
  const suggestions = [
    { q: t.suggest1, key: 'div' },
    { q: t.suggest2, key: 'dip' },
    { q: t.suggest3, key: 'comp' },
  ];
  const [used, setUsed] = useStateSC([]);

  const ask = (s) => {
    setThread(prev => [...prev, { from: 'user', text: s.q }]);
    setUsed(prev => [...prev, s.key]);
    setTimeout(() => setThread(prev => [...prev, { from: 'coach', text: answers[s.key], anim: true }]), 480);
  };

  useEffectSC(() => {
    if (entryTopic && !used.includes(entryTopic)) {
      const s = suggestions.find(x => x.key === entryTopic);
      if (s) ask(s);
    }
  // eslint-disable-next-line
  }, []);

  useEffectSC(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [thread]);

  const remaining = suggestions.filter(s => !used.includes(s.key));

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      {/* header */}
      <div style={{ flex: 'none', padding: '18px 20px 14px', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center', border: '1px solid var(--accent-ring)' }}><Icon name="spark" size={22} stroke={2} /></div>
          <div style={{ flex: 1 }}>
            <p className="t-h3">{t.coachTitle}</p>
            <p className="t-cap" style={{ color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--accent)' }} />{t.coachStatus}</p>
          </div>
        </div>
      </div>

      {/* thread */}
      <div ref={scrollRef} className="bursa-scroll" style={{ flex: 1, overflowY: 'auto', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SafetyNote>{t.coachSafety}</SafetyNote>
        {thread.map((m, i) => <CoachMessage key={i} from={m.from} animateIn={m.anim}>{m.text}</CoachMessage>)}
      </div>

      {/* suggestions + input */}
      <div style={{ flex: 'none', padding: '12px 16px 16px', borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
        {remaining.length > 0 && (
          <div className="bursa-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 12, paddingBottom: 2 }}>
            {remaining.map((s, i) => (
              <button key={i} onClick={() => ask(s)} className="focusable"
                style={{ flex: 'none', height: 38, padding: '0 14px', borderRadius: 'var(--r-full)', cursor: 'pointer', whiteSpace: 'nowrap',
                  background: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid var(--accent-ring)', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600 }}>{s.q}</button>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 48, padding: '0 6px 0 16px', borderRadius: 'var(--r-full)', background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
          <input placeholder={t.inputPlaceholder} readOnly
            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: 'var(--text)', fontFamily: 'var(--font-sans)', fontSize: 14 }} />
          <button className="focusable" style={{ width: 38, height: 38, borderRadius: '50%', flex: 'none', background: 'var(--accent)', color: 'var(--on-accent)', border: 'none', display: 'grid', placeItems: 'center', cursor: 'pointer' }}><Icon name="send" size={18} /></button>
        </div>
        <p className="t-micro text-3" style={{ textAlign: 'center', marginTop: 10 }}>{t.coachDisclaimer}</p>
      </div>
    </div>
  );
}

Object.assign(window, { SimulatorScreen, CoachScreen, AllocationDonut, RangeChart });
