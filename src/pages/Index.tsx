import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  Check,
  ChevronRight,
  Download,
  Eye,
  Globe2,
  Home,
  Info,
  LineChart,
  Moon,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Target,
  User,
  X,
  Zap,
} from 'lucide-react';
import { supportedLanguages, type LanguageCode } from '@/data/appData';

type Dir = 'ltr' | 'rtl';
type Screen = 'splash' | 'onboarding' | 'home' | 'learn' | 'sim' | 'coach' | 'you';
type Accent = 'emerald' | 'mint' | 'indigo' | 'amber';
type AdDensity = 'standard' | 'minimal' | 'off';
type ThemeMode = 'dark' | 'light';
type RiskLevel = 0 | 1 | 2;
type ScenarioKey = 'steady' | 'dip' | 'recession' | 'long' | 'diversified';

type AccessibilityPrefs = {
  largeText: boolean;
  highContrast: boolean;
  reduceMotion: boolean;
  dyslexiaFont: boolean;
  labels: boolean;
};

type Copy = {
  _dir: Dir;
  label: string;
  short: string;
  splashTagline: string;
  splashBody: string;
  getStarted: string;
  haveAccount: string;
  eduBadge: string;
  noAdvice: string;
  skip: string;
  next: string;
  startLearning: string;
  ob1Title: string;
  ob1Body: string;
  ob2Title: string;
  ob2Body: string;
  ob3Title: string;
  ob3Body: string;
  navHome: string;
  navLearn: string;
  navSim: string;
  navCoach: string;
  navYou: string;
  greeting: string;
  userName: string;
  learningPath: string;
  conceptsMastered: string;
  continueLesson: string;
  lessonName: string;
  lessonMeta: string;
  practiceTitle: string;
  practiceTag: string;
  practiceNote: string;
  practiceHint: string;
  scenarioWeek: string;
  scenarioWeekTitle: string;
  scenarioWeekBody: string;
  tryIt: string;
  streak: string;
  learnTitle: string;
  learnSubtitle: string;
  progressLabel: string;
  mod1: string;
  mod1meta: string;
  mod2: string;
  mod2meta: string;
  mod3: string;
  mod3meta: string;
  mod4: string;
  mod4meta: string;
  resume: string;
  review: string;
  locked: string;
  simTitle: string;
  simSubtitle: string;
  pickScenario: string;
  sc_steady: string;
  sc_dip: string;
  sc_recession: string;
  sc_long: string;
  sc_diversified: string;
  monthly: string;
  horizon: string;
  risk: string;
  years: string;
  riskLow: string;
  riskMid: string;
  riskHigh: string;
  allocation: string;
  stocks: string;
  bonds: string;
  cash: string;
  projection: string;
  rangeNote: string;
  expected: string;
  optimistic: string;
  pessimistic: string;
  contributed: string;
  disclaimer: string;
  askCoach: string;
  export: string;
  coachTitle: string;
  coachStatus: string;
  coachSafety: string;
  coachGreeting: string;
  suggest1: string;
  suggest2: string;
  suggest3: string;
  coachAnswerDiv: string;
  coachAnswerDip: string;
  coachAnswerComp: string;
  inputPlaceholder: string;
  coachDisclaimer: string;
  adLabel: string;
  adTitle: string;
  adBody: string;
  adCta: string;
  adWhy: string;
  minRead: string;
  accessibility: string;
  accessibilityOpen: string;
  language: string;
  visualSettings: string;
  largeText: string;
  highContrast: string;
  reduceMotion: string;
  dyslexiaFont: string;
  labels: string;
  resetSettings: string;
  close: string;
  accent: string;
  theme: string;
  adDensity: string;
  adsStandard: string;
  adsMinimal: string;
  adsOff: string;
  dashboard: string;
  removeAdsFuture: string;
};

