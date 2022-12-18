// const eventQuery = {
//   ...api.event,
//   ...createQueryKeys('event', {
//     all: {
//       queryKey: null,
//       queryFn: () => api.event.getEvents(),
//     },
//     id: (id: Ref<number>) => ({
//       queryKey: [id.value],
//       queryFn: () => api.event.getEvents({ ids: [id.value] }),
//       contextQueries: {
//         detail: {
//           queryKey: null,
//           queryFn: api.event.getEventDetail(id.value),
//         },
//       },
//     }),
//     range: (range: MaybeRef<UnitIDRange | undefined>) => ({
//       queryKey: [range],
//       contextQueries: {
//         ids: (ids: Ref<number[]>) => ({
//           queryKey: [ids.value.sort()],
//           queryFn: () => api.event.getEvents({ range: range.value?.serialize(), ids: ids.value }),
//         }),
//       },
//     }),
//   }),
// }
// export default eventQuery
