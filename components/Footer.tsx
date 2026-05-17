"use client";

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Dictionary } from '@/lib/dictionary'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'

interface QuickLink {
  label: string
  href: string
}

interface FooterProps {
  dict: Dictionary
  studioName: string
  logoUrl?: string
  quickLinks?: QuickLink[]
  className?: string
}

export default function Footer({
  dict,
  studioName,
  logoUrl,
  quickLinks,
  className,
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  const defaultQuickLinks: QuickLink[] = [
    { label: dict.nav.home, href: '#hero' },
    { label: dict.nav.gameOverview, href: '#game-overview' },
    { label: dict.nav.download, href: '#download' },
    { label: dict.nav.aboutTeam, href: '#about-team' },
  ]

  const links = quickLinks || defaultQuickLinks

  return (
    <footer className={cn('mx-4 md:mx-8 mb-6 mt-8 rounded-3xl py-12 px-4 bg-[#0a0a0a] text-white', className)}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="rounded-3xl p-8 md:p-12 bg-white/[0.03]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div className="space-y-4 flex flex-col items-center md:items-start" variants={staggerItem}>
              {logoUrl && (
                <div className="relative w-32 h-32">
                  <Image
                    src={logoUrl}
                    alt={studioName}
                    fill
                    className="object-contain brightness-0 invert"
                  />
                </div>
              )}
              <p className="font-semibold text-xl">{studioName}</p>
              <p className="text-sm text-white/60">
                &copy; {currentYear} {studioName}. {dict.footer.copyright}.
              </p>
            </motion.div>

            <motion.div variants={staggerItem}>
              <h4 className="font-semibold mb-4">{dict.footer.quickLinks}</h4>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors hover:text-[#FFD60F] text-white/70"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
