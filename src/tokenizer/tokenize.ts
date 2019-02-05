import { Token, TokenType } from '../types/jsimplint';
import { keywords } from './keywords';
import { punctuators } from './punctuators';

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
  comment: (
    // single line | multiline
    /(\/\/.*)|(\/\*[^\*\/]*\*\/)/g
  ),
  crlf: /\n|\r\n?/,
};

const matchers = [
  {
    match: (s: string): boolean => !!keywords[s],
    token: (s: string): Token => {
      switch (s) {
        case 'null': return { type: TokenType.KEYWORD_NULL, value: null };
        case 'undefined': return { type: TokenType.KEYWORD_UNDEFINED, value: undefined };
        case 'true': return { type: TokenType.BOOLEAN, value: true };
        case 'false': return { type: TokenType.BOOLEAN, value: false };
        default: return { type: keywords[s], value: s };
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
    match: (s: string): boolean => !!punctuators[s],
    token: (s: string): Token => ({
      type: punctuators[s],
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

const tokenize = (
  source: string,
  excludeTokens: Set<TokenType> = new Set<TokenType>([TokenType.SPACE]),
): Token[] => {
  const tokens: Token[] = [];
  // remove comments and split by line breaks
  const lines = source.replace(regex.comment, '').split(regex.crlf);
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
            const token = m.token(word);
            if (!excludeTokens.has(token.type)) {
              tokens.push(m.token(word));
            }
          }
        });
    });

  // include comments
  (source.match(regex.comment) || []).forEach(match => {
    tokens.push({ type: TokenType.COMMENT, value: match });
  });
  return tokens;
};

export default tokenize;