import React, { memo, ReactNode, Suspense, useEffect, useState } from "react";
import Article from "./components/Article";
import Button from "./components/Button";
import Currencies from "./components/Currencies";
import ErrorBoundary from "./components/ErrorBoundary";
import Feed from "./components/List";
import Info from "./components/Info";
import { HorizontalSpacer, VerticalSpacer } from "./components/Spacer";
import StarButton from "./components/StarButton";
import Tabs from "./components/Tabs";
import Trade from "./components/Trade";
import { ArticleResource, InfoResource } from "./resources";
import { useResource } from "./utils/resource";
import { darkTheme, lightTheme, ThemeContext } from "./utils/Theme";
import styles from "./App.module.css";

export const BASE_URL =
  "https://my-json-server.typicode.com/dabbott/dashboard-json-server";

function ArticleFeed() {
  const articles = useResource<ArticleResource[]>(`${BASE_URL}/articles`);

  return (
    <Feed>
      {articles.map((article) => (
        <Article
          key={article.id}
          author={article.author}
          formattedDate={article.formattedDate}
          image={article.image}
          summary={article.summary}
          title={article.title}
          url={article.url}
        />
      ))}
    </Feed>
  );
}

function HeroInfo() {
  const info = useResource<InfoResource>(`${BASE_URL}/info/1`);

  return <Info title={info.title} content={info.content} links={info.links} />;
}

function HeroTrade() {
  const info = useResource<InfoResource>(`${BASE_URL}/info/1`);

  return <Trade price={info.price} title={"Trade"} />;
}

function Fallback({ children }: { children: ReactNode }) {
  return <div className="block">{children}</div>;
}

const Overview = memo(function Overview() {
  return (
    <>
      <Suspense fallback={<Fallback>Loading currency info</Fallback>}>
        <HeroInfo />
        <VerticalSpacer size={20} />
        <HeroTrade />
      </Suspense>
      <VerticalSpacer size={20} />
      <Suspense fallback={<Fallback>Loading currency list</Fallback>}>
        <Currencies />
      </Suspense>
      <VerticalSpacer size={20} />
      <Suspense fallback={<Fallback>Loading articles</Fallback>}>
        <ArticleFeed />
      </Suspense>
    </>
  );
});

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    document.body.className = theme.className;
  }, [theme]);

  return (
    <ErrorBoundary fallback={<span>Error!</span>}>
      <ThemeContext.Provider value={theme}>
        <main className={styles.content}>
          <div className="row">
            <h1>Bitcoin</h1>
            <HorizontalSpacer></HorizontalSpacer>
            <Button
              onClick={() => {
                setTheme(theme === lightTheme ? darkTheme : lightTheme);
              }}
            >
              Toggle theme
            </Button>
            <HorizontalSpacer size={20} />
            <StarButton
              activeTitle="Watch"
              inactiveTitle="Unwatch"
            ></StarButton>
          </div>
          <Tabs
            tabs={[
              { title: "Overview", content: <Overview /> },
              { title: "Prices", content: "Test content" },
              { title: "Vault", content: "Test content" },
            ]}
            selectedIndex={selectedIndex}
            onChangeSelectedIndex={setSelectedIndex}
          />
        </main>
      </ThemeContext.Provider>
    </ErrorBoundary>
  );
}
