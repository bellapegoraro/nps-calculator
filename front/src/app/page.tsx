import Form from "@/components/Form/Form";
import List from "@/components/List/List";

import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.principal}>
      <Form />
      <List />
    </div>
  );
}
