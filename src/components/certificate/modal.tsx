type ModalProps = {
    isOpen: boolean;
    handleClose: () => void;
    children?: React.ReactNode; // if you want to include children
  };
const Modal = ({ isOpen, handleClose, ...props }: ModalProps) => {
  return (
    <>
      <div className={`fixed inset-0 h-full w-full overflow-auto bg-black bg-opacity-78 flex 
        items-center justify-center transform transition-all duration-300 ease-[cubic-bezier(0.
        175,0.885,0.32,1.275)] ${isOpen ? 'opacity-100 visible translate-y-0' : 
        'opacity-0 invisible -translate-y-full'}`} onClick={handleClose}>
      <div className={`bg-white p-12`}>
          {props.children} {/* Updated to place comment inside braces */}
        </div>
        <div className={`bg-white p-12`} onClick={e => e.stopPropagation()}>
          {props.children} {/* Updated to place comment inside braces */}
        </div>
      </div>
    </>
  )
}
export default Modal