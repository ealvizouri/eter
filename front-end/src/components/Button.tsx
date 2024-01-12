import React from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  border?: string // Hice border opcional para que puedas omitirlo si no es necesario
  color?: string
  children?: React.ReactNode
  height?: string
  className?: string
  onClick: () => void
  radius?: string
  width?: string
}

const Button: React.FC<Props> = ({
  border = 'none', // Valor por defecto para border
  color,
  children,
  height,
  className,
  onClick,
  radius,
  width,
}) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: color,
    border,
    borderRadius: radius,
    height,
    width,
    cursor: 'pointer', // Agregado para indicar que el botón es interactivo
  }

  return (
    <button
      onClick={onClick}
      className={twMerge('cursor-pointer py-2 px-3', className)}
    >
      {children}
    </button>
  )
}

export default Button
