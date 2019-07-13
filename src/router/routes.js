import SlotTest from '../pages/SlotTest/SlotTest.vue'
import MixinTest from '../pages/MixinTest/MixinTest.vue'
import ComponentTest from '../pages/ComponentTest/ComponentTest.vue'
import EventTest from '../pages/EventTest/EventTest.vue'
import ReactiveTest from '../pages/ReactiveTest/ReactiveTest.vue'
import ModelTest from '../pages/ModelTest/ModelTest.vue'


export default [
  {
    path: '/slot',
    component: SlotTest,
  },
  
  {
    path: '/mixin',
    component: MixinTest,
  },

  {
    path: '/component',
    component: ComponentTest,
  },

  {
    path: '/event',
    component: EventTest,
  },

  {
    path: '/reactive',
    component: ReactiveTest,
  },
  
  {
    path: '/model',
    component: ModelTest,
  },
  {
    path: '/',
    redirect: '/slot'
  },
]
