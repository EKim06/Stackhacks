import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { motion } from 'framer-motion'

export interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image'
  mediaSrc: string
  posterSrc?: string
  /** Omit for solid black hero; fades out with scroll to reveal `bg-background` behind. */
  bgImageSrc?: string
  title?: string
  date?: string
  scrollToExpand?: string
  textBlend?: boolean
  children?: ReactNode
  /** After intro finishes expanding, called once so parent can unmount this hero and show normal page. */
  onIntroComplete?: () => void
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
  onIntroComplete,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false)
  const [touchStartY, setTouchStartY] = useState(0)
  const [isMobileState, setIsMobileState] = useState(false)

  const sectionRef = useRef<HTMLDivElement | null>(null)
  const scrollProgressRef = useRef(0)
  const mediaFullyExpandedRef = useRef(false)
  const onIntroCompleteRef = useRef(onIntroComplete)

  useEffect(() => {
    onIntroCompleteRef.current = onIntroComplete
  }, [onIntroComplete])

  useEffect(() => {
    if (!mediaFullyExpanded || !onIntroCompleteRef.current) return
    const id = window.setTimeout(() => {
      onIntroCompleteRef.current?.()
    }, 420)
    return () => window.clearTimeout(id)
  }, [mediaFullyExpanded])

  useEffect(() => {
    scrollProgressRef.current = scrollProgress
  }, [scrollProgress])

  useEffect(() => {
    mediaFullyExpandedRef.current = mediaFullyExpanded
  }, [mediaFullyExpanded])

  useEffect(() => {
    setScrollProgress(0)
    setShowContent(false)
    setMediaFullyExpanded(false)
    scrollProgressRef.current = 0
    mediaFullyExpandedRef.current = false
  }, [mediaType])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const sp = scrollProgressRef.current
      const mfe = mediaFullyExpandedRef.current

      if (mfe && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false)
        mediaFullyExpandedRef.current = false
        e.preventDefault()
      } else if (!mfe) {
        e.preventDefault()
        const scrollDelta = e.deltaY * 0.0009
        const newProgress = Math.min(Math.max(sp + scrollDelta, 0), 1)
        scrollProgressRef.current = newProgress
        setScrollProgress(newProgress)

        if (newProgress >= 1) {
          setMediaFullyExpanded(true)
          mediaFullyExpandedRef.current = true
          setShowContent(true)
        } else if (newProgress < 0.75) {
          setShowContent(false)
        }
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return

      const touchY = e.touches[0].clientY
      const deltaY = touchStartY - touchY
      const mfe = mediaFullyExpandedRef.current
      const sp = scrollProgressRef.current

      if (mfe && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false)
        mediaFullyExpandedRef.current = false
        e.preventDefault()
      } else if (!mfe) {
        e.preventDefault()
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005
        const scrollDelta = deltaY * scrollFactor
        const newProgress = Math.min(Math.max(sp + scrollDelta, 0), 1)
        scrollProgressRef.current = newProgress
        setScrollProgress(newProgress)

        if (newProgress >= 1) {
          setMediaFullyExpanded(true)
          mediaFullyExpandedRef.current = true
          setShowContent(true)
        } else if (newProgress < 0.75) {
          setShowContent(false)
        }

        setTouchStartY(touchY)
      }
    }

    const handleTouchEnd = () => {
      setTouchStartY(0)
    }

    const handleScroll = () => {
      if (!mediaFullyExpandedRef.current) {
        window.scrollTo(0, 0)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [touchStartY])

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileState(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)

    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250)
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400)
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150)

  const firstWord = title ? title.split(' ')[0] : ''
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : ''

  return (
    <div
      ref={sectionRef}
      className="overflow-x-hidden transition-colors duration-700 ease-in-out"
    >
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-start">
        <div className="relative flex min-h-[100dvh] w-full flex-col items-center bg-background">
          <motion.div
            className="pointer-events-none absolute inset-0 z-0 min-h-screen w-full"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {bgImageSrc ? (
              <>
                <img
                  src={bgImageSrc}
                  alt=""
                  className="h-screen w-screen object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/40" />
              </>
            ) : (
              <div className="h-full min-h-screen w-full bg-black" />
            )}
          </motion.div>

          <div className="container relative z-10 mx-auto flex flex-col items-center justify-start">
            <div className="relative flex h-[100dvh] w-full flex-col items-center justify-center">
              <div
                className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rounded-2xl transition-none"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                }}
              >
                {mediaType === 'video' ? (
                  mediaSrc.includes('youtube.com') ? (
                    <div className="pointer-events-none relative h-full w-full">
                      <iframe
                        width="100%"
                        height="100%"
                        src={
                          mediaSrc.includes('embed')
                            ? `${mediaSrc}${mediaSrc.includes('?') ? '&' : '?'}autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1`
                            : `${mediaSrc.replace('watch?v=', 'embed/')}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=${mediaSrc.split('v=')[1]}`
                        }
                        className="h-full w-full rounded-xl"
                        title="Hero video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <div
                        className="pointer-events-none absolute inset-0 z-10"
                        style={{ pointerEvents: 'none' }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-black/30"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  ) : (
                    <div className="pointer-events-none relative h-full w-full">
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="h-full w-full rounded-xl object-cover"
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <div
                        className="pointer-events-none absolute inset-0 z-10"
                        style={{ pointerEvents: 'none' }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-black/30"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  )
                ) : (
                  <div className="relative h-full w-full">
                    <img
                      src={mediaSrc}
                      alt={title || 'StackHacks'}
                      className="h-full w-full rounded-xl object-contain bg-black/20"
                    />
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-black/50"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                <div className="relative z-10 mt-4 flex flex-col items-center text-center transition-none">
                  {date && (
                    <p
                      className="text-lg text-accent md:text-2xl"
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className="text-center font-medium text-primary/90"
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`relative z-10 flex w-full flex-col items-center justify-center gap-2 text-center transition-none md:gap-4 ${
                  textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                }`}
              >
                <motion.h2
                  className="text-5xl font-bold text-accent transition-none md:text-6xl lg:text-7xl"
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className="text-center text-5xl font-bold text-accent transition-none md:text-6xl lg:text-7xl"
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>
            </div>

            {children != null ? (
              <motion.section
                className="flex w-full flex-col px-8 py-10 md:px-16 lg:py-20"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: showContent
                    ? 1
                    : Math.min(1, Math.max(0, (scrollProgress - 0.45) / 0.5)),
                }}
                transition={{ duration: showContent ? 0.85 : 0.25, ease: 'easeOut' }}
              >
                {children}
              </motion.section>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ScrollExpandMedia
