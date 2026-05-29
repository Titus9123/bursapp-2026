export type LanguageCode = 'en' | 'es' | 'he' | 'ar' | 'am' | 'ru';

export type AssetProfile = {
  id: string;
  name: string;
  category: 'index' | 'technology' | 'green' | 'dividend' | 'bonds' | 'volatile';
  basePrice: number;
  volatility: number;
  aiNote: string;
};

export type Lesson = {
  id: string;
  level: 'beginner' | 'intermediate';
  title: Record<LanguageCode, string>;
  summary: Record<LanguageCode, string>;
  minutes: number;
};

export type QuizQuestion = {
  id: string;
  prompt: Record<LanguageCode, string>;
  options: Record<LanguageCode, string[]>;
  answerIndex: number;
  explanation: Record<LanguageCode, string>;
};

export const supportedLanguages: Array<{ code: LanguageCode; name: string; dir: 'ltr' | 'rtl' }> = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'es', name: 'Español', dir: 'ltr' },
  { code: 'he', name: 'עברית', dir: 'rtl' },
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'am', name: 'አማርኛ', dir: 'ltr' },
  { code: 'ru', name: 'Русский', dir: 'ltr' },
];

export const assets: AssetProfile[] = [
  { id: 'global-index', name: 'Global Index Basket', category: 'index', basePrice: 100, volatility: 0.8, aiNote: 'Broad basket. Lower drama, useful for diversification practice.' },
  { id: 'ai-infra', name: 'AI Infrastructure Basket', category: 'technology', basePrice: 145, volatility: 1.35, aiNote: 'Higher growth narrative, higher volatility. Good for risk lessons.' },
  { id: 'green-grid', name: 'Green Energy Basket', category: 'green', basePrice: 82, volatility: 1.15, aiNote: 'Policy-sensitive basket. Watch scenario changes.' },
  { id: 'cashflow-dividend', name: 'Dividend Cashflow Basket', category: 'dividend', basePrice: 74, volatility: 0.65, aiNote: 'Steadier profile. Useful for comparing income vs growth behavior.' },
  { id: 'bond-shield', name: 'Bond Shield Fund', category: 'bonds', basePrice: 51, volatility: 0.4, aiNote: 'Low volatility. Helps explain defensive allocation.' },
  { id: 'moonshot', name: 'Moonshot Volatility Basket', category: 'volatile', basePrice: 34, volatility: 2.1, aiNote: 'Extreme swings. Designed to teach position sizing, not speculation.' },
];

export const lessons: Lesson[] = [
  {
    id: 'risk-before-return',
    level: 'beginner',
    minutes: 4,
    title: {
      en: 'Risk before return', es: 'Riesgo antes que retorno', he: 'סיכון לפני תשואה', ar: 'المخاطر قبل العائد', am: 'ከትርፍ በፊት አደጋ', ru: 'Риск перед доходностью'
    },
    summary: {
      en: 'Learn why beginners should measure downside, concentration and volatility before chasing gains.',
      es: 'Aprende por qué conviene medir caída, concentración y volatilidad antes de buscar ganancias.',
      he: 'למדו למה חשוב למדוד ירידה, ריכוזיות ותנודתיות לפני רדיפה אחרי רווחים.',
      ar: 'تعلّم لماذا يجب قياس الهبوط والتركيز والتقلب قبل البحث عن الربح.',
      am: 'ትርፍ ከመፈለግ በፊት ዝቅተኛ አደጋን እና ተለዋዋጭነትን መለካት ለምን እንደሚጠቅም ይማሩ።',
      ru: 'Почему новичкам важно оценивать просадку, концентрацию и волатильность до поиска прибыли.'
    }
  },
  {
    id: 'diversification',
    level: 'beginner',
    minutes: 5,
    title: {
      en: 'Diversification in plain language', es: 'Diversificación en palabras simples', he: 'פיזור בשפה פשוטה', ar: 'التنويع ببساطة', am: 'ቀላል የተለያየ ኢንቨስትመንት', ru: 'Диверсификация простыми словами'
    },
    summary: {
      en: 'Use the simulator to see how one concentrated position changes your portfolio behavior.',
      es: 'Usa el simulador para ver cómo una posición concentrada cambia el comportamiento del portafolio.',
      he: 'השתמשו בסימולטור כדי לראות איך פוזיציה מרוכזת משנה את התיק.',
      ar: 'استخدم المحاكي لترى كيف يغيّر التركيز في أصل واحد سلوك المحفظة.',
      am: 'አንድ ቦታ ላይ መ集中 ፖርትፎሊዮን እንዴት እንደሚቀይር በሲሙሌተሩ ይመልከቱ።',
      ru: 'Посмотрите в симуляторе, как концентрация в одной позиции меняет поведение портфеля.'
    }
  },
  {
    id: 'ai-scenario-reading',
    level: 'intermediate',
    minutes: 6,
    title: {
      en: 'Reading AI market scenarios safely', es: 'Leer escenarios de mercado con IA de forma segura', he: 'קריאת תרחישי שוק עם AI בבטחה', ar: 'قراءة سيناريوهات السوق بالذكاء الاصطناعي بأمان', am: 'የAI ገበያ ሁኔታዎችን በደህና መተርጎም', ru: 'Как безопасно читать AI-сценарии рынка'
    },
    summary: {
      en: 'AI can summarize risk factors, but it should not be treated as a buy/sell signal.',
      es: 'La IA puede resumir factores de riesgo, pero no debe tratarse como señal de compra/venta.',
      he: 'AI יכול לסכם גורמי סיכון, אבל לא לשמש כהמלצת קנייה/מכירה.',
      ar: 'يمكن للذكاء الاصطناعي تلخيص عوامل الخطر، لكنه ليس إشارة شراء أو بيع.',
      am: 'AI የአደጋ ምክንያቶችን ሊያጠቃልል ይችላል፣ ግን የግዢ/ሽያጭ ምልክት አይደለም።',
      ru: 'AI может объяснять риски, но не должен восприниматься как сигнал покупать или продавать.'
    }
  }
];

