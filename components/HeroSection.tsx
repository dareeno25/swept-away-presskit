"use client";

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { fadeInUp, scaleIn } from '@/lib/animations'

interface HeroSectionProps {
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
  mediaUrl?: string
  mediaType?: 'image' | 'video'
  secondaryCta?: {
    text: string
    link: string
  }
  className?: string
}

export default function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaLink,
  mediaUrl,
  mediaType = 'image',
  secondaryCta,
  className,
}: HeroSectionProps) {
  return (
    <section
      id="hero"
      className={cn(
        'min-h-screen flex items-center justify-center pt-24 pb-16 px-4',
        className
      )}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-3xl mb-12">
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight mt-12"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              {title}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
            >
              <a href={ctaLink}>
                <Button size="lg" className="w-full sm:w-auto rounded-full px-8 h-12 text-base font-medium">
                  {ctaText}
                </Button>
              </a>
              {secondaryCta && (
                <a href={secondaryCta.link}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto rounded-full px-8 h-12 text-base font-medium"
                  >
                    {secondaryCta.text}
                  </Button>
                </a>
              )}
            </motion.div>
          </div>

          {mediaUrl && (
            <motion.div
              className="w-full max-w-4xl"
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              transition={{ delay: 0.6 }}
            >
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-black/20 border border-border/30">
                {mediaType === 'video' ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={mediaUrl} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={mediaUrl}
                    alt="Hero image"
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
