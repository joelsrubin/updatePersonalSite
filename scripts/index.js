const yearSpan = document.getElementById('year');

function setYear() {
  const currentYear = new Date().getFullYear();
  yearSpan.innerHTML = currentYear;
}

(async () => {
  setYear();
})();
