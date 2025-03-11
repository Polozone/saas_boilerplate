import { TestimonialsSection } from "@/components/blocks/testimonials-with-marquee"


const testimonials = [
  {
    author: {
      name: "Paul Mulin",
      handle: "@paulmulin",
      avatar: "https://media.licdn.com/dms/image/v2/C4D03AQEoMISwXqzvuQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1516873528493?e=1746662400&v=beta&t=fPj0JVmBH-LqhvuGBlwBbuEwzfOx2eeVQPtIP5un-qE"
    },
    text: "This boilerplate save me hours of development time. I launched my MVP in a day.",
    href: "https://www.linkedin.com/in/paul-mulin/"
  },
  {
    author: {
      name: "Emma Thompson",
      handle: "@emmaai",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "Using this starter-kit made me deploy my MVP in a day.",
    href: "https://www.linkedin.com/in/paul-mulin/"
  },
  {
    author: {
      name: "David Park",
      handle: "@davidtech",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "I liked the solution, especially the ability to deploy through coolify really easily.",
    href: "https://www.linkedin.com/in/paul-mulin/"
  },
  {
    author: {
      name: "Sofia Rodriguez",
      handle: "@sofiaml",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "If you want to launch a MVP to test a feature for your users, ",
    href: "https://www.linkedin.com/in/paul-mulin/"
  },
  {
    author: {
      name: "Theo Deville",
      handle: "@davidtech",
      avatar: "https://media.licdn.com/dms/image/v2/D4E03AQEY8O-_Z7eGuw/profile-displayphoto-shrink_800_800/B4EZSYj6BRG0Ag-/0/1737726338958?e=1746662400&v=beta&t=PCrJh8LHmKQzTIqrf1-c474GYYB-Zhy0phRz63q8XQg"
    },
    text: "I always talked about launching a SaaS but never did it. This boilerplate is the best way to get started.",
    href: "https://www.linkedin.com/in/th%C3%A9o-deville-343b07236/"
  },
]

export function TestimonialsSectionDemo() {
  return (
    <TestimonialsSection
      title="Trusted by developers"
      description="Join thousands of developers who are already building their future SaaS with this boilerplate"
      testimonials={testimonials}
    />
  )
}
