export async function updateViewCount() {
  await fetch('https://api.val.town/v1/run/Joelsrubin.updateViewCount');
}

/** @returns {number} */
export async function getViewCount() {
  const data = await fetch('https://api.val.town/v1/run/Joelsrubin.pageViews');
  const result = await data.json();
  return result;
}

export async function signGuestBook({ name, message }) {
  const args = JSON.stringify({
    name,
    message,
  });
  const vals = await fetch(
    `https://api.val.town/v1/run/Joelsrubin.signGuestBook?args=[${args}]`
  );
  const parsed = await vals.json();
  return parsed;
}

export async function getGuestBookMessages() {
  const vals = await fetch('https://api.val.town/v1/run/Joelsrubin.guestBook');
  const messages = await vals.json();
  return messages;
}
