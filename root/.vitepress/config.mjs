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
      { text: 'Register', link: '/apply' },
      { text: 'Volunteer', link: '/volunteer' }
    ],

    socialLinks: [
      { icon: 'youtube', link: 'https://www.youtube.com/@WestCoastInvitational' },
      { icon: 'instagram', link: 'https://www.instagram.com/west.coast.invitational' },
      { icon: 'discord', link: '/discord' }
    ],

    footer: {
      copyright: 'Copyright © 2025 West Coast Invitational. Thanks to Arush Yadlapati for helping create this site.'
    }
  },
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]]
})
