import XXH from 'xxhashjs';

export const hashText = (sentence: string, seed = 0) => XXH.h32(sentence, seed).toString(16)