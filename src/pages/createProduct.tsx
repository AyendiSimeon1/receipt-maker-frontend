import CreateProducts from '../components/createComponent';
const CreateProduct = () => {
    return(
        <><h1>Hello This is goood</h1>
        <CreateProducts onCreateProduct={function (_product: { _id: string; name: string; price: number; quantity: number; }): void {
                throw new Error('Function not implemented.');
            } }  />
        </>
        
    ) 
}

export default CreateProduct;