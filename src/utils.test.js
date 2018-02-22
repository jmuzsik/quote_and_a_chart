import {
  mapTable,
  filterTable,
  initialReformat,
  dataFunction,
  filterAll,
  separateDataByYears,
  averageDataByYear
} from './utils.js'
const DataOne = require('./data/adult-mortality-region.json')
const DataTwo = require('./data/health-child-mortality-births-region.json')
const DataThree = require('./data/health-women-violence-relationships.json')

describe('initialReformat', () => {
  test('Creates instance of Array', () => {
    expect(initialReformat(DataOne)).toBeInstanceOf(Array)
  })
  test('Returns correct data GHO(title)', () => {
    expect(Object.values(initialReformat(DataOne))[0].GHO).toBe(
      'Adult mortality rate (probability of dying between 15 and 60 years per 1000 population)'
    )
  })
  test('Value is within the object', () => {
    expect(Object.values(initialReformat(DataOne))[0].Value).toBe('300')
  })
})
describe('mapTable', () => {
  test('expect data value to contain brackets before running mapTable', () => {
    expect(
      initialReformat(DataThree)[0].Value.indexOf('[')
    ).toBeGreaterThanOrEqual(0)
  })
  test('expect brackets to be removed when mapTable is run', () => {
    expect(mapTable(initialReformat(DataThree))[0].Value.indexOf('[')).toBe(-1)
  })
})

describe('dataFunction', () => {
  test('makes year a universal data format', () => {
    expect(dataFunction(initialReformat(DataOne))[0].value).toBe('300')
  })
  test('has all of the changed properties', () => {
    expect(dataFunction(initialReformat(DataOne))[0]).toHaveProperty(
      'region',
      'year',
      'title',
      'value',
      'sex'
    )
  })
})

describe('filterAll', () => {
  test('if data contains multiple titles it separates data based upon the title', () => {
    expect(
      Object.keys(filterAll(dataFunction(initialReformat(DataTwo)))).length
    ).toBeGreaterThanOrEqual(2)
  })
  test('if data does not contain multiple titles the length of the array must be one', () => {
    expect(
      Object.keys(filterAll(dataFunction(initialReformat(DataOne)))).length
    ).toBe(1)
  })
  test('there should be multiple year keys within the title keys object', () => {
    expect(
      Object.keys(
        filterAll(dataFunction(initialReformat(DataOne)))[
          'Adult mortality rate (probability of dying between 15 and 60 years per 1000 population)'
        ]
      ).length
    ).toBeGreaterThanOrEqual(2)
  })
})

describe('separateDataByYears', () => {
  test('it should return an array of the same length as the amount of keys (amount of years) returned in the previous function call', () => {
    expect(
      separateDataByYears(
        filterAll(
          dataFunction(mapTable(filterTable(initialReformat(DataTwo))))
        )[
          'Under-five mortality rate (probability of dying by age 5 per 1000 live births)'
        ]
      ).length
    ).toBe(
      Object.keys(
        filterAll(
          dataFunction(mapTable(filterTable(initialReformat(DataTwo))))
        )[
          'Under-five mortality rate (probability of dying by age 5 per 1000 live births)'
        ]
      ).length
    )
  })
})

describe('averageDataByYear', () => {
  test('should return an object with the same amount of keys as each object in the last return minus one as that was a year, this is because each country or region is in every year in the previous return and what is to be returned is the average number in an object of those values', () => {
    expect(
      Object.keys(
        averageDataByYear(
          separateDataByYears(
            filterAll(
              dataFunction(mapTable(filterTable(initialReformat(DataTwo))))
            )[
              'Under-five mortality rate (probability of dying by age 5 per 1000 live births)'
            ]
          )
        )
      ).length
    ).toBe(
      Object.keys(
        separateDataByYears(
          filterAll(
            dataFunction(mapTable(filterTable(initialReformat(DataTwo))))
          )[
            'Under-five mortality rate (probability of dying by age 5 per 1000 live births)'
          ]
        )[0]
      ).length - 1
    )
  })
})

