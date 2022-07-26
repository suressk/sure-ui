import { useIntersectionObserver } from '@vueuse/core'

/**
 * Intersection Observer
 * https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
 * 异步观察目标元素与其祖先元素或顶级文档视窗 (viewport) 交叉状态的方法
 */
export default function lazyLoadImg(imgEl: HTMLImageElement, bindingVal: string) {
  const { stop } = useIntersectionObserver(
    imgEl,
    ([{ isIntersecting }]) => {
      // isIntersecting 是否在可视区域
      if (isIntersecting) {
        imgEl.src = bindingVal
        // 加载完成后，停止监听
        stop()
      }
    }
  )
}
