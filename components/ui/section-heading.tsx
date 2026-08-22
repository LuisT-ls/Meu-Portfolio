import { motion } from 'framer-motion'

interface SectionHeadingProps {
  title: string
  subtitle?: string
}

/**
 * Animated section heading used across all major sections.
 * Eliminates duplicated motion.div + h2 + p patterns.
 */
export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-10 px-1 text-center sm:mb-12 lg:mb-16"
    >
      <h2 className="mb-3 text-3xl font-bold sm:mb-4 sm:text-4xl lg:text-5xl">{title}</h2>
      {subtitle && (
        <p className="mx-auto max-w-2xl text-base text-content-secondary sm:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
