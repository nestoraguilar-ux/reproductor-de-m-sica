const intro = document.getElementById("intro");
const scene = document.getElementById("scene");
const openBtn = document.getElementById("openBtn");
const particles = document.getElementById("particles");
const petals = document.getElementById("petals");
const heartDots = document.getElementById("heartDots");
const musicBtn = document.getElementById("musicBtn");

/* Abrir regalo */
openBtn.addEventListener("click", () => {
    intro.classList.add("hide");

    setTimeout(() => {
        intro.style.display = "none";
        scene.classList.remove("hidden");
    }, 900);
});

/* Partículas */
for (let i = 0; i < 220; i++) {
    const p = document.createElement("span");
    p.className = "particle";

    const size = Math.random() * 5 + 2;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;
    p.style.animationDuration = `${3 + Math.random() * 6}s`;
    p.style.animationDelay = `${Math.random() * 5}s`;

    particles.appendChild(p);
}

/* Pétalos */
function createPetal() {
    const p = document.createElement("span");
    p.className = "petal";
    p.textContent = "🌼";
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${5 + Math.random() * 7}s`;
    p.style.animationDelay = `${Math.random() * 5}s`;
    p.style.fontSize = `${10 + Math.random() * 14}px`;
    petals.appendChild(p);

    setTimeout(() => p.remove(), 13000);
}

for (let i = 0; i < 18; i++) createPetal();
setInterval(createPetal, 700);

/* Corazón de partículas */
const W = 310;
const H = 270;

for (let i = 0; i < 650; i++) {
    const t = Math.random() * Math.PI * 2;

    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);

    const scale = 5.0 + Math.random() * 1.4;

    const dot = document.createElement("span");
    dot.className = "dot";

    dot.style.left = `${W / 2 + x * scale}px`;
    dot.style.top = `${H / 2 - y * scale}px`;
    dot.style.opacity = `${.25 + Math.random() * .75}`;
    dot.style.transform = `scale(${.5 + Math.random() * 1.2})`;

    heartDots.appendChild(dot);
}

/* Explosión de partículas al tocar/clickear */
document.addEventListener("click", (event) => {
    if (event.target === musicBtn || event.target === openBtn) return;

    for (let i = 0; i < 25; i++) {
        const spark = document.createElement("span");
        spark.className = "particle";

        spark.style.position = "fixed";
        spark.style.left = `${event.clientX}px`;
        spark.style.top = `${event.clientY}px`;
        spark.style.width = "5px";
        spark.style.height = "5px";
        spark.style.zIndex = "500";

        document.body.appendChild(spark);

        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 130;

        spark.animate(
            [
                { transform: "translate(0,0)", opacity: 1 },
                {
                    transform:
                        `translate(${Math.cos(angle) * distance}px,
                                   ${Math.sin(angle) * distance}px)`,
                    opacity: 0
                }
            ],
            {
                duration: 900,
                easing: "ease-out"
            }
        );

        setTimeout(() => spark.remove(), 950);
    }
});

/* Música real: archivo MP3 incluido en la carpeta */
const musica = new Audio("cancion.mp3");
musica.loop = true;
musica.volume = 0.5;

let playing = false;

/* Al abrir el regalo comienza la canción */
openBtn.addEventListener("click", async () => {
    try {
        await musica.play();
        playing = true;
        musicBtn.textContent = "🔊";
    } catch (error) {
        console.log("El navegador no permitió iniciar la música automáticamente.", error);
    }
});

/* Botón de música: reproducir / pausar */
musicBtn.addEventListener("click", async () => {
    try {
        if (!playing) {
            await musica.play();
            playing = true;
            musicBtn.textContent = "🔊";
        } else {
            musica.pause();
            playing = false;
            musicBtn.textContent = "🔇";
        }
    } catch (error) {
        console.log("No se pudo reproducir la canción.", error);
    }
});
