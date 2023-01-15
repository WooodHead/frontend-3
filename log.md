# unocss全局important

已知的问题为指定属性会覆盖inline css，因此有可能使得组件一些动画失效。如：甘特图的侧边栏使用resize-x调整宽度，此时设置w-30per会导致宽度固定为30%而无法resize。