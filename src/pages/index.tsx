import * as React from "react";
import { GetServerSideProps } from "next";
import { ArticleWrapper } from "@sadness.ojisan/reghcss";
import langParser from "accept-language-parser";
import { ja } from "../assets/locale/ja";
import { en } from "../assets/locale/en";

type LangType = "JA" | "EN";

const LANG_SET: LangType[] = ["JA", "EN"];

export default (props) => {
  const [lang, setLang] = React.useState<LangType>("JA");
  React.useEffect(() => {
    const { langSetting }: { langSetting: string } = props;
    if (isLang(langSetting)) {
      setLang(langSetting);
    } else {
      setLang("JA");
    }
  }, []);
  const handleCangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    if (isLang(lang)) {
      setLang(lang);
    } else {
      setLang("JA");
    }
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

export const getServerSideProps: GetServerSideProps = (context) => {
  const lang = context.req.headers["accept-language"];
  const parsedLang = langParser.parse(lang);
  let langSetting = _langSet(parsedLang[0].code);
  console.log(langSetting);
  return { props: { langSetting } };
};

const _langSet = (value: string): LangType => {
  switch (value) {
    case "ja":
      return "JA";
    default:
      return "EN";
  }
};

const isLang = (value: string): value is LangType => {
  // 検査対象なのでanyを使ってもよし
  return LANG_SET.includes(value as any);
};
