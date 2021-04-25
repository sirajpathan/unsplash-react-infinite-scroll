import { useEffect } from 'react';

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