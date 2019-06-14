export interface WordSet {
  first_word: string;
  second_word: string;
}

export interface WordChecker {
  word: string;
  is_palindrome: boolean;
}

export interface WordSetResponse {
  _id: string;
  words: WordChecker[];
}
