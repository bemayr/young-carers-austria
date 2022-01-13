// admin/config.tsx
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@keystone-ui/core';
import Image from 'next/image';

import logo from '../../assets/img/logo.png';

function CustomLogo () {
    return <Image src={logo}></Image>
    return <h3 css={{
        background: 'papayawhip'
    }}>Custom Logo here</h3>
}

export const components = {
    Logo: CustomLogo
}
