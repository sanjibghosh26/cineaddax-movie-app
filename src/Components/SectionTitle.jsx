import { Link } from "react-router-dom";

function SectionTitle({ label, title, link }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className="text-sm font-semibold tracking-wide text-fuchsia-400">
          {label}
        </p>

        <h2 className="mt-1 text-2xl font-bold sm:text-3xl">{title}</h2>
      </div>

      {link && (
        <Link
          to={link}
          className="shrink-0 text-sm font-semibold text-fuchsia-400 transition hover:text-fuchsia-300"
        >
          View all →
        </Link>
      )}
    </div>
  );
}

export default SectionTitle;