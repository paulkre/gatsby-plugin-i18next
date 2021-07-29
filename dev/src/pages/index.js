import * as React from "react";
import { graphql, Link } from "gatsby";
import { useTranslation } from "react-i18next";

import { I18nextProvider, useI18nextContext } from "../../../lib";

export const query = graphql`
  query ($language: String!) {
    translation: allTranslation(
      filter: { language: { eq: $language }, ns: { in: ["common", "page1"] } }
    ) {
      nodes {
        data
        ns
        language
      }
    }
  }
`;

function Content() {
  const { t } = useTranslation();
  const { languages, defaultLanguage } = useI18nextContext();

  return (
    <>
      <p>{t("hello_world")}</p>
      <p>{t("page1:message")}</p>
      <ul>
        {languages.map((lang, i) => (
          <li key={i}>
            <Link to={`/${lang !== defaultLanguage ? lang : ""}`}>{lang}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

const Page = ({ data }) => {
  return (
    <I18nextProvider nodes={data?.translation.nodes}>
      <Content />
    </I18nextProvider>
  );
};

export default Page;
