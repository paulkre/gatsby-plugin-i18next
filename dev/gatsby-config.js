module.exports = {
  siteMetadata: {
    title: "Gatsby Dev App",
  },
  plugins: [
    {
      resolve: require.resolve(".."),
      options: {
        translationJsonSourceName: "translations",
        defaultNS: "common",
        languages: ["en", "de"],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "data", path: `${__dirname}/data` },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "translations", path: `${__dirname}/translations` },
    },
  ],
};
