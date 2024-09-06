"use client"

import { Card, CardBody } from '@nextui-org/react';
import React from 'react'
import { type IProduct } from '~/type/product';
import TransactionsLine from '../_components/dashboard/transactions/transactionsLine';
import PieArcLabel from '../_components/dashboard/transactions/transactions.pie';
import styles from "../_components/dashboard/dashboard.module.css";
import Cards from '../_components/dashboard/cards/cards';
import { type IOrder } from '~/type/order';
import { type ICustomer } from '~/type/customer';

type Props = {
    products: Promise<IProduct[]>;
    orders: Promise<IOrder[]>;
    customers: Promise<ICustomer[]>;
};

const ViewDashboard: React.FC<Props> = (props: Props) => {
    const [dataProduct, setDataProduct] = React.useState<IProduct[]>([]);
    const [dataOrder, setDataOrder] = React.useState<IOrder[]>([]);
    const [dataCustomer, setDataCustomer] = React.useState<ICustomer[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [stock, setStock] = React.useState('');
    const [revenue, setRevenue] = React.useState('');

    const handleDataDashboard = async () => {
        setLoading(true);
        try {
            const initProducts = await props.products;
            const initOrders = await props.orders;
            const initCustomers = await props.customers;

            setDataProduct(initProducts);
            setDataOrder(initOrders);
            setDataCustomer(initCustomers);

            // Menghitung total stock
            let totalStock = 0;
            initProducts.forEach((v) => {
                totalStock += v.stock;
            });
            setStock(totalStock.toString());

            // Menghitung total pendapatan (revenue)
            let totalRevenue = 0;
            initOrders.forEach((v) => {
                totalRevenue += v.totBuy;
            });
            setRevenue(totalRevenue.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }));
        } catch (error) {
            console.error("Failed to load data:", error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        void handleDataDashboard();
    }, []); // Empty dependency array to run only once when the component mounts

    const cardsHeaderDash = [
        {
            id: 1,
            title: "Total Users",
            number: dataCustomer.length,
        },
        {
            id: 2,
            title: "Stock",
            number: stock,
        },
        {
            id: 3,
            title: "Revenue",
            number: revenue,
        },
    ];

    if (!loading) {
        <div>
            Loading
        </div>
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="grid w-full grid-cols-3 flex-wrap gap-x-4 sm:flex-wrap">
                {cardsHeaderDash.map((item) => (
                    <Cards item={item} key={item.id} />
                ))}
            </div>
            <div className="grid w-full grid-cols-2 flex-wrap gap-x-4 sm:flex-wrap">
                <Card className="px-1 py-1">
                    <CardBody className="overflow-visible py-2">
                        <div className={styles.container}>
                            <PieArcLabel products={dataProduct} />
                        </div>
                    </CardBody>
                </Card>
                <Card className="px-1 py-1">
                    <CardBody className="overflow-visible py-2">
                        <div className={styles.container}>
                            <TransactionsLine orders={dataOrder} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default ViewDashboard;