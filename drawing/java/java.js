document.addEventListener("DOMContentLoaded", function () {
    const iceCube = document.querySelector(".ice-cube-wrapper");
    const juice = document.querySelector(".juice-container svg");
    const iceSound = new Audio("media/ice.mp3");

    document.addEventListener("mousemove", function (event) {
        let iceWidth = iceCube.offsetWidth / 2;
        let iceHeight = iceCube.offsetHeight / 2;

        iceCube.style.left = `${event.clientX - iceWidth}px`;
        iceCube.style.top = `${event.clientY - iceHeight}px`;
    });

    juice.addEventListener("mouseenter", function () {
        iceCube.style.opacity = "0";
        addIceToJuice();
    });

    juice.addEventListener("mouseleave", function () {
        iceCube.style.opacity = "1";
    });

    function addIceToJuice() {
        const newIce = document.createElement("div");
        newIce.classList.add("ice-cube-wrapper", "svg-ice-cube");

        const cube = document.createElement("div");
        cube.classList.add("ice-cube");

        const faces = ["front", "back", "left", "right", "top", "bottom"];
        faces.forEach(faceName => {
            const face = document.createElement("div");
            face.classList.add("face", faceName);
            cube.appendChild(face);
        });

        newIce.appendChild(cube);

        let juiceRect = juice.getBoundingClientRect();
        let x = Math.random() * (juiceRect.width - 210) + juiceRect.left + 60;
        let y = Math.random() * (juiceRect.height - 150) + juiceRect.top + 105;

        newIce.style.left = `${x}px`;
        newIce.style.top = `${y}px`;

        document.body.appendChild(newIce);

        iceSound.currentTime = 0;
        iceSound.play();
    }
});

