import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface IProps {
  to: string
}

export function Redirect(props: IProps) {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(props.to, { replace: true })
  })

  return null
}
