import Head from "next/head";
import Image from "next/image";
import { ReactElement } from "react";
import Logo from "@/assets/lbc-logo.webp";

export default function Layout({
    children,
}: {
    children: ReactElement;
}): ReactElement {
    const year = new Date().getFullYear();

    return (
        <div className="container">
            <Head>
                <title>Frontend Technical test - Leboncoin</title>
                <meta
                    name="description"
                    content="Frontend exercise for developpers who want to join us on leboncoin.fr"
                />
            </Head>

            <main className="main">
                <Image
                    src={Logo}
                    className="logo"
                    alt="Leboncoin Frontend Team"
                    width={400}
                    height={125}
                    priority
                />

                {children}
            </main>

            <footer className="footer">&copy; leboncoin - {year}</footer>
        </div>
    );
}
