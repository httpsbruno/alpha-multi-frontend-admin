import { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '../Modal';
import { ModalDelete } from '../ModalDelete';
import { ModalInfo } from '../ModalInfo';

/**
 * Archive: src/components/AdminCard.tsx
 *
 * Description: Card Component
 *
 * Date: 2022/08/20
 *
 * Author: Athos Balmant
 */

interface ChildrenTypes {
  children?: ReactElement;
  title: string;
  image: string;
  content: RespAuctionType;
}

interface RespAuctionType {
  auction_id: string;
  winner_id: string | null;
  name: string;
  description: string;
  photo: string;
  initial_price: string;
  final_price: string | null;
  duration: number;
  open_at: string;
  created_at: string;
  updated_at: string | null;
  closed_at: string | null;
}

const teste = () => {
  console.log('teste');
};

export const AdminCard = ({ title, image, content }: ChildrenTypes) => {
  const [modal, setModal] = useState<boolean>(false);
  const [modalDelete, setModalDelete] = useState<boolean>(false);

  return (
    <>
      {modal && (
        <ModalInfo
          title="Editar Lote/Item"
          content={content}
          setModal={setModal}
          handleConfirmModal={teste}
        />
      )}
      {modalDelete && (
        <ModalDelete
          title="Deletar Lote/Item?"
          message="Tem certeza que deseja deletar este Lote/Item?"
          auctionId={content.name}
          setModal={setModalDelete}
          handleConfirmModal={teste}
        />
      )}

      <div className="hover:bg-gray-100 grid  relative w-[195px] h-[192px] m-2 mb-7 bg-gray-200  justify-center border-solid border-2 hover:border-3 hover:border-purple-900 rounded-2xl hover:shadow-2xl">
        <div className="flex flex-col justify-items-start justify-center items-center hover:cursor-pointer">
          <img
            src={image}
            alt="Add Image"
            className="w-48 h-32 justify-center rounded-2xl"
          />
          <div className="flex justify-center items-start">
            <h3 className="font-bold text-2xs mt-1  overflow-hidden p-1 ml-3 w-[120px] h-20  not-italic text-center text-sm text-header-dark dark:text-header-light">
              {title}
            </h3>
            <div className="text-end h-[80px] w-[60px] mt-2 mr-3">
              <p className="text-[10px] mb-1">Preço atual:</p>
              <p className="font-medium text-[10px]">R$ 25.000,00</p>
            </div>
            <div
              className="rounded-lg items-center w-8 h-8 bg-yellow-600 flex flex-grow justify-center absolute -bottom-4 right-11 bg-edit-white bg-no-repeat bg-center z-10"
              onClick={() => setModal(true)}
            ></div>
            <div
              className="rounded-lg w-8 h-8 bg-red-600 flex flex-grow justify-center absolute -bottom-4 right-2 bg-trash bg-no-repeat bg-center z-10 hover:cursor-pointer"
              onClick={() => setModalDelete(true)}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

/* 
Vertical Card:

<div className="grid relative w-[15rem] p-4 m-2  justify-items-center border-solid border-2 border-black rounded-md"> 

Horizontal Card:
 <div className="flex relative w-[25rem] p-4 m-2  justify-items-center border-solid border-2 border-black rounded-md">
*/
