const AdultMortalityProbabilityData = require('./data/adult-mortality-region.json')

import { mapTable, initialReformat, dataFunction, filterAll, averageDataByYear, filterBySex, turnStringsIntoFloats, deleteNaN, filterTable, filterByAgeGroup } from './utils.js'

it('Data function ')
