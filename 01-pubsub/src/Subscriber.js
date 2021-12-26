/**
 * 구독자는 발행기관에서 변화가 생겼을 때 하는 일을 정의해야 한다.
 * 그리고 발행기관을 구독 한다.
 */

class Subscriber {
  #fn;

  constructor(발행기관에_변화가_생길_때_하는_일) {
    this.#fn = 발행기관에_변화가_생길_때_하는_일;
  }

  구독(publisher) {
    publisher.구독자_등록(this.#fn);
  }
}
