/** Monthly costs are held as whole DKK; display with a thousands separator. */
export const formatCost = (amount: number): string =>
  `${amount.toLocaleString('en-US')} kr`

export const formatRating = (rating: number): string => rating.toFixed(1)
