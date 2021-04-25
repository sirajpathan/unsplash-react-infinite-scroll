import { useEffect } from 'react';


/*
    Hook for resize event. This can be moved at root level and with help of context
    this event will be passed to the other elements.
*/
export default function useResizeEvent(fn) {
    useEffect(() => {
        // set resize listener
        window.addEventListener('resize', fn);

        // clean up function
        return () => {
            // remove resize listener
            window.removeEventListener('resize', fn);
        }
    }, [])

    return null;
}