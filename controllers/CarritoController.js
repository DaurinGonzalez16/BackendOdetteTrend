import { ModelGaming } from "../models/GamingModel.js";
import { ModaModel } from "../models/ModaModel.js";
import { Cart, CartItem, CartItemModa } from "../models/CartModel.js";

export const ConseguirCarrito = async (req, res) => {
  try {
    const { userId } = req.params;

    const cartItems = await CartItem.findAll({
      where: { "$Cart.user_id$": userId },
      include: [
        {
          model: ModelGaming,
          attributes: ["id", "name", "price", "image_url"],
        },
        {
          model: Cart,
          attributes: [],
        },
      ],
    });

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const AnadirCarrito = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Verificar si el usuario tiene un carrito existente
    let userCart = await Cart.findOne({
      where: { user_id: userId },
    });

    if (!userCart) {
      // Si no hay un carrito existente, crea uno
      userCart = await Cart.create({
        user_id: userId,
      });
    }

    // Verificar si el producto ya está en el carrito
    let cartItem = await CartItem.findOne({
      where: { cart_id: userCart.id, product_id: productId },
    });

    if (cartItem) {
      // Si ya existe, actualiza la cantidad
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Si no existe, crea un nuevo registro en el carrito
      await CartItem.create({
        cart_id: userCart.id,
        product_id: productId,
        quantity,
      });
    }

    // Obtener y devolver los elementos actualizados del carrito
    const updatedCartItems = await CartItem.findAll({
      where: { cart_id: userCart.id },
    });

    res.json(updatedCartItems);
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    res.status(500).json({ message: error.message });
  }
};

export const DisminuirCantidad = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Busca el carrito del usuario
    const cartItem = await CartItem.findOne({
      where: { "$cart.user_id$": userId, product_id: productId },
      include: [{ model: Cart }],
    });

    if (!cartItem) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado en el carrito." });
    }

    // Disminuye la cantidad
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      await cartItem.save();
    } else {
      // Si la cantidad es 1, elimina el artículo del carrito
      await cartItem.destroy();
    }

    // Retorna el carrito actualizado
    const updatedCartItems = await CartItem.findAll({
      where: { "$cart.user_id$": userId },
      include: [{ model: Cart }],
    });

    res.json(updatedCartItems);
  } catch (error) {
    console.error("Error al disminuir la cantidad del producto:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const RemoverCarrito = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cartItem = await CartItem.findOne({
      where: { "$cart.user_id$": userId, product_id: productId },
      include: [{ model: Cart }],
    });

    if (!cartItem) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado en el carrito." });
    }

    await cartItem.destroy();
    const updatedCartItems = await CartItem.findAll({
      where: { "$cart.user_id$": userId },
      include: [{ model: Cart }],
    });

    res.json(updatedCartItems);
  } catch (error) {
    console.error("Error al eliminar el producto del carrito:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const RemoverTodoCarrito = async (req, res) => {
  try {
    const { userId } = req.params;

    // Busca el carrito del usuario
    const userCart = await Cart.findOne({
      where: { user_id: userId },
    });

    if (!userCart) {
      return res.status(404).json({ message: "Carrito no encontrado." });
    }

    // Elimina todos los elementos del carrito relacionados con el usuario
    await CartItem.destroy({
      where: { cart_id: userCart.id },
    });

    res.json({ message: "Compra realizada correctamente." });
  } catch (error) {
    console.error("Error al comprar:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

/*-------------------------MODA-----------------------*/
export const ConseguirCarritoModa = async (req, res) => {
  try {
    const { userId } = req.params;

    const cartItems = await CartItemModa.findAll({
      where: { "$Cart.user_id$": userId },
      include: [
        {
          model: ModaModel,
          attributes: [
            "clothing_id",
            "name",
            "price",
            "image_url",
            "stock",
            "size",
          ],
        },
        {
          model: Cart,
          attributes: [],
        },
      ],
    });

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const AnadirCarritoModa = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Verificar si el usuario tiene un carrito existente
    let userCart = await Cart.findOne({
      where: { user_id: userId },
    });

    if (!userCart) {
      // Si no hay un carrito existente, crea uno
      userCart = await Cart.create({
        user_id: userId,
      });
    }

    // Verificar si el producto ya está en el carrito
    let cartItem = await CartItemModa.findOne({
      where: { cart_id: userCart.id, product_id: productId },
    });

    if (cartItem) {
      // Si ya existe, actualiza la cantidad
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Si no existe, crea un nuevo registro en el carrito
      await CartItemModa.create({
        cart_id: userCart.id,
        product_id: productId,
        quantity,
      });
    }

    // Obtener y devolver los elementos actualizados del carrito
    const updatedCartItems = await CartItemModa.findAll({
      where: { cart_id: userCart.id },
    });

    res.json(updatedCartItems);
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    res.status(500).json({ message: error.message });
  }
};

export const DisminuirCantidadModa = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Busca el carrito del usuario
    const cartItem = await CartItemModa.findOne({
      where: { "$cart.user_id$": userId, product_id: productId },
      include: [{ model: Cart }],
    });

    if (!cartItem) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado en el carrito." });
    }

    // Disminuye la cantidad
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      await cartItem.save();
    } else {
      // Si la cantidad es 1, elimina el artículo del carrito
      await cartItem.destroy();
    }

    // Retorna el carrito actualizado
    const updatedCartItems = await CartItemModa.findAll({
      where: { "$cart.user_id$": userId },
      include: [{ model: Cart }],
    });

    res.json(updatedCartItems);
  } catch (error) {
    console.error("Error al disminuir la cantidad del producto:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const RemoverCarritoModa = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cartItem = await CartItemModa.findOne({
      where: { "$cart.user_id$": userId, product_id: productId },
      include: [{ model: Cart }],
    });

    if (!cartItem) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado en el carrito." });
    }

    await cartItem.destroy();
    const updatedCartItems = await CartItemModa.findAll({
      where: { "$cart.user_id$": userId },
      include: [{ model: Cart }],
    });

    res.json(updatedCartItems);
  } catch (error) {
    console.error("Error al eliminar el producto del carrito:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const RemoverTodoCarritoModa = async (req, res) => {
  try {
    const { userId } = req.params;

    // Busca el carrito del usuario
    const userCart = await Cart.findOne({
      where: { user_id: userId },
    });

    if (!userCart) {
      return res.status(404).json({ message: "Carrito no encontrado." });
    }

    // Elimina todos los elementos del carrito relacionados con el usuario
    await CartItemModa.destroy({
      where: { cart_id: userCart.id },
    });

    res.json({ message: "Compra realizada correctamente." });
  } catch (error) {
    console.error("Error al comprar:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};
