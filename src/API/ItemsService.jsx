import axios from "axios";
import CartItem from "../components/Drawer/CartItem/CartItem";

export default class ItemsService{
    static async getAll(){
        const response = await axios.get('https://66d5b473f5859a7042672715.mockapi.io/items')
        return response
    }
    static async addItemToCart(obj){
        const response = axios.post('https://66d5b473f5859a7042672715.mockapi.io/cart', obj)
        return response
    }
    static addItemToFavourite(obj){
        const response = axios.post('https://66d7155f006bfbe2e64fc119.mockapi.io/favourites/', obj)
        return response
    }
    static getFavourites(){
        const response = axios.get('https://66d7155f006bfbe2e64fc119.mockapi.io/favourites')
        return response
    }
    static async deleteFavourite(index){
        const {data} = await axios.get("https://66d7155f006bfbe2e64fc119.mockapi.io/favourites?index=" + index)
        await axios.delete('https://66d7155f006bfbe2e64fc119.mockapi.io/favourites/' + data[0].id)
    }
    static async deleteItemFromCart(index){
        const {data} = await axios.get("https://66d5b473f5859a7042672715.mockapi.io/cart?index=" + index)

        await axios.delete('https://66d5b473f5859a7042672715.mockapi.io/cart/' + data[0].id)
    }
    static async getAllCartItems(obj){
        const response = axios.get('https://66d5b473f5859a7042672715.mockapi.io/cart')
        return response
    }
    static async createOrder(items){
        const response = axios.post('https://66d7155f006bfbe2e64fc119.mockapi.io/orders/', {items: items})
        return response
    }
    static async clearCart(cartItems){
        const response = cartItems.forEach(item => this.deleteItemFromCart(item.index))
        return response
    }
    static async getAllOrders(){
        const response = axios.get('https://66d7155f006bfbe2e64fc119.mockapi.io/orders/')
        return response
    }

}