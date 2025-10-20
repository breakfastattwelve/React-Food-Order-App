import { createContext, useEffect, useState } from "react";

// 1. สร้าง Context สำหรับประวัติการสั่งซื้อ
export const OrderHistoryContext = createContext({
    orders: [],
    addOrder: (order) => {}
});

// 2. สร้าง Provider Component
export function OrderHistoryContextProvider({ children }) {
    // โหลดค่าจาก localStorage ครั้งแรก
    const [orders, setOrders] = useState(() => {
        try {
            const stored = localStorage.getItem('order-history');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    // บันทึกลง localStorage เมื่อ orders เปลี่ยน
    useEffect(() => {
        try {
            localStorage.setItem('order-history', JSON.stringify(orders));
        } catch {}
    }, [orders]);

    // ฟังก์ชันเพิ่มประวัติการสั่งซื้อ
    function addOrder(orderData) {
        setOrders((prevOrders) => {
            const newOrder = {
                id: Math.random().toString() + Date.now(),
                date: new Date().toISOString(),
                ...orderData
            };
            return [newOrder, ...prevOrders]; // เรียงใหม่ล่าสุดไว้ข้างบน
        });
    }

    const orderHistoryCtx = {
        orders: orders,
        addOrder: addOrder
    };

    return (
        <OrderHistoryContext.Provider value={orderHistoryCtx}>
            {children}
        </OrderHistoryContext.Provider>
    );
}

