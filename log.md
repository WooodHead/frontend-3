# unocss全局important

已知的问题为指定属性会覆盖inline css，因此有可能使得组件一些动画失效。如：甘特图的侧边栏使用resize-x调整宽度，此时设置w-30per会导致宽度固定为30%而无法resize。

# 异步组件 v-for

意外的将一个列表渲染项组件变为了异步组件，发现在加载时将不会按照列表顺序渲染，而是哪个列表项先渲染完就排在前面。

# tanstack query默认的stale time为0

因此在不更改全局stale time的前提下是不会应用缓存的，每一次都会重新请求，只有当stale time大于0时才可能真正获得缓存带来的好处。

这一点在文档的第一页中就有写，然而却一直没有注意过，这告诉我们看文档的重要性。
# useQuery对在setQueryData后不会触发onSuccess

因此如果使用了setQueryData来更新缓存，则对数据的处理步骤不应该放在onSuccess里，而应该直接监听data。

# unocss-preset-theme透明度问题

新版preset-theme增加了对透明度的支持，但只能实现light主题和dark主题同透明度，如果两个主题透明度不同则只会采纳dark主题设置的透明度。