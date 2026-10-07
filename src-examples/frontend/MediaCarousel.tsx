'use client'

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

type MediaItem =
  | { mediaType: 'upload'; uploadedMedia: MediaType }
  | { mediaType: 'youtube' | 'vimeo'; videoUrl: string }

type Props = {
  items: MediaItem[]
}

function getEmbedUrl(provider: 'youtube' | 'vimeo', rawUrl: string): string | null {
  try {
    const url = new URL(rawUrl)

    if (provider === 'youtube') {
      const id = url.hostname === 'youtu.be' ? url.pathname.slice(1) : url.searchParams.get('v')
      return id ? `https://www.youtube.com/embed/${id}` : null
    }

    const id = url.pathname.split('/').filter(Boolean).at(-1)
    return id ? `https://player.vimeo.com/video/${id}` : null
  } catch {
    return null
  }
}

function VideoEmbed({ provider, url }: { provider: 'youtube' | 'vimeo'; url: string }) {
  const embedUrl = getEmbedUrl(provider, url)
  if (!embedUrl) return null

  return (
    <iframe
      className="aspect-video w-full"
      src={embedUrl}
      title={`${provider} video`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  )
}

export function MediaCarousel({ items }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: items.length > 1 })

  if (!items.length) return null

  return (
    <section className="relative w-full" aria-label="Media gallery">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((item, index) => (
            <div className="min-w-0 flex-[0_0_100%]" key={index}>
              {item.mediaType === 'upload' ? (
                <Media resource={item.uploadedMedia} />
              ) : (
                <VideoEmbed provider={item.mediaType} url={item.videoUrl} />
              )}
            </div>
          ))}
        </div>
      </div>

      {items.length > 1 && (
        <div className="mt-4 flex justify-center gap-4">
          <button type="button" onClick={() => emblaApi?.scrollPrev()} aria-label="Previous slide">
            <ChevronLeft aria-hidden="true" />
          </button>
          <button type="button" onClick={() => emblaApi?.scrollNext()} aria-label="Next slide">
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  )
}
