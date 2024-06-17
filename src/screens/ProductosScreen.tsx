import React from 'react';
import { SafeAreaView, FlatList, StyleSheet, StatusBar, Text, Image, TouchableOpacity, Button, View } from 'react-native';
import { connect } from 'react-redux';
import useProductos from '../hooks/useProductos.tsx';
import { siguientePagina, anteriorPagina } from '../context/actions/paginacionAction';


interface Props {
    skip: number;
    incrementPage: () => void;
    decrementPage: () => void;
}

const ProductosScreen = ({ skip, incrementPage, decrementPage }: Props) => {
    const { productos, navigateToDetails, scrollToTop, flatListRef } = useProductos({
        skip,
        incrementPage,
        decrementPage,
    });

    const renderProducto = ({ item }: { item: Producto }) => (
        <TouchableOpacity style={styles.item} onPress={() => navigateToDetails(item.id)}>
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.id}>
                <Text style={styles.bold}>id: </Text>
                {item.id}
            </Text>
            <Text style={styles.brand}>
                <Text style={styles.bold}>Marca: </Text>
                {item.brand || "N/A"}
            </Text>
        </TouchableOpacity>
    );

    const handleAnteriorPagina = () => {
        decrementPage();
        scrollToTop();
    };

    const handleSiguientePagina = () => {
        incrementPage();
        scrollToTop();
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={productos}
                renderItem={renderProducto}
                keyExtractor={(item) => item.id.toString()}
                ListFooterComponent={
                    <View style={styles.paginationButtons}>
                        <Button title="Anterior" onPress={handleAnteriorPagina} disabled={skip === 0} />
                        <Button title="Siguiente" onPress={handleSiguientePagina} />
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const mapStateToProps = (state: any) => ({
    skip: state.paginacion.skip,
});

const mapDispatchToProps = (dispatch: any) => ({
    incrementPage: () => dispatch(siguientePagina()),
    decrementPage: () => dispatch(anteriorPagina()),
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#fff8e7',
    },
    item: {
        backgroundColor: '#E6E6FA',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    id: {
        fontSize: 18,
        marginTop: 10,
    },
    brand: {
        fontSize: 16,
        marginTop: 10,
    },
    thumbnail: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
        borderRadius: 10,
    },
    bold: {
        fontWeight: 'bold',
    },
    paginationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginVertical: 20,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductosScreen);