const translations: Record<LanguageCode, Copy> = {
  en: {
    _dir: 'ltr', label: 'English', short: 'EN',
    splashTagline: 'Learn to invest with confidence — without risking a cent.',
    splashBody: 'Practice with virtual money, run safe market scenarios, and get plain-language coaching. Educational simulation only.',
    getStarted: 'Get started', haveAccount: 'I already have an account', eduBadge: 'Educational • Practice money only', noAdvice: 'Educational simulation only. No real money. No financial advice.',
    skip: 'Skip', next: 'Next', startLearning: 'Start learning',
    ob1Title: 'Practice with virtual money', ob1Body: 'Build a portfolio and make moves in a safe sandbox. Nothing here uses real funds.',
    ob2Title: 'Run real-world scenarios', ob2Body: 'See how market dips, saving habits and time horizons can play out — with ranges, not promises.',
    ob3Title: 'Your AI coach explains the why', ob3Body: 'Ask anything. Get plain-language explanations of concepts, never pushy tips or signals.',
    navHome: 'Home', navLearn: 'Learn', navSim: 'Simulate', navCoach: 'Coach', navYou: 'You',
    greeting: 'Good morning', userName: 'Sam', learningPath: 'Your learning path', conceptsMastered: 'concepts mastered', continueLesson: 'Continue lesson', lessonName: 'Diversification basics', lessonMeta: 'Module 2 · 4 min left',
    practiceTitle: 'Practice portfolio', practiceTag: 'Simulated', practiceNote: 'Virtual money for learning. Not investment advice.', practiceHint: 'Hypothetical value based on your sandbox choices', scenarioWeek: 'Scenario of the week', scenarioWeekTitle: 'What if the market drops 20%?', scenarioWeekBody: 'Explore how a long horizon changes the picture.', tryIt: 'Try it', streak: 'day streak',
    learnTitle: 'Learn', learnSubtitle: 'Short lessons, one concept at a time.', progressLabel: 'of path complete', mod1: 'Money & mindset', mod1meta: 'Completed · 5 lessons', mod2: 'Diversification basics', mod2meta: 'In progress · 2 of 5', mod3: 'Understanding risk', mod3meta: 'Locked · finish Module 2', mod4: 'Long-term thinking', mod4meta: 'Locked', resume: 'Resume', review: 'Review', locked: 'Locked',
    simTitle: 'Scenario simulator', simSubtitle: 'Adjust the inputs to see a range of possible outcomes.', pickScenario: 'Pick a scenario', sc_steady: 'Steady saver', sc_dip: 'Market dip', sc_recession: 'Recession', sc_long: 'Long horizon', sc_diversified: 'Diversified', monthly: 'Monthly contribution', horizon: 'Time horizon', risk: 'Risk level', years: 'years', riskLow: 'Conservative', riskMid: 'Balanced', riskHigh: 'Growth', allocation: 'Suggested allocation', stocks: 'Stocks', bonds: 'Bonds', cash: 'Cash', projection: 'Possible range over time', rangeNote: 'Shaded band shows a plausible range, not a prediction.', expected: 'Middle path', optimistic: 'Stronger markets', pessimistic: 'Weaker markets', contributed: 'contributed', disclaimer: 'Hypothetical illustration. Past performance does not predict future results.', askCoach: 'Ask coach about this', export: 'Export summary',
    coachTitle: 'AI coach', coachStatus: 'Educational guidance', coachSafety: 'I explain concepts in plain language. I don’t give personalized financial advice.', coachGreeting: 'Hi Sam — what would you like to understand today?', suggest1: 'What is diversification?', suggest2: 'Explain my market-dip scenario', suggest3: 'How does compounding work?', coachAnswerDiv: 'Diversification means spreading money across different types of investments so one bad result doesn’t sink everything. Think of it as not putting every egg in one basket.', coachAnswerDip: 'In a market dip, prices fall for a while. With a long time horizon, there may be more years for markets to recover. The simulator shows a range of outcomes, not a guarantee.', coachAnswerComp: 'Compounding is growth on top of growth: returns can earn their own returns over time. Outcomes still vary because markets move up and down.', inputPlaceholder: 'Ask about a concept…', coachDisclaimer: 'Educational only · Not financial advice',
    adLabel: 'Sponsored', adTitle: 'Build an emergency fund', adBody: 'A free guide from an education partner.', adCta: 'Learn more', adWhy: 'Why this ad?', minRead: 'min read',
    accessibility: 'Accessibility', accessibilityOpen: 'Open accessibility options', language: 'Language', visualSettings: 'Visual settings', largeText: 'Large text', highContrast: 'High contrast', reduceMotion: 'Reduce motion', dyslexiaFont: 'Readable font', labels: 'Extra labels', resetSettings: 'Reset settings', close: 'Close', accent: 'Accent', theme: 'Lesson theme', adDensity: 'Ad density', adsStandard: 'Standard', adsMinimal: 'Minimal', adsOff: 'Off', dashboard: 'Dashboard', removeAdsFuture: 'Future remove-ads plan',
  },
  es: {
    _dir: 'ltr', label: 'Español', short: 'ES',
    splashTagline: 'Aprende a invertir con confianza — sin arriesgar un centavo.',
    splashBody: 'Practica con dinero virtual, prueba escenarios de mercado seguros y recibe explicaciones simples. Solo simulación educativa.',
    getStarted: 'Empezar', haveAccount: 'Ya tengo cuenta', eduBadge: 'Educativo • Solo dinero de práctica', noAdvice: 'Simulación educativa. Sin dinero real. No es consejo financiero.',
    skip: 'Saltar', next: 'Siguiente', startLearning: 'Empezar a aprender',
    ob1Title: 'Practica con dinero virtual', ob1Body: 'Crea un portafolio y toma decisiones en un entorno seguro. Aquí no se usa dinero real.',
    ob2Title: 'Prueba escenarios reales', ob2Body: 'Mira cómo podrían influir caídas de mercado, hábitos de ahorro y horizontes de tiempo — con rangos, no promesas.',
    ob3Title: 'Tu coach IA explica el porqué', ob3Body: 'Pregunta lo que quieras. Recibe explicaciones claras, nunca señales agresivas ni consejos personalizados.',
    navHome: 'Inicio', navLearn: 'Aprender', navSim: 'Simular', navCoach: 'Coach', navYou: 'Tú',
    greeting: 'Buenos días', userName: 'Sam', learningPath: 'Tu ruta de aprendizaje', conceptsMastered: 'conceptos dominados', continueLesson: 'Continuar lección', lessonName: 'Bases de diversificación', lessonMeta: 'Módulo 2 · faltan 4 min',
    practiceTitle: 'Portafolio de práctica', practiceTag: 'Simulado', practiceNote: 'Dinero virtual para aprender. No es consejo de inversión.', practiceHint: 'Valor hipotético según tus decisiones de práctica', scenarioWeek: 'Escenario de la semana', scenarioWeekTitle: '¿Qué pasa si el mercado cae 20%?', scenarioWeekBody: 'Explora cómo cambia el panorama con un horizonte largo.', tryIt: 'Probar', streak: 'días de racha',
    learnTitle: 'Aprender', learnSubtitle: 'Lecciones cortas, un concepto a la vez.', progressLabel: 'de la ruta completada', mod1: 'Dinero y mentalidad', mod1meta: 'Completado · 5 lecciones', mod2: 'Bases de diversificación', mod2meta: 'En progreso · 2 de 5', mod3: 'Entender el riesgo', mod3meta: 'Bloqueado · termina módulo 2', mod4: 'Pensamiento a largo plazo', mod4meta: 'Bloqueado', resume: 'Continuar', review: 'Repasar', locked: 'Bloqueado',
    simTitle: 'Simulador de escenarios', simSubtitle: 'Ajusta los datos para ver un rango de resultados posibles.', pickScenario: 'Elige un escenario', sc_steady: 'Ahorro constante', sc_dip: 'Caída de mercado', sc_recession: 'Recesión', sc_long: 'Horizonte largo', sc_diversified: 'Diversificado', monthly: 'Aporte mensual', horizon: 'Horizonte de tiempo', risk: 'Nivel de riesgo', years: 'años', riskLow: 'Conservador', riskMid: 'Balanceado', riskHigh: 'Crecimiento', allocation: 'Asignación sugerida', stocks: 'Acciones', bonds: 'Bonos', cash: 'Efectivo', projection: 'Rango posible en el tiempo', rangeNote: 'La banda sombreada muestra un rango plausible, no una predicción.', expected: 'Camino medio', optimistic: 'Mercados fuertes', pessimistic: 'Mercados débiles', contributed: 'aportado', disclaimer: 'Ilustración hipotética. El rendimiento pasado no predice resultados futuros.', askCoach: 'Preguntar al coach', export: 'Exportar resumen',
    coachTitle: 'Coach IA', coachStatus: 'Guía educativa', coachSafety: 'Explico conceptos con lenguaje simple. No doy asesoría financiera personalizada.', coachGreeting: 'Hola Sam — ¿qué quieres entender hoy?', suggest1: '¿Qué es diversificación?', suggest2: 'Explica mi escenario de caída', suggest3: '¿Cómo funciona el interés compuesto?', coachAnswerDiv: 'Diversificar significa repartir el dinero entre distintos tipos de inversiones para que un mal resultado no afecte todo. Es no poner todos los huevos en la misma canasta.', coachAnswerDip: 'En una caída de mercado, los precios bajan por un tiempo. Con un horizonte largo puede haber más años para una posible recuperación. El simulador muestra rangos, no garantías.', coachAnswerComp: 'El interés compuesto es crecimiento sobre crecimiento: los retornos pueden generar nuevos retornos con el tiempo. Los resultados varían porque los mercados suben y bajan.', inputPlaceholder: 'Pregunta sobre un concepto…', coachDisclaimer: 'Solo educativo · No es consejo financiero',
    adLabel: 'Anuncio', adTitle: 'Construye un fondo de emergencia', adBody: 'Guía gratuita de un socio educativo.', adCta: 'Ver guía', adWhy: '¿Por qué este anuncio?', minRead: 'min de lectura',
    accessibility: 'Accesibilidad', accessibilityOpen: 'Abrir opciones de accesibilidad', language: 'Idioma', visualSettings: 'Opciones visuales', largeText: 'Texto grande', highContrast: 'Alto contraste', reduceMotion: 'Reducir movimiento', dyslexiaFont: 'Fuente legible', labels: 'Etiquetas extra', resetSettings: 'Restablecer', close: 'Cerrar', accent: 'Color', theme: 'Tema de lecciones', adDensity: 'Densidad de anuncios', adsStandard: 'Estándar', adsMinimal: 'Mínima', adsOff: 'Oculta', dashboard: 'Panel', removeAdsFuture: 'Plan futuro sin anuncios',
  },
  he: {
    _dir: 'rtl', label: 'עברית', short: 'HE',
    splashTagline: 'לומדים להשקיע בביטחון — בלי לסכן שקל.',
    splashBody: 'מתרגלים בכסף וירטואלי, מריצים תרחישי שוק בטוחים ומקבלים הסברים פשוטים. סימולציה לימודית בלבד.',
    getStarted: 'מתחילים', haveAccount: 'כבר יש לי חשבון', eduBadge: 'לימודי • כסף לתרגול בלבד', noAdvice: 'סימולציה לימודית בלבד. ללא כסף אמיתי. לא ייעוץ פיננסי.',
    skip: 'דלג', next: 'הבא', startLearning: 'להתחיל ללמוד',
    ob1Title: 'מתרגלים בכסף וירטואלי', ob1Body: 'בונים תיק ומקבלים החלטות בסביבה בטוחה. לא משתמשים כאן בכסף אמיתי.',
    ob2Title: 'מריצים תרחישים מהעולם האמיתי', ob2Body: 'בודקים איך ירידות, חיסכון וטווח זמן עשויים להשפיע — בטווחים, לא בהבטחות.',
    ob3Title: 'מאמן ה־AI מסביר למה', ob3Body: 'שואלים כל דבר ומקבלים הסבר פשוט, בלי איתותי קנייה/מכירה ובלי לחץ.',
    navHome: 'בית', navLearn: 'לימוד', navSim: 'סימולציה', navCoach: 'מאמן', navYou: 'אני',
    greeting: 'בוקר טוב', userName: 'סם', learningPath: 'מסלול הלמידה שלך', conceptsMastered: 'מושגים שנלמדו', continueLesson: 'המשך שיעור', lessonName: 'יסודות הפיזור', lessonMeta: 'מודול 2 · נותרו 4 דקות',
    practiceTitle: 'תיק תרגול', practiceTag: 'מדומה', practiceNote: 'כסף וירטואלי ללמידה. לא ייעוץ השקעות.', practiceHint: 'ערך היפותטי לפי בחירות התרגול שלך', scenarioWeek: 'תרחיש השבוע', scenarioWeekTitle: 'מה קורה אם השוק יורד 20%?', scenarioWeekBody: 'בדקו איך טווח ארוך משנה את התמונה.', tryIt: 'נסו', streak: 'ימי רצף',
    learnTitle: 'לימוד', learnSubtitle: 'שיעורים קצרים, מושג אחד בכל פעם.', progressLabel: 'מהמסלול הושלם', mod1: 'כסף ומחשבה', mod1meta: 'הושלם · 5 שיעורים', mod2: 'יסודות הפיזור', mod2meta: 'בתהליך · 2 מתוך 5', mod3: 'הבנת סיכון', mod3meta: 'נעול · סיימו מודול 2', mod4: 'חשיבה לטווח ארוך', mod4meta: 'נעול', resume: 'המשך', review: 'חזרה', locked: 'נעול',
    simTitle: 'סימולטור תרחישים', simSubtitle: 'שנו את הנתונים כדי לראות טווח תוצאות אפשריות.', pickScenario: 'בחרו תרחיש', sc_steady: 'חיסכון קבוע', sc_dip: 'ירידת שוק', sc_recession: 'מיתון', sc_long: 'טווח ארוך', sc_diversified: 'מפוזר', monthly: 'הפקדה חודשית', horizon: 'טווח זמן', risk: 'רמת סיכון', years: 'שנים', riskLow: 'שמרני', riskMid: 'מאוזן', riskHigh: 'צמיחה', allocation: 'הקצאה מוצעת', stocks: 'מניות', bonds: 'אג״ח', cash: 'מזומן', projection: 'טווח אפשרי לאורך זמן', rangeNote: 'האזור המוצל מראה טווח אפשרי, לא תחזית.', expected: 'מסלול אמצעי', optimistic: 'שווקים חזקים', pessimistic: 'שווקים חלשים', contributed: 'הופקד', disclaimer: 'המחשה היפותטית. ביצועי עבר אינם מנבאים עתיד.', askCoach: 'שאלו את המאמן', export: 'ייצוא סיכום',
    coachTitle: 'מאמן AI', coachStatus: 'הכוונה לימודית', coachSafety: 'אני מסביר מושגים בשפה פשוטה. אינני נותן ייעוץ פיננסי אישי.', coachGreeting: 'היי סם — מה תרצה להבין היום?', suggest1: 'מהו פיזור?', suggest2: 'הסבר את תרחיש הירידה', suggest3: 'איך עובד ריבית דריבית?', coachAnswerDiv: 'פיזור אומר חלוקת כסף בין סוגי השקעות שונים כדי שתוצאה רעה אחת לא תפגע בכל התיק. זה כמו לא לשים את כל הביצים בסל אחד.', coachAnswerDip: 'בירידת שוק המחירים יורדים לזמן מסוים. בטווח ארוך ייתכן שיש יותר שנים להתאוששות. הסימולטור מציג טווח תוצאות, לא הבטחה.', coachAnswerComp: 'ריבית דריבית היא צמיחה על גבי צמיחה: תשואות יכולות ליצור תשואות נוספות לאורך זמן. התוצאות משתנות כי השווקים עולים ויורדים.', inputPlaceholder: 'שאלו על מושג…', coachDisclaimer: 'לימודי בלבד · לא ייעוץ פיננסי',
    adLabel: 'מודעה', adTitle: 'בנו קרן חירום', adBody: 'מדריך חינמי משותף לימודי.', adCta: 'למידע נוסף', adWhy: 'למה המודעה הזו?', minRead: 'דקות קריאה',
    accessibility: 'נגישות', accessibilityOpen: 'פתח אפשרויות נגישות', language: 'שפה', visualSettings: 'הגדרות תצוגה', largeText: 'טקסט גדול', highContrast: 'ניגודיות גבוהה', reduceMotion: 'הפחתת תנועה', dyslexiaFont: 'גופן קריא', labels: 'תוויות נוספות', resetSettings: 'איפוס', close: 'סגור', accent: 'צבע הדגשה', theme: 'ערכת שיעורים', adDensity: 'צפיפות מודעות', adsStandard: 'רגילה', adsMinimal: 'מינימלית', adsOff: 'כבוי', dashboard: 'לוח בקרה', removeAdsFuture: 'תוכנית עתידית ללא מודעות',
  },
  ar: {
    _dir: 'rtl', label: 'العربية', short: 'AR',
    splashTagline: 'تعلّم الاستثمار بثقة — دون المخاطرة بأي مبلغ.', splashBody: 'تدرّب بأموال افتراضية، جرّب سيناريوهات سوق آمنة، واحصل على شرح مبسّط. محاكاة تعليمية فقط.', getStarted: 'ابدأ الآن', haveAccount: 'لدي حساب', eduBadge: 'تعليمي • أموال تجريبية فقط', noAdvice: 'محاكاة تعليمية فقط. لا أموال حقيقية. ليست نصيحة مالية.',
    skip: 'تخطٍ', next: 'التالي', startLearning: 'ابدأ التعلم', ob1Title: 'تدرّب بأموال افتراضية', ob1Body: 'كوّن محفظة واتخذ قراراتك في بيئة آمنة. لا شيء هنا يستخدم أموالاً حقيقية.', ob2Title: 'جرّب سيناريوهات واقعية', ob2Body: 'شاهد كيف قد تؤثر هبوط السوق والادخار والمدة الزمنية — كنطاقات لا وعود.', ob3Title: 'مدرّب الذكاء الاصطناعي يشرح السبب', ob3Body: 'اسأل عن أي شيء واحصل على شرح بسيط، دون إشارات شراء/بيع أو ضغط.',
    navHome: 'الرئيسية', navLearn: 'تعلّم', navSim: 'محاكاة', navCoach: 'المدرّب', navYou: 'حسابي', greeting: 'صباح الخير', userName: 'سام', learningPath: 'مسار تعلّمك', conceptsMastered: 'مفهوماً أتقنته', continueLesson: 'تابع الدرس', lessonName: 'أساسيات التنويع', lessonMeta: 'الوحدة ٢ · تبقّى ٤ دقائق', practiceTitle: 'المحفظة التجريبية', practiceTag: 'محاكاة', practiceNote: 'أموال افتراضية للتعلّم. ليست نصيحة استثمارية.', practiceHint: 'قيمة افتراضية حسب اختياراتك', scenarioWeek: 'سيناريو الأسبوع', scenarioWeekTitle: 'ماذا لو هبط السوق ٢٠٪؟', scenarioWeekBody: 'اكتشف كيف يغيّر المدى الطويل الصورة.', tryIt: 'جرّبه', streak: 'يوم متتالٍ',
    learnTitle: 'تعلّم', learnSubtitle: 'دروس قصيرة، مفهوم واحد في كل مرة.', progressLabel: 'من المسار مكتمل', mod1: 'المال والعقلية', mod1meta: 'مكتمل · ٥ دروس', mod2: 'أساسيات التنويع', mod2meta: 'قيد التقدّم · ٢ من ٥', mod3: 'فهم المخاطرة', mod3meta: 'مقفل · أنهِ الوحدة ٢', mod4: 'التفكير طويل المدى', mod4meta: 'مقفل', resume: 'متابعة', review: 'مراجعة', locked: 'مقفل',
    simTitle: 'محاكي السيناريوهات', simSubtitle: 'عدّل المُدخلات لرؤية نطاق من النتائج المحتملة.', pickScenario: 'اختر سيناريو', sc_steady: 'مدّخر منتظم', sc_dip: 'هبوط السوق', sc_recession: 'ركود', sc_long: 'مدى طويل', sc_diversified: 'متنوّع', monthly: 'المساهمة الشهرية', horizon: 'المدى الزمني', risk: 'مستوى المخاطرة', years: 'سنوات', riskLow: 'متحفّظ', riskMid: 'متوازن', riskHigh: 'نمو', allocation: 'التوزيع المقترح', stocks: 'أسهم', bonds: 'سندات', cash: 'نقد', projection: 'النطاق المحتمل عبر الزمن', rangeNote: 'النطاق المظلّل يوضّح مدى محتملاً، وليس تنبؤاً.', expected: 'المسار الأوسط', optimistic: 'أسواق أقوى', pessimistic: 'أسواق أضعف', contributed: 'مساهم به', disclaimer: 'توضيح افتراضي. الأداء السابق لا يتنبأ بالنتائج المستقبلية.', askCoach: 'اسأل المدرّب', export: 'تصدير الملخص',
    coachTitle: 'المدرّب الذكي', coachStatus: 'إرشاد تعليمي', coachSafety: 'أشرح المفاهيم بلغة بسيطة. لا أقدّم نصائح مالية شخصية.', coachGreeting: 'مرحباً سام — ماذا تود أن تفهم اليوم؟', suggest1: 'ما هو التنويع؟', suggest2: 'اشرح سيناريو هبوط السوق', suggest3: 'كيف يعمل التراكم؟', coachAnswerDiv: 'التنويع يعني توزيع الأموال على أنواع مختلفة حتى لا تؤثر نتيجة سيئة واحدة على كل شيء. لا تضع كل البيض في سلة واحدة.', coachAnswerDip: 'في هبوط السوق تنخفض الأسعار لفترة. ومع مدى زمني طويل قد توجد سنوات أكثر للتعافي. المحاكي يعرض نطاقات لا ضمانات.', coachAnswerComp: 'التراكم هو نمو فوق نمو: العوائد قد تولّد عوائد إضافية مع الوقت. لكن النتائج تتغير لأن الأسواق تصعد وتهبط.', inputPlaceholder: 'اسأل عن مفهوم…', coachDisclaimer: 'تعليمي فقط · ليس نصيحة مالية',
    adLabel: 'إعلان', adTitle: 'كوّن صندوق طوارئ', adBody: 'دليل مجاني من شريك تعليمي.', adCta: 'اعرف المزيد', adWhy: 'لماذا هذا الإعلان؟', minRead: 'دقيقة قراءة',
    accessibility: 'إمكانية الوصول', accessibilityOpen: 'افتح خيارات إمكانية الوصول', language: 'اللغة', visualSettings: 'إعدادات العرض', largeText: 'نص كبير', highContrast: 'تباين عالٍ', reduceMotion: 'تقليل الحركة', dyslexiaFont: 'خط سهل القراءة', labels: 'تسميات إضافية', resetSettings: 'إعادة ضبط', close: 'إغلاق', accent: 'لون التمييز', theme: 'نمط الدروس', adDensity: 'كثافة الإعلانات', adsStandard: 'قياسي', adsMinimal: 'حد أدنى', adsOff: 'إيقاف', dashboard: 'لوحة التحكم', removeAdsFuture: 'خطة مستقبلية بلا إعلانات',
  },
  am: {
    _dir: 'ltr', label: 'አማርኛ', short: 'AM',
    splashTagline: 'በእርግጠኝነት መ投资 መማር — አንድም ሳንቲም ሳይጠፋ።', splashBody: 'በቨርቹዋል ገንዘብ ይለማመዱ፣ የገበያ ሁኔታዎችን ይፈትኑ፣ ቀላል ማብራሪያ ያግኙ። የትምህርት ሲሙሌሽን ብቻ።', getStarted: 'ጀምር', haveAccount: 'መለያ አለኝ', eduBadge: 'ትምህርታዊ • የልምምድ ገንዘብ ብቻ', noAdvice: 'የትምህርት ሲሙሌሽን ብቻ። እውነተኛ ገንዘብ የለም። የፋይናንስ ምክር አይደለም።',
    skip: 'ዝለል', next: 'ቀጣይ', startLearning: 'መማር ጀምር', ob1Title: 'በቨርቹዋል ገንዘብ ይለማመዱ', ob1Body: 'በደህና ሳንድቦክስ ፖርትፎሊዮ ይገንቡ። እውነተኛ ገንዘብ አይጠቀምም።', ob2Title: 'የእውነት ዓለም ሁኔታዎችን ይሞክሩ', ob2Body: 'የገበያ መውደቅ፣ ቁጠባ እና የጊዜ ክልል እንዴት ሊነካ እንደሚችል በክልል ይመልከቱ።', ob3Title: 'AI ኮች ምክንያቱን ያብራራል', ob3Body: 'ማንኛውንም ይጠይቁ። ቀላል ማብራሪያ ያግኙ፣ የግዢ/ሽያጭ ምልክት አይደለም።',
    navHome: 'መነሻ', navLearn: 'መማር', navSim: 'ሲሙሌት', navCoach: 'ኮች', navYou: 'እርስዎ', greeting: 'እንደምን አደሩ', userName: 'ሳም', learningPath: 'የመማር መንገድዎ', conceptsMastered: 'የተማሩ ጽንሰ-ሐሳቦች', continueLesson: 'ትምህርት ቀጥል', lessonName: 'የስርጭት መሠረቶች', lessonMeta: 'ሞጁል 2 · 4 ደቂቃ ቀረ', practiceTitle: 'የልምምድ ፖርትፎሊዮ', practiceTag: 'ሲሙሌትድ', practiceNote: 'ለመማር ቨርቹዋል ገንዘብ። የ投资 ምክር አይደለም።', practiceHint: 'በሳንድቦክስ ምርጫዎችዎ ላይ የተመሠረተ ሀሳባዊ ዋጋ', scenarioWeek: 'የሳምንቱ ሁኔታ', scenarioWeekTitle: 'ገበያው 20% ቢወድቅስ?', scenarioWeekBody: 'ረጅም ጊዜ እንዴት ምስሉን እንደሚቀይር ይመልከቱ።', tryIt: 'ሞክር', streak: 'ቀን ተከታታይ',
    learnTitle: 'መማር', learnSubtitle: 'አጭር ትምህርቶች፣ አንድ ጽንሰ-ሐሳብ በአንድ ጊዜ።', progressLabel: 'መንገድ ተጠናቋል', mod1: 'ገንዘብ እና አስተሳሰብ', mod1meta: 'ተጠናቋል · 5 ትምህርቶች', mod2: 'የስርጭት መሠረቶች', mod2meta: 'በሂደት · 2 ከ 5', mod3: 'አደጋን መረዳት', mod3meta: 'ተቆልፏል · ሞጁል 2 ጨርስ', mod4: 'ረጅም ጊዜ አስተሳሰብ', mod4meta: 'ተቆልፏል', resume: 'ቀጥል', review: 'ክለሳ', locked: 'ተቆልፏል',
    simTitle: 'የሁኔታ ሲሙሌተር', simSubtitle: 'ሊኖሩ የሚችሉ ውጤቶችን ለማየት ግቤቶችን ያስተካክሉ።', pickScenario: 'ሁኔታ ይምረጡ', sc_steady: 'ቋሚ ቁጠባ', sc_dip: 'የገበያ መውደቅ', sc_recession: 'ድቀት', sc_long: 'ረጅም ጊዜ', sc_diversified: 'የተሰራጨ', monthly: 'ወርሃዊ መዋጮ', horizon: 'የጊዜ ክልል', risk: 'የአደጋ ደረጃ', years: 'ዓመታት', riskLow: 'ጥንቃቄ', riskMid: 'ሚዛናዊ', riskHigh: 'እድገት', allocation: 'የተመከረ ስርጭት', stocks: 'አክሲዮኖች', bonds: 'ቦንዶች', cash: 'ገንዘብ', projection: 'በጊዜ ውስጥ ሊኖር የሚችል ክልል', rangeNote: 'ጥላ ያለው ክልል ሊኖር የሚችል ነው፣ ትንበያ አይደለም።', expected: 'መካከለኛ መንገድ', optimistic: 'ጠንካራ ገበያ', pessimistic: 'ደካማ ገበያ', contributed: 'የተዋጣ', disclaimer: 'ሀሳባዊ ማሳያ። ያለፈ ውጤት የወደፊትን አይተነብይም።', askCoach: 'ኮችን ጠይቅ', export: 'ማጠቃለያ አውጣ',
    coachTitle: 'AI ኮች', coachStatus: 'የትምህርት መመሪያ', coachSafety: 'ጽንሰ-ሐሳቦችን በቀላል ቋንቋ እገልጻለሁ። የግል ፋይናንስ ምክር አልሰጥም።', coachGreeting: 'ሰላም ሳም — ዛሬ ምን መረዳት ትፈልጋለህ?', suggest1: 'ስርጭት ምንድን ነው?', suggest2: 'የገበያ መውደቅ ሁኔታዬን አብራራ', suggest3: 'ኮምፓውንዲንግ እንዴት ይሰራል?', coachAnswerDiv: 'ስርጭት ማለት ገንዘብን በተለያዩ አይነት ንብረቶች መካከል መከፋፈል ነው። አንድ መጥፎ ውጤት ሁሉንም እንዳይነካ።', coachAnswerDip: 'በገበያ መውደቅ ጊዜ ዋጋዎች ለተወሰነ ጊዜ ይቀንሳሉ። ረጅም ጊዜ ለመመለስ ተጨማሪ ዓመታት ሊሰጥ ይችላል። ሲሙሌተሩ ክልል ያሳያል፣ ዋስትና አይደለም።', coachAnswerComp: 'ኮምፓውንዲንግ ማለት እድገት በእድገት ላይ ነው። ትርፎች በጊዜ ራሳቸው ትርፍ ሊፈጥሩ ይችላሉ።', inputPlaceholder: 'ስለ ጽንሰ-ሐሳብ ጠይቅ…', coachDisclaimer: 'ትምህርታዊ ብቻ · የፋይናንስ ምክር አይደለም',
    adLabel: 'ማስታወቂያ', adTitle: 'የአደጋ ገንዘብ ፈንድ ይገንቡ', adBody: 'ከትምህርት አጋር ነፃ መመሪያ።', adCta: 'ተጨማሪ ተማር', adWhy: 'ለምን ይህ ማስታወቂያ?', minRead: 'ደቂቃ ንባብ',
    accessibility: 'ተደራሽነት', accessibilityOpen: 'የተደራሽነት አማራጮችን ክፈት', language: 'ቋንቋ', visualSettings: 'የእይታ ቅንብሮች', largeText: 'ትልቅ ጽሑፍ', highContrast: 'ከፍተኛ ኮንትራስት', reduceMotion: 'እንቅስቃሴ ቀንስ', dyslexiaFont: 'ቀላል የሚነበብ ፊደል', labels: 'ተጨማሪ መለያዎች', resetSettings: 'ዳግም አስጀምር', close: 'ዝጋ', accent: 'ቀለም', theme: 'የትምህርት ቴም', adDensity: 'የማስታወቂያ ብዛት', adsStandard: 'መደበኛ', adsMinimal: 'አነስተኛ', adsOff: 'አጥፋ', dashboard: 'ዳሽቦርድ', removeAdsFuture: 'የወደፊት ማስታወቂያ ማስወገጃ',
  },
  ru: {
    _dir: 'ltr', label: 'Русский', short: 'RU',
    splashTagline: 'Учитесь инвестировать уверенно — без риска реальных денег.', splashBody: 'Практикуйтесь с виртуальными деньгами, запускайте безопасные рыночные сценарии и получайте простые объяснения. Только образовательная симуляция.', getStarted: 'Начать', haveAccount: 'У меня уже есть аккаунт', eduBadge: 'Обучение • Только учебные деньги', noAdvice: 'Только учебная симуляция. Без реальных денег. Не финансовый совет.',
    skip: 'Пропустить', next: 'Далее', startLearning: 'Начать обучение', ob1Title: 'Практика с виртуальными деньгами', ob1Body: 'Соберите портфель и принимайте решения в безопасной песочнице. Реальные средства не используются.', ob2Title: 'Запускайте реальные сценарии', ob2Body: 'Смотрите, как падения рынка, привычки сбережений и горизонт могут повлиять — диапазонами, не обещаниями.', ob3Title: 'AI-коуч объясняет причину', ob3Body: 'Задавайте вопросы и получайте понятные объяснения без сигналов покупки/продажи.',
    navHome: 'Главная', navLearn: 'Учиться', navSim: 'Симуляция', navCoach: 'Коуч', navYou: 'Вы', greeting: 'Доброе утро', userName: 'Сэм', learningPath: 'Ваш путь обучения', conceptsMastered: 'понятий освоено', continueLesson: 'Продолжить урок', lessonName: 'Основы диверсификации', lessonMeta: 'Модуль 2 · осталось 4 мин', practiceTitle: 'Учебный портфель', practiceTag: 'Симуляция', practiceNote: 'Виртуальные деньги для обучения. Не инвестиционный совет.', practiceHint: 'Гипотетическая стоимость на основе выбора в песочнице', scenarioWeek: 'Сценарий недели', scenarioWeekTitle: 'Что если рынок упадёт на 20%?', scenarioWeekBody: 'Посмотрите, как длинный горизонт меняет картину.', tryIt: 'Попробовать', streak: 'дней подряд',
    learnTitle: 'Обучение', learnSubtitle: 'Короткие уроки, по одному понятию.', progressLabel: 'пути пройдено', mod1: 'Деньги и мышление', mod1meta: 'Завершено · 5 уроков', mod2: 'Основы диверсификации', mod2meta: 'В процессе · 2 из 5', mod3: 'Понимание риска', mod3meta: 'Закрыто · завершите модуль 2', mod4: 'Долгосрочное мышление', mod4meta: 'Закрыто', resume: 'Продолжить', review: 'Повторить', locked: 'Закрыто',
    simTitle: 'Симулятор сценариев', simSubtitle: 'Настройте параметры, чтобы увидеть диапазон возможных результатов.', pickScenario: 'Выберите сценарий', sc_steady: 'Стабильные сбережения', sc_dip: 'Падение рынка', sc_recession: 'Рецессия', sc_long: 'Длинный горизонт', sc_diversified: 'Диверсификация', monthly: 'Ежемесячный взнос', horizon: 'Горизонт времени', risk: 'Уровень риска', years: 'лет', riskLow: 'Консервативный', riskMid: 'Сбалансированный', riskHigh: 'Рост', allocation: 'Предложенная аллокация', stocks: 'Акции', bonds: 'Облигации', cash: 'Кэш', projection: 'Возможный диапазон со временем', rangeNote: 'Заштрихованная область показывает диапазон, а не прогноз.', expected: 'Средний путь', optimistic: 'Сильные рынки', pessimistic: 'Слабые рынки', contributed: 'внесено', disclaimer: 'Гипотетическая иллюстрация. Прошлая доходность не предсказывает будущую.', askCoach: 'Спросить коуча', export: 'Экспорт сводки',
    coachTitle: 'AI-коуч', coachStatus: 'Образовательная помощь', coachSafety: 'Я объясняю понятия простым языком. Я не даю персональные финансовые советы.', coachGreeting: 'Привет, Сэм — что вы хотите понять сегодня?', suggest1: 'Что такое диверсификация?', suggest2: 'Объясни сценарий падения рынка', suggest3: 'Как работает сложный процент?', coachAnswerDiv: 'Диверсификация — это распределение денег между разными типами активов, чтобы один плохой результат не повлиял на всё. Это как не складывать все яйца в одну корзину.', coachAnswerDip: 'При падении рынка цены снижаются на какое-то время. При длинном горизонте может быть больше лет для восстановления. Симулятор показывает диапазон, не гарантию.', coachAnswerComp: 'Сложный процент — это рост поверх роста: доходность может сама приносить доходность со временем. Результаты меняются, потому что рынки растут и падают.', inputPlaceholder: 'Спросите о понятии…', coachDisclaimer: 'Только обучение · Не финансовый совет',
    adLabel: 'Реклама', adTitle: 'Создайте резервный фонд', adBody: 'Бесплатное руководство от образовательного партнёра.', adCta: 'Подробнее', adWhy: 'Почему эта реклама?', minRead: 'мин чтения',
    accessibility: 'Доступность', accessibilityOpen: 'Открыть настройки доступности', language: 'Язык', visualSettings: 'Визуальные настройки', largeText: 'Крупный текст', highContrast: 'Высокий контраст', reduceMotion: 'Меньше анимации', dyslexiaFont: 'Читаемый шрифт', labels: 'Доп. подписи', resetSettings: 'Сбросить', close: 'Закрыть', accent: 'Акцент', theme: 'Тема уроков', adDensity: 'Плотность рекламы', adsStandard: 'Стандарт', adsMinimal: 'Минимум', adsOff: 'Выкл', dashboard: 'Панель', removeAdsFuture: 'Будущий план без рекламы',
  },
};

