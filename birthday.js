class Birthday {
  constructor() {
    // range of date to take 5 so that it include leap year
    this.GBirthdayParams = {
      startDate: new Date(2000, 0, 1),
      endDate: new Date(2017, 0, 1),
    };
  }

  _randomDate = (date1, date2) => {
    date1 = new Date(date1).getTime();
    date2 = new Date(date2).getTime();
    if (date1 > date2) {
      return new Date(this._randomValueBetween(date2, date1));
    } else {
      return new Date(this._randomValueBetween(date1, date2));
    }
  };
  _randomValueBetween = (min, max) => {
    return Math.random() * (max - min) + min;
  };
  _generateRandomDates = (N) => {
    const { startDate, endDate } = this.GBirthdayParams;
    const dates = [];

    for (let i = 0; i < N; i++) {
      dates.push(this._randomDate(startDate, endDate));
    }

    return dates;
  };

  _atLeastTwoSameBirthday = (dates) => {
    const dateMatched = {};
    let counter = 0;
    for (let i = 0; i < dates.length; i++) {
      const key = "key" + dates[i].getDay() + dates[i].getMonth();
      if (!dateMatched[key]) {
        dateMatched[key] = true;
      } else if (dateMatched[key] === true) {
        counter++;
      }
    }

    return counter;
  };
  _matches_by_iteration = (N, numOfRuns) => {
    const allRunMatches = [];

    for (let run = 0; run < numOfRuns; run++) {
      let dates = this._generateRandomDates(N);
      let matches = this._atLeastTwoSameBirthday(dates);
      if (matches > 0) {
        allRunMatches.push(true);
      }
    }

    return allRunMatches;
  };

  chance_by_number_of_runs = (N, numOfRuns) => {
    const allRunMatches = this._matches_by_iteration(N, numOfRuns);
    console.log(
      ` giving ${N} num of people and ${numOfRuns} numbers of runs  the chance is ${
        allRunMatches.length / numOfRuns
      }`
    );
  };

  chance_by_accuracy(N, desired_accuracy) {
    let numOfRuns = 0;
    let maxIterations = 1000;
    let stop = false;

    while (!stop && numOfRuns < maxIterations) {
      const min = 1,
        max = 1000;

      let randomRuns = Math.ceil(this._randomValueBetween(min, max));
      // console.log(numOfRuns);
      let currentRunMatches = this._matches_by_iteration(N, randomRuns);
      let eps = 1 - currentRunMatches.length / randomRuns;
      if (eps <= desired_accuracy) {
        this.chance_by_number_of_runs(N, randomRuns);
        stop = true;
      }
      numOfRuns++;
    }

    if (numOfRuns == maxIterations) {
      console.log("run max Itrations and  Couldn find ");
    }
  }
}

const birthday = new Birthday();

console.log("================Chance By Runs ==================\n");
birthday.chance_by_number_of_runs(23, 10);
birthday.chance_by_number_of_runs(23, 100);
birthday.chance_by_number_of_runs(23, 500);
birthday.chance_by_number_of_runs(23, 1000);
console.log("================Chance By Accuraccy ==================\n");
birthday.chance_by_accuracy(21, 0.01);
birthday.chance_by_accuracy(22, 0.01);
birthday.chance_by_accuracy(23, 0.01);
birthday.chance_by_accuracy(22, 0.051);
