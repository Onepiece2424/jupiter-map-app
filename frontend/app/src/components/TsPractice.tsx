import React from 'react'

const TsPractice = () => {

  // 分割代入で名前の変更
  const obj = { fruit: "apple", age: 18, flag: true }
  const { fruit, age: animalAge } = obj
  console.log(fruit, animalAge); // => "apple" 18

  return (
    <div>TsPractice</div>
  )
}

export default TsPractice
