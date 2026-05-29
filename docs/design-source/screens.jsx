// screens.jsx — Splash, Onboarding, Home, Learn
// Consumes window components + I18N. Each screen receives { t, go, lang, theme, adDensity }.

const { useState: useStateS } = React;

/* ---------- Brand mark ---------- */
function Logo({ size = 34, showWord = true }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: size, height: size, borderRadius: size * 0.3, background: 'var(--accent)',
        display: 'grid', placeItems: 'center', boxShadow: 'var(--shadow-accent)', flex: 'none' }}>
        <svg width={size*0.62} height={size*0.62} viewBox="0 0 24 24" style={{ display: 'block' }}>
          <path d="M4 18V8M9.5 18V5M15 18v-6M20.5 18v-9" stroke="var(--on-accent)" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
        </svg>
      </div>
      {showWord && <span style={{ fontSize: size * 0.62, fontWeight: 800, letterSpacing: '-0.03em' }}>Bursapp</span>}
    </div>
  );
}

/* ============================================================
   SPLASH
   ============================================================ */
function SplashScreen({ t, go }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '0 24px 28px',
      background: 'var(--bg-grad)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -80, insetInlineEnd: -60, width: 240, height: 240, borderRadius: '50%',
        background: 'radial-gradient(circle, var(--accent-soft), transparent 70%)', filter: 'blur(8px)' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ animation: 'fadeUp 600ms var(--ease-out) both' }}><Logo size={44} /></div>
        <h1 className="t-display" style={{ marginTop: 28, maxWidth: 300, animation: 'fadeUp 600ms 80ms var(--ease-out) both' }}>{t.tagline}</h1>
        <div style={{ marginTop: 20, animation: 'fadeUp 600ms 160ms var(--ease-out) both' }}>
          <Badge tone="accent" icon="shield">{t.eduBadge}</Badge>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', zIndex: 1, animation: 'fadeUp 600ms 240ms var(--ease-out) both' }}>
        <Button size="lg" fullWidth iconR="arrowR" onClick={() => go('onboarding')}>{t.getStarted}</Button>
        <Button size="lg" variant="ghost" fullWidth onClick={() => go('home')}>{t.haveAccount}</Button>
      </div>
    </div>
  );
}

/* ============================================================
   ONBOARDING — 3 steps, light/dark themed surface
   ============================================================ */
function OnboardingScreen({ t, go }) {
  const [step, setStep] = useStateS(0);
  const steps = [
    { icon: 'coins', title: t.ob1Title, body: t.ob1Body, art: 'practice' },
    { icon: 'sim', title: t.ob2Title, body: t.ob2Body, art: 'scenario' },
    { icon: 'spark', title: t.ob3Title, body: t.ob3Body, art: 'coach' },
  ];
  const s = steps[step];
  const last = step === steps.length - 1;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '8px 24px 28px', background: 'var(--bg-grad)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 44 }}>
        <Logo size={28} showWord={false} />
        <button onClick={() => go('home')} className="focusable t-sm" style={{ background: 'none', border: 'none', color: 'var(--text-2)', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>{t.skip}</button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div key={step} style={{ animation: 'fadeUp 420ms var(--ease-out) both' }}>
          <OnboardArt kind={s.art} />
          <div style={{ marginTop: 36, color: 'var(--accent)' }}><Icon name={s.icon} size={28} stroke={2} /></div>
          <h2 className="t-h1" style={{ marginTop: 14, maxWidth: 300 }}>{s.title}</h2>
          <p className="t-body text-2" style={{ marginTop: 12, maxWidth: 320 }}>{s.body}</p>
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
          {steps.map((_, i) => (
            <div key={i} style={{ height: 4, flex: i === step ? 2.4 : 1, borderRadius: 999,
              background: i === step ? 'var(--accent)' : 'var(--surface-3)', transition: 'all var(--dur-base) var(--ease-out)' }} />
          ))}
        </div>
        <Button size="lg" fullWidth iconR={last ? undefined : 'arrowR'}
          onClick={() => last ? go('home') : setStep(step + 1)}>{last ? t.start : t.next}</Button>
      </div>
    </div>
  );
}

function OnboardArt({ kind }) {
  // lightweight, themeable illustrative panels (no stock imagery)
  if (kind === 'practice') {
    return (
      <Card elevated pad="20px" style={{ background: 'var(--surface)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Badge tone="neutral">Sandbox</Badge>
          <Badge tone="accent">Virtual</Badge>
        </div>
        <p className="t-mono" style={{ fontSize: 30, fontWeight: 700, marginTop: 16 }}>10,000<span className="t-sm text-3" style={{ marginInlineStart: 6 }}>pts</span></p>
        <div style={{ display: 'flex', gap: 6, marginTop: 16, alignItems: 'flex-end', height: 46 }}>
          {[40, 62, 50, 72, 58, 80, 68].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 4, background: i === 5 ? 'var(--accent)' : 'var(--surface-3)' }} />
          ))}
        </div>
      </Card>
    );
  }
  if (kind === 'scenario') {
    return (
      <Card elevated pad="20px">
        <svg viewBox="0 0 280 110" style={{ width: '100%', height: 110, display: 'block' }}>
          <defs><linearGradient id="obband" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28"/><stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/></linearGradient></defs>
          <path d="M0 70 C60 60 120 40 280 12 L280 60 C120 70 60 84 0 92 Z" fill="url(#obband)"/>
          <path d="M0 80 C60 72 120 55 280 30" stroke="var(--accent)" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M0 84 C60 80 120 74 280 64" stroke="var(--text-3)" strokeWidth="1.5" fill="none" strokeDasharray="4 4"/>
        </svg>
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <Badge tone="accent">Range</Badge><Badge tone="neutral">Not a prediction</Badge>
        </div>
      </Card>
    );
  }
  return (
    <Card elevated pad="18px">
      <CoachMessage from="coach">Diversification means not putting every egg in one basket.</CoachMessage>
      <div style={{ height: 10 }} />
      <CoachMessage from="user">Got it — why does that help?</CoachMessage>
    </Card>
  );
}

