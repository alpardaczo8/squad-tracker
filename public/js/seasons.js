const toggleBtn = document.getElementById('toggleFormBtn');
const form = document.getElementById('addSeasonForm');

toggleBtn.addEventListener('click', () => {
  form.classList.toggle('hidden');
  toggleBtn.textContent = form.classList.contains('hidden') 
    ? 'Add Season' 
    : 'Cancel';
});