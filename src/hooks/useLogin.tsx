import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes.ts';
import { login } from "../services/authService.ts";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
    count: number;
    increment: () => void;
}

const useLogin = ({ count, increment }: Props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLocked, setIsLocked] = useState(false);
    const navigation = useNavigation<LoginScreenNavigationProp>();

    useEffect(() => {
        if (count >= 3) {
            setIsLocked(true);
            const timer = setTimeout(() => {
                setIsLocked(false);
            }, 60000); // 60 segundos

            return () => clearTimeout(timer);
        }
    }, [count]);

    const handleLogin = async () => {
        try {
            if (username !== '' && password !== '') {
                const { response, data } = await login(username, password);
                if (response.ok) {
                    navigation.navigate('Productos');
                } else {
                    increment(); // Incrementa el contador solo cuando las credenciales son incorrectas
                    Alert.alert('Login Fallido', data.message || 'Credenciales incorrectas');
                }
            } else {
                Alert.alert('Campos vacíos', 'Por favor ingrese usuario y contraseña');
            }
        } catch (error) {
            Alert.alert('Login Error', 'Ha ocurrido un error en el login.');
        }
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        isLocked,
        handleLogin,
    };
};

export default useLogin;
