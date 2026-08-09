import {
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  Menu,
  Pencil,
  Plus,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";

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
type ApplicationStatus = "Applied" | "Interview" | "Offer" | "Rejected";

type Application = {
  id: number;
  company: string;
  position: string;
  location: string;
  dateApplied: string;
  status: ApplicationStatus;
  notes: string;
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [applications, setApplications] = useState<Application[]>(() => {
  const savedApplications = localStorage.getItem("internshipApplications");
  

  if (!savedApplications) {
    return [];
  }

  try {
    return JSON.parse(savedApplications) as Application[];
  } catch {
    return [];
  }
});

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>("Applied");
  const [notes, setNotes] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  useEffect(() => {
  localStorage.setItem(
    "internshipApplications",
    JSON.stringify(applications),);
  }, [applications]);
  const totalApplications = applications.length;

const interviewCount = applications.filter(
  (application) => application.status === "Interview",
).length;

const offerCount = applications.filter(
  (application) => application.status === "Offer",
).length;

const rejectedCount = applications.filter(
  (application) => application.status === "Rejected",
).length;
  const handleDelete = (id: number) => {
  setApplications((currentApplications) =>
    currentApplications.filter((application) => application.id !== id),
  );
};

const handleEdit = (application: Application) => {
  setCompany(application.company);
  setPosition(application.position);
  setLocation(application.location);
  setDateApplied(application.dateApplied);
  setStatus(application.status);
  setNotes(application.notes);
  setEditingId(application.id);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  
  event.preventDefault();

  if (!company.trim() || !position.trim() || !dateApplied) {
    return;
  }
  if (editingId !== null) {
  setApplications((currentApplications) =>
    currentApplications.map((application) =>
      application.id === editingId
        ? {
            ...application,
            company: company.trim(),
            position: position.trim(),
            location: location.trim(),
            dateApplied,
            status,
            notes: notes.trim(),
          }
        : application,
    ),
  );

  setEditingId(null);
  setCompany("");
  setPosition("");
  setLocation("");
  setDateApplied("");
  setStatus("Applied");
  setNotes("");

  return;
}
  const newApplication: Application = {
    id: Date.now(),
    company: company.trim(),
    position: position.trim(),
    location: location.trim(),
    dateApplied,
    status,
    notes: notes.trim(),
  };

  setApplications((currentApplications) => [
    newApplication,
    ...currentApplications,
  ]);

  setCompany("");
  setPosition("");
  setLocation("");
  setDateApplied("");
  setStatus("Applied");
  setNotes("");
};

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

          <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
  <div className="rounded-2xl border border-[#deddd7] bg-[#fffdfa] p-5 shadow-sm">
    <p className="text-sm font-semibold text-[#707b7e]">
      Total applications
    </p>
    <p className="mt-2 text-3xl font-extrabold text-[#203039]">
      {totalApplications}
    </p>
  </div>

  <div className="rounded-2xl border border-[#deddd7] bg-[#fffdfa] p-5 shadow-sm">
    <p className="text-sm font-semibold text-[#707b7e]">Interviews</p>
    <p className="mt-2 text-3xl font-extrabold text-[#4f857f]">
      {interviewCount}
    </p>
  </div>

  <div className="rounded-2xl border border-[#deddd7] bg-[#fffdfa] p-5 shadow-sm">
    <p className="text-sm font-semibold text-[#707b7e]">Offers</p>
    <p className="mt-2 text-3xl font-extrabold text-[#d96f57]">
      {offerCount}
    </p>
  </div>

  <div className="rounded-2xl border border-[#deddd7] bg-[#fffdfa] p-5 shadow-sm">
    <p className="text-sm font-semibold text-[#707b7e]">Rejections</p>
    <p className="mt-2 text-3xl font-extrabold text-[#9a5b51]">
      {rejectedCount}
    </p>
  </div>
</section>
          <section className="rounded-[28px] border border-[#deddd7] bg-[#fffdfa] p-7 shadow-[0_18px_50px_rgba(54,70,70,0.07)]">
  <div className="mb-6">
    <p className="text-sm font-bold text-[#4f857f]">
      New application
    </p>

    <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-[#203039]">
      {editingId !== null ? "Edit application" : "Add an internship"}
    </h2>

    <p className="mt-2 text-sm text-[#707b7e]">
      Keep the important details from each application in one place.
    </p>
  </div>

  <form
  onSubmit={handleSubmit}
  className="grid gap-5 sm:grid-cols-2"
>
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#34444b]">
        Company
      </label>

      <input
        type="text"
        placeholder="e.g. Microsoft"
        value={company}
        onChange={(event) => setCompany(event.target.value)}
        required
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
        value={position}
        onChange={(event) => setPosition(event.target.value)}
        required
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
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        className="w-full rounded-2xl border border-[#d8d8d1] bg-white px-4 py-3 outline-none transition focus:border-[#4f857f] focus:ring-4 focus:ring-[#4f857f]/10"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm font-semibold text-[#34444b]">
        Date applied
      </label>

      <input
        type="date"
        value={dateApplied}
        onChange={(event) => setDateApplied(event.target.value)}
        required
        className="w-full rounded-2xl border border-[#d8d8d1] bg-white px-4 py-3 outline-none transition focus:border-[#4f857f] focus:ring-4 focus:ring-[#4f857f]/10"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm font-semibold text-[#34444b]">
        Status
      </label>

      <select
        value={status}
        onChange={(event) =>
        setStatus(event.target.value as ApplicationStatus)
        }
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
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        className="w-full resize-none rounded-2xl border border-[#d8d8d1] bg-white px-4 py-3 outline-none transition focus:border-[#4f857f] focus:ring-4 focus:ring-[#4f857f]/10"
      />
    </div>

    <div className="sm:col-span-2">
      <button
        type="submit"
        className="rounded-2xl bg-[#d96f57] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#c95f49]"
      >
        {editingId !== null ? "Update application" : "Save application"}
      </button>
    </div>
  </form>
</section>

<section className="mt-8 rounded-[28px] border border-[#deddd7] bg-[#fffdfa] p-7 shadow-[0_18px_50px_rgba(54,70,70,0.07)]">
  <div className="mb-6">
    <p className="text-sm font-bold text-[#4f857f]">
      Applications
    </p>

    <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-[#203039]">
      Your applications
    </h2>
  </div>

  {applications.length === 0 ? (
    <div className="rounded-2xl border border-dashed border-[#d8d8d1] bg-[#f8f6f0] px-6 py-12 text-center">
      <BriefcaseBusiness className="mx-auto h-8 w-8 text-[#8ca9a5]" />

      <p className="mt-3 font-semibold text-[#34444b]">
        No applications yet
      </p>

      <p className="mt-1 text-sm text-[#707b7e]">
        Add your first application using the form above.
      </p>
    </div>
  ) : (
    <div className="space-y-4">
      {applications.map((application) => (
        <article
          key={application.id}
          className="rounded-2xl border border-[#deddd7] bg-white p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-[#203039]">
                {application.company}
              </h3>

              <p className="mt-1 font-semibold text-[#4f857f]">
                {application.position}
              </p>

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#707b7e]">
                {application.location && (
                  <span>{application.location}</span>
                )}

                <span>
                  Applied {application.dateApplied}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
  <span className="w-fit rounded-full bg-[#eaf2f0] px-3 py-1.5 text-xs font-bold text-[#315f5b]">
    {application.status}
  </span>

  <div className="flex items-center gap-2">
    <button
      type="button"
      onClick={() => handleEdit(application)}
      className="inline-flex items-center gap-1.5 rounded-xl border border-[#d8d8d1] px-3 py-2 text-xs font-bold text-[#4f857f] transition hover:bg-[#eaf2f0]"
    >
      <Pencil className="h-4 w-4" />
      Edit
    </button>

    <button
      type="button"
      onClick={() => handleDelete(application.id)}
      className="inline-flex items-center gap-1.5 rounded-xl border border-[#ead7d1] px-3 py-2 text-xs font-bold text-[#b45d49] transition hover:bg-[#fff1ec]"
    >
      <Trash2 className="h-4 w-4" />
      Delete
    </button>
  </div>
</div>
          </div>

          {application.notes && (
            <p className="mt-4 border-t border-[#eceae4] pt-4 text-sm leading-6 text-[#657277]">
              {application.notes}
            </p>
          )}
        </article>
      ))}
    </div>
  )}
</section>
        </div>
      </main>
    </div>
  );
}

export default App;