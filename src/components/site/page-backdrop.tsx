/** Soft grid and colour glows behind checkout, payment, and policy pages. */
export function PageBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="hero-grid absolute inset-x-0 top-0 h-[760px] opacity-70" />
      <div className="absolute -left-44 top-[30%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(91,214,172,0.15),transparent)]" />
      <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(57,121,232,0.16),transparent)]" />
    </div>
  );
}
