'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Link2 } from 'lucide-react'
import { Badge } from './Badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './Card'

const ORBIT_RADIUS_PX = 150
const ROTATION_ANIM_MS = 520

function shortestDeltaDeg(from, toDeg) {
  const a = ((from % 360) + 360) % 360
  const b = ((toDeg % 360) + 360) % 360
  let d = b - a
  if (d > 180) d -= 360
  if (d < -180) d += 360
  return d
}

function statusUppercase(status) {
  if (status === 'completed') return 'COMPLETE'
  if (status === 'in-progress') return 'IN PROGRESS'
  return 'PENDING'
}

export default function RadialOrbitalTimeline({ timelineData }) {
  const [expandedItems, setExpandedItems] = useState({})
  const [rotationAngle, setRotationAngle] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)
  const [pulseEffect, setPulseEffect] = useState({})
  const [activeNodeId, setActiveNodeId] = useState(null)

  const containerRef = useRef(null)
  const orbitRef = useRef(null)
  const nodeRefs = useRef({})
  const rotationAngleRef = useRef(0)
  const rotationAnimFrameRef = useRef(null)

  useEffect(() => {
    rotationAngleRef.current = rotationAngle
  }, [rotationAngle])

  const cancelRotationAnimation = useCallback(() => {
    if (rotationAnimFrameRef.current != null) {
      cancelAnimationFrame(rotationAnimFrameRef.current)
      rotationAnimFrameRef.current = null
    }
  }, [])

  const animateRotationTo = useCallback(
    (goalDeg) => {
      cancelRotationAnimation()
      const start = rotationAngleRef.current
      const delta = shortestDeltaDeg(start, goalDeg)
      const duration = ROTATION_ANIM_MS
      let t0 = null

      const tick = (now) => {
        if (t0 == null) t0 = now
        const u = Math.min(1, (now - t0) / duration)
        const eased = 1 - (1 - u) ** 3
        const next = start + delta * eased
        setRotationAngle(next)
        if (u < 1) {
          rotationAnimFrameRef.current = requestAnimationFrame(tick)
        } else {
          rotationAnimFrameRef.current = null
          setRotationAngle(start + delta)
        }
      }
      rotationAnimFrameRef.current = requestAnimationFrame(tick)
    },
    [cancelRotationAnimation]
  )

  const handleContainerClick = (e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      cancelRotationAnimation()
      setExpandedItems({})
      setActiveNodeId(null)
      setPulseEffect({})
      setAutoRotate(true)
    }
  }

  const getRelatedItems = (itemId) => {
    const currentItem = timelineData.find((item) => item.id === itemId)
    return currentItem ? currentItem.relatedIds : []
  }

  const centerViewOnNode = useCallback(
    (nodeId) => {
      if (!nodeRefs.current[nodeId]) return

      const nodeIndex = timelineData.findIndex((item) => item.id === nodeId)
      const totalNodes = timelineData.length
      const targetAngle = (nodeIndex / totalNodes) * 360
      const goal = 270 - targetAngle
      animateRotationTo(goal)
    },
    [timelineData, animateRotationTo]
  )

  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const newState = { ...prev }

      Object.keys(newState).forEach((key) => {
        if (parseInt(key, 10) !== id) {
          newState[key] = false
        }
      })

      newState[id] = !prev[id]

      if (!prev[id]) {
        setActiveNodeId(id)
        setAutoRotate(false)

        const relatedItems = getRelatedItems(id)
        const newPulse = {}
        relatedItems.forEach((relId) => {
          newPulse[relId] = true
        })
        setPulseEffect(newPulse)

        centerViewOnNode(id)
      } else {
        setActiveNodeId(null)
        setAutoRotate(true)
        setPulseEffect({})
      }

      return newState
    })
  }

  useEffect(() => {
    let rotationTimer

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => (prev + 0.25) % 360)
      }, 50)
    }

    return () => {
      clearInterval(rotationTimer)
    }
  }, [autoRotate])

  useEffect(() => () => cancelRotationAnimation(), [cancelRotationAnimation])

  const calculateNodePosition = (index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360
    const radian = (angle * Math.PI) / 180

    const x = ORBIT_RADIUS_PX * Math.cos(radian)
    const y = ORBIT_RADIUS_PX * Math.sin(radian)

    const zIndex = Math.round(100 + 50 * Math.cos(radian))
    const depth = (1 + Math.sin(radian)) / 2
    const opacity = 0.65 + 0.35 * depth

    return { x, y, zIndex, opacity }
  }

  const isRelatedToActive = (itemId) => {
    if (!activeNodeId) return false
    return getRelatedItems(activeNodeId).includes(itemId)
  }

  const openItem =
    activeNodeId != null && expandedItems[activeNodeId]
      ? timelineData.find((i) => i.id === activeNodeId)
      : null

  const orbitDiameter = ORBIT_RADIUS_PX * 2

  return (
    <div
      className="flex min-h-[420px] w-full items-center justify-center overflow-visible bg-background py-6 sm:py-8"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative h-[380px] w-full max-w-2xl overflow-visible sm:h-[400px]">
        <div
          className="absolute inset-0 flex items-center justify-center overflow-visible"
          ref={orbitRef}
        >
          {/* Faint concentric rings (center depth) */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]"
            style={{ width: orbitDiameter + 120, height: orbitDiameter + 120 }}
          />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]"
            style={{ width: orbitDiameter + 56, height: orbitDiameter + 56 }}
          />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.08]"
            style={{ width: orbitDiameter + 8, height: orbitDiameter + 8 }}
          />

          {/* Orbit path */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15"
            style={{ width: orbitDiameter, height: orbitDiameter }}
          />

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length)
            const isExpanded = expandedItems[item.id]
            const isRelated = isRelatedToActive(item.id)
            const isPulsing = Boolean(pulseEffect[item.id])
            const Icon = item.icon
            const caption = item.orbitLabel ?? item.title

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el
                }}
                className="absolute flex flex-col items-center transition-opacity duration-300 ease-out"
                style={{
                  left: `calc(50% + ${position.x}px)`,
                  top: `calc(50% + ${position.y}px)`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isExpanded ? 200 : position.zIndex,
                  opacity: isExpanded ? 1 : position.opacity,
                }}
              >
                <button
                  type="button"
                  className="group flex cursor-pointer flex-col items-center gap-2 border-0 bg-transparent p-0 text-left transition-transform duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleItem(item.id)
                  }}
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/35 bg-background/60 text-white shadow-[0_0_18px_rgba(255,255,255,0.1)] backdrop-blur-sm transition-[box-shadow,border-color,transform] duration-300 ease-out group-hover:border-white/55 group-hover:shadow-[0_0_26px_rgba(255,255,255,0.16)] ${
                      isPulsing ? 'animate-pulse ring-2 ring-accent/50' : ''
                    } ${isRelated && !isExpanded ? 'ring-1 ring-white/40' : ''} ${isExpanded ? 'scale-105 border-white/50' : ''}`}
                  >
                    <Icon className="text-white" size={18} strokeWidth={1.35} />
                  </div>
                  <span className="max-w-[7rem] text-center text-[11px] font-medium tracking-wide text-white/55">
                    {caption}
                  </span>
                </button>
              </div>
            )
          })}

          {/* Detail card: fixed in the middle of the orbit (does not follow the picked node). */}
          {openItem ? (
            <div
              role="dialog"
              aria-label={openItem.title}
              className="pointer-events-auto absolute left-1/2 top-1/2 z-[300] w-64 max-w-[85vw] sm:w-72"
              style={{ transform: 'translate(-50%, calc(-50% + 4.5rem))' }}
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={openItem.id}
                  className="w-full"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Card className="w-full rounded-xl border border-white/25 bg-black text-primary shadow-[0_12px_48px_rgba(0,0,0,0.55)]">
                  <CardHeader className="space-y-3 pb-0">
                    <div className="flex items-center justify-between gap-3">
                      <Badge className="border border-white/70 bg-transparent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white">
                        {statusUppercase(openItem.status)}
                      </Badge>
                      <span className="shrink-0 text-xs text-secondary">{openItem.date}</span>
                    </div>
                    <CardTitle className="text-xl font-bold tracking-tight text-white">{openItem.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-0 pt-4">
                    <p className="text-sm leading-relaxed text-secondary">{openItem.content}</p>
                  </CardContent>
                  <CardFooter className="mt-0 flex flex-col items-stretch gap-3 border-t border-white/10 pt-4">
                    {openItem.relatedIds?.length ? (
                      <>
                        <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-secondary">
                          <Link2 className="h-3 w-3 shrink-0 opacity-70" aria-hidden />
                          Connected nodes
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {openItem.relatedIds.map((relatedId) => {
                            const related = timelineData.find((n) => n.id === relatedId)
                            if (!related) return null
                            const label = related.orbitLabel ?? related.title
                            return (
                              <button
                                key={relatedId}
                                type="button"
                                className="inline-flex items-center gap-1 rounded border border-white/25 bg-transparent px-2.5 py-1.5 text-xs font-medium text-primary transition hover:bg-white/5"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleItem(relatedId)
                                }}
                              >
                                {label}
                                <ArrowRight className="h-3 w-3 opacity-60" aria-hidden />
                              </button>
                            )
                          })}
                        </div>
                      </>
                    ) : null}
                    <Link
                      to="/projects"
                      className="inline-flex items-center gap-1 text-sm font-medium text-accent transition hover:brightness-125"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View all projects
                      <ArrowRight className="h-3.5 w-3.5 opacity-80" aria-hidden />
                    </Link>
                  </CardFooter>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
