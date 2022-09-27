import { backEnd } from '../host';

async function deleteAuction(name: string) {
  const fetchResponse = await fetch(`${backEnd}/deleteAuction/${name}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const responseJson = await fetchResponse.json();

  return responseJson;
}

export { deleteAuction };
