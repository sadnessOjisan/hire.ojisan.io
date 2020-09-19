import * as React from "react";
import { ArticleWrapper } from "@sadness.ojisan/reghcss";
import { ja } from "../assets/locale/ja";
import { en } from "../assets/locale/en";

type LangType = "JA" | "EN";

export default () => {
  const [lang, setLang] = React.useState<LangType>("JA");
  const handleCangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    // TODO: あとで直す
    setLang(lang as LangType);
  };
  return (
    <div>
      <select onChange={handleCangeLang} value={lang}>
        <option>JA</option>
        <option>EN</option>
      </select>
      <div style={{ maxWidth: 760, margin: "auto" }}>
        <ArticleWrapper html={lang === "JA" ? ja : en}></ArticleWrapper>
      </div>
    </div>
  );
};
