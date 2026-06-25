'use client';

import * as React from 'react';

import { Terminal } from '@/components/animate-ui/icons/terminal';
import { AnimateIcon } from '@/components/animate-ui/icons/icon';

export type AnimateTerminalIconProps = {
  className?: string;
  size?: number;
};

export function AnimateTerminalIcon({
  className,
  size = 64,
}: AnimateTerminalIconProps) {
  return (
    <AnimateIcon animateOnHover>
      <Terminal size={size} className={className} />
    </AnimateIcon>
  );
}

