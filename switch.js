document.addEventListener('DOMContentLoaded', () => {
    const modeSwitch = document.getElementById('mode-switch');
    const clockWidget = document.getElementById('clock-widget');

    if (modeSwitch && clockWidget) {
        modeSwitch.addEventListener('change', () => {
            const currentSrc = clockWidget.src;

            if (modeSwitch.checked) {
                clockWidget.src = currentSrc.replace('mode=5x3', 'mode=3x2');
            } else {
                clockWidget.src = currentSrc.replace('mode=3x2', 'mode=5x3');
            }
        });
    }
});

window.addEventListener('message', (event) => {
    const expectedOrigin = "https://bergerjacob.github.io";
    if (event.origin !== expectedOrigin) {
        console.warn(`Message from unexpected origin: ${event.origin}. Expected: ${expectedOrigin}. Aborting.`);
        return;
    }

    if (event.data.clockWidth) {
        const clockIframe = document.getElementById('clock-widget');
        if (clockIframe) {
            clockIframe.style.width = `${event.data.clockWidth}px`;
        }
    }
});
