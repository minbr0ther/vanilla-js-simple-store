class Publish {
  #state;
  #observers = new Set();

  constructor(state) {
    this.#state = state;
    Object.keys(state).forEach((key) =>
      Object.defineProperty(this, key, {
        get: () => this.#state[key],
      })
    );
  }

  // 핵심적인 내용은 내부에 변화가 생길 경우 구독자에게 알리는 것 이다.
  내부에_변화가_생김(newState) {
    this.#state = { ...this.#state, ...newState };
    this.구독자에게_알림();
  }

  구독자_등록(subscriber) {
    this.#observers.add(subscriber);
  }

  구독자에게_알림() {
    this.#observers.forEach((fn) => fn());
  }
}
