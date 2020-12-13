import React, {useContext, useEffect, useRef, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Center} from './Center';
import {Button, Text} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from './AuthProvider';
import faker from 'faker';
import {HomeParamList, HomeStackNavProps} from './HomeParamList';

interface HomeStackProps {}

function Feed({navigation}: HomeStackNavProps<'Feed'>) {
  return (
    <Center>
      <FlatList
        // eslint-disable-next-line react-native/no-inline-styles
        style={{width: '100%'}}
        renderItem={({item}) => {
          return (
            <Button
              title={item}
              onPress={() => {
                navigation.navigate('Product', {
                  name: item,
                });
              }}
            />
          );
        }}
        keyExtractor={(product, idx) => product + idx}
        data={Array.from(Array(50), () => faker.commerce.product())}
      />
    </Center>
  );
}

function Product({route, navigation}: HomeStackNavProps<'Product'>) {
  return (
    <Center>
      <Text>{route.params.name}</Text>
      <Button
        title="Edit this product"
        onPress={() =>
          navigation.navigate('EditProduct', {
            name: route.params.name,
          })
        }
      />
    </Center>
  );
}

function apiCall(x: any) {
  return x;
}

function EditProduct({route, navigation}: HomeStackNavProps<'EditProduct'>) {
  const [formState] = useState();
  const submit = useRef(() => {});

  submit.current = () => {
    // api call with new form state
    apiCall(formState);
    console.log('\nRun you fools, apiCall done \nGANDALF');
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setParams({submit});
  }, []);

  return (
    <Center>
      <Text>Editing {route.params.name}...</Text>
    </Center>
  );
}

const Stack = createStackNavigator<HomeParamList>();

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  const {logout} = useContext(AuthContext);

  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen
        name="Feed"
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  logout();
                }}>
                <Text>LOGOUT</Text>
              </TouchableOpacity>
            );
          },
        }}
        component={Feed}
      />
      <Stack.Screen
        options={({route}) => ({
          headerTitle: `Product: ${route.params.name}`,
        })}
        name="Product"
        component={Product}
      />
      <Stack.Screen
        options={({route}) => ({
          headerTitle: `Edit: ${route.params.name}`,
          headerRight: () => (
            <TouchableOpacity
              // eslint-disable-next-line react-native/no-inline-styles
              style={{paddingRight: 10}}
              onPress={() => {
                // submit info
                route.params.submit?.current();
              }}>
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{color: 'green'}}>
                DONE
              </Text>
            </TouchableOpacity>
          ),
        })}
        name="EditProduct"
        component={EditProduct}
      />
    </Stack.Navigator>
  );
};
