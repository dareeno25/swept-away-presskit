// Game Data Types
export interface GameInfo {
  gameName: string
  genre: string
  platforms: string[]
  playerMode: 'single' | 'multiplayer' | 'both'
  releaseDate: string
  pricing: 'free' | 'paid'
  priceAmount?: string
}

export interface GameDescription {
  shortDescription: string
  detailedDescription: string
  keyFeatures: string[]
  targetAudience?: string
  storyWorld?: string
}

export interface Developer {
  name: string
  role: string
}

export interface StudioInfo {
  studioName: string
  studioDescription?: string
  keyDevelopers: Developer[]
  publisher?: string
}

export interface SocialLink {
  platform: 'twitter' | 'facebook' | 'instagram' | 'youtube' | 'website' | 'discord' | 'tiktok' | 'linkedin'
  url: string
  label?: string
}

export interface TeamMember {
  name: string
  role: string
  photo?: string
  bio?: string
  socialLinks?: Array<{
    platform: 'twitter' | 'linkedin' | 'website'
    url: string
  }>
}

export interface MediaItem {
  type: 'image' | 'video' | 'gif'
  url: string
  thumbnail?: string
  alt?: string
  downloadUrl?: string
}

export interface Platform {
  name: string
  icon: 'windows' | 'mac' | 'linux' | 'ios' | 'android' | 'steam' | 'playstation' | 'xbox' | 'switch'
  url: string
  available: boolean
}

export interface ContactInfo {
  prContactName: string
  prEmail: string
  socialLinks?: SocialLink[]
}

export interface AdditionalInfo {
  notes?: string
  contentWarnings?: string[]
  assetUsageGuidelines?: string
}

// Complete Press Kit Data
export interface PressKitData {
  game: GameInfo
  description: GameDescription
  studio: StudioInfo
  contact: ContactInfo
  team: TeamMember[]
  gallery: MediaItem[]
  platforms: Platform[]
  additional?: AdditionalInfo
}
