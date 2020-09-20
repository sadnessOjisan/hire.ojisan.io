import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>求職エントリ</title>
          <meta property="og:title" content="求職エントリ" />
          <meta
            property="og:description"
            content="sadnessOjisanの求職エントリです。12月くらいからの仕事を探しています。Reactが得意です。"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
