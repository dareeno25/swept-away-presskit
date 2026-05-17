import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Mail, Twitter, Facebook, Instagram, Youtube, Globe } from 'lucide-react'
import type { Dictionary } from '@/lib/dictionary'

interface ImageData {
  url: string
  alt: string
}

interface SocialLink {
  platform: 'twitter' | 'facebook' | 'instagram' | 'youtube' | 'website' | 'discord' | 'tiktok'
  url: string
  label?: string
}

interface MediaContactProps {
  dict: Dictionary
  prContactName: string
  prEmail: string
  socialLinks?: SocialLink[]
  images?: ImageData[]
  className?: string
}

const socialIcons = {
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  website: Globe,
  discord: Globe,
  tiktok: Globe,
}

export default function MediaContact({
  dict,
  prContactName,
  prEmail,
  socialLinks = [],
  images = [],
  className,
}: MediaContactProps) {
  return (
    <section id="contact" className={cn('py-16 md:py-24 px-4', className)}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              {dict.mediaContact.title}
            </h2>

            <div className=" rounded-3xl p-6 md:p-8 border border-border space-y-6">
              {/* PR Contact */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {dict.mediaContact.prContact}
                </p>
                <p className="text-lg font-semibold">{prContactName}</p>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {dict.mediaContact.email}
                </p>
                <a
                  href={`mailto:${prEmail}`}
                  className="inline-flex items-center gap-2 text-lg font-semibold text-primary hover:underline"
                >
                  <Mail className="w-5 h-5" />
                  {prEmail}
                </a>
              </div>

              {/* Social Media */}
              {socialLinks.length > 0 && (
                <div className="space-y-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    {dict.mediaContact.socialMedia}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {socialLinks.map((link, index) => {
                      const Icon = socialIcons[link.platform] || Globe
                      return (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="secondary" size="sm" className="rounded-full gap-2 h-9">
                            <Icon className="w-4 h-4" />
                            {link.label || link.platform}
                          </Button>
                        </a>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {images.length > 0 && (
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl border border-border/30">
              <Image
                src={images[0].url}
                alt={images[0].alt}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
