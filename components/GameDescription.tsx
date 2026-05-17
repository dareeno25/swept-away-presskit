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

interface GameDescriptionProps {
  dict: Dictionary
  shortDescription: string
  detailedDescription: string
  keyFeatures: string[]
  targetAudience?: string
  storyWorld?: string
  images?: ImageData[]
  className?: string
}

export default function GameDescription({
  dict,
  shortDescription,
  detailedDescription,
  keyFeatures,
  targetAudience,
  storyWorld,
  images = [],
  className,
}: GameDescriptionProps) {
  return (
    <section className={cn('py-16 md:py-24 px-4', className)}>
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          {dict.gameDescription.title}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div
              className=" rounded-3xl p-6 md:p-8 border border-border/30"
              variants={staggerItem}
            >
              <h3 className="text-lg font-semibold mb-3">
                {dict.gameDescription.shortDescription}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {shortDescription}
              </p>
            </motion.div>
            <motion.div
              className=" rounded-3xl p-6 md:p-8 border border-border/30"
              variants={staggerItem}
            >
              <h3 className="text-lg font-semibold mb-3">
                {dict.gameDescription.detailedDescription}
              </h3>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {detailedDescription}
              </p>
            </motion.div>
          </motion.div>

          {images.length > 0 && (
            <motion.div
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-border/30"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={scaleIn}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {images.length > 1 && (
            <motion.div
              className="relative aspect-video rounded-3xl overflow-hidden shadow-xl border border-border order-2 lg:order-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={scaleIn}
            >
              <Image
                src={images[1].url}
                alt={images[1].alt}
                fill
                className="object-cover"
              />
            </motion.div>
          )}

          <motion.div
            className={cn(
              "order-1 lg:order-2",
              images.length <= 1 && "lg:col-span-2 max-w-2xl mx-auto"
            )}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <div className=" rounded-3xl p-6 md:p-8 border border-border/30">
              <h3 className="text-lg font-semibold mb-4">
                {dict.gameDescription.keyFeatures}
              </h3>
              <motion.ul
                className="space-y-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
              >
                {keyFeatures.map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    variants={staggerItem}
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground pt-0.5">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </div>

        {(targetAudience || storyWorld) && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {targetAudience && (
              <motion.div
                className=" rounded-3xl p-6 md:p-8 border border-border/30"
                variants={staggerItem}
              >
                <h3 className="text-lg font-semibold mb-3">
                  {dict.gameDescription.targetAudience}
                </h3>
                <p className="text-muted-foreground">{targetAudience}</p>
              </motion.div>
            )}
            {storyWorld && (
              <motion.div
                className=" rounded-3xl p-6 md:p-8 border border-border/30"
                variants={staggerItem}
              >
                <h3 className="text-lg font-semibold mb-3">
                  {dict.gameDescription.storyWorld}
                </h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {storyWorld}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
