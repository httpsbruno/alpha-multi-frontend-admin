import { backEnd } from '../host';

interface AuctionType {
  name: string;
  description: string;
  photo: string;
  initial_price: string;
  close_at: string;
  open_at: string;
}

async function createAuction(data: AuctionType) {
  const body = {
    name: data.name,
    description: data.description,
    photo: data.photo,
    initial_price: data.initial_price,
    close_at: data.close_at,
    open_at: data.open_at,
  };

  const fetchResponse = await fetch(`${backEnd}/createAuction`, {
    method: 'POST',
    credentials: 'include',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const responseJson = await fetchResponse.json();

  return responseJson;
}

export { createAuction };
