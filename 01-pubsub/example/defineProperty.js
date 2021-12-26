const state = {
  a: 10,
  b: 20,
};

const stateKeys = Object.keys(state); // ['a', 'b']
const observer = () => console.log(`a + b = ${state.a + state.b}`);

for (const key of stateKeys) {
  let _value = state[key]; //'10', '20'
  Object.defineProperty(state, key, {
    get() {
      return _value;
    },
    set(value) {
      _value = value;
      observer();
    },
  });
}

observer(); // a + b = 30

state.a = 100; // a + b = 120
state.b = 200; // a + b = 300
