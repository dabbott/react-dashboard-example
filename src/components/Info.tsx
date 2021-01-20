import React from "react";
import { LinkResource } from "../resources";
import { VerticalSpacer } from "./Spacer";
import styles from "./Info.module.css";
import Block from "./Block";

interface LinkProps {
  url: string;
  title: string;
}

function Link({ url, title }: LinkProps) {
  return (
    <li className={styles.listItem}>
      <a href={url}>{title}</a>
    </li>
  );
}

interface Props {
  title: string;
  content: string;
  links: LinkResource[];
}

export default function Info({ title, content, links }: Props) {
  return (
    <Block>
      <h2>{title}</h2>
      <VerticalSpacer size={20} />
      <p>{content}</p>
      <VerticalSpacer size={20} />
      <span className={styles.label}>Resources</span>
      <VerticalSpacer size={12} />
      <ul className={styles.list}>
        {links.map((link, index) => (
          <Link key={index} url={link.url} title={link.title} />
        ))}
      </ul>
    </Block>
  );
}
