document.addEventListener("DOMContentLoaded", () => {
    const matchPercent = localStorage.getItem("matchPercent");
    const matchfile = localStorage.getItem("matchContent");
    const userfile = localStorage.getItem("userContent");

    const userContent = document.querySelector(".userContent");
    const matchContent = document.querySelector(".matchContent");
    const matching = document.querySelector(".matching");

    if (userContent) userContent.innerHTML = userfile || "No user content";
    if (matching) matching.innerHTML = matchPercent || "No match percent";
    if (matchContent) matchContent.innerHTML = matchfile || "No match content";
});