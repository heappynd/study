import React from 'react'

export default function Upload() {
  return (
    <div>
      <form action="/api/upload" method="post" encType="multipart/form-data">
        <label>
          username:
          <input type="text" name="username" />
        </label>
        <br />
        <label>
          avatar:
          <input type="file" name="avatar" />
        </label>
        <br />
        <input type="submit" value="sumbit" />
      </form>
    </div>
  )
}
