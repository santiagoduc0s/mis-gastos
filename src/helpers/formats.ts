export function formatNumber(number: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
}
