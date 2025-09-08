import styles from "./Spinner.module.scss";

export const Spinner = () => {
  return (
    <>
      <div className={styles['spinner']} aria-label="Loading">
        <div className={styles['doubleBounce1']} />
        <div className={styles['doubleBounce2']} />
      </div>
      <h2 className={styles["title"]}>Loading...</h2>
    </>
  );
};
