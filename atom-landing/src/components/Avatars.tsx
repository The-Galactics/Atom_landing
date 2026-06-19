'use client';

import {
  AvatarGroup,
  AvatarGroupTooltip,
} from '@/components/animate-ui/primitives/animate/avatar-group';

// UI Avatar no existe en tu repo; usamos markup simple para el demo.
// (El AvatarGroup viene de animate-ui primitives.)


const AVATARS = [
  {
    src: 'Thomas.jpg',
    fallback: 'SK',
    tooltip: 'Thomas Salazar Ruiz',
  },
  {
    src: 'Carloss.jpeg',
    fallback: 'CN',
    tooltip: 'Carlos Andrés Restrepo Yepes',
  },
  {
    src: 'emma.jpg',
    fallback: 'AW',
    tooltip: 'Emmanuel Suarez garcia',
  },
  {
    src: 'jose.jpg',
    fallback: 'GR',
    tooltip: 'Jose Daniel Gutierrez Echavarria',
  },
  {
    src: 'juancho.jpg',
    fallback: 'JH',
    tooltip: 'Juan Pablo Olarte Alvarez',
  },
  {
    src: 'nico.jpg',
    fallback: 'DH',
    tooltip: 'Nicolas Agudeloflorez',
  },
];

export const AvatarGroupDemo = () => {
  return (
    <AvatarGroup>
      {AVATARS.map((avatar, index) => (
        <div
          key={index}
          className="relative size-12 overflow-hidden rounded-full"
        >
          <img
            src={avatar.src}
            alt={avatar.fallback}
            className="h-full w-full object-cover"
          />
          <AvatarGroupTooltip>{avatar.tooltip}</AvatarGroupTooltip>
        </div>
      ))}
    </AvatarGroup>
  );
};

