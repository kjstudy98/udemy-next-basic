import Link from "next/link";
import ClientComponent from "../_components/ClientComponent";

export default function ServerComponent() {
  console.log("Server");
  return (
    <div>
      ServerComponent
      <ClientComponent />
      <Link href={"/about"}>About</Link>
    </div>
  );
}
