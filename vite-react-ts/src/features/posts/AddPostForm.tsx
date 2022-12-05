import React from 'react'
import { useAddNewPostMutation } from '../api/apiSlice'

const AddPostForm = () => {
  const [addNewPost, { isLoading }] = useAddNewPostMutation()

  const onSavePostClicked = async () => {
    if (!isLoading) {
      await addNewPost({ title: '', content: '' }).unwrap()
    }
  }

  return (
    <div>
      AddPostForm
      <button onClick={onSavePostClicked}>add</button>
    </div>
  )
}

export default AddPostForm
