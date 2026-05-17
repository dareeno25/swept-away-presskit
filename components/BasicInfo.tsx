"use client";

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Dictionary } from '@/lib/dictionary'
import { fadeInUp, scaleIn, staggerContainer, staggerItem } from '@/lib/animations'

interface ImageData {
  url: string
  alt: string
}

interface BasicInfoProps {
  dict: Dictionary
  gameName: string
  genre: string
  platforms: string[]
  playerMode: 'single' | 'multiplayer' | 'both'
  releaseDate: string
  pricing: 'free' | 'paid'
  priceAmount?: string
  images?: ImageData[]
  className?: string
}

export default function BasicInfo({
  dict,
  gameName,
  genre,
  platforms,
  playerMode,
  releaseDate,
  pricing,
  priceAmount,
  images = [],
  className,
}: BasicInfoProps) {
  const playerModeText = {
    single: dict.basicInfo.singlePlayer,
    multiplayer: dict.basicInfo.multiplayer,
    both: `${dict.basicInfo.singlePlayer} / ${dict.basicInfo.multiplayer}`,
  }

  const pricingText = pricing === 'free'
    ? dict.basicInfo.free
    : priceAmount
      ? `${dict.basicInfo.paid} - ${priceAmount}`
      : dict.basicInfo.paid

  const infoItems = [
    { label: dict.basicInfo.gameName, value: gameName },
    { label: dict.basicInfo.genre, value: genre },
    { label: dict.basicInfo.platforms, value: platforms.join(', ') },
    { label: dict.basicInfo.playerMode, value: playerModeText[playerMode] },
    { label: dict.basicInfo.releaseDate, value: releaseDate },
    { label: dict.basicInfo.pricing, value: pricingText },
  ]

  return (
    <section id="game-overview" className={cn('py-16 md:py-24 px-4', className)}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
            >
              {dict.basicInfo.title}
            </motion.h2>
            <motion.div
              className="bg-muted/30 rounded-3xl p-6 md:p-8 border border-border/30"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
              >
                {infoItems.map((item, index) => (
                  <motion.div key={index} className="space-y-1" variants={staggerItem}>
                    <dt className="text-sm font-medium text-muted-foreground">
                      {item.label}
                    </dt>
                    <dd className="text-lg font-semibold">{item.value}</dd>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {images.length > 0 && (
            <div className="space-y-4">
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
