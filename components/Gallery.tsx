"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Download, Play, X } from 'lucide-react'
import type { Dictionary } from '@/lib/dictionary'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'

interface MediaItem {
  type: 'image' | 'video' | 'gif'
  url: string
  thumbnail?: string
  alt?: string
  downloadUrl?: string
}

interface GalleryProps {
  dict: Dictionary
  items: MediaItem[]
  layout?: '2x2' | '2-large' | 'full-width' | 'mixed'
  downloadAllUrl?: string
  className?: string
}

export default function Gallery({
  dict,
  items,
  layout = 'mixed',
  downloadAllUrl,
  className,
}: GalleryProps) {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)

  const getGridClass = () => {
    switch (layout) {
      case '2x2':
        return 'grid-cols-1 sm:grid-cols-2'
      case '2-large':
        return 'grid-cols-1 md:grid-cols-2'
      case 'full-width':
        return 'grid-cols-1'
      case 'mixed':
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    }
  }

  return (
    <section id="gallery" className={cn('py-16 md:py-24 ', className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            {dict.gallery.title}
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
          >
            {dict.gallery.subtitle}
          </motion.p>
          {downloadAllUrl && (
            <motion.a
              href={downloadAllUrl}
              download
              className="inline-block mt-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                {dict.mediaAssets.downloadAll}
              </Button>
            </motion.a>
          )}
        </div>

        <motion.div
          className={cn('grid gap-4 md:gap-6', getGridClass())}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {items.map((item, index) => (
            <motion.div key={index} variants={staggerItem}>
              <Dialog>
                <DialogTrigger asChild>
                  <motion.button
                    className="relative group overflow-hidden rounded-lg aspect-video bg-muted cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-full"
                    onClick={() => setSelectedItem(item)}
                    whileHover={{ scale: 1.03, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={item.thumbnail || item.url}
                      alt={item.alt || `Gallery item ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Play className="w-8 h-8 text-white fill-white" />
                        </motion.div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </motion.button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0 overflow-hidden">
                  <div className="relative aspect-video">
                    {item.type === 'video' ? (
                      <video
                        src={item.url}
                        controls
                        autoPlay
                        className="w-full h-full"
                      />
                    ) : (
                      <Image
                        src={item.url}
                        alt={item.alt || `Gallery item ${index + 1}`}
                        fill
                        className="object-contain"
                      />
                    )}
                  </div>
                  {item.downloadUrl && (
                    <div className="p-4 flex justify-end">
                      <a href={item.downloadUrl} download>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                      </a>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
