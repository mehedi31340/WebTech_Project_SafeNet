
document.getElementById('loginForm').onsubmit = function(e) {
  e.preventDefault();
  const identifier = document.getElementById('loginIdentifier').value;
  const password = document.getElementById('loginPassword').value;
  const remember = document.getElementById('rememberMe').checked;

  const users = JSON.parse(localStorage.getItem('safenetsUsers')) || [];
  const user = users.find(u => (u.email === identifier || u.username === identifier) && u.password === password);
  if (!user) return alert('Email/Username or Password incorrect!');

  if (remember) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }
  
  if (user.type === 'admin' || user.type === 'consultant') {
    window.location.href = 'admin_dashboard.html';
  } else {
    window.location.href = 'user_dashboard.html';
  }
};


const currentUser = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser'));
if (currentUser) {
  if (currentUser.type === 'admin' || currentUser.type === 'consultant') {
    window.location.href = 'admin_dashboard.html';
  } else {
    window.location.href = 'user_dashboard.html';
  }
}