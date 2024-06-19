import React, { useState, useEffect, useRef } from 'react';
// import ReactDOM from 'react-dom';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
// import 'primeflex/primeflex.css';
import '../../index.css';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
// import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
// import './DataTableDemo.css';
import { Updateproall, delprodata, getproductall, manydelprodata, productcrated } from '../../Services/ProductService/ProductService';
import { Dropdown } from 'primereact/dropdown';

const ProductCrud = () => {
  const emptyProduct = {
    id: null,
    name: '',
    image: null,
    description: '',
    category: null,
    price: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: 'INSTOCK'
  };


 



  

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  
  // const productService = new ProductService();
  const [categories, setCategories] = useState([
  { name: 'Briyani', code: 'BRIYANI' },
  { name: 'Rice', code: 'RICE' },
  { name: 'Fride Rice', code: 'FRIDE RICE' },
  { name: 'Veg Rice', code: 'VEG RICE' },
  ]);

  // const getalldata = async (e) => {
   
  //   const response=await getproductall();
  //   console.log(response)
  // }

  useEffect(() => {
    getproductall().then((data) => setProducts(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };

  const openNew = () => {
    // const allprodu=productget()
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };
 

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = async() => {
    setSubmitted(true);

    if (product.name.trim()) {
      let _products = products ? [...products] : [];
      let _product = { ...product };

      if (product.id) {
          const index = findIndexById(product.id);
          _products[index] = _product;
          const upid=_products[index].id;
          const updata=_products[index];
          const data={id : upid, updata:updata}
          const proupd=await Updateproall(data);

          toast.current.show({
              severity: 'success',
              summary: 'Successful',
              detail: 'Product Updated',
              life: 3000
          });
      } else {
          _product.id = createId();
          // productcrated(_product); // Assuming this is a function to handle the product creation on the backend
          const res=await productcrated(_product);
          console.log(res);
          _products.push(res);
          toast.current.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Created',
            life: 3000
          });
          
      }

      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
  }
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = async() => {
    
    const res=await delprodata(product._id);
    console.log(res);
    let _products = products.filter((val) => val.id !== product.id);
    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Product Deleted',
      life: 3000
    });
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = '';
    let chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const importCSV = (e) => {
    const file = e.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target.result;
      const data = csv.split('\n');

      // Prepare DataTable
      const cols = data[0].replace(/['"]+/g, '').split(',');
      data.shift();

      const importedData = data.map((d) => {
        d = d.split(',');
        const processedData = cols.reduce((obj, c, i) => {
          c =
            c === 'Status'
              ? 'inventoryStatus'
              : c === 'Reviews'
              ? 'rating'
              : c.toLowerCase();
          obj[c] = d[i].replace(/['"]+/g, '');
          (c === 'price' || c === 'rating') && (obj[c] = parseFloat(obj[c]));
          return obj;
        }, {});

        processedData['id'] = createId();
        return processedData;
      });

      const _products = [...products, ...importedData];

      setProducts(_products);
    };

    reader.readAsText(file, 'UTF-8');
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = async() => {
    let _products = products.filter((val) => !selectedProducts.includes(val));
    const selprodet=selectedProducts.map(products=>products._id);
    console.log(selprodet);
    const manydel=await manydelprodata(selprodet);
    console.log(manydel);
    
    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Products Deleted',
      life: 3000
    });
  };

  const onCategoryChange = (e) => {
    let _product = { ...product };
    _product['category'] = e.value;
    setProduct(_product);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New"
          icon="pi pi-plus"
          className="mr-2 border py-[5px] px-[10px] bg-[#E24622] text-[#fff] hover:bg-[#fff] hover:text-[#E24622] hover:border-[#E24622]"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="border py-[5px] px-[10px] bg-[#E24622] text-[#fff] hover:bg-[#fff] hover:text-[#E24622] hover:border-[#E24622]"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        />
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <FileUpload
          mode="basic"
          name="demo[]"
          auto
          url="https://primefaces.org/primereact/showcase/upload.php"
          accept=".csv"
          chooseLabel="Import"
          className="mr-2 inline-block"
          onUpload={importCSV}
        />
        <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
        />
      </React.Fragment>
    );
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`https://www.primefaces.org/primereact/images/product/${rowData.image}`}
        onError={(e) =>
          (e.target.src =
            'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
        }
        alt={rowData.image}
        className="product-image"
      />
    );
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span
        className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}
      >
        {rowData.inventoryStatus}
      </span>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-info p-mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="flex justify-center bg-transparent lato-bold text-[25px]">Manage Products</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search pl-[10px]" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Global Search"
          className="py-[10px] px-[40px] border"
        />
      </span>
    </div>
  );

  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveProduct}
      />
    </React.Fragment>
  );

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );

  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );

  return (
    <div className="datatable-crud-demo bocont">
      <Toast ref={toast} />

      <div className="card">
        <Toolbar
          className="p-mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={products}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
          className="p-datatable-customers protab"
          emptyMessage="No products found"
        >
          <Column className='selecttoo' selectionMode="multiple" headerStyle={{ width: '3rem'}} />
          <Column
            field="name"
            header="Name"
            sortable
            filter
            filterPlaceholder="Search by name"
          />
          <Column
            header="Image"
            body={imageBodyTemplate}
            filter={false}
          />
          <Column
            field="price"
            header="Price"
            body={priceBodyTemplate}
            sortable
            filter
            filterPlaceholder="Search by price"
          />
          <Column
            field="category"
            header="Category"
            sortable
            filter
            filterPlaceholder="Search by category"
          />
          <Column
            header="Rating"
            body={ratingBodyTemplate}
            sortable
            filter
            filterPlaceholder="Search by rating"
          />
          <Column
            header="Inventory Status"
            body={statusBodyTemplate}
            sortable
            filter
            filterPlaceholder="Search by status"
          />
          <Column body={actionBodyTemplate} />
        </DataTable>
      </div>

      <Dialog
        visible={productDialog}
        style={{ width: '450px' }}
        header="Product Details"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="p-field addcont">
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            value={product.name}
            onChange={(e) => onInputChange(e, 'name')}
            required
            autoFocus
            className={classNames({
              'p-invalid': submitted && !product.name
            })}
          />
          {submitted && !product.name && (
            <small className="p-error">Name is required.</small>
          )}
        </div>
        <div className="p-field addcont">
          <label htmlFor="description">Description</label>
          <InputTextarea
            id="description"
            value={product.description}
            onChange={(e) => onInputChange(e, 'description')}
            required
            rows={3}
            autoResize
          />
        </div>
        <div className="p-field addcont">
          <label htmlFor="category">Category</label>
          <Dropdown
            id="category"
            value={product.category}
            options={categories}
            onChange={onCategoryChange}
            optionLabel="name"
            optionValue="code"
          />
        </div>
        <div className="p-field addcont">
          <label htmlFor="price">Price</label>
          <InputNumber
            id="price"
            value={product.price}
            onValueChange={(e) => onInputNumberChange(e, 'price')}
            mode="currency"
            currency="USD"
            locale="en-US"
          />
        </div>
        <div className="p-field addcont">
          <label htmlFor="quantity">Quantity</label>
          <InputNumber
            id="quantity"
            value={product.quantity}
            onValueChange={(e) => onInputNumberChange(e, 'quantity')}
          />
        </div>
        <div className="p-field addcont">
          <label htmlFor="rating">Rating</label>
          <Rating
            id="rating"
            value={product.rating}
            onChange={(e) => onInputNumberChange(e, 'rating')}
            stars={5}
          />
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
          {product && (
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default ProductCrud;