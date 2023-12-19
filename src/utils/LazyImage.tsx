import { useRef, useEffect, useState } from 'react'
import type { ImgHTMLAttributes } from 'react'

type LazyImageProps = {
  src: string
  onLazyLoad?: (img: HTMLImageElement) => void
}
type ImgNativeProps = ImgHTMLAttributes<HTMLImageElement>
type Props = LazyImageProps & ImgNativeProps

export default function LazyImage({
  src,
  onLazyLoad,
  ...imgProps
}: Props): JSX.Element {
  const node = useRef<HTMLImageElement>(null)
  const [isLazyLoaded, setIsLazyLoaded] = useState(false)
  const [isIntersecting, setIsIntersecting] = useState('')
  useEffect(() => {
    if (isLazyLoaded) {
      return
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || !node.current) {
          return
        }
        setIsIntersecting(src)
        observer.disconnect()
        setIsLazyLoaded(true)
        if (typeof onLazyLoad === 'function') {
          onLazyLoad(node.current)
        }
      })
    })

    if (node.current) {
      observer.observe(node.current)
    }

    return () => observer.disconnect()
  }, [src, isLazyLoaded, onLazyLoad])

  return (
    <div>
      <img
        ref={node}
        src={isIntersecting}
        alt='Random fox image'
        {...imgProps}
      />
    </div>
  )
}
