import { ReactNode } from 'react'
import Button from '../components/Button'
import ReactModal from 'react-modal'
import { twMerge } from 'tailwind-merge'

interface DeleteConfirmationAlertProps {
  isOpen: boolean
  close: () => void
  onCancel: () => void
  onConfirm: () => void
  className?: string
  overlayClassName?: string
  children: ReactNode
}

const DeleteConfirmationAlert = ({
  isOpen,
  close,
  onCancel,
  onConfirm,
  className,
  overlayClassName,
  children,
}: DeleteConfirmationAlertProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={close}
      className={twMerge('bg-white w-fit h-fit p-4 rounded-md', className)}
      overlayClassName={twMerge(
        'fixed top-0 left-0 w-full h-full p-10 z-50 bg-black bg-opacity-50 flex flex-col justify-center items-center',
        overlayClassName,
      )}
    >
      <div className="text-white-500 text-lg font-semibold mb-4 text-center">
        {children}
      </div>
      <div className="flex justify-end gap-4">
        <Button
          border="2px solid #E41A02"
          color="#E41A02"
          height="40px"
          onClick={onCancel}
          radius="5px"
          width="100%"
          className="text-white bg-red-500 hover:bg-red-600 rounded-md"
        >
          Cancelar
        </Button>
        <Button
          border="2px solid #E41A02"
          color="#E41A02"
          height="40px"
          onClick={onConfirm}
          radius="5px"
          width="100%"
          className="text-white bg-green-500 hover:bg-green-600 rounded-md"
        >
          Confirmar
        </Button>
      </div>
    </ReactModal>
  )
}

export default DeleteConfirmationAlert
