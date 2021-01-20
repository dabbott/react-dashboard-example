import React from "react";
import { HorizontalSpacer, VerticalSpacer } from "./Spacer";
import styles from "./Article.module.css";

interface Props {
  title: string;
  author: string;
  formattedDate: string;
  summary: string;
  url: string;
  image: string;
}

export default function Article({
  title,
  summary,
  author,
  formattedDate,
  url,
  image
}: Props) {
  return (
    <a className="row" href={url}>
      <div className="column">
        <h3>{title}</h3>
        <VerticalSpacer size={8} />
        <p>{summary}</p>
        <VerticalSpacer size={8} />
        <p className="row">
          {author}
          <HorizontalSpacer size={24} />
          {formattedDate}
        </p>
      </div>
      {image && (
        <>
          <HorizontalSpacer size={32} />
          <HorizontalSpacer />
          <img alt="" className={styles.thumbnail} src={image} />
        </>
      )}
    </a>
  );
}
