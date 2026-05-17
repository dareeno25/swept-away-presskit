import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'

import Header from '@/components/Header'
import AboutTeam from '@/components/AboutTeam'
import TeamMembers from '@/components/TeamMembers'
import Footer from '@/components/Footer'

const teamData = {
  studioName: 'Glitch Studio',
  aboutDescription: `This project is crafted by a small, focused team driven by a passion for emotional storytelling and atmospheric world-building. Each contributor brings a unique perspective — design, art direction, sound, and testing — working together to shape a gentle yet immersive experience. The team's size allows for fast iteration, tight creative control, and a unified artistic vision.`,
  teamMembers: [
    {
      name: 'Dareen AI-OUFI',
      role: 'Artist and Writer',
      photo: '/images/team/dareen.svg',
      socialLinks: [
        { platform: 'website' as const, url: 'https://linktr.ee/dareenAlOufi' },
      ],
    },
    {
      name: 'Yahya Sindi',
      role: 'game programmer and designer',
      photo: '/images/team/raud.svg',
      socialLinks: [
        { platform: 'website' as const, url: 'https://founder.harcos.studio/' },
      ],
    },
    {
      name: 'Samah Taha',
      role: 'Game Designer',
      photo: '/images/team/samah.svg',
      socialLinks: [
        { platform: 'linkedin' as const, url: 'https://www.linkedin.com/in/samah-taha-184331198/' },
      ],
    },
    {
      name: 'Zeyad sabri ali',
      role: 'Artist',
      photo: '/images/team/layan.svg',
      socialLinks: [
        { platform: 'twitter' as const, url: 'https://www.instagram.com/zeyadius?igsh=MTd0aHZkNGtkM2Ewcw==' },
      ],
    },
  ],
  images: [
    { url: '/images/studio-logo.png', alt: 'CuatroStudio' },
    { url: '/images/team2.svg', alt: 'Team at work' },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary()

  return {
    title: dict.aboutTeam.title,
    description: 'Meet the talented team behind Swept Away.',
  }
}

export default async function AboutPage() {
  const dict = await getDictionary()

  return (
    <main className="min-h-screen">
      <Header
        dict={dict}
        logoUrl="/images/logo.svg"
        logoAlt="CuatroStudio"
      />

      <div className="pt-24">
        <AboutTeam
          dict={dict}
          title={dict.aboutTeam.title}
          subtitle={dict.aboutTeam.subtitle}
          description={teamData.aboutDescription}
          images={teamData.images}
        />

        <TeamMembers
          members={teamData.teamMembers}
          columns={4}
        />
      </div>

      <Footer
        dict={dict}
        studioName={teamData.studioName}
        logoUrl="/images/studio-logo.png"
      />
    </main>
  )
}
