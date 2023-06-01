import { Datagrid, EmailField, List, TextField } from 'react-admin';

export const RestaurantList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
        </Datagrid>
    </List>
);