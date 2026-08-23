// =========================================
// NOVAFIT - MAIN JAVASCRIPT
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("NovaFit website loaded successfully.");


    // =========================================
    // SCROLL REVEAL ANIMATION
    // =========================================

    const revealElements =
        document.querySelectorAll(".reveal");

    if (revealElements.length) {

        const revealObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

                            revealObserver.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    }


    // =========================================
    // CONTACT FORM
    // =========================================

    const contactForm =
        document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async (event) => {

                /*
                 * Let the browser perform its normal
                 * required-field validation first.
                 *
                 * If the form is invalid, the submit
                 * event will not continue.
                 */

                if (!contactForm.checkValidity()) {
                    return;
                }

                event.preventDefault();


                const submitButton =
                    contactForm.querySelector(
                        ".contact-submit"
                    );

                const originalButtonContent =
                    submitButton.innerHTML;


                // -----------------------------------------
                // SENDING
                // -----------------------------------------

                submitButton.disabled = true;

                submitButton.innerHTML = `
                    Sending...
                    <i class="fa-solid fa-spinner fa-spin"></i>
                `;


                try {

                    const response = await fetch(
                        contactForm.action,
                        {
                            method: "POST",
                            body: new FormData(contactForm),
                            headers: {
                                Accept: "application/json"
                            }
                        }
                    );


                    if (!response.ok) {
                        throw new Error(
                            "Form submission failed."
                        );
                    }


                    // -----------------------------------------
                    // SUCCESS
                    // -----------------------------------------

                    submitButton.innerHTML = `
                        Message Sent
                        <i class="fa-solid fa-check"></i>
                    `;

                    contactForm.reset();


                    setTimeout(() => {

                        submitButton.innerHTML =
                            originalButtonContent;

                        submitButton.disabled = false;

                    }, 3000);


                } catch (error) {

                    console.error(
                        "Form submission error:",
                        error
                    );


                    submitButton.innerHTML = `
                        Try Again
                        <i class="fa-solid fa-rotate-right"></i>
                    `;

                    submitButton.disabled = false;
                }

            }
        );
    }


    // =========================================
    // CLOSE MOBILE NAVIGATION
    // =========================================

    const navMenu =
        document.querySelector("#mainNav");

    const navLinks =
        document.querySelectorAll(
            "#mainNav .nav-link, #mainNav .btn"
        );


    if (navMenu && navLinks.length) {

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                if (navMenu.classList.contains("show")) {

                    const collapse =
                        bootstrap.Collapse.getInstance(
                            navMenu
                        );

                    if (collapse) {
                        collapse.hide();
                    }
                }

            });

        });

    }

});