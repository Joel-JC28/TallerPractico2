document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".img-hover");
    const box = document.getElementById("flotante");
    const text = document.getElementById("texto");
    const icon = document.getElementById("icono");

    images.forEach(function (img) {
        img.addEventListener("mouseenter", function () {
            const card = img.closest(".fly");
            text.textContent = card.dataset.msg;

            if (img.alt === "Misión") icon.textContent = "🎯";
            if (img.alt === "Visión") icon.textContent = "👁️";

            box.style.display = "block";
        });

        img.addEventListener("mouseleave", function () {
            box.style.display = "none";
        });
    });
});
