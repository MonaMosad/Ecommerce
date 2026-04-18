// 
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from "../component/CartContext.jsx";
import { toast } from 'react-hot-toast';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState('');

    // Consume Context
    const { addToCart, addToFavorites, removeFromFavorites, favorites } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`https://dummyjson.com/products/${id}`);
                const data = await res.json();
                setProduct(data);
                setActiveImage(data.images[0]);
            } catch (error) {
                console.error("Error Fetching", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="text-center py-5">Loading...</div>;
    if (!product) return <div className="text-center py-5">Product not found</div>;

    const isFavorite = favorites.some(fav => fav.id === product.id);

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFromFavorites(product.id);
            toast.error("Removed from Wishlist");
        } else {
            addToFavorites(product);
            toast.success("Added to Wishlist");
        }
    };

    return (
        <div className="product-details-section py-5">
            <div className="container shadow-sm p-4 bg-white rounded-4">
                <div className="row g-5">
                    <div className="col-md-6">
                        <div className="main-image-preview mb-3 border rounded-3 overflow-hidden bg-light d-flex align-items-center justify-content-center" style={{ height: '450px' }}>
                            <img src={activeImage} className="img-fluid object-fit-contain h-100" alt={product.title} />
                        </div>
                        <div className="thumbnail-gallery d-flex gap-2 overflow-auto pb-2">
                            {product.images.map((image, index) => (
                                <div key={index} className="thumbnail-wrapper border rounded-2 p-1 bg-white" style={{ width: '80px', height: '80px', cursor: 'pointer' }} onClick={() => setActiveImage(image)}>
                                    <img src={image} className="img-fluid h-100 w-100 object-fit-contain" alt="thumbnail" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        <h1 className="display-6 fw-bold mb-3">{product.title}</h1>
                        <h2 className="text-primary fw-bold mb-4">${product.price}</h2>
                        <p className="text-muted mb-4 lead">{product.description}</p>

                        <div className="action-buttons mt-auto">
                            <button 
                                className="btn btn-primary btn-lg w-100 rounded-3 py-3 fw-bold shadow-sm mb-3"
                                onClick={() => { addToCart(product); toast.success("Added to Cart"); }}
                            >
                                <i className="bi bi-cart3 me-2"></i> Add to Cart
                            </button>
                            <button 
                                className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-secondary'} w-100 py-2`}
                                onClick={toggleFavorite}
                            >
                                <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'} me-2`}></i>
                                {isFavorite ? "In Wishlist" : "Add to Wishlist"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}