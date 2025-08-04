import { Menubar } from 'primereact/menubar'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  const items = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      command: () => navigate('/home')
    },
    {
      label: 'Buscar Credencial',
      icon: 'pi pi-search',
      command: () => navigate('/buscar-credencial')
    }
  ]

  return (
    <Menubar
      model={items}
      start={<span className="text-xl font-bold">Sistema Credenciales</span>}
    />
  )
}