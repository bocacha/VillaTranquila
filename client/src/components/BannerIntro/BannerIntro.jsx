import React from "react";
import styles from "./BannerIntro.module.css";

export default function BannerIntro() {
  return (
    <div className={styles.container}>
      <div className={styles.txt}>
        <p className={styles.p}>
          Villa tranquila Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Hic corrupti maiores eveniet quidem soluta pariatur in, ex
          aliquam dignissimos suscipit at labore facere quisquam, corporis,
          ducimus nobis odit explicabo delectus!
        </p>
      </div>
    </div>
  );
}
