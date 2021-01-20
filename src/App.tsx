import React, { memo, ReactNode, Suspense, useEffect, useState } from "react";
import Article from "./components/Article";
import Button from "./components/Button";
import ErrorBoundary from "./components/ErrorBoundary";
import List from "./components/List";
import Info from "./components/Info";
import { HorizontalSpacer, VerticalSpacer } from "./components/Spacer";
import StarButton from "./components/StarButton";
import Tabs from "./components/Tabs";
import Trade from "./components/Trade";
import { ArticleResource, InfoResource } from "./resources";
import { useResource } from "./utils/resource";
import { darkTheme, lightTheme, ThemeContext } from "./utils/Theme";
import styles from "./App.module.css";
import * as api from "./api";
import Block from "./components/Block";

function ArticleList() {
  const articles = useResource<ArticleResource[]>(api.articles());

  return (
    <List>
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
    </List>
  );
}

function HeroInfo() {
  const info = useResource<InfoResource>(api.info(1));

  return <Info title={info.title} content={info.content} links={info.links} />;
}

function HeroTrade() {
  const info = useResource<InfoResource>(api.info(1));

  return <Trade price={info.price} title={"Trade"} />;
}

function Fallback({ children }: { children: ReactNode }) {
  return <Block>{children}</Block>;
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
      <VerticalSpacer size={20} />
      <Suspense fallback={<Fallback>Loading articles</Fallback>}>
        <ArticleList />
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
        <main className={styles.container}>
          <header className={styles.header}>
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
            <StarButton activeTitle="Watch" inactiveTitle="Unwatch" />
          </header>
          <Tabs
            tabs={[
              { title: "Overview", content: <Overview /> },
              { title: "Wallet", content: "Test content" },
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
