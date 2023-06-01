
import { Admin, Resource, EditGuesser, ShowGuesser } from 'react-admin';
import { dataProvider } from './dataProvider';
import { authProvider } from './authProvider';

import {RestaurantList} from './restaurants'


export const App = () => (
    <Admin
        dataProvider={dataProvider}
		authProvider={authProvider}
	>
        <Resource name="restaurants" list={RestaurantList} />
    </Admin>
);

    