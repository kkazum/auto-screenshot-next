import { useRef, useEffect, useState, CSSProperties } from 'react';
import interact from 'interactjs';

type Partial<T> = {
  [P in keyof T]?: T[P];
};

const initPosition: {
  width: number;
  height: number | string;
  x: number;
  y: number;
} = {
  width: 300,
  height: 100,
  x: 0,
  y: 0,
};

export function useInteractJS(position: Partial<typeof initPosition> = initPosition) {
  const [_position, setPosition] = useState({
    ...initPosition,
    ...position,
  });

  const interactRef = useRef(null);
  let { x, y, width, height } = _position;

  const init = () => {
    interact(interactRef.current as unknown as HTMLElement)
      .draggable({
        inertia: false,
      })
      .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        preserveAspectRatio: true,
        inertia: false,
      })
      .on('dragmove', (event) => {
        x += event.dx;
        y += event.dy;
        setPosition({
          width,
          height,
          x,
          y,
        });
      })
      .on('resizemove', (event) => {
        width = event.rect.width;
        height = event.rect.height;
        x += event.deltaRect.left;
        y += event.deltaRect.top;
        setPosition({
          x,
          y,
          width,
          height,
        });
      });
  };

  useEffect(() => {
    init();
  }, []);

  return {
    ref: interactRef,
    style: {
      transform: `translate3D(${_position.x}px, ${_position.y}px, 0)`,
      width: _position.width + 'px',
      height: _position.height === 'auto' ? 'auto' : _position.height + 'px',
      position: 'absolute' as CSSProperties['position'],
    },
    position: _position,
  };
}
