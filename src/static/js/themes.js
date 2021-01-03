// Theme selector in JavaScript

const button = document.getElementById('style-changer');
const body = document.body;
const cache = localStorage.getItem('furrybot');

if (cache === null)
  localStorage.setItem('furrybot', JSON.stringify({
    dark: true,
    user: null
  }));

button.onclick = () => {
  const settings = JSON.parse(cache);
  const value = !settings.dark;

  if (value) {
    body.classList.remove('light');
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
    body.classList.add('light');
  }

  localStorage.setItem('furrybot', JSON.stringify({
    dark: value,
    user: settings.user
  }));

  console.log(`[style-changer] Dark: ${value ? 'Yes' : 'No'}`);
};
