import React, { useState } from 'react';
import { View} from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-root-toast';
import { loginApi } from '../../api/atlas';
import useAuth from '../../hooks/useAuth';
import formStyles from '../../styles/form';


export default function LoginForm(props) {
    
    const { changeForm } = props;
    const [loading, setLoading] = useState(false)
    const { login } = useAuth();


// SOLUCIONAR MANEJO DE ERRORES NO CATCHEA NOSE PORQAUE AUN
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                const response = await loginApi(formData);
             //   if (response.status) throw "Email o password invalidos";
                login(response)
            } catch (error) {
                Toast.show(error, {
                position: Toast.positions.CENTER,
                });
                setLoading(false);                
            }
            setLoading(false);
        }
    });
    
    return (
        <View>
            <TextInput
                style={formStyles.input}
                label='Email'
                onChangeText={(text) => formik.setFieldValue('email', text)}
                value={formik.values.name}
                error={formik.errors.name}                
            />
            <TextInput
                style={formStyles.input}
                label='Password'
                onChangeText={(text) => formik.setFieldValue('passwd', text)}
                value={formik.values.passwd}
                error={formik.errors.passwd}                
                secureTextEntry
            />
            <Button
                mode="contained"
                style={formStyles.btnSucces}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Login
            </Button>
            <Button
                mode="text"
                style={formStyles.btnText}
                labelStyle={formStyles.btnTextLabel}
                onPress={changeForm}
            >
                Registrarse
            </Button>
        </View>
    );
}

function initialValues() {
    return {
        email: '',
        passwd: ''
    }
}

function validationSchema() {
    return {
        email: Yup.string().email(true).required(true),
        passwd: Yup.string().required(true)
    }
}