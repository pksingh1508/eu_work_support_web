import Image from "next/image";
import Link from "next/link";

const phoneScreens = [
  {
    src: "/assets/home.jpg",
    alt: "EU Work Support home dashboard",
    className:
      "left-1/2 top-3 z-10 w-[40%] -translate-x-1/2 rotate-0 sm:w-[34%]",
    priority: true,
  },
  {
    src: "/assets/search.jpg",
    alt: "EU Work Support country search results",
    className: "left-5 top-[27%] z-20 w-[42%] -rotate-7 sm:left-8 sm:w-[36%]",
    priority: false,
  },
  {
    src: "/assets/single_country.jpg",
    alt: "EU Work Support France guidance screen",
    className: "right-5 top-[30%] z-30 w-[42%] rotate-6 sm:right-8 sm:w-[36%]",
    priority: false,
  },
];

const benefitCards = [
  {
    title: "Country guidance",
    description:
      "Focused pages help users compare destinations, work expectations, and relocation details without jumping between scattered sources.",
  },
  {
    title: "Visa support",
    description:
      "Document checklists and practical next steps keep important application details clear before users make a move.",
  },
  {
    title: "Save and revisit",
    description:
      "Users can return to promising countries and planning details when they are ready to compare options again.",
  },
];

const stats = [
  { value: "3", label: "core mobile flows" },
  { value: "29+", label: "European countries" },
  { value: "4 docs", label: "typical checklists" },
];

export default function RequestHome() {
  return (
    <main className="relative min-h-screen w-full max-w-full overflow-hidden bg-[linear-gradient(135deg,#f8fbff_0%,#eef7ff_38%,#f7f3ff_70%,#fffaf3_100%)] text-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_78%_18%,rgba(56,189,248,0.22),transparent_56%),radial-gradient(720px_circle_at_12%_72%,rgba(99,102,241,0.14),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-white/45" />

      <header className="fixed inset-x-0 top-5 z-50 px-5 sm:px-8 lg:px-10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full border border-white/80 bg-white/75 px-4 py-3 shadow-[0_22px_70px_-42px_rgba(15,23,42,0.65)] backdrop-blur-xl sm:px-6">
          <Link
            href="/request"
            className="min-w-0 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-slate-900 sm:text-sm sm:tracking-[0.28em]"
          >
            EU Work Support
          </Link>
          <Link
            href="/request/sign-up"
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-slate-950 px-4 text-xs font-semibold text-[#f8fafc] shadow-[0_14px_34px_-20px_rgba(15,23,42,0.9)] transition hover:-translate-y-0.5 hover:bg-slate-800 sm:px-5 sm:text-sm"
            style={{ color: "#f8fafc" }}
          >
            <span className="sm:hidden">Access</span>
            <span className="hidden sm:inline">Request Access</span>
          </Link>
        </nav>
      </header>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col overflow-hidden px-5 py-5 sm:px-8 lg:px-10">
        <section className="grid flex-1 items-center gap-12 pb-12 pt-36 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10 lg:pb-8 lg:pt-32">
          <div className="max-w-2xl">
            <div className="inline-flex max-w-full rounded-full border border-sky-200/80 bg-white/65 px-4 py-2 text-sm font-semibold text-sky-700 shadow-sm backdrop-blur">
              Mobile-first support for European work planning
            </div>

            <h1 className="mt-7 max-w-[21rem] text-3xl font-semibold leading-[1.05] tracking-tight text-slate-950 sm:max-w-3xl sm:text-6xl sm:leading-[0.96] lg:text-7xl">
              Find the European work path that fits your next move.
            </h1>

            <p className="mt-6 max-w-[21rem] text-base leading-7 text-slate-600 sm:max-w-2xl sm:text-xl sm:leading-8">
              EU Work Support brings country details, visa checklists, and
              relocation guidance into a clean mobile experience so users can
              browse, compare, and revisit decisions with confidence.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/request/sign-up"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-slate-950 px-7 text-base font-semibold text-[#f8fafc] shadow-[0_18px_38px_-22px_rgba(15,23,42,0.9)] transition hover:-translate-y-0.5 hover:bg-slate-800"
                style={{ color: "#f8fafc" }}
              >
                Request Access
              </Link>
            </div>

            <div className="mt-9 grid max-w-xl grid-cols-3 gap-2 sm:gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-white/80 bg-white/60 p-3 shadow-sm backdrop-blur sm:p-4"
                >
                  <p className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[0.64rem] font-medium uppercase leading-4 tracking-[0.12em] text-slate-500 sm:text-xs sm:leading-5 sm:tracking-[0.14em]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div id="screens" className="relative min-h-[480px] lg:min-h-[580px]">
            <div className="absolute inset-x-12 bottom-10 top-16 rounded-[3rem] border border-white/70 bg-white/45 shadow-[0_42px_120px_-70px_rgba(15,23,42,0.75)] backdrop-blur-md" />
            <div className="absolute inset-x-16 bottom-0 h-24 rounded-full bg-slate-950/10 blur-3xl" />

            {phoneScreens.map((screen) => (
              <div
                key={screen.src}
                className={`absolute overflow-hidden rounded-[2rem] border-[10px] border-slate-950 bg-slate-950 shadow-[0_34px_70px_-34px_rgba(15,23,42,0.9)] ${screen.className}`}
              >
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  width={1260}
                  height={2800}
                  priority={screen.priority}
                  sizes="(max-width: 1024px) 46vw, 320px"
                  className="h-auto w-full bg-white"
                />
              </div>
            ))}

            <div className="absolute bottom-4 left-4 right-4 z-40 grid gap-3 rounded-lg border border-white/80 bg-white/78 p-4 shadow-[0_24px_70px_-46px_rgba(15,23,42,0.75)] backdrop-blur-xl sm:left-10 sm:right-10 sm:grid-cols-3">
              <div>
                <p className="text-sm font-semibold text-slate-950">Browse</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Start from countries and topics.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-950">Compare</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Scan clear results and checklists.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-950">Decide</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Revisit saved guidance later.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 pb-14 sm:grid-cols-3">
          {benefitCards.map((card) => (
            <article
              key={card.title}
              className="rounded-lg border border-white/80 bg-white/68 p-5 shadow-sm backdrop-blur"
            >
              <h2 className="text-base font-semibold text-slate-950">
                {card.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {card.description}
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
