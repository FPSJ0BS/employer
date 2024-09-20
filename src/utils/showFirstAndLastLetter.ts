export function showFirstAndLastLetter(name:string) {
 if (name.length === 0) {
   return "Name is empty!";
 } else if (name.length < 2) {
   return `${name}`;
 } else {
   var firstTwoLetters = name.substring(0, 2); // Get the substring containing the first two letters
   return `${firstTwoLetters}........`;
 }
}
