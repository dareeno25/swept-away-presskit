"use client";

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Download, Apple, Monitor, Smartphone, Gamepad2 } from 'lucide-react'
import type { Dictionary } from '@/lib/dictionary'
import { fadeInUp, scaleIn, staggerContainer, staggerItem } from '@/lib/animations'

interface ImageData {
  url: string
  alt: string
}

interface Platform {
  name: string
  icon: 'windows' | 'mac' | 'linux' | 'ios' | 'android' | 'steam' | 'playstation' | 'xbox' | 'switch'
  url: string
  available: boolean
}

interface DownloadSectionProps {
  dict: Dictionary
  platforms: Platform[]
  images?: ImageData[]
  className?: string
}

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  windows: Monitor,
  mac: Apple,
  linux: Monitor,
  ios: Smartphone,
  android: Smartphone,
  steam: Gamepad2,
  playstation: Gamepad2,
  xbox: Gamepad2,
  switch: Gamepad2,
}

export default function DownloadSection({
  dict,
  platforms,
  images = [],
  className,
}: DownloadSectionProps) {
  return (
    <section
      id="download"
      className={cn('py-16 md:py-24 px-4', className)}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
            >
              {dict.download.title}
            </motion.h2>
            <motion.p
              className="text-muted-foreground mb-8 text-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
            >
              {dict.download.subtitle}
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {platforms.map((platform, index) => {
                const Icon = platformIcons[platform.icon] || Download
                return (
                  <motion.a
                    key={index}
                    href={platform.available ? platform.url : undefined}
                    className={cn(!platform.available && 'pointer-events-none')}
                    variants={staggerItem}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      variant={platform.available ? 'default' : 'secondary'}
                      className={cn(
                        'rounded-2xl h-14 px-6 gap-3',
                        !platform.available && 'opacity-50'
                      )}
                      disabled={!platform.available}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="flex flex-col items-start">
                        <span className="text-[10px] opacity-70 leading-none">
                          {platform.available
                            ? dict.download.downloadNow
                            : dict.download.comingSoon}
                        </span>
                        <span className="font-semibold text-sm">{platform.name}</span>
                      </span>
                    </Button>
                  </motion.a>
                )
              })}
            </motion.div>
          </div>

          {images.length > 0 && (
            <div>
              {images.length >= 2 ? (
                <motion.div
                  className="grid grid-cols-2 gap-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={staggerContainer}
                >
                  {images.slice(0, 2).map((img, idx) => (
                    <motion.div
                      key={idx}
                      className="relative aspect-square rounded-3xl overflow-hidden shadow-xl border border-border/30"
                      variants={staggerItem}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={img.url}
                        alt={img.alt}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="relative aspect-video rounded-3xl overflow-hidden shadow-xl border border-border/30"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={scaleIn}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={images[0].url}
                    alt={images[0].alt}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
