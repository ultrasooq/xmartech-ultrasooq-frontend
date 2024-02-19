import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";
import env from "../env";
const APP_DESCRIPTION = "";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle";

export default class extends Document {
  static async getInitialProps(ctx) {
    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head nonce="puremoon4321">
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta httpEquiv="Pragma" content="no-cache" />
          <meta httpEquiv="Expires" content="-1" />
          <meta name="application-name" content={env.APP_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content={env.APP_NAME} />
          <meta name="description" content={APP_DESCRIPTION} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#FFFFFF" />

          {/* <link rel="preconnect" href={env.API_URI} /> */}
          <link rel="preconnect" href="https://fonts.gstatic.com" />

          {env.FAVICON === "" ? (
            <>
              <link
                rel="shortcut icon"
                href="/favicon.ico"
                type="image/x-icon"
              />

              <link
                rel="apple-touch-icon-precomposed"
                type="image/x-icon"
                sizes="57x57"
                href="/images/favicon/apple-touch-icon-57x57.png"
              />
              <link
                rel="apple-touch-icon-precomposed"
                type="image/x-icon"
                sizes="114x114"
                href="/images/favicon/apple-touch-icon-114x114.png"
              />
              <link
                rel="apple-touch-icon-precomposed"
                type="image/x-icon"
                sizes="72x72"
                href="/images/favicon/apple-touch-icon-72x72.png"
              />
              <link
                rel="apple-touch-icon-precomposed"
                type="image/x-icon"
                sizes="144x144"
                href="/images/favicon/apple-touch-icon-144x144.png"
              />
              <link
                rel="apple-touch-icon-precomposed"
                type="image/x-icon"
                sizes="60x60"
                href="/images/favicon/apple-touch-icon-60x60.png"
              />
              <link
                rel="apple-touch-icon-precomposed"
                type="image/x-icon"
                sizes="120x120"
                href="/images/favicon/apple-touch-icon-120x120.png"
              />
              <link
                rel="apple-touch-icon-precomposed"
                type="image/x-icon"
                sizes="76x76"
                href="/images/favicon/apple-touch-icon-76x76.png"
              />
              <link
                rel="apple-touch-icon-precomposed"
                type="image/x-icon"
                sizes="152x152"
                href="/images/favicon/apple-touch-icon-152x152.png"
              />

              <link
                rel="icon"
                type="image/png"
                href="/images/favicon/favicon-196x196.png"
                sizes="196x196"
              />
              <link
                rel="icon"
                type="image/png"
                href="/images/favicon/favicon-96x96.png"
                sizes="96x96"
              />
              <link
                rel="icon"
                type="image/png"
                href="/images/favicon/favicon-32x32.png"
                sizes="32x32"
              />
              <link
                rel="icon"
                type="image/png"
                href="/images/favicon/favicon-16x16.png"
                sizes="16x16"
              />
              <link
                rel="icon"
                type="image/png"
                href="/images/favicon/favicon-128.png"
                sizes="128x128"
              />

              <link rel="manifest" href="/manifest.json" />
            </>
          ) : (
            <>
              <link
                rel="shortcut icon"
                href={env.FAVICON}
                type="image/x-icon"
              />
              <link rel="icon" type="image/x-icon" href={env.FAVICON} />
            </>
          )}
          {/* Google fonts */}
          <link
            async={true}
            href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;600;700&family=Open+Sans+Condensed:wght@300;700&display=swap"
            rel="stylesheet"
          />
          <link
            async={true}
            href="//cdn.jsdelivr.net/npm/featherlight@1.7.14/release/featherlight.min.css"
            type="text/css"
            rel="stylesheet"
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${env.GOOGLE_ANALYTICS_KEY}`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: ` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${env.GOOGLE_ANALYTICS_KEY}');`,
            }}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: ` !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="${env.SEGMENT_WRITE_KEY}";;analytics.SNIPPET_VERSION="4.15.3";
  analytics.page();
  }}();`,
            }}
          ></script>


          <link rel="stylesheet" href="owl-carousel/owl.theme.css" />

          
        </Head>
        <body className="font-body_text">
          <Main />
          <NextScript nonce="puremoon4321" />
          {/* External Scripts */}
          {/* <script type="text/javascript" src="/js/jquery-3.5.1.min.js" /> */}
          {/* <script type="text/javascript" src="/js/bootstrap.bundle.js" /> */}
          <script src="https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js" />
          <script async src="https://static.addtoany.com/menu/page.js" />
          <script
            defer
            async
            src="//cdn.jsdelivr.net/npm/featherlight@1.7.14/release/featherlight.min.js"
            type="text/javascript"
            charSet="utf-8" />
          {/* <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" /> */}
        </body>
      </Html>
    );
  }
}
