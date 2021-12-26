// Store를 생성한다.
const store = new Store({ a: 10, b: 20 });

// 컴포넌트를 생성한다.
const component1 = new Component({ subscribe: [store] });
const component2 = new Component({ subscribe: [store] });

// 컴포넌트가 store을 구독한다.
component1.subscribe(store); // a + b = ${store.state.a + store.state.b}
component2.subscribe(store); // a * b = ${store.state.a * store.state.b}

// store의 state를 변경한다.
store.setState({ a: 100, b: 200 });

// store가 변경되었음을 알린다.
store.notify();
