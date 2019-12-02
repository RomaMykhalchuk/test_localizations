//масив об'єктів

const source = [
  { fullName: { surname: "xxx", firstName: "yyy", middleName: "zzz" } },
  { fullName: { surname: "XXX", firstName: "YYY", middleName: "ZZZ" } }
];

//локалізації

const localization = {
  "fullName.surname": "Прізвище",
  "fullName.middleName": "По-батькові"
};

//правило перетворень

const rules = {
  fullName: {
    surname: true,
    firstName: true,
    middleName: true
  }
};

const expectedResult = [
  { name: "Прізвище", value1: "xxx", value2: "XXX" },
  { name: "firstName", value1: "yyy", value2: "YYY" }
];

const ruleKey = Object.keys(rules);

//get an array of rules with 'true' value of property

function getActiveRules() {
  const rulesToProcess = Object.keys(rules[ruleKey]);
  return rulesToProcess.filter(rule => rules[ruleKey][rule]);
}

//create an array with draft objects with a 'name' property and a value from active rule 

function createDraft(rules) {
  let results = [];
  for (rule of rules) {
    let result = {
      name: rule
    };
    results.push(result);
  }
  return results;
}

//create a resulting array with objects without localizations

function processSource() {
  const activeRules = getActiveRules();
  let results = createDraft(activeRules);
  for (let i = 0, length = source.length; length > i; i++) {
    for (activeRule of activeRules) {
      for (let j = 0, length = results.length; length > j; j++) {
        if (results[j].name === activeRule) {
          results[j]["value" + (i + 1)] = source[i][ruleKey][activeRule];
        }
      }
    }
  }
  return results;
}

//create localizations

function translate(results) {
  for (let i = 0, length = results.length; length > i; i++) {
    if (localization[ruleKey + "." + results[i].name]) {
      results[i].name = localization[ruleKey + "." + results[i].name];
    }
  }
 }

const processedResult = processSource();

translate(processedResult);

console.log(processedResult);
