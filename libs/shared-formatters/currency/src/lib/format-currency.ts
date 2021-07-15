export function formatCurrency(n: number): string {
  const x = n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `$${x}`;
}
