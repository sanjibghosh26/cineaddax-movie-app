import { Film, Tags, Tv, Users } from "lucide-react";

const stats = [
  {
    value: "20K+",
    label: "Movies",
    icon: Film,
    iconColor: "text-fuchsia-500",
  },
  {
    value: "15K+",
    label: "TV Shows",
    icon: Tv,
    iconColor: "text-pink-500",
  },
  {
    value: "500+",
    label: "Genres",
    icon: Tags,
    iconColor: "text-amber-400",
  },
  {
    value: "50K+",
    label: "Users",
    icon: Users,
    iconColor: "text-blue-400",
  },
];

function Stats() {
  return (
    <section className="mt-16 rounded-2xl border border-white/10 bg-slate-900/70">
      <div className="grid grid-cols-2 divide-x divide-y divide-white/10 md:grid-cols-4 md:divide-y-0">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div key={stat.label} className="p-6 text-center">
              <Icon
                size={30}
                strokeWidth={2.2}
                className={`mx-auto ${stat.iconColor}`}
              />

              <p className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                {stat.value}
              </p>

              <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Stats;