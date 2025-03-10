import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"

interface Testimonial {
  text: string
  author: {
    name: string
    handle: string
    avatar: string
  }
  href?: string
}

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Testimonial[]
  className?: string
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
  className
}: TestimonialsSectionProps) {
  return (
    <section className={cn(
      "bg-background text-foreground",
      "py-12 sm:py-16 md:py-20",
      className
    )}>
      <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee group-hover:[animation-play-state:paused]">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="flex-none w-[384px]">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee group-hover:[animation-play-state:paused]">
              {testimonials.map((testimonial, idx) => (
                <div key={`duplicate-${idx}`} className="flex-none w-[384px]">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-background sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-background sm:block" />
        </div>
      </div>
    </section>
  )
}