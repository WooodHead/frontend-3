import type { CharacterEntity, EventEntity, SceneEntity } from '@/api/api-base'

export type SelectorOptionValue = { id: string } & (
  { type: 'event'; value: EventEntity } |
  { type: 'character'; value: CharacterEntity } |
  { type: 'scene'; value: SceneEntity }
)