/* ============================================================
   HOME — learning-first dashboard
   ============================================================ */
function HomeScreen({ t, go, adDensity }) {
  return (
    <ScreenScroll>
      {/* header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
        <div>
          <p className="t-sm text-2" style={{ fontWeight: 600 }}>{t.greeting},</p>
          <h1 className="t-h1" style={{ marginTop: 2 }}>{t.userName} 👋</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: 'var(--caution)' }}>
            <Icon name="flame" size={19} /><span className="t-sm" style={{ fontWeight: 700, color: 'var(--text)' }}>7</span>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--surface-3)', color: 'var(--text-2)', display: 'grid', placeItems: 'center', border: '1px solid var(--border)' }}><Icon name="bell" size={19} /></div>
        </div>
      </div>

      {/* learning path */}
      <Card elevated style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 14 }}>
        <ProgressRing value={42} size={78} label="path" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="t-h3">{t.learningPath}</p>
          <p className="t-sm text-2" style={{ marginTop: 3 }}>14 {t.conceptsMastered}</p>
          <div style={{ marginTop: 10 }}>
            <Button size="sm" variant="pill" iconR="arrowR" onClick={() => go('learn')}>{t.continueLesson}</Button>
          </div>
        </div>
      </Card>

      {/* continue lesson */}
      <Card interactive onClick={() => go('learn')} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
        <div style={{ width: 48, height: 48, borderRadius: 'var(--r-sm)', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center', flex: 'none' }}><Icon name="play" size={20} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="t-body" style={{ fontWeight: 700 }}>{t.lessonName}</p>
          <p className="t-cap text-3" style={{ marginTop: 2 }}>{t.lessonMeta}</p>
        </div>
        <Icon name="arrowR" size={20} style={{ color: 'var(--text-3)' }} />
      </Card>

      {/* practice portfolio — explicitly simulated, no hype */}
      <Card style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <p className="t-h3">{t.practiceTitle}</p>
          <Badge tone="neutral" icon="info">{t.practiceTag}</Badge>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14 }}>
          <div>
            <p className="t-mono" style={{ fontSize: 30, fontWeight: 700, lineHeight: 1 }}>10,240</p>
            <p className="t-cap text-3" style={{ marginTop: 6 }}>{t.practiceHint}</p>
          </div>
          <svg viewBox="0 0 120 44" style={{ width: 120, height: 44, flex: 'none', marginInlineStart: 'auto' }}>
            <path d="M0 30 C20 26 30 34 50 28 C70 22 80 26 100 16 L120 12" stroke="var(--accent)" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
        <div style={{ marginTop: 14 }}><SafetyNote>{t.practiceNote}</SafetyNote></div>
      </Card>

      {/* ad */}
      {adDensity !== 'off' && <div style={{ marginBottom: 14 }}><AdPlaceholder t={t} density={adDensity} /></div>}

      {/* scenario of the week */}
      <Card accent interactive onClick={() => go('sim')} style={{ background: 'linear-gradient(135deg, var(--accent-soft), transparent 80%)', marginBottom: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <Icon name="target" size={18} style={{ color: 'var(--accent)' }} />
          <span className="t-micro" style={{ color: 'var(--accent)' }}>{t.scenarioWeek}</span>
        </div>
        <p className="t-h2" style={{ maxWidth: 260 }}>{t.scenarioWeekTitle}</p>
        <p className="t-sm text-2" style={{ marginTop: 8 }}>{t.scenarioWeekBody}</p>
        <div style={{ marginTop: 16 }}><Button size="md" iconR="arrowR" onClick={(e) => { e.stopPropagation(); go('sim'); }}>{t.tryIt}</Button></div>
      </Card>
    </ScreenScroll>
  );
}

