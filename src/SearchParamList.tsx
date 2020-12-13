import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type SearchParamList = {
  Search: undefined;
  Product: {
    name: string;
  };
  EditProduct: {
    name: string;
    submit?: React.MutableRefObject<() => void>;
  };
};

export type SearchStackNavProps<T extends keyof SearchParamList> = {
  navigation: StackNavigationProp<SearchParamList, T>;
  route: RouteProp<SearchParamList, T>;
};
