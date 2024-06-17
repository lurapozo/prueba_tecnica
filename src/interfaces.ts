interface Producto {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    tags: string[];
    brand: string;
    images: string[];
    sku: string;
    reviews: Reviews[];
    thumbnail: string;
}

interface Reviews {
    comment: string;
}