const accentValues: Record<Accent, string> = { emerald: '#10d98a', mint: '#2ee6c5', indigo: '#7c8cff', amber: '#f2b53c' };
const scenarios: Record<ScenarioKey, { monthly: number; years: number; risk: RiskLevel; alloc: [number, number, number] }> = {
  steady: { monthly: 200, years: 15, risk: 1, alloc: [55, 35, 10] },
  dip: { monthly: 200, years: 10, risk: 2, alloc: [70, 22, 8] },
  recession: { monthly: 150, years: 20, risk: 0, alloc: [40, 45, 15] },
  long: { monthly: 250, years: 30, risk: 2, alloc: [80, 16, 4] },
  diversified: { monthly: 200, years: 20, risk: 1, alloc: [60, 30, 10] },
};

const defaultA11y: AccessibilityPrefs = { largeText: false, highContrast: false, reduceMotion: false, dyslexiaFont: false, labels: true };
const navScreens: Screen[] = ['home', 'learn', 'sim', 'coach', 'you'];
const lessonThemeScreens: Screen[] = ['onboarding', 'learn'];

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? { ...fallback, ...JSON.parse(value) } : fallback;
  } catch {
    return fallback;
  }
}

function projectBand(monthly: number, years: number, risk: RiskLevel) {
  const base = [0.035, 0.055, 0.075][risk];
  const spread = [0.02, 0.03, 0.04][risk];
  const make = (rate: number) => {
    const pts: number[] = [];
    for (let y = 0; y <= years; y += 1) {
      const months = y * 12;
      const r = rate / 12;
      const fv = r === 0 ? monthly * months : monthly * ((Math.pow(1 + r, months) - 1) / r);
      pts.push(fv);
    }
    return pts;
  };
  return { low: make(base - spread), mid: make(base), high: make(base + spread), contributed: monthly * 12 * years };
}

