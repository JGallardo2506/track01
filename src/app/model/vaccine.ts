export interface Vaccine {
    id?: number; 
    nameVaccine: string;
    typeVaccine: string;
    description: string;
    manufacturingDate: string | Date;
    expirationDate: string | Date;
    price: string;
    stock: string;
    active: string| null; 

}
