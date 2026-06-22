function togglePw(id, btn) {
    const input = document.getElementById(id);
    if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🙈';
    } else {
        input.type = 'password';
        btn.textContent = '👁';
    }
}

function checkStrength(val) {
    const bar = document.getElementById('strengthBar');
    const label = document.getElementById('strengthLabel');

    let strength = 0;
    if (val.length >= 8) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;

    const levels = [
        { width: '0%',   color: '#eee',    text: '' },
        { width: '25%',  color: '#e74c3c', text: 'Lemah' },
        { width: '50%',  color: '#f39c12', text: 'Cukup' },
        { width: '75%',  color: '#2ecc71', text: 'Kuat' },
        { width: '100%', color: '#005baa', text: 'Sangat Kuat' },
    ];

    const lvl = val.length === 0 ? 0 : strength;
    bar.style.width = levels[lvl].width;
    bar.style.background = levels[lvl].color;
    label.textContent = levels[lvl].text;
    label.style.color = levels[lvl].color;
}