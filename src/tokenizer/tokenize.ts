import { Token, TokenType } from '../types/jsimplint';
import { keywords } from './keywords';
import { operators } from './operators';

const regex = {
  space: / +/,
  identifier: /^([a-zA-Z_$][a-zA-Z0-9_$]*)$/,
  word: /([^a-zA-Z0-9_$"'`])/g,
  number: [
    /^([0-9]+)(.*)$/,         // decimal
    /^([0-9a-fA-F]+)(.*)$/,   // hex
    /^([0-7]+)(.*)$/,         // oct
  ],
  string: [
    /'([^\']|(\\\'))*'/,      // single quote
    /"([^\"]|(\\\"))*"/,      // double quote
  ],
  crlf: /\n|\r\n?/,
};

const matchers = [
  {
    match: (s: string): boolean => keywords.has(s),
    token: (s: string): Token => {
      switch (s) {
        case 'null': return { type: TokenType.NULL, value: null };
        case 'undefined': return { type: TokenType.UNDEFINED, value: undefined };
        case 'true': return { type: TokenType.BOOLEAN, value: true };
        case 'false': return { type: TokenType.BOOLEAN, value: false };
        default: return { type: TokenType.KEYWORD, value: s };
      };
    },
  },
  {
    match: (s: string): boolean => regex.identifier.test(s),
    token: (s: string): Token => ({
      type: TokenType.IDENTIFIER,
      value: s
    }),
  },
  {
    match: (s: string): boolean => regex.string.some(r => r.test(s)),
    token: (s: string): Token => ({
      type: TokenType.STRING,
      value: s.substr(1, s.length - 2),
    }),
  },
  {
    match: (s: string): boolean => regex.number.some(r => r.test(s)),
    token: (s: string): Token => ({
      type: TokenType.NUMERIC,
      value: Number(s),
    }),
  },
  {
    match: (s: string): boolean => !!operators[s],
    token: (s: string): Token => ({
      type: operators[s],
      value: s,
    }),
  },
  {
    match: (s: string): boolean => regex.space.test(s),
    token: (s: string): Token => ({
      type: TokenType.SPACE,
      value: s
    }),
  },
  {
    match: (s: string): boolean => regex.crlf.test(s),
    token: (s: string): Token => ({
      type: TokenType.ENDLINE,
      value: s
    }),
  },
];

const tokenize = (source: string): Token[] => {
  const lines = source.split(regex.crlf);
  const tokens: Token[] = [];
  lines
    .filter(Boolean) // discard empty lines
    .map((s: string) => s.trim())
    .forEach((line) => {
      line
        .split(regex.word)
        .filter(Boolean)
        .forEach(word => {
          const m = matchers.find(matcher => matcher.match(word));
          if (m) {
            tokens.push(m.token(word));
          }
        });
    });
  return tokens;
};

export default tokenize;