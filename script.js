
/* ==================== FLOATING SPARKLES ==================== */

const sparkleLayer = document.createElement('div');
sparkleLayer.className = 'sparkle-layer';
sparkleLayer.setAttribute('aria-hidden', 'true');

document.body.appendChild(sparkleLayer);

const sparkleCount = 22;

for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement('span');

    sparkle.className = 'sparkle';

    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';

    sparkle.style.setProperty(
        '--size',
        (Math.random() * 3 + 2) + 'px'
    );

    sparkle.style.setProperty(
        '--duration',
        (Math.random() * 3 + 3) + 's'
    );

    sparkle.style.setProperty(
        '--delay',
        (Math.random() * 5) + 's'
    );

    sparkleLayer.appendChild(sparkle);
}
