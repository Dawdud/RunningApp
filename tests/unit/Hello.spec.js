import { shallowMount, mount } from '@vue/test-utils'
import Hello from '@/components/user/Hello.vue'


// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })
describe('Hello', ()=>{
  const wrapper = mount(Hello)
  it('span click should set toggleMenu to false ', ()=>{
    expect(wrapper.vm.toggleMenu).toBe(false)
    const span = wrapper.find('span')
    span.trigger('click')
    expect(wrapper.vm.toggleMenu).toBe(true)
  })
})