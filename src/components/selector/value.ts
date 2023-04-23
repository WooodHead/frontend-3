import type { CharaEntity, EventEntity, SceneEntity } from '@/api/api-base'

export type SelectorOptionValue = { id: string } & (
  | { type: 'event'; value: EventEntity }
  | { type: 'chara'; value: CharaEntity }
  | { type: 'scene'; value: SceneEntity }
)
