import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const Statistiques = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedBar, setSelectedBar] = useState(null);
    const [statType, setStatType] = useState('product'); // 'product' or 'productBar' or 'category'
    const [products, setProducts] = useState([]);
    const [bars, setBars] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
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

                // Fetch categories
                const categoriesResponse = await fetch('http://localhost:8080/product-category');
                if (!categoriesResponse.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const categoriesData = await categoriesResponse.json();
                const fetchedCategories = categoriesData.map(category => ({ value: category.id, label: category.name }));
                setCategories(fetchedCategories);
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
            if (statType === 'product' && selectedProduct) {
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
            } else if (statType === 'category' && selectedCategory) {
                try {
                    setLoading(true);
                    const salesResponse = await fetch(`http://localhost:8080/orders/sales/category/${selectedCategory.value}`);
                    if (!salesResponse.ok) {
                        throw new Error('Failed to fetch sales data');
                    }
                    const salesData = await salesResponse.json();
                    setSales(salesData);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            } else {
                setSales([]); // Clear the sales data when statType is changed to "product"
            }
        };
        fetchSales();
    }, [selectedProduct, selectedCategory, statType]);

    const exportToExcel = () => {
        let data;
        if (statType === 'product') {
            data = sales[0]?.sales.map(sale => ({
                Bar: sale.barName,
                Sales: sale.quantity,
            }));
        } else if (statType === 'category') {
            data = sales.map(sale => ({
                Product: sale.nameProduct,
                Sales: sale.qtt,
                OrderID: sale.orderId,
            }));
        }
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
        // } else if (statType === 'productBar') {
        //     return selectedProduct !== null && selectedBar !== null;
        } else if (statType === 'category') {
            return selectedCategory !== null;
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
                        // {value: 'productBar', label: 'Nb de vente par produits et par bar'},
                        {value: 'category', label: 'Nb de vente par catégories'}
                    ]}
                    value={{
                        value: statType,
                        label: statType === 'product' ? 'Nb de vente par produits' : statType === 'productBar' ? 'Nb de vente par produits et par bar' : 'Nb de vente par catégories'
                    }}
                    onChange={(e) => setStatType(e.value)}
                />
            </div>
            {statType === 'product' && (
                <div className="mb-4">
                    <Select
                        options={products}
                        value={selectedProduct}
                        onChange={setSelectedProduct}
                        isClearable
                        placeholder="Choose a product..."
                    />
                </div>
            )}
            {/*{statType === 'productBar' && (*/}
            {/*    <>*/}
            {/*        <div className="mb-4">*/}
            {/*            <Select*/}
            {/*                options={products}*/}
            {/*                value={selectedProduct}*/}
            {/*                onChange={setSelectedProduct}*/}
            {/*                isClearable*/}
            {/*                placeholder="Choose a product..."*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div className="mb-4">*/}
            {/*            <Select*/}
            {/*                options={bars}*/}
            {/*                value={selectedBar}*/}
            {/*                onChange={setSelectedBar}*/}
            {/*                isClearable*/}
            {/*                placeholder="Choose a bar..."*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*    </>*/}
            {/*)}*/}
            {statType === 'category' && (
                <div className="mb-4">
                    <Select
                        options={categories}
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        isClearable
                        placeholder="Choose a category..."
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
                        {statType === 'product' && <th className="px-4 py-2">Bar</th>}
                        {statType === 'category' && <th className="px-4 py-2">Produit</th>}
                        <th className="px-4 py-2">Nombre de ventes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {statType === 'product' && Array.isArray(sales[0]?.sales) && sales[0].sales.map((sale, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-tabvertbleu' : ''}>
                            <td className="border px-4 py-2">{sale.barName}</td>
                            <td className="border px-4 py-2">{sale.quantity}</td>
                        </tr>
                    ))}
                    {statType === 'category' && Array.isArray(sales) && sales.map((sale, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-tabvertbleu' : ''}>
                            <td className="border px-4 py-2">{sale.nameProduct}</td>
                            <td className="border px-4 py-2">{sale.qtt}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Statistiques;