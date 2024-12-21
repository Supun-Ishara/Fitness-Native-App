import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUserStore } from '../store/userStore';

const LoginScreen = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleLogin = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (isValid) {
      // Store both email and displayName in user store
      setUser({
        email: email,
        displayName: email.split('@')[0], // Extract name from email
        fullName: email.split('@')[0], // Also set fullName for compatibility
        lastLoginDate: new Date().toISOString()
      });
      router.push('/HomeScreen');
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password pressed');
    // Add your forgot password logic here
  };

  const handleSignUp = () => {
    router.push('/RegisterScreen');
  };

  return (
    <ImageBackground
      source={require('../assets/images/login1.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <View style={styles.overlay}>
            <View style={styles.content}>
              <Text style={styles.title}>Welcome Back</Text>
              <LinearGradient
                colors={['#ff0000', '#ff4444']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientTitle}
              >
                <Text style={styles.title}>PulseTrack</Text>
              </LinearGradient>
              <Text style={styles.subtitle}>Sign in to continue</Text>

              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email</Text>
                  <View style={[styles.inputWrapper, emailError && styles.inputError]}>
                    <Ionicons name="mail-outline" size={wp('5%')} color="#666" style={styles.icon} />
                    <TextInput
                      style={styles.inputWithIcon}
                      placeholder="Enter your email"
                      placeholderTextColor="#999"
                      value={email}
                      onChangeText={(text) => {
                        setEmail(text);
                        setEmailError('');
                      }}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                  {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Password</Text>
                  <View style={[styles.inputWrapper, passwordError && styles.inputError]}>
                    <Ionicons name="lock-closed-outline" size={wp('5%')} color="#666" style={styles.icon} />
                    <TextInput
                      style={styles.inputWithIcon}
                      placeholder="Enter your password"
                      placeholderTextColor="#999"
                      value={password}
                      onChangeText={(text) => {
                        setPassword(text);
                        setPasswordError('');
                      }}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                      <Ionicons
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        size={wp('5%')}
                        color="#666"
                      />
                    </TouchableOpacity>
                  </View>
                  {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                </View>

                <TouchableOpacity
                  onPress={handleForgotPassword}
                  style={styles.forgotPassword}
                >
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleLogin}
                >
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.signUpContainer}
                  onPress={handleSignUp}
                >
                  <Text style={styles.signUpText}>
                    Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: wp('100%'),
    height: hp('100%'),
  },
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  keyboardAvoid: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: wp('5%'),
    justifyContent: 'center',
  },
  gradientTitle: {
    borderRadius: wp('2%'),
    marginBottom: hp('1%'),
    alignSelf: 'center',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('0.5%'),
  },
  title: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: wp('2%'),
  },
  subtitle: {
    fontSize: wp('4.5%'),
    color: '#fff',
    marginBottom: hp('3%'),
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: wp('2%'),
  },
  form: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: wp('5%'),
    borderRadius: wp('4%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  inputContainer: {
    marginBottom: hp('2%'),
  },
  label: {
    fontSize: wp('4%'),
    color: '#333',
    marginBottom: hp('1%'),
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: wp('2.5%'),
  },
  icon: {
    paddingLeft: wp('3%'),
  },
  eyeIcon: {
    padding: wp('3%'),
  },
  inputWithIcon: {
    flex: 1,
    padding: wp('4%'),
    fontSize: wp('4%'),
  },
  inputError: {
    borderColor: '#ff0000',
  },
  errorText: {
    color: '#ff0000',
    fontSize: wp('3.5%'),
    marginTop: hp('0.5%'),
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: hp('2%'),
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: wp('3.5%'),
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: wp('4%'),
    borderRadius: wp('2.5%'),
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  signUpContainer: {
    marginTop: hp('2%'),
    alignItems: 'center',
  },
  signUpText: {
    fontSize: wp('3.8%'),
    color: '#333',
  },
  signUpLink: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default LoginScreen;





//import React, { useState } from 'react';
//import {
//  View,
//  Text,
//  TextInput,
//  TouchableOpacity,
//  StyleSheet,
//  SafeAreaView,
//  KeyboardAvoidingView,
//  Platform,
//  ImageBackground,
//} from 'react-native';
//import { LinearGradient } from 'expo-linear-gradient';
//import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//import { Ionicons } from '@expo/vector-icons';
//import { useRouter } from 'expo-router';
//
//const LoginScreen = () => {
//  const router = useRouter();
//  const [email, setEmail] = useState('');
//  const [password, setPassword] = useState('');
//  const [emailError, setEmailError] = useState('');
//  const [passwordError, setPasswordError] = useState('');
//  const [showPassword, setShowPassword] = useState(false);
//
//  const validateEmail = (email) => {
//    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//    return emailRegex.test(email);
//  };
//
//  const validatePassword = (password) => {
//    return password.length >= 6;
//  };
//
//  const handleLogin = () => {
//    let isValid = true;
//    setEmailError('');
//    setPasswordError('');
//
//    if (!email) {
//      setEmailError('Email is required');
//      isValid = false;
//    } else if (!validateEmail(email)) {
//      setEmailError('Please enter a valid email');
//      isValid = false;
//    }
//
//    if (!password) {
//      setPasswordError('Password is required');
//      isValid = false;
//    } else if (!validatePassword(password)) {
//      setPasswordError('Password must be at least 6 characters');
//      isValid = false;
//    }
//
//    if (isValid) {
//      router.push('/HomeScreen');
//    }
//  };
//
//  const handleForgotPassword = () => {
//    // Add your forgot password logic here
//    console.log('Forgot password pressed');
//  };
//
//  const handleSignUp = () => {
//    router.push('/RegisterScreen');
//  };
//
//  return (
//    <ImageBackground
//      source={require('../assets/images/login1.jpg')}
//      style={styles.backgroundImage}
//      resizeMode="cover"
//    >
//      <SafeAreaView style={styles.container}>
//        <KeyboardAvoidingView
//          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//          style={styles.keyboardAvoid}
//        >
//          <View style={styles.overlay}>
//            <View style={styles.content}>
//            <Text style={styles.title}>Welcome Back</Text>
//              <LinearGradient
//                colors={['#ff0000', '#ff4444']}
//                start={{ x: 0, y: 0 }}
//                end={{ x: 1, y: 0 }}
//                style={styles.gradientTitle}
//              >
//                <Text style={styles.title}>PulseTrack</Text>
//              </LinearGradient>
//              <Text style={styles.subtitle}>Sign in to continue</Text>
//
//              <View style={styles.form}>
//                <View style={styles.inputContainer}>
//                  <Text style={styles.label}>Email</Text>
//                  <View style={[styles.inputWrapper, emailError && styles.inputError]}>
//                    <Ionicons name="mail-outline" size={wp('5%')} color="#666" style={styles.icon} />
//                    <TextInput
//                      style={styles.inputWithIcon}
//                      placeholder="Enter your email"
//                      placeholderTextColor="#999"
//                      value={email}
//                      onChangeText={(text) => {
//                        setEmail(text);
//                        setEmailError('');
//                      }}
//                      keyboardType="email-address"
//                      autoCapitalize="none"
//                      autoCorrect={false}
//                    />
//                  </View>
//                  {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
//                </View>
//
//                <View style={styles.inputContainer}>
//                  <Text style={styles.label}>Password</Text>
//                  <View style={[styles.inputWrapper, passwordError && styles.inputError]}>
//                    <Ionicons name="lock-closed-outline" size={wp('5%')} color="#666" style={styles.icon} />
//                    <TextInput
//                      style={styles.inputWithIcon}
//                      placeholder="Enter your password"
//                      placeholderTextColor="#999"
//                      value={password}
//                      onChangeText={(text) => {
//                        setPassword(text);
//                        setPasswordError('');
//                      }}
//                      secureTextEntry={!showPassword}
//                    />
//                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
//                      <Ionicons
//                        name={showPassword ? "eye-outline" : "eye-off-outline"}
//                        size={wp('5%')}
//                        color="#666"
//                      />
//                    </TouchableOpacity>
//                  </View>
//                  {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
//                </View>
//
//                <TouchableOpacity
//                  onPress={handleForgotPassword}
//                  style={styles.forgotPassword}
//                >
//                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//                </TouchableOpacity>
//
//                <TouchableOpacity
//                  style={styles.loginButton}
//                  onPress={handleLogin}
//                >
//                  <Text style={styles.loginButtonText}>Login</Text>
//                </TouchableOpacity>
//
//                <TouchableOpacity
//                  style={styles.signUpContainer}
//                  onPress={handleSignUp}
//                >
//
//                  <Text style={styles.signUpText}>
//                    Do not have an account? <Text style={styles.signUpLink}>Sign Up</Text>
//                  </Text>
//                </TouchableOpacity>
//              </View>
//            </View>
//          </View>
//        </KeyboardAvoidingView>
//      </SafeAreaView>
//    </ImageBackground>
//  );
//};
//
//const styles = StyleSheet.create({
//  backgroundImage: {
//    width: wp('100%'),
//    height: hp('100%'),
//  },
//  container: {
//    flex: 1,
//  },
//  overlay: {
//    flex: 1,
//    backgroundColor: 'rgba(0, 0, 0, 0.4)',
//  },
//  keyboardAvoid: {
//    flex: 1,
//  },
//  content: {
//    flex: 1,
//    padding: wp('5%'),
//    justifyContent: 'center',
//  },
//  gradientTitle: {
//    borderRadius: wp('2%'),
//    marginBottom: hp('1%'),
//    alignSelf: 'center',
//    paddingHorizontal: wp('5%'),
//    paddingVertical: hp('0.5%'),
//  },
//  title: {
//    fontSize: wp('8%'),
//    fontWeight: 'bold',
//    color: '#fff',
//    textAlign: 'center',
//    textShadowColor: 'rgba(0, 0, 0, 0.75)',
//    textShadowOffset: { width: -1, height: 1 },
//    textShadowRadius: wp('2%'),
//  },
//  subtitle: {
//    fontSize: wp('4.5%'),
//    color: '#fff',
//    marginBottom: hp('3%'),
//    textAlign: 'center',
//    textShadowColor: 'rgba(0, 0, 0, 0.75)',
//    textShadowOffset: { width: -1, height: 1 },
//    textShadowRadius: wp('2%'),
//  },
//  form: {
//    width: '100%',
//    backgroundColor: 'rgba(255, 255, 255, 0.9)',
//    padding: wp('5%'),
//    borderRadius: wp('4%'),
//    shadowColor: '#000',
//    shadowOffset: {
//      width: 0,
//      height: 4,
//    },
//    shadowOpacity: 0.3,
//    shadowRadius: 4.65,
//    elevation: 8,
//  },
//  inputContainer: {
//    marginBottom: hp('2%'),
//  },
//  label: {
//    fontSize: wp('4%'),
//    color: '#333',
//    marginBottom: hp('1%'),
//    fontWeight: '600',
//  },
//  inputWrapper: {
//    flexDirection: 'row',
//    alignItems: 'center',
//    backgroundColor: '#fff',
//    borderWidth: 1,
//    borderColor: '#ddd',
//    borderRadius: wp('2.5%'),
//  },
//  icon: {
//    paddingLeft: wp('3%'),
//  },
//  eyeIcon: {
//    padding: wp('3%'),
//  },
//  inputWithIcon: {
//    flex: 1,
//    padding: wp('4%'),
//    fontSize: wp('4%'),
//  },
//  inputError: {
//    borderColor: '#ff0000',
//  },
//  errorText: {
//    color: '#ff0000',
//    fontSize: wp('3.5%'),
//    marginTop: hp('0.5%'),
//  },
//  forgotPassword: {
//    alignSelf: 'flex-end',
//    marginBottom: hp('2%'),
//  },
//  forgotPasswordText: {
//    color: '#007AFF',
//    fontSize: wp('3.5%'),
//    fontWeight: '600',
//  },
//  loginButton: {
//    backgroundColor: '#007AFF',
//    padding: wp('4%'),
//    borderRadius: wp('2.5%'),
//    alignItems: 'center',
//  },
//  loginButtonText: {
//    color: '#fff',
//    fontSize: wp('4%'),
//    fontWeight: 'bold',
//  },
//  signUpContainer: {
//    marginTop: hp('2%'),
//    alignItems: 'center',
//  },
//  signUpText: {
//    fontSize: wp('3.8%'),
//    color: '#333',
//  },
//  signUpLink: {
//    color: '#007AFF',
//    fontWeight: '600',
//  //  textDecorationLine: 'underline',
//  },
//});
//
//export default LoginScreen;
