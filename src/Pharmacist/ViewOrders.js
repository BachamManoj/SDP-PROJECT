import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PharmacistDashboard from './PharmacistDashboard';

const ViewOrders = () => {
    const [orders, setOrders] = useState([]);
    const [orderPrices, setOrderPrices] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:9999/getAllOrders', { credentials: 'include' });
                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error('Unauthorized access. Please log in as a pharmacist.');
                    }
                    throw new Error('Failed to fetch orders.');
                }
                const data = await response.json();
                const filteredOrders = data.filter(order => order.accept === false);
                setOrders(filteredOrders);

                const prices = {};
                for (const order of filteredOrders) {
                    const priceResponse = await fetch(
                        `http://localhost:9999/getPriceOfOrder/${order.appointment.id}`,
                        { credentials: 'include' }
                    );
                    if (priceResponse.ok) {
                        const price = await priceResponse.json();
                        prices[order.id] = price;
                    } else {
                        prices[order.id] = 'Error';
                    }
                }
                setOrderPrices(prices);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const acceptOrder = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:9999/acceptOrder/${orderId}`, {
                method: 'POST',
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to accept order.');
            }
            setOrders(orders.map(order => 
                order.id === orderId ? { ...order, accept: true } : order
            ));
            alert('Order accepted successfully');
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return <div className="text-center"><div className="spinner-border text-primary" role="status"><span className="sr-only">Loading...</span></div></div>;
    }

    if (error) {
        return <p className="text-danger text-center">{error}</p>;
    }

    return (
        <div className="dashboard-container d-flex">
            <PharmacistDashboard />
            <div className="container" style={{ marginTop: 75 }}>
                <div className="alert alert-info text-center">
                    <h2>New Orders</h2>
                </div>
                {orders.length > 0 ? (
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <table className="table table-hover table-bordered table-striped">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>Price</th>
                                        <th>Order Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.appointment.patient.firstName}</td>
                                            <td>{order.address}</td>
                                            <td>
                                                {orderPrices[order.id] !== undefined
                                                    ? orderPrices[order.id] === 'Error'
                                                        ? 'Error fetching price'
                                                        : `₹${orderPrices[order.id].toFixed(2)}`
                                                    : 'Loading...'}
                                            </td>
                                            <td>{order.orderDate}</td>
                                            <td>
                                                <span
                                                    className={`badge ${
                                                        order.isPaid ? 'bg-success' : 'bg-warning'
                                                    }`}
                                                >
                                                    {order.isPaid ? 'Paid' : 'Pending'}
                                                </span>
                                            </td>
                                            <td>
                                                {!order.accept && (
                                                    <button
                                                        className="btn btn-success btn-sm"
                                                        onClick={() => acceptOrder(order.id)}
                                                    >
                                                        <i className="bi bi-check2-circle"></i> Accept
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <p className="text-center">No unaccepted orders available.</p>
                )}
            </div>
        </div>
    );
};

export default ViewOrders;
