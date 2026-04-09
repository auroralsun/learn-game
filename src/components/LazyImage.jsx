import { useState, useEffect, useRef } from 'react'

const LazyImage = ({ src, alt, className = '', placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjBmMGYwIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjY2NjIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPvCfkrs8L3RleHQ+Cjwvc3ZnPgo=' }) => {
  const [imageSrc, setImageSrc] = useState(placeholder)
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    let observer
    const imgElement = imgRef.current

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = new Image()
              img.src = src
              img.onload = () => {
                setImageSrc(src)
                setIsLoaded(true)
              }
              observer.unobserve(imgElement)
            }
          })
        },
        {
          rootMargin: '200px 0px',
          threshold: 0.01
        }
      )

      if (imgElement) {
        observer.observe(imgElement)
      }
    } else {
      setImageSrc(src)
      setIsLoaded(true)
    }

    return () => {
      if (observer && imgElement) {
        observer.unobserve(imgElement)
      }
    }
  }, [src])

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${isLoaded ? 'lazy-loaded' : 'lazy-loading'}`}
      loading="lazy"
    />
  )
}

export default LazyImage
