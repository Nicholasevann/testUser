import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import getData from './src/database/getData';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const setDataUser = () => {
    if (firstName === '' && lastName === '' && email === '') {
      return Alert.alert('Gagal', 'silahkan isi data dengan benar');
    } else {
      return axios({
        method: 'post',
        url: 'https://dummyapi.io/data/v1/user/create',
        headers: {
          'app-id': '62c477f3d952010c9f48ef55',
        },
        data: {
          lastName: lastName,
          firstName: firstName,
          email: email,
        },
      }).then(function ({data}) {
        Alert.alert('Sukses', 'Data berhasil disimpan');
      });
    }
  };
  useEffect(() => {
    if (data === null) {
      getData().then(val => setData(val));
    }
  });
  const handleDelete = id => {
    axios({
      method: 'delete',
      url: 'https://dummyapi.io/data/v1/user/' + id,
      headers: {
        'app-id': '62c477f3d952010c9f48ef55',
      },
    }).then(function ({data}) {
      Alert.alert('Sukses', 'Data berhasil dihapus');
    });
  };
  if (data === null) {
    return <Text>Loading</Text>;
  }
  return (
    <SafeAreaView style={{flex: 1, padding: 10, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'black', fontSize: 24, marginBottom: 10}}>
            Data User
          </Text>
          <Text style={{color: 'black', fontSize: 16}}>Nama Depan</Text>
          <TextInput
            style={{borderBottomWidth: 1, width: '80%', marginBottom: 10}}
            onChangeText={val => setFirstName(val)}
          />
          <Text style={{color: 'black', fontSize: 16}}>Nama Belakang</Text>
          <TextInput
            style={{borderBottomWidth: 1, width: '80%', marginBottom: 10}}
            onChangeText={val => setLastName(val)}
          />
          <Text style={{color: 'black', fontSize: 16}}>Email</Text>
          <TextInput
            style={{borderBottomWidth: 1, width: '80%', marginBottom: 10}}
            onChangeText={val => setEmail(val)}
          />
          <TouchableOpacity
            style={{backgroundColor: 'green', padding: 10}}
            onPress={() => setDataUser()}>
            <Text>Tambah Data</Text>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 10,
              padding: 5,
              borderWidth: 1,
              flexDirection: 'row',
              width: '100%',
              backgroundColor: 'yellow',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text style={styles.title}>No</Text>
            </View>
            <View style={{flex: 3}}>
              <Text style={styles.title}>Image</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.title}>Ms/Mr</Text>
            </View>
            <View style={{flex: 2}}>
              <Text style={styles.title}>Name</Text>
            </View>
            <View style={{flex: 2}}>
              <Text style={styles.title}>Action</Text>
            </View>
          </View>
          {data.map((val, index) => {
            var no = index + 1;
            return (
              <View
                style={{
                  padding: 5,
                  borderWidth: 1,
                  flexDirection: 'row',
                  width: '100%',
                  backgroundColor: 'white',
                  borderTopColor: 'white',
                  alignItems: 'center',
                }}>
                <View style={{flex: 1}}>
                  <Text style={styles.title}>{no}</Text>
                </View>
                <View
                  style={{
                    flex: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: val.picture}}
                    style={{width: 80, height: 80}}
                  />
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.title}>{val.title}</Text>
                </View>
                <View style={{flex: 2}}>
                  <Text style={styles.title}>{val.firstName}</Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => handleDelete()}
                    style={{
                      backgroundColor: 'orange',
                      width: '100%',
                      justifyContent: 'center',
                      padding: 5,
                      alignItems: 'center',
                    }}>
                    <Text>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDelete(val.id)}
                    style={{
                      backgroundColor: 'red',
                      width: '100%',
                      justifyContent: 'center',
                      padding: 5,
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Text>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  title: {textAlign: 'center', fontSize: 14, color: 'black'},
});
