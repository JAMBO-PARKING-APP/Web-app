import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files can be broken down into separate JSON files,
// but for simplicity, we'll include them here directly.
const resources = {
  en: {
    translation: {
      nav: {
        howItWorks: "How It Works",
        benefits: "Benefits",
        getApp: "Get the App",
        checkStatus: "Check Status",
        partnerLogin: "Partner Login"
      },
      hero: {
        badge: "Earn passive income from your parking space",
        title1: "Turn Your Space Into",
        title2: "Real Income",
        subtitle: "List your parking space on Space Park and earn money every time someone parks. Real-time analytics, automatic payouts, and total control — all in your partner dashboard.",
        applyNow: "Apply Now — Free",
        learnMore: "Learn How It Works"
      },
      stats: {
        partners: "Partner Zones",
        parkers: "Monthly Parkers",
        commission: "Commission Only",
        approval: "Approval Time"
      },
      lang: {
        en: "English",
        es: "Español",
        fr: "Français"
      }
    }
  },
  es: {
    translation: {
      nav: {
        howItWorks: "Cómo Funciona",
        benefits: "Beneficios",
        getApp: "Obtener la App",
        checkStatus: "Estado",
        partnerLogin: "Iniciar Sesión"
      },
      hero: {
        badge: "Gana ingresos pasivos con tu espacio de aparcamiento",
        title1: "Convierte Tu Espacio En",
        title2: "Ingresos Reales",
        subtitle: "Añade tu plaza en Space Park y gana dinero cada vez que alguien aparque. Analíticas en tiempo real, pagos automáticos y control total en tu panel de socio.",
        applyNow: "Aplica Ahora — Gratis",
        learnMore: "Aprende Cómo Funciona"
      },
      stats: {
        partners: "Zonas Asociadas",
        parkers: "Aparcamientos / Mes",
        commission: "Solo Comisión",
        approval: "Tiempo Aprobación"
      },
      lang: {
        en: "English",
        es: "Español",
        fr: "Français"
      }
    }
  },
  fr: {
    translation: {
      nav: {
        howItWorks: "Comment ça marche",
        benefits: "Avantages",
        getApp: "Télécharger l'App",
        checkStatus: "Vérifier le statut",
        partnerLogin: "Connexion Partenaire"
      },
      hero: {
        badge: "Gagnez un revenu passif grâce à votre place de parking",
        title1: "Transformez Votre Espace En",
        title2: "Revenu Réel",
        subtitle: "Proposez votre place de parking sur Space Park et gagnez de l'argent à chaque stationnement. Analyses en temps réel, paiements automatiques et contrôle total.",
        applyNow: "Postulez — Gratuit",
        learnMore: "En savoir plus"
      },
      stats: {
        partners: "Zones Partenaires",
        parkers: "Stationnements Mensuels",
        commission: "Commission Uniquement",
        approval: "Délai d'approbation"
      },
      lang: {
        en: "English",
        es: "Español",
        fr: "Français"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
