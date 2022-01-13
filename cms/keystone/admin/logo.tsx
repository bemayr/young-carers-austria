/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, H3 } from "@keystone-ui/core";
import Link from "next/link";
import Image from "next/image";

import logo from "../../assets/img/logo.png";

export function YoungCarersLogo() {
  return (
    <H3>
      <Link href="/" passHref>
        <a>
          <Image src={logo} />
        </a>
      </Link>
    </H3>
  );
}
