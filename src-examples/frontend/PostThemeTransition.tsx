'use client'

import React, { useEffect, useRef, useState } from 'react'

type Theme = {
  background: string
  text: string
  surface: string
}

type Props = {
  initial: Theme
  scrolled: Theme
  children: React.ReactNode
}

// Production posts can define an initial visual treatment and a second
// treatment that becomes active after the reader begins scrolling.
export function PostThemeTransition({ initial, scrolled, children }: Props) {
  const [hasScrolled, setHasScrolled] = useState(false)
  const locked = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 20 && !locked.current) {
        locked.current = true
        setHasScrolled(true)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const theme = hasScrolled ? scrolled : initial

  return (
    <div
      style={{
        '--page-background': theme.background,
        '--page-text': theme.text,
        '--page-surface': theme.surface,
        backgroundColor: 'var(--page-background)',
        color: 'var(--page-text)',
        minHeight: '100vh',
        transition: 'background-color 500ms ease, color 500ms ease',
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
