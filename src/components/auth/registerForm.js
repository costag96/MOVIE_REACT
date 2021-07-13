import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-root-toast';
import { registerApi } from '../../api/atlas';
import formStyles from '../../styles/form';

export default function RegisterForm(props) {
    
    const { changeForm } = props;
    const [loading, setLoading] = useState(false)

// Solucionar el cargando , manejo de errores NO LOS LEE. No funciona el toast tampoco.
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                await registerApi(formData);
                changeForm();
            } catch (error) {
            setLoading(false);                
                Toast.show("Error..", {
                position: Toast.positions.CENTER,
                });
            }
        setLoading(false);                
        }
    })

    return (
        <View>
            <TextInput
                style={formStyles.input}
                label='Username'
                onChangeText={(text) => formik.setFieldValue('name', text)}
                value={formik.values.name}
                error={formik.errors.name}
            />
            <TextInput
                style={formStyles.input}
                label='Email'
                onChangeText={(text) => formik.setFieldValue('email', text)}
                value={formik.values.email}
                error={formik.errors.email}
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
                Registrarse
            </Button>
            <Button
                mode="text"
                style={formStyles.btnText}
                labelStyle={formStyles.btnTextLabel}
                onPress={changeForm}
            >
                Login
            </Button>
        </View>
    )
}

function initialValues() {
    return {
        name: '',
        email: '',
        passwd: ''
    }
}

function validationSchema() {
    return {
        name: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        passwd: Yup.string().required(true)
    }
}