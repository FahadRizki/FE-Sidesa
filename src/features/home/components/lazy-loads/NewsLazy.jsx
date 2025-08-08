import { useInView } from "react-intersection-observer"
import NewsPreview from "../NewsPreview"

export default function NewsLazy() {
    const {ref, inView} = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })
  return (
    <div ref={ref}>
        {inView && <NewsPreview />}
    </div>
  )
}
