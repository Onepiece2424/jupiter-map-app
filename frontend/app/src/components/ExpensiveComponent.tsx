import React, { useState } from 'react';

// 計算コストが高い関数
const expensiveComputation = (num: number) => {
  console.log('expensive computation running...');
  let total = 0;
  for (let i = 0; i < 100000000; i++) {
    total += num;
  }
  return total;
};

// 子コンポーネント（最適化前）
const ChildComponent: React.FC<{ count: number }> = ({ count }) => {
  const result = expensiveComputation(count);
  return <div>Computed Result: {result}</div>;
};

// 親コンポーネント
const ExpensiveComponent = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <div>
      <h1>Expensive Component</h1>
      <button onClick={() => setCount((prev) => prev + 1)}>Increase Count</button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <ChildComponent count={count} />
    </div>
  );
};

export default ExpensiveComponent;
