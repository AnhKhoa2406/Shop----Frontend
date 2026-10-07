import { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ShopContext = createContext();
export { ShopContext };

const removeVietnameseTones = (str = "") => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase().trim();
};

const getSavedWishlist = () => {
  try {
    const savedWishlist = localStorage.getItem("wishlist");
    if (!savedWishlist) return [];
    const parsedWishlist = JSON.parse(savedWishlist);
    if (!Array.isArray(parsedWishlist)) return [];
    return parsedWishlist.map((id) => String(id));
  } catch {
    return [];
  }
};

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [wishlist, setWishlist] = useState(() => getSavedWishlist());

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const addToCart = async (itemId, size, quantity = 1) => {
    if (!size) {
      toast.error("Vui lòng chọn kích cỡ");
      return;
    }

    const safeQuantity = Math.max(1, Number(quantity) || 1);
    const cartData = structuredClone(cartItems);

    if (!cartData[itemId]) cartData[itemId] = {};

    const currentQuantity = Number(cartData[itemId][size] || 0);
    const alreadyInCart = currentQuantity > 0;

    cartData[itemId][size] = safeQuantity;
    setCartItems(cartData);

    if (token) {
      try {
        if (!alreadyInCart) {
          await axios.post(backendUrl + "/api/cart/add", { itemId, size }, { headers: { token } });
        }

        await axios.post(backendUrl + "/api/cart/update", { itemId, size, quantity: safeQuantity }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || error.message);
      }
    }

    toast.success(alreadyInCart ? `Đã cập nhật số lượng thành ${safeQuantity}` : `Đã thêm ${safeQuantity} sản phẩm vào giỏ hàng`);
  };

  // Badge trên Navbar chỉ đếm số sản phẩm, không cộng quantity.
  // Ví dụ: 1 sản phẩm quantity 10 => badge = 1.
  // 2 sản phẩm quantity 10 và 3 => badge = 2.
  const getCartCount = () => {
    let totalCount = 0;

    for (const itemId in cartItems) {
      const hasQuantity = Object.values(cartItems[itemId] || {}).some((quantity) => Number(quantity) > 0);
      if (hasQuantity) totalCount += 1;
    }

    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const nextQuantity = Number(quantity);
    const cartData = structuredClone(cartItems);

    if (!cartData[itemId]) return;

    if (nextQuantity <= 0) {
      delete cartData[itemId][size];

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = nextQuantity;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(backendUrl + "/api/cart/update", { itemId, size, quantity: Math.max(0, nextQuantity) }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => String(product._id) === String(itemId));
      if (!itemInfo) continue;

      for (const size in cartItems[itemId]) {
        const quantity = Number(cartItems[itemId][size]);
        if (quantity > 0) totalAmount += Number(itemInfo.price) * quantity;
      }
    }

    return totalAmount;
  };

  const getUserCart = async (userToken) => {
    try {
      const response = await axios.post(backendUrl + "/api/cart/get", {}, { headers: { token: userToken } });
      if (response.data.success) setCartItems(response.data.cartData);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const addToWishlist = (productId) => {
    const id = String(productId);

    setWishlist((currentWishlist) => {
      if (currentWishlist.includes(id)) return currentWishlist;

      const nextWishlist = [...currentWishlist, id];
      localStorage.setItem("wishlist", JSON.stringify(nextWishlist));
      return nextWishlist;
    });
  };

  const removeFromWishlist = (productId) => {
    const id = String(productId);

    setWishlist((currentWishlist) => {
      const nextWishlist = currentWishlist.filter((wishlistId) => wishlistId !== id);
      localStorage.setItem("wishlist", JSON.stringify(nextWishlist));
      return nextWishlist;
    });
  };

  const toggleWishlist = (productId) => {
    const id = String(productId);

    setWishlist((currentWishlist) => {
      const isLiked = currentWishlist.includes(id);
      const nextWishlist = isLiked ? currentWishlist.filter((wishlistId) => wishlistId !== id) : [...currentWishlist, id];
      localStorage.setItem("wishlist", JSON.stringify(nextWishlist));
      return nextWishlist;
    });
  };

  const isInWishlist = (productId) => wishlist.includes(String(productId));

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.setItem("wishlist", JSON.stringify([]));
  };

  const getFilteredProducts = (baseList = products) => {
    if (!showSearch || !search.trim()) return baseList;

    const keyword = removeVietnameseTones(search);

    return baseList.filter((item) => {
      const haystack = removeVietnameseTones([item.name, item.description, item.category, item.subCategory].filter(Boolean).join(" "));
      return haystack.includes(keyword);
    });
  };

  const filteredProducts = useMemo(() => getFilteredProducts(products), [products, search, showSearch]);

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  useEffect(() => {
    if (token) {
      getUserCart(token);
    } else {
      setCartItems({});
    }
  }, [token]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === "wishlist") setWishlist(getSavedWishlist());
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    filteredProducts,
    getFilteredProducts,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    wishlist,
    setWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    navigate,
    backendUrl,
    token,
    setToken,
    getProductsData,
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
