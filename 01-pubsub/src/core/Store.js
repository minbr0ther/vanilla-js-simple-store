import { observable } from './observer.js';

export class Store {
  // private로 지정하여 외부에서는 접근이 안 되도록 한다.
  #state;
  #mutations;
  #actions;
  state = {};

  constructor({ state, mutations, actions }) {
    // #state는 state를 관찰한다
    this.#state = observable(state);
    this.#mutations = mutations;
    this.#actions = actions;

    // state를 직접적으로 수정하지 못하도록 다음과 같이 정의한다.
    // store.state는 Object.defineProperty로 get만 사용할 수 있도록 선언했다.
    // 즉, 직접적으로 할당할 수 없는 형태이다.
    Object.keys(state).forEach((key) => {
      Object.defineProperties(this.state, key, { get: () => this.$state[key] });
    });
  }

  // store.state의 값을 변경하고 싶다면 무조건 commit method를 사용해야 한다.
  commit(action, payload) {
    // state는 오직 commit을 통해서 수정 할 수 있다.
    this.#mutations[action](this.#state, payload);
  }

  dispatch(action, payload) {
    // 예제에서 dispatch는 사용되고 있진 않진 않지만 아마 vuex를 써본 사람이라면 익숙할 것이다.

    return this.#actions[action](
      {
        state: this.#state,
        commit: this.commit.bind(this),
        dispatch: this.dispatch.bind(this),
      },
      payload
    );
  }
}
