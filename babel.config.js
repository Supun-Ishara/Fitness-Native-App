//module.exports = function (api) {
//  api.cache(true);
//  return {
//    presets: ['babel-preset-expo'],
//    plugins: [
//      // Required for expo-router
//      'expo-router/babel',
//      "nativewind/babel"
//    ],
//  };
//};

//module.exports = function (api) {
//  api.cache(true);
//  return {
//    presets: [
//      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
//      "nativewind/babel",
//    ],
//    plugins: [
//      // Required for expo-router
//      "expo-router/babel",
//      "react-native-reanimated/plugin",
//    ]
//  };
//};

//module.exports = function (api) {
//  api.cache(true);
//  return {
//    presets: [
//      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
//      'nativewind/babel',
//    ],
//    plugins: []
//  };
//};


module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};