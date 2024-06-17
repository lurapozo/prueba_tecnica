import { useState, useEffect, useRef } from 'react';
import {Alert, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes.ts';
import { getProductosPaginacion } from '../services/productoService.ts';

type ProductoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Productos'>;

interface Props {
    skip: number;
    incrementPage: () => void;
    decrementPage: () => void;
}

const useProductos = ({ skip, incrementPage, decrementPage }: Props) => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const navigation = useNavigation<ProductoScreenNavigationProp>();
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        fetchProductos(skip);
    }, [skip]);

    const fetchProductos = async (skip: number) => {
        try {
            const productos = await getProductosPaginacion(skip);
            setProductos(productos);
        } catch (error) {
            Alert.alert('Error obteniendo los productos', 'Hubo un error al tratar de obtener los productos');
        }
    };

    const navigateToDetails = (productId: number) => {
        navigation.navigate('Detalles', { productId });
    };

    const scrollToTop = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
        }
    };

    return {
        productos,
        navigateToDetails,
        scrollToTop,
        flatListRef,
    };
};

export default useProductos;
