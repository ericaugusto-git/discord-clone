import { cn } from '@/lib/utils';
import { CSSProperties } from 'react';

type BackgroundImageProps = {
  src: string;
  size: CSSProperties['width']; // This allows any valid CSS width value
  styles?: string
};

export default function BackgroundImage({ src, size, styles }: BackgroundImageProps) {
  return (
    <div
      style={{ backgroundImage: `url("${src}")`, width: size, height: size }}
      className={cn("backgroundImage", styles)}
    ></div>
  );
}
