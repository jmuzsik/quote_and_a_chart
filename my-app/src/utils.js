export const dataFunction = function (data, alcohol) {
  var inputData = [];
  //go through the data
  data.forEach((row, i) => {
    //check if data has specified type and set it to a variable
    const tableTitle = row.GHO || null,
      country = row.COUNTRY || null,
      region = row.REGION || null,
      year = row.YEAR || null,
      value = row.Value || null,
      sex = row.SEX || null,
      alcoholType = row.ALCOHOLTYPE || null,
      socialCostType = row.SOCIALCOSTTYPE || null,
      ageGroup = row.AGEGROUP || null,
      advertisingType = row.ADVERTISINGTYPE || null,
      residenceAreaType = row.RESIDENCEAREATYPE || null;
    //set first object to all values it can possible have
    inputData[i] = {};
    inputData[i].title = tableTitle;
    inputData[i].value = value;
    if (country) inputData[i].country = country;
    if (region) inputData[i].region = region;
    if (year) inputData[i].year = year;
    if (sex) inputData[i].sex = sex;
    //alcohol only has to do with certain datasets
    if (alcohol) {
      if (socialCostType) inputData[i].socialCostType = socialCostType;
      if (ageGroup) inputData[i].ageGroup = ageGroup;
      if (advertisingType) inputData[i].advertisingType = advertisingType;
      if (alcoholType) inputData[i].alcoholType = alcoholType;
    }
    if (residenceAreaType) inputData[i].residenceAreaType = residenceAreaType;
    return row;
  });
  //data filtered without extra parameters
  return inputData;
};

//this is usesd to filter data by, first title, and then by year
export const filterAll = data => {
  var filtered = [];
  //go through the data and add to first filter
  data.map(row => {
    //if title exists already then add the row to correlate with the title
    if (filtered[row.title]) filtered[row.title].push(row);
    //create a new array for row and place first instance into the it
    else {
      filtered[row.title] = [];
      filtered[row.title].push(row);
    }
  });
  var secondFilter = [];
  for (var title in filtered) {
    //go through each title key
    filtered[title].forEach((row, i) => {
      //go through each row inside title array
      if (!secondFilter[title]) {
        //if there is no key associated with the title
        //create a new object
        secondFilter[title] = {};
        //set a year to the title if it exists
        secondFilter[title][row.year] = [];
        //add the row to the specified year
        secondFilter[title][row.year].push(row);
        //check if the year exists with the title
      } else if (!secondFilter[title][row.year]) {
        //if it does not create the new year
        secondFilter[title][row.year] = [];
        //push the row into the title/year
        secondFilter[title][row.year].push(row);
      } else {
        //push the row into the title and year specified
        secondFilter[title][row.year].push(row);
      }
    });
  }
  //should return an array that contains a title as a key, an array of objects specifying years arrays as the value. Each of these arrays contains all of the row related to the year.
  return secondFilter;
};

//I have no idea what the point of this is, as the fact is that it does not appear to be used anywhere.
// export const flatten = data => {
//   const renderCustom = (cell, row, extra) => {
//     const value = _.get(row, extra.path);
//     return <div>{value}</div>;
//   };

//   const columns = [
//     { path: 'id', title: 'ID', isKey: true },
//     { path: 'animal.cat', title: 'Cat' }
//   ];

//   const tableColumn = _.map(columns, column => (
//     <TableHeaderColumn
//       dataField={column.path}
//       dataFormat={renderCustom}
//       formatExtraData={column}
//       isKey={column.isKey}
//       key={column.path}
//     >
//       {column.title}
//     </TableHeaderColumn>
//   ));
// };

export const separateDataByYears = (data, title) => {
  data = data[title]
  let separatedData = [],
    i = 0
  //key is each year... 1990, 1991...
  for (var key in data) {
    //sets a new object solely with the key year and the corresponding year value
    separatedData.push({ year: key });
    //loop through all of the objects within each year, grab the objects region, set it as the key and set the corresponding data value to the region
    data[key].forEach(obj => {
      separatedData[i][obj.region] = +obj.value;
    });
    //increment i so that the next year is set to the next index in the array
    i++;
  }
  return separatedData
}

export const averageDataByYear = (data) => {
  let averagedData = {},
    k = 0
  //loop through each year in the dataset
  data.forEach((obj) => {
    for (var key in obj) {
      //if key is year, do nothing, otherwise go through each key/value
      if (key !== 'year') {
        //if the index is greater then 0, it means that you have already set each region to the first corresponding value(1990, if that is the first year), so grab the next value and add it to it (1991, 1992, ...)
        if (k > 0) {
          averagedData[key] += +obj[key];
        } else {
          //set first value, set region, and set value
          averagedData[key] = +obj[key];
        }
      }
    }
    k++;
  })
  //k is the amount of years that were gone through, so divide by that number for the average
  for (var key in averagedData) {
    averagedData[key] = averagedData[key] / k
  }
  return averagedData
}

export const filterBySex = (sex, data, key, year) => {
  //key is the title, year is the one desired
  let filteredData = data[key][year].filter((obj) => {
    if (sex === obj.sex) return obj
  })
  return filteredData
}

export const turnStringsIntoFloats = (data, key) => {
  data.map(obj => {
    //sometimes a value is null which converts to NaN for the chart
    if (obj[key] !== null) {
      obj[key] = parseFloat(obj[key])
    }
    else {
      obj[key] = 0
    }
  })
  return data
}

export const deleteNaN = (data, key) => {
  data = data.filter(obj => {
    if (!isNaN(obj[key])) {
      return obj
    }
  })
  return data
}

//here the data that has No Value, other wierd things as a value is filtered out first,
export const filterTable = data => {
  return data.filter(row => {
    let value = row.Value;
    if (!value || value === 'No data' || value === 'Not applicable') {
      return false;
    } else return true;
  });
};

//then when the numbers are odd with brackets, etc. It is turned into a float or an int that can easily be worked with.
export const mapTable = data => {
  return data.map(row => {
    let value = row.Value;
    let charCode = value.charCodeAt(0);
    let bracketIndex = value.indexOf('[') > -1;
    if (charCode > 64 && !bracketIndex) return row;
    else if (value[0] === '<' || value[0] === '>') {
      value = value.split(' ')[0].slice(1);
      row.Value = value;
      return row;
    } else if (value.indexOf(' ') > -1) {
      if (bracketIndex) {
        value = value.split('[')[0];
        row.Value = value;
        return row;
      }
      value = value.split(' ').join('');
      row.Value = value;
      return row;
    } else {
      return row;
    }
  });
};

export const initialReformat = (data) => {
  let temp = {}
  //initially the data has a fact property with all needed data within.
  return data.fact.map(row => {
    //data is then structured as so: {dims: {...stuff}, Value: some_value, ...}
    temp = row.Value;
    row = row.dims;
    row.Value = temp;
    //now it is as so: {stuff1: something, stuff2: something_else, ..., Value: some_value}
    return row;
  });
}
