import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'

import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import BasicInfo from '@/components/BasicInfo'
import GameDescription from '@/components/GameDescription'
import DownloadSection from '@/components/DownloadSection'
import AboutTeam from '@/components/AboutTeam'
import TeamMembers from '@/components/TeamMembers'
import Footer from '@/components/Footer'

const gameData = {
  gameName: 'Swept Away',
  genre: '2D Metroidvania, Exploration, Narrative-focused Indie Game',
  platforms: ['PC (Windows)'],
  playerMode: 'single' as const,
  releaseDate: '5 February 2026',
  pricing: 'free' as const,
  priceAmount: 'Free',

  shortDescription: 'A vulnerable duckling must escape the city sewers and reunite with his mother using stealth, instinct, and courage in this atmospheric 2D pixel-art adventure.',
  detailedDescription: `Swept Away is a short, emotional 2D adventure game that follows a lost duckling swept into the city's underground sewers. Players must guide the duckling through dark tunnels, avoid a territorial rat, and navigate through pipes in search of the way back to its family.

The game combines soft pixel art, ambient sound design, and simple mechanics to create a deeply immersive experience. Each phase introduces new challenges — from hiding and stealth to swimming and environmental puzzles — while maintaining a quiet, reflective tone. With no dialogue and minimal UI, the story unfolds through atmosphere, animation, and visual cues.`,
  keyFeatures: [
    'Atmospheric pixel-art visuals',
    'Simple movement, stealth, and swimming mechanics',
    'Emotional storytelling through environment and animation',
    'Minimal UI for immersive gameplay',
    'Ambient soundtrack and sound effects',
    'Short playtime ideal for focused, reflective experience',
  ],
  targetAudience: 'All ages. Players who enjoy emotional, atmospheric storytelling indie games.',
  storyWorld: `A duckling is separated from his mother by falling into the city's sewer system. Alone and afraid, he must navigate the dark, damp tunnels, avoid the rat who guards his territory, and follow the faint light that leads to freedom.

The world is built from soft pixel art and ambient sound, evoking feelings of vulnerability, tension, and hope.`,

  studioName: 'CuatroStudio',
  studioDescription: 'This project is crafted by a small, focused team driven by a passion for emotional storytelling and atmospheric world-building. Each contributor brings a unique perspective — design, art direction, sound, and testing — working together to shape a gentle yet immersive experience.',

  teamMembers: [
    {
      name: 'Dareen AI-OUFI',
      role: 'Artist and Writer',
      photo: '/images/team1.png',
      socialLinks: [
        { platform: 'website' as const, url: 'https://linktr.ee/dareenAlOufi' },
      ],
    },
    {
      name: 'Yahya Sindi',
      role: 'game programmer and designer',
      photo: '/images/profile-placeholder.png',
      socialLinks: [
        { platform: 'website' as const, url: 'https://founder.harcos.studio/' },
      ],
    },
    {
      name: 'Sami Mohamed Alzahrani',
      role: 'game programmer',
      photo: '/images/profile-placeholder.png',
      socialLinks: [
        { platform: 'linkedin' as const, url: '' },
      ],
    },
    {
      name: 'Zeyad sabri ali',
      role: 'Artist',
      photo: '/images/profile-placeholder.png',
      socialLinks: [
        { platform: 'twitter' as const, url: 'https://www.instagram.com/zeyadius?igsh=MTd0aHZkNGtkM2Ewcw==' },
      ],
    },
  ],

  images: {
    hero: '/images/hero-image.png',
    basicInfo: [
      { url: '/11111111.png', alt: 'Sewer Tunnels' },
      { url: '/2222222222.png', alt: 'Duckling Adventure' },
    ],
    gameDescription: [
      { url: '/333333333333.png', alt: 'Stealth Gameplay' },
      { url: '/11111111.png', alt: 'Swimming Mechanics' },
    ],
    download: [
      { url: '/2222222222.png', alt: 'Swept Away' },
    ],
    aboutTeam: [
      { url: '/images/studio-logo.png', alt: 'CuatroStudio' },
      { url: '/333333333333.png', alt: 'Team at work' },
    ],
  },

  downloadPlatforms: [
    { name: 'Steam', icon: 'steam' as const, url: 'https://sami-1q.itch.io/swept-away', available: true },
  ],

  aboutTeamDescription: `This project is crafted by a small, focused team driven by a passion for emotional storytelling and atmospheric world-building. Each contributor brings a unique perspective — design, art direction, sound, and testing — working together to shape a gentle yet immersive experience. The team's size allows for fast iteration, tight creative control, and a unified artistic vision.`,
}

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary()
  const content = dict.content as typeof gameData

  return {
    title: content.gameName,
    description: content.shortDescription,
    openGraph: {
      title: `${content.gameName} - Press Kit`,
      description: content.shortDescription,
    },
  }
}

export default async function HomePage() {
  const dict = await getDictionary()

  const content = dict.content as typeof gameData

  return (
    <main className="min-h-screen">
      <Header
        dict={dict}
        logoUrl="/images/logo.svg"
        logoAlt={content.studioName}
      />

      <HeroSection
        title={content.gameName}
        subtitle={content.shortDescription}
        ctaText={dict.hero.defaultCta}
        ctaLink="#download"
        mediaUrl={gameData.images.hero}
        mediaType="image"
        secondaryCta={{
          text: dict.nav.gameOverview,
          link: '#game-overview',
        }}
      />

      <BasicInfo
        dict={dict}
        gameName={content.gameName}
        genre={content.genre}
        platforms={content.platforms}
        playerMode={gameData.playerMode}
        releaseDate={content.releaseDate}
        pricing={gameData.pricing}
        priceAmount={content.priceAmount}
        images={gameData.images.basicInfo}
      />

      <GameDescription
        dict={dict}
        shortDescription={content.shortDescription}
        detailedDescription={content.detailedDescription}
        keyFeatures={content.keyFeatures}
        targetAudience={content.targetAudience}
        storyWorld={content.storyWorld}
        images={gameData.images.gameDescription}
      />

      <DownloadSection
        dict={dict}
        platforms={gameData.downloadPlatforms}
        images={gameData.images.download}
      />

      <AboutTeam
        dict={dict}
        description={content.aboutTeamDescription}
        images={gameData.images.aboutTeam}
      />

      <TeamMembers
        members={content.teamMembers.map((member, index) => ({
          ...member,
          photo: gameData.teamMembers[index].photo,
          socialLinks: gameData.teamMembers[index].socialLinks,
        }))}
        columns={4}
      />

      <Footer
        dict={dict}
        studioName={content.studioName}
        logoUrl="/images/studio-logo.png"
      />
    </main>
  )
}
