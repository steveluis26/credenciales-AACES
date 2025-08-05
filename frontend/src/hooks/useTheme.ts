import { useEffect, useState } from 'react'

type Theme = 'lara-light-blue' | 'lara-dark-blue'

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'lara-light-blue'
  })

  useEffect(() => {
    // Elimina el tema anterior
    document.documentElement.classList.remove(theme === 'lara-light-blue' 
      ? 'lara-dark-blue' 
      : 'lara-light-blue')
    
    // Aplica el nuevo tema
    document.documentElement.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'lara-light-blue' ? 'lara-dark-blue' : 'lara-light-blue')
  }

  return { theme, toggleTheme }
}