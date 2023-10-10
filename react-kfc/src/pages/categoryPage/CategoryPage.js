import React ,{useState , useEffect} from 'react'
import './CategoryPage.css'
import LeadText from '../../components/LeadText'
import {useParams} from 'react-router-dom'
import ProductCard from '../../components/productCard/ProductCard'
import { API_URL } from "../../api";
import SkeletonCard from  '../../components/skeletonCard/SkeletonCard'
import { useDispatch, useSelector } from 'react-redux'
export default function ProductPage() {

    let dispatch = useDispatch()
    let {slug} = useParams();
    let [products , setProducts] = useState( useSelector( state => state.productsReducer) )
    console.log("prod : " , products)
    let [ isLoading , setIsLoading ] = useState(false)

    let getProducts = async ()=>{
        console.log("getting")
        setIsLoading(true)

        await fetch(`${API_URL}/kfc/products`)
        .then(resp=> resp.json())
        .then(data=> {
            setIsLoading(false)
            dispatch({ type : "SAVE-PRODUCTS" , payload : data.allProducts })
            setProducts(data.allProducts)
        })
        .catch( err => console.log(err) )
    }

    useEffect(()=>{
        if( products.length === 0 )
        getProducts()
    },[])


    return (
        <div className="product-page">
            <LeadText/>
            <div className="page-content container">
                <div className="featured-products-parent">
                    {
                        isLoading ? 
                        <>
                            <SkeletonCard/>
                            <SkeletonCard/>
                            <SkeletonCard/>
                        </>
                        :
                        products.filter( el => el.category === slug  ).map((p,index)=> <ProductCard key={index} product={p}/>)

                    }
                </div>
            </div>
        </div>
    )
}
