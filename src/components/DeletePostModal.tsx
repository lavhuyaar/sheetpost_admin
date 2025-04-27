import Modal from "./Modal";

interface IDeleteModalProps {
  deletePost: VoidFunction;
  closeModal: VoidFunction;
  isModalOpen: boolean;
}

const DeletePostModal = ({
  deletePost,
  isModalOpen,
  closeModal,
}: IDeleteModalProps) => {
  return (
    <Modal
      isModalOpen={isModalOpen}
      className="flex flex-col items-center justify-center p-4"
    >
      <h4 className="text-[1.2rem] text-center">
        Do you confirm to delete this post?
      </h4>
      <em className="text-[11px] text-center mt-1">
        (it cannot be restored later, all the related comments will be deleted)
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

export default DeletePostModal;
