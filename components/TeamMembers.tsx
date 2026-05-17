"use client";

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Twitter, Linkedin, Globe } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/animations'

interface SocialLink {
  platform: 'twitter' | 'linkedin' | 'website'
  url: string
}

interface TeamMember {
  name: string
  role: string
  photo?: string
  bio?: string
  socialLinks?: SocialLink[]
}

interface TeamMembersProps {
  members: TeamMember[]
  columns?: 2 | 3 | 4
  className?: string
}

const socialIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  website: Globe,
}

export default function TeamMembers({
  members,
  columns = 3,
  className,
}: TeamMembersProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className={cn('py-12 md:py-16 px-4', className)}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className={cn('grid grid-cols-1 gap-6', gridCols[columns])}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {members.map((member, index) => (
            <motion.div
              key={index}
              className="bg-muted/30 rounded-3xl p-6 border border-border/30 text-center hover:bg-muted/50 transition-colors"
              variants={staggerItem}
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden bg-muted">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-muted-foreground">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>

              <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {member.role}
              </p>

              {member.bio && (
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {member.bio}
                </p>
              )}

              {member.socialLinks && member.socialLinks.length > 0 && (
                <div className="flex justify-center gap-2">
                  {member.socialLinks.map((link, linkIndex) => {
                    const Icon = socialIcons[link.platform]
                    return (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <Icon className="w-4 h-4" />
                        </Button>
                      </a>
                    )
                  })}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
