const contactContent = {
  meta: "Contact",
  title: "Let's Connect",
  intro: "Reach me via email, phone, and professional platforms. I usually respond within one business day.",
  privacyNote:
    "Privacy note: this site uses Google Fonts, which may result in requests to Google font servers when pages load.",
  methods: [
    {
      title: "Email",
      value: "alan@dautaln.com",
      actionLabel: "Send email",
      href: "mailto:alan@dautaln.com",
      iconSvg:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M4 7l8 6 8-6"></path></svg>',
    },
    {
      title: "Phone",
      value: "+1 (857) 869-6993",
      actionLabel: "Call now",
      href: "tel:+18578696993",
      iconSvg:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v2a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 3.18 2 2 0 0 1 4.11 1h2a2 2 0 0 1 2 1.72l.34 2.72a2 2 0 0 1-.57 1.72L6.7 8.3a16 16 0 0 0 9 9l1.14-1.18a2 2 0 0 1 1.72-.57l2.72.34A2 2 0 0 1 22 16.92z"></path></svg>',
    },
    {
      title: "LinkedIn",
      value: "linkedin.com/in/alandautov",
      actionLabel: "Open profile",
      href: "https://www.linkedin.com/in/alandautov/",
      newTab: true,
      iconSvg:
        '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3A1.97 1.97 0 1 0 5.3 6.94 1.97 1.97 0 0 0 5.25 3zM20 13.02C20 9.56 18.15 8 15.68 8c-1.99 0-2.88 1.09-3.38 1.86V8.5H8.93V20h3.37v-6.38c0-1.68.32-3.3 2.4-3.3 2.05 0 2.08 1.92 2.08 3.4V20H20v-6.98z"></path></svg>',
    },
    {
      title: "GitHub",
      value: "github.com/dautal",
      actionLabel: "Open GitHub",
      href: "https://github.com/dautal",
      newTab: true,
      iconSvg:
        '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12A11.5 11.5 0 0 0 8.36 22.93c.58.11.79-.25.79-.56v-2.15c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.04 1.76 2.71 1.25 3.37.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.19 1.18a10.9 10.9 0 0 1 5.82 0c2.22-1.49 3.18-1.18 3.18-1.18.64 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.04.78 2.1v3.12c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"></path></svg>',
    },
    {
      title: "Telegram",
      value: "@dautaln",
      actionLabel: "Open Telegram",
      href: "https://t.me/dautaln",
      newTab: true,
      iconSvg:
        '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.94 4.66c.18-.84-.3-1.17-1.02-.9L2.43 10.9c-.78.31-.77.75-.14.94l4.74 1.48 11-6.94c.52-.32 1-.15.61.2l-8.91 8.05-.34 4.8c.5 0 .72-.23 1-.5l2.4-2.33 4.98 3.68c.91.5 1.57.24 1.8-.84l2.37-14.78z"></path></svg>',
    },
    {
      title: "Resume",
      value: "Latest CV and experience",
      actionLabel: "Open resume",
      href: "/Alan-Dautov-Resume.pdf",
      newTab: true,
      iconSvg:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z"></path><path d="M14 2v5h5"></path><path d="M9 13h6"></path><path d="M9 17h6"></path><path d="M9 9h1"></path></svg>',
    },
    {
      title: "Location",
      value: "Boston, MA",
      actionLabel: "View map",
      href: "https://maps.google.com/?q=Boston,+MA",
      newTab: true,
      iconSvg:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-6-5.33-6-11a6 6 0 1 1 12 0c0 5.67-6 11-6 11z"></path><circle cx="12" cy="10" r="2.4"></circle></svg>',
    },
  ],
};

window.SITE_CONTENT = {
  contact: contactContent,
  contactPage: contactContent,
};
