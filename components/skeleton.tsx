import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  animate?: boolean
}

export function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  animate = true,
}: SkeletonProps) {
  const baseStyles = 'bg-gray-200 dark:bg-gray-700'
  
  const variantStyles = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  }

  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        animate && 'animate-pulse',
        className
      )}
      style={style}
      aria-hidden="true"
    />
  )
}

// Componentes pré-configurados para casos comuns
export function SkeletonCard() {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4">
      <Skeleton variant="circular" width={80} height={80} className="mx-auto" />
      <Skeleton variant="text" height={24} width="60%" className="mx-auto" />
      <Skeleton variant="text" height={16} width="80%" className="mx-auto" />
      <Skeleton variant="text" height={16} width="70%" className="mx-auto" />
    </div>
  )
}

export function SkeletonForm() {
  return (
    <div className="space-y-4">
      <Skeleton variant="text" height={20} width="30%" />
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="text" height={20} width="30%" />
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="text" height={20} width="30%" />
      <Skeleton variant="rectangular" height={120} />
      <Skeleton variant="rectangular" height={48} width="100%" />
    </div>
  )
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          height={16}
          width={i === lines - 1 ? '80%' : '100%'}
        />
      ))}
    </div>
  )
}
