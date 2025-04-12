
let eventGuid = 0;

export function createEventId() {
  return String(eventGuid++);
}

export async function getEvents() {
  return fetch("http://localhost:8000/links")
    .then((res) => res.json())
    .then((res) => {
      const response = res.map((e) => {
        e.id = createEventId();
        return e;
      });

      return response;
    })
    .catch((err) => console.log(err));
}