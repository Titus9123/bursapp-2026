import { useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowRight, BadgeDollarSign, BarChart3, Bot, Brain, Download, Globe2, GraduationCap, Info, Languages, PlayCircle, RefreshCw, ShieldCheck, Sparkles, Target, TrendingUp } from 'lucide-react';
import { assets, lessons, quiz, supportedLanguages, type AssetProfile, type LanguageCode } from '@/data/appData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

type Holding = Record<string, number>;
type Scenario = 'balanced' | 'aiBoom' | 'inflation' | 'riskOff';

type Copy = {
  title: string;
  subtitle: string;
  start: string;
  free: string;
  noAdvice: string;
  simulator: string;
  lessons: string;
  quiz: string;
  aiCoach: string;
  capital: string;
  scenario: string;
  allocation: string;
  result: string;
  risk: string;
  diversification: string;
  export: string;
  adReady: string;
};

const copy: Record<LanguageCode, Copy> = {
  en: {
    title: 'Bursapp', subtitle: 'Free AI-assisted financial learning, paper trading and market practice — built for mobile traffic.', start: 'Start free', free: 'Free with ads', noAdvice: 'Educational simulation only. No real money. No financial advice.', simulator: 'AI Market Simulator', lessons: 'Micro-lessons', quiz: 'Beginner quiz', aiCoach: 'AI coach mode', capital: 'Virtual capital', scenario: 'Scenario', allocation: 'Allocation', result: 'Projected practice result', risk: 'Risk score', diversification: 'Diversification', export: 'Export CSV', adReady: 'Ad-ready free app shell'
  },
  es: {
    title: 'Bursapp', subtitle: 'Educación financiera gratis con IA, paper trading y práctica de mercado — pensada para tráfico mobile.', start: 'Empezar gratis', free: 'Gratis con ads', noAdvice: 'Simulación educativa. Sin dinero real. No es consejo financiero.', simulator: 'Simulador de mercado con IA', lessons: 'Micro-lecciones', quiz: 'Quiz para principiantes', aiCoach: 'Modo coach IA', capital: 'Capital virtual', scenario: 'Escenario', allocation: 'Asignación', result: 'Resultado proyectado de práctica', risk: 'Score de riesgo', diversification: 'Diversificación', export: 'Exportar CSV', adReady: 'Shell free app listo para ads'
  },
  he: {
    title: 'Bursapp', subtitle: 'למידה פיננסית חינמית עם AI, מסחר מדומה ותרגול שוק — מותאם למובייל.', start: 'התחלה חינם', free: 'חינם עם פרסומות', noAdvice: 'סימולציה לימודית בלבד. ללא כסף אמיתי. לא ייעוץ פיננסי.', simulator: 'סימולטור שוק עם AI', lessons: 'שיעורים קצרים', quiz: 'חידון מתחילים', aiCoach: 'מצב מאמן AI', capital: 'הון וירטואלי', scenario: 'תרחיש', allocation: 'הקצאה', result: 'תוצאת תרגול משוערת', risk: 'ציון סיכון', diversification: 'פיזור', export: 'ייצוא CSV', adReady: 'מעטפת אפליקציה חינמית מוכנה לפרסומות'
  },
  ar: {
    title: 'Bursapp', subtitle: 'تعلم مالي مجاني بمساعدة الذكاء الاصطناعي ومحاكاة تداول — مصمم لحركة مرور الهاتف.', start: 'ابدأ مجاناً', free: 'مجاني مع الإعلانات', noAdvice: 'محاكاة تعليمية فقط. لا مال حقيقي. ليست نصيحة مالية.', simulator: 'محاكي السوق بالذكاء الاصطناعي', lessons: 'دروس قصيرة', quiz: 'اختبار للمبتدئين', aiCoach: 'وضع مدرب الذكاء الاصطناعي', capital: 'رأس مال افتراضي', scenario: 'سيناريو', allocation: 'تخصيص', result: 'نتيجة تدريب متوقعة', risk: 'درجة المخاطر', diversification: 'التنويع', export: 'تصدير CSV', adReady: 'هيكل تطبيق مجاني جاهز للإعلانات'
  },
  am: {
    title: 'Bursapp', subtitle: 'ነፃ የAI የገንዘብ ትምህርት፣ የገበያ ልምምድ እና ሲሙሌተር — ለሞባይል ትራፊክ የተዘጋጀ።', start: 'በነፃ ጀምር', free: 'ከማስታወቂያ ጋር ነፃ', noAdvice: 'የትምህርት ሲሙሌተር ብቻ። እውነተኛ ገንዘብ የለም። የፋይናንስ ምክር አይደለም።', simulator: 'የAI ገበያ ሲሙሌተር', lessons: 'አጭር ትምህርቶች', quiz: 'የጀማሪ ጥያቄዎች', aiCoach: 'AI ኮች ሁነታ', capital: 'ቨርቹዋል ካፒታል', scenario: 'ሁኔታ', allocation: 'ስርጭት', result: 'የልምምድ ውጤት', risk: 'የአደጋ ነጥብ', diversification: 'ስርጭት', export: 'CSV አውጣ', adReady: 'ለads ዝግጁ ነፃ app shell'
  },
  ru: {
    title: 'Bursapp', subtitle: 'Бесплатное финансовое обучение с AI, бумажный трейдинг и рыночная практика — для мобильного трафика.', start: 'Начать бесплатно', free: 'Бесплатно с рекламой', noAdvice: 'Только учебная симуляция. Без реальных денег. Не финансовый совет.', simulator: 'AI-симулятор рынка', lessons: 'Микро-уроки', quiz: 'Квиз для новичков', aiCoach: 'AI-коуч', capital: 'Виртуальный капитал', scenario: 'Сценарий', allocation: 'Аллокация', result: 'Прогноз учебного результата', risk: 'Оценка риска', diversification: 'Диверсификация', export: 'Экспорт CSV', adReady: 'Free app shell для рекламы'
  }
};

