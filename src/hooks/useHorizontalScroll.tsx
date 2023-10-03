import { useEffect, MutableRefObject } from 'react';

export function useHorizontalScroll(scrollRef: MutableRefObject<HTMLElement | null>) {
    useEffect(() => {  
        const ScrollElement = scrollRef.current;

        function onScroll(e: WheelEvent) {
            e.preventDefault();
            ScrollElement!.scrollLeft += e.deltaY;
        }

        ScrollElement?.addEventListener('wheel', onScroll, {passive:false});

        return () => ScrollElement?.removeEventListener('wheel', onScroll);
    }, [scrollRef]);
}