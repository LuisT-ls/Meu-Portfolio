import { cn } from '@/lib/utils'

interface IconBadgeProps {
  icon: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'brand' | 'surface'
}

const sizeMap = {
  sm: 'w-8 h-8 text-base',
  md: 'w-10 h-10 text-lg',
  lg: 'w-14 h-14 text-2xl',
}

/**
 * Rounded icon container reused across sections
 * (certificacoes, habilidades, projetos, contato, experiencia).
 */
export function IconBadge({
  icon,
  className,
  size = 'md',
  variant = 'brand',
}: IconBadgeProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-xl flex-shrink-0',
        sizeMap[size],
        variant === 'brand'
          ? 'bg-brand/10 text-brand'
          : 'bg-surface text-content-muted',
        className
      )}
    >
      <i className={icon} aria-hidden="true" />
    </div>
  )
}
