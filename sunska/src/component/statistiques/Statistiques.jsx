import React, { useState } from 'react';
import Select from 'react-select';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const Statistiques = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedBar, setSelectedBar] = useState(null);
    const [statType, setStatType] = useState('product'); // 'product' or 'productBar'

    const products = ['Product 1', 'Product 2', 'Product 3']; // Replace with your actual data
    const bars = ['Bar 1', 'Bar 2', 'Bar 3']; // Replace with your actual data
    const salesData = {
        // Replace with your actual data
        // This is a nested object where the first key is the product and the second key is the bar
        'Product 1': { 'Bar 1': 10, 'Bar 2': 20, 'Bar 3': 30 },
        'Product 2': { 'Bar 1': 40, 'Bar 2': 50, 'Bar 3': 60 },
        'Product 3': { 'Bar 1': 70, 'Bar 2': 80, 'Bar 3': 90 },
    };

    const productOptions = products.map(product => ({ value: product, label: product }));
    const barOptions = bars.map(bar => ({ value: bar, label: bar }));

    const getSales = () => {
        if (statType === 'product') {
            return selectedProduct ? salesData[selectedProduct.value] : {};
        } else {
            return selectedProduct && selectedBar ? { [selectedBar.value]: salesData[selectedProduct.value][selectedBar.value] } : {};
        }
    };

    const exportToExcel = () => {
        const sales = getSales();
        const data = Object.entries(sales).map(([key, value]) => ({
            [statType === 'product' ? 'Bar' : 'Product']: key,
            Sales: value,
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

    return (
        <div className="p-4">
            <div className="mb-4">
                <Select
                    options={[
                        { value: 'product', label: 'Nb de vente par produits' },
                        { value: 'productBar', label: 'Nb de vente par produits et par bar' }
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
                    options={productOptions}
                    value={selectedProduct}
                    onChange={setSelectedProduct}
                    isClearable
                    placeholder="Choose a product..."
                />
            </div>
            {statType === 'productBar' && (
                <div className="mb-4">
                    <Select
                        options={barOptions}
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
                        <th className="px-4 py-2">{statType === 'product' ? 'Bar' : 'Product'}</th>
                        <th className="px-4 py-2">Sales</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.entries(getSales()).map(([key, value], index) => (
                        <tr key={key} className={index % 2 === 0 ? 'bg-tabvertbleu' : ''}>
                            <td className="border-t border-b px-4 py-2">{key}</td>
                            <td className="border-t border-b px-4 py-2">{value}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Statistiques;