export const links = {
  application: "https://forms.gle/cX4nfBhYHmSySns46",
  volunteerForm: "https://forms.gle/Gb3gx34czK2gEqRUA",
  discord: "https://discord.com/invite/JmVjbpxUj3",
  board:
    "https://docs.google.com/forms/d/e/1FAIpQLScWnhZhqJCcpHEJJiMIBqT8Ya7h9Fa6kPnLI3ubsjXa5hTW2g/viewform?usp=header",
  stream: "https://youtube.com/live/VAuyBn-IWAk",
  email: "westcoastinvitationalftc@gmail.com",
  instagram: "https://www.instagram.com/west.coast.invitational",
  youtube: "https://www.youtube.com/@WestCoastInvitational",
  visas: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html/visa",
  teams2026: "https://ftc-events.firstinspires.org/2025/USWABLOS",
};

// Short URLs people already use. Keep these working.
export const redirects = [
  { from: "apply", to: links.application },
  { from: "volunteer", to: links.volunteerForm },
  { from: "board", to: links.board },
  { from: "discord", to: links.discord },
  { from: "stream", to: links.stream },
  { from: "about", to: "/event" },
  { from: "awards", to: "/event/awards" },
  { from: "teamlist", to: "/teams/list" },
];
