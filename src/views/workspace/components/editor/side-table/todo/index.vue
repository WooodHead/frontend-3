<script setup lang="ts">
import type { AxiosError } from 'axios'
import { Message } from '@arco-design/web-vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useStore } from '../../store'
import Item from './item.vue'
import api from '@/api/api'
import type { EventTodoEntity } from '@/api/api-base'

const store = useStore()
const { eventId, todoDot } = storeToRefs(store)
const client = useQueryClient()

const checkedTodo = reactive(new Map<number, string>())
const unCheckedTodo = reactive(new Map<number, string>())
watch(unCheckedTodo, todos => {
  todoDot.value = todos.size !== 0
}, { immediate: true })

const { data: todos, isSuccess, isLoading, isError } = useQuery({
  enabled: computed(() => eventId.value !== undefined),
  queryKey: computed(() => ['event', eventId.value, 'todo']),
  queryFn: () => api.event.getTodos(eventId.value!),
  onError: (e: AxiosError) => {
    Message.error(`获取待办事项失败：${e.message}`)
  },
})

watch(todos, todos => {
  if (!todos) { return }
  checkedTodo.clear()
  unCheckedTodo.clear()
  for (const { checked, id, title } of todos) {
    (checked ? checkedTodo : unCheckedTodo).set(id, title)
  }
})

const handleCheckedItemClick = (id: number) => {
  // TODO 改为乐观更新
  api.event.updateTodo(id, { checked: false })
    .then(() => {
      unCheckedTodo.set(id, checkedTodo.get(id)!)
      checkedTodo.delete(id)
    }).catch((e: AxiosError) => {
      Message.error(`更新失败：${e.message}`)
    })
}

const handleUnCheckedItemClick = (id: number) => {
  api.event.updateTodo(id, { checked: true })
    .then(() => {
      checkedTodo.set(id, unCheckedTodo.get(id)!)
      unCheckedTodo.delete(id)
    }).catch((e: AxiosError) => {
      Message.error(`更新失败：${e.message}`)
    })
}

const addVisible = ref(false)
const { mutate: createTodo, isLoading: createLoading } = useMutation({
  mutationFn: ({ title, color }: { title: string; color: string }) =>
    api.event.createTodo(eventId.value!, { title, color }),
  onSuccess: todo => {
    addVisible.value = false
    client.setQueryData<EventTodoEntity[]>(
      ['event', eventId.value, 'todo'],
      todos => [...todos ?? [], todo],
    )
  },
  onError: (e: AxiosError) => {
    Message.error(`添加失败：${e.message}`)
  },
})
const handleAdd = (title: string) => {
  if (!eventId.value) { return }
  createTodo({ title, color: '#000000' })
}

const { mutate: deleteTodo, isLoading: deleteLoading } = useMutation({
  mutationFn: ({ id }: { id: number }) => api.event.removeTodo(id),
  onSuccess: ({ id }) => {
    client.setQueryData<EventTodoEntity[]>(
      ['event', eventId.value, 'todo'],
      todos => todos?.filter(todo => todo.id !== id),
    )
  },
  onError: (e: AxiosError) => {
    Message.error(`删除失败：${e.message}`)
  },
})
const handleDelete = (id: number) => {
  if (!eventId.value) { return }
  deleteTodo({ id })
}
</script>

<template>
  <div v-if="isSuccess">
    <APopover v-model:popup-visible="addVisible" trigger="click">
      <AButton title="添加待办项" long h-20px mb-2 type="primary">
        <div i-radix-icons-plus></div>
      </AButton>
      <template #content>
        <AInputSearch
          search-button
          button-text="添加"
          placeholder="代办项标题"
          :loading="createLoading"
          @change="handleAdd"
        />
      </template>
    </APopover>
    <div v-if="unCheckedTodo.size > 0">
      <div text="center text-1" font-bold>
        未完成
      </div>
      <ADivider :margin="10" />
      <Item
        v-for="[id, title] of Array.from(unCheckedTodo)"
        :id="id" :key="id" :title="title"
        :delete-loading="deleteLoading"
        @click="handleUnCheckedItemClick"
        @delete="handleDelete"
      />
    </div>
    <div v-if="checkedTodo.size > 0" mt-4>
      <div text="center text-1" font-bold>
        已完成
      </div>
      <ADivider :margin="10" />
      <Item
        v-for="[id, title] of Array.from(checkedTodo)"
        :id="id" :key="id" :title="title"
        checked
        :delete-loading="deleteLoading"
        @click="handleCheckedItemClick"
        @delete="handleDelete"
      />
    </div>
  </div>
  <Status v-else :loading="isLoading" :error="isError" />
</template>
