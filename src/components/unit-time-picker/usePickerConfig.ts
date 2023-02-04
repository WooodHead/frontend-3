import type { TimePickerProps } from '@arco-design/web-vue/es/time-picker/interface'
import type { IUnit } from '@project-chiral/unit-id'
import type { Ref } from 'vue'

export const usePickerConfig = (unit: Ref<IUnit | undefined>) => {
  const showTime = ref(false)
  const props = ref<Partial<TimePickerProps>>({})
  const mode = ref<'year' | 'month' | 'date'>('date')

  switch (unit?.value) {
    case 'century':
    case 'decade':
    case 'year':
      mode.value = 'year'
      break
    case 'month':
      mode.value = 'month'
      break
    case 'hour':
      showTime.value = true
      props.value.format = 'HH'
      break
    case 'minute':
      showTime.value = true
      props.value.format = 'HH:mm'
      break
    case 'second':
      showTime.value = true
      props.value.format = 'HH:mm:ss'
      break
  }

  return $$({
    mode,
    showTime,
    timePickerProps: props,
  })
}

export default usePickerConfig
