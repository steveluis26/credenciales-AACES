import { useEffect, useState } from 'react'

type Theme = 'lara-light-blue' | 'lara-dark-blue'

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'lara-light-blue'
  })

  useEffect(() => {
    // Ruta relativa desde la raíz del proyecto
    const themePath = `src/assets/styles/theme/${theme}/theme.css`
    
    // Elimina cualquier tema previo
    const oldLinks = document.querySelectorAll('link[data-theme]')
    oldLinks.forEach(link => link.remove())

    // Crea nuevo link
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = themePath
    link.dataset.theme = 'true' // Marcamos como tema
    
    // Manejo de errores
    link.onerror = () => {
      console.error(`Error al cargar el tema: ${themePath}`)
      // Carga tema por defecto como fallback
      const fallback = document.createElement('link')
      fallback.rel = 'stylesheet'
      fallback.href = 'src/assets/styles/theme/lara-light-blue/theme.css'
      document.head.appendChild(fallback)
    }

    document.head.appendChild(link)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'lara-light-blue' ? 'lara-dark-blue' : 'lara-light-blue')
  }

  return { theme, toggleTheme }
}