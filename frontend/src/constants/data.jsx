import img1 from '../assets/img1.png'
import img2 from '../assets/img2.png'
import img3 from '../assets/img3.png'
import img4 from '../assets/img4.png'
import img5 from '../assets/img5.png'
import blog1 from '../assets/blog1.jpg'
import blog2 from '../assets/blog2.jpg'
import blog3 from '../assets/blog3.jpg'
import blog4 from '../assets/blog4.jpg'

import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa"

export const PROPERTIES =[
  {
    title: "Tranquil Terrace Tranquility Haven",
    image: img1,
    category: "Cottage",
    address: "Via Roma 21",
    country: "Italy",
    city: "Florence",
    area: 450,
    price: 450,
    description: "Charming bungalow with modern amenities and scenic vistas",
    facilities: {
      bedrooms: 3,
      bathrooms: 2,
      parkings: 1,
    }
  },
  {
    "title": "Serenity Springs Retreat",
    "image": img2,
    "category": "Cottage",
    "address": "123 Lakeside Drive",
    "country": "Switzerland",
    "city": "Lucerne",
    "area": 500,
    "price": 600,
    "description": "A peaceful cottage with breathtaking lake views and cozy interiors",
    "facilities": {
      "bedrooms": 4,
      "bathrooms": 3,
      "parkings": 2
    }
  },
  {
    "title": "Rustic Meadows Escape",
    "image": img3,
    "category": "Cottage",
    "address": "456 Country Road",
    "country": "France",
    "city": "Provence",
    "area": 350,
    "price": 400,
    "description": "A charming countryside retreat surrounded by lush meadows and tranquility",
    "facilities": {
      "bedrooms": 2,
      "bathrooms": 1,
      "parkings": 1
    }
  },
  {
    "title": "Mountain View Villa",
    "image": img4,
    "category": "Villa",
    "address": "789 Alpine Street",
    "country": "Austria",
    "city": "Innsbruck",
    "area": 600,
    "price": 750,
    "description": "Luxurious villa offering stunning mountain views and top-notch amenities",
    "facilities": {
      "bedrooms": 5,
      "bathrooms": 4,
      "parkings": 3
    }
  },
  {
    "title": "Seaside Sanctuary",
    "image": img5,
    "category": "Cottage",
    "address": "101 Ocean Drive",
    "country": "Spain",
    "city": "Barcelona",
    "area": 400,
    "price": 500,
    "description": "A beautiful seaside cottage with modern amenities and stunning ocean views",
    "facilities": {
      "bedrooms": 3,
      "bathrooms": 2,
      "parkings": 2
    }
  }
]

export const BLOGS = [
  {
    title: "Maximizing Property Value: Tips for Sellers",
    image: blog1,
    category: "Selling",
    summary: "Learn how to increase the value of your property before putting it on the market.",
  },
  {
    title: "Finding the Perfect Home: A Buyer's Guide",
    image: blog2,
    category: "Buying",
    summary: "Essential tips and strategies for finding your dream home.",
  },
  {
    title: "Understanding the Real Estate Market Trends",
    image: blog3,
    category: "Market Trends",
    summary: "Stay updated with the latest trends and insights in the real estate market.",
  },
  {
    title: "Investment Properties: What to Look For",
    image: blog4,
    category: "Investing",
    summary: "Key factors to consider when investing in real estate properties.",
  },
];

export const FOOTER_LINKS = [
  {
    title: "Learn More",
    links: [
      "About Us",
      "Latest Items",
      "Hot Offers",
      "Popular residencies",
      "FAQ",
      "Privacy Policy",
    ],
  },
  {
    title: "Our Community",
    links: [
      "Terms and Conditions",
      "Special Offers",
      "Customer Reviews",
    ],
  },
];

export const FOOTER_CONTACT_INFO = {
  title: "Contact Us",
  links: [
    { label: "Contact Number", value: "123-456-7890"},
    { label: "Email", value: "info@realestate.com" },
    { label: "Address", value: "123 Real Est Ave, Springfield, USA" },
    { label: "Customer Support", value: "support@realestate.com" },
  ]
}

export const SOCIALS = {
  title: "Social",
  links: [
    { id: 1, label: "Facebook", icon: <FaFacebook />, url: "https://www.facebook.com/realestate" },
    { id: 2, label: "Twitter", icon: <FaTwitter />, url: "https://www.twitter.com/realestate" },
    { id: 3, label: "Instagram", icon: <FaInstagram />, url: "https://www.instagram.com/realestate" },
    { id: 4, label: "LinkedIn", icon: <FaLinkedin />, url: "https://www.linkedin.com/company/realestate" },
    { id: 5, label: "YouTube", icon: <FaYoutube />, url: "https://www.youtube.com/realestate" },
   
  ]
};