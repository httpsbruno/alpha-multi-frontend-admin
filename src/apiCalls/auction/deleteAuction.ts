async function deleteAuction(name: string) {
  const fetchResponse = await fetch(
    `http://localhost:8000/deleteAuction/${name}`,
    {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );

  const responseJson = await fetchResponse.json();

  return responseJson;
}

export { deleteAuction };
