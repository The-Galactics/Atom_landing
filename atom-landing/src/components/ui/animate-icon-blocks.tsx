'use client';

import * as React from 'react';

import { Blocks } from '@/components/animate-ui/icons/blocks';
import { AnimateIcon } from '@/components/animate-ui/icons/icon';

export type AnimateBlocksIconProps = {
  className?: string;
  size?: number;
};

export function AnimateBlocksIcon({
  className,
  size = 64,
}: AnimateBlocksIconProps) {
  return (
    <AnimateIcon animateOnHover>
      <Blocks size={size} className={className} />
    </AnimateIcon>
  );
}

