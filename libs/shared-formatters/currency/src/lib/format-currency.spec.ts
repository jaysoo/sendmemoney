import { formatCurrency } from './format-currency';

test('formatCurrency', () => {
  expect(formatCurrency(100)).toEqual('$100.00');
  expect(formatCurrency(1234567.89)).toEqual('$1,234,567.89');
});