/* ============================================================
   LEARN — module list
   ============================================================ */
function LearnScreen({ t, go }) {
  const mods = [
    { title: t.mod1, meta: t.mod1meta, state: 'done', icon: 'coins' },
    { title: t.mod2, meta: t.mod2meta, state: 'active', icon: 'leaf', prog: 40 },
    { title: t.mod3, meta: t.mod3meta, state: 'locked', icon: 'shield' },
    { title: t.mod4, meta: t.mod4meta, state: 'locked', icon: 'clock' },
  ];
  return (
    <ScreenScroll>
      <h1 className="t-h1">{t.learnTitle}</h1>
      <p className="t-sm text-2" style={{ marginTop: 4, marginBottom: 18 }}>{t.learnSubtitle}</p>

      <Card elevated style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
        <ProgressRing value={42} size={64} stroke={7} />
        <div>
          <p className="t-h3">42% {t.progressLabel}</p>
          <p className="t-sm text-2" style={{ marginTop: 2 }}>14 / 33 lessons</p>
        </div>
      </Card>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {mods.map((m, i) => {
          const locked = m.state === 'locked';
          return (
            <Card key={i} interactive={!locked} onClick={() => !locked && go('lesson')}
              style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: locked ? 0.6 : 1 }}>
              <div style={{ width: 46, height: 46, borderRadius: 'var(--r-sm)', flex: 'none', display: 'grid', placeItems: 'center',
                background: m.state === 'done' ? 'var(--accent)' : locked ? 'var(--surface-2)' : 'var(--accent-soft)',
                color: m.state === 'done' ? 'var(--on-accent)' : locked ? 'var(--text-3)' : 'var(--accent)' }}>
                <Icon name={m.state === 'done' ? 'check' : locked ? 'lock' : m.icon} size={22} stroke={2} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="t-body" style={{ fontWeight: 700 }}>{m.title}</p>
                <p className="t-cap text-3" style={{ marginTop: 2 }}>{m.meta}</p>
                {m.state === 'active' && (
                  <div style={{ height: 4, borderRadius: 999, background: 'var(--surface-3)', marginTop: 8, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${m.prog}%`, background: 'var(--accent)', borderRadius: 999 }} />
                  </div>
                )}
              </div>
              {!locked && <span className="t-cap" style={{ color: 'var(--accent)', fontWeight: 700, flex: 'none' }}>{m.state === 'done' ? t.review : t.resume}</span>}
            </Card>
          );
        })}
      </div>
    </ScreenScroll>
  );
}

/* shared scroll wrapper for app screens */
function ScreenScroll({ children }) {
  return (
    <div className="bursa-scroll" style={{ height: '100%', overflowY: 'auto', padding: '20px 20px 24px', background: 'var(--bg)' }}>
      {children}
    </div>
  );
}

Object.assign(window, { Logo, SplashScreen, OnboardingScreen, HomeScreen, LearnScreen, ScreenScroll });
