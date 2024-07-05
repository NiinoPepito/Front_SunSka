import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const Statistiques = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedBar, setSelectedBar] = useState(null);
    const [statType, setStatType] = useState('product'); // 'product' or 'productBar'
    const [products, setProducts] = useState([]);
    const [bars, setBars] = useState([]);
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch products
                const productResponse = await fetch('http://localhost:8080/products');
                if (!productResponse.ok) {
                    throw new Error('Failed to fetch products');
                }
                const productsData = await productResponse.json();
                const fetchedProducts = productsData.map(product => ({ value: product.id, label: product.name }));
                setProducts(fetchedProducts);

                // Fetch bars (hardcoded for 2024)
                const barResponse = await fetch('http://localhost:8080/buildings/2024/bars');
                if (!barResponse.ok) {
                    throw new Error('Failed to fetch bars');
                }
                const barsData = await barResponse.json();
                const fetchedBars = barsData.map(bar => ({ value: bar.id, label: bar.barName }));
                setBars(fetchedBars);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchSales = async () => {
            if (selectedProduct) {
                try {
                    setLoading(true);
                    const salesResponse = await fetch(`http://localhost:8080/orders/sales/product/${selectedProduct.value}`);
                    if (!salesResponse.ok) {
                        throw new Error('Failed to fetch sales data');
                    }
                    const salesData = await salesResponse.json();
                    setSales([salesData]); // Wrap the salesData in an array
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            } else {
                setSales([]);
            }
        };
        fetchSales();
    }, [selectedProduct]);

    const exportToExcel = () => {
        const data = sales[0]?.sales.map(sale => ({
            Bar: sale.barName,
            Sales: sale.quantity,
        }));
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales Data');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, 'sales_data.xlsx');
    };

    const showExportButton = () => {
        if (statType === 'product') {
            return selectedProduct !== null;
        } else {
            return selectedProduct !== null && selectedBar !== null;
        }
    };

    const showTable = showExportButton();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Statistiques</h1>
            <div className="mb-4">
                <Select
                    options={[
                        {value: 'product', label: 'Nb de vente par produits'},
                        {value: 'productBar', label: 'Nb de vente par produits et par bar'}
                    ]}
                    value={{
                        value: statType,
                        label: statType === 'product' ? 'Nb de vente par produits' : 'Nb de vente par produits et par bar'
                    }}
                    onChange={(e) => setStatType(e.value)}
                />
            </div>
            <div className="mb-4">
                <Select
                    options={products}
                    value={selectedProduct}
                    onChange={setSelectedProduct}
                    isClearable
                    placeholder="Choose a product..."
                />
            </div>
            {statType === 'productBar' && (
                <div className="mb-4">
                    <Select
                        options={bars}
                        value={selectedBar}
                        onChange={setSelectedBar}
                        isClearable
                        placeholder="Choose a bar..."
                    />
                </div>
            )}
            {showExportButton() && (
                <div className="flex justify-end mb-4">
                    <button className="bg-orange text-white font-bold py-2 px-4 rounded" onClick={exportToExcel}>
                        Export to Excel
                    </button>
                </div>
            )}
            {showTable && (
                <table className="w-full mb-4">
                    <thead>
                    <tr>
                        <th className="px-4 py-2">Bar</th>
                        <th className="px-4 py-2">Sales</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sales[0]?.sales.map((sale, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{sale.barName}</td>
                            <td className="border px-4 py-2">{sale.quantity}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Statistiques;