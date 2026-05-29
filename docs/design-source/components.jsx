// components.jsx — Bursapp component library
// Buttons, Cards, Chips, Sliders, ProgressRing, AdPlaceholder, CoachMessage, BottomNav, Icons.
// All consume design tokens from tokens.css. Exported to window at the bottom.

const { useState, useRef, useEffect, useCallback } = React;

/* ============================================================
   ICONS — 1.6px stroke, currentColor, 24 grid
   ============================================================ */
function Icon({ name, size = 22, stroke = 1.7, style }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    home: <><path {...p} d="M4 11.5 12 5l8 6.5"/><path {...p} d="M6 10.5V19h12v-8.5"/><path {...p} d="M10 19v-4h4v4"/></>,
    learn: <><path {...p} d="M4 6.5A2.5 2.5 0 0 1 6.5 4H12v15H6.5A2.5 2.5 0 0 0 4 21.5z"/><path {...p} d="M20 6.5A2.5 2.5 0 0 0 17.5 4H12v15h5.5a2.5 2.5 0 0 1 2.5 2.5z"/></>,
    sim: <><path {...p} d="M4 19V5"/><path {...p} d="M4 19h16"/><path {...p} d="m7 14 3.5-4 3 2.5L20 6"/></>,
    coach: <><path {...p} d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 3v-3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/><circle cx="9" cy="10.5" r="1" fill="currentColor" stroke="none"/><circle cx="12.5" cy="10.5" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="10.5" r="1" fill="currentColor" stroke="none"/></>,
    you: <><circle {...p} cx="12" cy="8" r="3.5"/><path {...p} d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6"/></>,
    arrowR: <><path {...p} d="M5 12h14"/><path {...p} d="m13 6 6 6-6 6"/></>,
    arrowL: <><path {...p} d="M19 12H5"/><path {...p} d="m11 6-6 6 6 6"/></>,
    check: <path {...p} d="m5 12.5 4.5 4.5L19 7"/>,
    lock: <><rect {...p} x="5" y="10" width="14" height="10" rx="2.5"/><path {...p} d="M8 10V7.5a4 4 0 0 1 8 0V10"/></>,
    spark: <><path {...p} d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path {...p} d="m6.3 6.3 2.4 2.4M15.3 15.3l2.4 2.4M17.7 6.3l-2.4 2.4M8.7 15.3l-2.4 2.4"/></>,
    flame: <path {...p} d="M12 3c1 3-1.5 4-1.5 6.5A2.5 2.5 0 0 0 13 12c.3-1.2 1-2 1-2 1.5 1.5 3 3.3 3 6a5 5 0 0 1-10 0c0-3.5 3-5 5-13z"/>,
    play: <path {...p} d="M8 5.5v13l11-6.5z" fill="currentColor"/>,
    bell: <><path {...p} d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z"/><path {...p} d="M10 19a2 2 0 0 0 4 0"/></>,
    send: <path {...p} d="M5 12 19 5l-4 14-3.5-5.5L5 12z"/>,
    info: <><circle {...p} cx="12" cy="12" r="8"/><path {...p} d="M12 11v5M12 8h.01"/></>,
    shield: <><path {...p} d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z"/><path {...p} d="m9 12 2 2 4-4"/></>,
    close: <path {...p} d="M6 6l12 12M18 6 6 18"/>,
    globe: <><circle {...p} cx="12" cy="12" r="8.5"/><path {...p} d="M3.5 12h17M12 3.5c2.5 2.4 2.5 14.6 0 17M12 3.5c-2.5 2.4-2.5 14.6 0 17"/></>,
    target: <><circle {...p} cx="12" cy="12" r="8"/><circle {...p} cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/></>,
    leaf: <><path {...p} d="M5 19c0-7 5-12 14-12 0 9-5 13-11 13-1.5 0-3-.5-3-.5z"/><path {...p} d="M9 15c2-2.5 4.5-4 7.5-5"/></>,
    coins: <><ellipse {...p} cx="9" cy="7" rx="5" ry="2.5"/><path {...p} d="M4 7v4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V7"/><path {...p} d="M4 11v4c0 1.4 2.2 2.5 5 2.5 1 0 2-.15 2.8-.4"/><ellipse {...p} cx="15" cy="15" rx="5" ry="2.5"/><path {...p} d="M10 15v2c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4"/></>,
    clock: <><circle {...p} cx="12" cy="12" r="8"/><path {...p} d="M12 8v4.5l3 2"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"
      style={{ display: 'block', flex: 'none', ...style }}>
      {paths[name]}
    </svg>
  );
}

/* ============================================================
   BUTTON — variants: primary | secondary | ghost | pill
   sizes: lg | md | sm   |  fullWidth
   ============================================================ */
