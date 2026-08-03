const { Response } = require('./wrappers/Response');

// Ecommerce Models - Entities
const { IProduct } = require('./models/Ecommerce/entities/Product');
const { IOrder, IOrderItem, IShippingAddress } = require('./models/Ecommerce/entities/Order');
const { ICart, ICartItem } = require('./models/Ecommerce/entities/Cart');

// Ecommerce Models - Requests
const { 
  IGetProductsRequest, 
  ICreateProductRequest, 
  IUpdateProductRequest 
} = require('./models/Ecommerce/requests/ProductRequests');

const { 
  IAddToCartRequest, 
  IUpdateCartItemRequest, 
  IRemoveFromCartRequest 
} = require('./models/Ecommerce/requests/CartRequests');

const { 
  ICreateOrderRequest, 
  IShippingAddressRequest,
  IGetOrdersRequest 
} = require('./models/Ecommerce/requests/OrderRequests');

// Ecommerce Models - Responses
const { IProductResponse, IProductsListResponse } = require('./models/Ecommerce/responses/ProductResponses');
const { ICartResponse, ICartItemResponse } = require('./models/Ecommerce/responses/CartResponses');
const { IOrderResponse, IOrderItemResponse, IShippingAddressResponse } = require('./models/Ecommerce/responses/OrderResponses');

module.exports = { 
  // Wrapper
  Response,
  
  // Entities
  IProduct,
  IOrder,
  IOrderItem,
  IShippingAddress,
  ICart,
  ICartItem,
  
  // Requests
  IGetProductsRequest,
  ICreateProductRequest,
  IUpdateProductRequest,
  IAddToCartRequest,
  IUpdateCartItemRequest,
  IRemoveFromCartRequest,
  ICreateOrderRequest,
  IShippingAddressRequest,
  IGetOrdersRequest,
  
  // Responses
  IProductResponse,
  IProductsListResponse,
  ICartResponse,
  ICartItemResponse,
  IOrderResponse,
  IOrderItemResponse,
  IShippingAddressResponse
};
