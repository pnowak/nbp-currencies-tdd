module.exports = {
  mode: "development",
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node-modules/,
      loader: "babel-loader"
    },
    {
      test: /\.scss$/,
      use: [
        {
          loader: "style-loader",
        },
        {
          loader: "css-loader",
        },
        {
          loader: "sass-loader",
        },
      ],
    },]
  }
}