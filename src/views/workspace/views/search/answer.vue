<script setup lang="ts">
const { answer, loading } = defineProps<{
  answer?: string
  loading?: boolean
}>()
</script>

<template>
  <div h-50vh p-4>
    <div v-if="answer === undefined" full center column>
      <div square-60px i-twemoji-smiling-face-with-sunglasses></div>
      <p text-lg>有什么问题想要问我吗？</p>
    </div>
    <div v-else-if="loading" full center column>
      <div square-60px i-twemoji-thinking-face></div>
      <p text-lg>思考中……</p>
    </div>
    <div v-else full center column>
      <div square-60px i-twemoji-light-bulb></div>
      <p whitespace-pre-wrap>
        根据
        <Link>28. 霍去病的河西战役</Link>
        {{
          `所提供的信息，我认为霍去病赢得河西战役导致了以下结果：
1. 汉朝完全控制了河西地区。
2. 汉朝先后设置了酒泉郡、张掖郡、敦煌郡和武威郡等河西四郡。
3. 河西走廊正式成为中国版图。
4. 打通了汉朝和西域的道路，丝绸之路从此开通。`
        }}
      </p>
    </div>
  </div>
</template>
