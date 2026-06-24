const profileBtn =
document.getElementById('profileBtn');

const dropdownMenu =
document.getElementById('dropdownMenu');

profileBtn.addEventListener('click', () => {
    dropdownMenu.classList.toggle('show');
});

const searchInput =
document.getElementById('searchInput');

searchInput.addEventListener('keyup', () => {

    const keyword =
    searchInput.value.toLowerCase();

    const rows =
    document.querySelectorAll('#tableBody tr');

    rows.forEach(row => {

        row.style.display =
        row.textContent
        .toLowerCase()
        .includes(keyword)
        ? ''
        : 'none';

    });

});