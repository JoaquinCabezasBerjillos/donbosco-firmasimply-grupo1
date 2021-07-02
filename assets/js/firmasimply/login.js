import Auth from './Modules/Auth/Auth.js';

const DASHBOARD_URL = '/index.html';



const loginForm = document.querySelector('#loginform');

loginForm.addEventListener('submit', login, false);

async function login(evento) {
  evento.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const CODER = {email: email, password: password};
  
  await Auth.login(CODER);
  window.location.assign(DASHBOARD_URL);
}