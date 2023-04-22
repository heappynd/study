import { RootState } from '@/store'
import { addAsync } from '@/store/reducer'
import { Input } from 'antd'
import type { InputProps } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

export default function Page() {
  const inputChange: InputProps['onChange'] = (e) => {
    console.log(e.target.value)
  }

  const { num } = useSelector((state: RootState) => ({
    num: state.main.num,
  }))

  const dispatch = useDispatch()

  const changeNum = () => {
    // type required   payload
    addAsync()
  }

  const changeNum2 = () => {
    // type required   payload
    dispatch({ type: 'add2', value: 20 })
  }
  return (
    <div>
      <Input onChange={inputChange} />
      <p>num: {num}</p>
      <button onClick={changeNum}>add</button>
      <button onClick={changeNum2}>add2</button>
    </div>
  )
}
