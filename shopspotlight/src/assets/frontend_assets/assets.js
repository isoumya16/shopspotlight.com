import basket_icon from './basket_icon.png'
import logo from './logo.png'
import header_img from './header_img.png'
import search_icon from './search_icon.png'
import menu_1 from './menu_1.png'
import menu_2 from './menu_2.png'
import menu_3 from './menu_3.png'
import menu_4 from './menu_4.png'
import menu_5 from './menu_5.png'
import menu_6 from './menu_6.png'
import menu_7 from './menu_7.png'
import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import app_store from './app_store.png'
import play_store from './play_store.png'
import linkedin_icon from './linkedin_icon.png'
import facebook_icon from './facebook_icon.png'
import twitter_icon from './twitter_icon.png'
import cross_icon from './cross_icon.png'
import selector_icon from './selector_icon.png'
import rating_starts from './rating_starts.png'
import profile_icon from './profile_icon.png'
import bag_icon from './bag_icon.png'
import logout_icon from './logout_icon.png'
import parcel_icon from './parcel_icon.png'

export const assets = {
    logo,
    basket_icon,
    header_img,
    search_icon,
    rating_starts,
    add_icon_green,
    add_icon_white,
    remove_icon_red,
    app_store,
    play_store,
    linkedin_icon,
    facebook_icon,
    twitter_icon,
    cross_icon,
    selector_icon,
    profile_icon,
    logout_icon,
    bag_icon,
    parcel_icon
}

export const menu_list = [
    {
        menu_name: "Tablet",
        menu_image: menu_1
    },
    {
        menu_name: "Smart Watch",
        menu_image: menu_2
    },
    {
        menu_name: "Headphone",
        menu_image: menu_3
    },
    {
        menu_name: "Powerbank",
        menu_image: menu_4
    },
    {
        menu_name: "Gaming",
        menu_image: menu_5
    },
    {
        menu_name: "Electronics",
        menu_image: menu_6
    },
    {
      menu_name: "Camera",
      menu_image: menu_7
  },]

export const productlist = [
    {
        _id: "1",
        title: "Galaxy Tab S6 Lite 10.4-inch Android Tablet 128GB.",
        cat: "Tablet",
        subcat: "Apple",
        description: "A lightweight tablet with a 10.4-inch screen, 128GB storage, and Android OS, perfect for work and entertainment.",
        price: 61140.15,
        img: "http://localhost:5000/img/tp1.jpg",
        like_count: 35,
        view_count: 59
      },
      {
        _id: "2",
        title: "Tracker with IP67 Waterproof Pedometer Smart Watch.",
        cat: "Smart Watch",
        subcat: "Huawei",
        description: "An IP67 waterproof smart watch with a pedometer, fitness tracking, and long battery life.",
        price: 14206.84,
        img: "http://localhost:5000/img/tp2.jpg",
        like_count: 14,
        view_count: 56
      },
      {
        _id: "3",
        title: "Cancelling Headphones Wireless.",
        cat: "Headphone",
        subcat: "Sony",
        description: "Immerse yourself in pure audio with Sony's Wireless Noise Cancelling Headphones.",
        price: 4143.66,
        img: "http://localhost:5000/img/tp3.jpg",
        like_count: 11,
        view_count: 58
      },
      {
        _id: "4",
        title: "Professional Camera 4K Digital Video Camera.",
        cat: "Camera",
        subcat: "Canon",
        description: "A professional-grade 4K video camera with advanced features for capturing high-quality videos.",
        price: 88708.18,
        img: "http://localhost:5000/img/tp4.jpg",
        like_count: 5,
        view_count: 41
      },
      {
        _id: "5",
        title: "Mini Portable PD 22.5W Fast Charging Powerbank.",
        cat: "Powerbank",
        subcat: "Samsung",
        description: "Compact and portable powerbank with 22.5W fast charging capability to keep your devices powered on the go.",
        price: 4143.66,
        img: "http://localhost:5000/img/tp5.jpg",
        like_count: 3,
        view_count: 39
      },
      {
        _id: "6",
        title: "CPU Cooler 2 Heat Pipes 12mm 4 Pin PWM RGB",
        cat: "Heat Pipe",
        subcat: "Cooler Master",
        description: "Efficient CPU cooler with dual heat pipes, 4-pin PWM, and RGB lighting for optimized cooling and aesthetics.",
        price: 13192.07,
        img: "http://localhost:5000/img/tp6.jpg",
        like_count: 3,
        view_count: 39
      },
      {
        _id: "7",
        title: "Playstation 4 2TB Slim Gaming Console.",
        cat: "Gaming",
        subcat: "Sony",
        description: "A sleek and powerful PlayStation 4 Slim with 2TB storage, perfect for gamers who need ample space for their games.",
        price: 177416.37,
        img: "http://localhost:5000/img/tp7.jpg",
        like_count: 3,
        view_count: 39
      },
      {
        _id: "8",
        title: "Mini Portable Mobile Phone Powerbank for iPhone.",
        cat: "Powerbank",
        subcat: "Realme",
        description: "A mini portable powerbank designed specifically for iPhones, offering fast charging on the go.",
        price: 32641.91,
        img: "http://localhost:5000/img/tp8.jpg",
        like_count: 3,
        view_count: 39
      },
      {
        _id: "9",
        title: "Microsoft Surface Pro 8-13 Touchscreen.",
        cat: "Tablet",
        subcat: "Microsoft",
        description: "A versatile 13-inch touchscreen tablet from Microsoft with powerful performance for both work and play.",
        price: 58757.36,
        img: "http://localhost:5000/img/p9.jpg",
        like_count: 7,
        view_count: 40
      },
      {
        _id: "10",
        title: "Playstation 4 2TB Slim Gaming Console.",
        cat: "Gaming",
        subcat: "Microsoft",
        description: "The ultimate PlayStation 4 Slim with 2TB storage, designed for immersive gaming experiences.",
        price: 426987.08,
        img: "http://localhost:5000/img/p10.jpg",
        like_count: 3,
        view_count: 39
      },
      {
        _id: "11",
        title: "Echo Show 5 (2nd Gen) Adjustable Stand | Char...",
        cat: "Electronics",
        subcat: "Samsung",
        description: "A compact smart display with Alexa, adjustable stand, and a sleek charcoal finish.",
        price: 16787.82,
        img: "http://localhost:5000/img/p11.jpg",
        like_count: 3,
        view_count: 40
      }
]