const scenarioImpact: Record<Scenario, Record<AssetProfile['category'], number>> = {
  balanced: { index: 1.04, technology: 1.06, green: 1.03, dividend: 1.025, bonds: 1.015, volatile: 1.08 },
  aiBoom: { index: 1.08, technology: 1.22, green: 1.07, dividend: 1.02, bonds: 0.99, volatile: 1.18 },
  inflation: { index: 0.99, technology: 0.94, green: 1.04, dividend: 1.05, bonds: 0.92, volatile: 0.9 },
  riskOff: { index: 0.96, technology: 0.89, green: 0.93, dividend: 1.01, bonds: 1.05, volatile: 0.78 }
};

const scenarioLabels: Record<Scenario, string> = {
  balanced: 'Balanced market', aiBoom: 'AI boom', inflation: 'Inflation pressure', riskOff: 'Risk-off shock'
};

function clamp(n: number, min: number, max: number) { return Math.max(min, Math.min(max, n)); }

function makeInitialHoldings(): Holding {
  return Object.fromEntries(assets.map((asset, index) => [asset.id, index === 0 ? 35 : index === 1 ? 25 : index === 3 ? 20 : 5]));
}

function normalizeHoldings(h: Holding): Holding {
  const total = Object.values(h).reduce((sum, value) => sum + value, 0) || 1;
  return Object.fromEntries(Object.entries(h).map(([key, value]) => [key, Math.round((value / total) * 100)]));
}

function toCsv(rows: Array<Record<string, string | number>>) {
  const headers = Object.keys(rows[0]);
  return [headers.join(','), ...rows.map((row) => headers.map((h) => `"${String(row[h]).replace(/"/g, '""')}"`).join(','))].join('\n');
}

