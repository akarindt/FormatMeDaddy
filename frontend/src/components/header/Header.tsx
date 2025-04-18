import headerStyle from "./Header.module.css";

export default function Header() {
  return (
    <div className={headerStyle.main_header}>
      <div className={headerStyle.container}>
        <h1 className={headerStyle.title}>FormatMDD</h1>
      </div>
    </div>
  );
}
