// Store를 생성한다.
const store = new Store({ a: 10, b: 20 });
/**
 * Observer pattern은 객체의 상태 변화를 관찰하는 관찰자들, 즉 옵저버들의 목록을 객체에 등록하여 상태 변화가 있을 때마다
 * 메서드 등을 통해 객체가 직접 목록의 각 옵저버에게 통지하도록 하는 디자인 패턴이다.
 * 주로 분산 이벤트 핸들링 시스템을 구현하는 데 사용된다.
 * 발행/구독 모델로 알려져 있기도 한다.
 */

// 컴포넌트를 생성한다.
const component1 = new Component({ subscribe: [store] });
const component2 = new Component({ subscribe: [store] });

// 컴포넌트가 store을 구독한다.
component1.subscribe(store); // a + b = ${store.state.a + store.state.b}
component2.subscribe(store); // a * b = ${store.state.a * store.state.b}
/**
 * 처음에 component1은 a + b = 30을 출력하고, component2는 a * b = 200 을 출력할 것이다.
 * store의 값이 변경된 다음에는 각각 a + b = 300 a * b = 20000 을 출력할 것이다
 */

// store의 state를 변경한다.
store.setState({ a: 100, b: 200 });

// store가 변경되었음을 알린다.
store.notify();
