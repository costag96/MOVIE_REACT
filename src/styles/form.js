import { StyleSheet } from 'react-native';
import colors from './colors';

const formStyles = StyleSheet.create({
    input: {
        marginBottom: 20
    },
    btnSucces: {
        padding: 5,
        backgroundColor: colors.darkPrimary
    },
    btnText: {
        marginTop: 10
    },
    btnTextLabel: {
        color: colors.primary
    }
})

export default formStyles;