type Project = {
  title: string;
  location: string;
  scope: string[];
  status: "Completed" | "In Progress" | "Precon";
};

const PROJECTS: Project[] = [
  {
    title: "Woodmere Youth Center – Interiors Phase II",
    location: "Harvey, LA",
    scope: ["Interior improvements", "Painting & finishes", "Project closeout docs"],
    status: "In Progress",
  },
  {
    title: "NOFD Roofing – Kenner",
    location: "Kenner, LA",
    scope: ["Full roof replacement", "Sheet metal", "Flashing"],
    status: "Completed",
  },
];

export const metadata = {
  title: "Projects | Visionaire Construction",
  description: "Selected projects across commercial and municipal scopes.",
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-4xl font-semibold">Projects</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <article key={p.title} className="rounded-2xl border bg-[--color-background] p-6 shadow-sm">
            <header className="flex items-center justify-between">
              <h2 className="text-xl font-medium">{p.title}</h2>
              <span className="text-xs rounded-full border px-2 py-1">{p.status}</span>
            </header>
            <p className="mt-2 text-sm opacity-80">{p.location}</p>
            <ul className="mt-4 space-y-1 text-sm">
              {p.scope.map((s) => (<li key={s}>• {s}</li>))}
            </ul>
          </article>
        ))}
      </div>
    </main>
  );
}
