// src/components/credenciales/Buscador.tsx
import { useState } from 'react';

type BuscadorProps = {
  onSearch: (query: string) => void;
  placeholder?: string;
};

export const Buscador = ({ onSearch, placeholder = "Buscar..." }: BuscadorProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="buscador-form">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
      />
      <button type="submit">Buscar</button>
    </form>
  );
};