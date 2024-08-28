const Modal = ({ isOpen, handleClose, ...props }) => {
  return (
    <>
      <div className= onClick={handleClose}>
        <div className= >{props.children}</div>
        <div className= onClick={e => e.stopPropagation()}>
          {props.children}
        </div>
      </div>
    </>
  )
}
export default Modal