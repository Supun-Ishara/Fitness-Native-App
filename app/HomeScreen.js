import React, { useState, useEffect } from 'react';
import {
 View,
 Text,
 StyleSheet,
 ScrollView,
 Image,
 TouchableOpacity,
 SafeAreaView,
 ActivityIndicator,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { useClickStore } from '../store/clickStore';
import { useUserStore } from '../store/userStore';

// Add this constant at the top of your file, after the imports
const equipmentData = [
 {
   id: '1',
   image: require('../assets/images/equipment1.jpg'),
 },
 {
   id: '2',
   image: require('../assets/images/equipment2.webp'),
 },
 {
   id: '3',
   image: require('../assets/images/equipment3.jpg'),
 },
 {
   id: '4',
   image: require('../assets/images/equipment4.webp'),
 },
 {
   id: '5',
   image: require('../assets/images/equipment5.webp'),
 },
 {
   id: '6',
   image: require('../assets/images/equipment6.jpg'),
 },
 {
   id: '7',
   image: require('../assets/images/equipment7.jpg'),
 },
 {
   id: '8',
   image: require('../assets/images/equipment8.webp'),
 },
 {
   id: '9',
   image: require('../assets/images/equipment9.webp'),
 },
 {
   id: '10',
   image: require('../assets/images/equipment10.jpg'),
 },
];

const HomeScreen = () => {
 const [items, setItems] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 // Zustand store hooks
 const { clickCount, itemClicks, incrementClick } = useClickStore();
 const user = useUserStore((state) => state.user);

 useEffect(() => {
   fetchItems();
 }, []);

 const fetchItems = async () => {
   try {
     const response = await fetch('https://exercisedb.p.rapidapi.com/exercises/equipmentList', {
       headers: {
         'X-RapidAPI-Key': 'c9125facbamsh3f7fae7e0d46310p1a4ee9jsn98de76df892b',
         'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
       }
     });

     const equipmentList = await response.json();

     // Take first 10 items and transform them
     const transformedItems = equipmentList.slice(0, 10).map((equipment, index) => ({
       id: (index + 1).toString(),
       title: `Equipment ${index + 1}`,
       description: `${equipment} - Professional fitness equipment for your workout needs`,
       image: equipmentData[index].image,
       status: getRandomStatus(),
       lastUsed: getRandomTimeUsed(),
     }));

     setItems(transformedItems);
   } catch (error) {
     console.error('Error fetching equipment data:', error);
     setError(error);
     // Fallback to local data if API fails
     const transformedItems = equipmentData.map(item => ({
       ...item,
       status: getRandomStatus(),
       lastUsed: getRandomTimeUsed(),
     }));
     setItems(transformedItems);
   } finally {
     setLoading(false);
   }
 };

 const getRandomStatus = () => {
   const statuses = ['Available', 'In Use', 'Maintenance'];
   return statuses[Math.floor(Math.random() * statuses.length)];
 };

 const getRandomTimeUsed = () => {
   const times = ['1 hour ago', '2 hours ago', '30 minutes ago', 'Currently in use', 'Under maintenance'];
   return times[Math.floor(Math.random() * times.length)];
 };

 const getStatusColor = (status) => {
   switch (status) {
     case 'Available':
       return '#4CAF50';
     case 'In Use':
       return '#2196F3';
     case 'Maintenance':
       return '#FF9800';
     default:
       return '#757575';
   }
 };

 const handleItemClick = (itemId) => {
   incrementClick(itemId);
 };

 if (loading) {
   return (
     <View style={styles.loadingContainer}>
       <ActivityIndicator size="large" color="#007AFF" />
     </View>
   );
 }

 if (error) {
   return (
     <View style={styles.loadingContainer}>
       <Text style={styles.errorText}>Error loading equipment data. Please try again later.</Text>
     </View>
   );
 }

 return (
   <SafeAreaView style={styles.container}>
     <View style={styles.header}>

 <View>
    <Text style={styles.headerTitle}>Equipment</Text>
    <Text style={styles.welcomeText}>
      Welcome{user?.fullName ? `, ${user.fullName}` : ''}
    </Text>
    {user?.email && (
      <Text style={styles.emailText}>{user.email}</Text>
    )}
  </View>
       <View style={styles.profileContainer}>
         <TouchableOpacity style={styles.profileButton}>
           <Ionicons name="person-circle-outline" size={wp('8%')} color="#007AFF" />
         </TouchableOpacity>
         <Text style={styles.profileNameText}>{user?.fullName || 'User'}</Text>
       </View>
     </View>

     <ScrollView style={styles.scrollView}>
       {items.map((item) => (
         <TouchableOpacity
           key={item.id}
           style={styles.card}
           onPress={() => handleItemClick(item.id)}
         >
           <Image
             source={item.image}
             style={styles.cardImage}
             resizeMode="cover"
           />
           <View style={styles.cardContent}>
             <View style={styles.cardHeader}>
               <Text style={styles.cardTitle}>{item.title}</Text>
               <View style={[styles.statusTag, { backgroundColor: getStatusColor(item.status) }]}>
                 <Text style={styles.statusText}>{item.status}</Text>
               </View>
             </View>
             <Text style={styles.cardDescription}>{item.description}</Text>
             <View style={styles.cardFooter}>
               <Ionicons name="time-outline" size={wp('4%')} color="#666" />
               <Text style={styles.lastUsedText}>{item.lastUsed}</Text>
               <Text style={styles.clickCountText}>
                 Clicks: {itemClicks[item.id] || 0}
               </Text>
             </View>
           </View>
         </TouchableOpacity>
       ))}
     </ScrollView>

     <TouchableOpacity style={styles.floatingCounter}>
       <Text style={styles.counterText}>Total Clicks: {clickCount}</Text>
     </TouchableOpacity>
   </SafeAreaView>
 );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#f5f5f5',
 },
 loadingContainer: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
 },
 errorText: {
   color: 'red',
   fontSize: wp('4%'),
   textAlign: 'center',
   padding: wp('4%'),
 },
 header: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   padding: wp('4%'),
   backgroundColor: '#fff',
   borderBottomWidth: 1,
   borderBottomColor: '#eee',
 },
 headerTitle: {
   fontSize: wp('6%'),
   fontWeight: 'bold',
   color: '#333',
 },
 welcomeText: {
   fontSize: wp('3.5%'),
   color: '#666',
   marginTop: hp('0.5%'),
 },
 profileContainer: {
   alignItems: 'center',
   justifyContent: 'center',
 },
 profileButton: {
   padding: wp('2%'),
 },
 profileNameText: {
   fontSize: wp('3%'),
   color: '#666',
   marginTop: wp('1%'),
 },
 scrollView: {
   flex: 1,
   padding: wp('4%'),
 },
 card: {
   backgroundColor: '#fff',
   borderRadius: wp('4%'),
   marginBottom: wp('4%'),
   shadowColor: '#000',
   shadowOffset: {
     width: 0,
     height: 2,
   },
   shadowOpacity: 0.1,
   shadowRadius: 4,
   elevation: 3,
 },
 cardImage: {
   width: '100%',
   height: hp('25%'),
   borderTopLeftRadius: wp('4%'),
   borderTopRightRadius: wp('4%'),
 },
 cardContent: {
   padding: wp('4%'),
 },
 cardHeader: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: wp('2%'),
 },
 cardTitle: {
   fontSize: wp('4.5%'),
   fontWeight: 'bold',
   color: '#333',
   flex: 1,
 },
 statusTag: {
   paddingHorizontal: wp('3%'),
   paddingVertical: wp('1%'),
   borderRadius: wp('4%'),
   marginLeft: wp('2%'),
 },
 statusText: {
   color: '#fff',
   fontSize: wp('3.5%'),
   fontWeight: '600',
 },
 cardDescription: {
   fontSize: wp('3.8%'),
   color: '#666',
   marginBottom: wp('2%'),
 },
 cardFooter: {
   flexDirection: 'row',
   alignItems: 'center',
 },
 lastUsedText: {
   fontSize: wp('3.5%'),
   color: '#666',
   marginLeft: wp('1%'),
 },
 clickCountText: {
   fontSize: wp('3.5%'),
   color: '#666',
   marginLeft: 'auto',
 },
 floatingCounter: {
   position: 'absolute',
   bottom: hp('3%'),
   right: wp('4%'),
   backgroundColor: '#007AFF',
   padding: wp('4%'),
   borderRadius: wp('10%'),
   elevation: 5,
   shadowColor: '#000',
   shadowOffset: {
     width: 0,
     height: 2,
   },
   shadowOpacity: 0.25,
   shadowRadius: 3.84,
 },
 counterText: {
   color: '#fff',
   fontSize: wp('4%'),
   fontWeight: 'bold',
 },
});

