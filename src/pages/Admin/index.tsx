import { useContext, useEffect, useState } from 'react';
import { Modal } from '../../components/Modal';
import { PulseCards } from '../../components/PulseCards';
import Navbar from '../../components/Navbar';
import { UserDataContext } from '../../providers/UserDataProvider';
import { AdminCard } from '../../components/AdminCard';
import { getAllAuctions } from '../../apiCalls/auction/getAllAuctions';
import { updateAuction } from '../../apiCalls/auction/updateAuction';

/**
 * Archive: src/pages/Admin/index.tsx
 *
 * Description: Dashboard Page
 *
 * Date: 2022/08/22
 *
 * Author: Athos Balmant
 */
interface RespAuctionType {
  auction_id: string;
  winner_id: string | null;
  name: string;
  description: string;
  photo: string;
  initial_price: string;
  final_price: string | null;
  close_at: string;
  open_at: string;
  created_at: string;
  updated_at: string | null;
  closed_at: string | null;
}

interface AuctionType {
  auction_id: string;
  name: string;
  description: string;
  photo: string;
  initial_price: string;
  close_at: string;
  open_at: string;
}

export const Admin = () => {
  const userInfo = useContext(UserDataContext);

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<boolean>(false);
  const [modalCard, setModalCard] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cardEmpty, setCardEmpty] = useState<boolean>(true);
  const [search, setSearch] = useState<boolean>(false);
  const [arrayCardsFiltered, setArrayCardsFiltered] = useState<
    RespAuctionType[]
  >([]);
  const [refresh, setRefresh] = useState<number>(0);

  async function handleUpdateAuction(data: AuctionType) {
    const auction: AuctionType = {
      auction_id: data.auction_id,
      name: data.name,
      description: data.description,
      photo: data.photo,
      initial_price: data.initial_price,
      close_at: data.close_at.replaceAll('T', ' ') + ':00',
      open_at: data.open_at.replaceAll('T', ' ') + ':00',
    };

    const resp = await updateAuction(auction);

    if (!resp.success) {
      alert(resp.message);
    } else {
      alert('Atualizado com sucesso!');
      setModalCard(false);
    }
  }

  const cards = arrayCardsFiltered.map((card, index) => {
    return (
      <AdminCard
        handleUpdateAuction={handleUpdateAuction}
        modalCard={setModalCard}
        key={index}
        image={card.photo}
        title={card.name}
        content={card}
      />
    );
  });

  const arrayCards = async () => {
    const resp = await getAllAuctions();
    console.log('pamonha')
    if (!resp.success) {
      setErrorMessage(resp.message);
      return [] as RespAuctionType[];
    }

    setErrorMessage('');
    return resp.data as RespAuctionType[];
  };

  useEffect(() => {
    if (!search) {
      const teste = arrayCards();
      teste.then((array) => {
        if (array) {
          setArrayCardsFiltered(array);
        } else {
          setArrayCardsFiltered([]);
        }
      });
    }
  }, [refresh]);

  /* const arrayTwoCards: JSX.Element[][] = [];
  const corte = 3;

  for (let i = 0; i < cards.length; i += corte) {
    arrayTwoCards.push(cards.slice(i, i + corte));
  }

  const twoCards = arrayTwoCards.map((twoCard, index) => {
    return (
      <div key={index} className="grid md:flex relative">
        {twoCard}
      </div>
    );
  }); */

  const inputSearch = (event: any) => {
    if (event.target.value) {
      setSearch(true);
    } else {
      setSearch(false);
    }
    setArrayCardsFiltered(
      arrayCardsFiltered.filter((card) => {
        return card.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      }),
    );
  };

  return (
    <div>
      <div className="z-40">
        {modal && (
          <Modal
            title="Adicionar Item/Lote"
            message=""
            setModal={setModal}
            handleConfirmModal={() => console.log('teste')}
          />
        )}
      </div>
      <div className="flex flex-row w-full items-center h-full justify-between">
        <Navbar selected="dashboard" />
        <div className="grid justify-between items-start w-5/6 h-screen">
          {loading ? (
            <>
              <PulseCards />
            </>
          ) : (
            <div className="flex flex-col w-screen justify-start h-screen align-middle items-center">
              <div className="flex flex-row justify-between items-center align-middle w-screen h-fit bg-[#16162D] p-2 mb-3 ">
                <div className="flex ml-10 justify-end items-end">
                  <div className="ml-5 mr-2 w-[30px] h-10 bg-no-repeat bg-auction bg-contain border-none" />
                  <p className="not-italic font-bold text-base leading-7 text-white mb-1">
                    Auction
                  </p>
                </div>
                <div className="flex flex-row bg-[#1F1F3567] align-middle h-fit sm:w-1/3 w-[260px] ml-1 rounded-lg bg-[#202043]">
                  <div className="w-12 h-12 bg-lupa-white bg-no-repeat bg-center " />
                  <input
                    id="search"
                    onChange={inputSearch}
                    placeholder="Buscar Projeto"
                    className="border-none bg-transparent text-white"
                  />
                </div>
                <div className="flex justify-center items-center align-middle">
                  <p className="text-white mr-2 hidden sm:inline ">
                    {userInfo.userLogged}
                  </p>
                  <div className="bg-white w-10 h-10 rounded-full mr-10"></div>
                </div>
              </div>

              <p className="text-red-700">{errorMessage}</p>
              <div onClick={() => setRefresh(refresh+1)} className="w-7 h-7 mb-4 mr-3 bg-trash bg-contain border-none bg-center bg-no-repeat"></div>
              <div className="ml-16 grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-center bg-[#1F1F35] p-10 mb-7 rounded-3xl w-72 sm:w-[500px] md:w-[700px] lg:w-[900px] xl:w-[1100px] 2xl:w-[1300px] min-h-5/6 overflow-auto">
                <div
                  className="hover:bg-gray-100 hover:bg-opacity-20  relative w-[195px] h-[192px] m-2 mb-7 flex flex-col justify-center items-center bg-+ bg-no-repeat bg-center border-solid border-2 hover:border-3 hover:border-purple-900 rounded-2xl hover:shadow-2xl"
                  onClick={() => setModal(true)}
                >
                  <p className="mt-[80px] text-white">Adicionar</p>
                  <p className="text-white">Lote/Item</p>
                </div>
                {cards}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
