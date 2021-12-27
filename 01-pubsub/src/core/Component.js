import { observable, observe } from './observer.js';

export class Component {
  state;
  props;
  $el;

  constructor($el, props) {
    this.$el = $el;
    this.props = props;
    this.setup();
  }

  setup() {
    // state를 관찰한다
    this.state = observable(this.initState());

    // state가 변경될 경우, 함수가 실행된다.
    observe(() => {
      this.render();
      this.setEvent();
      this.mounted();
    });
  }

  initState() {
    return {};
  }

  template() {
    return ``;
  }

  render() {
    this.$el.innerHTML = this.template();
  }

  setEvent() {}

  mounted() {}
}
