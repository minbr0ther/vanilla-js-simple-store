let currentObserver = null;

const state = {
  a: 10,
  b: 20,
};

const stateKeys = Object.keys(state); // ['a', 'b']

for (const key of stateKeys) {
  let _value = state[key]; //'10', '20'

  // 이제 여러 개의 observer를 만들어서 관리해보자.
  const observers = new Set();

  Object.defineProperty(state, key, {
    get() {
      // state의 property가 사용될 때(=get 메소드가 실행될 때)
      // currentObserver를 observers에 등록한다.
      if (currentObserver) observers.add(currentObserver);

      return _value;
    },
    set(value) {
      _value = value;

      // state의 property가 변경될 때(=set 메소드가 실행될 때)
      // observers에 등록된 모든 observer를 실행한다.
      observers.forEach((observer) => observer());
    },
  });
}

const 덧셈_계산기 = () => {
  currentObserver = 덧셈_계산기;
  console.log(`a + b = ${state.a + state.b}`);
};

const 뺄셈_계산기 = () => {
  currentObserver = 뺄셈_계산기;
  console.log(`a - b = ${state.a - state.b}`);
};

덧셈_계산기(); // a + b = 30
state.a = 100; // a + b = 120, a - b = 80

뺄셈_계산기(); // a - b = 80
state.b = 200;

state.a = 1;
state.b = 2;
