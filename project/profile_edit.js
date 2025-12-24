
const currentUser = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser'));
if (!currentUser) {
  window.location.href = 'login.html';
}
document.getElementById('loggedUser').textContent = `Logged in as ${currentUser.name} (${currentUser.type.charAt(0).toUpperCase() + currentUser.type.slice(1)})`;

document.getElementById('editName').value = currentUser.name;
document.getElementById('editEmail').value = currentUser.email;
document.getElementById('editPhone').value = currentUser.phone || '';
document.getElementById('editDob').value = currentUser.dob;

document.getElementById('editForm').onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('editName').value;
  const email = document.getElementById('editEmail').value;
  const phone = document.getElementById('editPhone').value;
  const dob = document.getElementById('editDob').value;

  if (!name || !email || !dob) return alert('Required fields missing!');
  if (phone && phone.length !== 11) return alert('Phone must be 11 digits!');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return alert('Invalid email format!');
  const dobDate = new Date(dob);
  const age = (new Date().getFullYear() - dobDate.getFullYear());
  if (age < 14) return alert('Must be at least 14 years old!');

  const users = JSON.parse(localStorage.getItem('safenetsUsers')) || [];
  const userIndex = users.findIndex(u => u.username === currentUser.username);
  if (userIndex === -1) return alert('User not found!');

  if (email !== currentUser.email && users.find(u => u.email === email)) return alert('Email already used!');

  users[userIndex].name = name;
  users[userIndex].email = email;
  users[userIndex].phone = phone;
  users[userIndex].dob = dob;
  localStorage.setItem('safenetsUsers', JSON.stringify(users));

  const updatedUser = users[userIndex];
  localStorage.setItem('currentUser', JSON.stringify(updatedUser)); // Update local/session
  sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));

  alert('Profile updated successfully!');
  window.location.href = 'profile_view.html';
};

function logout() {
  localStorage.removeItem('currentUser');
  sessionStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}