function Button({ variant = 'primary', size = 'md', fullWidth, iconR, iconL, children, onClick, disabled, style }) {
  const [press, setPress] = useState(false);
  const sizes = {
    lg: { h: 54, px: 24, fs: 16, r: 'var(--r-md)', gap: 10 },
    md: { h: 46, px: 20, fs: 15, r: 'var(--r-sm)', gap: 8 },
    sm: { h: 38, px: 14, fs: 13.5, r: 'var(--r-xs)', gap: 6 },
  }[size];
  const variants = {
    primary: { background: 'var(--accent)', color: 'var(--on-accent)', border: '1px solid transparent', boxShadow: press ? 'none' : 'var(--shadow-accent)' },
    secondary: { background: 'var(--surface-2)', color: 'var(--text)', border: '1px solid var(--border-strong)' },
    ghost: { background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)' },
    pill: { background: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid var(--accent-ring)' },
  }[variant];
  return (
    <button className="focusable" onClick={onClick} disabled={disabled}
      onPointerDown={() => setPress(true)} onPointerUp={() => setPress(false)} onPointerLeave={() => setPress(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: sizes.gap,
        height: sizes.h, minHeight: 44, padding: `0 ${sizes.px}px`, width: fullWidth ? '100%' : 'auto',
        fontFamily: 'var(--font-sans)', fontSize: sizes.fs, fontWeight: 700, letterSpacing: '-0.01em',
        borderRadius: sizes.r, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1,
        transform: press ? 'scale(0.97)' : 'scale(1)',
        transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), background var(--dur-base)',
        ...variants, ...style,
      }}>
      {iconL && <Icon name={iconL} size={18} />}
      {children}
      {iconR && <Icon name={iconR} size={18} />}
    </button>
  );
}

/* ============================================================
   CARD — base surface container
   ============================================================ */
function Card({ children, pad = 'var(--sp-5)', elevated, interactive, onClick, accent, style }) {
  const [hover, setHover] = useState(false);
  return (
    <div onClick={onClick}
      onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}
      style={{
        background: 'var(--surface)', border: `1px solid ${accent ? 'var(--accent-ring)' : 'var(--border)'}`,
        borderRadius: 'var(--r-lg)', padding: pad,
        boxShadow: elevated ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        cursor: interactive ? 'pointer' : 'default',
        transform: interactive && hover ? 'translateY(-2px)' : 'none',
        transition: 'transform var(--dur-base) var(--ease-out), border-color var(--dur-base)',
        ...style,
      }}>
      {children}
    </div>
  );
}

/* ============================================================
   SCENARIO CHIP — selectable, with optional icon
   ============================================================ */
function Chip({ label, icon, selected, onClick, style }) {
  return (
    <button className="focusable" onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        height: 40, padding: '0 16px', minHeight: 40,
        borderRadius: 'var(--r-full)', cursor: 'pointer', whiteSpace: 'nowrap',
        fontFamily: 'var(--font-sans)', fontSize: 13.5, fontWeight: 600, letterSpacing: '-0.005em',
        background: selected ? 'var(--accent)' : 'var(--surface-2)',
        color: selected ? 'var(--on-accent)' : 'var(--text-2)',
        border: `1px solid ${selected ? 'transparent' : 'var(--border)'}`,
        boxShadow: selected ? 'var(--shadow-accent)' : 'none',
        transition: 'all var(--dur-base) var(--ease-out)',
        ...style,
      }}>
      {icon && <Icon name={icon} size={16} stroke={1.9} />}
      {label}
    </button>
  );
}

/* ============================================================
   SLIDER — custom track + ticks, RTL-aware, accessible
   ============================================================ */
