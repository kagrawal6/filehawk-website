import React, { createContext, useContext, useState, ReactNode } from 'react'

type HawkMood = 'idle' | 'hover' | 'search' | 'happy' | 'loading'

interface HawkContextType {
  mood: HawkMood
  setMood: (mood: HawkMood) => void
}

const HawkContext = createContext<HawkContextType | undefined>(undefined)

export const useHawk = () => {
  const context = useContext(HawkContext)
  if (!context) {
    throw new Error('useHawk must be used within a HawkProvider')
  }
  return context
}

interface HawkProviderProps {
  children: ReactNode
}

export const HawkProvider: React.FC<HawkProviderProps> = ({ children }) => {
  const [mood, setMood] = useState<HawkMood>('idle')

  return (
    <HawkContext.Provider value={{ mood, setMood }}>
      {children}
    </HawkContext.Provider>
  )
}
