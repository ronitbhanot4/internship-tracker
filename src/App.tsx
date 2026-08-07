import {
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  Menu,
  Plus,
  Settings,
  X,
} from "lucide-react";
import { useState } from "react";

const navigationItems = [
  {
    label: "Dashboard",
    icon: BarChart3,
    active: true,
  },
  {
    label: "Applications",
    icon: BriefcaseBusiness,
    active: false,
  },
  {
    label: "Interviews",
    icon: CalendarDays,
    active: false,
  },
  {
    label: "Documents",
    icon: FileText,
    active: false,
  },
];

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f5f1] text-[#24313a]">
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-[#172a2d]/40 backdrop-blur-[2px] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/10 bg-[#19383b] text-white shadow-xl transition-transform duration-200 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-24 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e98b72] shadow-sm">
              <BriefcaseBusiness className="h-5 w-5 text-white" />
            </div>

            <div>
              <p className="font-extrabold tracking-tight">
                Internship Tracker
              </p>

              <p className="mt-1 text-xs font-medium text-[#b8ceca]">
                Your application workspace
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close sidebar"
            className="rounded-xl p-2 text-[#b8ceca] transition hover:bg-white/10 hover:text-white lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-7">
          <p className="mb-3 px-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#83aaa5]">
            Workspace
          </p>

          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-semibold transition ${
                  item.active
                    ? "bg-[#f4eee4] text-[#19383b] shadow-sm"
                    : "text-[#c7d9d6] hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold text-[#c7d9d6] transition hover:bg-white/10 hover:text-white"
          >
            <Settings className="h-5 w-5" />
            Settings
          </button>
        </div>
      </aside>

      <main className="min-h-screen lg:pl-72">
        <header className="border-b border-[#deddd7] bg-[#fffdfa]/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-6 sm:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Open navigation"
                className="rounded-xl border border-[#d8d8d1] bg-white p-2.5 text-[#35464d] transition hover:bg-[#f2f0e9] lg:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>

              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-[#4f857f]">
                  Dashboard
                </p>

                <h1 className="text-xl font-extrabold tracking-tight text-[#203039] sm:text-2xl">
                  Good afternoon, Ronit
                </h1>

                <p className="mt-1.5 text-sm font-medium text-[#6e797d]">
                  Keep your internship search organized and moving forward.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#d96f57] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#c95f49] hover:shadow-md"
            >
              <Plus className="h-5 w-5" />

              <span className="hidden sm:inline">
                Add application
              </span>

              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <section className="rounded-[28px] border border-[#deddd7] bg-[#fffdfa] p-7 shadow-[0_18px_50px_rgba(54,70,70,0.07)]">
  <div className="mb-6">
    <p className="text-sm font-bold text-[#4f857f]">
      New application
    </p>

    <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-[#203039]">
      Add an internship
    </h2>

    <p className="mt-2 text-sm text-[#707b7e]">
      Keep the important details from each application in one place.
    </p>
  </div>

  <form className="grid gap-5 sm:grid-cols-2">
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#34444b]">
        Company
      </label>

      <input
        type="text"
        placeholder="e.g. Microsoft"
        className="w-full rounded-2xl border border-[#d8d8d1] bg-white px-4 py-3 outline-none transition focus:border-[#4f857f] focus:ring-4 focus:ring-[#4f857f]/10"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm font-semibold text-[#34444b]">
        Position
      </label>

      <input
        type="text"
        placeholder="e.g. Software Engineering Intern"
        className="w-full rounded-2xl border border-[#d8d8d1] bg-white px-4 py-3 outline-none transition focus:border-[#4f857f] focus:ring-4 focus:ring-[#4f857f]/10"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm font-semibold text-[#34444b]">
        Location
      </label>

      <input
        type="text"
        placeholder="e.g. Toronto, ON"
        className="w-full rounded-2xl border border-[#d8d8d1] bg-white px-4 py-3 outline-none transition focus:border-[#4f857f] focus:ring-4 focus:ring-[#4f857f]/10"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm font-semibold text-[#34444b]">
        Date applied
      </label>

      <input
        type="date"
        className="w-full rounded-2xl border border-[#d8d8d1] bg-white px-4 py-3 outline-none transition focus:border-[#4f857f] focus:ring-4 focus:ring-[#4f857f]/10"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm font-semibold text-[#34444b]">
        Status
      </label>

      <select
        className="w-full rounded-2xl border border-[#d8d8d1] bg-white px-4 py-3 outline-none transition focus:border-[#4f857f] focus:ring-4 focus:ring-[#4f857f]/10"
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
    </div>

    <div className="sm:col-span-2">
      <label className="mb-2 block text-sm font-semibold text-[#34444b]">
        Notes
      </label>

      <textarea
        rows={4}
        placeholder="Anything useful to remember about this application..."
        className="w-full resize-none rounded-2xl border border-[#d8d8d1] bg-white px-4 py-3 outline-none transition focus:border-[#4f857f] focus:ring-4 focus:ring-[#4f857f]/10"
      />
    </div>

    <div className="sm:col-span-2">
      <button
        type="submit"
        className="rounded-2xl bg-[#d96f57] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#c95f49]"
      >
        Save application
      </button>
    </div>
  </form>
</section>
        </div>
      </main>
    </div>
  );
}

export default App;