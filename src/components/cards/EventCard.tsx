import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Event } from "@/data/events";

interface EventCardProps {
  event: Event;
  index: number;
}

const EventCard = ({ event, index }: EventCardProps) => {
  const detailPath =
    event.category === "esports"
      ? `/esports-event/${event.id}`
      : event.category === "workshops" || event.category === "non-tech"
        ? `/console-event/${event.id}`
        : `/event/${event.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link to={detailPath}>
        <motion.div
          whileHover={{ x: -4, y: -4 }}
          whileTap={{ x: 0, y: 0 }}
          className="relative h-full group cursor-pointer"
        >
          {/* DAYFLOW Brutalist Card */}
          <div
            className="bg-background border-2 border-foreground p-6 shadow-md dark:shadow-md-dark 
                          group-hover:shadow-lg dark:group-hover:shadow-lg-dark transition-all duration-150 ease-out h-full flex flex-col"
          >
            {/* Event Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-foreground text-background px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider">
                {event.type}
              </span>
            </div>

            {/* Event Title */}
            <h3 className="font-sans text-2xl font-bold mb-3 uppercase tracking-tighter">
              {event.name}
            </h3>

            {/* Divider */}
            <div className="h-0.5 w-16 bg-foreground mb-4" />

            {/* Tagline */}
            <p className="text-foreground font-serif text-sm leading-relaxed mb-4 flex-1">
              {event.tagline}
            </p>

            {/* Keywords */}
            <div className="flex flex-wrap gap-2 mb-4">
              {event.keywords.slice(0, 3).map((keyword) => (
                <span
                  key={keyword}
                  className="px-2 py-1 text-xs font-mono border border-foreground uppercase"
                >
                  {keyword}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t-2 border-foreground">
              <span className="text-xs text-foreground/60 font-mono uppercase tracking-wider">
                {event.type}
              </span>
              <span className="text-xs font-mono font-bold">→</span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default EventCard;
