module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    'sort-imports': ['error', {
      'ignoreCase': true,
      'ignoreDeclarationSort': false,
      'ignoreMemberSort': false,
      'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
      'allowSeparatedGroups': true
    }],
    '@typescript-eslint/no-unused-vars': ['error', {
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_',
      'ignoreRestSiblings': true
    }],
    '@typescript-eslint/array-type': ['error', {
      'default': 'array'
    }],
    'react-hooks/exhaustive-deps': 'warn'
  }
}; 