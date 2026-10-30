/**
 * Bilingual copy for the whole site. Every visitor-facing string lives here,
 * duplicated under `en` and `es` — edit both to keep the languages in sync.
 * Add a new top-level key (e.g. "fr") and translate every string to add a language;
 * then add it to SITE_CONFIG.supportedLanguages in config.js.
 */
const TRANSLATIONS = {
  en: {
    brand: {
      name: "The Financial Talk",
      monogram: "FT",
    },
    nav: {
      home: "Home",
      about: "About",
      whatsNew: "What's new",
      services: "Tools",
      resources: "Resources",
      events: "Events",
      getInvolved: "Get Involved",
      contact: "Contact",
      cta: "Get in touch",
    },
    whatsNew: {
      hero: {
        eyebrow: "What's new",
        title: "What's new",
        subtitle: "News, announcements, and the latest from The Financial Talk.",
      },
      empty: "No announcements yet — check back soon.",
      tiktok: {
        title: "Latest on TikTok",
        subtitle: "Quick money tips and stories from The Financial Talk.",
        cta: "Follow @thefinancialtalk on TikTok",
      },
    },
    lang: { label: "Language" },
    theme: {
      label: "Color palette",
      midnightPlumGold: "Midnight Plum & Gold",
      fuchsiaGold: "Fuchsia & Gold",
      terracottaTurquesa: "Terracotta & Turquoise",
      violetaCoral: "Violet & Coral",
    },
    home: {
      hero: {
        eyebrow: "Your money story, told in your own voice.",
        title: "Your money story, told in your own voice.",
        titleHtml: "Your money story, told in <span class=\"accent\">your own voice.</span>",
        subtitle:
          "Bilingual financial education that blends smart modern money tools with the values your family raised you on — so you can build wealth without losing who you are.",
        ctaPrimary: "Book a Consultation",
        ctaSecondary: "Explore Services",
        trust: ["Bilingual (EN / ES)", "Judgment-free space", "Culturally rooted"],
      },
      stats: [
        { title: "Bilingual", desc: "Education available in English and Spanish" },
        { title: "Culturally Rooted", desc: "Advice that respects family and community values" },
        { title: "Judgment-Free", desc: "A safe space to ask every money question" },
      ],
      about: {
        eyebrow: "Breaking cycles. Building legacies.",
        title: "Breaking cycles. Building legacies.",
        body: "This space was built for women who grew up hearing that money wasn't something we talked about — and who are ready to change that story for the next generation. Here you'll find practical tools, honest conversations, and a community that gets it.",
        cta: "Read the full story",
        photoAlt: "Portrait of Nathaly, founder of The Financial Talk, smiling, holding a laptop",
      },
      services: {
        eyebrow: "Support for every stage of your money journey",
        title: "Support for every stage of your money journey",
        subtitle: "From your first budget to your first investment portfolio.",
        items: [
          {
            title: "1:1 Education",
            desc: "Personalized sessions to build a plan around your real life and goals.",
          },
          {
            title: "Group Workshops",
            desc: "Community learning experiences on budgeting, credit, and investing.",
          },
          {
            title: "Digital Guides",
            desc: "Bilingual worksheets and courses you can work through at your own pace.",
          },
        ],
        cta: "See all services",
      },
      testimonials: {
        eyebrow: "Real stories, real progress",
        title: "Real stories, real progress",
        items: [
          {
            quote:
              "“I finally understand my money without feeling ashamed of what I didn't know. This changed everything.”",
            name: "Daniela R.",
            role: "Small business owner",
          },
          {
            quote:
              "“Having financial education in Spanish for my mom and English for me meant we could finally plan together.”",
            name: "Vanessa M.",
            role: "First-generation graduate",
          },
          {
            quote:
              "“The workshops felt like sitting with family, not a lecture. I actually stuck with my budget.”",
            name: "Camila T.",
            role: "New homeowner",
          },
        ],
      },
      partners: {
        eyebrow: "Brands & partners I work with",
        title: "Brands & partners I work with",
      },
      updates: {
        eyebrow: "What's new",
        title: "What's new",
        empty: "No announcements yet — check back soon.",
      },
      faq: {
        eyebrow: "Questions? Answered.",
        title: "Questions? Answered.",
        subtitle: "The things people usually ask before we start working together.",
        items: [
          {
            q: "Do I need to be “good with money” to start?",
            a: "Not at all. Most people I work with feel behind or overwhelmed — that's exactly what this education is for. We start wherever you are, with zero judgment.",
          },
          {
            q: "Can we meet in Spanish?",
            a: "Yes. Every session, worksheet, and resource is available in English and Spanish — whatever feels most comfortable for you and your family.",
          },
          {
            q: "How much does it cost?",
            a: "It depends on the format you choose. The easiest way to see options and pricing is to book a consultation — session types and prices are shown when you pick a time.",
          },
          {
            q: "What happens on the first call?",
            a: "It's a relaxed, no-pressure conversation about where you are, what you want, and whether working together feels like the right fit. No commitment required.",
          },
          {
            q: "Do you offer workshops for groups?",
            a: "Absolutely. I run bilingual group workshops for teams, community organizations, and families on budgeting, credit, and investing — reach out and I'll tailor one.",
          },
        ],
      },
      ctaBanner: {
        title: "Ready to write your own money story?",
        subtitle: "Let's talk about where you want to go — and how I can help you get there.",
        button: "Book a Consultation",
      },
    },
    about: {
      hero: {
        eyebrow: "Empowering Your Financial Future",
        title: "Empowering Your Financial Future",
        subtitle:
          "A bicultural approach to money that honors where you come from and where you're going.",
      },
      story: {
        eyebrow: "Welcome — I'm glad you're here",
        title: "Welcome — I'm glad you're here",
        intro1:
          "Ten years ago, I embarked on a transformative journey by immigrating from the vibrant coastal city of Guayaquil, Ecuador, to Canada. Relocating to a new country required immense resilience, as I adapted to an unfamiliar culture and economic system. Rather than viewing these initial challenges as barriers, I embraced them as opportunities for personal growth.",
        intro2:
          "To build a strong foundation for my future, I dedicated myself to academic excellence, earning a Bachelor of Business Economics with Honours. This rigorous programme deepened my understanding of market dynamics, economic theory, and fiscal structures. More importantly, it ignited my passion for financial empowerment and revealed the vital role that financial literacy plays in personal stability. Alongside my bachelor's degree, I hold a certification in Advanced Financial Advice from the Canadian Securities Institute, and I am working toward becoming a Certified Financial Planner (CFP).",
        photoAlt: "Portrait of Nathaly, founder of The Financial Talk, smiling, seated",
        masteringTitle: "Mastering the landscape",
        masteringBody:
          "A new money system was a lot to learn. I took my time and learned how money really works in Canada, step by step:",
        masteringItems: [
          "<strong>Debt:</strong> I paid off my student loan, credit cards, and other debt before it could eat into my income.",
          "<strong>Growing my money:</strong> I learned to invest with intention and put my money to work toward my goals.",
          "<strong>Buying a home:</strong> I learned the path to ownership and bought my own first home here.",
          "<strong>Taxes:</strong> I learned to file the right way and keep more of what I earned.",
        ],
        masteringClose:
          "Reaching these goals showed me that steady effort pays off. It also showed me my purpose: helping others understand the same system I worked so hard to learn.",
        missionTitle: "My mission and vision",
        missionBody1:
          "Today, I pour my heart into uplifting both the broader Canadian community and my cherished Latino community. I believe that financial clarity should be accessible to everyone, regardless of their background.",
        missionBody2:
          "My mission is to transform complex financial concepts into clear, graceful, and manageable stepping stones. By replacing uncertainty with structured knowledge, I help individuals and families build lasting security, financial independence, and genuine peace of mind.",
      },
      values: {
        eyebrow: "My values",
        title: "My values",
        items: [
          { title: "Cultural Pride", desc: "Your traditions and your goals can coexist." },
          { title: "Empowerment", desc: "You leave every session with real, usable tools." },
          { title: "Community", desc: "Wealth-building is stronger when it's shared." },
          { title: "Bilingual Access", desc: "Language should never be a barrier to your future." },
        ],
      },
      cta: {
        title: "Let's build your plan together",
        subtitle: "Reach out and tell me where you're starting from.",
        button: "Get in Touch",
      },
    },
    services: {
      hero: {
        eyebrow: "Ways to work together",
        title: "Ways to work together",
        subtitle: "Choose the format that fits your life right now — you can always add more later.",
      },
      items: [
        {
          tag: "Most popular",
          title: "1:1 Education",
          desc: "Six-session packages covering budgeting, debt, credit, and goal-setting, tailored to you.",
        },
        {
          tag: "Community",
          title: "Group Workshops",
          desc: "Live, bilingual sessions on core money topics — great for teams, community groups, and families.",
        },
        {
          tag: "Self-paced",
          title: "Digital Guides",
          desc: "Downloadable worksheets and mini-courses in English and Spanish to work through anytime.",
        },
        {
          tag: "Events",
          title: "Speaking Engagements",
          desc: "Talks and panels on culturally-relevant financial literacy for organizations and events.",
        },
      ],
      process: {
        eyebrow: "Three simple steps",
        title: "Three simple steps",
        steps: [
          { title: "Book a call", desc: "We start with a relaxed, no-pressure consultation." },
          { title: "Build your plan", desc: "We map out a plan around your real goals and life." },
          { title: "Grow with support", desc: "Ongoing sessions and resources keep you on track." },
        ],
      },
      partners: {
        eyebrow: "Brands & partners I work with",
        title: "Brands & partners I work with",
      },
      cta: {
        title: "Not sure where to start?",
        subtitle: "Book a consultation and I'll figure it out with you.",
        button: "Book a Consultation",
      },
    },
    resources: {
      hero: {
        eyebrow: "Tools I Recommend",
        title: "Tools I Recommend",
        subtitle: "Financial products I actually use and trust.",
      },
      disclosure:
        "Some of the links on this page are affiliate or referral links. If you sign up through them, I may earn a small commission — at no extra cost to you. I only recommend tools I actually use and believe in.",
      items: [
        {
          tag: "Banking",
          title: "Simplii Financial",
          desc: "One of the lowest-fee digital bank accounts, from CIBC. Get a welcome bonus when you sign up with my link.",
          button: "Open an Account",
        },
        {
          tag: "Savings",
          title: "Neo Financial — High-Interest Savings",
          desc: "Grow your savings with a high-interest account and no monthly fees.",
          button: "Learn More",
        },
        {
          tag: "Credit Card",
          title: "Neo Financial — Mastercard",
          desc: "A cash-back credit card with no annual fee.",
          button: "Learn More",
        },
        {
          tag: "Money Transfer",
          title: "Wise",
          desc: "Send and receive money internationally with low fees and the real exchange rate.",
          button: "Get Started",
        },
        {
          tag: "Credit Score",
          title: "Borrowell",
          desc: "Check your credit score for free — it never affects your credit.",
          button: "Sign Up Free",
        },
      ],
    },
    calc: {
      eyebrow: "Plan it out",
      title: "Plan it out",
      subtitle: "Two quick calculators to help you picture your next move — no sign-up needed.",
      tabs: {
        debt: "Debt Payoff",
        invest: "Investment Growth",
      },
      debt: {
        intro: "See how long it takes to become debt-free and what the interest really costs.",
        balance: "Current balance",
        rate: "Interest rate (APR %)",
        payment: "Monthly payment",
        payoffTime: "Time to debt-free",
        payoffDate: "Debt-free by",
        totalInterest: "Total interest paid",
        totalPaid: "Total you'll pay",
        warning:
          "Your monthly payment is too low to cover the interest, so the balance would keep growing. Try a higher payment.",
      },
      invest: {
        intro: "See how steady contributions can grow over time with compound returns.",
        initial: "Starting amount",
        monthly: "Monthly contribution",
        rate: "Annual return (%)",
        years: "Years invested",
        futureValue: "Projected value",
        totalContributions: "Total you put in",
        totalGrowth: "Growth earned",
        contribLabel: "Contributions",
        growthLabel: "Growth",
      },
      units: { year: "yr", years: "yrs", month: "mo", months: "mos" },
      gate: {
        title: "Unlock the free calculators",
        body: "Pop in your name and email for instant access to both tools — plus occasional bilingual money tips you can actually use.",
        nameLabel: "First name",
        namePlaceholder: "First name",
        emailLabel: "Email address",
        placeholder: "you@email.com",
        button: "Unlock access",
        note: "No spam — unsubscribe anytime.",
        error: "Something went wrong. Please try again.",
      },
      disclaimer:
        "These calculators give general educational estimates only and aren't financial advice. Your actual results will vary.",
    },
    events: {
      hero: {
        eyebrow: "Events",
        title: "Events",
        subtitle: "Come sit at the table with us. Real conversations about money, over coffee.",
      },
      upcoming: {
        title: "Upcoming event",
        tag: "Save the date",
        series: "Cafecito & Money",
        name: "Investing Edition",
        date: "Sunday, November 22, 2026",
        desc: "A new chapter of Cafecito & Money is on the way, this time all about investing. Are you ready to open the door?",
        timeLabel: "Time",
        time: "2:00 PM – 5:00 PM",
        priceLabel: "Ticket",
        price: "$39.55",
        locationLabel: "Location",
        location: "Clanton Park, Toronto",
        locationNote: "Exact address shared after you register.",
        cta: "Register",
        bannerAlt: "Cafecito & Money, Investing Edition: Are you ready to open the door? Sunday, November 22, 2026",
        cardAlt: "According to my calculations... you need to invest. Cafecito & Money, Investing Edition, 22.11.2026",
      },
      sponsors: {
        title: "Event Sponsors",
      },
      past: {
        title: "Past events",
        subtitle: "A look back at where we've been: FinCon 2026 and Cafecito & Money, our coffee-and-conversation money gatherings with @drinklargo.",
        fincon: {
          tag: "Past event",
          name: "FinCon 2026",
          date: "September 16–18, 2026",
          location: "Palm Springs, California",
          desc: "Money Nerds Unite: The Financial Talk joined the personal finance community at FinCon 2026.",
          link: "Visit FinCon",
          alt: "FinCon 2026, September 16-18, Palm Springs CA, Money Nerds Unite",
        },
        welcomeAlt: "Welcome to Cafecito & Money, The Financial Talk",
        chalkboardAlt: "Chalkboard sign reading Cafecito & Money, @thefinancialtalk x @drinklargo",
        hostsAlt: "Two hosts smiling together, one holding an iced coffee",
        groupAlt: "Attendees gathered around a table at Cafecito & Money",
        videoHost: "Video: our host speaking at Cafecito & Money",
        videoCoffee: "Video: a coffee cup and Cafecito & Money treat",
        videoBingo: "Video: Bingo del Dinero activity sheets and pens",
      },
    },
    getInvolved: {
      hero: {
        eyebrow: "Join the movement",
        title: "Join the movement",
        subtitle:
          "The Financial Talk is more than education — it's a community. There are many ways to be part of it.",
      },
      intro:
        "Whether you have an hour to give or an ongoing passion to share, your time and energy help bring financial confidence to more people. Here's how you can get involved.",
      ways: [
        {
          tag: "Events",
          title: "Volunteer at Events",
          desc: "Lend a hand at workshops, talks, and community gatherings — greeting attendees, helping set up, and making everyone feel welcome.",
        },
        {
          tag: "Community",
          title: "Networking",
          desc: "Connect me with community groups, employers, and organizations who'd benefit from bilingual financial education.",
        },
        {
          tag: "Spread the word",
          title: "Marketing & Ambassadors",
          desc: "Share my content, refer friends and family, or become a brand ambassador who champions financial literacy in your circles.",
        },
        {
          tag: "Partnerships",
          title: "Partnerships",
          desc: "Represent an organization or business? Let's explore workshops, sponsorships, and collaborations that uplift our community.",
        },
      ],
      cta: {
        title: "Want to help out?",
        subtitle: "Tell me how you'd like to get involved and I'll take it from there.",
        button: "Get in Touch",
      },
    },
    contact: {
      hero: {
        eyebrow: "Let's talk money, your way",
        title: "Let's talk money, your way",
        subtitle: "Reach out in whichever language feels most comfortable — English or Spanish.",
      },
      schedule: {
        eyebrow: "Book your consultation",
        title: "Book your consultation",
        subtitle: "Consultation — $50 CAD · Savings & Investments consultation — $100 CAD. Pick a day and time below.",
      },
      card: {
        title: "Get in touch",
        body: "Send a message with a bit about your goals, and I'll get back to you soon.",
      },
      form: {
        nameLabel: "Name",
        emailLabel: "Email",
        messageLabel: "Message",
        submit: "Send Message",
      },
      social: {
        title: "Follow along",
        body: "Money tips, real talk, and behind-the-scenes on Instagram and TikTok.",
      },
    },
    footer: {
      tagline: "Financial education, rooted in culture.",
      rights: "All rights reserved.",
    },
  },

  es: {
    brand: {
      name: "La Charla Financiera",
      monogram: "CF",
    },
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      whatsNew: "Novedades",
      services: "Herramientas",
      resources: "Recursos",
      events: "Eventos",
      getInvolved: "Participa",
      contact: "Contacto",
      cta: "Hablemos",
    },
    whatsNew: {
      hero: {
        eyebrow: "Novedades",
        title: "Novedades",
        subtitle: "Noticias, anuncios y lo más reciente de The Financial Talk.",
      },
      empty: "Aún no hay anuncios — vuelve pronto.",
      tiktok: {
        title: "Lo más reciente en TikTok",
        subtitle: "Consejos rápidos de dinero e historias de The Financial Talk.",
        cta: "Sigue a @thefinancialtalk en TikTok",
      },
    },
    lang: { label: "Idioma" },
    theme: {
      label: "Paleta de colores",
      midnightPlumGold: "Medianoche, Ciruela y Oro",
      fuchsiaGold: "Fucsia y Oro",
      terracottaTurquesa: "Terracota y Turquesa",
      violetaCoral: "Violeta y Coral",
    },
    home: {
      hero: {
        eyebrow: "La historia de tu dinero, contada con tu propia voz.",
        title: "La historia de tu dinero, contada con tu propia voz.",
        titleHtml: "La historia de tu dinero, contada <span class=\"accent\">con tu propia voz.</span>",
        subtitle:
          "Educación financiera bilingüe que combina herramientas modernas con los valores que tu familia te enseñó — para que construyas riqueza sin dejar de ser quien eres.",
        ctaPrimary: "Agenda una Consulta",
        ctaSecondary: "Ver Servicios",
        trust: ["Bilingüe (EN / ES)", "Espacio sin juicios", "Con raíces culturales"],
      },
      stats: [
        { title: "Bilingüe", desc: "Educación disponible en inglés y español" },
        { title: "Con Raíces Culturales", desc: "Consejos que respetan a la familia y la comunidad" },
        { title: "Sin Juicios", desc: "Un espacio seguro para toda pregunta sobre dinero" },
      ],
      about: {
        eyebrow: "Rompiendo ciclos. Construyendo legados.",
        title: "Rompiendo ciclos. Construyendo legados.",
        body: "Este espacio se creó para mujeres que crecieron escuchando que el dinero no era tema de conversación — y que están listas para cambiar esa historia para la próxima generación. Aquí encontrarás herramientas prácticas, conversaciones honestas y una comunidad que te entiende.",
        cta: "Lee la historia completa",
        photoAlt: "Retrato de Nathaly, fundadora de The Financial Talk, sonriendo, sosteniendo una laptop",
      },
      services: {
        eyebrow: "Apoyo para cada etapa de tu camino financiero",
        title: "Apoyo para cada etapa de tu camino financiero",
        subtitle: "Desde tu primer presupuesto hasta tu primer portafolio de inversión.",
        items: [
          {
            title: "Educación 1 a 1",
            desc: "Sesiones personalizadas para crear un plan según tu vida y tus metas reales.",
          },
          {
            title: "Talleres Grupales",
            desc: "Experiencias de aprendizaje comunitario sobre presupuesto, crédito e inversión.",
          },
          {
            title: "Guías Digitales",
            desc: "Hojas de trabajo y cursos bilingües para avanzar a tu propio ritmo.",
          },
        ],
        cta: "Ver todos los servicios",
      },
      testimonials: {
        eyebrow: "Historias reales, progreso real",
        title: "Historias reales, progreso real",
        items: [
          {
            quote:
              "“Por fin entiendo mi dinero sin sentir vergüenza de lo que no sabía. Esto lo cambió todo.”",
            name: "Daniela R.",
            role: "Dueña de pequeño negocio",
          },
          {
            quote:
              "“Tener educación financiera en español para mi mamá y en inglés para mí significó que por fin pudimos planear juntas.”",
            name: "Vanessa M.",
            role: "Primera generación en graduarse",
          },
          {
            quote:
              "“Los talleres se sintieron como estar en familia, no una clase. Por fin logré seguir mi presupuesto.”",
            name: "Camila T.",
            role: "Nueva propietaria de casa",
          },
        ],
      },
      partners: {
        eyebrow: "Marcas y aliados con los que trabajo",
        title: "Marcas y aliados con los que trabajo",
      },
      updates: {
        eyebrow: "Qué hay de nuevo",
        title: "Qué hay de nuevo",
        empty: "Aún no hay anuncios — vuelve pronto.",
      },
      faq: {
        eyebrow: "¿Preguntas? Respondidas.",
        title: "¿Preguntas? Respondidas.",
        subtitle: "Lo que la gente suele preguntar antes de comenzar a trabajar juntas.",
        items: [
          {
            q: "¿Necesito ser “buena con el dinero” para empezar?",
            a: "Para nada. La mayoría de las personas con quienes trabajo se sienten atrasadas o abrumadas — por eso la educación ayuda. Empezamos donde estés, sin ningún juicio.",
          },
          {
            q: "¿Podemos reunirnos en español?",
            a: "Sí. Cada sesión, hoja de trabajo y recurso está disponible en inglés y español — lo que sea más cómodo para ti y tu familia.",
          },
          {
            q: "¿Cuánto cuesta?",
            a: "Depende del formato que elijas. La forma más fácil de ver las opciones y precios es agendar una consulta — los tipos de sesión y precios se muestran al elegir tu horario.",
          },
          {
            q: "¿Qué pasa en la primera llamada?",
            a: "Es una conversación relajada y sin presión sobre dónde estás, qué quieres lograr y si trabajar juntas es la opción correcta. Sin compromiso.",
          },
          {
            q: "¿Ofreces talleres para grupos?",
            a: "¡Claro! Ofrezco talleres grupales bilingües para equipos, organizaciones comunitarias y familias sobre presupuesto, crédito e inversión — escríbeme y lo diseño a tu medida.",
          },
        ],
      },
      ctaBanner: {
        title: "¿Lista para escribir tu propia historia financiera?",
        subtitle: "Hablemos de hacia dónde quieres ir y de cómo puedo ayudarte.",
        button: "Agenda una Consulta",
      },
    },
    about: {
      hero: {
        eyebrow: "Empoderando tu Futuro Financiero",
        title: "Empoderando tu Futuro Financiero",
        subtitle:
          "Un enfoque bicultural sobre el dinero que honra de dónde vienes y hacia dónde vas.",
      },
      story: {
        eyebrow: "Bienvenida — me alegra que estés aquí",
        title: "Bienvenida — me alegra que estés aquí",
        intro1:
          "Hace diez años emprendí un viaje transformador al emigrar de la vibrante ciudad costera de Guayaquil, Ecuador, a Canadá. Mudarme a un nuevo país exigió una resiliencia inmensa, mientras me adaptaba a una cultura y un sistema económico desconocidos. En lugar de ver esos primeros desafíos como barreras, los abracé como oportunidades de crecimiento personal.",
        intro2:
          "Para construir una base sólida para mi futuro, me dediqué a la excelencia académica y obtuve una Licenciatura en Economía y Negocios con Honores. Ese riguroso programa profundizó mi comprensión de la dinámica del mercado, la teoría económica y las estructuras fiscales. Más importante aún, encendió mi pasión por el empoderamiento financiero y me reveló el papel vital que la educación financiera juega en la estabilidad personal. Además de mi licenciatura, cuento con una certificación en Asesoría Financiera Avanzada del Canadian Securities Institute, y estoy trabajando para convertirme en Planificadora Financiera Certificada (CFP).",
        photoAlt: "Retrato de Nathaly, fundadora de The Financial Talk, sonriendo, sentada",
        masteringTitle: "Dominando el terreno",
        masteringBody:
          "Un sistema de dinero nuevo era mucho por aprender. Con calma aprendí cómo funciona de verdad el dinero en Canadá, paso a paso:",
        masteringItems: [
          "<strong>Deuda:</strong> pagué mi préstamo estudiantil, mis tarjetas de crédito y otras deudas antes de que consumieran mis ingresos.",
          "<strong>Hacer crecer mi dinero:</strong> aprendí a invertir con intención y a poner mi dinero a trabajar hacia mis metas.",
          "<strong>Comprar casa:</strong> aprendí el camino hacia la propiedad y compré mi primera casa aquí.",
          "<strong>Impuestos:</strong> aprendí a declarar de la forma correcta y a quedarme con más de lo que ganaba.",
        ],
        masteringClose:
          "Alcanzar estas metas me mostró que el esfuerzo constante vale la pena. También me mostró mi propósito: ayudar a otras personas a entender el mismo sistema que tanto me costó aprender.",
        missionTitle: "Mi misión y visión",
        missionBody1:
          "Hoy entrego mi corazón a impulsar tanto a la comunidad canadiense en general como a mi querida comunidad latina. Creo que la claridad financiera debe ser accesible para todos, sin importar su origen.",
        missionBody2:
          "Mi misión es transformar conceptos financieros complejos en pasos claros, elegantes y manejables. Al reemplazar la incertidumbre con conocimiento estructurado, ayudo a personas y familias a construir seguridad duradera, independencia financiera y verdadera tranquilidad.",
      },
      values: {
        eyebrow: "Mis valores",
        title: "Mis valores",
        items: [
          { title: "Orgullo Cultural", desc: "Tus tradiciones y tus metas pueden coexistir." },
          { title: "Empoderamiento", desc: "Sales de cada sesión con herramientas reales y útiles." },
          { title: "Comunidad", desc: "Construir riqueza es más fuerte cuando se comparte." },
          { title: "Acceso Bilingüe", desc: "El idioma nunca debería ser una barrera para tu futuro." },
        ],
      },
      cta: {
        title: "Construyamos tu plan juntas",
        subtitle: "Escríbeme y cuéntame desde dónde estás comenzando.",
        button: "Ponte en Contacto",
      },
    },
    services: {
      hero: {
        eyebrow: "Formas de trabajar juntas",
        title: "Formas de trabajar juntas",
        subtitle: "Elige el formato que se ajuste a tu vida ahora — siempre puedes agregar más después.",
      },
      items: [
        {
          tag: "Más popular",
          title: "Educación 1 a 1",
          desc: "Paquetes de seis sesiones sobre presupuesto, deudas, crédito y metas, hechos a tu medida.",
        },
        {
          tag: "Comunidad",
          title: "Talleres Grupales",
          desc: "Sesiones en vivo y bilingües sobre temas clave — ideales para equipos, grupos y familias.",
        },
        {
          tag: "A tu ritmo",
          title: "Guías Digitales",
          desc: "Hojas de trabajo y minicursos descargables en inglés y español para hacer cuando quieras.",
        },
        {
          tag: "Eventos",
          title: "Conferencias",
          desc: "Charlas y paneles sobre educación financiera culturalmente relevante para organizaciones y eventos.",
        },
      ],
      process: {
        eyebrow: "Tres pasos sencillos",
        title: "Tres pasos sencillos",
        steps: [
          { title: "Agenda una llamada", desc: "Comenzamos con una consulta relajada, sin presión." },
          { title: "Creamos tu plan", desc: "Diseñamos un plan según tus metas y tu vida real." },
          { title: "Crece con apoyo", desc: "Sesiones y recursos continuos te mantienen en camino." },
        ],
      },
      partners: {
        eyebrow: "Marcas y aliados con los que trabajo",
        title: "Marcas y aliados con los que trabajo",
      },
      cta: {
        title: "¿No sabes por dónde empezar?",
        subtitle: "Agenda una consulta y te ayudo a resolverlo.",
        button: "Agenda una Consulta",
      },
    },
    resources: {
      hero: {
        eyebrow: "Herramientas que Recomiendo",
        title: "Herramientas que Recomiendo",
        subtitle: "Productos financieros que realmente uso y en los que confío.",
      },
      disclosure:
        "Algunos de los enlaces en esta página son de afiliados o referidos. Si te registras a través de ellos, puedo ganar una pequeña comisión — sin costo adicional para ti. Solo recomiendo herramientas que realmente uso y en las que creo.",
      items: [
        {
          tag: "Banca",
          title: "Simplii Financial",
          desc: "Una de las cuentas bancarias digitales con las comisiones más bajas, de CIBC. Recibe un bono de bienvenida al registrarte con mi enlace.",
          button: "Abrir una Cuenta",
        },
        {
          tag: "Ahorros",
          title: "Neo Financial — Ahorros de Alto Interés",
          desc: "Haz crecer tus ahorros con una cuenta de alto interés y sin cuotas mensuales.",
          button: "Más Información",
        },
        {
          tag: "Tarjeta de Crédito",
          title: "Neo Financial — Mastercard",
          desc: "Una tarjeta de crédito con reembolso en efectivo y sin cuota anual.",
          button: "Más Información",
        },
        {
          tag: "Transferencias",
          title: "Wise",
          desc: "Envía y recibe dinero internacionalmente con comisiones bajas y el tipo de cambio real.",
          button: "Comenzar",
        },
        {
          tag: "Puntaje de Crédito",
          title: "Borrowell",
          desc: "Consulta tu puntaje de crédito gratis — nunca afecta tu historial crediticio.",
          button: "Regístrate Gratis",
        },
      ],
    },
    calc: {
      eyebrow: "Planifícalo",
      title: "Planifícalo",
      subtitle: "Dos calculadoras rápidas para visualizar tu próximo paso — sin registrarte.",
      tabs: {
        debt: "Pago de Deudas",
        invest: "Crecimiento de Inversión",
      },
      debt: {
        intro: "Descubre cuánto tardarás en salir de deudas y lo que realmente cuestan los intereses.",
        balance: "Saldo actual",
        rate: "Tasa de interés (TAE %)",
        payment: "Pago mensual",
        payoffTime: "Tiempo para saldar",
        payoffDate: "Sin deudas para",
        totalInterest: "Interés total pagado",
        totalPaid: "Total que pagarás",
        warning:
          "Tu pago mensual es muy bajo para cubrir los intereses, así que el saldo seguiría creciendo. Prueba con un pago mayor.",
      },
      invest: {
        intro: "Descubre cómo las aportaciones constantes crecen con el interés compuesto.",
        initial: "Monto inicial",
        monthly: "Aportación mensual",
        rate: "Rendimiento anual (%)",
        years: "Años invertidos",
        futureValue: "Valor proyectado",
        totalContributions: "Total aportado",
        totalGrowth: "Ganancia generada",
        contribLabel: "Aportaciones",
        growthLabel: "Ganancia",
      },
      units: { year: "año", years: "años", month: "mes", months: "meses" },
      gate: {
        title: "Desbloquea las calculadoras gratis",
        body: "Déjanos tu nombre y correo y accede al instante a ambas herramientas — además de consejos de dinero bilingües que sí puedes usar.",
        nameLabel: "Nombre",
        namePlaceholder: "Nombre",
        emailLabel: "Correo electrónico",
        placeholder: "tu@correo.com",
        button: "Desbloquear acceso",
        note: "Sin spam — cancela cuando quieras.",
        error: "Algo salió mal. Inténtalo de nuevo.",
      },
      disclaimer:
        "Estas calculadoras ofrecen estimaciones educativas generales y no son asesoría financiera. Tus resultados reales pueden variar.",
    },
    events: {
      hero: {
        eyebrow: "Eventos",
        title: "Eventos",
        subtitle: "Siéntate a la mesa con nosotras. Conversaciones reales sobre dinero, con un cafecito.",
      },
      upcoming: {
        title: "Próximo evento",
        tag: "Reserva la fecha",
        series: "Cafecito & Money",
        name: "Edición Inversión",
        date: "Domingo 22 de noviembre de 2026",
        desc: "Se acerca un nuevo capítulo de Cafecito & Money, esta vez enfocado en la inversión. ¿Estás lista para abrir la puerta?",
        timeLabel: "Hora",
        time: "2:00 PM – 5:00 PM",
        priceLabel: "Entrada",
        price: "$39.55",
        locationLabel: "Lugar",
        location: "Clanton Park, Toronto",
        locationNote: "La dirección exacta se comparte al registrarte.",
        cta: "Regístrate",
        bannerAlt: "Cafecito & Money, Edición Inversión: ¿Estás lista para abrir la puerta? Domingo 22 de noviembre de 2026",
        cardAlt: "Según mis cálculos... necesitas invertir. Cafecito & Money, Edición Inversión, 22.11.2026",
      },
      sponsors: {
        title: "Patrocinadores del evento",
      },
      past: {
        title: "Eventos pasados",
        subtitle: "Un vistazo a dónde hemos estado: FinCon 2026 y Cafecito & Money, nuestros encuentros de dinero y conversación con @drinklargo.",
        fincon: {
          tag: "Evento pasado",
          name: "FinCon 2026",
          date: "16–18 de septiembre de 2026",
          location: "Palm Springs, California",
          desc: "Money Nerds Unite: The Financial Talk estuvo con la comunidad de finanzas personales en FinCon 2026.",
          link: "Visitar FinCon",
          alt: "FinCon 2026, 16-18 de septiembre, Palm Springs CA, Money Nerds Unite",
        },
        welcomeAlt: "Bienvenidas a Cafecito & Money, The Financial Talk",
        chalkboardAlt: "Pizarra con el texto Cafecito & Money, @thefinancialtalk x @drinklargo",
        hostsAlt: "Dos anfitrionas sonriendo juntas, una con un café helado",
        groupAlt: "Asistentes reunidas alrededor de una mesa en Cafecito & Money",
        videoHost: "Video: nuestra anfitriona hablando en Cafecito & Money",
        videoCoffee: "Video: una taza de café y un detalle de Cafecito & Money",
        videoBingo: "Video: hojas de la actividad Bingo del Dinero y bolígrafos",
      },
    },
    getInvolved: {
      hero: {
        eyebrow: "Únete al movimiento",
        title: "Únete al movimiento",
        subtitle:
          "The Financial Talk es más que educación — es una comunidad. Hay muchas formas de ser parte de ella.",
      },
      intro:
        "Ya sea que tengas una hora para dar o una pasión continua para compartir, tu tiempo y energía ayudan a llevar confianza financiera a más personas. Así puedes participar.",
      ways: [
        {
          tag: "Eventos",
          title: "Voluntariado en Eventos",
          desc: "Echa una mano en talleres, charlas y encuentros comunitarios — recibiendo a las personas, ayudando a preparar y haciendo que todos se sientan bienvenidos.",
        },
        {
          tag: "Comunidad",
          title: "Networking",
          desc: "Conéctame con grupos comunitarios, empleadores y organizaciones que se beneficiarían de la educación financiera bilingüe.",
        },
        {
          tag: "Corre la voz",
          title: "Marketing y Embajadores",
          desc: "Comparte mi contenido, refiere a amistades y familiares, o conviértete en embajador de marca que impulsa la educación financiera en tu círculo.",
        },
        {
          tag: "Alianzas",
          title: "Alianzas",
          desc: "¿Representas a una organización o negocio? Exploremos talleres, patrocinios y colaboraciones que impulsen a nuestra comunidad.",
        },
      ],
      cta: {
        title: "¿Quieres ayudar?",
        subtitle: "Cuéntame cómo te gustaría participar y yo me encargo del resto.",
        button: "Ponte en Contacto",
      },
    },
    contact: {
      hero: {
        eyebrow: "Hablemos de dinero, a tu manera",
        title: "Hablemos de dinero, a tu manera",
        subtitle: "Escríbenos en el idioma que te sea más cómodo — inglés o español.",
      },
      schedule: {
        eyebrow: "Reserva tu consulta",
        title: "Reserva tu consulta",
        subtitle: "Consulta — $50 CAD · Consulta de ahorros e inversiones — $100 CAD. Elige un día y una hora abajo.",
      },
      card: {
        title: "Ponte en contacto",
        body: "Envía un mensaje contándome un poco sobre tus metas y te responderé pronto.",
      },
      form: {
        nameLabel: "Nombre",
        emailLabel: "Correo",
        messageLabel: "Mensaje",
        submit: "Enviar Mensaje",
      },
      social: {
        title: "Síguenos",
        body: "Tips de dinero, charlas reales y más, en Instagram y TikTok.",
      },
    },
    footer: {
      tagline: "Educación financiera, con raíces culturales.",
      rights: "Todos los derechos reservados.",
    },
  },
};
