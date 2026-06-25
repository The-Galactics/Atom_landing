'use client';

import * as React from 'react';

import { AudioLines } from '@/components/animate-ui/icons/audio-lines';
import { AnimateIcon } from '@/components/animate-ui/icons/icon';

export type AnimateAudioLinesIconProps = {
  className?: string;
  size?: number;
};

export function AnimateAudioLinesIcon({
  className,
  size = 64,
}: AnimateAudioLinesIconProps) {
  return (
    <AnimateIcon animateOnHover>
      <AudioLines size={size} className={className} />
    </AnimateIcon>
  );
}

