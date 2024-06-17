import React from 'react';
import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../routes.ts';
import useProductoDetalles from '../hooks/useProductoDetalles';

type ProductoDetallesScreenRouteProp = RouteProp<RootStackParamList, 'Detalles'>;

interface ProductoDetallesProps {
    route: ProductoDetallesScreenRouteProp;
}

const ProductoDetallesScreen: React.FC<ProductoDetallesProps> = ({ route }) => {
    const { productId } = route.params;
    const { product } = useProductoDetalles(productId);

    if (!product) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: product.thumbnail }} style={styles.thumbnail} />
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <Text style={styles.brand}>
                <Text style={styles.bold}>Marca: </Text>
                {product.brand || "N/A"}
            </Text>
            <Text style={styles.brand}>
                <Text style={styles.bold}>SKU: </Text>
                {product.sku}
            </Text>
            {product.reviews.length > 0 && (
                <View style={styles.reviews}>
                    <Text style={styles.bold}>Comentarios:</Text>
                    {product.reviews.map((review, index) => (
                        <Text key={index} style={styles.review}>{review.comment}</Text>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff8e7',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
    },
    price: {
        fontSize: 20,
        color: 'green',
        marginTop: 10,
    },
    brand: {
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
    },
    thumbnail: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        marginBottom: 20,
        borderRadius: 10,
    },
    bold: {
        fontWeight: 'bold',
    },
    reviews: {
        marginTop: 10,
    },
    review: {
        fontSize: 14,
        marginTop: 5,
        fontStyle: 'italic',
    },
});

export default ProductoDetallesScreen;
