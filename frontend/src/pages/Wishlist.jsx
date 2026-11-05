import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";
import { HiOutlineHeart } from "react-icons/hi";

const Wishlist = () => {
  const { wishlistItems } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div className="w-full max-w-full px-6 sm:px-10 lg:px-16 py-20 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-dark-card mb-6">
          <HiOutlineHeart className="w-12 h-12 text-text-muted" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Your wishlist is empty
        </h2>
        <p className="text-text-secondary mb-8">Save items you like to view them later.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full px-6 sm:px-10 lg:px-16 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-primary/10">
          <HiOutlineHeart className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-text-primary">My Wishlist</h1>
          <p className="text-sm text-text-secondary">
            {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
