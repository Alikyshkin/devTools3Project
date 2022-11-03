//Вычисление времени загрузки страницы
(() => {
    let start = Date.now();
    window.addEventListener("load", () => {
        let end = Date.now();
        let milliseconds = end - start
        let seconds = milliseconds / 1000;
        document.getElementById("loadTime").innerText = `${seconds} s`;
    });
})();