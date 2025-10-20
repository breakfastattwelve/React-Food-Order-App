import { useContext } from "react";
import Modal from "./UI/Modal.jsx";
import { OrderHistoryContext } from "./store/OrderHistoryContext.jsx";
import UserProgressContext from "./store/UserProgressContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Button from "./UI/Button.jsx";

function OrderHistory() {
    const orderHistoryCtx = useContext(OrderHistoryContext);
    const userProgressCtx = useContext(UserProgressContext);

    const isOpen = userProgressCtx.progress === "orderHistory";

    function handleClose() {
        userProgressCtx.hideOrderHistory();
    }

    
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    return (
        <Modal open={isOpen} onClose={handleClose}>
            <div className="cart">
                <h2>ประวัติการสั่งซื้อ</h2>
                
                {orderHistoryCtx.orders.length === 0 && (
                    <p>ยังไม่มีประวัติการสั่งซื้อ</p>
                )}

                {orderHistoryCtx.orders.length > 0 && (
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {orderHistoryCtx.orders.map((order) => {
                            const orderTotal = order.items.reduce(
                                (total, item) => total + item.price * item.quantity,
                                0
                            );

                            return (
                                <div key={order.id} style={{
                                    marginBottom: '24px',
                                    paddingBottom: '24px',
                                    borderBottom: '1px solid #ccc'
                                }}>
                                    <p style={{ 
                                        fontSize: '0.9rem', 
                                        color: '#a4a4a4',
                                        marginBottom: '8px'
                                    }}>
                                        {formatDate(order.date)}
                                    </p>
                                    
                                    <div style={{ marginBottom: '12px' }}>
                                        <h3 style={{ fontSize: '1rem', marginBottom: '4px' }}>
                                            ข้อมูลผู้สั่ง
                                        </h3>
                                        <p style={{ fontSize: '0.9rem', marginBottom: '2px' }}>
                                            <strong>ชื่อ:</strong> {order.customer.name}
                                        </p>
                                        <p style={{ fontSize: '0.9rem', marginBottom: '2px' }}>
                                            <strong>อีเมล:</strong> {order.customer.email}
                                        </p>
                                        <p style={{ fontSize: '0.9rem', marginBottom: '2px' }}>
                                            <strong>ที่อยู่:</strong> {order.customer.street}, {order.customer.city} {order.customer['postal-code']}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 style={{ fontSize: '1rem', marginBottom: '8px' }}>
                                            รายการอาหาร
                                        </h3>
                                        <ul style={{ listStyle: 'none', padding: 0 }}>
                                            {order.items.map((item) => (
                                                <li key={item.id} style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    marginBottom: '8px',
                                                    fontSize: '0.9rem'
                                                }}>
                                                    <span>
                                                        {item.name} x {item.quantity}
                                                    </span>
                                                    <span>
                                                        {currencyFormatter.format(item.price * item.quantity)}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <p style={{
                                        textAlign: 'right',
                                        fontSize: '1.1rem',
                                        fontWeight: 'bold',
                                        marginTop: '12px',
                                        color: '#000000'
                                    }}>
                                        รวมทั้งหมด: {currencyFormatter.format(orderTotal)}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                )}

                <p className="modal-actions">
                    <Button onClick={handleClose}>ปิด</Button>
                </p>
            </div>
        </Modal>
    );
}

export default OrderHistory;

