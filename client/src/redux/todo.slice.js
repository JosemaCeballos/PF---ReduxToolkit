import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: [],
  allProduct: [],
  brands: [],
  category: [],
  productDetail: [],
  productsDeleted: [],
  createProductMsg: "",
  productChangedMsg: "",
  searchProductMsg: "",
  categoryDetails: [],
  cart: [],
  users: [],
  userInfo: {},
  userNotFound: "",
  createUserMsg: "",
  quantity: 0,
  favorites: [],
  favoriteMsg: "",
  admin: false,
  paymentLink: "",
  msg: "",
  allOrders: "",
  orderItem: "",
  build: [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setAllProducts(state, action) {
      return {
        ...state,
        product: action.payload,
        allProduct: action.payload,
        productDetail: [],
        createProductMsg: "",
        searchProductMsg: "",
        productChangedMsg: "",
      };
    },
    setGetProductById(state, action) {
      return {
        ...state,
        productDetail: [action.payload],
      };
    },
    setErrorGetProductById(state, action) {
      return {
        ...state,
        searchProductMsg: action.payload,
      };
    },
    setCreateProduct(state, action) {
      return {
        ...state,
        createProductMsg: action.payload,
      };
    },
    setErrorCreateProduct(state, action) {
      return {
        ...state,
        createProductMsg: action.payload,
      };
    },
    setGetProductByName(state, action) {
      return {
        ...state,
        product: action.payload,
        searchProductMsg: "",
      };
    },
    setErrorGetProductByName(state, action) {
      return {
        ...state,
        searchProductMsg: action.payload,
      };
    },
    setPutProduct(state, action) {
      return {
        ...state,
        productChangedMsg: action.payload,
      };
    },
    setErrorPutProduct(state, action) {
      return {
        ...state,
        productChangedMsg: action.payload,
      };
    },
    setDeleteProduct(state, action) {
      return {
        ...state,
        productDeletedMsg: action.payload,
      };
    },
    setRestoreProduct(state, action) {
      return {
        ...state,
        productChangedMsg: action.payload,
      };
    },
    setGetProductDeleted(state, action) {
      return {
        ...state,
        productsDeleted: action.payload,
      };
    },
    setErrorGetProductDeleted(state, action) {
      return {
        ...state,
        msgProductDeleted: action.payload,
      };
    },
    setCreateDiscount(state, action) {
      return {
        ...state,
      };
    },
    setErrorCreateDiscount(state, action) {
      return {
        ...state,
        createProductMsg: action.payload,
      };
    },
    setPutDiscount(state, action) {
      return {
        ...state,
      };
    },
    setPutInventory(state, action) {
      return {
        ...state,
      };
    },
    setGetCategoryDetails(state, action) {
      return {
        ...state,
        categoryDetails: action.payload,
      };
    },
    setGetAllUsers(state, action) {
      return {
        ...state,
        users: action.payload,
        createUserMsg: "",
      };
    },
    setDeleteUser(state, action) {
      return {
        ...state,
        msg: action.payload,
      };
    },
    setErrorDeleteUser(state, action) {
      return {
        ...state,
        userNotFound: action.payload,
      };
    },
    setCreateUser(state, action) {
      return {
        ...state,
        createUserMsg: action.payload,
        userNotFound: "",
      };
    },
    setErrorCreateUser(state, action) {
      return {
        ...state,
        createUserMsg: action.payload,
      };
    },
    setUserSpecific(state, action) {
      return {
        ...state,
        userInfo: action.payload,
        createUserMsg: "",
      };
    },
    setErrorUserSpecific(state, action) {
      return {
        ...state,
        userNotFound: action.payload,
      };
    },
    setUserAdmin(state, action) {
      return {
        ...state,
        admin: action.payload,
      };
    },
    setAddFavorite(state, action) {
      return {
        ...state,
        favoriteMsg: action.payload,
      };
    },
    setErrorAddFavorite(state, action) {
      return {
        ...state,
      };
    },
    setGetFavorites(state, action) {
      return {
        ...state,
        favorites: action.payload.products,
      };
    },
    setDeleteFavorite(state, action) {
      return {
        ...state,
        favoriteMsg: action.payload,
      };
    },
    setPay(state, action) {
      return {
        ...state,
        paymentLink: action.payload["init_point"],
      };
    },
    setGetAllOrders(state, action) {
      return {
        ...state,
        allOrders: action.payload,
      };
    },
    setGetOrderById(state, action) {
      return {
        ...state,
        orderItem: action.payload,
      };
    },
    setDeletOrderItem(state, action) {
      return {
        ...state,
      };
    },
    setAddOrder(state, action) {
      return {
        ...state,
        msg: action.payload,
      };
    },
    allBrands(state, action) {
      const allBrand = state.allProduct.map((e) => e.brand);
      const allBrands2 = [...new Set(allBrand)];
      state.brands = allBrands2;
    },
    allCategories(state, action) {
      const allCategory = state.allProduct.map((e) => e.categoryName);
      const allCategory2 = [...new Set(allCategory)];
      state.category = allCategory2;
    },
    filter1(state, action) {
      let temporal = state.allProduct;
      let filtered = temporal.filter((e) => e.categoryName === action.payload);

      if (action.payload === "") {
        filtered = state.allProduct;
      }
      state.searchProductMsg = "";
      state.product = filtered;
    },
    setFilterbyDetails(state, action) {
      let temporal2 = state.allProduct;

      let filtered2 = temporal2.filter(
        (e) => e.categoryName === action.payload[0]
      );

      if (action.payload[0] === "") {
        filtered2 = state.allProduct;
      }

      for (const property in action.payload[1]) {
        filtered2 = filtered2.filter(
          (e) => e.details[0][property] === action.payload[1][property]
        );
      }
      state.searchProductMsg = "";
      state.product = filtered2;
    },
    addToCart(state, action) {
      let prod = state.allProduct.find((e) => e.id === action.payload);
      let foundProd = state.cart.find((e) => e.id === action.payload);
      if (foundProd) {
        foundProd.quantity++;
      } else {
        prod.quantity = 1;
      }
      state.cart = prod.quantity === 1 ? state.cart.concat(prod) : state.cart;
    },
    deleteP(state, action) {
      let cart1 = state.cart.filter((e) => e.id !== action.payload);
      state.cart = cart1;
    },
    updateCartQuantity(state, action) {
      let cartQuantity = 0;
      for (let i = 0; i < state.cart.length; i++) {
        cartQuantity = cartQuantity + state.cart[i].quantity;
      }
      state.quantity = cartQuantity;
    },
    increaseProductQuantity(state, action) {
      let product = state.cart.find((e) => e.id === action.payload);
      product.quantity = product.quantity + 1;
      state.quantity = state.quantity + 1;
    },
    decreaseProductQuantity(state, action) {
      let product2 = state.cart.find((e) => e.id === action.payload);

      if (product2.quantity > 1) {
        product2.quantity = product2.quantity - 1;
      }
      let cartQuantity1 = 0;
      for (let i = 0; i < state.cart.length; i++) {
        cartQuantity1 = cartQuantity1 + state.cart[i].quantity;
      }
      state.quantity = cartQuantity1;
    },
    clearCart(state, action) {
      return {
        ...state,
        cart: [],
        quantity: 0,
      };
    },
    orderByPrice(state, action) {
      const orderByPri =
        action.payload === "Asc"
          ? state.product.sort((a, b) => {
              if (a.price - b.price < 0) return 1;
              else return -1;
            })
          : action.payload === "Dsc"
          ? state.product.sort((a, b) => {
              if (a.price - b.price > 0) return 1;
              else return -1;
            })
          : action.payload === "default"
          ? state.product.sort((a, b) => {
              if (a.id - b.id > 0) return 1;
              else return -1;
            })
          : "";
      state.product = orderByPri;
    },
    logoutUser(state, action) {
      return {
        ...state,
        userInfo: [],
      };
    },
    clearProdMsg(state, action) {
      return {
        ...state,
        createProductMsg: "",
        productChangedMsg: "",
      };
    },
    clearFavMsg(state, action) {
      return {
        ...state,
        favoriteMsg: "",
      };
    },
    clearFavSate(state, action) {
      return {
        ...state,
        favorites: [],
      };
    },
    clearDeleted(state, action) {
      let detedProduct = state.productsDeleted.filter(
        (e) => e.id !== action.payload
      );
      state.productsDeleted = detedProduct;
    },
    clearPaylink(state, action) {
      return {
        ...state,
        paymentLink: "",
      };
    },
    addToBuild(state, action) {
      let toAdd = {};
      if (typeof action.payload === "number") {
        toAdd = state.allProduct.find((e) => e.id === action.payload);
        toAdd.quantity = 1;
      } else {
        toAdd["name"] = action.payload;
      }
      state.build = [...state.build, toAdd];
    },
    deleteFromBuild(state, action) {
      let temporal5 = state.build;
      temporal5.pop();
      state.build = temporal5;
    },
    byoToCart(state, action) {
      let temporal6 = action.payload;
      temporal6.shift();
      state.cart = [...state.cart, ...temporal6];
    },
    clearBYO(state, action) {
      return {
        ...state,
        build: [],
      };
    },
  },
});

