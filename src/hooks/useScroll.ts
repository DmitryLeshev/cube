import React, { useEffect, useRef } from 'react';

export interface IProps {
  parentRef: React.RefObject<HTMLElement>;
  childRef: React.RefObject<HTMLElement>;
  callback: () => any;
}

export default function useScroll({ parentRef, childRef, callback }: IProps) {
  const observer = useRef<any>(null);

  useEffect(() => {
    const options = {
      root: parentRef.current,
      rootMargin: '100px',
      threshold: 0,
    };

    observer.current = new IntersectionObserver(([target]) => {
      if (target.isIntersecting) {
        callback();
      }
    }, options);

    observer.current.observe(childRef.current);

    return () => {
      // eslint-disable-next-line
      observer.current.unobserve(childRef.current);
    };

    // eslint-disable-next-line
  }, []);
}
