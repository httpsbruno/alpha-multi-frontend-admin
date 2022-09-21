import { X } from 'phosphor-react';
import { MouseEvent, useEffect, useRef } from 'react';
import { Button } from './Button';
import image from '../images/image.svg';
import { deleteAuction } from '../apiCalls/auction/deleteAuction';

interface PropTypes {
  title: string;
  message?: string;
  auctionId: string;
  handleConfirmModal: () => void;
  setModal: (modal: boolean) => void;
}

/**
 * Archive: src/components/ModalDelete.tsx
 *
 * Description: Modal Delete
 *
 * Date: 2022/08/20
 *
 * Author: Athos Balmant
 */

export const ModalDelete = ({
  title,
  message,
  handleConfirmModal,
  auctionId,
  setModal,
}: PropTypes) => {
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

  async function handleDeleteModal(auction: string) {
    console.log(auction);
    const resp = await deleteAuction(auction);

    if (!resp.success) {
      alert(resp.message);
    } else {
      alert('Deletado com sucesso!');
      setModal(false);
    }
  }
  return (
    <div
      className="z-50 fixed top-0 left-0 right-0 bottom-0 flex justify-center md:items-center items-end bg-black bg-opacity-50"
      ref={modalRef}
      onClick={closeModal}
    >
      <div className=" w-screen md:w-[25rem] md:h-[10rem] py-4 px-3 flex flex-col rounded-t-2xl md:rounded-2xl bg-white ">
        <div className="flex justify-between items-center mb-2">
          <h3></h3>
          <h3 className="text-lg text-header-dark text-center "></h3>
          <X
            weight="bold"
            className="w-6 h-6 text-icon-dark-200"
            onClick={() => setModal(false)}
          />
        </div>
        <div className="flex justify-center items-center mb-5">
          <h3 className="text-lg text-header-dark text-center">{title}</h3>
        </div>
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
            color="bg-[#D10000]"
            category="secondary"
            label="Confirmar"
            onClick={() => handleDeleteModal(auctionId)}
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
