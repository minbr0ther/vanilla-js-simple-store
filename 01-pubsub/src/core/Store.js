/*
코드를 살펴보니 createStore가 subscribe, dispatch, getState 등의 메소드를 가진 객체를 반환하는 것을 알 수 있다.

const createStore = (reducer) => {
  // 내부 구현
  return { subscribe, dispatch, getState };
}
*/

import { observable } from './observer.js';

export const createStore = (reducer) => {
  // reducer가 실행될 때 반환하는 객체(state)를 observable로 만들어야 한다.
  const state = observable(reducer());

  // getState가 실제 state를 반환하는 것이 아니라 frozenState를 반환하도록 만들어야 한다.
  const frozenState = {};
  Object.keys(state).forEach((key) => {
    Object.defineProperty(frozenState, key, {
      get: () => state[key], // get만 정의하여 set을 하지 못하도록 만든다.
    });
  });

  // dispatch로만 state의 값을 변경할 수 있.
  const dispatch = (action) => {
    const newState = reducer(state, action);

    for (const [key, value] of Object.entries(newState)) {
      // state의 key가 아닐 경우 변경을 생략한다.
      if (!state[key]) continue;
      state[key] = value;
    }
  };

  const getState = () => frozenState;

  // subscribe는 observe로 대체한다.
  return { getState, dispatch };
};
