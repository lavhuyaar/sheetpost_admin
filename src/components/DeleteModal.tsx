import Modal from "./Modal";

interface IDeleteModalProps {
  deletePost: VoidFunction;
  closeModal: VoidFunction;
  isModalOpen: boolean;
  warningMessage: string;
  disclaimer: string
}

const DeleteModal = ({
  deletePost,
  isModalOpen,
  closeModal,
  warningMessage,
  disclaimer,
}: IDeleteModalProps) => {
  return (
    <Modal
      isModalOpen={isModalOpen}
      className="flex flex-col items-center justify-center p-4"
    >
      <h4 className="text-[1.2rem] text-center">
        {warningMessage}
      </h4>
      <em className="text-[11px] text-center mt-1">
        {disclaimer}
      </em>

      <div className="flex items-center w-full justify-center gap-4 mt-4">
        <button onClick={closeModal} className="secondary-btn">
          Cancel
        </button>
        <button onClick={deletePost} className="primary-btn">
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
