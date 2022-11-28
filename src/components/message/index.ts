import Message from './index.vue'
const mount = () => {
  const container = document.createElement('div')
  container.id = 'message'

  document.body.appendChild(container)

  const app = createApp(Message, { })
  app.mount('#message')
}

export default {
  success: () => {
    mount()
  },
}
