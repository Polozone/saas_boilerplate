import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Cloud, Lock, ShieldCheck, UsersRound, Fingerprint, Container, Mail } from "lucide-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: 'Push-to-deploy',
      description:
        'Easily deploy your SaaS through a coolify instance in localhost with the docker-compose.prod.yml file and git-push to deploy in production.',
      icon: Cloud,
    },
    {
      title: 'Typesafe API',
      description:
        'Boost your productivity with a typesafe API that run under ts-rest. Shared bundle with frontend & backend. No more API errors, no more guessing.',
      icon: Lock,
    },
    {
      title: 'Authentication',
      description:
        'Built-in authentication is already implemented with Passport.js. Allow your users to signin with a simple magic-link.',
      icon: ShieldCheck,
    },
    {
      title: 'Organizations',
      description:
        'Users can create organizations and invite other users to join them. Focus yourself on your real business-logic.',
      icon: UsersRound,
    },
    {
      title: 'Shadcn-CLI',
      description:
        'Use shadcn-CLI to generate components. No more copy-pasting components from shadcn-ui website.',
      icon: Fingerprint,
    },
    {
      title: 'Docker-compose',
      description:
        'Clone and ship with a simple docker-compose build & up command.',
      icon: Container,
    },
    {
      title: 'Simple-stack',
      description:
        'Take advantage of a NodeJS & NestJS backend, React frontend and PostgreSQL database. All with Typescript.',
      icon: Fingerprint,
    },
    {
      title: 'Transactional emails',
      description:
        'Make a Brevo account, paste your API key in the .env file and start sending emails.',
      icon: Mail,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon: Icon,
  index,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        <Icon />
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