function fmt(v: number) {
  if (v >= 1000000) return `${(v / 1000000).toFixed(1)}m`;
  if (v >= 1000) return `${Math.round(v / 1000)}k`;
  return `${Math.round(v)}`;
}

export default function Index() {
  const [language, setLanguage] = useState<LanguageCode>(() => readStorage('bursapp_lang', 'en' as LanguageCode));
  const [screen, setScreen] = useState<Screen>('splash');
  const [accent, setAccent] = useState<Accent>(() => readStorage('bursapp_accent', 'emerald' as Accent));
  const [theme, setTheme] = useState<ThemeMode>(() => readStorage('bursapp_theme', 'light' as ThemeMode));
  const [adDensity, setAdDensity] = useState<AdDensity>(() => readStorage('bursapp_ads', 'standard' as AdDensity));
  const [a11y, setA11y] = useState<AccessibilityPrefs>(() => readStorage('bursapp_a11y', defaultA11y));
  const [a11yOpen, setA11yOpen] = useState(false);
  const [coachTopic, setCoachTopic] = useState<'div' | 'dip' | 'comp' | undefined>();

  const t = translations[language];
  const dir = t._dir;
  const isThemedLight = lessonThemeScreens.includes(screen) ? theme : 'dark';

  useEffect(() => { window.localStorage.setItem('bursapp_lang', JSON.stringify(language)); }, [language]);
  useEffect(() => { window.localStorage.setItem('bursapp_accent', JSON.stringify(accent)); }, [accent]);
  useEffect(() => { window.localStorage.setItem('bursapp_theme', JSON.stringify(theme)); }, [theme]);
  useEffect(() => { window.localStorage.setItem('bursapp_ads', JSON.stringify(adDensity)); }, [adDensity]);
  useEffect(() => { window.localStorage.setItem('bursapp_a11y', JSON.stringify(a11y)); }, [a11y]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  function go(next: Screen, topic?: 'div' | 'dip' | 'comp') {
    setCoachTopic(topic);
    setScreen(next);
  }

  return (
    <main
      className={`bursapp-app a11y-${a11y.highContrast ? 'contrast' : 'normal'} ${a11y.largeText ? 'a11y-large' : ''} ${a11y.reduceMotion ? 'a11y-reduce-motion' : ''} ${a11y.dyslexiaFont ? 'a11y-readable' : ''}`}
      dir={dir}
      data-theme={isThemedLight}
      style={{ '--accent': accentValues[accent] } as React.CSSProperties}
    >
      <div className="ambient" aria-hidden="true" />
      <div className="app-shell">
        <DeviceFrame>
          <StatusBar />
          <div className="app-body">
            <TopUtilityBar
              t={t}
              language={language}
              setLanguage={setLanguage}
              onA11y={() => setA11yOpen(true)}
              showLabels={a11y.labels}
            />
            <div className="screen-stage" key={screen}>
              {screen === 'splash' && <SplashScreen t={t} go={go} />}
              {screen === 'onboarding' && <OnboardingScreen t={t} go={go} />}
              {screen === 'home' && <HomeScreen t={t} go={go} adDensity={adDensity} />}
              {screen === 'learn' && <LearnScreen t={t} go={go} />}
              {screen === 'sim' && <SimulatorScreen t={t} go={go} dir={dir} />}
              {screen === 'coach' && <CoachScreen t={t} topic={coachTopic} />}
              {screen === 'you' && <ProfileScreen t={t} />}
            </div>
          </div>
          {navScreens.includes(screen) && <BottomNav active={screen} go={go} t={t} labels={a11y.labels} />}
        </DeviceFrame>

        <aside className="desktop-panel" aria-label="Bursapp design status">
          <Logo />
          <div>
            <p className="eyebrow">{t.dashboard}</p>
            <h1>{t.splashTagline}</h1>
            <p>{t.splashBody}</p>
          </div>
          <div className="desktop-card-grid">
            <MetricCard label={t.learningPath} value="42%" tone="accent" />
            <MetricCard label={t.risk} value={t.riskMid} tone="info" />
            <MetricCard label={t.adDensity} value={adDensity === 'off' ? t.adsOff : adDensity === 'minimal' ? t.adsMinimal : t.adsStandard} tone="caution" />
          </div>
          <SafetyNote>{t.noAdvice}</SafetyNote>
        </aside>
      </div>

      <AccessibilityPanel
        open={a11yOpen}
        onClose={() => setA11yOpen(false)}
        t={t}
        language={language}
        setLanguage={setLanguage}
        a11y={a11y}
        setA11y={setA11y}
        accent={accent}
        setAccent={setAccent}
        theme={theme}
        setTheme={setTheme}
        adDensity={adDensity}
        setAdDensity={setAdDensity}
      />
    </main>
  );
}

function DeviceFrame({ children }: { children: React.ReactNode }) {
  return <section className="phone" aria-label="Bursapp mobile app"><div className="notch" aria-hidden="true" /><div className="phone-screen">{children}</div></section>;
}

function StatusBar() {
  return <div className="statusbar" aria-hidden="true"><span>9:41</span><span className="status-icons">●●●</span></div>;
}

function Logo({ compact = false }: { compact?: boolean }) {
  return <div className="logo"><span className="logo-glyph"><BarChart3 size={compact ? 18 : 22} /></span>{!compact && <span>Bursapp</span>}</div>;
}

function TopUtilityBar({ t, language, setLanguage, onA11y, showLabels }: { t: Copy; language: LanguageCode; setLanguage: (l: LanguageCode) => void; onA11y: () => void; showLabels: boolean }) {
  return (
    <div className="utility-bar">
      <select aria-label={t.language} value={language} onChange={(e) => setLanguage(e.target.value as LanguageCode)}>
        {supportedLanguages.map((lng) => <option key={lng.code} value={lng.code}>{translations[lng.code].label}</option>)}
      </select>
      <button className="icon-btn" onClick={onA11y} aria-label={t.accessibilityOpen} title={t.accessibilityOpen}>
        <Eye size={17} />{showLabels && <span>{t.accessibility}</span>}
      </button>
    </div>
  );
}

function SplashScreen({ t, go }: { t: Copy; go: (s: Screen) => void }) {
  return (
    <ScreenPad className="splash-screen">
      <div className="splash-center">
        <Logo />
        <h1 className="display-title">{t.splashTagline}</h1>
        <p className="lead">{t.splashBody}</p>
        <Badge icon={<ShieldCheck size={15} />}>{t.eduBadge}</Badge>
      </div>
      <div className="action-stack">
        <Button onClick={() => go('onboarding')} icon={<ArrowRight size={18} />}>{t.getStarted}</Button>
        <Button variant="ghost" onClick={() => go('home')}>{t.haveAccount}</Button>
        <SafetyNote>{t.noAdvice}</SafetyNote>
      </div>
    </ScreenPad>
  );
}

function OnboardingScreen({ t, go }: { t: Copy; go: (s: Screen) => void }) {
  const [step, setStep] = useState(0);
  const steps = [
    { icon: <Sparkles />, title: t.ob1Title, body: t.ob1Body, art: 'bars' },
    { icon: <LineChart />, title: t.ob2Title, body: t.ob2Body, art: 'line' },
    { icon: <Bot />, title: t.ob3Title, body: t.ob3Body, art: 'chat' },
  ];
  const current = steps[step];
  const last = step === steps.length - 1;
  return (
    <ScreenPad className="onboarding-screen">
      <div className="screen-top"><Logo compact /><button className="text-btn" onClick={() => go('home')}>{t.skip}</button></div>
      <div className="onboard-content">
        <OnboardArt kind={current.art} />
        <div className="onboard-icon">{current.icon}</div>
        <h2>{current.title}</h2>
        <p>{current.body}</p>
      </div>
      <div>
        <div className="progress-dots">{steps.map((_, i) => <span key={i} className={i === step ? 'active' : ''} />)}</div>
        <Button onClick={() => last ? go('home') : setStep(step + 1)} icon={!last ? <ArrowRight size={18} /> : <Check size={18} />}>{last ? t.startLearning : t.next}</Button>
      </div>
    </ScreenPad>
  );
}

function HomeScreen({ t, go, adDensity }: { t: Copy; go: (s: Screen, topic?: 'div' | 'dip' | 'comp') => void; adDensity: AdDensity }) {
  return (
    <ScrollScreen>
      <header className="home-header">
        <div><p className="muted small">{t.greeting},</p><h1>{t.userName} 👋</h1></div>
        <div className="streak"><Zap size={18} /><strong>7</strong></div>
      </header>
      <Card className="learning-card">
        <ProgressRing value={42} label="path" />
        <div><h2>{t.learningPath}</h2><p>14 {t.conceptsMastered}</p><Button size="sm" variant="pill" onClick={() => go('learn')} icon={<ChevronRight size={16} />}>{t.continueLesson}</Button></div>
      </Card>
      <Card interactive onClick={() => go('learn')} className="row-card">
        <span className="tile accent"><Play size={18} /></span><div><strong>{t.lessonName}</strong><p>{t.lessonMeta}</p></div><ChevronRight className="row-arrow" size={20} />
      </Card>
      <Card>
        <div className="card-head"><h2>{t.practiceTitle}</h2><Badge tone="neutral" icon={<Info size={14} />}>{t.practiceTag}</Badge></div>
        <div className="portfolio-row"><div><strong className="big-number">10,240</strong><p>{t.practiceHint}</p></div><MiniSparkline /></div>
        <SafetyNote>{t.practiceNote}</SafetyNote>
      </Card>
      <AdPlaceholder t={t} density={adDensity} />
      <Card interactive accent onClick={() => go('sim')} className="scenario-card">
        <p className="eyebrow"><Target size={15} /> {t.scenarioWeek}</p>
        <h2>{t.scenarioWeekTitle}</h2>
        <p>{t.scenarioWeekBody}</p>
        <Button size="sm" onClick={() => go('sim')} icon={<ArrowRight size={16} />}>{t.tryIt}</Button>
      </Card>
    </ScrollScreen>
  );
}

function LearnScreen({ t, go }: { t: Copy; go: (s: Screen) => void }) {
  const modules = [
    { title: t.mod1, meta: t.mod1meta, state: 'done', icon: <Check /> },
    { title: t.mod2, meta: t.mod2meta, state: 'active', icon: <BookOpen /> },
    { title: t.mod3, meta: t.mod3meta, state: 'locked', icon: <ShieldCheck /> },
    { title: t.mod4, meta: t.mod4meta, state: 'locked', icon: <Moon /> },
  ];
  return (
    <ScrollScreen>
      <h1>{t.learnTitle}</h1><p className="muted">{t.learnSubtitle}</p>
      <Card className="learning-card"><ProgressRing value={42} /><div><h2>42% {t.progressLabel}</h2><p>14 / 33 lessons</p></div></Card>
      <div className="module-list">
        {modules.map((m, i) => <Card key={i} interactive={m.state !== 'locked'} onClick={() => m.state !== 'locked' && go('learn')} className={`module ${m.state}`}><span className="tile">{m.icon}</span><div><strong>{m.title}</strong><p>{m.meta}</p>{m.state === 'active' && <span className="mini-progress"><i style={{ width: '40%' }} /></span>}</div><em>{m.state === 'done' ? t.review : m.state === 'active' ? t.resume : t.locked}</em></Card>)}
      </div>
    </ScrollScreen>
  );
}

function SimulatorScreen({ t, go, dir }: { t: Copy; go: (s: Screen, topic?: 'div' | 'dip' | 'comp') => void; dir: Dir }) {
  const [scenario, setScenario] = useState<ScenarioKey>('diversified');
  const [monthly, setMonthly] = useState(200);
  const [years, setYears] = useState(20);
  const [risk, setRisk] = useState<RiskLevel>(1);
  const preset = scenarios[scenario];
  const alloc = useMemo<[number, number, number]>(() => {
    const shift = (risk - 1) * 12;
    const stocks = Math.max(20, Math.min(90, preset.alloc[0] + shift));
    const cash = Math.max(4, preset.alloc[2] - Math.round(shift / 3));
    return [stocks, 100 - stocks - cash, cash];
  }, [preset, risk]);
  const band = useMemo(() => projectBand(monthly, years, risk), [monthly, years, risk]);
  const labels = [t.riskLow, t.riskMid, t.riskHigh];
  const chips: Array<[ScenarioKey, string]> = [['steady', t.sc_steady], ['dip', t.sc_dip], ['recession', t.sc_recession], ['long', t.sc_long], ['diversified', t.sc_diversified]];
  function apply(key: ScenarioKey) { const p = scenarios[key]; setScenario(key); setMonthly(p.monthly); setYears(p.years); setRisk(p.risk); }
  function exportSummary() {
    const rows = [['metric', 'value'], ['monthly', monthly], ['years', years], ['risk', labels[risk]], ['stocks', `${alloc[0]}%`], ['bonds', `${alloc[1]}%`], ['cash', `${alloc[2]}%`], ['expected', Math.round(band.mid[band.mid.length - 1])]];
    const csv = rows.map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'bursapp-practice-summary.csv'; link.click(); URL.revokeObjectURL(url);
  }
  return (
    <ScrollScreen>
      <h1>{t.simTitle}</h1><p className="muted">{t.simSubtitle}</p>
      <p className="eyebrow">{t.pickScenario}</p>
      <div className="chip-row">{chips.map(([key, label]) => <button key={key} onClick={() => apply(key)} className={`chip ${scenario === key ? 'selected' : ''}`}>{label}</button>)}</div>
      <Card className="slider-card">
        <RangeInput label={t.monthly} value={monthly} min={50} max={500} step={10} suffix="pts" onChange={setMonthly} dir={dir} />
        <RangeInput label={t.horizon} value={years} min={5} max={35} step={1} suffix={t.years} onChange={setYears} dir={dir} />
        <div><div className="range-label"><span>{t.risk}</span><strong>{labels[risk]}</strong></div><div className="risk-buttons">{labels.map((label, i) => <button key={label} className={risk === i ? 'active' : ''} onClick={() => setRisk(i as RiskLevel)}>{label}</button>)}</div></div>
      </Card>
      <Card><h2>{t.allocation}</h2><div className="allocation-layout"><AllocationDonut alloc={alloc} /><div className="legend-list">{[[t.stocks, alloc[0]], [t.bonds, alloc[1]], [t.cash, alloc[2]]].map(([label, value], i) => <p key={String(label)}><span className={`legend-dot d${i}`} /> <span>{label}</span><strong>{value}%</strong></p>)}</div></div></Card>
      <Card><h2>{t.projection}</h2><RangeChart band={band} years={years} dir={dir} /><p className="muted small">{t.rangeNote}</p><div className="result-row"><MetricCard label={t.contributed} value={fmt(band.contributed)} tone="info" /><MetricCard label={t.expected} value={fmt(band.mid[band.mid.length - 1])} tone="accent" /></div></Card>
      <SafetyNote>{t.disclaimer}</SafetyNote>
      <div className="dual-actions"><Button variant="secondary" onClick={() => go('coach', 'dip')} icon={<Bot size={17} />}>{t.askCoach}</Button><Button variant="ghost" onClick={exportSummary} icon={<Download size={17} />}>{t.export}</Button></div>
    </ScrollScreen>
  );
}

function CoachScreen({ t, topic }: { t: Copy; topic?: 'div' | 'dip' | 'comp' }) {
  const answers = { div: t.coachAnswerDiv, dip: t.coachAnswerDip, comp: t.coachAnswerComp };
  const suggestions = [{ q: t.suggest1, key: 'div' as const }, { q: t.suggest2, key: 'dip' as const }, { q: t.suggest3, key: 'comp' as const }];
  const [thread, setThread] = useState<Array<{ from: 'coach' | 'user'; text: string }>>([{ from: 'coach', text: t.coachGreeting }]);
  const [used, setUsed] = useState<string[]>([]);
  function ask(s: typeof suggestions[number]) { setThread((p) => [...p, { from: 'user', text: s.q }, { from: 'coach', text: answers[s.key] }]); setUsed((u) => [...u, s.key]); }
  useEffect(() => { if (topic && !used.includes(topic)) { const s = suggestions.find((x) => x.key === topic); if (s) ask(s); } }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="coach-screen">
      <header className="coach-head"><span className="tile accent"><Sparkles size={22} /></span><div><h1>{t.coachTitle}</h1><p>{t.coachStatus}</p></div></header>
      <SafetyNote>{t.coachSafety}</SafetyNote>
      <div className="chat-list">{thread.map((m, i) => <div key={i} className={`bubble ${m.from}`}>{m.text}</div>)}</div>
      <div className="suggestions">{suggestions.filter((s) => !used.includes(s.key)).map((s) => <button key={s.key} onClick={() => ask(s)}>{s.q}</button>)}</div>
      <div className="coach-input"><input aria-label={t.inputPlaceholder} placeholder={t.inputPlaceholder} disabled /><button aria-label={t.coachDisclaimer}><ArrowRight size={18} /></button></div>
    </div>
  );
}

function ProfileScreen({ t }: { t: Copy }) {
  return <ScrollScreen><h1>{t.navYou}</h1><Card className="learning-card"><span className="avatar">S</span><div><h2>{t.userName}</h2><p>{t.eduBadge}</p></div></Card><div className="result-row"><MetricCard label={t.streak} value="7" tone="caution" /><MetricCard label={t.conceptsMastered} value="14" tone="accent" /></div><Card><h2>{t.removeAdsFuture}</h2><p className="muted">{t.noAdvice}</p></Card></ScrollScreen>;
}

function AccessibilityPanel(props: {
  open: boolean; onClose: () => void; t: Copy; language: LanguageCode; setLanguage: (l: LanguageCode) => void; a11y: AccessibilityPrefs; setA11y: (p: AccessibilityPrefs) => void; accent: Accent; setAccent: (a: Accent) => void; theme: ThemeMode; setTheme: (t: ThemeMode) => void; adDensity: AdDensity; setAdDensity: (d: AdDensity) => void;
}) {
  const { open, onClose, t, language, setLanguage, a11y, setA11y, accent, setAccent, theme, setTheme, adDensity, setAdDensity } = props;
  const toggle = (key: keyof AccessibilityPrefs) => setA11y({ ...a11y, [key]: !a11y[key] });
  if (!open) return null;
  return (
    <div className="drawer-backdrop" role="dialog" aria-modal="true" aria-label={t.accessibility}>
      <div className="drawer">
        <div className="drawer-head"><h2><Eye size={20} /> {t.accessibility}</h2><button className="icon-btn" onClick={onClose} aria-label={t.close}><X size={18} /></button></div>
        <label className="field"><span>{t.language}</span><select value={language} onChange={(e) => setLanguage(e.target.value as LanguageCode)}>{supportedLanguages.map((lng) => <option key={lng.code} value={lng.code}>{translations[lng.code].label}</option>)}</select></label>
        <section><p className="eyebrow">{t.visualSettings}</p><Toggle label={t.largeText} active={a11y.largeText} onClick={() => toggle('largeText')} /><Toggle label={t.highContrast} active={a11y.highContrast} onClick={() => toggle('highContrast')} /><Toggle label={t.reduceMotion} active={a11y.reduceMotion} onClick={() => toggle('reduceMotion')} /><Toggle label={t.dyslexiaFont} active={a11y.dyslexiaFont} onClick={() => toggle('dyslexiaFont')} /><Toggle label={t.labels} active={a11y.labels} onClick={() => toggle('labels')} /></section>
        <label className="field"><span>{t.accent}</span><select value={accent} onChange={(e) => setAccent(e.target.value as Accent)}><option value="emerald">Emerald</option><option value="mint">Mint</option><option value="indigo">Indigo</option><option value="amber">Amber</option></select></label>
        <label className="field"><span>{t.theme}</span><select value={theme} onChange={(e) => setTheme(e.target.value as ThemeMode)}><option value="light">Light</option><option value="dark">Dark</option></select></label>
        <label className="field"><span>{t.adDensity}</span><select value={adDensity} onChange={(e) => setAdDensity(e.target.value as AdDensity)}><option value="standard">{t.adsStandard}</option><option value="minimal">{t.adsMinimal}</option><option value="off">{t.adsOff}</option></select></label>
        <Button variant="ghost" onClick={() => setA11y(defaultA11y)} icon={<RotateCcw size={17} />}>{t.resetSettings}</Button>
      </div>
    </div>
  );
}

function Toggle({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) { return <button className={`toggle ${active ? 'on' : ''}`} onClick={onClick}><span>{label}</span><i>{active ? 'On' : 'Off'}</i></button>; }
function ScreenPad({ children, className = '' }: { children: React.ReactNode; className?: string }) { return <section className={`screen-pad ${className}`}>{children}</section>; }
function ScrollScreen({ children }: { children: React.ReactNode }) { return <section className="scroll-screen">{children}</section>; }
function Card({ children, className = '', interactive, accent, onClick }: { children: React.ReactNode; className?: string; interactive?: boolean; accent?: boolean; onClick?: () => void }) { return <article className={`b-card ${className} ${interactive ? 'interactive' : ''} ${accent ? 'accent-card' : ''}`} onClick={onClick}>{children}</article>; }
function Badge({ children, icon, tone = 'accent' }: { children: React.ReactNode; icon?: React.ReactNode; tone?: 'accent' | 'neutral' }) { return <span className={`badge ${tone}`}>{icon}{children}</span>; }
function Button({ children, onClick, icon, variant = 'primary', size = 'md' }: { children: React.ReactNode; onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; icon?: React.ReactNode; variant?: 'primary' | 'secondary' | 'ghost' | 'pill'; size?: 'sm' | 'md' }) { return <button className={`b-btn ${variant} ${size}`} onClick={onClick}>{children}{icon}</button>; }
function SafetyNote({ children }: { children: React.ReactNode }) { return <p className="safety"><ShieldCheck size={15} />{children}</p>; }
function ProgressRing({ value, label }: { value: number; label?: string }) { const style = { '--pct': value } as React.CSSProperties; return <div className="progress-ring" style={style}><span>{value}%</span>{label && <em>{label}</em>}</div>; }
function MetricCard({ label, value, tone }: { label: string; value: string; tone: 'accent' | 'info' | 'caution' }) { return <div className={`metric ${tone}`}><span>{label}</span><strong>{value}</strong></div>; }
function OnboardArt({ kind }: { kind: string }) { return <div className={`onboard-art ${kind}`}><MiniSparkline />{kind === 'chat' && <><span className="chat-pill">AI coach</span><span className="chat-line" /></>}</div>; }
function MiniSparkline() { return <svg className="sparkline" viewBox="0 0 120 44" aria-hidden="true"><path d="M0 30 C20 26 30 34 50 28 C70 22 80 26 100 16 L120 12" /></svg>; }
function AllocationDonut({ alloc }: { alloc: [number, number, number] }) { const [a, b] = alloc; return <div className="donut" style={{ background: `conic-gradient(var(--accent) 0 ${a}%, var(--info) ${a}% ${a + b}%, var(--surface-3) ${a + b}% 100%)` }}><span>{a}%</span><em>stocks</em></div>; }
function RangeInput({ label, value, min, max, step, suffix, onChange, dir }: { label: string; value: number; min: number; max: number; step: number; suffix: string; onChange: (v: number) => void; dir: Dir }) { return <label className="range-control"><span className="range-label"><span>{label}</span><strong>{value} {suffix}</strong></span><input dir="ltr" aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} style={{ direction: dir }} /></label>; }
function RangeChart({ band, years, dir }: { band: ReturnType<typeof projectBand>; years: number; dir: Dir }) {
  const W = 280, H = 128, max = Math.max(...band.high), n = band.mid.length;
  const x = (i: number) => (dir === 'rtl' ? 1 - i / (n - 1) : i / (n - 1)) * W;
  const y = (v: number) => 10 + (1 - v / max) * 96;
  const line = (arr: number[]) => arr.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
  const area = `${line(band.high)} ${[...band.low].reverse().map((v, i) => `L ${x(n - 1 - i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')} Z`;
  return <svg className="range-chart" viewBox={`0 0 ${W} ${H}`} aria-label={`${years} years projection`}><path className="band" d={area} /><path className="high" d={line(band.high)} /><path className="low" d={line(band.low)} /><path className="mid" d={line(band.mid)} /></svg>;
}
function AdPlaceholder({ t, density }: { t: Copy; density: AdDensity }) { if (density === 'off') return null; return <div className={`ad-placeholder ${density}`}><span>{t.adLabel}</span><div><strong>{t.adTitle}</strong>{density !== 'minimal' && <p>{t.adBody}</p>}</div><em>{t.adCta}</em></div>; }
function BottomNav({ active, go, t, labels }: { active: Screen; go: (s: Screen) => void; t: Copy; labels: boolean }) {
  const items: Array<[Screen, string, React.ReactNode]> = [['home', t.navHome, <Home />], ['learn', t.navLearn, <BookOpen />], ['sim', t.navSim, <LineChart />], ['coach', t.navCoach, <Bot />], ['you', t.navYou, <User />]];
  return <nav className="bottom-nav" aria-label="Main navigation">{items.map(([s, label, icon]) => <button key={s} className={active === s ? 'active' : ''} onClick={() => go(s)} aria-label={label}>{icon}{labels && <span>{label}</span>}</button>)}</nav>;
}