function Slider({ value, min, max, step = 1, onChange, format, ticks, label, rightLabel, rtl }) {
  const trackRef = useRef(null);
  const dragging = useRef(false);
  const pct = (value - min) / (max - min);

  const setFromClientX = useCallback((clientX) => {
    const el = trackRef.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    let p = (clientX - rect.left) / rect.width;
    if (rtl) p = 1 - p;
    p = Math.max(0, Math.min(1, p));
    const raw = min + p * (max - min);
    const snapped = Math.round(raw / step) * step;
    onChange(Math.max(min, Math.min(max, snapped)));
  }, [min, max, step, onChange, rtl]);

  useEffect(() => {
    const move = (e) => { if (dragging.current) setFromClientX(e.touches ? e.touches[0].clientX : e.clientX); };
    const up = () => { dragging.current = false; };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
  }, [setFromClientX]);

  const fillStyle = rtl
    ? { right: 0, width: `${pct * 100}%` }
    : { left: 0, width: `${pct * 100}%` };
  const thumbPos = rtl ? { right: `calc(${pct * 100}% - 12px)` } : { left: `calc(${pct * 100}% - 12px)` };

  return (
    <div style={{ width: '100%' }}>
      {(label || rightLabel) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <span className="t-sm" style={{ color: 'var(--text-2)', fontWeight: 600 }}>{label}</span>
          <span className="t-h3 t-mono" style={{ color: 'var(--text)', fontWeight: 700 }}>{format ? format(value) : value}{rightLabel ? ` ${rightLabel}` : ''}</span>
        </div>
      )}
      <div
        ref={trackRef}
        className="focusable"
        role="slider" tabIndex={0}
        aria-valuenow={value} aria-valuemin={min} aria-valuemax={max} aria-label={label}
        onPointerDown={(e) => { dragging.current = true; setFromClientX(e.clientX); }}
        onKeyDown={(e) => {
          const d = (rtl ? -1 : 1);
          if (e.key === 'ArrowRight') onChange(Math.min(max, value + step * d));
          if (e.key === 'ArrowLeft') onChange(Math.max(min, value - step * d));
        }}
        style={{ position: 'relative', height: 28, cursor: 'pointer', touchAction: 'none' }}>
        <div style={{ position: 'absolute', top: 11, left: 0, right: 0, height: 6, borderRadius: 999, background: 'var(--surface-3)' }} />
        <div style={{ position: 'absolute', top: 11, height: 6, borderRadius: 999, background: 'var(--accent)', ...fillStyle }} />
        {ticks && ticks.map((t, i) => {
          const tp = (t - min) / (max - min);
          const pos = rtl ? { right: `${tp * 100}%` } : { left: `${tp * 100}%` };
          return <div key={i} style={{ position: 'absolute', top: 9, width: 2, height: 10, marginLeft: -1, borderRadius: 2, background: 'var(--border-strong)', ...pos }} />;
        })}
        <div style={{
          position: 'absolute', top: 2, width: 24, height: 24, borderRadius: '50%',
          background: 'var(--surface)', border: '3px solid var(--accent)', boxShadow: 'var(--shadow-md)',
          ...thumbPos, transition: dragging.current ? 'none' : 'left var(--dur-fast), right var(--dur-fast)',
        }} />
      </div>
    </div>
  );
}

/* ============================================================
   PROGRESS RING — SVG, animated, center content slot
   ============================================================ */
