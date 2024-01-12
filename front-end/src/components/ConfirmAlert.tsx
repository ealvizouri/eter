import React from 'react'
import { Alert } from '@material-tailwind/react'
import Button from '../components/Button'

interface DeleteConfirmationAlertProps {
  onCancel: () => void
  onConfirm: () => void
}

const DeleteConfirmationAlert: React.FC<DeleteConfirmationAlertProps> = ({
  onCancel,
  onConfirm,
}) => {
  const [open, setOpen] = React.useState(true)

  return (
    <>
      <div className="delete-confirmation-alert p-4 rounded-md mt-6 mb-6">
        <Alert color="red" onClose={onCancel}>
          <div className="text-white-500 text-lg font-semibold mb-4 text-center">
            ¿Estás seguro de que deseas eliminar este producto?
          </div>
          <div className="button-container flex justify-end space-x-4 mb-6">
            <Button
              border="2px solid #E41A02"
              color="#E41A02"
              height="40px"
              onClick={onCancel}
              radius="5px"
              width="100%"
              className="text-white bg-green-500 rounded-md"
            >
              Cancelar
            </Button>
            <Button
              border="2px solid #E41A02"
              color="#E41A02"
              height="40px"
              onClick={() => {
                onCancel()
                onConfirm()
              }}
              radius="5px"
              width="100%"
              className="bg-red-500 hover:bg-red-600 text-white rounded-md"
            >
              Confirmar
            </Button>
          </div>
        </Alert>
      </div>
    </>
  )
}

export default DeleteConfirmationAlert