const {
  setAllProducts,
  setGetProductById,
  setErrorGetProductById,
  setCreateProduct,
  setErrorCreateProduct,
  setGetProductByName,
  setErrorGetProductByName,
  setPutProduct,
  setErrorPutProduct,
  setDeleteProduct,
  setRestoreProduct,
  setGetProductDeleted,
  setErrorGetProductDeleted,
  setCreateDiscount,
  setErrorCreateDiscount,
  setPutDiscount,
  setPutInventory,
  setGetCategoryDetails,
  setGetAllUsers,
  setDeleteUser,
  setErrorDeleteUser,
  setCreateUser,
  setErrorCreateUser,
  setUserSpecific,
  setErrorUserSpecific,
  setUserAdmin,
  setAddFavorite,
  setErrorAddFavorite,
  setGetFavorites,
  setDeleteFavorite,
  setPay,
  setDeletOrderItem,
  setAddOrder,
  setGetAllOrders,
  setGetOrderById,
  setFilterbyDetails,
} = todoSlice.actions;

export const {
  allBrands,
  allCategories,
  filter1,
  addToCart,
  deleteP,
  updateCartQuantity,
  increaseProductQuantity,
  decreaseProductQuantity,
  clearCart,
  orderByPrice,
  logoutUser,
  clearProdMsg,
  clearFavMsg,
  clearFavSate,
  clearDeleted,
  clearPaylink,
  addToBuild,
  deleteFromBuild,
  byoToCart,
  clearBYO,
} = todoSlice.actions;

