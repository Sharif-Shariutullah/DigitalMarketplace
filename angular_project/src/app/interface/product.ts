import { FileUpload } from 'src/app/interface/fileUpload';
import { ProductOPtions } from './productOption';


export interface Product{

    id: number;
    productName: string;

    longDesc: string;

    shortDesc: string;

    unitPrice: number;

    unitWeight: number;

    totalQuantity: number;

    currentStock: number;

    image: string;

    productOptions: ProductOPtions[];

    fileUploadList: FileUpload[];

}