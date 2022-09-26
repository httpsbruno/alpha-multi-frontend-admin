import { X } from 'phosphor-react';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import image from '../images/image.svg';
import { createAuction } from '../apiCalls/auction/createAuction';
import { inputMask } from '../masks/inputMask';

interface PropTypes {
  title: string;
  message?: string;
  handleConfirmModal: () => void;
  setModal: (modal: boolean) => void;
}

/**
 * Archive: src/components/Card.tsx
 *
 * Description: Modal edit/insert
 *
 * Date: 2022/08/20
 *
 * Author: Athos Balmant e Rey
 */
interface AuctionType {
  name: string;
  description: string;
  photo: string;
  initial_price: string;
  close_at: string;
  open_at: string;
}

export const Modal = ({
  title,
  message,
  handleConfirmModal,
  setModal,
}: PropTypes) => {
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [initialPrice, setInitialPrice] = useState('');
  const [closeAt, setCloseAt] = useState('');
  const [openAt, setOpenAt] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);

  function closeModal(event: MouseEvent<HTMLDivElement>) {
    if (event.target === modalRef.current) {
      setModal(false);
    }
  }

  useEffect(() => {
    window.addEventListener(
      'keydown',
      (e) => {
        if (e.key === 'Escape') {
          setModal(false);
        }
      },
      false,
    );
  }, []);

  async function handleCreateAuction() {
    const auction: AuctionType = {
      name,
      description,
      photo,
      initial_price: initialPrice,
      close_at: closeAt.replaceAll('T', ' ') + ':00',
      open_at: openAt.replaceAll('T', ' ') + ':00',
    };

    const resp = await createAuction(auction);

    if (!resp.success) {
      setErrorMessage(resp.message);
    } else {
      setErrorMessage('');
      setModal(false);
    }
  }

  return (
    <div
      className="z-50 fixed top-0 left-0 right-0 bottom-0 flex justify-center md:items-center items-end bg-black bg-opacity-50"
      ref={modalRef}
      onClick={closeModal}
    >
      <div className=" w-screen md:w-[34rem] md:h-[33rem] py-4 px-3 flex flex-col rounded-t-2xl md:rounded-2xl bg-white ">
        <div className="flex justify-between items-center mb-2">
          <h3></h3>
          <h3 className="text-lg text-header-dark text-center "></h3>
          <X
            weight="bold"
            className="w-6 h-6 text-icon-dark-200"
            onClick={() => setModal(false)}
          />
        </div>
        <div className="flex justify-center items-center">
          <h3 className="text-lg text-header-dark text-center">{title}</h3>
        </div>
        <div className="flex justify-center">
          <div
            className="grid md:flex relative justify-center items-center border-solid border-2 border-black rounded-md w-fit
          mb-5"
          >
            <div className="flex flex-col justify-center items-center w-fit m-2">
              <img src={image} alt="Add Image" className=" w-14 h-20" />
              <input type="file" className='w-[212px] h-[42px] border-2 border-gray-600 mb-1' />
              <p>Ou</p>
              <textarea
                placeholder="Link da imagem"
                cols={20}
                rows={2}
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="p-1 resize-none outline-none border-solid border-2 border-gray-600 rounded-md m-2 mt-2"
              ></textarea>
              <textarea
                placeholder="Digite o nome do Item/Lote"
                cols={20}
                rows={4}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-1 resize-none outline-none border-solid border-2 border-gray-600 rounded-md m-2 mt-2"
              ></textarea>
              <input
                placeholder="Preço inicial"
                type="text"
                value={initialPrice}
                onChange={(e) => setInitialPrice(`R$ ${inputMask(e.target.value)}`)}
                className="w-52 h-10 p-1 resize-none placeholder:inset-3/4 outline-none border-solid border-2 border-gray-600 rounded-md m-2 mt-2"
              ></input>
            </div>

            <div className="flex flex-col justify-center items-center w-fit">
              <div className="flex flex-col justify-center items-start m-2 mt-3">
                <textarea
                  placeholder="Descrição"
                  cols={20}
                  rows={10}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="p-1 resize-none outline-none border-solid border-2 border-gray-600 rounded-md m-2"
                ></textarea>
              </div>
              <div className="flex flex-col justify-center items-start m-1">
                <label>Data de abertura:</label>
                <input
                  type="datetime-local"
                  value={openAt}
                  onChange={(e) => setOpenAt(e.target.value)}
                  className="p-1 w-52 h-10 mt-1 border-solid border-2 border-gray-600 rounded-md"
                ></input>
              </div>
              <div className="flex flex-col justify-center items-start m-1 mt-2">
                <label className="ml-2">Data de fechamento:</label>
                <input
                  type="datetime-local"
                  value={closeAt}
                  onChange={(e) => setCloseAt(e.target.value)}
                  className="w-52 h-10 p-1 resize-none placeholder:inset-3/4 outline-none border-solid border-2 border-gray-600 rounded-md m-2 mt-2"
                ></input>
              </div>
            </div>
          </div>
        </div>
        <p className="text-red-700">{errorMessage}</p>
        <div className="mb-5 flex justify-center gap-5">
          <Button
            type="button"
            color="bg-[#ED8525]"
            category="cancel"
            label="Cancelar"
            onClick={() => setModal(false)}
          />
          <Button
            type="button"
            color="bg-[#00B682]"
            category="primary"
            label="Confirmar"
            onClick={() => handleCreateAuction()}
          />
        </div>
      </div>
    </div>
  );
};

/* 

vertical:
<div className="grid relative justify-center items-center border-solid border-2 border-black rounded-md w-fit mb-5">

horizontal:
<div className="flex relative justify-center items-center border-solid border-2 border-black rounded-md w-fit mb-5"> 

*/
