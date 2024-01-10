export const formatDelimitedString = (input: string): string[] => {
  let delimiter: string;

  // Detect the delimiter based on the input string
  if (input.includes("\n")) {
    delimiter = "\n"; // Line delimited
  } else if (input.includes("\t")) {
    delimiter = "\t"; // Tab delimited
  } else if (input.includes(",")) {
    delimiter = ","; // Comma delimited
  } else {
    throw new Error("Invalid input: Unable to detect delimiter");
  }

  // Split the input string into an array based on the detected delimiter
  const formattedArray = input.split(delimiter);

  return formattedArray;
};
