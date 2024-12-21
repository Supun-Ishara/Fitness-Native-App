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
  ScrollView,
  ImageBackground
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUserStore } from '../store/userStore';

const RegisterScreen = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      setUser({
        fullName: formData.fullName,
        email: formData.email
      });
      router.push('/HomeScreen');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/register.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Sign up to get started</Text>

              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Full Name</Text>
                  <View style={[styles.inputWrapper, errors.fullName && styles.inputError]}>
                    <Ionicons name="person-outline" size={wp('5%')} color="#666" style={styles.icon} />
                    <TextInput
                      style={styles.inputWithIcon}
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChangeText={(value) => handleInputChange('fullName', value)}
                      autoCorrect={false}
                    />
                  </View>
                  {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email</Text>
                  <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                    <Ionicons name="mail-outline" size={wp('5%')} color="#666" style={styles.icon} />
                    <TextInput
                      style={styles.inputWithIcon}
                      placeholder="Enter your email"
                      value={formData.email}
                      onChangeText={(value) => handleInputChange('email', value)}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                  {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Password</Text>
                  <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
                    <Ionicons name="lock-closed-outline" size={wp('5%')} color="#666" style={styles.icon} />
                    <TextInput
                      style={styles.inputWithIcon}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChangeText={(value) => handleInputChange('password', value)}
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
                  {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <View style={[styles.inputWrapper, errors.confirmPassword && styles.inputError]}>
                    <Ionicons name="lock-closed-outline" size={wp('5%')} color="#666" style={styles.icon} />
                    <TextInput
                      style={styles.inputWithIcon}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChangeText={(value) => handleInputChange('confirmPassword', value)}
                      secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                      <Ionicons
                        name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                        size={wp('5%')}
                        color="#666"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                </View>

                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={handleRegister}
                >
                  <Text style={styles.registerButtonText}>Create Account</Text>
                </TouchableOpacity>

                <View style={styles.loginLinkContainer}>
                  <Text style={styles.loginText}>Already have an account?</Text>
                  <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.loginLink}> Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  keyboardAvoid: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: wp('5%'),
    justifyContent: 'center',
    marginTop: hp('3%'),
  },
  title: {
    fontSize: wp('7%'),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: hp('1%'),
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: wp('2%'),
  },
  subtitle: {
    fontSize: wp('4%'),
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
  registerButton: {
    backgroundColor: '#007AFF',
    padding: wp('4%'),
    borderRadius: wp('2.5%'),
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  registerButtonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp('2%'),
  },
  loginText: {
    color: '#333',
    fontSize: wp('3.8%'),
  },
  loginLink: {
    color: '#007AFF',
    fontSize: wp('3.8%'),
    fontWeight: '600',
  },
});

