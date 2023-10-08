export function removeSpecialCharacters(text) {
    const printableAsciiRegex = /[\x20-\x7E]+/g;
    const printableAsciiMatches = text.match(printableAsciiRegex);
    const cleanedText = printableAsciiMatches ? printableAsciiMatches.join(" ") : "";
    return cleanedText;
}