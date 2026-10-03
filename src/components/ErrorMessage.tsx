export default function ErrorMessage({
    error,
    description,
}: {
    error: string;
    description: string;
}) {
    return (
        <div className="error">
            <p>{error}</p>
            <span>{description}</span>
        </div>
    );
}
