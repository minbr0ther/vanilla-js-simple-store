import Publish from './Publish.js';
import Subscriber from './Subscriber.js';

// Store를 생성한다.
const state = new Publish({
  a: 10,
  b: 20,
});

// 컴포넌트를 생성한다.
const 덧셈계산기 = new Subscriber(() =>
  console.log(`a + b = ${state.a + state.b}`)
);
const 곱셈계산기 = new Subscriber(() =>
  console.log(`a * b = ${state.a * state.b}`)
);

// 컴포넌트가 store를 구독한다.
덧셈계산기.구독(state);
곱셈계산기.구독(state);

// store가 변경되었음을 알린다.
state.구독자에게_알림();
// a + b = 30
// a * b = 200

// store가 변경되었음을 알린다.
state.내부에_변화가_생김({ a: 100, b: 200 });
// a + b = 300
// a * b = 20000
