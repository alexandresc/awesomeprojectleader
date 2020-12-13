import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SearchParamList, SearchStackNavProps} from './SearchParamList';
import {Center} from './Center';
import {Button, FlatList, Text} from 'react-native';
import faker from 'faker';

interface SearchStackProps {}

const Stack = createStackNavigator<SearchParamList>();

function Search({navigation}: SearchStackNavProps<'Search'>) {
  const [show, setShow] = useState(false);

  return (
    <Center>
      <Button
        title="Search Products"
        onPress={() => {
          setShow(true);
        }}
      />
      <Text>Search</Text>
      {show ? (
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
      ) : null}
    </Center>
  );
}

export const SearchStack: React.FC<SearchStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};
