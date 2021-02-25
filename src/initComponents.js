// 公用
import TopBar from 'common/TopBar.vue';
// import Confirm from 'common/Confirm.vue';

const Components = {
  TopBar,
  // Confirm
}

export default function(Vue) {
  var keys = Object.keys(Components);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let component = Components[key];
    Vue.component(component.name || key.toLowerCase(), Components[key]);
  }
}
