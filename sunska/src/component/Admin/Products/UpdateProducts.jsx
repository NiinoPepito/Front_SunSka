import React, { useState, useEffect } from 'react';

const UpdateProduct = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        capacity: '',
        unit: '',
        unitCaisse: '',
    });

    // Simulate fetching product list
    useEffect(() => {
        const fetchProducts = () => {
            // Simulated product list
            const productList = [
                { id: 1, name: 'Product 1', capacity: 100, unit: 'kg', unitCaisse: 'box' },
                { id: 2, name: 'Product 2', capacity: 200, unit: 'liters', unitCaisse: 'crate' },
                // Add more products as needed
            ];
            setProducts(productList);
        };
        fetchProducts();
    }, []);

    const handleProductChange = (e) => {
        const productId = e.target.value;
        setSelectedProduct(productId);
        const product = products.find((p) => p.id.toString() === productId);
        if (product) {
            setFormData({
                name: product.name,
                capacity: product.capacity,
                unit: product.unit,
                unitCaisse: product.unitCaisse,
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Updated product details: ${JSON.stringify(formData)}`);
        // You can add further actions here (e.g., API call to update the product)
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productSelect">
                    Choisir votre produit
                </label>
                <select
                    id="productSelect"
                    name="productSelect"
                    value={selectedProduct}
                    onChange={handleProductChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                >
                    <option value="" disabled>Select a product</option>
                    {products.map((product) => (
                        <option key={product.id} value={product.id}>
                            {product.name}
                        </option>
                    ))}
                </select>
            </div>
            {selectedProduct && (
                <>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Nom
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="capacity">
                            Capacité
                        </label>
                        <input
                            type="number"
                            id="capacity"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unit">
                            Unité
                        </label>
                        <input
                            type="text"
                            id="unit"
                            name="unit"
                            value={formData.unit}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unitCaisse">
                            Nombre de palettes
                        </label>
                        <input
                            type="text"
                            id="unitCaisse"
                            name="unitCaisse"
                            value={formData.unitCaisse}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </>
            )}
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-customGreen hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Modifier
                </button>
            </div>
        </form>
    );
};

export default UpdateProduct;
