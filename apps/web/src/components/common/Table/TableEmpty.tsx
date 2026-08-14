type TableEmptyProps = {
    message?: string;
};

export function TableEmpty({
    message = "No records found.",
}: TableEmptyProps) {
    return (
        <div className="py-10 text-center">
            <p className="text-sm text-gray-500">
                {message}
            </p>
        </div>
    );
}