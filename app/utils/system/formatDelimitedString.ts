export const formatDelimitedString = (input: string): string[] => {
  try {
    let delimiter: string;

    // Detect the delimiter based on the input string
    if (input.includes("\n")) {
      delimiter = "\n"; // Line delimited
    } else if (input.includes("\t")) {
      delimiter = "\t"; // Tab delimited
    } else if (input.includes(",")) {
      delimiter = ","; // Comma delimited
    }
    // Split the input string into an array based on the detected delimiter
    const formattedArray = input.split(delimiter);

    // Remove empty strings and null values from the array
    const nonEmptyArray = formattedArray.filter(
      (item) => item !== "" && item !== null
    );

    return nonEmptyArray;
  } catch (err) {
    console.log(err);
    return [];
  }
};
