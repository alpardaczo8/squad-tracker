const toggleBtn = document.getElementById('toggleFormBtn');
const form = document.getElementById('toggleForm');

if (toggleBtn && form) {
  toggleBtn.addEventListener('click', () => {
    form.classList.toggle('hidden');
    toggleBtn.textContent = form.classList.contains('hidden')
      ? 'Add'
      : 'Cancel';
  });
}