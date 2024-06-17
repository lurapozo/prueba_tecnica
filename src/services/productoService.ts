import { API_BASE_URL } from './config';

export const getProductosPaginacion = async (skip: number) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products?limit=10&skip=${skip}`);
        const data = await response.json();
        return data.products;
    } catch (error) {
        throw new Error('Error obteniendo los productos');
    }
};

export const getProductoDetalle = async (productId: number) => {
    try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        return await response.json();
    } catch (error) {
        throw new Error('Error en el get del producto');
    }
}
