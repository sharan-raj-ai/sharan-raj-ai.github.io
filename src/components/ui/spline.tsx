'use client'

import { Suspense, lazy, memo } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

const SplineSceneComponent = ({ scene, className }: SplineSceneProps) => {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-accent/30 border-t-accent rounded-full animate-spin"></div>
        </div>
      }
    >
      <div className={className} style={{ willChange: 'transform' }}>
        <Spline
          scene={scene}
        />
      </div>
    </Suspense>
  )
}

export const SplineScene = memo(SplineSceneComponent)
