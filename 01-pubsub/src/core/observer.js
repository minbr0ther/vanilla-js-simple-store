let currentObserver = null;

export const observe = (fn) => {
  currentObserver = fn;
  fn();
  currentObserver = null;
};

export const observable = (obj) => {
  Object.keys(obj).forEach((key) => {
    // ['a','b']
    let _value = obj[key];

    // 이제 여러 개의 observer를 만들어서 관리해보자.
    const observers = new Set();

    Object.defineProperty(obj, key, {
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
        observers.forEach((fn) => fn());
      },
    });
  });

  return obj;
};

// const 상태 = observable({ a: 10, b: 20 });
// observe(() => console.log(`a = ${상태.a}`));
// observe(() => console.log(`b = ${상태.b}`));
// observe(() => console.log(`a + b = ${상태.a} + ${상태.b}`));
// observe(() => console.log(`a * b = ${상태.a} + ${상태.b}`));
// observe(() => console.log(`a - b = ${상태.a} + ${상태.b}`));

// 상태.a = 100;
// 상태.b = 200;
