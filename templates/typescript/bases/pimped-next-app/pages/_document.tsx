import { Html, Head, Main, NextScript } from "next/document";
import { resetServerContext } from "react-beautiful-dnd";

function Document() {
  resetServerContext();

  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
// Document.getInitialProps = async (ctx) => {
//   resetServerContext();

//   return { html: "" };
// };
export default Document;
