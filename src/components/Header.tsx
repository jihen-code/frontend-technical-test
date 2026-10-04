import Link from "next/link";

export default function Header({
    title,
    subtitle,
    participant,
    hasBackButton,
}: {
    title: string;
    subtitle: string;
    participant?: string;
    hasBackButton?: boolean;
}) {
    return (
        <div className="header">
            {hasBackButton && (
                <Link href="/conversations" className="backButton">
                    ←
                </Link>
            )}

            {participant && (
                <span className="avatar">
                    {participant.charAt(0).toUpperCase()}
                </span>
            )}

            <div>
                <h1 className="title">{title}</h1>
                <h2 className="subTitle">{subtitle}</h2>
            </div>
        </div>
    );
}
