<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useStore } from '../../store'
import Item from './item.vue'
import api from '@/api/api'
import type { EventTodoEntity } from '@/api/api-base'
import type { ApiError } from '@/api/types'

const store = useStore()
const { eventId, todoDot } = storeToRefs(store)
const client = useQueryClient()

const { data } = useQuery({
  enabled: computed(() => eventId.value !== undefined),
  queryKey: computed(() => ['event', eventId.value]),
  queryFn: () => api.event.get(eventId.value!),
})

const checkedTodo = reactive(new Map<number, string>())
const unCheckedTodo = reactive(new Map<number, string>())
watch(
  unCheckedTodo,
  (todos) => {
    todoDot.value = todos.size !== 0
  },
  { immediate: true }
)

const { data: todos, isSuccess } = useQuery({
  enabled: computed(() => eventId.value !== undefined),
  queryKey: computed(() => ['event', eventId.value, 'todo']),
  queryFn: () => api.event.getTodos(eventId.value!),
  onError: (e: ApiError) => {
    Message.error(`获取待办事项失败：${e.response?.data.message}`)
  },
})

watch(todos, (todos) => {
  if (!todos) {
    return
  }
  checkedTodo.clear()
  unCheckedTodo.clear()
  for (const { checked, id, title } of todos) {
    ;(checked ? checkedTodo : unCheckedTodo).set(id, title)
  }
})

const handleCheckedItemClick = (id: number) => {
  // TODO 改为乐观更新
  api.event
    .updateTodo(id, { checked: false })
    .then(() => {
      unCheckedTodo.set(id, checkedTodo.get(id)!)
      checkedTodo.delete(id)
    })
    .catch((e: ApiError) => {
      Message.error(`更新失败：${e.response?.data.message}`)
    })
}

const handleUnCheckedItemClick = (id: number) => {
  api.event
    .updateTodo(id, { checked: true })
    .then(() => {
      checkedTodo.set(id, unCheckedTodo.get(id)!)
      unCheckedTodo.delete(id)
    })
    .catch((e: ApiError) => {
      Message.error(`更新失败：${e.response?.data.message}`)
    })
}

const addVisible = ref(false)
const { mutate: createTodo, isLoading: createLoading } = useMutation({
  mutationFn: ({ title, color }: { title: string; color?: string }) =>
    api.event.createTodo(eventId.value!, { title, color }),
  onSuccess: (todo) => {
    addVisible.value = false
    client.setQueryData<EventTodoEntity[]>(
      ['event', eventId.value, 'todo'],
      (todos) => [...(todos ?? []), todo]
    )
  },
  onError: (e: ApiError) => {
    Message.error(`添加失败：${e.response?.data.message}`)
  },
})
const handleAdd = (title: string) => {
  if (!eventId.value) {
    return
  }
  createTodo({ title })
}

const { mutate: removeTodo } = useMutation({
  mutationFn: ({ id }: { id: number }) => api.event.removeTodo(id),
  onSuccess: ({ id }) => {
    client.setQueryData<EventTodoEntity[]>(
      ['event', eventId.value, 'todo'],
      (todos) => todos?.filter((todo) => todo.id !== id)
    )
  },
  onError: (e: ApiError) => {
    Message.error(`删除失败：${e.response?.data.message}`)
  },
})
const handleRemove = (id: number) => {
  if (!eventId.value) {
    return
  }
  removeTodo({ id })
}
</script>

<template>
  <div v-if="isSuccess">
    <ATrigger
      v-model:popup-visible="addVisible"
      trigger="click"
      :popup-translate="[0, 8]"
    >
      <AButton
        :disabled="data?.done"
        title="添加待办项"
        long
        mb-2
        type="outline"
      >
        <div i-radix-icons-plus></div>
      </AButton>
      <template #content>
        <div card-border p-2>
          <AInputSearch
            search-button
            button-text="添加"
            placeholder="代办项标题"
            :loading="createLoading"
            @change="handleAdd"
          />
        </div>
      </template>
    </ATrigger>
    <div v-if="unCheckedTodo.size > 0">
      <div text="center text-1" font-bold>未完成</div>
      <ADivider :margin="10" />
      <Item
        v-for="[id, title] of Array.from(unCheckedTodo)"
        :id="id"
        :key="id"
        :title="title"
        :disabled="data?.done"
        @click="handleUnCheckedItemClick"
        @remove="handleRemove"
      />
    </div>
    <div v-if="checkedTodo.size > 0" mt-4>
      <div text="center text-1" font-bold>已完成</div>
      <ADivider :margin="10" />
      <Item
        v-for="[id, title] of Array.from(checkedTodo)"
        :id="id"
        :key="id"
        :title="title"
        :disabled="data?.done"
        checked
        @click="handleCheckedItemClick"
        @remove="handleRemove"
      />
    </div>
  </div>
</template>
