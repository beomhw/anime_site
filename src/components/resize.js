import {useState, useEffect} from 'react';

// window size get
export function useGetSize () {
    const [size, setSize] = useState({
        width: undefined,
        height: undefined
    })

    useEffect(() => {
        function handleResize() {
            setSize({
                width: window.document.documentElement.clientWidth,
                height: window.document.documentElement.clientHeight
            })
        }
        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    },[]);

    return size;
}