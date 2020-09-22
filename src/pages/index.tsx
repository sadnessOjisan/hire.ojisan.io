import * as React from "react";
import { GetServerSideProps } from "next";
import router from "next/router";
import { ArticleWrapper } from "@sadness.ojisan/reghcss";
import langParser from "accept-language-parser";
import { ja } from "../assets/locale/ja";
import { en } from "../assets/locale/en";

type LangType = "JA" | "EN";

const LANG_SET: LangType[] = ["JA", "EN"];

interface IProps {
  langSetting: string;
}

export default (props: IProps) => {
  const [lang, setLang] = React.useState<LangType>("JA");
  React.useEffect(() => {
    const { langSetting }: { langSetting: string } = props;
    if (isLang(langSetting)) {
      setLang(langSetting);
    } else {
      setLang("JA");
    }
    // const hash = Math.random().toString(32).substring(2);
    // router.replace("/", `/${hash}`);
  }, []);
  return (
    <div style={{ padding: 12 }}>
      <div style={{ maxWidth: 760, margin: "auto" }}>
        {/* <div style={{ marginBottom: 12 }}>
          <span
            style={lang === "JA" ? selectedTipStyle : tipStyle}
            onClick={() => setLang("JA")}
          >
            日本語
          </span>
          <span style={{ margin: "0px 8px" }}>/</span>
          <span
            style={lang === "EN" ? selectedTipStyle : tipStyle}
            onClick={() => setLang("EN")}
          >
            English
          </span>
        </div> */}
        <ArticleWrapper html={lang === "JA" ? ja : ja}></ArticleWrapper>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  const lang = context.req.headers["accept-language"];
  if (typeof lang === "string") {
    const parsedLang = langParser.parse(lang);
    let langSetting = _langSet(parsedLang[0].code);
    return { props: { langSetting } };
  } else {
    return { props: { langSetting: "JA" } };
  }
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

const tipStyle = {
  padding: "4px 8px",
  borderRadius: 8,
  fontSize: 14,
  cursor: "pointer",
};

const selectedTipStyle = {
  ...tipStyle,
  background: "#eaf5ff",
  color: "#0366d6",
};
