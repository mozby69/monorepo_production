type TableLoadingProps = {
    columns?: number;
    rows?: number;
};

export function TableLoading({
    columns = 5,
    rows = 5,
}: TableLoadingProps) {
    return (
        <div className="overflow-hidden rounded-md border border-gray-200">
            <table className="w-full">
                <tbody>
                    {Array.from({
                        length: rows,
                    }).map((_, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="border-b border-gray-100 last:border-0"
                        >
                            {Array.from({
                                length: columns,
                            }).map(
                                (_, columnIndex) => (
                                    <td
                                        key={columnIndex}
                                        className="px-4 py-4"
                                    >
                                        <div className="h-4 animate-pulse rounded bg-gray-200" />
                                    </td>
                                )
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}