const menu = document.querySelector('#menu');
const openButton = document.querySelector('#menu-open');
const closeButton = document.querySelector('#menu-close');
const backdrop = document.querySelector('#menu-backdrop');
const links = document.querySelectorAll('.menu__link');
const languageButtons = document.querySelectorAll('[data-language]');

const translations = {
  fr: {
    bookCall: 'Contact', portfolio: 'PORTFOLIO',
    quote: '« Le leadership est la capacité de transformer une vision en réalité. »',
    profile: 'Professionnel de la gestion, de la finance et de la banque, spécialisé dans les institutions financières, l’analyse et la relation client.',
    viewCv: 'Voir le CV', selectedWork: 'Travaux sélectionnés',
    thesisTitle: 'Mémoire de Master — CRM et performance commerciale', thesisText: 'Recherche qualitative sur la personnalisation client, le CRM et la performance chez Ecobank Sénégal.',
    projectTitle: 'Digi-Teranga — marketing bancaire', projectText: 'Proposition de stratégie marketing et de segmentation pour la Banque GIF.',
    menuCv: 'CV', menuThesis: 'Mémoire de Master', menuMarketing: 'Projet marketing', menuCredit: 'Étude sur le crédit', menuContact: 'Contact', getInTouch: 'Me contacter',
  },
  en: {
    bookCall: 'Contact', portfolio: 'PORTFOLIO', quote: '“Leadership is the capacity to translate vision into reality.”',
    profile: 'Management, finance and banking professional with a focus on financial institutions, analysis and client relationships.',
    viewCv: 'View CV', selectedWork: 'Selected work',
    thesisTitle: "Master's thesis — CRM and commercial performance", thesisText: 'Qualitative research on customer personalization, CRM and performance at Ecobank Senegal.',
    projectTitle: 'Digi-Teranga — banking marketing', projectText: 'A marketing strategy and segmentation proposal for Banque GIF.',
    menuCv: 'CV', menuThesis: "Master's thesis", menuMarketing: 'Marketing project', menuCredit: 'Credit study', menuContact: 'Contact', getInTouch: 'Get in touch',
  },
};

function setMenu(open) {
  menu.classList.toggle('is-open', open);
  openButton.setAttribute('aria-expanded', String(open));
  (open ? closeButton : openButton).focus({ preventScroll: true });
}

openButton.addEventListener('click', () => setMenu(true));
closeButton.addEventListener('click', () => setMenu(false));
backdrop.addEventListener('click', () => setMenu(false));
links.forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false);
});

function setLanguage(language) {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = translations[language][element.dataset.i18n];
  });
  languageButtons.forEach((button) => {
    const active = button.dataset.language === language;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

languageButtons.forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.language)));
setLanguage('fr');
