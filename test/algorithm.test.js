const getResult = require('../scripts/script')

test('Perform Brown-Lomnicki algorithm', () => {
  matrix = [[1,3,5,8],[-2,3,4,5],[7,-1,1,0]];
  iterates = 1000;
  dimensions = {rows: 3,
                columns: 4};
  result = getResult(matrix, iterates, dimensions);

  expect(result.strategies_a[0] / iterates).toBe(0.8);
  expect(result.strategies_a[1] / iterates).toBe(0);
  expect(result.strategies_a[2] / iterates).toBe(0.2);

  expect(result.strategies_b[0] / iterates).toBe(0.4);
  expect(result.strategies_b[1] / iterates).toBe(0.6);
  expect(result.strategies_b[2] / iterates).toBe(0);
  expect(result.strategies_b[3] / iterates).toBe(0);

  expect(result.min_a).toBe(2.2);
  expect(result.max_a).toBe(6.4);

  expect(result.min_b).toBe(1);
  expect(result.max_b).toBe(2.2);
});