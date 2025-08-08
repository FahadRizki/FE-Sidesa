import { memo } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../../config'

const NewsCard = memo(({ item }) => {

    return(
        <Link to={`/news/${item.id}`} className="group">
            <div className="flex gap-3 bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <img
        src={`${BASE_URL}/public/storage/content_images/${item.image}`}
        alt={item.title}
        loading="lazy"
        className="w-[6rem] md:w-[7rem] xl:w-[9rem] h-auto md:h-[5rem] xl:h-auto object-cover"
        />
        <div className="p-3 md:p-0 xl:p-2 flex flex-col justify-center w-full">
        <div className="text-xs md:text-[9px] xl:text-sm text-gray-100 bg-gray-700 w-fit rounded-xl px-2">{new Date(item.publish_date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        })}
        </div>
        <h3 className="text-sm md:text-[13px] xl:text-lg font-semibold">{item.title}</h3>
        <p className="text-xs md:text-[9px] xl:text-sm mt-1 text-gray-600 line-clamp-2">{item.content}</p>
        </div>
        </div>
        </Link>
    )
})

export default NewsCard