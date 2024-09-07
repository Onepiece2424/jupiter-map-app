import React, { useEffect } from 'react'
import axios from 'axios'

const UserData = () => {
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error('リクエストエラー:', error);
    });
  }, [])

  return (
    <div>
      ユーザーデータだよ。
    </div>
  )
}

export default UserData
