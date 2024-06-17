import React from 'react';
import { SafeAreaView, TextInput, Button, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import useLogin from '../hooks/useLogin.tsx';
import { increment } from '../context/actions/intentosAction';


interface Props {
    count: number;
    increment: () => void;
}

const LoginScreen = ({ count, increment }: Props): React.JSX.Element => {
    const {
        username,
        setUsername,
        password,
        setPassword,
        isLocked,
        handleLogin,
    } = useLogin({ count, increment });

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Usuario</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Ingresa tu usuario"
                editable={!isLocked}
            />
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Ingresa tu contraseña"
                secureTextEntry
                editable={!isLocked}
            />
            {!isLocked ? (
                <Button title="Login" onPress={handleLogin} />
            ) : (
                <Text style={styles.lockoutMessage}>Demasiados intentos fallidos. Por favor, espera 60 segundos.</Text>
            )}
        </SafeAreaView>
    );
};

const mapStateToProps = (state: any) => ({
    count: state.intentos.count,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    increment: () => dispatch(increment()),
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
        fontWeight: 'bold',
        textAlign: 'left',
        width: '79%'
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    lockoutMessage: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 16,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