export default HomeScreen;






//import React, { useState, useEffect } from 'react';
//import {
//  View,
//  Text,
//  StyleSheet,
//  ScrollView,
//  Image,
//  TouchableOpacity,
//  SafeAreaView,
//  ActivityIndicator,
//} from 'react-native';
//import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//import { Ionicons } from '@expo/vector-icons';
//import { useClickStore } from '../store/clickStore';
//import { useUserStore } from '../store/userStore';
//
//// Add this constant at the top of your file, after the imports
//const equipmentData = [
//  {
//    id: '1',
//    title: 'Equipment 1',
//    description: 'Treadmill with advanced features for cardio training',
//    image: require('../assets/images/equipment1.jpg'),
//  },
//  {
//    id: '2',
//    title: 'Equipment 2',
//    description: 'Professional rowing machine for full-body workout',
//    image: require('../assets/images/equipment2.webp'),
//  },
//  {
//    id: '3',
//    title: 'Equipment 3',
//    description: 'High-performance exercise bike with digital display',
//    image: require('../assets/images/equipment3.jpg'),
//  },
//  {
//    id: '4',
//    title: 'Equipment 4',
//    description: 'Weight bench with multiple adjustment positions',
//    image: require('../assets/images/equipment4.webp'),
//  },
//  {
//    id: '5',
//    title: 'Equipment 5',
//    description: 'Cross trainer for low-impact cardio workouts',
//    image: require('../assets/images/equipment5.webp'),
//  },
//  {
//    id: '6',
//    title: 'Equipment 6',
//    description: 'Smith machine for safe weightlifting exercises',
//    image: require('../assets/images/equipment6.jpg'),
//  },
//  {
//    id: '7',
//    title: 'Equipment 7',
//    description: 'Cable machine for versatile resistance training',
//    image: require('../assets/images/equipment7.jpg'),
//  },
//  {
//    id: '8',
//    title: 'Equipment 8',
//    description: 'Leg press machine for lower body strength',
//    image: require('../assets/images/equipment8.webp'),
//  },
//  {
//    id: '9',
//    title: 'Equipment 9',
//    description: 'Dumbbells rack with various weight options',
//    image: require('../assets/images/equipment9.webp'),
//  },
//  {
//    id: '10',
//    title: 'Equipment 10',
//    description: 'Multi-functional power rack for strength training',
//    image: require('../assets/images/equipment10.jpg'),
//  },
//];
//
//const HomeScreen = () => {
//  const [items, setItems] = useState([]);
//  const [loading, setLoading] = useState(true);
//
//  // Zustand store hooks
//  const { clickCount, itemClicks, incrementClick } = useClickStore();
//  const user = useUserStore((state) => state.user);
//
//  useEffect(() => {
//    fetchItems();
//  }, []);
//
////  const fetchItems = async () => {
////    try {
////      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
////      const data = await response.json();
////      const transformedItems = data.slice(0, 10).map((item, index) => ({
////        id: index.toString(),
////        title: `Equipment ${item.id}`,
////        description: item.body.slice(0, 100),
////        status: getRandomStatus(),
////        lastUsed: getRandomTimeUsed(),
////        image: require('../assets/images/register.jpg'),
////      }));
////      setItems(transformedItems);
////    } catch (error) {
////      console.error('Error fetching data:', error);
////    } finally {
////      setLoading(false);
////    }
////  };
//
//const fetchItems = async () => {
//  try {
//    const transformedItems = equipmentData.map(item => ({
//      ...item,
//      status: getRandomStatus(),
//      lastUsed: getRandomTimeUsed(),
//    }));
//    setItems(transformedItems);
//  } catch (error) {
//    console.error('Error setting up items:', error);
//  } finally {
//    setLoading(false);
//  }
//};
//
//  const getRandomStatus = () => {
//    const statuses = ['Available', 'In Use', 'Maintenance'];
//    return statuses[Math.floor(Math.random() * statuses.length)];
//  };
//
//  const getRandomTimeUsed = () => {
//    const times = ['1 hour ago', '2 hours ago', '30 minutes ago', 'Currently in use', 'Under maintenance'];
//    return times[Math.floor(Math.random() * times.length)];
//  };
//
//  const getStatusColor = (status) => {
//    switch (status) {
//      case 'Available':
//        return '#4CAF50';
//      case 'In Use':
//        return '#2196F3';
//      case 'Maintenance':
//        return '#FF9800';
//      default:
//        return '#757575';
//    }
//  };
//
//  const handleItemClick = (itemId) => {
//    incrementClick(itemId);
//  };
//
//  if (loading) {
//    return (
//      <View style={styles.loadingContainer}>
//        <ActivityIndicator size="large" color="#007AFF" />
//      </View>
//    );
//  }
//
//  return (
//    <SafeAreaView style={styles.container}>
//      <View style={styles.header}>
//        <View>
//          <Text style={styles.headerTitle}>Equipment</Text>
//          <Text style={styles.welcomeText}>Welcome{user?.fullName ? `, ${user.fullName}` : ''}</Text>
//        </View>
//        <View style={styles.profileContainer}>
//          <TouchableOpacity style={styles.profileButton}>
//            <Ionicons name="person-circle-outline" size={wp('8%')} color="#007AFF" />
//          </TouchableOpacity>
//          <Text style={styles.profileNameText}>{user?.fullName || 'User'}</Text>
//        </View>
//      </View>
//
//      <ScrollView style={styles.scrollView}>
//        {items.map((item) => (
//          <TouchableOpacity
//            key={item.id}
//            style={styles.card}
//            onPress={() => handleItemClick(item.id)}
//          >
//            <Image
//              source={item.image}
//              style={styles.cardImage}
//              resizeMode="cover"
//            />
//            <View style={styles.cardContent}>
//              <View style={styles.cardHeader}>
//                <Text style={styles.cardTitle}>{item.title}</Text>
//                <View style={[styles.statusTag, { backgroundColor: getStatusColor(item.status) }]}>
//                  <Text style={styles.statusText}>{item.status}</Text>
//                </View>
//              </View>
//              <Text style={styles.cardDescription}>{item.description}</Text>
//              <View style={styles.cardFooter}>
//                <Ionicons name="time-outline" size={wp('4%')} color="#666" />
//                <Text style={styles.lastUsedText}>{item.lastUsed}</Text>
//                <Text style={styles.clickCountText}>
//                  Clicks: {itemClicks[item.id] || 0}
//                </Text>
//              </View>
//            </View>
//          </TouchableOpacity>
//        ))}
//      </ScrollView>
//
//      <TouchableOpacity style={styles.floatingCounter}>
//        <Text style={styles.counterText}>Total Clicks: {clickCount}</Text>
//      </TouchableOpacity>
//    </SafeAreaView>
//  );
//};
//
//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    backgroundColor: '#f5f5f5',
//  },
//  loadingContainer: {
//    flex: 1,
//    justifyContent: 'center',
//    alignItems: 'center',
//  },
//  header: {
//    flexDirection: 'row',
//    justifyContent: 'space-between',
//    alignItems: 'center',
//    padding: wp('4%'),
//    backgroundColor: '#fff',
//    borderBottomWidth: 1,
//    borderBottomColor: '#eee',
//  },
//  headerTitle: {
//    fontSize: wp('6%'),
//    fontWeight: 'bold',
//    color: '#333',
//  },
//  welcomeText: {
//    fontSize: wp('3.5%'),
//    color: '#666',
//    marginTop: hp('0.5%'),
//  },
//  profileContainer: {
//    alignItems: 'center',
//    justifyContent: 'center',
//  },
//  profileButton: {
//    padding: wp('2%'),
//  },
//  profileNameText: {
//    fontSize: wp('3%'),
//    color: '#666',
//    marginTop: wp('1%'),
//  },
//  scrollView: {
//    flex: 1,
//    padding: wp('4%'),
//  },
//  card: {
//    backgroundColor: '#fff',
//    borderRadius: wp('4%'),
//    marginBottom: wp('4%'),
//    shadowColor: '#000',
//    shadowOffset: {
//      width: 0,
//      height: 2,
//    },
//    shadowOpacity: 0.1,
//    shadowRadius: 4,
//    elevation: 3,
//  },
//  cardImage: {
//    width: '100%',
//    height: hp('25%'),
//    borderTopLeftRadius: wp('4%'),
//    borderTopRightRadius: wp('4%'),
//  },
//  cardContent: {
//    padding: wp('4%'),
//  },
//  cardHeader: {
//    flexDirection: 'row',
//    justifyContent: 'space-between',
//    alignItems: 'center',
//    marginBottom: wp('2%'),
//  },
//  cardTitle: {
//    fontSize: wp('4.5%'),
//    fontWeight: 'bold',
//    color: '#333',
//    flex: 1,
//  },
//  statusTag: {
//    paddingHorizontal: wp('3%'),
//    paddingVertical: wp('1%'),
//    borderRadius: wp('4%'),
//    marginLeft: wp('2%'),
//  },
//  statusText: {
//    color: '#fff',
//    fontSize: wp('3.5%'),
//    fontWeight: '600',
//  },
//  cardDescription: {
//    fontSize: wp('3.8%'),
//    color: '#666',
//    marginBottom: wp('2%'),
//  },
//  cardFooter: {
//    flexDirection: 'row',
//    alignItems: 'center',
//  },
//  lastUsedText: {
//    fontSize: wp('3.5%'),
//    color: '#666',
//    marginLeft: wp('1%'),
//  },
//  clickCountText: {
//    fontSize: wp('3.5%'),
//    color: '#666',
//    marginLeft: 'auto',
//  },
//  floatingCounter: {
//    position: 'absolute',
//    bottom: hp('3%'),
//    right: wp('4%'),
//    backgroundColor: '#007AFF',
//    padding: wp('4%'),
//    borderRadius: wp('10%'),
//    elevation: 5,
//    shadowColor: '#000',
//    shadowOffset: {
//      width: 0,
//      height: 2,
//    },
//    shadowOpacity: 0.25,
//    shadowRadius: 3.84,
//  },
//  counterText: {
//    color: '#fff',
//    fontSize: wp('4%'),
//    fontWeight: 'bold',
//  },
//});
//
//export default HomeScreen;
//
