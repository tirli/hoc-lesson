export default MyComponent => {
  class PerformanceTest extends MyComponent {
    componentWillUpdate() {
      if (super.componentWillUpdate) super.componentWillUpdate();
      this.start = performance.now();
    }

    componentDidUpdate() {
      if (super.componentDidUpdate) super.componentDidUpdate();
      console.info(performance.now() - this.start);
    }
  }

  return PerformanceTest;
}