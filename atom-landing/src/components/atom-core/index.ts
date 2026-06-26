/**
 * index.ts — Public barrel export for atom-core-react.
 *
 * Consumers import from the package root:
 *   import { AtomCore }                  from 'atom-core-react';         // component
 *   import type { AtomCoreProps, AtomCoreHandle } from 'atom-core-react'; // types
 */

export { AtomCore } from './AtomCore';
export type { AtomCoreProps, AtomCoreHandle } from './AtomCore';