export default RegisterScreen;



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
//  ScrollView,
//  ImageBackground
//} from 'react-native';
//import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//import { Ionicons } from '@expo/vector-icons';
//import { useRouter } from 'expo-router';
//
//const RegisterScreen = () => {
//  const router = useRouter();
//  const [formData, setFormData] = useState({
//    fullName: '',
//    email: '',
//    password: '',
//    confirmPassword: '',
//  });
//  const [showPassword, setShowPassword] = useState(false);
//  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//  const [errors, setErrors] = useState({});
//
//  const handleInputChange = (field, value) => {
//    setFormData(prev => ({
//      ...prev,
//      [field]: value
//    }));
//    if (errors[field]) {
//      setErrors(prev => ({
//        ...prev,
//        [field]: ''
//      }));
//    }
//  };
//
//  const validateForm = () => {
//    const newErrors = {};
//
//    if (!formData.fullName.trim()) {
//      newErrors.fullName = 'Full name is required';
//    }
//
//    if (!formData.email.trim()) {
//      newErrors.email = 'Email is required';
//    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//      newErrors.email = 'Please enter a valid email';
//    }
//
//    if (!formData.password) {
//      newErrors.password = 'Password is required';
//    } else if (formData.password.length < 6) {
//      newErrors.password = 'Password must be at least 6 characters';
//    }
//
//    if (!formData.confirmPassword) {
//      newErrors.confirmPassword = 'Please confirm your password';
//    } else if (formData.password !== formData.confirmPassword) {
//      newErrors.confirmPassword = 'Passwords do not match';
//    }
//
//    setErrors(newErrors);
//    return Object.keys(newErrors).length === 0;
//  };
//
//  const handleRegister = () => {
//    if (validateForm()) {
//      router.push('/home');
//    }
//  };
//
//  return (
//    <ImageBackground
//      source={require('../assets/images/register.jpg')}
//      style={styles.backgroundImage}
//      resizeMode="cover"
//    >
//      <SafeAreaView style={styles.container}>
//        <KeyboardAvoidingView
//          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//          style={styles.keyboardAvoid}
//        >
//          <ScrollView showsVerticalScrollIndicator={false}>
//            <View style={styles.content}>
//              <Text style={styles.title}>Create Account</Text>
//              <Text style={styles.subtitle}>Sign up to get started</Text>
//
//              <View style={styles.form}>
//                <View style={styles.inputContainer}>
//                  <Text style={styles.label}>Full Name</Text>
//                  <View style={[styles.inputWrapper, errors.fullName && styles.inputError]}>
//                    <Ionicons name="person-outline" size={wp('5%')} color="#666" style={styles.icon} />
//                    <TextInput
//                      style={styles.inputWithIcon}
//                      placeholder="Enter your full name"
//                      value={formData.fullName}
//                      onChangeText={(value) => handleInputChange('fullName', value)}
//                      autoCorrect={false}
//                    />
//                  </View>
//                  {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
//                </View>
//
//                <View style={styles.inputContainer}>
//                  <Text style={styles.label}>Email</Text>
//                  <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
//                    <Ionicons name="mail-outline" size={wp('5%')} color="#666" style={styles.icon} />
//                    <TextInput
//                      style={styles.inputWithIcon}
//                      placeholder="Enter your email"
//                      value={formData.email}
//                      onChangeText={(value) => handleInputChange('email', value)}
//                      keyboardType="email-address"
//                      autoCapitalize="none"
//                      autoCorrect={false}
//                    />
//                  </View>
//                  {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
//                </View>
//
//                <View style={styles.inputContainer}>
//                  <Text style={styles.label}>Password</Text>
//                  <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
//                    <Ionicons name="lock-closed-outline" size={wp('5%')} color="#666" style={styles.icon} />
//                    <TextInput
//                      style={styles.inputWithIcon}
//                      placeholder="Enter your password"
//                      value={formData.password}
//                      onChangeText={(value) => handleInputChange('password', value)}
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
//                  {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
//                </View>
//
//                <View style={styles.inputContainer}>
//                  <Text style={styles.label}>Confirm Password</Text>
//                  <View style={[styles.inputWrapper, errors.confirmPassword && styles.inputError]}>
//                    <Ionicons name="lock-closed-outline" size={wp('5%')} color="#666" style={styles.icon} />
//                    <TextInput
//                      style={styles.inputWithIcon}
//                      placeholder="Confirm your password"
//                      value={formData.confirmPassword}
//                      onChangeText={(value) => handleInputChange('confirmPassword', value)}
//                      secureTextEntry={!showConfirmPassword}
//                    />
//                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
//                      <Ionicons
//                        name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
//                        size={wp('5%')}
//                        color="#666"
//                      />
//                    </TouchableOpacity>
//                  </View>
//                  {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
//                </View>
//
//                <TouchableOpacity
//                  style={styles.registerButton}
//                  onPress={handleRegister}
//                >
//                  <Text style={styles.registerButtonText}>Create Account</Text>
//                </TouchableOpacity>
//
//                <View style={styles.loginLinkContainer}>
//                  <Text style={styles.loginText}>Already have an account?</Text>
//                  <TouchableOpacity onPress={() => router.back()}>
//                    <Text style={styles.loginLink}> Login</Text>
//                  </TouchableOpacity>
//                </View>
//              </View>
//            </View>
//          </ScrollView>
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
//    backgroundColor: 'rgba(0, 0, 0, 0.4)',
//  },
//  keyboardAvoid: {
//    flex: 1,
//  },
//  content: {
//    flex: 1,
//    padding: wp('5%'),
//    justifyContent: 'center',
//    marginTop: hp('3%'),
//  },
//  title: {
//    fontSize: wp('7%'),
//    fontWeight: 'bold',
//    color: '#fff',
//    marginBottom: hp('1%'),
//    textAlign: 'center',
//    textShadowColor: 'rgba(0, 0, 0, 0.75)',
//    textShadowOffset: { width: -1, height: 1 },
//    textShadowRadius: wp('2%'),
//  },
//  subtitle: {
//    fontSize: wp('4%'),
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
//  registerButton: {
//    backgroundColor: '#007AFF',
//    padding: wp('4%'),
//    borderRadius: wp('2.5%'),
//    alignItems: 'center',
//    marginTop: hp('2%'),
//  },
//  registerButtonText: {
//    color: '#fff',
//    fontSize: wp('4%'),
//    fontWeight: 'bold',
//  },
//  loginLinkContainer: {
//    flexDirection: 'row',
//    justifyContent: 'center',
//    marginTop: hp('2%'),
//  },
//  loginText: {
//    color: '#333',
//    fontSize: wp('3.8%'),
//  },
//  loginLink: {
//    color: '#007AFF',
//    fontSize: wp('3.8%'),
//    fontWeight: '600',
//    //textDecorationLine: 'underline',
//  },
//});
//
//export default RegisterScreen;