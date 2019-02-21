import { shallowMount } from '@vue/test-utils'
import Dashboard from '@/components/Trials/Dashboard.vue'

jest.mock('axios')
describe('Dashboard', () => {
  it('check monthSum variable', async () => {
    const wrapper = shallowMount(Dashboard)
    expect(wrapper.vm.todaySum).toBe(0)
  })
  it('renders with mount ', () => {

  })
})
