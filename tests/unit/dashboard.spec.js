import { shallowMount } from '@vue/test-utils';
import Dashboard from '@/components/Trials/Dashboard.vue'

jest.mock('axios')

it('fetches async when a button is clicked', (done)=>{
    const wrapper= shallowMount(Dashboard)
    wrapper.vm.$nextTick(()=>{
        expect(wrapper.vm.value).toBe('value');
        done()
    })
})