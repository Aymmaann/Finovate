const RecentTransactions = ({ transactions }) => {
    return (
        <div className="overflow-x-auto mt-8">
        <table className="min-w-full table-auto">
            <thead>
            <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Amount</th>
            </tr>
            </thead>
            <tbody>
            {transactions.map((transaction, index) => (
                <tr key={index}>
                <td className="border px-4 py-2">{transaction.date}</td>
                <td className="border px-4 py-2">{transaction.category}</td>
                <td className="border px-4 py-2">{transaction.amount}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default RecentTransactions