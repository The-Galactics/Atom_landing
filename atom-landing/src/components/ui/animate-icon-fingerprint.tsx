'use client';

import * as React from 'react';

import { Fingerprint } from '@/components/animate-ui/icons/fingerprint';
import { AnimateIcon } from '@/components/animate-ui/icons/icon';

export type AnimateFingerprintIconProps = {
  className?: string;
  size?: number;
};

export function AnimateFingerprintIcon({
  className,
  size = 128,
}: AnimateFingerprintIconProps) {
  return (
    <AnimateIcon animateOnHover>
      <Fingerprint size={size} className={className} />
    </AnimateIcon>
  );
}

