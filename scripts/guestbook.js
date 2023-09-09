import { getGuestBookMessages, signGuestBook } from './api.js';

const yearSpan = document.getElementById('year');
const guestBook = document.querySelector('.guest-book');
const submitButton = document.getElementById('submit');

function createEntry({ name, message }) {
  const messageSpan = document.createElement('span');
  messageSpan.classList.add('message');
  messageSpan.innerHTML = `<b>${name}:</b> <div id="message-text">${message}</div>`;
  return messageSpan;
}

async function handleSubmit(e) {
  const name = e.currentTarget.name.value;
  const message = e.currentTarget.message.value;
  const vals = await signGuestBook({ name, message });
  return vals;
}

async function refreshList(vals) {
  let messages;
  if (vals) {
    messages = vals;
  } else {
    messages = await getMessages();
  }
  const divs = [];
  messages.forEach((message) => {
    divs.push(createEntry(message));
  });

  while (guestBook.firstChild) {
    guestBook.removeChild(guestBook.firstChild);
  }
  divs.forEach((newDiv) => {
    guestBook.appendChild(newDiv);
  });
}

async function getMessages() {
  const data = await getGuestBookMessages();
  return data;
}

function setYear() {
  const currentYear = new Date().getFullYear();
  yearSpan.innerHTML = currentYear;
}

const form = document.querySelector('.inputs');

form.addEventListener('submit', async (e) => {
  submitButton.toggleAttribute('disabled');
  e.preventDefault();
  const updated = await handleSubmit(e);
  await refreshList(updated);
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
  e.target.reset();
  submitButton.toggleAttribute('disabled');
});

(async () => {
  setYear();
  await refreshList();
})();