export const quiz: QuizQuestion[] = [
  {
    id: 'q-risk',
    answerIndex: 1,
    prompt: {
      en: 'A portfolio has 80% in one volatile asset. What is the main concern?',
      es: 'Un portafolio tiene 80% en un activo volátil. ¿Cuál es la principal preocupación?',
      he: 'תיק עם 80% בנכס תנודתי אחד. מה החשש המרכזי?',
      ar: 'محفظة فيها 80٪ في أصل متقلب واحد. ما القلق الرئيسي؟',
      am: 'ፖርትፎሊዮ 80% በአንድ ተለዋዋጭ ንብረት ውስጥ ነው። ዋናው ስጋት ምንድን ነው?',
      ru: 'В портфеле 80% в одном волатильном активе. Главный риск?'
    },
    options: {
      en: ['Too much diversification', 'Concentration risk', 'No risk because it can rise', 'Guaranteed income'],
      es: ['Demasiada diversificación', 'Riesgo de concentración', 'No hay riesgo porque puede subir', 'Ingreso garantizado'],
      he: ['יותר מדי פיזור', 'סיכון ריכוזיות', 'אין סיכון כי זה יכול לעלות', 'הכנסה מובטחת'],
      ar: ['تنويع زائد', 'خطر التركيز', 'لا يوجد خطر لأنه قد يرتفع', 'دخل مضمون'],
      am: ['በጣም ብዙ ስርጭት', 'የመ集中 አደጋ', 'ሊጨምር ስለሚችል አደጋ የለም', 'የተረጋገጠ ገቢ'],
      ru: ['Слишком много диверсификации', 'Риск концентрации', 'Риска нет, потому что может вырасти', 'Гарантированный доход']
    },
    explanation: {
      en: 'A concentrated position can dominate outcomes. The simulator shows how volatility affects the whole portfolio.',
      es: 'Una posición concentrada puede dominar los resultados. El simulador muestra cómo la volatilidad afecta todo el portafolio.',
      he: 'פוזיציה מרוכזת יכולה לשלוט בתוצאה. הסימולטור מראה איך תנודתיות משפיעה על כל התיק.',
      ar: 'المركز المركّز قد يسيطر على النتائج. يوضح المحاكي كيف يؤثر التقلب على المحفظة كلها.',
      am: 'የተ集中 ቦታ ውጤቱን ሊቆጣጠር ይችላል። ሲሙሌተሩ ተለዋዋጭነት ፖርትፎሊዮውን እንዴት እንደሚነካ ያሳያል።',
      ru: 'Концентрированная позиция может определять результат. Симулятор показывает влияние волатильности на весь портфель.'
    }
  }
];
