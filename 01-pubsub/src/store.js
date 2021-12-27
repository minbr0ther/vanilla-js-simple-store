import { observable } from './core/observer.js';

export const store = {
  state: observable({ a: 10, b: 20 }),

  setState(newState) {
    // 새로운 상태의 key 와 value를 순회한다
    for (const [key, value] of Object.entries(newState)) {
      // 기존의 상태에 있는 key는 무시한다
      if (!this.state[key]) continue;

      // 새로운 key와 value를 상태에 등록한다
      this.state[key] = value;
    }
  },
};
