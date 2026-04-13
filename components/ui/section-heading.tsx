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
      className="text-center mb-16"
    >
      <h2 className="text-4xl sm:text-5xl font-bold mb-4">{title}</h2>
      {subtitle && (
        <p className="text-content-secondary text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
