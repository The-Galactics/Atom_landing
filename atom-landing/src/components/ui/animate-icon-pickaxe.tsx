'use client';

import * as React from 'react';

import { Pickaxe } from '@/components/animate-ui/icons/pickaxe';
import { AnimateIcon } from '@/components/animate-ui/icons/icon';

export type AnimatePickaxeIconProps = {
  className?: string;
  size?: number;
};

export function AnimatePickaxeIcon({
  className,
  size = 128,
}: AnimatePickaxeIconProps) {
  return (
    <AnimateIcon
      animateOnView
      animateOnViewOnce={false}
      animateOnHover
      loop
      loopDelay={1200}
    >
      <Pickaxe size={size} className={className} />
    </AnimateIcon>
  );
}

