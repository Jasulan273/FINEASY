import { appPages } from "../../mvpData";

export default function AppShellHeader({ route }) {
  return (
    <header className="topbar topbar--cabinet">
      <div>
        <a className="brand" href="#dashboard">
          <span className="brand__mark" />
          finEASY
        </a>
        <p className="topbar__subtitle">SME finance workspace</p>
      </div>

      <nav className="topbar__nav" aria-label="Product navigation">
        {appPages.map((page) => (
          <a
            key={page.id}
            href={`#${page.id}`}
            className={route === page.id ? "is-active" : ""}
          >
            {page.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
