import { Faq3 } from "@/components/blocks/faq3"

const demoData = {
  heading: "Frequently asked questions",
  description:
    "Everything you need to know about your the product. Can't find the answer you're looking for? Feel free to contact our support team.",
  items: [
    {
      id: "faq-1",
      question: "What is saas.paulmulin.fr?",
      answer:
        "It's simply a SaaS boilerplate where you can easily clone and deploy your MVP."
    },
    {
      id: "faq-2",
      question: "How do I install this boilerplate?",
      answer:
        "Go to the github repository and follow instructions to install it.",
    },
    {
      id: "faq-3",
      question: "How can I easily deploy my website witht this boilerplate?",
      answer:
        "Get a VPS and setup a coolify instance. Use the /docker-compose.prod.yml file to easily deploy through docker-compose.",
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
  supportButtonText: "Contact Support",
  supportButtonUrl: "https://linkedin.com/in/paulmulin",
};

function Faq3Demo() {
  return <Faq3 {...demoData} />;
}

export { Faq3Demo };
