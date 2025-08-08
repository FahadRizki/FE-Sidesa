import { useInView } from 'react-intersection-observer'
import FeedbackPreview from '../FeedbackPreview'
export default function FeedbackLazy() {
const {ref, inView} = useInView({
    triggerOnce: true,
    threshold: 0.1,
});
  return (
    <div ref={ref}>
        {inView && <FeedbackPreview className={"infinite scroll"}/>}
    </div>
  )
}
