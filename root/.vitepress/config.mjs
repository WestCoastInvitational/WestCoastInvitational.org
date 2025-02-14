import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "West Coast Invitational",
  description: "Offseason competition for FIRST Tech Challenge",

  cleanUrls: true,
  appearance: 'force-dark',



  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo:'/assets/v3_wci_25_whitetext.png',
    siteTitle:false,

    nav: [
      { text: 'About', link: '/about' },
      { text: 'Awards', link: '/awards' },
      { text: 'Contact', link: 'mailto:contact@westcoastinvitational.org' },
      { text: 'Register', link: 'https://forms.gle/BikYtwEAd88kv4hr8' },
      { text: 'Volunteer', link: 'https://forms.gle/mhn4rXsb4iEnrCjW8' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'youtube', link: 'https://www.youtube.com/@WestCoastInvitational' }
    ]
  },
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]]
})
