import { useLayoutEffect } from 'react';

export default (callbacks) => {
    useLayoutEffect(() => {
        callbacks.mount && callbacks.mount();
        callbacks.noupdate = true;
        return () => {
            callbacks.unmount && callbacks.unmount();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useLayoutEffect(() => {
        !callbacks.noupdate && callbacks.update && callbacks.update();
        callbacks.noupdate = false;
    });
}