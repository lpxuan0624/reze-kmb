import React, { useState } from 'react';

function Counter() {
  // 创建一个状态变量 count，初始值为 0
  const [count, setCount] = useState(2);
  const [value, setValue] = useState("")
  console.log(value)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount("a")}> Add </button>
      <br />
      <button onClick={() => setCount(count - 1)}> Minus </button>
      <br />
      <button onClick={() => setCount(0)}> Reset </button>
      <br />
      
      <input onChange={(e) => setValue(e.target.value)} placeholder='name?' value={value}></input>
      <p>Welome! {value}</p>
    </div>
  );
}

export default Counter;