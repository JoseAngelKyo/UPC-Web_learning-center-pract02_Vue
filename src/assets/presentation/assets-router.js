const equipmentAssetForm = () =>
    import('./views/equipment-asset-form.vue');

const assetsRoutes = [
    {
        path: 'equipment/assignments/new',
        name: 'assets-equipment-assignment-new',
        component: equipmentAssetForm,
        meta: {
            title: 'Manage Equipment Asset Assignment'
        }
    }
];

export default assetsRoutes;