export const getProduct = () => {
  return async function (dispatch) {
    let product = await axios.get("/product");
    return dispatch(setAllProducts(product.data));
  };
};

export const getProductById = (id) => {
  return async function (dispatch) {
    try {
      let productById = await axios.get(`/product/${id}`);
      return dispatch(setGetProductById(productById.data));
    } catch (error) {
      return dispatch(setErrorGetProductById(error.response.data.error));
    }
  };
};

export const createProduct = (product, token) => {
  return async function (dispatch) {
    try {
      const createProdu = await axios.post("/product", product, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch(setCreateProduct(createProdu.data));
    } catch (error) {
      return dispatch(setErrorCreateProduct(error.response.data));
    }
  };
};

export const getProductByName = (name) => {
  return async function (dispatch) {
    try {
      let productByName = await axios.get(`/product?name=${name}`);

      return dispatch(setGetProductByName(productByName.data));
    } catch (error) {
      return dispatch(setErrorGetProductByName(error.response.data));
    }
  };
};

export const putProductById = (id, product, token) => {
  return async function (dispatch) {
    try {
      const putProduct = await axios.put(`/product/${id}`, product, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch(setPutProduct(putProduct.data));
    } catch (error) {
      return dispatch(setErrorPutProduct(error.response.data));
    }
  };
};

export const deleteProdut = (id, token) => {
  return async function (dispatch) {
    const deleteProduct = await axios.delete(`/product/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return dispatch(setDeleteProduct(deleteProduct.data));
  };
};

export const restoreProduct = (id, token) => {
  return async function (dispatch) {
    let restoreProduct = await axios.put(
      `/product/restore/${id}`,
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return dispatch(setRestoreProduct(restoreProduct.data));
  };
};

export const getProductDeleted = (token) => {
  return async function (dispatch) {
    try {
      const allProductDelete = await axios.get("/product/deleted", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch(setGetProductDeleted(allProductDelete.data));
    } catch (error) {
      return dispatch(setErrorGetProductDeleted(error.response.data));
    }
  };
};

export const createDiscount = (product, token) => {
  return async function (dispatch) {
    try {
      const createDiscount = await axios.post("/discount", product, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch(setCreateDiscount(createDiscount.data));
    } catch (error) {
      return dispatch(setErrorCreateDiscount(error.response.error.data));
    }
  };
};

export const putDiscount = (product, token) => {
  return async function (dispatch) {
    const putInventory = await axios.put("/discount/", product, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return dispatch(setPutDiscount(putInventory.data));
  };
};

export const putInventory = (id, product, token) => {
  return async function (dispatch) {
    const putInventory = await axios.put(`/inventory/${id}`, product, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return dispatch(setPutInventory(putInventory.data));
  };
};

export const getCategoryDetails = (category) => {
  return async function (dispatch) {
    const categoryDetails = await axios.get(`/categoryDetails/${category}`);
    return dispatch(setGetCategoryDetails(categoryDetails.data));
  };
};

export const getAllUsers = (token) => {
  return async function (dispatch) {
    let allUsers = await axios.get("/user/all", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return dispatch(setGetAllUsers(allUsers.data));
  };
};
export const deleteUser = (token, id) => {
  return async function (dispatch) {
    try {
      let msg = await axios.delete(`/user/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch(setDeleteUser(msg.data));
    } catch (error) {
      return dispatch(setErrorDeleteUser(error.response.data.error));
    }
  };
};
export const createUser = (newUser, token) => {
  return async function (dispatch) {
    try {
      let createUser = await axios.post("/user", newUser, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch(setCreateUser(createUser.data));
    } catch (error) {
      return dispatch(setErrorCreateUser(error.response.data.error));
    }
  };
};

export const userSpecific = (userFound, token) => {
  return async function (dispatch) {
    try {
      let userSpeci = await axios.get(`/user?email=${userFound}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch(setUserSpecific(userSpeci.data));
    } catch (error) {
      return dispatch(setErrorUserSpecific(error.response.data.error));
    }
  };
};

export const userAdmin = (user, token) => {
  return async function (dispatch) {
    axios
      .get(`/user/admin?email=${user}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        return dispatch(setUserAdmin(data.data)).catch((error) => {
          return dispatch(setErrorUserSpecific(error.response.data.error));
        });
      });
  };
};

export const addFavorite = (ids, token) => {
  return async function (dispatch) {
    try {
      let favorite = await axios.post("/favorite", ids, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch(setAddFavorite(favorite.data));
    } catch (error) {
      return dispatch(setErrorAddFavorite(error.response.data.error));
    }
  };
};

export const getFavorites = (userId, token) => {
  return async function (dispatch) {
    try {
      let favorites = await axios.get(`/favorite/${userId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch(setGetFavorites(favorites.data));
    } catch (error) {
      return dispatch(setErrorAddFavorite(error.response.data.error));
    }
  };
};

export const deleteFavorite = (ids, token) => {
  return async function (dispatch) {
    try {
      let favorite2 = await axios.delete(
        `/favorite/${ids.userId}/${ids.productId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return dispatch(setDeleteFavorite(favorite2.data));
    } catch (error) {
      return dispatch(setErrorAddFavorite(error.response.data.error));
    }
  };
};

export const pay = (payData, token) => {
  return async function (dispatch) {
    try {
      let payLink = await axios.post("/payment/", payData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch(setPay(payLink.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deletOrderItem = (id, token) => {
  return async function (dispatch) {
    let deleteOrder = await axios.delete(`/orderItems/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return dispatch(setDeletOrderItem(deleteOrder.data));
  };
};

export const addOrder = (userId, productId, quantity, token) => {
  return async function (dispatch) {
    let msg = await axios.post(
      "/orderItems",
      { userId, productId, quantity },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return dispatch(setAddOrder(msg.data));
  };
};

export const getAllOrders = (token) => {
  return async function (dispatch) {
    let ordersItems = await axios.get("/orderItems", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return dispatch(setGetAllOrders(ordersItems.data));
  };
};

export const getOrderById = (id, token) => {
  return async function (dispatch) {
    let ordersItem = await axios.get(`/orderItems/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return dispatch(setGetOrderById(ordersItem.data));
  };
};

export const filterbyDetails = (category, details) => {
  return setFilterbyDetails([category, details]);
};

export default todoSlice.reducer;
