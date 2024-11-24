import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminTransactionHistory.css'; // Example using AdminTransactionHistory.css

const AdminTransactionHistory = () => {
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/payment-history');
                setPaymentHistory(response.data);
            } catch (err) {
                setError('Error fetching payment history');
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentHistory();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Payment History</h2>
            {paymentHistory.length === 0 ? (
                <p>No payment history found</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentHistory.map((payment) => (
                            <tr key={payment._id}>
                                <td>{payment.orderId}</td>
                                <td>{payment.transactionId}</td>
                                <td>{payment.amount}</td>
                                <td>{payment.status}</td>
                                <td>{payment.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminTransactionHistory;
