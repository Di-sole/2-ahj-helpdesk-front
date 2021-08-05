export default function makeRequest(method, data) {
  return new Promise((resolve, reject) => {
    const url = 'https://http-helpdesk.herokuapp.com/';
    const params = new URLSearchParams();
    const entries = Object.entries(data);

    entries.forEach((arr) => params.append(arr[0], arr[1]));

    const xhr = new XMLHttpRequest();
    xhr.open(method, `${url}?${params}`);

    if (method === 'GET') {
      xhr.send();
    }

    if (method === 'POST') {
      xhr.send(params);
    }

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(console.log(xhr.status));
      }
    });
  });
}
