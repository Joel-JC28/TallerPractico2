document.addEventListener("DOMContentLoaded", function () {
    const titles = document.querySelectorAll(".titulo");
    const box = document.getElementById("flotante");
    const text = document.getElementById("texto");
    const icon = document.getElementById("icono");

    titles.forEach(function (title) {
        title.addEventListener("mouseenter", function () {
            const card = title.closest(".fly");
            text.textContent = card.dataset.msg;

            if (title.textContent.includes("Calidad")) icon.textContent = "✔️";
            if (title.textContent.includes("Soporte")) icon.textContent = "🛠️";
            if (title.textContent.includes("Innovación")) icon.textContent = "💡";

            box.style.display = "block";
        });

        title.addEventListener("mouseleave", function () {
            box.style.display = "none";
        });
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const slides = [
        document.getElementById("slide1"),
        document.getElementById("slide2"),
        document.getElementById("slide3"),
        document.getElementById("slide4"),
        document.getElementById("slide5")
    ];

    let index = 0;

    setInterval(function () {
        index = (index + 1) % slides.length;
        slides[index].checked = true;
    }, 3000); // cambia cada 3 segundos
});

