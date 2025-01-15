import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: ['src/**/*.graphql'],
  generates: {
    './src/__generated__/graphql.ts': {
      // preset: 'client',
      // presetConfig: {
      //   gqlTagName: 'gql',
      // },
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
      },
    },
  },

  ignoreNoDocuments: true,
};

export default config;