function ProgressRing({ value = 0, size = 84, stroke = 8, color = 'var(--accent)', track = 'var(--surface-3)', children, label }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const [animated, setAnimated] = useState(0);
  useEffect(() => { const id = requestAnimationFrame(() => setAnimated(value)); return () => cancelAnimationFrame(id); }, [value]);
  const offset = circ * (1 - animated / 100);
  return (
    <div style={{ position: 'relative', width: size, height: size, flex: 'none' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 900ms var(--ease-out)' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        {children || (
          <>
            <span className="t-mono" style={{ fontSize: size * 0.26, fontWeight: 700, lineHeight: 1 }}>{Math.round(value)}<span style={{ fontSize: size * 0.14 }}>%</span></span>
            {label && <span className="t-micro" style={{ color: 'var(--text-3)', marginTop: 2 }}>{label}</span>}
          </>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   AD PLACEHOLDER — clearly labeled, density-aware
   density: 'standard' | 'minimal' | 'off'
   ============================================================ */
function AdPlaceholder({ t, density = 'standard' }) {
  if (density === 'off') return null;
  if (density === 'minimal') {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
        borderRadius: 'var(--r-sm)', background: 'var(--surface-inset)',
        border: '1px dashed var(--border-strong)',
      }}>
        <span className="t-micro" style={{ color: 'var(--text-3)', border: '1px solid var(--border-strong)', borderRadius: 4, padding: '2px 6px' }}>{t.adLabel}</span>
        <span className="t-sm text-2" style={{ flex: 1, fontWeight: 600 }}>{t.adTitle}</span>
        <span className="t-sm text-accent" style={{ fontWeight: 700 }}>{t.adCta}</span>
      </div>
    );
  }
  return (
    <div style={{
      borderRadius: 'var(--r-md)', background: 'var(--surface-inset)',
      border: '1px dashed var(--border-strong)', padding: 16, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span className="t-micro" style={{ color: 'var(--text-3)', border: '1px solid var(--border-strong)', borderRadius: 4, padding: '2px 7px', letterSpacing: '0.06em' }}>{t.adLabel}</span>
        <span className="t-cap text-3" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="info" size={13} /> {t.adWhy}</span>
      </div>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: 'var(--r-sm)', flex: 'none', background: 'var(--surface-3)', display: 'grid', placeItems: 'center', color: 'var(--text-3)' }}>
          <Icon name="shield" size={26} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="t-body" style={{ fontWeight: 700, marginBottom: 2 }}>{t.adTitle}</p>
          <p className="t-sm text-2">{t.adBody}</p>
        </div>
      </div>
      <button className="focusable" style={{
        marginTop: 12, width: '100%', height: 40, borderRadius: 'var(--r-sm)', cursor: 'pointer',
        background: 'transparent', border: '1px solid var(--border-strong)', color: 'var(--text)',
        fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 13.5,
      }}>{t.adCta}</button>
    </div>
  );
}

/* ============================================================
   COACH MESSAGE — bubble for AI vs user, with avatar
   ============================================================ */
function CoachMessage({ from = 'coach', children, animateIn }) {
  const isCoach = from === 'coach';
  return (
    <div style={{
      display: 'flex', gap: 10, alignItems: 'flex-end',
      flexDirection: isCoach ? 'row' : 'row-reverse',
      animation: animateIn ? 'msgIn var(--dur-slow) var(--ease-out) both' : 'none',
    }}>
      {isCoach && (
        <div style={{ width: 32, height: 32, borderRadius: '50%', flex: 'none', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center', border: '1px solid var(--accent-ring)' }}>
          <Icon name="spark" size={17} stroke={2} />
        </div>
      )}
      <div style={{
        maxWidth: '78%', padding: '11px 14px',
        borderRadius: isCoach ? 'var(--r-md) var(--r-md) var(--r-md) 6px' : 'var(--r-md) var(--r-md) 6px var(--r-md)',
        background: isCoach ? 'var(--surface-2)' : 'var(--accent)',
        color: isCoach ? 'var(--text)' : 'var(--on-accent)',
        border: isCoach ? '1px solid var(--border)' : 'none',
        fontSize: 14.5, lineHeight: 1.5, fontWeight: isCoach ? 400 : 600,
      }}>
        {children}
      </div>
    </div>
  );
}

/* ============================================================
   BOTTOM NAVIGATION — 5 tabs, 44px+ targets, active pill
   ============================================================ */
function BottomNav({ active, onChange, t }) {
  const tabs = [
    { id: 'home', icon: 'home', label: t.navHome },
    { id: 'learn', icon: 'learn', label: t.navLearn },
    { id: 'sim', icon: 'sim', label: t.navSim },
    { id: 'coach', icon: 'coach', label: t.navCoach },
    { id: 'you', icon: 'you', label: t.navYou },
  ];
  return (
    <nav style={{
      height: 'var(--nav-h)', flex: 'none', display: 'flex', alignItems: 'stretch',
      background: 'color-mix(in srgb, var(--surface) 88%, transparent)',
      backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
      borderTop: '1px solid var(--border)', paddingBottom: 14,
    }}>
      {tabs.map(tab => {
        const on = active === tab.id;
        return (
          <button key={tab.id} className="focusable" onClick={() => onChange(tab.id)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
              background: 'transparent', border: 'none', cursor: 'pointer', minHeight: 44,
              color: on ? 'var(--accent)' : 'var(--text-3)', position: 'relative', paddingTop: 6,
              transition: 'color var(--dur-base)',
            }}>
            <div style={{ position: 'relative' }}>
              <Icon name={tab.icon} size={23} stroke={on ? 2.1 : 1.7} />
            </div>
            <span style={{ fontSize: 10.5, fontWeight: on ? 700 : 600, letterSpacing: '0.01em' }}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

/* ============================================================
   Small shared bits
   ============================================================ */
function Badge({ children, tone = 'accent', icon }) {
  const tones = {
    accent: { bg: 'var(--accent-soft)', fg: 'var(--accent)', bd: 'var(--accent-ring)' },
    caution: { bg: 'var(--caution-soft)', fg: 'var(--caution)', bd: 'color-mix(in srgb, var(--caution) 30%, transparent)' },
    info: { bg: 'var(--info-soft)', fg: 'var(--info)', bd: 'color-mix(in srgb, var(--info) 30%, transparent)' },
    neutral: { bg: 'var(--surface-2)', fg: 'var(--text-2)', bd: 'var(--border)' },
  }[tone];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 9px', borderRadius: 'var(--r-full)',
      background: tones.bg, color: tones.fg, border: `1px solid ${tones.bd}`, fontSize: 11.5, fontWeight: 700, letterSpacing: '0.01em' }}>
      {icon && <Icon name={icon} size={13} stroke={2} />}{children}
    </span>
  );
}

function SafetyNote({ children }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '10px 12px', borderRadius: 'var(--r-sm)',
      background: 'var(--info-soft)', border: '1px solid color-mix(in srgb, var(--info) 24%, transparent)' }}>
      <span style={{ color: 'var(--info)', marginTop: 1 }}><Icon name="shield" size={16} /></span>
      <span className="t-cap" style={{ color: 'var(--text-2)', lineHeight: 1.4 }}>{children}</span>
    </div>
  );
}

Object.assign(window, {
  Icon, Button, Card, Chip, Slider, ProgressRing, AdPlaceholder, CoachMessage, BottomNav, Badge, SafetyNote,
});
