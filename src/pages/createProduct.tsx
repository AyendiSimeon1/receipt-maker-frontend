import CreateProducts from '../components/createComponent';

const CreateProductPage = () => {
    const handleCreateProduct = (product: any) => {
        // Here you can handle the newly created product, such as adding it to a state or updating a list
        console.log('Product created:', product);
    };

    return (
        <>
            <CreateProducts onCreateProduct={handleCreateProduct} />
        </>
    );
}

export default CreateProductPage;
