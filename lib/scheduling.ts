const configuredSchedulingUrl = process.env.NEXT_PUBLIC_SCHEDULING_URL?.trim()

export const schedulingUrl = configuredSchedulingUrl || 'https://wa.me/5571993322305'
export const hasSchedulingIntegration = Boolean(configuredSchedulingUrl)
