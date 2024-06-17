import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    Login: undefined;
    Productos: undefined;
    Detalles: { productId: number };
};
