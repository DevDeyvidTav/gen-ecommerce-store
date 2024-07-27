import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import React from "react"

interface BannerCarousselProps {
    banners: any[]
}

export function BannerCaroussel({ banners }: BannerCarousselProps) {

    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    )
    return (
        <Carousel
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            className={`${banners.length === 0 ? "hidden" : ""} w-full mx-auto -z-0 max-w-full`}>
            <CarouselContent className="w-full">
                {
                    banners.map((banner) => {
                        return (
                            <CarouselItem key={banner.id} className="w-full bg-center md:h-[600px] h-48 bg-cover relative">
                                <Image src={banner.imageUrl} alt="Banner" quality={100} placeholder="empty" layout="fill" objectFit="cover" />
                            </CarouselItem>
                        )
                    })
                }
            </CarouselContent>
        </Carousel>
    )
}
