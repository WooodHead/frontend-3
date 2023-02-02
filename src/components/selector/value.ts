import type { CharacterEntity, EventEntity, SceneEntity } from '@/api/api-base'

export type SelectorOptionValue = (
  { type: 'event'; value: EventEntity } |
  { type: 'character'; value: CharacterEntity } |
  { type: 'scene'; value: SceneEntity }
)

