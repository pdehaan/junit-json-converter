import fs from "node:fs";
import fg from "fast-glob";
import { XMLParser } from "fast-xml-parser";

export function junitToJSON(xmlGlob, schema) {
  const testsuites = fg.globSync(xmlGlob).reduce((acc = [], file = "") => {
    const data = readXMLSync(file);
    data.testsuites.testsuite = data.testsuites.testsuite.map((suite) => {
      // Make sure `testcase[]` is always an array.
      if (!Array.isArray(suite.testcase)) {
        suite.testcase = [suite.testcase];
      }
      // Make sure `properties.property[]` is always an array.
      suite.testcase = suite.testcase.map((testcase) => {
        if (
          testcase.properties?.property &&
          !Array.isArray(testcase.properties.property)
        ) {
          testcase.properties.property = [testcase.properties.property];
        }
        return testcase;
      });
      return suite;
    });

    return acc.concat(data.testsuites);
  }, []);

  if (schema) {
    return schema.parse(testsuites);
  }
  return testsuites;
}

export function readXMLSync(file) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    ignoreDeclaration: true,
    attributeNamePrefix: "",
  });
  const xmlStr = fs.readFileSync(file, "utf-8");
  return parser.parse(xmlStr);
}
