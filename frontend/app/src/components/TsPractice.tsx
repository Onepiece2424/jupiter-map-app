import React from 'react'

const TsPractice = () => {

  // 分割代入で変数名の変更
  const obj = { fruit: "apple", age: 18, flag: true }
  const { fruit, age: animalAge } = obj
  console.log(fruit, animalAge); // => "apple" 18

  // 複雑なデータ構造の時の分割代入で変数名の変更
  const user = {
    id: 1,
    profile: {
      name: "John Doe",
      age: 30
    }
  };

  const { profile: { name: userName, age: userAge } } = user;
  console.log(userName, userAge); // => "John Doe", 30

  // 分割代入で宣言された変数に直接型注釈をつける例
  // const { x: number, y: string } = { x: 10, y: "hello" };

  // エラー: 'number' は宣言されていません

  // 正しい型注釈のつけ方
  const obj1: { x: number; y: string } = { x: 10, y: "hello" };
  const { x, y } = obj1; // ここでは分割代入だけを行う
  console.log(x, y);  // => 10 "hello"


  return (
    <div>TsPractice</div>
  )
}

export default TsPractice
