'use client'

import { useEffect } from 'react'

export function PWARegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(
        (registration) => {
          console.log('SW registered: ', registration)
        },
        (error) => {
          console.log('SW registration failed: ', error)
        }
      )
    }
  }, [])

  return null
}
