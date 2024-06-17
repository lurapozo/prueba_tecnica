import { useEffect, useState } from 'react';
import { getProductoDetalle } from '../services/productoService';


const useProductoDetalles = (productId: number) => {
    const [product, setProduct] = useState<Producto | null>(null);

    useEffect(() => {
        const fetchProductoDetalles = async () => {
            try {
                const data = await getProductoDetalle(productId);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductoDetalles();
    }, [productId]);

    return { product };
};

export default useProductoDetalles;
