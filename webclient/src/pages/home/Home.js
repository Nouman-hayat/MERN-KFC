import React, { useEffect } from "react";
import './Home.css'
import LeadText from "../../components/LeadText";
import Slider from "../../components/Slider";
import ProductCard from "../../components/productCard/ProductCard";
import {useDispatch , useSelector} from 'react-redux'

function Home()
{
    let [featuredProducts , setFeaturedProducts] = React.useState([])
    let getFeaturedProducts = async()=>{
        await fetch("http://localhost:8000/kfc/products")
					.then((res) => res.json())
					.then((data) => {
						setFeaturedProducts(
							data.allProducts.filter((el) => el.category === "featured")
						);
						dispatch({ type: "SAVE-PRODUCTS", payload: data.allProducts });
					});
        //.then(_=>dispatch({type: "SAVE-PRODUCTS" , payload: featuredProducts}))
        
    }

    const dispatch = useDispatch()
    /*let products = useSelector(state=> state.productsReducer)

    console.log(products)*/
    useEffect(()=>{
        getFeaturedProducts()

    },[])
    

    return(
        <div>
        <Slider/>
        <LeadText/>
        <div className="container">
        <div className="featured-products-parent">
            {featuredProducts.map((el,ind)=> <ProductCard key={ind} product={el}></ProductCard>)}
        </div>
        </div>
        </div>

    )
}

export default Home;
