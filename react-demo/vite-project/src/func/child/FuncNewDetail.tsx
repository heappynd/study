import React from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'

export function FuncNewDetail() {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = useParams()
  const navigate = useNavigate()

  console.log(searchParams)

  console.log(searchParams.get('id'))

  return (
    <div>
      FuncNewDetail {params.id}
      <button
        onClick={() => {
          // setSearchParams({ id: '789' })
          navigate('/func/new/detail/7895')
        }}
      >
        maybe you like
      </button>
    </div>
  )
}