export default function Index() {
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [capital, setCapital] = useState(10000);
  const [scenario, setScenario] = useState<Scenario>('aiBoom');
  const [holdings, setHoldings] = useState<Holding>(() => makeInitialHoldings());
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const c = copy[language];
  const dir = supportedLanguages.find((l) => l.code === language)?.dir ?? 'ltr';

  const normalized = useMemo(() => normalizeHoldings(holdings), [holdings]);
  const result = useMemo(() => {
    let endValue = 0;
    let weightedVol = 0;
    let maxWeight = 0;
    const rows = assets.map((asset) => {
      const weight = normalized[asset.id] || 0;
      const start = capital * (weight / 100);
      const multiplier = scenarioImpact[scenario][asset.category];
      const end = start * multiplier;
      endValue += end;
      weightedVol += asset.volatility * weight;
      maxWeight = Math.max(maxWeight, weight);
      return { asset: asset.name, allocation: weight, start: Math.round(start), projected: Math.round(end), scenario: scenarioLabels[scenario] };
    });
    const risk = clamp(Math.round((weightedVol / 100) * 50 + maxWeight * 0.75), 5, 100);
    const diversification = clamp(100 - Math.round(maxWeight * 0.85 + (weightedVol / 100) * 12), 1, 100);
    return { endValue, pnl: endValue - capital, risk, diversification, rows };
  }, [capital, normalized, scenario]);

  const chartData = useMemo(() => {
    const drift = result.pnl / 6;
    return Array.from({ length: 7 }, (_, i) => ({ step: `M${i}`, value: Math.round(capital + drift * i + Math.sin(i) * result.risk * 8) }));
  }, [capital, result.pnl, result.risk]);

  function exportCsv() {
    const blob = new Blob([toCsv(result.rows)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bursapp-2026-practice-portfolio.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main dir={dir} className="min-h-screen bg-[#080b12] text-slate-50">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(52,211,153,.24),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,.25),transparent_35%)]" />
        <div className="container relative grid gap-8 px-4 py-8 lg:grid-cols-[1.05fr_.95fr] lg:py-14">
          <div className="space-y-7">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-emerald-400 text-emerald-950 hover:bg-emerald-300"><Sparkles className="mr-1 h-3 w-3" /> {c.free}</Badge>
              <Badge variant="outline" className="border-sky-300/40 text-sky-100"><Languages className="mr-1 h-3 w-3" /> EN · ES · HE · AR · AM · RU</Badge>
              <Badge variant="outline" className="border-amber-300/40 text-amber-100"><ShieldCheck className="mr-1 h-3 w-3" /> no advice</Badge>
            </div>
            <div>
              <h1 className="max-w-4xl text-5xl font-black tracking-tight md:text-7xl">{c.title}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">{c.subtitle}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="h-12 bg-emerald-400 px-6 text-emerald-950 hover:bg-emerald-300">{c.start}<ArrowRight className="ml-2 h-4 w-4" /></Button>
              <Button size="lg" variant="outline" className="h-12 border-white/15 bg-white/5 px-6 text-white hover:bg-white/10"><Download className="mr-2 h-4 w-4" />{c.export}</Button>
            </div>
            <p className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-50"><Info className="mr-2 inline h-4 w-4" />{c.noAdvice}</p>
          </div>

          <Card className="border-white/10 bg-white/[.06] text-white shadow-2xl shadow-emerald-950/30 backdrop-blur">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-2xl text-white">{c.simulator}</CardTitle>
                  <CardDescription className="text-slate-300">{c.adReady}</CardDescription>
                </div>
                <Select value={language} onValueChange={(v) => setLanguage(v as LanguageCode)}>
                  <SelectTrigger className="w-[150px] border-white/15 bg-black/20 text-white"><Globe2 className="mr-2 h-4 w-4" /><SelectValue /></SelectTrigger>
                  <SelectContent>{supportedLanguages.map((lng) => <SelectItem key={lng.code} value={lng.code}>{lng.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2"><span className="text-sm text-slate-300">{c.capital}: ${capital.toLocaleString()}</span><Slider value={[capital]} min={1000} max={100000} step={1000} onValueChange={([v]) => setCapital(v)} /></label>
                <div className="space-y-2"><span className="text-sm text-slate-300">{c.scenario}</span><Select value={scenario} onValueChange={(v) => setScenario(v as Scenario)}><SelectTrigger className="border-white/15 bg-black/20 text-white"><SelectValue /></SelectTrigger><SelectContent>{Object.entries(scenarioLabels).map(([key, label]) => <SelectItem key={key} value={key}>{label}</SelectItem>)}</SelectContent></Select></div>
              </div>
              <div className="grid gap-3">
                {assets.map((asset) => (
                  <div key={asset.id} className="grid gap-2 rounded-2xl border border-white/10 bg-black/20 p-3">
                    <div className="flex items-center justify-between gap-4"><span className="text-sm font-semibold">{asset.name}</span><span className="text-sm text-emerald-200">{normalized[asset.id] || 0}%</span></div>
                    <Slider value={[normalized[asset.id] || 0]} min={0} max={80} step={5} onValueChange={([v]) => setHoldings((prev) => ({ ...prev, [asset.id]: v }))} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container grid gap-5 px-4 py-8 lg:grid-cols-3">
        <Card className="border-white/10 bg-white/[.06] text-white lg:col-span-2">
          <CardHeader><CardTitle className="flex items-center gap-2 text-white"><BarChart3 className="h-5 w-5 text-emerald-300" />{c.result}</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-3">
              <Metric icon={BadgeDollarSign} label="Value" value={`$${Math.round(result.endValue).toLocaleString()}`} tone="emerald" />
              <Metric icon={TrendingUp} label="P/L" value={`${result.pnl >= 0 ? '+' : ''}$${Math.round(result.pnl).toLocaleString()}`} tone={result.pnl >= 0 ? 'emerald' : 'rose'} />
              <Metric icon={Target} label={c.risk} value={`${result.risk}/100`} tone="amber" />
            </div>
            <div className="h-64"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData}><defs><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="5%" stopColor="#34d399" stopOpacity={0.45}/><stop offset="95%" stopColor="#34d399" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="rgba(255,255,255,.08)" /><XAxis dataKey="step" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,.12)', color: 'white' }} /><Area dataKey="value" stroke="#34d399" fill="url(#g)" strokeWidth={3} /></AreaChart></ResponsiveContainer></div>
            <div><div className="mb-2 flex justify-between text-sm text-slate-300"><span>{c.diversification}</span><span>{result.diversification}/100</span></div><Progress value={result.diversification} /></div>
            <Button onClick={exportCsv} className="bg-white text-slate-950 hover:bg-slate-200"><Download className="mr-2 h-4 w-4" />{c.export}</Button>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/[.06] text-white">
          <CardHeader><CardTitle className="flex items-center gap-2 text-white"><Bot className="h-5 w-5 text-sky-300" />{c.aiCoach}</CardTitle><CardDescription className="text-slate-300">Rule-based v0. No external AI cost yet.</CardDescription></CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-200">
            <p className="rounded-2xl bg-sky-400/10 p-3">{result.risk > 70 ? 'High concentration/volatility. Try reducing the largest position before chasing upside.' : 'Risk is moderate. Compare scenarios to see how fragile the allocation is.'}</p>
            <p className="rounded-2xl bg-emerald-400/10 p-3">{assets.find((a) => (normalized[a.id] || 0) === Math.max(...Object.values(normalized)))?.aiNote}</p>
            <div className="rounded-2xl border border-dashed border-white/15 p-4 text-center text-slate-400">Native ad slot placeholder · inactive</div>
          </CardContent>
        </Card>
      </section>

      <section className="container px-4 pb-12">
        <Tabs defaultValue="lessons" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10 text-white"><TabsTrigger value="lessons"><GraduationCap className="mr-2 h-4 w-4" />{c.lessons}</TabsTrigger><TabsTrigger value="quiz"><Brain className="mr-2 h-4 w-4" />{c.quiz}</TabsTrigger></TabsList>
          <TabsContent value="lessons" className="mt-5 grid gap-4 md:grid-cols-3">
            {lessons.map((lesson) => <Card key={lesson.id} className="border-white/10 bg-white/[.06] text-white"><CardHeader><Badge className="w-fit bg-sky-400 text-sky-950">{lesson.minutes} min</Badge><CardTitle className="text-white">{lesson.title[language]}</CardTitle><CardDescription className="text-slate-300">{lesson.summary[language]}</CardDescription></CardHeader></Card>)}
          </TabsContent>
          <TabsContent value="quiz" className="mt-5">
            <Card className="border-white/10 bg-white/[.06] text-white"><CardHeader><CardTitle className="text-white">{quiz[0].prompt[language]}</CardTitle></CardHeader><CardContent className="space-y-3">{quiz[0].options[language].map((option, index) => <Button key={option} variant="outline" className="w-full justify-start border-white/15 bg-black/20 text-white hover:bg-white/10" onClick={() => setSelectedAnswer(index)}><PlayCircle className="mr-2 h-4 w-4" />{option}</Button>)}{selectedAnswer !== null && <p className={`rounded-2xl p-4 ${selectedAnswer === quiz[0].answerIndex ? 'bg-emerald-400/15 text-emerald-100' : 'bg-rose-400/15 text-rose-100'}`}>{quiz[0].explanation[language]}</p>}<Button variant="ghost" className="text-slate-200" onClick={() => setSelectedAnswer(null)}><RefreshCw className="mr-2 h-4 w-4" />Reset</Button></CardContent></Card>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}

function Metric({ icon: Icon, label, value, tone }: { icon: typeof BarChart3; label: string; value: string; tone: 'emerald' | 'rose' | 'amber' }) {
  const colors = { emerald: 'text-emerald-300 bg-emerald-400/10', rose: 'text-rose-300 bg-rose-400/10', amber: 'text-amber-300 bg-amber-400/10' };
  return <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${colors[tone]}`}><Icon className="h-5 w-5" /></div><p className="text-sm text-slate-400">{label}</p><p className="text-2xl font-black">{value}</p></div>;
}
