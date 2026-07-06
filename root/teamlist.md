---
layout: home
---

<script setup>
const teams = [
  { number: '4053', name: 'Mavens of Mayhem', logo: '/assets/logos/4053colorLogo.png' },
  { number: '4054', name: 'Gradle Demons', logo: '/assets/logos/4054colorLogo.svg' },
  { number: '12808', name: 'RevAmped Robotics', logo: '/assets/logos/revamped_w_bkgrnd - Zhunquin Wang.jpg' },
  { number: '16655', name: "Nutz 'n Voltz", logo: null },
  { number: '16750', name: 'Technototes', logo: '/assets/logos/16750 Technototes White background Black Text - Kevin Frei.jpg' },
  { number: '23511', name: 'Seattle Solvers', logo: '/assets/logos/SeattlesSolversLogo.png' },
  { number: '23849', name: 'Droid Force', logo: '/assets/logos/df_logo.png' },
  { number: '25444', name: 'The Reckless', logo: '/assets/logos/THE RECKLESS logo - Javohir Jurayev.jpg' },
  { number: '27393', name: 'The FBI - FIRST Bot Inventors', logo: null },
  { number: '28395', name: 'Pixel Raptors', logo: '/assets/logos/logo - Pixel Raptors.png' },
  { number: '30452', name: 'Robo-X', logo: null },
  { number: '30624', name: 'Pangolins in Disguise', logo: '/assets/logos/drawingv21 - Pangolins. In. Disguise.png' },
  { number: '99967', name: 'Chud Force', logo: null },
];

const COLS = 4;
const lastRow = Math.floor((teams.length - 1) / COLS);
function rowGapClass(i) {
  const row = Math.floor(i / COLS);
  if (row === 0) return 'gap-first';
  if (row === 2) return 'gap-third';
  if (row === lastRow) return 'gap-last';
  return 'gap-mid';
}
</script>

<br />
<br />

# Team List
These are the attending teams and robots for the 2026 West Coast Invitational.
You can also find the list online at [https://ftc-events.firstinspires.org/2025/USWABLOS](https://ftc-events.firstinspires.org/2025/USWABLOS).
Seeing a default FIRST logo instead of your team's? Send us one via [email](mailto:westcoastinvitationalftc@gmail.com) or [Discord](/discord) to get it updated! 

<div class="team-grid">
  <div class="team-card" :class="rowGapClass(i)" v-for="(t, i) in teams" :key="t.number">
    <div class="team-heading">Team {{ t.number }}</div>
    <div class="team-name">{{ t.name }}</div>
    <div class="team-logo">
      <img :src="encodeURI(t.logo || '/assets/logos/default_ftc_logo.png')" :alt="t.name + ' logo'" loading="lazy" />
    </div>
  </div>
</div>

<style scoped>
.team-grid {
  /* Customizable gap after the 3rd row (before the 4th row). */
  --row3-gap: 100px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: start;
  column-gap: 24px;
  row-gap: 0;
  margin: 48px 0 0;
}

.team-card {
  text-align: center;
  aspect-ratio: 3 / 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  overflow: hidden;
}

/* Per-row vertical spacing (4 columns). */
.team-card.gap-first { margin-bottom: -30px; }
.team-card.gap-mid { margin-bottom: 100px; }
.team-card.gap-third { margin-bottom: -30px }
.team-card.gap-last { margin-bottom: -200px; }

@media (max-width: 720px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .team-card.gap-first,
  .team-card.gap-mid,
  .team-card.gap-third,
  .team-card.gap-last {
    margin-bottom: 32px;
  }
}

.team-heading {
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.4;
}

.team-name {
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.4;
  margin-bottom: 16px;
}

.team-logo {
  flex: 1;
  min-height: 0;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
}

.team-logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

</style>
