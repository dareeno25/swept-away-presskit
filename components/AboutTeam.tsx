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

interface AboutTeamProps {
  dict: Dictionary
  title?: string
  subtitle?: string
  description: string
  images?: ImageData[]
  className?: string
}

export default function AboutTeam({
  dict,
  title,
  subtitle,
  description,
  images = [],
  className,
}: AboutTeamProps) {
  return (
    <section
      id="about-team"
      className={cn('py-16 md:py-24 px-4', className)}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                      className={cn(
                        "relative overflow-hidden shadow-xl border border-border/30",
                        idx === 0 ? "aspect-[3/4] rounded-3xl" : "aspect-square rounded-3xl mt-8"
                      )}
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

          <div className={cn(
            images.length === 0 && "lg:col-span-2 max-w-3xl mx-auto text-center"
          )}>
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
            >
              {title || dict.aboutTeam.title}
            </motion.h2>
            {(subtitle || dict.aboutTeam.subtitle) && (
              <motion.p
                className="text-lg text-muted-foreground mb-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                transition={{ delay: 0.1 }}
              >
                {subtitle || dict.aboutTeam.subtitle}
              </motion.p>
            )}
            <motion.div
              className=" rounded-3xl p-6 md:p-8 border border-border/30"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
                {description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
