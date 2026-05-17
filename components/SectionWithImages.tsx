import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImageData {
  url: string
  alt: string
}

interface SectionWithImagesProps {
  children: React.ReactNode
  images?: ImageData[]
  imagePosition?: 'top' | 'bottom' | 'left' | 'right' | 'split'
  className?: string
  containerClassName?: string
  id?: string
}

export default function SectionWithImages({
  children,
  images = [],
  imagePosition = 'bottom',
  className,
  containerClassName,
  id,
}: SectionWithImagesProps) {
  const hasImages = images.length > 0
  const hasTwoImages = images.length >= 2

  // For left/right layouts
  if (imagePosition === 'left' || imagePosition === 'right') {
    return (
      <section id={id} className={cn('py-16 md:py-24 px-4', className)}>
        <div className={cn('container mx-auto max-w-6xl', containerClassName)}>
          <div className={cn(
            'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center',
            imagePosition === 'left' && 'lg:grid-flow-dense'
          )}>
            {hasImages && (
              <div className={cn(
                imagePosition === 'left' && 'lg:col-start-1'
              )}>
                {hasTwoImages ? (
                  <div className="grid grid-cols-2 gap-4">
                    {images.slice(0, 2).map((img, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-3xl overflow-hidden shadow-xl border border-border/30"
                      >
                        <Image
                          src={img.url}
                          alt={img.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl border border-border/30">
                    <Image
                      src={images[0].url}
                      alt={images[0].alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            )}
            <div>{children}</div>
          </div>
        </div>
      </section>
    )
  }

  // For split layout (content in middle, images on sides)
  if (imagePosition === 'split' && hasTwoImages) {
    return (
      <section id={id} className={cn('py-16 md:py-24 px-4', className)}>
        <div className={cn('container mx-auto max-w-7xl', containerClassName)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-border hidden lg:block">
              <Image
                src={images[0].url}
                alt={images[0].alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center">{children}</div>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-border hidden lg:block">
              <Image
                src={images[1].url}
                alt={images[1].alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8 lg:hidden">
            {images.slice(0, 2).map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border border-border/30"
              >
                <Image src={img.url} alt={img.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Default top/bottom layout
  return (
    <section id={id} className={cn('py-16 md:py-24 px-4', className)}>
      <div className={cn('container mx-auto max-w-6xl', containerClassName)}>
        {imagePosition === 'top' && hasImages && (
          <div className="mb-12">
            {hasTwoImages ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {images.slice(0, 2).map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-video rounded-3xl overflow-hidden shadow-xl border border-border/30"
                  >
                    <Image src={img.url} alt={img.alt} fill className="object-cover" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative aspect-video max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-xl border border-border/30">
                <Image
                  src={images[0].url}
                  alt={images[0].alt}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        )}

        {children}

        {imagePosition === 'bottom' && hasImages && (
          <div className="mt-12">
            {hasTwoImages ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {images.slice(0, 2).map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-video rounded-3xl overflow-hidden shadow-xl border border-border/30"
                  >
                    <Image src={img.url} alt={img.alt} fill className="object-cover" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative aspect-video max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-xl border border-border/30">
                <Image
                  src={images[0].url}
                  alt={images[0].alt}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
