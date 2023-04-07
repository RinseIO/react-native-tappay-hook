module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv'
    ],
    [
      'module-resolver',
      {
        alias: {
          // This needs to be mirrored in tsconfig.json
          '@tappay': './tappay',
          '@': './app',
          '@components': './app/components',
          '@containers': './app/containers',
          '@hooks': './app/hooks'
        },
      },
    ],
  ]
};
