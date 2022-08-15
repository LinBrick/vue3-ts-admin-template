import { ref, watch, onBeforeMount, onMounted, onBeforeUnmount } from 'vue'
import store from '@/store'
import router from '@/router'
import { DeviceType } from '@/store/modules/app'

const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
  setup() {
    const device = ref(store.state.app.device)
    const sidebar = ref(store.state.app.sidebar)
    
    watch(() => router.currentRoute.value.path, (newValue, oldValue)=> {
      if (device.value === DeviceType.Mobile && sidebar.opened) {
        store.dispatch('CloseSideBar', false)
      }
    }, { immediate: true })

    const isMobile = () => {
      const rect = document.body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    }

    const resizeHandler = () => {
      if (!document.hidden) {
        const _isMobile = isMobile()
        store.dispatch('ToggleDevice', _isMobile ? DeviceType.Mobile : DeviceType.Desktop)
        if (_isMobile) {
          store.dispatch('CloseSideBar', true)
        }
      }
    }

    onBeforeMount(() => {
      window.addEventListener('resize', resizeHandler)
    })

    onMounted(() => {
      const _isMobile = isMobile()
      if (_isMobile) {
        store.dispatch('ToggleDevice', DeviceType.Mobile)
        store.dispatch('CloseSideBar', true)
      }
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeHandler)
    })

    return {
      device,
      sidebar
    }
  }
}