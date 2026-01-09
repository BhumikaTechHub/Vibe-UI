import { DeviceContext } from '../types/signals';

export const getDeviceContext = (): DeviceContext => {
    if (typeof window === 'undefined') {
        return {
            isMobile: false,
            isTouch: false,
            screenSize: { width: 0, height: 0 },
            userAgent: 'server'
        };
    }

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    return {
        isMobile,
        isTouch,
        screenSize: {
            width: window.innerWidth,
            height: window.innerHeight
        },
        userAgent: navigator.userAgent
    };
};
