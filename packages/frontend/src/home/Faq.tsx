import { Faq3 } from "@/components/blocks/faq3"

const demoData = {
  heading: "Frequently asked questions",
  description:
    "Everything you need to know. Can't find the answer you're looking for? Feel free to contact me.",
  items: [
    {
      id: "faq-1",
      question: "What is saas.paulmulin.fr?",
      answer:
        "It's a boilerplate that you can freely clone to quickly deploy your MVP through coolify (Vercel-like, but free & open-source)."
    },
    {
      id: "faq-2",
      question: "How can I easily deploy my website witht this boilerplate?",
      answer:
        "Get a VPS and install coolify. Use the /docker-compose.prod.yml file to easily deploy through docker-compose.",
    },
    {
      id: "faq-3",
      question: "How do I install this boilerplate?",
      answer:
        "Go to the github repository and follow instructions to install it.",
    },
    {
      id: "faq-4",
      question: "Is it free?",
      answer:
        "Absolutely!",
    }
  ],
  supportHeading: "Still have questions?",
  supportDescription:
    "Can't find the answer you're looking for?",
  supportButtonText: "Contact me",
  supportButtonUrl: "https://linkedin.com/in/paulmulin",
};

function Faq3Demo() {
  return <Faq3 {...demoData} />;
}

export { Faq3Demo };
