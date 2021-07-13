import React, {useContext, useState, useEffect} from 'react';
import { View, Text , StyleSheet, TextInput, TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import { color } from 'react-native-reanimated';
import AtlasLogo from '../components/AtlasLogo';
import RegisterForm from '../components/auth/registerForm'
import LoginForm from '../components/auth/loginForm'

export default function Login(props) {

    const [showLogin, setShowLogin] = useState(true);
    
    const changeForm = () => setShowLogin(!showLogin);

    return (

        <View style={styles.formulario}>
            <AtlasLogo />
            <KeyboardAvoidingView
                behavior={'height'}            
            >
                {showLogin ? <LoginForm changeForm={changeForm} /> : <RegisterForm changeForm={changeForm}/>}
            </KeyboardAvoidingView>    
        </View>
        // <>
        //     <KeyboardAvoidingView
        //         style={{ flex: 1 }}
        //         behavior={'height'}
        //     >
        //     <View style={styles.formulario}>
        //         <AtlasLogo />
        //         <Text style={styles.title}> Login </Text>
        //         <Text style={styles.label}> Email </Text>
        //         <TextInput
        //             placeholder="Ingrese su email"
        //             placeholderTextColor="rgba(255,255,255,0.4)"
        //             keyboardType="email-address"
        //             underlineColorAndroid="white"
        //             style={styles.inputField}
        //             selectionColor="white"
        //             autoCapitalize="none"
        //             autoCorrect={false}
        //         />
        //         <Text style={styles.label}> Password </Text>
        //         <TextInput
        //             placeholder="*****"
        //             placeholderTextColor="rgba(255,255,255,0.4)"
        //             keyboardType="email-address"
        //             underlineColorAndroid="white"
        //             style={styles.inputField}
        //             selectionColor="white"
        //             autoCapitalize="none"
        //             secureTextEntry={true}
        //             autoCorrect={false}
        //         />
                
        //         <View style={styles.buttonContainer}>
        //             <TouchableOpacity
        //                     activeOpacity={0.2}
        //                     style={styles.button}
        //                 >
        //                 <Text style={styles.buttonText}> Login </Text>
        //             </TouchableOpacity>
        //         </View>

        //         <View
        //             style={styles.registro}
        //         >
        //             <TouchableOpacity
        //                 activeOpacity={0.2}
        //                 onPress={() => console.log('press')}
        //             >
        //             <Text style={styles.buttonText}> Registro </Text>

        //             </TouchableOpacity>
        //             </View>
        //         </View>
        //     </KeyboardAvoidingView>    
        // </>    
    );
}

const styles = StyleSheet.create({
    formulario: {
        flex: 1,
        paddingHorizontal: 40,
        justifyContent: 'center',
        height: 600,
        marginBottom: 50
    },
    // title: {
    //     color: 'red',
    //     fontSize: 50,
    //     fontWeight: 'bold',
    //     marginTop: 20
    // },
    // label: {
    //     marginTop: 25,
    //     fontSize: 30,
    //     color: 'red',
    //     fontWeight: 'bold',
    // },
    // inputField: {
    //     color: 'white',
    //     fontSize: 20,
    //     height: 50,
    //     paddingBottom: 5
    // },
    // buttonContainer: {
    //     alignItems: 'center',
    //     marginTop: 50
    // },
    // button: {
    //     borderWidth: 2,
    //     borderColor: 'red',
    //     paddingHorizontal: 20,
    //     paddingVertical: 5,
    //     borderRadius: 100
    // },
    // buttonText: {
    //     fontSize: 20,
    //     color: 'red',
    // },
    // registro: {
    //     alignItems: 'flex-end',
    //     marginTop: 10
    // }
})