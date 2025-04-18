import Form from "@components/form/Form";
import Header from "@components/header/Header";
import mainStyle from "@styles/Main.module.css";

export default function Home() {
  return (
    <div className={mainStyle.container}>
      <Header />
      <div className={mainStyle.content}>
        <Form />
      </div>
    </div>
  );
}
