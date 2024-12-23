import { settings } from "./teamanalizer.js";

document.addEventListener("DOMContentLoaded", function() {
    const customSelects = document.querySelectorAll(".custom-select");

    customSelects.forEach(customSelect => {
        const selected = customSelect.querySelector(".select-selected");
        const optionsContainer = customSelect.querySelector(".select-items");
        const originalSelect = customSelect.querySelector("select");

        selected.addEventListener("click", function() {
            if (optionsContainer.classList.contains("show")) {
                optionsContainer.classList.remove("show");
                optionsContainer.classList.add("hide");
                setTimeout(() => {
                    optionsContainer.classList.remove("hide");
                }, 300); 
            } else {
                optionsContainer.classList.add("show");
                selected.classList.toggle("select-arrow-active");
            }
        });

        optionsContainer.querySelectorAll("div").forEach(function(option, index) {
            option.addEventListener("click", function() {
                selected.innerHTML = this.innerHTML;
                if(selected.innerHTML.includes('тиров')){
                    settings.currentSystem = 'tiers';
                }
                else if(selected.innerHTML.includes('баллов')){
                    settings.currentSystem = 'points';
                }
                originalSelect.selectedIndex = index;
                optionsContainer.classList.remove("show");
                optionsContainer.classList.add("hide");
                setTimeout(() => {
                    optionsContainer.classList.remove("hide");
                }, 300); 
                selected.classList.remove("select-arrow-active");
            });
        });
    });

    document.addEventListener("click", function(e) {
        customSelects.forEach(customSelect => {
            const optionsContainer = customSelect.querySelector(".select-items");
            const selected = customSelect.querySelector(".select-selected");
            if (!e.target.closest(".custom-select")) {
                optionsContainer.classList.remove("show");
                optionsContainer.classList.add("hide");
                setTimeout(() => {
                    optionsContainer.classList.remove("hide");
                }, 300);
                selected.classList.remove("select-arrow-active");
            }
        });
    });
});
