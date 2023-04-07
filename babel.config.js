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
          '@tappay/fp': './tappay/fp',
          '@tappay/hooks': './tappay/hooks',
          '@tappay/components': './tappay/components',
          '@tappay/images': './tappay/images',
          '@': './app',
          '@components': './app/components',
          '@containers': './app/containers',
          '@hooks': './app/hooks'
        },
      },
    ],
  ]
};
