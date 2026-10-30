import "./brand.css";

export default function Brand() {
  return (
    <a href="/" className="brand" aria-label="Garg Imperial Realty home">
      <svg viewBox="0 0 48 56" aria-hidden="true">
        <path
          d="M6 46V18L24 7l18 11v28M14 46V23l10-6 10 6v23M24 29v17M3 50h42M17 5l7-4 7 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.45"
        />
      </svg>
      <span>
        GARG IMPERIAL
        <span className="brand-sub">REALTY</span>
      </span>
    </a>
  );
}
