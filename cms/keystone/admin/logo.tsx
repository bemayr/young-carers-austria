/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, H3 } from "@keystone-ui/core";
import Link from "next/link";

export function YoungCarersLogo() {
  return (
    <H3>
      <Link href="/" passHref>
        <a>
          <img style={{width: "100%"}} src="https://bemayr.github.io/young-carers-austria/images/logo.png" alt="Young Carers Austria Logo"></img>
        </a>
      </Link>
    </H3>
  );
}
