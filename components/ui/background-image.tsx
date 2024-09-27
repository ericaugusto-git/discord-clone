import { cn } from '@/lib/utils';
import { CSSProperties } from 'react';

type BackgroundImageProps = {
  src: string;
  children?: React.ReactNode
  size: CSSProperties['width']; // This allows any valid CSS width value
  className?: string,
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
};

export default function BackgroundImage({children , src, size, className, width, height }: BackgroundImageProps) {
  return (
    <div
      style={{ backgroundImage: `url("${src}")`, width: width ?? size, height: height ?? size }}
      className={cn("backgroundImage", className)}
    >
      {children}
    </div>
  );
}
