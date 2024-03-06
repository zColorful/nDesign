import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NAnchor',
  props: {
  },
  setup() {
    return () => {
      return (
        <div v-n-anchor-box className="scrollTarget">
          <ul>
            <li v-n-anchor-link="anchorlink-one">anchorlink-one</li>
            <li v-n-anchor-link="anchorlink-two">anchorlink-two</li>
            <li v-n-anchor-link="anchorlink-three">anchorlink-three</li>
            <li v-n-anchor-link="anchorlink-four">anchorlink-four</li>
          </ul>
          <div>
            <div v-n-anchor="anchorlink-one">
                anchorlink-one
            </div>
            <div v-n-anchor="anchorlink-two">
                anchorlink-two
            </div>
            <div v-n-anchor="anchorlink-three">
                anchorlink-three
            </div>
            <div v-n-anchor="anchorlink-four">
                anchorlink-four
            </div>
          </div>
        </div>
      );
    };
  }
});
