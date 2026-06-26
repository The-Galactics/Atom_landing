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
    <AnimateIcon
      animateOnView
      animateOnViewOnce={false}
      animateOnHover
      loop
      loopDelay={1600}
    >
      <Terminal size={size} className={className} />
    </AnimateIcon>
  );
}

