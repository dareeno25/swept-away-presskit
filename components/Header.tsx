"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import type { Dictionary } from '@/lib/dictionary'
import { staggerContainer, staggerItem } from '@/lib/animations'

interface HeaderProps {
  dict: Dictionary
  logoUrl?: string
  logoAlt?: string
}

export default function Header({ dict, logoUrl, logoAlt = 'Game Logo' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#hero', label: dict.nav.home },
    { href: '#game-overview', label: dict.nav.gameOverview },
    { href: '#download', label: dict.nav.download },
    { href: '#about-team', label: dict.nav.aboutTeam },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav
        className={cn(
          "max-w-4xl mx-auto transition-all duration-500 ease-out overflow-hidden",
          isScrolled
            ? "bg-background/70 backdrop-blur-xl shadow-lg shadow-black/5 border border-border/30"
            : "bg-background/40 backdrop-blur-md border border-transparent",
          isMobileMenuOpen ? "rounded-2xl" : "rounded-full",
          "px-2 py-1"
        )}
      >
        <div className="flex items-center justify-between h-12 px-2">
          <Link href="/" className="flex items-center gap-2 px-2">
            <span className="text-lg font-bold">{logoAlt}</span>
          </Link>

          <motion.div
            className="hidden md:flex items-center gap-1"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm font-medium text-foreground/70 hover:text-primary rounded-full transition-all"
                variants={staggerItem}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full h-8 w-8"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden py-3 px-2 border-t border-border/30 mt-1"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex flex-col gap-1"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                {navLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    variants={staggerItem}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
