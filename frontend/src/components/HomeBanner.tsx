import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HomeBanner() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  // Função para rolar suavemente até a seção de produtos
  const scrollToProducts = () => {
    const section = document.getElementById('produtos');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const slides = [
    {
      id: 1,
      title: "Tecnologia de Ponta",
      description: "Os melhores processadores e placas de vídeo para o seu setup.",
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=2070&auto=format&fit=crop",
      color: "bg-blue-600"
    },
    {
      id: 2,
      title: "Periféricos Gamer",
      description: "Teclados, mouses e headsets para elevar sua gameplay.",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
      color: "bg-purple-600"
    },
    {
      id: 3,
      title: "Monte seu PC",
      description: "Gabinetes, fontes e refrigeração com os melhores preços.",
      image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1974&auto=format&fit=crop",
      color: "bg-orange-600"
    }
  ]

  return (
    <div className="w-full mb-8">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{ loop: true }}
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="p-1">
                <Card className="border-0 shadow-none">
                  <CardContent className="flex aspect-[21/9] md:aspect-[21/7] items-center justify-center p-0 relative overflow-hidden rounded-xl">
                    {/* Imagem de Fundo */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 hover:scale-105"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />

                    {/* Conteúdo do Texto */}
                    <div className="relative z-20 w-full h-full flex flex-col justify-center px-8 md:px-16 text-white">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight max-w-2xl">
                            {slide.title}
                        </h2>
                        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
                            {slide.description}
                        </p>
                        <Button 
                            size="lg" 
                            onClick={scrollToProducts} // <--- AÇÃO DE SCROLL
                            className={`${slide.color} hover:brightness-110 text-white border-none w-fit text-base font-semibold`}
                        >
                            Confira Agora <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  )
}