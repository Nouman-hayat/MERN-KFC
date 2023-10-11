import React from 'react'
import {useAlert} from 'react-alert'
export default function ProdEditForm(props) {

    let alert = useAlert()
    let [editProduct , setEditProduct ] = React.useState( {...props.product} )
    let { setHiddenForm } = props
    let hideEditForm =  (id) =>{
        setHiddenForm(true)
    }
 


    let handleEdit = async (id) =>{
        await fetch(`https://kfc-backend.herokuapp.com/kfc/update/${id}`,
        {method: "PUT" ,
        headers: {"Content-Type" : "application/json"} ,
        credentials:'include',
        body : JSON.stringify(editProduct) })
        .then(_=> console.log("successully updated"))
        props.getProducts()
        alert.success("Product Updated")
    }

    return (
        <div className="edit-form bg-dark rounded">
        <button className="close-form btn-danger rounded" onClick={hideEditForm}>x</button>
        <h5 className="text-primary">Title</h5>
        <input spellCheck="false" type="text" className="mb-4 border-2 border-primary rounded" 
        value={editProduct.title} onChange={(e)=> setEditProduct({...editProduct , title : e.target.value })}  />

        <h5 className="text-primary">Image URL</h5>
        <input spellCheck="false" type="text" className="mb-4 border-2 border-primary rounded" 
        value={editProduct.image} onChange={(e)=> setEditProduct({...editProduct , image : e.target.value })}  />

        <h5 className="text-primary">Description</h5>
        <textarea className="w-100 mb-4 border-2 border-primary rounded" name="description" id="description"  rows="5" 
        value={editProduct.description} onChange={(e)=>setEditProduct({...editProduct  , description: e.target.value})}></textarea>

        <h5 className="text-primary">Category</h5>
        <select name="category" id="category" className="mb-4 border-2 border-primary rounded" 
        value={editProduct.category} onChange={(e)=> setEditProduct({...editProduct  , category: e.target.value})}>
            <option value="everyday-value">everyday-value</option>
            <option value="make-it-a-meal">make-it-a-meal</option>
            <option value="signature-box">signature-box</option>
            <option value="sharing">sharing</option>
            <option value="promotions">promotions</option>
            <option value="snacks">snacks</option>
            <option value="midnight-deals">midnight-deals</option>
            <option value="featured">featured</option>
        </select>   

        <h5 className="text-primary">Price</h5>
        <input type="numeric" className="mb-4 border-2 border-primary rounded" 
        value={editProduct.price} onChange={(e)=> setEditProduct({...editProduct , price : e.target.value })} />

        <h5 className="text-primary">Stock</h5>
        <input type="numeric" className="mb-4 border-2 border-primary rounded" 
        value={editProduct.stock} onChange={(e)=> setEditProduct({...editProduct , stock : e.target.value })} />

        <input type="submit" className="btn-primary btn border-2 border-primary" onClick={()=> {handleEdit(editProduct._id) ;setHiddenForm(true)}}  />
    </div>
    )
}
