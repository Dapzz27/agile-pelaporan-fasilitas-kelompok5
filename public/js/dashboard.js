const profileBtn = document.getElementById('profileBtn');
const dropdown = document.getElementById('dropdownMenu');

profileBtn.addEventListener('click', () => {
    dropdown.classList.toggle('show');
});

window.addEventListener('click', (e) => {

    if (
        !profileBtn.contains(e.target) &&
        !dropdown.contains(e.target)
    ) {
        dropdown.classList.remove('show');
    }

});