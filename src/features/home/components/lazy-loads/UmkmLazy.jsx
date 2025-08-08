import { useInView } from "react-intersection-observer"
import UmkmPreview from "../UmkmPreview"

export default function UmkmLazy() {
    const {ref, inView} = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })
  return (
    <div ref={ref}>{inView && <UmkmPreview /> }</div>
  )
}
