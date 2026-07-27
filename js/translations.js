/**
 * Bilingual copy for the whole site.
 * All content below is placeholder/sample copy — replace with real content.
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
      services: "Services",
      resources: "Resources",
      contact: "Contact",
      cta: "Book a Consultation",
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
        eyebrow: "Financial coaching, rooted in culture",
        title: "Your money story, told in your own voice.",
        subtitle:
          "Bilingual financial coaching that blends smart modern money tools with the values your family raised you on — so you can build wealth without losing who you are.",
        ctaPrimary: "Book a Consultation",
        ctaSecondary: "Explore Services",
      },
      stats: [
        { title: "Bilingual", desc: "Coaching available in English and Spanish" },
        { title: "Culturally Rooted", desc: "Advice that respects family and community values" },
        { title: "Judgment-Free", desc: "A safe space to ask every money question" },
      ],
      about: {
        eyebrow: "Meet your coach",
        title: "Breaking cycles. Building legacies.",
        body: "This space was built for women who grew up hearing that money wasn't something we talked about — and who are ready to change that story for the next generation. Here you'll find practical tools, honest conversations, and a community that gets it.",
        cta: "Read the full story",
        photoAlt: "Portrait of Nathaly, founder of The Financial Talk, smiling, holding a laptop",
      },
      services: {
        eyebrow: "How we work together",
        title: "Support for every stage of your money journey",
        subtitle: "From your first budget to your first investment portfolio.",
        items: [
          {
            title: "1:1 Coaching",
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
        eyebrow: "Community voices",
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
              "“Having coaching in Spanish for my mom and English for me meant we could finally plan together.”",
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
      updates: {
        eyebrow: "Latest updates",
        title: "What's new",
        empty: "No announcements yet — check back soon.",
      },
      ctaBanner: {
        title: "Ready to write your own money story?",
        subtitle: "Your first consultation is on us — let's talk about where you want to go.",
        button: "Book a Free Consultation",
      },
    },
    about: {
      hero: {
        eyebrow: "About",
        title: "Financial confidence, culturally rooted",
        subtitle:
          "A bicultural approach to money that honors where you come from and where you're going.",
      },
      story: {
        eyebrow: "My story",
        title: "Why this matters to me",
        body1:
          "Ten years ago, I embraced a beautiful new beginning when I immigrated from Guayaquil, Ecuador, to Canada. To build my future, I dedicated myself to earning a Bachelor of Business Economics with Honours, an achievement that ultimately nurtured my passion for financial empowerment.",
        body2:
          "Navigating an unfamiliar economic system was a daunting path, yet mastering the intricacies of Canadian taxation, pension programs, smart investments, and the proud milestone of buying my first home became my true calling.",
        body3:
          "Today, I pour my heart into uplifting both Canadians and my cherished Latino community, transforming complex financial concepts into clear, graceful, and accessible stepping stones toward security and peace of mind.",
        photoAlt: "Portrait of Nathaly, founder of The Financial Talk, smiling, seated",
      },
      values: {
        eyebrow: "What guides us",
        title: "Our values",
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
        eyebrow: "Services",
        title: "Ways to work together",
        subtitle: "Choose the format that fits your life right now — you can always add more later.",
      },
      items: [
        {
          tag: "Most popular",
          title: "1:1 Coaching",
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
        eyebrow: "How it works",
        title: "Three simple steps",
        steps: [
          { title: "Book a call", desc: "We start with a free, no-pressure consultation." },
          { title: "Build your plan", desc: "We map out a plan around your real goals and life." },
          { title: "Grow with support", desc: "Ongoing sessions and resources keep you on track." },
        ],
      },
      cta: {
        title: "Not sure where to start?",
        subtitle: "Book a free consultation and we'll figure it out together.",
        button: "Book a Free Consultation",
      },
    },
    resources: {
      hero: {
        eyebrow: "Resources",
        title: "Tools I Recommend",
        subtitle: "Financial products I actually use and trust.",
      },
      disclosure:
        "Some of the links on this page are affiliate or referral links. If you sign up through them, I may earn a small commission — at no extra cost to you. I only recommend tools I actually use and believe in.",
      items: [
        {
          tag: "Banking",
          title: "Simplii Financial",
          desc: "A no-fee digital bank account from CIBC. Get a welcome bonus when you sign up with my link.",
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
    contact: {
      hero: {
        eyebrow: "Contact",
        title: "Let's talk money, your way",
        subtitle: "Reach out in whichever language feels most comfortable — English or Spanish.",
      },
      schedule: {
        eyebrow: "Schedule",
        title: "Book your consultation",
        subtitle: "Pick a day and session type below — pricing is shown at checkout.",
      },
      card: {
        title: "Get in touch",
        body: "Send a message with a bit about your goals, and we'll get back to you soon.",
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
      tagline: "Financial coaching, rooted in culture.",
      rights: "All rights reserved.",
      placeholderNotice: "",
    },
  },

  es: {
    brand: {
      name: "La Charla Financiera",
      monogram: "CF",
    },
    nav: {
      home: "Inicio",
      about: "Nosotras",
      services: "Servicios",
      resources: "Recursos",
      contact: "Contacto",
      cta: "Agenda una Consulta",
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
        eyebrow: "Asesoría financiera, con raíces culturales",
        title: "La historia de tu dinero, contada con tu propia voz.",
        subtitle:
          "Asesoría financiera bilingüe que combina herramientas modernas con los valores que tu familia te enseñó — para que construyas riqueza sin dejar de ser quien eres.",
        ctaPrimary: "Agenda una Consulta",
        ctaSecondary: "Ver Servicios",
      },
      stats: [
        { title: "Bilingüe", desc: "Asesoría disponible en inglés y español" },
        { title: "Con Raíces Culturales", desc: "Consejos que respetan a la familia y la comunidad" },
        { title: "Sin Juicios", desc: "Un espacio seguro para toda pregunta sobre dinero" },
      ],
      about: {
        eyebrow: "Conoce a tu asesora",
        title: "Rompiendo ciclos. Construyendo legados.",
        body: "Este espacio se creó para mujeres que crecieron escuchando que el dinero no era tema de conversación — y que están listas para cambiar esa historia para la próxima generación. Aquí encontrarás herramientas prácticas, conversaciones honestas y una comunidad que te entiende.",
        cta: "Lee la historia completa",
        photoAlt: "Retrato de Nathaly, fundadora de The Financial Talk, sonriendo, sosteniendo una laptop",
      },
      services: {
        eyebrow: "Cómo trabajamos juntas",
        title: "Apoyo para cada etapa de tu camino financiero",
        subtitle: "Desde tu primer presupuesto hasta tu primer portafolio de inversión.",
        items: [
          {
            title: "Asesoría 1 a 1",
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
        eyebrow: "Voces de la comunidad",
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
              "“Tener asesoría en español para mi mamá y en inglés para mí significó que por fin pudimos planear juntas.”",
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
      updates: {
        eyebrow: "Últimas novedades",
        title: "Qué hay de nuevo",
        empty: "Aún no hay anuncios — vuelve pronto.",
      },
      ctaBanner: {
        title: "¿Lista para escribir tu propia historia financiera?",
        subtitle: "Tu primera consulta es gratis — hablemos de hacia dónde quieres ir.",
        button: "Agenda una Consulta Gratis",
      },
    },
    about: {
      hero: {
        eyebrow: "Nosotras",
        title: "Confianza financiera, con raíces culturales",
        subtitle:
          "Un enfoque bicultural sobre el dinero que honra de dónde vienes y hacia dónde vas.",
      },
      story: {
        eyebrow: "Mi historia",
        title: "Por qué esto me importa",
        body1:
          "Hace diez años, abracé un hermoso nuevo comienzo al emigrar de Guayaquil, Ecuador, a Canadá. Para construir mi futuro, me dediqué a obtener mi licenciatura en Economía y Negocios con Honores, un logro que terminó por alimentar mi pasión por el empoderamiento financiero.",
        body2:
          "Navegar un sistema económico desconocido fue un camino desafiante, pero dominar los entresijos de los impuestos canadienses, los programas de pensión, las inversiones inteligentes y el orgulloso logro de comprar mi primera casa se convirtió en mi verdadera vocación.",
        body3:
          "Hoy, entrego mi corazón a impulsar tanto a los canadienses como a mi querida comunidad latina, transformando conceptos financieros complejos en pasos claros, elegantes y accesibles hacia la seguridad y la tranquilidad.",
        photoAlt: "Retrato de Nathaly, fundadora de The Financial Talk, sonriendo, sentada",
      },
      values: {
        eyebrow: "Lo que nos guía",
        title: "Nuestros valores",
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
        eyebrow: "Servicios",
        title: "Formas de trabajar juntas",
        subtitle: "Elige el formato que se ajuste a tu vida ahora — siempre puedes agregar más después.",
      },
      items: [
        {
          tag: "Más popular",
          title: "Asesoría 1 a 1",
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
        eyebrow: "Cómo funciona",
        title: "Tres pasos sencillos",
        steps: [
          { title: "Agenda una llamada", desc: "Comenzamos con una consulta gratuita, sin presión." },
          { title: "Creamos tu plan", desc: "Diseñamos un plan según tus metas y tu vida real." },
          { title: "Crece con apoyo", desc: "Sesiones y recursos continuos te mantienen en camino." },
        ],
      },
      cta: {
        title: "¿No sabes por dónde empezar?",
        subtitle: "Agenda una consulta gratuita y lo resolvemos juntas.",
        button: "Agenda una Consulta Gratis",
      },
    },
    resources: {
      hero: {
        eyebrow: "Recursos",
        title: "Herramientas que Recomiendo",
        subtitle: "Productos financieros que realmente uso y en los que confío.",
      },
      disclosure:
        "Algunos de los enlaces en esta página son de afiliados o referidos. Si te registras a través de ellos, puedo ganar una pequeña comisión — sin costo adicional para ti. Solo recomiendo herramientas que realmente uso y en las que creo.",
      items: [
        {
          tag: "Banca",
          title: "Simplii Financial",
          desc: "Una cuenta bancaria digital sin comisiones de CIBC. Recibe un bono de bienvenida al registrarte con mi enlace.",
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
    contact: {
      hero: {
        eyebrow: "Contacto",
        title: "Hablemos de dinero, a tu manera",
        subtitle: "Escríbenos en el idioma que te sea más cómodo — inglés o español.",
      },
      schedule: {
        eyebrow: "Agenda",
        title: "Reserva tu consulta",
        subtitle: "Elige un día y el tipo de sesión abajo — el precio se muestra al reservar.",
      },
      card: {
        title: "Ponte en contacto",
        body: "Envía un mensaje contándonos un poco sobre tus metas y te responderemos pronto.",
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
      tagline: "Asesoría financiera, con raíces culturales.",
      rights: "Todos los derechos reservados.",
      placeholderNotice: "",
    },
  },
};
