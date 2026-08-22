const slides = document.querySelectorAll(".slide");

const dotsBox = document.querySelector(".dots");

let current = 0;

let timer;


if (slides.length && dotsBox) {


    // Criar os 30 indicadores

    slides.forEach((slide, index) => {

        const dot =
            document.createElement("button");

        dot.className = "dot";

        if (index === 0) {

            dot.classList.add("active");

        }


        dot.setAttribute(
            "aria-label",
            "Ir para slide " + (index + 1)
        );


        dot.addEventListener(
            "click",
            () => {

                showSlide(index);

            }
        );


        dotsBox.appendChild(dot);

    });


    function getDots() {

        return document.querySelectorAll(".dot");

    }


    function showSlide(number) {


        current =
            (number + slides.length)
            % slides.length;


        slides.forEach(
            (slide, index) => {

                slide.classList.toggle(
                    "active",
                    index === current
                );

            }
        );


        getDots().forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === current
                );

            }
        );

    }


    const next =
        document.querySelector(".next");


    const prev =
        document.querySelector(".prev");


    if (next) {

        next.addEventListener(
            "click",
            () => {

                showSlide(current + 1);

            }
        );

    }


    if (prev) {

        prev.addEventListener(
            "click",
            () => {

                showSlide(current - 1);

            }
        );

    }


    function startCarousel() {

        clearInterval(timer);

        timer = setInterval(
            () => {

                showSlide(current + 1);

            },
            6500
        );

    }


    startCarousel();


    const carousel =
        document.querySelector(".carousel");


    if (carousel) {

        carousel.addEventListener(
            "mouseenter",
            () => {

                clearInterval(timer);

            }
        );


        carousel.addEventListener(
            "mouseleave",
            () => {

                startCarousel();

            }
        );

    }

}