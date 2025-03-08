import React, { useState, useMemo, useCallback } from 'react';

// 計算コストが高い関数
const expensiveComputation = (num: number) => {
  console.log('expensive computation running...');
  let total = 0;
  for (let i = 0; i < 100000000; i++) {
    total += num;
  }
  return total;
};

// 最適化された子コンポーネント
const ChildComponent: React.FC<{ count: number }> = React.memo(({ count }) => {
  const result = useMemo(() => expensiveComputation(count), [count]);
  return <div>Computed Result: {result}</div>;
});

// 親コンポーネント
const ExpensiveComponent = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  return (
    <div>
      <h1>Expensive Component (Optimized)</h1>
      <button onClick={() => setCount((prev) => prev + 1)}>Increase Count</button>
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder="Type something..."
      />
      <ChildComponent count={count} />
    </div>
  );
};

export default ExpensiveComponent;
