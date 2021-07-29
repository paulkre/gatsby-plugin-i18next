module.exports = {
  presets: ["@babel/preset-react"],
  plugins: [
    [
      "i18next-extract",
      {
        locales: ["en", "de"],
        discardOldKeys: true,
        outputPath: "translations/{{locale}}/{{ns}}.json",
        defaultNS: "common",
      },
    ],
  ],
};
